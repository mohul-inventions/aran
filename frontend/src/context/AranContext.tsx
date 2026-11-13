import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Incident,
  RescueResource,
  AgentInfo,
  ApprovalRequest,
  SystemEvent,
  NetworkHealth,
  SeverityLevel,
  DisasterType,
  SignalSource,
} from '../types/aran';
import {
  INITIAL_INCIDENTS,
  INITIAL_RESOURCES,
  INITIAL_AGENTS,
  INITIAL_APPROVALS,
  INITIAL_EVENTS,
  INITIAL_NETWORK,
} from '../data/mockData';

interface AranContextType {
  incidents: Incident[];
  resources: RescueResource[];
  agents: AgentInfo[];
  approvals: ApprovalRequest[];
  events: SystemEvent[];
  network: NetworkHealth;
  selectedIncident: Incident | null;
  setSelectedIncident: (inc: Incident | null) => void;
  filterSeverity: SeverityLevel | 'ALL';
  setFilterSeverity: (sev: SeverityLevel | 'ALL') => void;
  filterType: DisasterType | 'ALL';
  setFilterType: (t: DisasterType | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  submitSOS: (data: {
    title: string;
    type: DisasterType;
    locationName: string;
    lat: number;
    lng: number;
    victimCount: number;
    medicalUrgency: boolean;
    waterLevelMeters?: number;
    rawSignalText?: string;
    source: SignalSource;
  }) => Promise<Incident>;
  approveDispatch: (approvalId: string) => void;
  rejectDispatch: (approvalId: string) => void;
  isSimulating: boolean;
  simulateCrisisWave: () => void;
  resetGrid: () => void;
  activeTab: 'map' | 'incidents' | 'resources' | 'approvals' | 'timeline';
  setActiveTab: (tab: 'map' | 'incidents' | 'resources' | 'approvals' | 'timeline') => void;
}

const AranContext = createContext<AranContextType | undefined>(undefined);

export const AranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [resources, setResources] = useState<RescueResource[]>(INITIAL_RESOURCES);
  const [agents, setAgents] = useState<AgentInfo[]>(INITIAL_AGENTS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [events, setEvents] = useState<SystemEvent[]>(INITIAL_EVENTS);
  const [network, setNetwork] = useState<NetworkHealth>(INITIAL_NETWORK);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<DisasterType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'incidents' | 'resources' | 'approvals' | 'timeline'>('map');

  // Keep network heartbeat dynamic
  useEffect(() => {
    const timer = setInterval(() => {
      setNetwork((prev) => ({
        ...prev,
        latencyMs: Math.floor(35 + Math.random() * 20),
        bandwidthKbps: Math.floor(450 + Math.random() * 80),
        lastSyncTime: 'Just now',
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const addEvent = (agentName: string, action: string, type: 'INFO' | 'ALERT' | 'SUCCESS' | 'DISPATCH', incidentId?: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newEvt: SystemEvent = {
      id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: timeStr,
      agentName,
      action,
      type,
      incidentId,
    };
    setEvents((prev) => [newEvt, ...prev.slice(0, 49)]);
  };

  const submitSOS = async (data: {
    title: string;
    type: DisasterType;
    locationName: string;
    lat: number;
    lng: number;
    victimCount: number;
    medicalUrgency: boolean;
    waterLevelMeters?: number;
    rawSignalText?: string;
    source: SignalSource;
  }): Promise<Incident> => {
    // Pulse agents status
    setAgents((prev) =>
      prev.map((a) =>
        a.id === 'AGENT-01' || a.id === 'AGENT-04'
          ? { ...a, status: 'PROCESSING' }
          : a
      )
    );

    addEvent('Signal Intelligence Agent', `New SOS signal ingested via ${data.source}: "${data.locationName}"`, 'ALERT');

    // Calculate dynamic triage score
    let baseScore = 60;
    if (data.type === 'BUILDING_COLLAPSE' || data.type === 'FLOOD') baseScore += 15;
    if (data.medicalUrgency) baseScore += 15;
    if (data.victimCount > 10) baseScore += 10;
    const triageScore = Math.min(99, baseScore);
    const severity: SeverityLevel = triageScore >= 88 ? 'CRITICAL' : triageScore >= 75 ? 'HIGH' : triageScore >= 60 ? 'MODERATE' : 'LOW';

    const newId = `INC-${Date.now().toString().slice(-4)}`;
    const newIncident: Incident = {
      id: newId,
      title: data.title,
      type: data.type,
      severity,
      status: 'PENDING',
      locationName: data.locationName,
      lat: data.lat,
      lng: data.lng,
      victimCount: data.victimCount,
      medicalUrgency: data.medicalUrgency,
      waterLevelMeters: data.waterLevelMeters || 1.2,
      timestamp: 'Just now',
      source: data.source,
      confidenceScore: Math.floor(88 + Math.random() * 11),
      triageScore,
      aiRationale: `Distress parsed by Signal Intelligence. Geo-Agent identified elevation hazard. Criticality score: ${triageScore}/100 with urgent response trigger.`,
      rawSignalText: data.rawSignalText || `Emergency reported at ${data.locationName}. ${data.victimCount} victims affected.`,
    };

    setIncidents((prev) => [newIncident, ...prev]);
    setSelectedIncident(newIncident);

    // Create approval recommendation automatically
    setTimeout(() => {
      const availableResource = resources.find((r) => r.status === 'AVAILABLE') || resources[0];
      const newApproval: ApprovalRequest = {
        id: `APP-${Date.now().toString().slice(-4)}`,
        incidentId: newIncident.id,
        incidentTitle: newIncident.title,
        locationName: newIncident.locationName,
        severity: newIncident.severity,
        recommendedAction: `Deploy ${availableResource.name} to ${newIncident.locationName} with water rescue pack`,
        assignedResourceName: availableResource.name,
        assignedResourceId: availableResource.id,
        etaMinutes: Math.floor(7 + Math.random() * 10),
        timestamp: 'Just now',
        status: 'PENDING',
        aiRationale: `Resource Orchestration Agent matched ${availableResource.name} based on proximity and capacity (${availableResource.capacity} seats).`,
        riskFactor: severity === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
      };
      setApprovals((prev) => [newApproval, ...prev]);

      addEvent(
        'Resource Orchestration Agent',
        `Dispatched recommendation for ${newIncident.id} -> ${availableResource.name}`,
        'DISPATCH',
        newIncident.id
      );

      setAgents((prev) =>
        prev.map((a) => ({ ...a, status: 'ACTIVE' }))
      );
    }, 1200);

    return newIncident;
  };

  const approveDispatch = (approvalId: string) => {
    const approval = approvals.find((a) => a.id === approvalId);
    if (!approval) return;

    // Update approval status
    setApprovals((prev) =>
      prev.map((a) => (a.id === approvalId ? { ...a, status: 'APPROVED' } : a))
    );

    // Update resource status
    setResources((prev) =>
      prev.map((r) =>
        r.id === approval.assignedResourceId
          ? {
              ...r,
              status: 'DISPATCHED',
              assignedIncidentId: approval.incidentId,
            }
          : r
      )
    );

    // Update incident status
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === approval.incidentId
          ? {
              ...inc,
              status: 'DISPATCHED',
              assignedUnitId: approval.assignedResourceId,
              assignedUnitName: approval.assignedResourceName,
            }
          : inc
      )
    );

    addEvent(
      'Human Approval Queue',
      `Commander APPROVED dispatch: ${approval.assignedResourceName} -> ${approval.incidentTitle}`,
      'SUCCESS',
      approval.incidentId
    );
  };

  const rejectDispatch = (approvalId: string) => {
    const approval = approvals.find((a) => a.id === approvalId);
    if (!approval) return;

    setApprovals((prev) =>
      prev.map((a) => (a.id === approvalId ? { ...a, status: 'OVERRIDDEN' } : a))
    );

    addEvent(
      'Human Approval Queue',
      `Commander OVERRODE AI recommendation for ${approval.incidentTitle}. Re-evaluating next best unit.`,
      'ALERT',
      approval.incidentId
    );
  };

  const simulateCrisisWave = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    addEvent('Resilience & Sync Agent', 'Crisis Wave Simulation started: Ingesting high-density surge scenario', 'ALERT');

    // Wave 1
    setTimeout(() => {
      submitSOS({
        title: 'Guindy Industrial Estate Chemical Tank Rupture',
        type: 'FIRE',
        locationName: 'Guindy Industrial Area, Chennai',
        lat: 13.0067,
        lng: 80.2085,
        victimCount: 19,
        medicalUrgency: true,
        waterLevelMeters: 0.6,
        source: 'Drone Thermal Sensor',
        rawSignalText: 'Thermal camera detected toxic fume flare at chemical barrel storage. 19 night-shift workers trapped behind flooded exit.',
      });
    }, 1500);

    // Wave 2
    setTimeout(() => {
      submitSOS({
        title: 'Sholinganallur IT Corridor Cut-Off Evacuation',
        type: 'FLOOD',
        locationName: 'Sholinganallur Junction, OMR, Chennai',
        lat: 12.9010,
        lng: 80.2279,
        victimCount: 35,
        medicalUrgency: false,
        waterLevelMeters: 1.9,
        source: 'LoRa Mesh Grid',
        rawSignalText: 'Over 35 stranded commuters at junction bus stop. Flood waters reaching chest height. Battery in phones dying.',
      });
    }, 4000);

    // Wave 3
    setTimeout(() => {
      submitSOS({
        title: 'Saidapet Metro Viaduct Construction Shoring Failure',
        type: 'BUILDING_COLLAPSE',
        locationName: 'Saidapet Bridge, Chennai',
        lat: 13.0185,
        lng: 80.2222,
        victimCount: 7,
        medicalUrgency: true,
        waterLevelMeters: 2.3,
        source: 'Voice/IVR (Tamil/Eng)',
        rawSignalText: 'Saidapet bridge scaffolding partially collapsed into the swollen river. 7 construction workers hanging on safety cables.',
      });
      setIsSimulating(false);
      addEvent('Resilience & Sync Agent', 'Crisis Wave Simulation complete: 3 multi-hazard incidents triaged across all 7 agents.', 'SUCCESS');
    }, 7000);
  };

  const resetGrid = () => {
    setIncidents(INITIAL_INCIDENTS);
    setResources(INITIAL_RESOURCES);
    setAgents(INITIAL_AGENTS);
    setApprovals(INITIAL_APPROVALS);
    setEvents(INITIAL_EVENTS);
    setSelectedIncident(INITIAL_INCIDENTS[0]);
    setIsSimulating(false);
    addEvent('System Controller', 'Command Grid reset to benchmark operational baseline', 'INFO');
  };

  return (
    <AranContext.Provider
      value={{
        incidents,
        resources,
        agents,
        approvals,
        events,
        network,
        selectedIncident,
        setSelectedIncident,
        filterSeverity,
        setFilterSeverity,
        filterType,
        setFilterType,
        searchQuery,
        setSearchQuery,
        submitSOS,
        approveDispatch,
        rejectDispatch,
        isSimulating,
        simulateCrisisWave,
        resetGrid,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AranContext.Provider>
  );
};

export const useAran = () => {
  const context = useContext(AranContext);
  if (!context) {
    throw new Error('useAran must be used within an AranProvider');
  }
  return context;
};
