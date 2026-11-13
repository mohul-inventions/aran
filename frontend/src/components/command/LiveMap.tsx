import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAran } from '../../context/AranContext';
import { Incident, RescueResource } from '../../types/aran';

// Component to smoothly center map when selected incident changes
const MapRecenter: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom || 13, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Custom SVG-based DivIcons for incidents
const createIncidentIcon = (incident: Incident, isSelected: boolean) => {
  const color =
    incident.severity === 'CRITICAL'
      ? '#FF394F'
      : incident.severity === 'HIGH'
      ? '#FFB020'
      : '#22D69A';

  const pulseRing =
    incident.severity === 'CRITICAL' || isSelected
      ? `<div class="absolute -inset-2 rounded-full border border-[${color}] animate-ping opacity-60"></div>`
      : '';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
      ${pulseRing}
      <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" 
           style="background-color: #070B12; border-color: ${color}; box-shadow: 0 0 14px ${color}80;">
        <span class="text-[10px] font-bold" style="color: ${color}">
          ${incident.triageScore}
        </span>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 rotate-45 border-r-2 border-b-2" 
           style="background-color: #070B12; border-color: ${color};"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-incident-marker',
    iconSize: [32, 36],
    iconAnchor: [16, 36],
    popupAnchor: [0, -36],
  });
};

