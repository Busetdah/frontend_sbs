"use client";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Body2() {

    const [authorized, setAuthorized] = useState(false);
    const [variableCtq1, setVariableCtq1] = useState({ pressure: 0, status: "NORMAL" });
    const [variableCtq2, setVariableCtq2] = useState({ gatevalve: 0, status: "NORMAL" });
    const [variableCtq3, setVariableCtq3] = useState({ predictedWeight: 0, offspec: 0, onspec: 0 });

    useEffect(() => {
      const hasPredicted = sessionStorage.getItem("predicted");
      if (!hasPredicted) {
        window.location.href = "/";
      } else {
        setAuthorized(true);
        sessionStorage.removeItem("predicted");
      }
    }, []);

    const useSSE = (url, setData, thresholdLow, thresholdHigh) => {
      useEffect(() => {
        if (!authorized) return;
        
        const eventSource = new EventSource(`${API_URL}${url}`);
    
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (url === "/api/variablectq1") {
              const pressure = data?.pressure || 0;
              const status = pressure < thresholdLow ? "LOW" : pressure > thresholdHigh ? "OVER" : "NORMAL";
              setData({ pressure, status });
            } else if (url === "/api/variablectq2") {
              const gatevalve = data?.gatevalve || 0;
              const status = gatevalve < thresholdLow ? "LOW" : gatevalve > thresholdHigh ? "OVER" : "NORMAL";
              setData({ gatevalve, status });
            } else if (url === "/api/variablectq3") {
              const predictedWeight = data?.predicted_weight?.predicted_weight || 0;
              const offspec = data?.status_counts?.offspec || 0;
              const onspec = data?.status_counts?.onspec || 0;
              const statusSpec = data?.predicted_weight?.status === "ONSPEC" ? "ONSPEC" : "OFFSPEC";
              setData({ predictedWeight, offspec, onspec, statusSpec });
            }
          } catch (error) {
            console.error(`Error parsing SSE data from ${url}:`, error);
          }
        };
    
        eventSource.onerror = () => {
          console.error(`SSE connection error for ${url}, closing connection.`);
          eventSource.close();
        };
    
        return () => {
          eventSource.close();
        };
      }, [authorized]);
    };
    
    useSSE("/api/variablectq1", setVariableCtq1, 9, 10);
    useSSE("/api/variablectq2", setVariableCtq2, 0.04, 0.05);
    useSSE("/api/variablectq3", setVariableCtq3, 40, 80);

    if (!authorized) return null;

    return (
    <div className="custom-height bg-blue py-1 relative">
        <div className="absolute solenoid-valve">
            <img className="solenoid-valve-image" src="/sol_val.png"/>
        </div>
        <div className="absolute kodrum">
            <img className="kodrum-image" src="/kodrum.png"/>
        </div>
        <div className="absolute custom-hopper2">
            <img className="custom-hopper-image" src="/hopper-2.png"></img>
        </div>
        <div className="custom-size-pressure absolute flex flex-col items-center gray-custom rounded-sm text-monitoring-custom" style={{ bottom: "7%", left: "10%" }}>
            <div className="flex items-center">
                <img src="/ctq1.png" alt="CTQ" className="custom-logo-pressure" />
                <div className="bg-gray-800 p-3 rounded-sm flex flex-col items-center text-white">
                    <h2 className="font-bold text-center">Variable CTQ</h2>
                    <div className="font-bold text-green-400">{variableCtq1.pressure} Psi</div>
                </div>
            </div>
            <div className="flex justify-around w-full mt-3">
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq1.status === "LOW" ? "bg-green-500" : "bg-gray-500"}`}></div>
                    <span className="text-green-700 font-semibold">LOW</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq1.status === "NORMAL" ? "bg-yellow-500" : "bg-gray-500"}`}></div>
                    <span className="text-yellow-700 font-semibold">NORMAL</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq1.status === "OVER" ? "bg-red-500" : "bg-gray-500"}`}></div>
                    <span className="text-red-700 font-semibold">OVER</span>
                </div>
            </div>
        </div>
        <div className="absolute text-monitoring-custom custom-size-pressure flex flex-col items-center gray-custom rounded-sm" style={{ bottom: "30%", left: "48%" }}>
            <div className="flex items-center">
                <img src="/ctq2.png" alt="CTQ" className="custom-logo-pressure" />
                <div className="bg-gray-800 p-3 rounded-sm flex flex-col items-center text-white">
                    <h2 className="font-bold text-center">Variable CTQ</h2>
                    <div className="font-bold text-green-400">{variableCtq2.gatevalve} ms</div>
                </div>
            </div>
            <div className="flex justify-around w-full mt-3">
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq2.status === "LOW" ? "bg-green-500" : "bg-gray-500"}`}></div>
                    <span className="text-green-700 font-semibold">LOW</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq2.status === "NORMAL" ? "bg-yellow-500" : "bg-gray-500"}`}></div>
                    <span className="text-yellow-700 font-semibold">NORMAL</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`custom-indicator border border-white rounded-sm ${variableCtq2.status === "OVER" ? "bg-red-500" : "bg-gray-500"}`}></div>
                    <span className="text-red-700 font-semibold">OVER</span>
                </div>
            </div>
        </div>
        <div className="absolute text-monitoring-custom custom-size-weight gray-custom border border-white text-gray-800" style={{ bottom: "30%", right: "10%" }}>
            <div className="bg-gray-800 p-3 rounded-sm mt-2 flex flex-col items-center">
            <h2 className="font-bold text-center text-white">Variable CTQ</h2>
                <div className="font-bold text-green-400">{variableCtq3.predictedWeight} kg</div>
            </div>
            <div className="flex justify-between mt-3">
                <div className="flex items-center">
                <div className={`custom-indicator border border-white mr-1 ${variableCtq3.statusSpec === "ONSPEC" ? "bg-green-500" : "bg-gray-500"}`}></div>
                <span className="font-semibold text-green-600">ONSPEC</span>
                </div>
                <div className="flex items-center">
                <div className={`custom-indicator border border-white mr-1 ${variableCtq3.statusSpec === "OFFSPEC" ? "bg-red-500" : "bg-gray-500"}`}></div>
                <span className="font-semibold text-red-600">OFFSPEC</span>
                </div>
            </div>
            <div className="mt-2 text-gray-800">
                <p>On Spec: <span className="font-bold">{variableCtq3.onspec} bag</span></p>
                <p>Off Spec: <span className="font-bold">{variableCtq3.offspec} bag</span></p>
            </div>
        </div>
        <div className="conveyor-check absolute z-20" style={{ bottom: '15%', right: '2%' }}>
            <div className="belt">
                <span className="belt-text underline">Check Weigher Conveyor</span>
            </div>
            <div className="wheel left-wheel">
                <div className="inner-wheel">
                    <span className="plus-sign">+</span>
                </div>
            </div>
            <div className="wheel right-wheel">
                <div className="inner-wheel">
                    <span className="plus-sign">+</span>
                </div>
            </div>
        </div>
        <div className="flex absolute motor-m713d-page2 items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col text-monitoring-custom">
                <span className="text-white font-bold">M713D</span>
                <span className="text-green-400 font-semibold">88.8 A</span>
            </div>
        </div>
    </div>
    );
}
