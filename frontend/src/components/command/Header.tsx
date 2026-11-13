import React, { useState, useEffect } from 'react';
import { useAran } from '../../context/AranContext';
import { 
  Radio, 
  Activity, 
  ShieldAlert, 
  RefreshCw, 
  PlusCircle, 
  Cpu, 
  Wifi, 
  Home
} from 'lucide-react';

export const Header: React.FC<{ onOpenSOS: () => void }> = ({ onOpenSOS }) => {
  const { network, simulateCrisisWave, isSimulating, resetGrid, incidents, approvals } = useAran();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;
  const criticalCount = incidents.filter((i) => i.severity === 'CRITICAL').length;

  return (
    <header className="bg-[#070B12] border-b border-[#1a2a3a] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      {/* Left: Brand & Title */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 group" title="Return to Landing Page">
          <div className="w-8 h-9 flex items-center justify-center bg-[#0C1420] border border-[#00E5FF]/40 rounded group-hover:border-[#00E5FF] transition">
            <svg viewBox="0 0 120 140" className="w-6 h-6">
              <path d="M60 5 L110 35 L95 125 L25 125 L10 35 Z" fill="none" stroke="#00E5FF" strokeWidth="10" strokeLinejoin="round" />
              <circle cx="60" cy="65" r="14" fill="#318BFF" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-[#EAF3FF]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ARAN
              </span>
              <span className="text-[10px] font-semibold text-[#00E5FF] bg-[#00E5FF]/10 px-1.5 py-0.5 rounded tracking-widest uppercase">
                COMMAND GRID
              </span>
            </div>
            <div className="text-[9px] text-[#8797AA] tracking-widest uppercase font-mono">
              NAALVARX · MULTI-AGENT OPS
            </div>
          </div>
        </a>

        {/* Navigation Shortcut to Intelligence */}
        <div className="hidden lg:flex items-center gap-1 border-l border-[#1a2a3a] pl-3">
          <a
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#8797AA] hover:text-[#EAF3FF] hover:bg-[#111E2D] rounded transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
          <a
            href="/intelligence"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded border border-[#00E5FF]/30 transition"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>7-Agent Pipeline</span>
          </a>
        </div>
      </div>

      {/* Middle: Grid Key Metrics */}
      <div className="hidden md:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 bg-[#0C1420] px-3 py-1 rounded border border-[#1a2a3a]">
          <span className="text-[#8797AA]">TIME:</span>
          <span className="text-[#EAF3FF] font-semibold">{timeStr}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0C1420] px-3 py-1 rounded border border-[#1a2a3a]">
          <Wifi className="w-3.5 h-3.5 text-[#22D69A]" />
          <span className="text-[#8797AA]">MESH:</span>
          <span className="text-[#22D69A] font-semibold">{network.meshNodesActive}/{network.meshNodesTotal} NODES</span>
          <span className="text-[#8797AA]">({network.latencyMs}ms)</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0C1420] px-3 py-1 rounded border border-[#1a2a3a]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FF394F]" />
          <span className="text-[#8797AA]">CRITICAL:</span>
          <span className="text-[#FF394F] font-bold">{criticalCount}</span>
        </div>

        {pendingApprovalsCount > 0 && (
          <div className="flex items-center gap-1.5 bg-[#FFB020]/15 px-3 py-1 rounded border border-[#FFB020]/40 text-[#FFB020] animate-pulse">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-bold">{pendingApprovalsCount} APPROVALS QUEUED</span>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={simulateCrisisWave}
          disabled={isSimulating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold tracking-wider transition ${
            isSimulating
              ? 'bg-[#FF394F]/20 text-[#FF394F] border border-[#FF394F]/40 cursor-not-allowed'
              : 'bg-[#00E5FF]/15 text-[#00E5FF] hover:bg-[#00E5FF]/25 border border-[#00E5FF]/40'
          }`}
          title="Stream live multi-hazard distress wave across Chennai"
        >
          <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">
            {isSimulating ? 'SIMULATING WAVE...' : 'SIMULATE CRISIS WAVE'}
          </span>
          <span className="sm:hidden">SIMULATE</span>
        </button>

        <button
          onClick={onOpenSOS}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF394F] hover:bg-[#FF394F]/90 text-white rounded text-xs font-bold tracking-wider shadow-lg shadow-[#FF394F]/20 transition"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ REPORT SOS</span>
        </button>

        <button
          onClick={resetGrid}
          className="p-1.5 text-[#8797AA] hover:text-[#EAF3FF] hover:bg-[#111E2D] rounded border border-transparent hover:border-[#1a2a3a] transition"
          title="Reset Demo Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
