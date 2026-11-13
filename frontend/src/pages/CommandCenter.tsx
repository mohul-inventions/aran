import React, { useState } from 'react';
import { Header } from '../components/command/Header';
import { AgentStatusStrip } from '../components/command/AgentStatusStrip';
import { LiveMap } from '../components/command/LiveMap';
import { IncidentFeed } from '../components/command/IncidentFeed';
import { ApprovalQueue } from '../components/command/ApprovalQueue';
import { ResourceTracker } from '../components/command/ResourceTracker';
import { SystemTimeline } from '../components/command/SystemTimeline';
import { IncidentDetailDrawer } from '../components/command/IncidentDetailDrawer';
import { SOSModal } from '../components/command/SOSModal';
import { useAran } from '../context/AranContext';
import { 
  Map as MapIcon, 
  AlertTriangle, 
  ShieldCheck, 
  Truck, 
  Activity, 
  Info 
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'detail' | 'resources' | 'timeline'>('detail');
  const [mobileTab, setMobileTab] = useState<'map' | 'incidents' | 'approvals' | 'resources'>('map');

  const { selectedIncident, approvals } = useAran();
  const pendingCount = approvals.filter((a) => a.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#070B12] text-[#EAF3FF] flex flex-col font-sans selection:bg-[#00E5FF] selection:text-[#070B12]">
      {/* 1. Header with branding & quick actions */}
      <Header onOpenSOS={() => setIsSOSOpen(true)} />

      {/* 2. 7-Agent Status Strip */}
      <AgentStatusStrip />

      {/* Mobile Tab Switcher (Visible only on small mobile screens < 768px) */}
      <div className="md:hidden flex items-center justify-around bg-[#0C1420] border-b border-[#1a2a3a] p-2 text-xs font-mono">
        <button
          onClick={() => setMobileTab('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
            mobileTab === 'map' ? 'bg-[#00E5FF] text-[#070B12] font-bold' : 'text-[#8797AA]'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>Map</span>
        </button>
        <button
          onClick={() => setMobileTab('incidents')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
            mobileTab === 'incidents' ? 'bg-[#00E5FF] text-[#070B12] font-bold' : 'text-[#8797AA]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Incidents</span>
        </button>
        <button
          onClick={() => setMobileTab('approvals')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded relative ${
            mobileTab === 'approvals' ? 'bg-[#00E5FF] text-[#070B12] font-bold' : 'text-[#8797AA]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Approvals</span>
          {pendingCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#FFB020] animate-ping" />
          )}
        </button>
        <button
          onClick={() => setMobileTab('resources')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
            mobileTab === 'resources' ? 'bg-[#00E5FF] text-[#070B12] font-bold' : 'text-[#8797AA]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Fleet</span>
        </button>
      </div>

      {/* 3. Main Dashboard Grid */}
      <main className="flex-1 p-3 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden">
        {/* Left Column (5 Cols on MD/LG): Feeds & Approvals */}
        <div
          className={`md:col-span-5 flex flex-col gap-3 h-[calc(100vh-125px)] ${
            mobileTab === 'incidents' || mobileTab === 'approvals' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Incident Feed (Top half) */}
          <div className="flex-1 min-h-[300px]">
            <IncidentFeed />
          </div>

          {/* Approval Queue (Bottom half) */}
          <div className="h-[280px]">
            <ApprovalQueue />
          </div>
        </div>

        {/* Right Column (7 Cols on MD/LG): Map & Deep Inspection */}
        <div
          className={`md:col-span-7 flex flex-col gap-3 h-[calc(100vh-125px)] ${
            mobileTab === 'map' || mobileTab === 'resources' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Interactive Live Map (Top 60%) */}
          <div className="h-[55%] min-h-[320px]">
            <LiveMap />
          </div>

          {/* Bottom Inspection Area with Tabs (Bottom 45%) */}
          <div className="flex-1 bg-[#0C1420] border border-[#1a2a3a] rounded-lg flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-[#1a2a3a] px-3 py-1.5 bg-[#070B12] text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBottomTab('detail')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded transition ${
                    activeBottomTab === 'detail'
                      ? 'bg-[#00E5FF] text-[#070B12] font-bold'
                      : 'text-[#8797AA] hover:text-[#EAF3FF]'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Explainable Reasoning</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab('resources')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded transition ${
                    activeBottomTab === 'resources'
                      ? 'bg-[#00E5FF] text-[#070B12] font-bold'
                      : 'text-[#8797AA] hover:text-[#EAF3FF]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Rescue Fleet</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab('timeline')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded transition ${
                    activeBottomTab === 'timeline'
                      ? 'bg-[#00E5FF] text-[#070B12] font-bold'
                      : 'text-[#8797AA] hover:text-[#EAF3FF]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Audit Trail</span>
                </button>
              </div>

              {selectedIncident && activeBottomTab === 'detail' && (
                <span className="text-[10px] text-[#00E5FF] hidden sm:inline">
                  INSPECTING: {selectedIncident.id}
                </span>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-2">
              {activeBottomTab === 'detail' && <IncidentDetailDrawer />}
              {activeBottomTab === 'resources' && <ResourceTracker />}
              {activeBottomTab === 'timeline' && <SystemTimeline />}
            </div>
          </div>
        </div>
      </main>

      {/* 4. SOS Modal Form */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </div>
  );
};
