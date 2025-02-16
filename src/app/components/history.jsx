"use client";

import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";

const History = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reload, setReload] = useState(0);
  const containerRef = useRef(null);

  const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/history`;

  useEffect(() => {
    let url = API_URL_BASE;
    if (start && end) {
      url += `?start=${encodeURIComponent(start)}&end=${encodeURIComponent(
        end
      )}&limit=1000&page=1`;
    } else {
      url += `?limit=1000&page=1`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error("Error fetching history data:", err);
      });
  }, [reload, start, end]);

  const handleReload = () => {
    setReload((prev) => prev + 1);
  };

  return (
    <div className="p-4 bg-white custom-height shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-2">Historical Trend Data</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Start Date:&nbsp;
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          End Date:&nbsp;
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <button onClick={handleReload} style={{ marginLeft: "1rem" }}>
          Load Data
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          overflowX: "auto",
          overscrollBehaviorX: "none",
        }}
      >
        <div style={{ width: "96vw", height: "60vh" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#FF5733"
                name="Temperature"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humd"
                stroke="#33A1FF"
                name="Humidity"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#FF33A1"
                name="Pressure"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bucket1PV"
                stroke="#FFA500"
                name="Bucket 1 PV"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bucket1SV"
                stroke="#00CED1"
                name="Bucket 1 SV"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bucket2PV"
                stroke="#8A2BE2"
                name="Bucket 2 PV"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bucket2SV"
                stroke="#DC143C"
                name="Bucket 2 SV"
                isAnimationActive={false}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="weigher"
                stroke="#33FF57"
                name="Weigher"
                isAnimationActive={false}
                dot={false}
              />
              <Brush dataKey="time" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default History;
