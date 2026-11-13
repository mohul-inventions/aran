import React from 'react';
import { useAran } from '../../context/AranContext';
import { X, ShieldAlert, Cpu, MapPin, Users, Droplets, Radio, CheckCircle, Navigation } from 'lucide-react';

export const IncidentDetailDrawer: React.FC = () => {
  const { selectedIncident, setSelectedIncident, resources, approvals, approveDispatch } = useAran();

  if (!selectedIncident) return null;

  const sevColor =
    selectedIncident.severity === 'CRITICAL'
      ? '#FF394F'
      : selectedIncident.severity === 'HIGH'
      ? '#FFB020'
      : '#22D69A';

  const assignedResource = resources.find((r) => r.id === selectedIncident.assignedUnitId);
  const pendingApproval = approvals.find(
    (a) => a.incidentId === selectedIncident.id && a.status === 'PENDING'
  );

  return (
    <div className="bg-[#0C1420] border border-[#1a2a3a] rounded-lg p-4 space-y-4 text-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#1a2a3a] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono"
              style={{
                backgroundColor: `${sevColor}22`,
                color: sevColor,
              }}
            >
              {selectedIncident.severity} · SCORE {selectedIncident.triageScore}
            </span>
            <span className="text-[10px] font-mono text-[#8797AA]">
              {selectedIncident.id}
            </span>
            <span className="text-[10px] text-[#22D69A] font-semibold bg-[#22D69A]/10 px-1.5 py-0.5 rounded uppercase">
              {selectedIncident.status}
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#EAF3FF] leading-snug">
            {selectedIncident.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[#00E5FF] text-[11px]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {selectedIncident.locationName} ({selectedIncident.lat.toFixed(4)},{' '}
              {selectedIncident.lng.toFixed(4)})
            </span>
          </div>
        </div>

        <button
          onClick={() => setSelectedIncident(null)}
          className="p-1 rounded text-[#8797AA] hover:text-[#EAF3FF] hover:bg-[#111E2D]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-[#070B12] p-2.5 rounded border border-[#1a2a3a]">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#EAF3FF]" />
          <div>
            <span className="text-[#8797AA] text-[10px] block">VICTIMS</span>
            <span className="font-bold text-[#EAF3FF]">{selectedIncident.victimCount} persons</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-[#00E5FF]" />
          <div>
            <span className="text-[#8797AA] text-[10px] block">WATER DEPTH</span>
            <span className="font-bold text-[#00E5FF]">{selectedIncident.waterLevelMeters || 0} meters</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#22D69A]" />
          <div>
            <span className="text-[#8797AA] text-[10px] block">INGESTION</span>
            <span className="font-bold text-[#EAF3FF] truncate max-w-[80px] block">
              {selectedIncident.source.split(' ')[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FFB020]" />
          <div>
            <span className="text-[#8797AA] text-[10px] block">AI CONFIDENCE</span>
            <span className="font-bold text-[#22D69A]">{selectedIncident.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Raw Distress Signal */}
      {selectedIncident.rawSignalText && (
        <div className="bg-[#111E2D] p-2.5 rounded border border-[#1a2a3a] space-y-1">
          <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-semibold">
            RAW INTERCEPTED SIGNAL PAYLOAD
          </span>
          <p className="text-[11px] text-[#EAF3FF] font-mono bg-[#070B12] p-2 rounded border border-[#1a2a3a]">
            &ldquo;{selectedIncident.rawSignalText}&rdquo;
          </p>
        </div>
      )}

      {/* Explainable AI Decision Rationale */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00E5FF] font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>7-AGENT MULTI-LAYER REASONING TRACE</span>
        </div>

        <div className="bg-[#070B12] p-3 rounded-lg border border-[#1a2a3a] space-y-2 text-[11px] leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] mt-1 shrink-0" />
            <div>
              <strong className="text-[#00E5FF] font-mono">Criticality Assessment: </strong>
              <span className="text-[#EAF3FF]">{selectedIncident.aiRationale}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#318BFF] mt-1 shrink-0" />
            <div>
              <strong className="text-[#318BFF] font-mono">Geo &amp; Route Intelligence: </strong>
              <span className="text-[#8797AA]">
                Terrain elevation contour validated. Water flow vectors computed along Adyar river basin. High-risk bottlenecks bypassed.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatched Unit or Pending Approval Action */}
      {selectedIncident.assignedUnitName ? (
        <div className="bg-[#318BFF]/15 border border-[#318BFF]/40 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Navigation className="w-5 h-5 text-[#318BFF]" />
            <div>
              <span className="text-[10px] font-mono text-[#318BFF] font-bold block">
                ACTIVE DISPATCH ASSIGNED
              </span>
              <span className="text-xs font-bold text-[#EAF3FF]">
                {selectedIncident.assignedUnitName}
              </span>
              {assignedResource && (
                <span className="text-[10px] text-[#8797AA] block">
                  Base: {assignedResource.baseStation} · Battery: {assignedResource.fuelBattery}%
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#22D69A] bg-[#22D69A]/10 border border-[#22D69A]/30 px-2 py-1 rounded">
            EN ROUTE
          </span>
        </div>
      ) : pendingApproval ? (
        <div className="bg-[#FFB020]/15 border border-[#FFB020]/40 rounded-lg p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#FFB020] font-bold block">
              PENDING COMMANDER APPROVAL
            </span>
            <span className="text-xs text-[#EAF3FF]">
              {pendingApproval.recommendedAction}
            </span>
          </div>
          <button
            onClick={() => approveDispatch(pendingApproval.id)}
            className="px-3 py-1.5 bg-[#22D69A] hover:bg-[#22D69A]/90 text-[#070B12] text-xs font-bold rounded shadow transition"
          >
            APPROVE
          </button>
        </div>
      ) : null}
    </div>
  );
};
