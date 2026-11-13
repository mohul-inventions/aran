export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
export type IncidentStatus = 'PENDING' | 'TRIAGED' | 'DISPATCHED' | 'RESCUE_ACTIVE' | 'RESOLVED';
export type DisasterType = 'FLOOD' | 'CYCLONE' | 'BUILDING_COLLAPSE' | 'FIRE' | 'MEDICAL_EMERGENCY' | 'LANDSLIDE';
export type SignalSource = 'LoRa Mesh Grid' | 'Satellite Uplink' | 'Emergency SMS' | 'Voice/IVR (Tamil/Eng)' | 'Citizen App' | 'Drone Thermal Sensor';

export interface Incident {
  id: string;
  title: string;
  type: DisasterType;
  severity: SeverityLevel;
  status: IncidentStatus;
  locationName: string;
  lat: number;
  lng: number;
  victimCount: number;
  waterLevelMeters?: number;
  medicalUrgency: boolean;
  timestamp: string;
  source: SignalSource;
  confidenceScore: number; // 0 - 100
  triageScore: number;     // 0 - 100
  assignedUnitId?: string;
  assignedUnitName?: string;
  aiRationale: string;
  rawSignalText?: string;
}

export type ResourceType = 'NDRF_BOAT' | 'SDRF_AMBULANCE' | 'FIRE_RESCUE' | 'MEDEVAC_HELI' | 'DRONE_SQUAD' | 'COMM_RELAY';
export type ResourceStatus = 'AVAILABLE' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'RETURNING';

export interface RescueResource {
  id: string;
  name: string;
  callSign: string;
  type: ResourceType;
  status: ResourceStatus;
  lat: number;
  lng: number;
  crewCount: number;
  capacity: number;
  fuelBattery: number; // percentage 0 - 100
  assignedIncidentId?: string;
  baseStation: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  tamilName: string;
  role: string;
  status: 'ACTIVE' | 'PROCESSING' | 'STANDBY';
  confidence: number;
  latencyMs: number;
  lastActivity: string;
  inputSample: string;
  outputSample: string;
  explainability: string;
  metrics: {
    processedCount: number;
    accuracyPercent: number;
    currentLoadPercent: number;
  };
}

export interface ApprovalRequest {
  id: string;
  incidentId: string;
  incidentTitle: string;
  locationName: string;
  severity: SeverityLevel;
  recommendedAction: string;
  assignedResourceName: string;
  assignedResourceId: string;
  etaMinutes: number;
  timestamp: string;
  status: 'PENDING' | 'APPROVED' | 'OVERRIDDEN';
  aiRationale: string;
  riskFactor: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  agentName: string;
  action: string;
  type: 'INFO' | 'ALERT' | 'SUCCESS' | 'DISPATCH';
  incidentId?: string;
}

export interface NetworkHealth {
  meshNodesActive: number;
  meshNodesTotal: number;
  satelliteUplinkActive: boolean;
  latencyMs: number;
  syncState: 'SYNCHRONIZED' | 'SYNCING' | 'OFFLINE_MESH';
  bandwidthKbps: number;
  lastSyncTime: string;
}
