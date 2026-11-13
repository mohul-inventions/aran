import React from 'react';
import { useAran } from '../../context/AranContext';
import { Incident, SeverityLevel } from '../../types/aran';
import { Search, AlertTriangle, Users, Droplets, MapPin, Radio } from 'lucide-react';

export const IncidentFeed: React.FC = () => {
  const {
    incidents,
    selectedIncident,
    setSelectedIncident,
    filterSeverity,
    setFilterSeverity,
    searchQuery,
    setSearchQuery,
  } = useAran();

  const filtered = incidents.filter((inc) => {
    const matchSev = filterSeverity === 'ALL' || inc.severity === filterSeverity;
    const matchSearch =
      searchQuery === '' ||
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSev && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#0C1420] border border-[#1a2a3a] rounded-lg overflow-hidden">
      {/* Header & Search */}
      <div className="p-3 border-b border-[#1a2a3a] space-y-2 bg-[#070B12]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FF394F]" />
            <h2 className="text-xs font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
              EMERGENCY INCIDENT FEED
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded">
            {filtered.length} ACTIVE
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8797AA] absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search by area, type, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded pl-8 pr-3 py-1.5 text-xs text-[#EAF3FF] placeholder-[#8797AA] focus:outline-none focus:border-[#00E5FF] transition"
          />
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-1 text-[11px] font-mono">
          {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE'] as const).map((sev) => {
            const isSelected = filterSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-0.5 rounded transition ${
                  isSelected
                    ? sev === 'CRITICAL'
                      ? 'bg-[#FF394F] text-white font-bold'
                      : sev === 'HIGH'
                      ? 'bg-[#FFB020] text-[#070B12] font-bold'
                      : sev === 'MODERATE'
                      ? 'bg-[#22D69A] text-[#070B12] font-bold'
                      : 'bg-[#00E5FF] text-[#070B12] font-bold'
                    : 'bg-[#111E2D] text-[#8797AA] hover:text-[#EAF3FF]'
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1a2a3a] p-2 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#8797AA]">
            No emergency reports matching current filters.
          </div>
        ) : (
          filtered.map((inc) => {
            const isSelected = selectedIncident?.id === inc.id;
            const sevColor =
              inc.severity === 'CRITICAL'
                ? '#FF394F'
                : inc.severity === 'HIGH'
                ? '#FFB020'
                : '#22D69A';

            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3 rounded-md cursor-pointer transition border-l-4 ${
                  isSelected
                    ? 'bg-[#111E2D] border-r border-t border-b border-[#00E5FF]/40 shadow-md'
                    : 'bg-[#070B12]/80 hover:bg-[#111E2D] border-[#1a2a3a]'
                }`}
                style={{ borderLeftColor: sevColor }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded"
                        style={{
                          backgroundColor: `${sevColor}22`,
                          color: sevColor,
                        }}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-[10px] font-mono text-[#8797AA]">
                        {inc.id}
                      </span>
                      <span className="text-[10px] text-[#8797AA]">
                        · {inc.timestamp}
                      </span>
                    </div>

                    <h3 className="text-xs font-semibold text-[#EAF3FF] line-clamp-1 leading-snug">
                      {inc.title}
                    </h3>
                  </div>

                  {/* Triage Badge */}
                  <div
                    className="shrink-0 text-center px-1.5 py-0.5 rounded border text-[11px] font-bold font-mono"
                    style={{
                      borderColor: `${sevColor}60`,
                      backgroundColor: `${sevColor}15`,
                      color: sevColor,
                    }}
                    title="AI Triage Urgency Score (0 - 100)"
                  >
                    {inc.triageScore}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#00E5FF] mt-1.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{inc.locationName}</span>
                </div>

                {/* Metrics Row */}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8797AA] font-mono">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#EAF3FF]" />
                    <span>{inc.victimCount} victims</span>
                  </div>
                  {inc.waterLevelMeters && (
                    <div className="flex items-center gap-1 text-[#00E5FF]">
                      <Droplets className="w-3 h-3" />
                      <span>{inc.waterLevelMeters}m flood</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 ml-auto text-[9px] text-[#8797AA] bg-[#111E2D] px-1.5 py-0.5 rounded">
                    <Radio className="w-2.5 h-2.5 text-[#22D69A]" />
                    <span>{inc.source.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Assigned Unit Status */}
                {inc.assignedUnitName && (
                  <div className="mt-2 text-[10px] bg-[#318BFF]/10 border border-[#318BFF]/20 text-[#318BFF] px-2 py-1 rounded flex items-center justify-between font-mono">
                    <span>UNIT DISPATCHED:</span>
                    <span className="font-bold truncate max-w-[140px]">{inc.assignedUnitName}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
