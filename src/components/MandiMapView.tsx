import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { ProcurementCentre } from '../types';
import { Truck, CheckCircle2, AlertCircle, Clock, Navigation } from 'lucide-react';

// Fix standard leaflet icon path issues in webpack/vite
const createCustomIcon = (status: string) => {
  let color = '#16a34a'; // green
  if (status === 'break') color = '#f59e0b'; // amber
  if (status === 'quota_full') color = '#ea580c'; // orange
  if (status === 'closed') color = '#e11d48'; // red

  return L.divIcon({
    className: 'custom-mandi-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 14px;
          font-weight: bold;
        ">🌾</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `
    <div style="
      background-color: #2563eb;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 6px rgba(37,99,235,0.3);
    "></div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Helper component to center map on user or selected center
function MapAutoCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  return null;
}

export const MandiMapView: React.FC = () => {
  const { centres, userLocation, setSelectedCentre, setBookingCentre } = useApp();
  const { lang, t } = useLanguage();

  const defaultCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [17.9689, 79.5941]; // Warangal coordinates

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Map Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              <span>🗺️</span>
              <span>{t('mapView')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Interactive GPS Location Map of all Procurement Centres, Mandis & PACS Godowns
            </p>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
              <span>Open & Procuring</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" />
              <span>Lunch Break</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-500 border border-white" />
              <span>Quota Full</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-white" />
              <span>Closed</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map Box */}
        <div className="h-[600px] w-full relative z-0">
          <MapContainer
            center={defaultCenter}
            zoom={9}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <MapAutoCenter center={defaultCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Farmer's Current Location */}
            {userLocation && (
              <>
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>
                    <div className="p-1 font-sans text-xs">
                      <div className="font-bold text-blue-700">📍 You Are Here</div>
                      <p className="text-slate-600">Your Current Geolocation</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[userLocation.lat, userLocation.lng]}
                  radius={15000} // 15 km search radius ring
                  pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.08 }}
                />
              </>
            )}

            {/* Centre Markers */}
            {centres.map((centre) => {
              const centreName =
                lang === 'te' && centre.name_te
                  ? centre.name_te
                  : lang === 'hi' && centre.name_hi
                  ? centre.name_hi
                  : centre.name;

              return (
                <Marker
                  key={centre.id}
                  position={[centre.lat, centre.lng]}
                  icon={createCustomIcon(centre.status)}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 max-w-[260px] font-sans">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-agri-100 text-agri-800">
                          {centre.district}
                        </span>
                        <span className="text-[11px] font-bold text-slate-700 font-mono">
                          {centre.queue.currentlyServingToken || 'Active'}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {centreName}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {centre.address}
                      </p>

                      <div className="my-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Queue:</span>
                          <span className="font-bold text-agri-700">
                            {centre.queue.activeQueueCount} vehicles
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 mt-0.5">
                          <span>Hours:</span>
                          <span>{centre.timings.open} - {centre.timings.close}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          onClick={() => setSelectedCentre(centre)}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setBookingCentre(centre)}
                          disabled={centre.status === 'closed' || centre.status === 'quota_full'}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold text-center cursor-pointer disabled:bg-slate-300"
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
