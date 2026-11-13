import React from 'react';
import { useAran } from '../../context/AranContext';
import { CheckCircle2, XCircle, Clock, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const ApprovalQueue: React.FC = () => {
  const { approvals, approveDispatch, rejectDispatch, setSelectedIncident, incidents } = useAran();

  const pendingList = approvals.filter((a) => a.status === 'PENDING');

  return (
    <div className="flex flex-col h-full bg-[#0C1420] border border-[#1a2a3a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[#1a2a3a] flex items-center justify-between bg-[#070B12]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FFB020]" />
          <h2 className="text-xs font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
            HUMAN APPROVAL QUEUE (HITL)
          </h2>
        </div>
        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
            pendingList.length > 0
              ? 'bg-[#FFB020]/20 text-[#FFB020] animate-pulse'
              : 'bg-[#22D69A]/20 text-[#22D69A]'
          }`}
        >
          {pendingList.length} PENDING DECISIONS
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {pendingList.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#22D69A] mx-auto opacity-80" />
            <p className="text-xs font-semibold text-[#EAF3FF]">All AI Recommendations Actioned</p>
            <p className="text-[11px] text-[#8797AA] max-w-xs mx-auto">
              No pending dispatch approvals. Incoming distress signals will generate explainable recommendations here.
            </p>
          </div>
        ) : (
          pendingList.map((item) => {
            const sevColor =
              item.severity === 'CRITICAL'
                ? '#FF394F'
                : item.severity === 'HIGH'
                ? '#FFB020'
                : '#22D69A';

            return (
              <div
                key={item.id}
                className="bg-[#070B12] border border-[#1a2a3a] rounded-lg p-3 space-y-2.5 transition hover:border-[#223547]"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded"
                        style={{
                          backgroundColor: `${sevColor}22`,
                          color: sevColor,
                        }}
                      >
                        {item.severity}
                      </span>
                      <span className="text-[10px] font-mono text-[#8797AA]">
                        {item.id}
                      </span>
                    </div>
                    <h4
                      onClick={() => {
                        const target = incidents.find((i) => i.id === item.incidentId);
                        if (target) setSelectedIncident(target);
                      }}
                      className="text-xs font-bold text-[#EAF3FF] hover:text-[#00E5FF] cursor-pointer"
                    >
                      {item.incidentTitle}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>ETA ~{item.etaMinutes}m</span>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="bg-[#111E2D] p-2 rounded text-xs border border-[#1a2a3a] space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#00E5FF] font-mono font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>PROPOSED DISPATCH:</span>
                  </div>
                  <p className="text-[11px] text-[#EAF3FF] font-medium leading-relaxed">
                    {item.recommendedAction}
                  </p>
                </div>

                {/* Explainable Rationale */}
                <div className="text-[10px] text-[#8797AA] bg-[#0C1420] p-2 rounded border border-[#1a2a3a] space-y-1">
                  <div className="flex items-center gap-1 text-[#8797AA] font-mono">
                    <Cpu className="w-3 h-3 text-[#22D69A]" />
                    <span className="font-semibold text-[#EAF3FF]">AI EXPLAINABILITY RATIONALE:</span>
                  </div>
                  <p className="italic text-[#8797AA] leading-normal">{item.aiRationale}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => approveDispatch(item.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#22D69A] hover:bg-[#22D69A]/90 text-[#070B12] text-xs font-bold rounded tracking-wider shadow-md transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>APPROVE DISPATCH</span>
                  </button>

                  <button
                    onClick={() => rejectDispatch(item.id)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-[#111E2D] hover:bg-[#FF394F]/20 text-[#8797AA] hover:text-[#FF394F] text-xs font-semibold rounded border border-[#1a2a3a] hover:border-[#FF394F]/40 transition"
                    title="Override AI recommendation and reroute"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>OVERRIDE</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
