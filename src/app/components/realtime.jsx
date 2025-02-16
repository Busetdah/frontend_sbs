"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Color } from "three";

const RealTimeChart = () => {
  const [data, setData] = useState([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/realtime`;

  useEffect(() => {
    const eventSource = new EventSource(API_URL);

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);

        setData((prevData) => {
          const updatedData = [...prevData, { time: new Date().toLocaleTimeString(), ...newData }];
          return updatedData.slice(-20);
        });
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4 custom-height bg-blue text-center">
        <div className="bg-white rounded-xl p-2">
        <h2 className="text-2xl font-bold">ALL PARAMETER BAG MACHINE</h2>
            <div style={{ width: "100%", height: "66vh" }}>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#FF5733" name="Temperature" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="humd" stroke="#33A1FF" name="Humidity" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="weigher" stroke="#33FF57" name="Weigher" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="pressure" stroke="#FF33A1" name="Pressure" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="bucket1PV" stroke="#FFA500" name="Bucket 1 PV" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="bucket1SV" stroke="#00CED1" name="Bucket 1 SV" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="bucket2PV" stroke="#8A2BE2" name="Bucket 2 PV" isAnimationActive={false} dot={false} />
                    <Line type="monotone" dataKey="bucket2SV" stroke="#DC143C" name="Bucket 2 SV" isAnimationActive={false} dot={false} />
                </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default RealTimeChart;
