import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Incident } from "./security-dashboard";

const IncidentsSidebar = ({
  incidents,
  resolvedCount,
  selectedIncident,
  onSelectIncident,
  onResolve,
}: {
  incidents: Incident[];
  resolvedCount: number;
  selectedIncident: Incident | null;
  onSelectIncident: (inc: Incident) => void;
  onResolve: (id: number) => void;
}) => (
  <div className="w-1/2 rounded bg-black/50 p-4 flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold flex items-center">
        <AlertTriangle className="mr-2 text-red-500" size={20} />
        {incidents.length} Unresolved Incidents
      </h2>
      <div className="flex items-center text-sm text-green-400">
        <CheckCircle size={16} className="mr-1" />
        <span>{resolvedCount} resolved incidents</span>
      </div>
    </div>
    {/* List */}
    <div className="space-y-3 overflow-y-auto h-[500px]">
      {incidents.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <CheckCircle size={48} className="mx-auto mb-2" />
          <p>No unresolved incidents</p>
        </div>
      ) : (
        incidents.map((incident) => (
          <div
            key={incident.id}
            className={`flex gap-3 p-3 rounded-lg cursor-pointer items-center ${
              selectedIncident?.id === incident.id
                ? "bg-gray-800 ring-2 ring-yellow-500"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => onSelectIncident(incident)}
          >
            <img
              src={incident.thumbnailUrl}
              alt={incident.type}
              className="w-16 h-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-yellow-400 text-sm">
                  {incident.type}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onResolve(incident.id);
                  }}
                  className="text-xs text-yellow-300 hover:text-yellow-100 px-2 py-1 rounded hover:bg-gray-600"
                >
                  Resolve
                </button>
              </div>
              <div className="text-xs text-gray-300">
                {incident.camera.name} ({incident.camera.location})
              </div>
              <div className="text-xs text-gray-400">
                {new Date(incident.tsStart).toLocaleTimeString()} -{" "}
                {new Date(incident.tsEnd).toLocaleTimeString()}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(incident.tsStart).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default IncidentsSidebar;
