import React from 'react';
import { useAran } from '../../context/AranContext';
import { Activity, Info, AlertCircle, CheckCircle, Navigation } from 'lucide-react';

export const SystemTimeline: React.FC = () => {
  const { events, setSelectedIncident, incidents } = useAran();

  return (
    <div className="flex flex-col h-full bg-[#0C1420] border border-[#1a2a3a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[#1a2a3a] flex items-center justify-between bg-[#070B12]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00E5FF]" />
          <h2 className="text-xs font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
            SYSTEM EVENT AUDIT LOG
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#8797AA]">
          {events.length} ENTRIES
        </span>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {events.map((evt) => {
          const icon =
            evt.type === 'ALERT' ? (
              <AlertCircle className="w-3.5 h-3.5 text-[#FFB020] shrink-0" />
            ) : evt.type === 'SUCCESS' ? (
              <CheckCircle className="w-3.5 h-3.5 text-[#22D69A] shrink-0" />
            ) : evt.type === 'DISPATCH' ? (
              <Navigation className="w-3.5 h-3.5 text-[#318BFF] shrink-0" />
            ) : (
              <Info className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
            );

          return (
            <div
              key={evt.id}
              className="flex items-start gap-2.5 p-2 rounded bg-[#070B12] border border-[#1a2a3a] text-xs hover:border-[#223547] transition"
            >
              <div className="mt-0.5">{icon}</div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-[#8797AA] font-mono">
                  <span className="text-[#00E5FF] font-semibold">{evt.agentName}</span>
                  <span>{evt.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#EAF3FF] leading-snug">{evt.action}</p>

                {evt.incidentId && (
                  <button
                    onClick={() => {
                      const inc = incidents.find((i) => i.id === evt.incidentId);
                      if (inc) setSelectedIncident(inc);
                    }}
                    className="text-[9px] text-[#00E5FF] hover:underline font-mono inline-block pt-0.5"
                  >
                    View Incident {evt.incidentId} &rarr;
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
