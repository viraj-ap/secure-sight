"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPanel from "./video-panel";
import IncidentsSidebar from "./incident-sidebar";
import TimelinePanel from "./timeline-panel";
import { Play, SkipBack, SkipForward, Volume2, Settings } from "lucide-react";

export type Incident = {
  id: number;
  camera: { id: number; name: string; location: string };
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
};

export type Camera = {
  id: number;
  name: string;
  location: string;
};

const SecurityDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingResolve, setLoadingResolve] = useState(false);

  // Set current time only on client to avoid hydration mismatch
  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleTimeString("en-IN", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);

  // Fetch incidents using async/await and axios
  const fetchIncidents = async () => {
    try {
      const res = await axios.get<Incident[]>("/api/incidents");
      setIncidents(res.data);
      // Auto select first unresolved
      const firstUnresolved = res.data.find((i) => !i.resolved) || null;
      setSelectedIncident(firstUnresolved);
    } catch (err) {
      console.error("Failed to fetch incidents:", err);
      setError("Failed to fetch incidents");
    }
  };

  // Fetch cameras using async/await and axios
  const fetchCameras = async () => {
    try {
      const res = await axios.get<Camera[]>("/api/cameras");
      setCameras(res.data);
    } catch (err) {
      console.error("Failed to fetch cameras:", err);
      setError("Failed to fetch cameras");
    }
  };

  useEffect(() => {
    fetchIncidents();
    fetchCameras();
  }, []);

  // Resolve handler PATCH to API + update UI with axios and async/await
  const handleResolve = async (incidentId: number) => {
    setLoadingResolve(true);
    setError(null);
    try {
      const res = await axios.patch(`/api/incidents/${incidentId}/resolve`);
      if (res.status !== 200) {
        console.error("Failed to resolve incident");
        setError("Failed to resolve incident");
        setLoadingResolve(false);
        return;
      }
      // Re-fetch updated incidents
      await fetchIncidents();
    } catch (err) {
      console.error("Failed to resolve incident:", err);
      setError("Failed to resolve incident");
    } finally {
      setLoadingResolve(false);
    }
  };

  const resolvedCount = incidents.filter((i) => i.resolved).length;
  const unresolvedIncidents = incidents.filter((i) => !i.resolved);

  if (!currentTime) return null; // SSR/CSR hydration fix

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1">
        <VideoPanel
          selectedIncident={selectedIncident}
          currentTime={currentTime}
          incidents={unresolvedIncidents}
          onSelectIncident={setSelectedIncident}
        />
        <IncidentsSidebar
          incidents={unresolvedIncidents}
          resolvedCount={resolvedCount}
          selectedIncident={selectedIncident}
          onSelectIncident={setSelectedIncident}
          onResolve={handleResolve}
        />
      </div>

      {/* Controls */}
      <div>
        <div className="flex items-center justify-between bg-[#131313] border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-yellow-500">
              <Play size={24} />
            </button>
            <SkipBack size={20} className="text-white hover:text-yellow-500" />
            <SkipForward
              size={20}
              className="text-white hover:text-yellow-500"
            />
            <Volume2 size={20} className="text-white hover:text-yellow-500" />
          </div>
          <Settings size={20} className="text-white hover:text-yellow-500" />
        </div>
      </div>

      <TimelinePanel
        incidents={incidents}
        cameras={cameras}
        onSelectIncident={setSelectedIncident}
      />

      {error && (
        <div
          className="text-red-500 text-center my-2"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default SecurityDashboard;
