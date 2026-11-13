import React, { useState } from 'react';
import { useAran } from '../context/AranContext';
import { AgentInfo } from '../types/aran';
import { 
  Cpu, 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  Layers, 
  Zap, 
  Route, 
  RefreshCw 
} from 'lucide-react';

const AGENT_ICONS: Record<string, React.ReactNode> = {
  'AGENT-01': <Radio className="w-5 h-5 text-[#00E5FF]" />,
  'AGENT-02': <MapPin className="w-5 h-5 text-[#318BFF]" />,
  'AGENT-03': <Layers className="w-5 h-5 text-[#22D69A]" />,
  'AGENT-04': <Zap className="w-5 h-5 text-[#FF394F]" />,
  'AGENT-05': <Sparkles className="w-5 h-5 text-[#FFB020]" />,
  'AGENT-06': <Route className="w-5 h-5 text-[#00E5FF]" />,
  'AGENT-07': <ShieldCheck className="w-5 h-5 text-[#22D69A]" />,
};

export const IntelligencePage: React.FC = () => {
  const { agents } = useAran();
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'AGENT-01');
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const runPipelineSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSelectedAgentId(agents[0].id);

    const stepInterval = setInterval(() => {
      setSimulationStep((prev) => {
        const next = prev + 1;
        if (next >= agents.length) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return agents.length - 1;
        }
        setSelectedAgentId(agents[next].id);
        return next;
      });
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-[#EAF3FF] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#0C1420] border-b border-[#1a2a3a] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a
            href="/command"
            className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] hover:text-cyan-300 transition bg-[#111E2D] px-3 py-1.5 rounded border border-[#1a2a3a]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; COMMAND CENTRE</span>
          </a>

          <div>
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[#00E5FF]" />
              <h1 className="text-lg font-bold tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ARAN <span className="text-[#00E5FF]">SEVEN-AGENT REASONING PIPELINE</span>
              </h1>
            </div>
            <p className="text-[11px] text-[#8797AA] font-mono">
              AUTONOMOUS MULTI-AGENT ARCHITECTURE · EXPLAINABLE DISASTER INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Pipeline Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={runPipelineSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono tracking-wider transition shadow-lg ${
              isSimulating
                ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 animate-pulse'
                : 'bg-[#00E5FF] hover:bg-cyan-300 text-[#070B12] shadow-[#00E5FF]/20'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>STEP {simulationStep + 1}/7 RUNNING...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>RUN LIVE PIPELINE SIMULATION</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Pipeline Stepper Visualizer */}
      <div className="bg-[#070B12] border-b border-[#1a2a3a] px-6 py-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[850px] gap-2">
          {agents.map((agent, index) => {
            const isSelected = selectedAgent.id === agent.id;
            const isCurrentStep = simulationStep === index;
            const isCompletedStep = simulationStep > index;

            return (
              <React.Fragment key={agent.id}>
                <button
                  onClick={() => {
                    if (!isSimulating) setSelectedAgentId(agent.id);
                  }}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition text-center flex-1 ${
                    isSelected
                      ? 'bg-[#111E2D] border border-[#00E5FF] shadow-lg shadow-[#00E5FF]/10'
                      : 'hover:bg-[#0C1420] border border-transparent'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition border ${
                      isCurrentStep
                        ? 'bg-[#00E5FF] text-[#070B12] border-[#00E5FF] animate-bounce'
                        : isCompletedStep
                        ? 'bg-[#22D69A]/20 text-[#22D69A] border-[#22D69A]'
                        : isSelected
                        ? 'bg-[#111E2D] text-[#00E5FF] border-[#00E5FF]'
                        : 'bg-[#0C1420] text-[#8797AA] border-[#1a2a3a]'
                    }`}
                  >
                    {isCompletedStep ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22D69A]" />
                    ) : (
                      AGENT_ICONS[agent.id] || <Cpu className="w-4 h-4" />
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-[#8797AA]">
                    AGENT 0{index + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold leading-tight line-clamp-1 ${
                      isSelected ? 'text-[#00E5FF]' : 'text-[#EAF3FF]'
                    }`}
                  >
                    {agent.name.replace(' Agent', '')}
                  </span>
                  <span className="text-[9px] text-[#8797AA] font-mono">
                    {agent.latencyMs}ms
                  </span>
                </button>

                {index < agents.length - 1 && (
                  <div className="h-0.5 w-6 bg-[#1a2a3a] shrink-0 mx-1 relative">
                    {simulationStep > index && (
                      <div className="absolute inset-0 bg-[#00E5FF] transition-all duration-500" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Agent Deep-Dive Card */}
        <div className="lg:col-span-8 space-y-6">
          {/* Agent Banner Card */}
          <div className="bg-[#0C1420] border border-[#1a2a3a] rounded-xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1a2a3a] pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#111E2D] border border-[#00E5FF]/40 flex items-center justify-center shadow-lg">
                  {AGENT_ICONS[selectedAgent.id] || <Cpu className="w-6 h-6 text-[#00E5FF]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded">
                      {selectedAgent.id}
                    </span>
                    <span className="text-xs font-bold text-[#22D69A] bg-[#22D69A]/10 px-2 py-0.5 rounded">
                      STATUS: {selectedAgent.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#EAF3FF] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {selectedAgent.name}
                  </h2>
                  <p className="text-xs text-[#00E5FF] font-medium mt-0.5">
                    {selectedAgent.tamilName}
                  </p>
                </div>
              </div>

              {/* Confidence Score Pill */}
              <div className="text-right">
                <span className="text-[10px] font-mono text-[#8797AA] block">CONFIDENCE METRIC</span>
                <span className="text-2xl font-black text-[#22D69A] font-mono">
                  {selectedAgent.confidence}%
                </span>
              </div>
            </div>

            {/* Description & Role */}
            <div>
              <h3 className="text-xs font-mono text-[#8797AA] uppercase tracking-wider mb-1">
                OPERATIONAL MANDATE
              </h3>
              <p className="text-sm text-[#EAF3FF] leading-relaxed">
                {selectedAgent.role}
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#111E2D] p-3 rounded-lg border border-[#1a2a3a]">
                <span className="text-[10px] font-mono text-[#8797AA] block">TELEMETRY PROCESSED</span>
                <span className="text-lg font-bold text-[#EAF3FF] font-mono">
                  {selectedAgent.metrics.processedCount.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#111E2D] p-3 rounded-lg border border-[#1a2a3a]">
                <span className="text-[10px] font-mono text-[#8797AA] block">MODEL ACCURACY</span>
                <span className="text-lg font-bold text-[#22D69A] font-mono">
                  {selectedAgent.metrics.accuracyPercent}%
                </span>
              </div>
              <div className="bg-[#111E2D] p-3 rounded-lg border border-[#1a2a3a]">
                <span className="text-[10px] font-mono text-[#8797AA] block">LATENCY PROFILER</span>
                <span className="text-lg font-bold text-[#00E5FF] font-mono">
                  {selectedAgent.latencyMs} ms
                </span>
              </div>
            </div>

            {/* Explainable AI Decision Breakdown */}
            <div className="bg-[#070B12] border border-[#1a2a3a] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>EXPLAINABILITY &amp; CAUSAL REASONING:</span>
              </div>
              <p className="text-xs text-[#EAF3FF] leading-relaxed italic bg-[#111E2D]/50 p-3 rounded border border-[#1a2a3a]">
                &ldquo;{selectedAgent.explainability}&rdquo;
              </p>
            </div>

            {/* Input & Output Payloads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#8797AA] uppercase tracking-wider block">
                  INGESTED INPUT STREAM
                </span>
                <pre className="bg-[#070B12] border border-[#1a2a3a] rounded-lg p-3 text-[11px] font-mono text-[#8797AA] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {selectedAgent.inputSample}
                </pre>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#00E5FF] uppercase tracking-wider block">
                  AGENT DECISION OUTPUT
                </span>
                <pre className="bg-[#070B12] border border-[#00E5FF]/30 rounded-lg p-3 text-[11px] font-mono text-[#00E5FF] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {selectedAgent.outputSample}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Pipeline Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0C1420] border border-[#1a2a3a] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1a2a3a] pb-3">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              <h3 className="text-xs font-bold text-[#EAF3FF] uppercase font-mono tracking-wider">
                PIPELINE EXECUTION ORDER
              </h3>
            </div>

            <ol className="space-y-3 text-xs">
              {agents.map((agent, i) => (
                <li
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition border ${
                    selectedAgent.id === agent.id
                      ? 'bg-[#111E2D] border-[#00E5FF]'
                      : 'hover:bg-[#111E2D]/60 border-transparent'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#111E2D] border border-[#1a2a3a] text-[#00E5FF] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#EAF3FF] leading-tight">
                      {agent.name}
                    </h4>
                    <p className="text-[10px] text-[#8797AA] line-clamp-1 mt-0.5">
                      {agent.role}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Core Problem Statement Alignment */}
          <div className="bg-[#0C1420] border border-[#1a2a3a] rounded-xl p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold text-[#00E5FF] uppercase font-mono tracking-wider">
              DISASTER RESPONSE PRINCIPLES
            </h3>
            <ul className="space-y-2 text-[#8797AA] text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#22D69A] font-bold">&check;</span>
                <span><strong>Explainable AI:</strong> Every unit dispatch comes with human-verifiable causal reasoning.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22D69A] font-bold">&check;</span>
                <span><strong>Offline-First:</strong> LoRa mesh synchronization ensures zero data loss during blackout.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22D69A] font-bold">&check;</span>
                <span><strong>Human-in-the-Loop:</strong> AI recommendations queue for one-click emergency commander approval.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
