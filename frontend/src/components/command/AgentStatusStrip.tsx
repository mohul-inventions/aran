import React from 'react';
import { useAran } from '../../context/AranContext';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const AgentStatusStrip: React.FC = () => {
  const { agents } = useAran();

  return (
    <div className="bg-[#0C1420] border-b border-[#1a2a3a] px-4 py-2 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
      <div className="flex items-center gap-2 shrink-0">
        <Cpu className="w-4 h-4 text-[#00E5FF]" />
        <span className="text-[11px] font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
          AUTONOMOUS 7-AGENT ENGINE:
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {agents.map((agent, i) => {
          const isProcessing = agent.status === 'PROCESSING';

          return (
            <div
              key={agent.id}
              className={`flex items-center gap-2 px-2.5 py-1 rounded border text-xs transition ${
                isProcessing
                  ? 'bg-[#00E5FF]/20 border-[#00E5FF] shadow-sm shadow-[#00E5FF]/30'
                  : 'bg-[#111E2D] border-[#1a2a3a] hover:border-[#2a3e52]'
              }`}
              title={`${agent.name} (${agent.tamilName})\nStatus: ${agent.status}\nLast: ${agent.lastActivity}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isProcessing
                    ? 'bg-[#00E5FF] animate-ping'
                    : 'bg-[#22D69A]'
                }`}
              />
              <span className="text-[11px] text-[#EAF3FF] font-medium whitespace-nowrap">
                {agent.name.replace(' Agent', '')}
              </span>
              <span className="text-[10px] text-[#8797AA] font-mono hidden xl:inline">
                {agent.latencyMs}ms
              </span>
            </div>
          );
        })}
      </div>

      <a
        href="/intelligence"
        className="flex items-center gap-1 text-[11px] text-[#00E5FF] hover:underline shrink-0 pl-2 font-mono"
      >
        <span>Agent Inspector</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
