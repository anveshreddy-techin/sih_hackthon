import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ProcurementCentre,
  DigitalToken,
  MspCatalogItem,
  Announcement,
  AnalyticsData,
  TokenStatus,
  CentreStatus
} from '../types';
import { playQueueChime, playSuccessSound } from '../utils/sound';

interface AppContextType {
  centres: ProcurementCentre[];
  activeToken: DigitalToken | null;
  allTokens: DigitalToken[];
  mspCatalog: MspCatalogItem[];
  announcements: Announcement[];
  analytics: AnalyticsData | null;
  userLocation: { lat: number; lng: number } | null;
  isLocating: boolean;
  userRole: 'farmer' | 'admin';
  setUserRole: (role: 'farmer' | 'admin') => void;
  selectedCentre: ProcurementCentre | null;
  setSelectedCentre: (c: ProcurementCentre | null) => void;
  bookingCentre: ProcurementCentre | null;
  setBookingCentre: (c: ProcurementCentre | null) => void;
  viewPassToken: DigitalToken | null;
  setViewPassToken: (t: DigitalToken | null) => void;
  activeTab: 'centres' | 'map' | 'prices' | 'queue' | 'analytics' | 'admin';
  setActiveTab: (tab: 'centres' | 'map' | 'prices' | 'queue' | 'analytics' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCrop: string;
  setSelectedCrop: (c: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (d: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedRadius: string;
  setSelectedRadius: (r: string) => void;
  loading: boolean;
  refreshAll: () => Promise<void>;
  detectUserLocation: () => Promise<void>;
  bookToken: (data: Partial<DigitalToken>) => Promise<DigitalToken>;
  updateTokenStatus: (tokenNumber: string, updateData: Partial<DigitalToken>) => Promise<DigitalToken>;
  callNextToken: (centreId: string) => Promise<DigitalToken | null>;
  updateCentreStatus: (id: string, status: CentreStatus, statusReason?: string, statusReason_te?: string) => Promise<ProcurementCentre>;
  updateCentreCrop: (centreId: string, cropData: Record<string, unknown>) => Promise<ProcurementCentre>;
  broadcastAnnouncement: (data: Partial<Announcement>) => Promise<Announcement>;
  resetDemoData: () => Promise<void>;
  setActiveToken: (token: DigitalToken | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [centres, setCentres] = useState<ProcurementCentre[]>([]);
  const [allTokens, setAllTokens] = useState<DigitalToken[]>([]);
  const [activeToken, setActiveTokenState] = useState<DigitalToken | null>(() => {
    const saved = localStorage.getItem('kisansetu_active_token');
    return saved ? JSON.parse(saved) : null;
  });
  const [mspCatalog, setMspCatalog] = useState<MspCatalogItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // Default coordinate: Telangana/Andhra region (Warangal)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 17.9689,
    lng: 79.5941
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'farmer' | 'admin'>('farmer');

  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre | null>(null);
  const [bookingCentre, setBookingCentre] = useState<ProcurementCentre | null>(null);
  const [viewPassToken, setViewPassToken] = useState<DigitalToken | null>(null);
  const [activeTab, setActiveTab] = useState<'centres' | 'map' | 'prices' | 'queue' | 'analytics' | 'admin'>('centres');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRadius, setSelectedRadius] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  const setActiveToken = (token: DigitalToken | null) => {
    setActiveTokenState(token);
    if (token) {
      localStorage.setItem('kisansetu_active_token', JSON.stringify(token));
    } else {
      localStorage.removeItem('kisansetu_active_token');
    }
  };

  // Fetch Centres
  const fetchCentres = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (selectedCrop && selectedCrop !== 'all') params.append('cropId', selectedCrop);
      if (selectedDistrict && selectedDistrict !== 'all') params.append('district', selectedDistrict);
      if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
      if (selectedRadius && selectedRadius !== 'all') params.append('maxDistance', selectedRadius);
      if (userLocation) {
        params.append('userLat', userLocation.lat.toString());
        params.append('userLng', userLocation.lng.toString());
      }

      const res = await fetch(`/api/centres?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setCentres(json.data);
      }
    } catch (e) {
      console.error('Error fetching centres:', e);
    }
  }, [searchQuery, selectedCrop, selectedDistrict, selectedStatus, selectedRadius, userLocation]);

  // Fetch Tokens
  const fetchTokens = useCallback(async () => {
    try {
      const res = await fetch('/api/tokens');
      const json = await res.json();
      if (json.success) {
        setAllTokens(json.data);
        // Sync active token if present
        if (activeToken) {
          const updated = json.data.find((t: DigitalToken) => t.tokenNumber === activeToken.tokenNumber);
          if (updated) {
            setActiveTokenState(updated);
            localStorage.setItem('kisansetu_active_token', JSON.stringify(updated));
          }
        }
      }
    } catch (e) {
      console.error('Error fetching tokens:', e);
    }
  }, [activeToken]);

  // Fetch Announcements
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch('/api/announcements');
      const json = await res.json();
      if (json.success) {
        setAnnouncements(json.data);
      }
    } catch (e) {
      console.error('Error fetching announcements:', e);
    }
  }, []);

  // Fetch MSP Catalog
  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      const json = await res.json();
      if (json.success) {
        setMspCatalog(json.data);
      }
    } catch (e) {
      console.error('Error fetching MSP prices:', e);
    }
  }, []);

  // Fetch Analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      if (json.success) {
        setAnalytics(json.data);
      }
    } catch (e) {
      console.error('Error fetching analytics:', e);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchCentres(),
      fetchTokens(),
      fetchAnnouncements(),
      fetchPrices(),
      fetchAnalytics()
    ]);
    setLoading(false);
  }, [fetchCentres, fetchTokens, fetchAnnouncements, fetchPrices, fetchAnalytics]);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Periodic background refresh for live queue
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCentres();
      fetchTokens();
    }, 8000);
    return () => clearInterval(interval);
  }, [fetchCentres, fetchTokens]);

  // Detect GPS User Location
  const detectUserLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation failed or denied, keeping default Warangal region:', err.message);
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Book Token
  const bookToken = async (data: Partial<DigitalToken>): Promise<DigitalToken> => {
    const res = await fetch('/api/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to book token');
    }
    const token = json.data as DigitalToken;
    setActiveToken(token);
    playSuccessSound();
    await refreshAll();
    return token;
  };

  // Update Token Status
  const updateTokenStatus = async (tokenNumber: string, updateData: Partial<DigitalToken>): Promise<DigitalToken> => {
    const res = await fetch(`/api/tokens/${tokenNumber}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to update token status');
    }
    await refreshAll();
    return json.data;
  };

  // Admin: Call Next Token
  const callNextToken = async (centreId: string): Promise<DigitalToken | null> => {
    const res = await fetch(`/api/queue/${centreId}/call-next`, {
      method: 'POST'
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to call next token');
    }
    playQueueChime();
    await refreshAll();
    return json.data.token;
  };

  // Admin: Update Centre Status
  const updateCentreStatus = async (
    id: string,
    status: CentreStatus,
    statusReason?: string,
    statusReason_te?: string
  ): Promise<ProcurementCentre> => {
    const res = await fetch(`/api/centres/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, statusReason, statusReason_te })
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to update centre');
    }
    await refreshAll();
    return json.data;
  };

  // Admin: Update Crop Configuration
  const updateCentreCrop = async (centreId: string, cropData: Record<string, unknown>): Promise<ProcurementCentre> => {
    const res = await fetch(`/api/centres/${centreId}/crops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData)
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to update crop');
    }
    await refreshAll();
    return json.data;
  };

  // Broadcast Alert
  const broadcastAnnouncement = async (data: Partial<Announcement>): Promise<Announcement> => {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to broadcast announcement');
    }
    await refreshAll();
    return json.data;
  };

  // Reset Demo Data
  const resetDemoData = async (): Promise<void> => {
    await fetch('/api/reset', { method: 'POST' });
    await refreshAll();
  };

  return (
    <AppContext.Provider
      value={{
        centres,
        activeToken,
        allTokens,
        mspCatalog,
        announcements,
        analytics,
        userLocation,
        isLocating,
        userRole,
        setUserRole,
        selectedCentre,
        setSelectedCentre,
        bookingCentre,
        setBookingCentre,
        viewPassToken,
        setViewPassToken,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCrop,
        setSelectedCrop,
        selectedDistrict,
        setSelectedDistrict,
        selectedStatus,
        setSelectedStatus,
        selectedRadius,
        setSelectedRadius,
        loading,
        refreshAll,
        detectUserLocation,
        bookToken,
        updateTokenStatus,
        callNextToken,
        updateCentreStatus,
        updateCentreCrop,
        broadcastAnnouncement,
        resetDemoData,
        setActiveToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