// Custom SVG-based DivIcons for rescue units
const createResourceIcon = (resource: RescueResource) => {
  const iconEmoji =
    resource.type === 'NDRF_BOAT'
      ? '🚤'
      : resource.type === 'SDRF_AMBULANCE'
      ? '🚑'
      : resource.type === 'FIRE_RESCUE'
      ? '🚒'
      : resource.type === 'MEDEVAC_HELI'
      ? '🚁'
      : resource.type === 'DRONE_SQUAD'
      ? '🛸'
      : '📡';

  const statusColor =
    resource.status === 'AVAILABLE'
      ? '#22D69A'
      : resource.status === 'DISPATCHED'
      ? '#318BFF'
      : '#00E5FF';

  const html = `
    <div class="relative flex items-center justify-center transition-transform hover:scale-110">
      <div class="w-8 h-8 rounded-md flex items-center justify-center border text-sm shadow-md"
           style="background-color: #0C1420; border-color: ${statusColor}; box-shadow: 0 0 10px ${statusColor}60;">
        ${iconEmoji}
      </div>
      <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-[#070B12]"
            style="background-color: ${statusColor}"></span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-resource-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

export const LiveMap: React.FC = () => {
  const { incidents, resources, selectedIncident, setSelectedIncident } = useAran();

  const defaultCenter: [number, number] = selectedIncident
    ? [selectedIncident.lat, selectedIncident.lng]
    : [13.0100, 80.2100]; // Chennai Command Center Area

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-lg overflow-hidden border border-[#1a2a3a] bg-[#070B12]">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-[#070B12]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#1a2a3a] text-xs">
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
        <span className="text-[#EAF3FF] font-medium tracking-wide">CHENNAI DISASTER GRID</span>
        <span className="text-[#8797AA]">|</span>
        <span className="text-[#8797AA] text-[11px]">{incidents.length} active zones</span>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-4 bg-[#070B12]/90 backdrop-blur-md px-3 py-2 rounded-md border border-[#1a2a3a] text-[11px] text-[#8797AA]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF394F]"></span>
          <span>Critical (88+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFB020]"></span>
          <span>High (75+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22D69A]"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#318BFF]"></span>
          <span>Rescue Unit</span>
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="w-full h-full"
        style={{ background: '#070B12', minHeight: '460px' }}
      >
        {/* Dark Theme Tactical Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="aran-dark-tiles"
        />

        {selectedIncident && (
          <MapRecenter center={[selectedIncident.lat, selectedIncident.lng]} />
        )}

        {/* Hazard Inundation Overlay Zones */}
        <Circle
          center={[13.0224, 80.2422]}
          radius={1200}
          pathOptions={{
            color: '#00E5FF',
            fillColor: '#00E5FF',
            fillOpacity: 0.12,
            weight: 1,
            dashArray: '4, 8',
          }}
        />
        <Circle
          center={[12.9790, 80.2185]}
          radius={900}
          pathOptions={{
            color: '#318BFF',
            fillColor: '#318BFF',
            fillOpacity: 0.15,
            weight: 1,
            dashArray: '3, 6',
          }}
        />

        {/* Render Dispatch Routes for assigned incidents */}
        {incidents.map((incident) => {
          if (!incident.assignedUnitId) return null;
          const unit = resources.find((r) => r.id === incident.assignedUnitId);
          if (!unit) return null;

          return (
            <Polyline
              key={`route-${incident.id}-${unit.id}`}
              positions={[
                [unit.lat, unit.lng],
                [incident.lat, incident.lng],
              ]}
              pathOptions={{
                color: '#00E5FF',
                weight: 2,
                dashArray: '6, 8',
                opacity: 0.8,
              }}
            />
          );
        })}

        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}
            icon={createIncidentIcon(incident, selectedIncident?.id === incident.id)}
            eventHandlers={{
              click: () => setSelectedIncident(incident),
            }}
          >
            <Popup className="aran-leaflet-popup">
              <div className="p-2 min-w-[220px] text-left">
                <div className="flex items-center justify-between border-b border-[#223547] pb-1.5 mb-2">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
                    style={{
                      background:
                        incident.severity === 'CRITICAL'
                          ? '#FF394F22'
                          : incident.severity === 'HIGH'
                          ? '#FFB02022'
                          : '#22D69A22',
                      color:
                        incident.severity === 'CRITICAL'
                          ? '#FF394F'
                          : incident.severity === 'HIGH'
                          ? '#FFB020'
                          : '#22D69A',
                    }}
                  >
                    {incident.severity} · SCORE {incident.triageScore}
                  </span>
                  <span className="text-[10px] text-[#8797AA]">{incident.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-[#EAF3FF] mb-1 leading-snug">
                  {incident.title}
                </h4>
                <p className="text-[11px] text-[#00E5FF] mb-2">{incident.locationName}</p>

                <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#070B12] p-1.5 rounded mb-2 text-[#8797AA]">
                  <div>
                    Victims: <span className="text-[#EAF3FF] font-semibold">{incident.victimCount}</span>
                  </div>
                  <div>
                    Water: <span className="text-[#00E5FF] font-semibold">{incident.waterLevelMeters || 0}m</span>
                  </div>
                  <div>
                    Source: <span className="text-[#EAF3FF]">{incident.source.split(' ')[0]}</span>
                  </div>
                  <div>
                    Status: <span className="text-[#22D69A]">{incident.status}</span>
                  </div>
                </div>

                {incident.assignedUnitName && (
                  <div className="text-[10px] text-[#318BFF] font-medium bg-[#318BFF15] p-1.5 rounded mb-2">
                    Unit: {incident.assignedUnitName}
                  </div>
                )}

                <button
                  onClick={() => setSelectedIncident(incident)}
                  className="w-full text-center py-1 bg-[#00E5FF] text-[#070B12] text-[10px] font-bold rounded hover:bg-cyan-300 transition"
                >
                  FOCUS &amp; REASONING TRACE
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Resource Markers */}
        {resources.map((resource) => (
          <Marker
            key={resource.id}
            position={[resource.lat, resource.lng]}
            icon={createResourceIcon(resource)}
          >
            <Popup className="aran-leaflet-popup">
              <div className="p-2 min-w-[200px] text-left">
                <div className="flex items-center justify-between border-b border-[#223547] pb-1.5 mb-1.5">
                  <span className="text-xs font-bold text-[#EAF3FF]">{resource.callSign}</span>
                  <span
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase"
                    style={{
                      background:
                        resource.status === 'AVAILABLE' ? '#22D69A22' : '#318BFF22',
                      color:
                        resource.status === 'AVAILABLE' ? '#22D69A' : '#318BFF',
                    }}
                  >
                    {resource.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#8797AA] mb-1">{resource.name}</p>
                <div className="text-[10px] space-y-0.5 text-[#8797AA]">
                  <div>Base: <span className="text-[#EAF3FF]">{resource.baseStation}</span></div>
                  <div>Capacity: <span className="text-[#EAF3FF]">{resource.capacity} seats</span></div>
                  <div>Fuel/Battery: <span className="text-[#22D69A] font-bold">{resource.fuelBattery}%</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
