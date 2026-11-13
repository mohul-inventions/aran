import React from 'react';
import { useAran } from '../../context/AranContext';
import { RescueResource } from '../../types/aran';
import { Truck, Battery, Users, ShieldCheck } from 'lucide-react';

export const ResourceTracker: React.FC = () => {
  const { resources, incidents, setSelectedIncident } = useAran();

  return (
    <div className="flex flex-col h-full bg-[#0C1420] border border-[#1a2a3a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[#1a2a3a] flex items-center justify-between bg-[#070B12]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#318BFF]" />
          <h2 className="text-xs font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
            RESCUE RESOURCE FLEET
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[#318BFF] bg-[#318BFF]/10 px-2 py-0.5 rounded">
          {resources.filter((r) => r.status === 'AVAILABLE').length}/{resources.length} AVAILABLE
        </span>
      </div>

      {/* Resource Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {resources.map((res) => {
          const isAvail = res.status === 'AVAILABLE';
          const isDispatched = res.status === 'DISPATCHED';

          const statusColor = isAvail
            ? '#22D69A'
            : isDispatched
            ? '#318BFF'
            : '#00E5FF';

          const iconEmoji =
            res.type === 'NDRF_BOAT'
              ? '🚤'
              : res.type === 'SDRF_AMBULANCE'
              ? '🚑'
              : res.type === 'FIRE_RESCUE'
              ? '🚒'
              : res.type === 'MEDEVAC_HELI'
              ? '🚁'
              : res.type === 'DRONE_SQUAD'
              ? '🛸'
              : '📡';

          return (
            <div
              key={res.id}
              className="bg-[#070B12] border border-[#1a2a3a] rounded-md p-2.5 space-y-2 hover:border-[#223547] transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{iconEmoji}</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#EAF3FF] leading-snug">
                      {res.callSign}
                    </h4>
                    <p className="text-[10px] text-[#8797AA] truncate max-w-[150px]">
                      {res.name}
                    </p>
                  </div>
                </div>

                <span
                  className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded uppercase"
                  style={{
                    backgroundColor: `${statusColor}22`,
                    color: statusColor,
                  }}
                >
                  {res.status}
                </span>
              </div>

              {/* Specs & Readiness */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-[#8797AA] bg-[#111E2D] p-1.5 rounded">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#EAF3FF]" />
                  <span>Crew: {res.crewCount}</span>
                </div>
                <div>
                  Cap: <span className="text-[#EAF3FF] font-semibold">{res.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Battery className="w-3 h-3 text-[#22D69A]" />
                  <span className="text-[#22D69A] font-bold">{res.fuelBattery}%</span>
                </div>
              </div>

              {/* Assigned Mission */}
              {res.assignedIncidentId && (
                <div className="text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 p-1.5 rounded border border-[#00E5FF]/20 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#8797AA]">MISSION:</span>
                  <button
                    onClick={() => {
                      const inc = incidents.find((i) => i.id === res.assignedIncidentId);
                      if (inc) setSelectedIncident(inc);
                    }}
                    className="font-bold underline hover:text-white truncate max-w-[160px]"
                  >
                    {res.assignedIncidentId}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
