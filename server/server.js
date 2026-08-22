import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), system: 'KisanSetu Backend API' });
});

// --- CENTRES ENDPOINTS ---

// GET /api/centres - Search & filter procurement centres
app.get('/api/centres', (req, res) => {
  try {
    const { query, cropId, district, status, maxDistance, userLat, userLng } = req.query;
    const centres = db.getCentres({ query, cropId, district, status, maxDistance, userLat, userLng });
    res.json({ success: true, count: centres.length, data: centres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/centres/:id - Get detailed centre info
app.get('/api/centres/:id', (req, res) => {
  try {
    const centre = db.getCentreById(req.params.id);
    if (!centre) {
      return res.status(404).json({ success: false, message: 'Procurement centre not found' });
    }
    res.json({ success: true, data: centre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/centres/:id/status - Update centre open/closed/break status
app.patch('/api/centres/:id/status', (req, res) => {
  try {
    const { status, statusReason, statusReason_te } = req.body;
    const updated = db.updateCentreStatus(req.params.id, { status, statusReason, statusReason_te });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Centre not found' });
    }
    res.json({ success: true, message: 'Centre status updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/centres/:id/crops - Update/Add accepted crop
app.post('/api/centres/:id/crops', (req, res) => {
  try {
    const { cropId, status, dailyQuotaQuintals, msp, bonus } = req.body;
    const updated = db.updateCentreCrop(req.params.id, { cropId, status, dailyQuotaQuintals, msp, bonus });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Centre or Crop not found' });
    }
    res.json({ success: true, message: 'Crop configuration updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- DIGITAL TOKENS & QUEUE ENDPOINTS ---

// GET /api/tokens - List or filter tokens
app.get('/api/tokens', (req, res) => {
  try {
    const { centreId, phone, status } = req.query;
    const tokens = db.getTokens({ centreId, phone, status });
    res.json({ success: true, count: tokens.length, data: tokens });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/tokens/:tokenNumber - Get specific token
app.get('/api/tokens/:tokenNumber', (req, res) => {
  try {
    const token = db.getTokenByNumber(req.params.tokenNumber);
    if (!token) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }
    res.json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/tokens - Generate / Book a new digital token
app.post('/api/tokens', (req, res) => {
  try {
    const { farmerName, farmerName_te, phone, centreId, cropId, quantityQuintals, vehicleType, vehicleNumber, slotDate, slotTime, aadhaarLast4, passbookNo } = req.body;

    if (!farmerName || !phone || !centreId || !cropId) {
      return res.status(400).json({ success: false, message: 'Missing required fields (farmerName, phone, centreId, cropId)' });
    }

    const token = db.createToken({
      farmerName,
      farmerName_te,
      phone,
      centreId,
      cropId,
      quantityQuintals,
      vehicleType,
      vehicleNumber,
      slotDate,
      slotTime,
      aadhaarLast4,
      passbookNo
    });

    res.status(201).json({
      success: true,
      message: 'Token booked successfully! Digital QR pass generated.',
      data: token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/tokens/:tokenNumber/status - Transition token status
app.patch('/api/tokens/:tokenNumber/status', (req, res) => {
  try {
    const { status, moistureMeasured, gradeAssigned, totalWeightQuintals, netPayableAmount } = req.body;
    const token = db.updateTokenStatus(req.params.tokenNumber, {
      status,
      moistureMeasured,
      gradeAssigned,
      totalWeightQuintals,
      netPayableAmount,
      updatedAt: new Date().toISOString()
    });

    if (!token) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }

    res.json({ success: true, message: `Token status moved to ${status}`, data: token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/queue/:centreId/call-next - Admin calls next token in queue
app.post('/api/queue/:centreId/call-next', (req, res) => {
  try {
    const result = db.callNextToken(req.params.centreId);
    if (!result.centre) {
      return res.status(404).json({ success: false, message: 'Centre not found' });
    }
    res.json({
      success: true,
      message: result.token ? `Now calling Token ${result.token.tokenNumber}` : 'No waiting tokens found',
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- MSP CATALOG & PRICES ---

// GET /api/prices - Get MSP rates & market prices
app.get('/api/prices', (req, res) => {
  try {
    const catalog = db.getMspCatalog();
    res.json({ success: true, data: catalog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ANNOUNCEMENTS & ALERTS ---

// GET /api/announcements - Get all active alerts
app.get('/api/announcements', (req, res) => {
  try {
    const alerts = db.getAnnouncements();
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/announcements - Broadcast new alert
app.post('/api/announcements', (req, res) => {
  try {
    const { centreId, centreName, title, title_te, title_hi, message, message_te, severity } = req.body;
    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message are required' });
    }
    const newAlert = db.createAnnouncement({ centreId, centreName, title, title_te, title_hi, message, message_te, severity });
    res.status(201).json({ success: true, message: 'Announcement broadcasted successfully', data: newAlert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ANALYTICS SUMMARY ---

// GET /api/analytics - Get procurement analytics
app.get('/api/analytics', (req, res) => {
  try {
    const analytics = db.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/reset - Reset data to initial state
app.post('/api/reset', (req, res) => {
  try {
    db.reset();
    res.json({ success: true, message: 'System data reset to default seed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static files from the React dist directory if it exists
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

// Start Express Server only when run directly (not serverless)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🌾 KisanSetu API Server running on port ${PORT}`);
    console.log(`📍 Endpoint: http://localhost:${PORT}/api/centres`);
  });
}

export default app;


