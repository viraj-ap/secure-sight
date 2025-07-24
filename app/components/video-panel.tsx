import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Camera,
} from "lucide-react";
import { Incident } from "./security-dashboard";

const VideoPanel = ({
  selectedIncident,
  currentTime,
  incidents,
  onSelectIncident,
}: {
  selectedIncident: Incident | null;
  currentTime: string;
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}) => (
  <div className="w-1/2 p-4 mt-[2px] border-r border-gray-800 flex flex-col">
    {/* Main Video Feed */}
    <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4 h-[500px]">
      {selectedIncident ? (
        <img
          src={selectedIncident.thumbnailUrl}
          alt="Security Feed"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera size={48} className="mx-auto mb-2 text-gray-500" />
          <p className="text-gray-500">No incident selected</p>
        </div>
      )}
      {/* UI overlays, previews, timestamp, camera name, etc as in your code */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-60 px-2 py-1 rounded text-sm">
        📅{" "}
        {selectedIncident
          ? new Date(selectedIncident.tsStart).toLocaleDateString()
          : "-"}{" "}
        - {currentTime}
      </div>
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-2 py-1 rounded text-sm">
        📹 {selectedIncident?.camera.name ?? ""}
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {incidents.slice(0, 2).map((incident) => (
          <img
            key={incident.id}
            src={incident.thumbnailUrl}
            alt="Preview"
            className="w-16 h-12 object-cover rounded border border-white cursor-pointer hover:border-yellow-500"
            onClick={() => onSelectIncident(incident)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default VideoPanel;
