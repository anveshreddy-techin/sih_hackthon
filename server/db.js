import { MSP_CATALOG, INITIAL_CENTRES, INITIAL_TOKENS, INITIAL_ANNOUNCEMENTS } from './seedData.js';

// In-Memory Database Store
class Database {
  constructor() {
    this.reset();
  }

  reset() {
    this.centres = JSON.parse(JSON.stringify(INITIAL_CENTRES));
    this.tokens = JSON.parse(JSON.stringify(INITIAL_TOKENS));
    this.mspCatalog = JSON.parse(JSON.stringify(MSP_CATALOG));
    this.announcements = JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS));
    this.nextSeq = 46;
  }

  // Centre queries
  getCentres({ query, cropId, district, status, maxDistance, userLat, userLng }) {
    let results = [...this.centres];

    if (query) {
      const q = query.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.name_te && c.name_te.toLowerCase().includes(q)) ||
        c.district.toLowerCase().includes(q) ||
        c.mandal.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
      );
    }

    if (cropId && cropId !== 'all') {
      results = results.filter(c =>
        c.acceptedCrops.some(ac => ac.cropId === cropId && ac.status !== 'closed')
      );
    }

    if (district && district !== 'all') {
      results = results.filter(c =>
        c.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (status && status !== 'all') {
      results = results.filter(c => c.status === status);
    }

    // Distance calculation if userLat and userLng provided
    if (userLat && userLng) {
      const lat1 = parseFloat(userLat);
      const lon1 = parseFloat(userLng);
      results = results.map(c => {
        const dist = this.calculateDistance(lat1, lon1, c.lat, c.lng);
        return { ...c, distanceKm: Math.round(dist * 10) / 10 };
      });

      if (maxDistance && !isNaN(parseFloat(maxDistance))) {
        const maxD = parseFloat(maxDistance);
        results = results.filter(c => c.distanceKm <= maxD);
      }

      // Sort by closest distance
      results.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
    }

    return results;
  }

  getCentreById(id) {
    return this.centres.find(c => c.id === id);
  }

  updateCentreStatus(id, { status, statusReason, statusReason_te }) {
    const centre = this.getCentreById(id);
    if (!centre) return null;
    if (status) centre.status = status;
    if (statusReason) centre.statusReason = statusReason;
    if (statusReason_te) centre.statusReason_te = statusReason_te;
    return centre;
  }

  updateCentreCrop(id, { cropId, status, dailyQuotaQuintals, msp, bonus }) {
    const centre = this.getCentreById(id);
    if (!centre) return null;
    const crop = centre.acceptedCrops.find(c => c.cropId === cropId);
    if (crop) {
      if (status) crop.status = status;
      if (dailyQuotaQuintals !== undefined) crop.dailyQuotaQuintals = Number(dailyQuotaQuintals);
      if (msp !== undefined) crop.msp = Number(msp);
      if (bonus !== undefined) crop.bonus = Number(bonus);
    } else {
      // Add new crop
      const mspInfo = this.mspCatalog.find(m => m.id === cropId);
      if (mspInfo) {
        centre.acceptedCrops.push({
          cropId,
          name: mspInfo.name,
          name_te: mspInfo.name_te,
          msp: msp || mspInfo.msp,
          bonus: bonus || 0,
          dailyQuotaQuintals: dailyQuotaQuintals || 2000,
          procuredTodayQuintals: 0,
          maxMoisture: mspInfo.maxMoisture,
          status: status || 'accepting'
        });
      }
    }
    return centre;
  }

  // Token & Queue operations
  getTokens(filter = {}) {
    let list = [...this.tokens];
    if (filter.centreId) {
      list = list.filter(t => t.centreId === filter.centreId);
    }
    if (filter.phone) {
      list = list.filter(t => t.phone.includes(filter.phone));
    }
    if (filter.status) {
      list = list.filter(t => t.status === filter.status);
    }
    return list;
  }

  getTokenByNumber(tokenNumber) {
    return this.tokens.find(t => t.tokenNumber.toUpperCase() === tokenNumber.toUpperCase());
  }

  createToken(data) {
    const tokenSeq = this.nextSeq++;
    const tokenNumber = `KST-${String(tokenSeq).padStart(3, '0')}`;
    
    const centre = this.getCentreById(data.centreId);
    const crop = this.mspCatalog.find(c => c.id === data.cropId);

    const newToken = {
      tokenNumber,
      centreId: data.centreId,
      centreName: centre ? centre.name : "Procurement Centre",
      farmerName: data.farmerName,
      farmerName_te: data.farmerName_te || data.farmerName,
      phone: data.phone,
      aadhaarLast4: data.aadhaarLast4 || data.phone.slice(-4),
      passbookNo: data.passbookNo || `TS-PPB-${Math.floor(1000 + Math.random() * 9000)}`,
      cropId: data.cropId,
      cropName: crop ? crop.name : data.cropId,
      quantityQuintals: parseFloat(data.quantityQuintals) || 20,
      vehicleType: data.vehicleType || "Tractor-Trolley",
      vehicleNumber: data.vehicleNumber || "TS 03 AA " + Math.floor(1000 + Math.random() * 9000),
      slotDate: data.slotDate || new Date().toISOString().split('T')[0],
      slotTime: data.slotTime || "11:00 AM - 12:00 PM",
      status: "BOOKED",
      moistureMeasured: null,
      gradeAssigned: null,
      totalWeightQuintals: null,
      netPayableAmount: null,
      issuedAt: new Date().toISOString()
    };

    this.tokens.push(newToken);

    // Update centre queue metrics
    if (centre) {
      centre.queue.totalTokensIssuedToday += 1;
      centre.queue.activeQueueCount += 1;
      centre.queue.estimatedWaitTimeMinutes = centre.queue.activeQueueCount * (centre.queue.avgMinutesPerToken || 8);
    }

    return newToken;
  }

  updateTokenStatus(tokenNumber, updateData) {
    const token = this.getTokenByNumber(tokenNumber);
    if (!token) return null;

    Object.assign(token, updateData);

    const centre = this.getCentreById(token.centreId);
    if (centre && (updateData.status === 'COMPLETED' || updateData.status === 'PAID')) {
      centre.queue.activeQueueCount = Math.max(0, centre.queue.activeQueueCount - 1);
      centre.queue.estimatedWaitTimeMinutes = centre.queue.activeQueueCount * (centre.queue.avgMinutesPerToken || 8);

      // Add to procured today
      const crop = centre.acceptedCrops.find(c => c.cropId === token.cropId);
      if (crop) {
        crop.procuredTodayQuintals += (token.totalWeightQuintals || token.quantityQuintals);
      }
    }

    return token;
  }

  callNextToken(centreId) {
    const centre = this.getCentreById(centreId);
    if (!centre) return null;

    // Find first token in CHECKED_IN or BOOKED state for this centre
    const activeTokens = this.tokens.filter(t => 
      t.centreId === centreId && 
      ['BOOKED', 'CHECKED_IN'].includes(t.status)
    );

    if (activeTokens.length > 0) {
      const nextToken = activeTokens[0];
      nextToken.status = 'TESTING';
      centre.queue.currentlyServingToken = nextToken.tokenNumber;
      centre.queue.activeQueueCount = Math.max(1, centre.queue.activeQueueCount);
      return { centre, token: nextToken };
    }

    return { centre, token: null };
  }

  // Announcements
  getAnnouncements() {
    return this.announcements;
  }

  createAnnouncement(data) {
    const newAnn = {
      id: `ANN-${Date.now().toString().slice(-4)}`,
      centreId: data.centreId || "ALL",
      centreName: data.centreName || "All Procurement Centres",
      title: data.title,
      title_te: data.title_te || data.title,
      title_hi: data.title_hi || data.title,
      message: data.message,
      message_te: data.message_te || data.message,
      severity: data.severity || "info",
      timestamp: new Date().toISOString(),
      isActive: true
    };
    this.announcements.unshift(newAnn);
    return newAnn;
  }

  // MSP & Prices
  getMspCatalog() {
    return this.mspCatalog;
  }

  // Analytics summary
  getAnalytics() {
    let totalProcuredQuintals = 0;
    let totalDailyQuota = 0;
    let openCentresCount = 0;
    let totalActiveTokens = 0;

    this.centres.forEach(c => {
      if (c.status === 'open') openCentresCount++;
      c.acceptedCrops.forEach(ac => {
        totalProcuredQuintals += (ac.procuredTodayQuintals || 0);
        totalDailyQuota += (ac.dailyQuotaQuintals || 0);
      });
      totalActiveTokens += (c.queue.activeQueueCount || 0);
    });

    const cropStats = {};
    this.mspCatalog.forEach(m => {
      cropStats[m.id] = {
        name: m.name,
        name_te: m.name_te,
        totalProcured: 0
      };
    });

    this.centres.forEach(c => {
      c.acceptedCrops.forEach(ac => {
        if (cropStats[ac.cropId]) {
          cropStats[ac.cropId].totalProcured += (ac.procuredTodayQuintals || 0);
        }
      });
    });

    return {
      totalCentres: this.centres.length,
      openCentresCount,
      totalProcuredQuintals,
      totalDailyQuota,
      procurementPercentage: Math.round((totalProcuredQuintals / (totalDailyQuota || 1)) * 100),
      totalActiveTokens,
      cropStats: Object.values(cropStats)
    };
  }

  // Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export const db = new Database();
