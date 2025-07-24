import React from "react";

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

// Utility to get incident color based on type
const getIncidentColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "gun threat":
      return "bg-red-500";
    case "unauthorised access":
      return "bg-orange-500";
    case "face recognised":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

// Calculate min and max timestamps from incidents
const getTimeRange = (incidents: Incident[]) => {
  if (incidents.length === 0) {
    // default to a full day in ms
    return { min: 0, max: 24 * 60 * 60 * 1000 };
  }
  const startTimes = incidents.map((i) => new Date(i.tsStart).getTime());
  const endTimes = incidents.map((i) => new Date(i.tsEnd).getTime());
  return { min: Math.min(...startTimes), max: Math.max(...endTimes) };
};

// Generate equally spaced tick dates within the range
const generateTicks = (minMs: number, maxMs: number, tickCount = 12) => {
  const step = (maxMs - minMs) / tickCount;
  const ticks: Date[] = [];
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(new Date(minMs + i * step));
  }
  return ticks;
};

const TimelinePanel = ({
  incidents,
  cameras,
  onSelectIncident,
}: {
  incidents: Incident[];
  cameras: Camera[];
  onSelectIncident: (incident: Incident) => void;
}) => {
  // Calculate the dynamic time range and ticks
  const { min, max } = getTimeRange(incidents);
  const ticks = generateTicks(min, max, 12);

  // Calculate incident positions relative to the dynamic time range
  const getIncidentTimelineStyleDynamic = (incident: Incident) => {
    const start = new Date(incident.tsStart).getTime();
    const end = new Date(incident.tsEnd).getTime();
    const totalDuration = max - min;
    const leftPercent = ((start - min) / totalDuration) * 100;
    const widthPercent = ((end - start) / totalDuration) * 100 || 0.8;
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
    };
  };

  return (
    <div className="bg-[#131313] w-[98vw] rounded-xl p-12 mx-auto">
      
      <h3 className="text-white font-semibold mb-3">Camera List</h3>

      {/* Dynamic time ruler */}
      <div className="flex justify-between text-xs text-gray-400 mb-1 px-8 select-none">
        {ticks.map((tick, idx) => (
          <span key={idx} className="text-[10px]">
            {tick.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        ))}
      </div>

      {/* Timeline rows per camera */}
      <div className="space-y-3">
        {cameras.map((camera) => (
          <div key={camera.id} className="flex items-center">
            <div className="w-28 text-sm text-white flex-shrink-0">
              {camera.name}
            </div>
            <div className="flex-1 relative h-8 bg- border border-gray-600 rounded ml-2">
              {incidents
                .filter((i) => i.camera.id === camera.id)
                .map((incident) => {
                  const style = getIncidentTimelineStyleDynamic(incident);
                  return (
                    <div
                      key={incident.id}
                      className={`absolute top-1 h-6 w-full  ${getIncidentColor(
                        incident.type
                      )} rounded text-xs flex items-center justify-center cursor-pointer hover:opacity-80  ${
                        incident.resolved ? "opacity-50" : ""
                      }`}
                      style={style}
                      onClick={() => onSelectIncident(incident)}
                      title={`${incident.type} - ${new Date(
                        incident.tsStart
                      ).toLocaleTimeString()} to ${new Date(
                        incident.tsEnd
                      ).toLocaleTimeString()} ${
                        incident.resolved ? "(Resolved)" : ""
                      }`}
                    >
                      <span className="text-white px-1 truncate font-semibold text-[10px]">
                        {incident.type.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePanel;
