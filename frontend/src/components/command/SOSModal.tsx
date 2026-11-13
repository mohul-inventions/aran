import React, { useState } from 'react';
import { useAran } from '../../context/AranContext';
import { DisasterType, SignalSource } from '../../types/aran';
import { X, Mic, AlertTriangle, ShieldCheck, MapPin, Users, Droplets } from 'lucide-react';

const PRESET_LOCATIONS = [
  { name: 'Kotturpuram Riverbank, Chennai', lat: 13.0224, lng: 80.2422 },
  { name: 'Ram Nagar, Velachery, Chennai', lat: 12.9790, lng: 80.2185 },
  { name: 'Mudichur Lowlands, Tambaram', lat: 12.9182, lng: 80.0812 },
  { name: 'Perumbakkam Housing Board, Chennai', lat: 12.8997, lng: 80.1932 },
  { name: 'Ennore Creek Industrial Buffer', lat: 13.2180, lng: 80.3220 },
  { name: 'Silver Beach Coastal Zone, Cuddalore', lat: 11.7480, lng: 79.7714 },
];

export const SOSModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { submitSOS } = useAran();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<DisasterType>('FLOOD');
  const [selectedLoc, setSelectedLoc] = useState(PRESET_LOCATIONS[0]);
  const [customLoc, setCustomLoc] = useState('');
  const [victimCount, setVictimCount] = useState(5);
  const [medicalUrgency, setMedicalUrgency] = useState(true);
  const [waterLevel, setWaterLevel] = useState(1.5);
  const [source, setSource] = useState<SignalSource>('LoRa Mesh Grid');
  const [rawText, setRawText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setRawText('Listening to audio distress feed...');
    setTimeout(() => {
      setRawText('SOS! Rapid flooding near ground floor. 5 people trapped on water tank. Medical assistance needed urgently.');
      setTitle('Terrace Trapped Citizens - Flood Inundation');
      setIsRecording(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const locationName = customLoc.trim() || selectedLoc.name;
    const finalTitle = title.trim() || `${type} Emergency at ${locationName.split(',')[0]}`;

    await submitSOS({
      title: finalTitle,
      type,
      locationName,
      lat: selectedLoc.lat,
      lng: selectedLoc.lng,
      victimCount: Number(victimCount),
      medicalUrgency,
      waterLevelMeters: type === 'FLOOD' ? Number(waterLevel) : undefined,
      rawSignalText: rawText || `Emergency reported at ${locationName}. Victims: ${victimCount}.`,
      source,
    });

    setIsSubmitting(false);
    onClose();
  };

  // Preview triage score calculation
  let previewScore = 60;
  if (type === 'BUILDING_COLLAPSE' || type === 'FLOOD') previewScore += 15;
  if (medicalUrgency) previewScore += 15;
  if (victimCount > 10) previewScore += 10;
  previewScore = Math.min(99, previewScore);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0C1420] border border-[#1a2a3a] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#1a2a3a] flex items-center justify-between bg-[#070B12]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#FF394F]/20 border border-[#FF394F]/40 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#FF394F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#EAF3FF] tracking-wider uppercase font-mono">
                SUBMIT EMERGENCY SOS SIGNAL
              </h3>
              <p className="text-[10px] text-[#8797AA]">
                Direct ingestion into ARAN 7-Agent Autonomous Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8797AA] hover:text-[#EAF3FF] hover:bg-[#111E2D] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Quick Voice / Text Simulator */}
          <div className="bg-[#111E2D] border border-[#1a2a3a] rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#00E5FF] font-semibold">
                AUDIO / SENSOR SIGNAL INGESTION
              </span>
              <button
                type="button"
                onClick={simulateVoiceInput}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded transition ${
                  isRecording
                    ? 'bg-[#FF394F] text-white animate-pulse'
                    : 'bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF]/30'
                }`}
              >
                <Mic className="w-3 h-3" />
                <span>{isRecording ? 'TRANSCRIBING...' : 'SIMULATE VOICE SOS'}</span>
              </button>
            </div>

            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="e.g. SOS near bridge! 4 people trapped in ground floor water..."
              rows={2}
              className="w-full bg-[#070B12] border border-[#1a2a3a] rounded p-2 text-xs text-[#EAF3FF] placeholder-[#8797AA] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          {/* Incident Title */}
          <div>
            <label className="block text-xs font-medium text-[#8797AA] mb-1">
              Incident Summary / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Submerged residential block near Adyar riverbank"
              className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-3 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          {/* Hazard Type & Signal Source */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#8797AA] mb-1">
                Disaster Hazard Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DisasterType)}
                className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-2.5 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="FLOOD">🌊 FLOOD INUNDATION</option>
                <option value="BUILDING_COLLAPSE">🏚️ BUILDING COLLAPSE</option>
                <option value="FIRE">🔥 FIRE & HAZMAT</option>
                <option value="CYCLONE">🌀 CYCLONE / SURGE</option>
                <option value="MEDICAL_EMERGENCY">🚑 CRITICAL MEDICAL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8797AA] mb-1">
                Signal Network Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as SignalSource)}
                className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-2.5 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="LoRa Mesh Grid">📡 LoRa Mesh (Offline)</option>
                <option value="Satellite Uplink">🛰️ Satellite Uplink</option>
                <option value="Emergency SMS">💬 Emergency SMS (112)</option>
                <option value="Voice/IVR (Tamil/Eng)">📞 Voice/IVR Dispatch</option>
                <option value="Drone Thermal Sensor">🛸 Thermal Drone Sensor</option>
              </select>
            </div>
          </div>

          {/* Location Preset Selector */}
          <div>
            <label className="block text-xs font-medium text-[#8797AA] mb-1 flex items-center justify-between">
              <span>Disaster Hotspot Location</span>
              <span className="text-[10px] text-[#00E5FF]">Tamil Nadu Grid Presets</span>
            </label>
            <select
              value={selectedLoc.name}
              onChange={(e) => {
                const found = PRESET_LOCATIONS.find((l) => l.name === e.target.value);
                if (found) setSelectedLoc(found);
              }}
              className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-2.5 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF] mb-2"
            >
              {PRESET_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  📍 {loc.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={customLoc}
              onChange={(e) => setCustomLoc(e.target.value)}
              placeholder="Or enter custom street / building name..."
              className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-3 py-1.5 text-xs text-[#EAF3FF] placeholder-[#8797AA] focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          {/* Numerical Parameters: Victims, Water Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#8797AA] mb-1">
                Estimated Victims
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={victimCount}
                onChange={(e) => setVictimCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-3 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8797AA] mb-1">
                Flood Water Level (m)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={waterLevel}
                onChange={(e) => setWaterLevel(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#111E2D] border border-[#1a2a3a] rounded px-3 py-1.5 text-xs text-[#EAF3FF] focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Medical Urgency Checkbox */}
          <div className="flex items-center gap-2 bg-[#111E2D] p-2.5 rounded border border-[#1a2a3a]">
            <input
              type="checkbox"
              id="medical"
              checked={medicalUrgency}
              onChange={(e) => setMedicalUrgency(e.target.checked)}
              className="w-4 h-4 rounded border-[#1a2a3a] text-[#FF394F] focus:ring-0"
            />
            <label htmlFor="medical" className="text-xs text-[#EAF3FF] cursor-pointer">
              Immediate Medical Priority (patients / elderly / infants / oxygen need)
            </label>
          </div>

          {/* Triage Live Calculation Preview */}
          <div className="bg-[#070B12] border border-[#1a2a3a] p-3 rounded flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#8797AA] block">
                COMPUTED TRIAGE SCORE (CRITICALITY AGENT)
              </span>
              <span className="text-xs text-[#EAF3FF]">
                Classification:{' '}
                <strong
                  style={{
                    color: previewScore >= 88 ? '#FF394F' : previewScore >= 75 ? '#FFB020' : '#22D69A',
                  }}
                >
                  {previewScore >= 88 ? 'CRITICAL (P1)' : previewScore >= 75 ? 'HIGH (P2)' : 'MODERATE (P3)'}
                </strong>
              </span>
            </div>
            <div
              className="text-lg font-black font-mono px-3 py-1 rounded border"
              style={{
                borderColor: previewScore >= 88 ? '#FF394F' : previewScore >= 75 ? '#FFB020' : '#22D69A',
                color: previewScore >= 88 ? '#FF394F' : previewScore >= 75 ? '#FFB020' : '#22D69A',
                backgroundColor: `${previewScore >= 88 ? '#FF394F' : '#22D69A'}15`,
              }}
            >
              {previewScore}/100
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#FF394F] hover:bg-[#FF394F]/90 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition shadow-lg shadow-[#FF394F]/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'INGESTING TO 7-AGENT GRID...' : 'BROADCAST SOS TO ARAN GRID'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
