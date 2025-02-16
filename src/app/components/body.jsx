"use client";
import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { GiFire, GiWaterDrop } from "react-icons/gi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function body() {

    const [monitoringRoom, setMonitoringRoom] = useState({ temp: 0, humd: 0 });
    const [qcData, setQcData] = useState({ onSpec: 0, offSpec: 0, weigher: 0 });
    const [weigherData1, setWeigherData1] = useState({ lpv: 0, sv: 0 });
    const [weigherData2, setWeigherData2] = useState({ lpv: 0, sv: 0 });
    const [airPressure, setPressure] = useState(0);

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
      });

    const useSSE = (url, setData, transformData) => {
        useEffect(() => {
            const eventSource = new EventSource(`${API_URL}${url}`);

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setData(transformData(data));
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
        }, []);
    };
    

    useSSE("/api/qc", setQcData, (data) => ({
        onSpec: data?.status_counts?.onspec || 0,
        offSpec: data?.status_counts?.offspec || 0,
        weigher: data?.latest_weigher?.weigher || 0
    }));

    useSSE("/api/monitoringroom", setMonitoringRoom, (data) => ({
        temp: data?.temp || 0,
        humd: data?.humd || 0
    }));

    useSSE("/api/variablectq1", setPressure, (data) => data?.pressure || 0);
    useSSE("/api/hopperweigher1", setWeigherData1, (data) => ({ lpv: data?.lpvweigher1 || 0, sv: data?.svweigher1 || 0 }));
    useSSE("/api/hopperweigher2", setWeigherData2, (data) => ({ lpv: data?.lpvweigher2 || 0, sv: data?.svweigher2 || 0 }));

    useEffect(() => {
        const updateDimensions = () => {
          const newWidth = window.innerWidth * 0.2;
          const newHeight = window.innerHeight * 0.19;
          setDimensions({
            width: newWidth,
            height: newHeight,
          });
        };
    
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
      }, []);

    return (
    <div className="custom-height bg-blue py-1 relative">
        <div className="relative z-10">
        <div className="text-monitoring-custom absolute custom-placing-monitoring flex flex-col items-center">
            <p className="text-center text-white font-semibold mb-2">
                Control & Monitoring <br /> Room Temperature
            </p>
            <div className="grid grid-cols-2 row-start-2 gap-2">
                <div className="col-start-1 flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                        <GiFire className="text-orange-500 text-custom-logo" />
                        <span className="text-white font-medium">{monitoringRoom.temp}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GiWaterDrop className="text-blue-500 text-custom-logo" />
                        <span className="text-white font-medium">{monitoringRoom.humd}%</span>
                    </div>
                </div>
                <div className="col-start-2 flex flex-col items-center">
                    <img className="rotateUp custom-turbo object-cover" src="/turbo.jpg.png" />
                    <p className="text-red-500 font-semibold mt-2">BLOWER OFF</p>
                </div>
            </div>
        </div>


            <div className="absolute custom-qc-product flex flex-col items-center" style={{ top: '0.8vh', left: '34vw' }}>
                <div className="grid grid-col-2 gap-x-4 text-monitoring-custom ">
                    <div className="col-start-1 flex text-center">
                        <p className="text-white font-medium">
                            Camera<br />Quality Color Product
                        </p>
                    </div>
                    <div className="col-start-2 flex flex-col items-center justify-center text-center">
                        <label className="bg-gray-800 text-white font-semibold custom-failpass">
                            PASS
                        </label>
                        <label className="bg-red-500 text-white font-semibold custom-failpass">
                            FAIL
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="conveyor-belt absolute z-20" style={{ top: '6.3vh', right: '2vw' }}>
            <div className="belt">
                <span className="belt-text underline">Conveyor Product</span>
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
        <div className="absolute" style={{ top: '2vh', right: '0' }}>
            <svg width="10vw" height="30vh">
                <line x1="2vw" y1="2vh" x2="9vw" y2="2vh" stroke="black" strokeWidth="3" />
                <line x1="8.9vw" y1="2vh" x2="8.9vw" y2="23vh" stroke="black" strokeWidth="3" />
                <line x1="9vw" y1="23vh" x2="6vw" y2="23vh" stroke="black" strokeWidth="3" />
            </svg>
        </div>
        <div className="absolute" style={{ top: '2vh', right: '25vw' }}>
            <svg width="26vw" height="4vh">
                <line x1="100vw" y1="2vh" x2="0vw" y2="2vh" stroke="black" strokeWidth="3" />
            </svg>
        </div>
        <div className="custom-placing text-center justify-center absolute z-99">
            <ReactSpeedometer 
            key={`${dimensions.width}-${dimensions.height}`}
            maxValue={100} 
            value={34}
            needleColor="red" 
            startColor="green" 
            segments={10}
            endColor="red"
            width={dimensions.width}
            height={dimensions.height}
            textColor="white"
            currentValueText={""}
            />
            <span className="text-white text-custom-pressure font-bold">Temperature Product 34°C</span>
        </div>
        <div className="conveyor-translator absolute z-20" style={{ top: '13vh', left: '20vw' }}>
            <div className="belt">
                <span className="belt-text underline">Conveyor Translator</span>
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
        <div className="flex absolute motor-2379 items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-custom-pressure">M2379</span>
                <span className="text-green-400 font-semibold text-custom-pressure">88.8 A</span>
            </div>
        </div>
        <div className="hopper">
            <div className="flex text-custom-pressure flex-col absolute hopper-detail text-center">
                <span className="font-bold text-white">Air <br/> Pressure</span>
                <span>
                    <span className="text-green-400 font-semibold">{airPressure}</span>
                    <span className="text-white font-semibold"> psi</span>
                </span>
            </div>
            <img src="/hopper.png" className="absolute custom-hopper mt-4"></img>
        </div>
        <div className="absolute text-monitoring-custom bg-white rounded-lg shadow-md p-2 text-center z-20" style={{ top: '20vh', left: '22%', }}>
            <p className="text-black font-bold">WEIGHER BUCKET 1</p>
            <div className="bg-green-900 text-white px-3 py-2 rounded-md mt-1">
                <p className="">
                    PV: <span className="text-green-400 font-bold">{weigherData1.lpv}</span> Kg
                </p>
                <p className="">
                    SV: <span className="text-red-500 font-bold">{weigherData1.sv}</span> Kg
                </p>
            </div>
        </div>
        <div className="absolute text-monitoring-custom bg-white rounded-lg shadow-md p-2 text-center z-20" style={{ top: '20vh', left: '35%', }}>
            <p className="text-black font-bold">WEIGHER BUCKET 2</p>
            <div className="bg-green-900 text-white px-3 py-2 rounded-md mt-1">
                <p className="">
                    PV: <span className="text-green-400 font-bold">{weigherData2.lpv}</span> Kg
                </p>
                <p className="">
                    SV: <span className="text-red-500 font-bold">{weigherData2.sv}</span> Kg
                </p>
            </div>
        </div>
        <div className="absolute z-1" style={{ top: '33vh', left: '5vw' }}>
            <svg width="40vw" height="24vh">
                <line x1="4.8vw" y1="23vh" x2="4.8vw" y2="3.85vh" stroke="black" strokeWidth="3" />
                <line x1="4.8vw" y1="4vh" x2="21.1vw" y2="4vh" stroke="black" strokeWidth="3" />
                <line x1="21vw" y1="4vh" x2="21vw" y2="0vh" stroke="black" strokeWidth="3" />

                <line x1="11.5vw" y1="23vh" x2="11.5vw" y2="7.85vh" stroke="black" strokeWidth="3" />
                <line x1="11.5vw" y1="8vh" x2="34.55vw" y2="8vh" stroke="black" strokeWidth="3" />
                <line x1="34.5vw" y1="8vh" x2="34.5vw" y2="0vh" stroke="black" strokeWidth="3" />
            </svg>
        </div>
        <div className="absolute z-20" style={{ top: '43vh', left: '22vw' }}>
            <div className="text-white text-monitoring-custom font-bold py-1 text-center">
                SEWING MACHINE
            </div>
            <div className="absolute gray-custom p-2 flex items-center">
                <img src="/sewing.png" className="custom-logo-sewing object-cover" />
                <div className="ml-2 text-monitoring-custom flex flex-col text-white">
                    <div className="flex items-center">
                        <span className="custom-indicator bg-gray-500 inline-block mr-2"></span><span className="text-green-600 font-bold ">RUN</span>
                    </div>
                    <div className="flex items-center">
                        <span className="custom-indicator bg-red-500 inline-block mr-2"></span><span className="text-red-500 font-bold ">STOP</span>
                    </div>
                    <div className="flex items-center">
                        <span className="custom-indicator bg-yellow-500 inline-block mr-2"></span><span className="text-yellow-600 font-bold ">TRIP</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute z-1" style={{ bottom: '17vh', left: '22vw' }}>
            <svg width="7vw" height="7vh">
                <line x1="4.8vw" y1="23vh" x2="4.8vw" y2="3.85vh" stroke="black" strokeWidth="3" />
            </svg>
        </div>
        <div className="absolute flex flex-col justify-center" style={{ top: '43vh', left: '35%' }}>
            <div className="text-white text-monitoring-custom font-bold py-1 text-center">
                EARLY WARNING SYSTEM (EWS)
            </div>
            <div className="gray-custom p-2 text-monitoring-custom flex items-center justify-center w-full">
                <img src="/ews.png" className="custom-logo-ews object-cover" />
                <div className="ml-2 flex flex-col text-white">
                    <div className="flex items-center">
                        <span className="custom-indicator bg-gray-500 inline-block mr-2"></span><span className="text-green-600 font-bold ">RUN</span>
                    </div>
                    <div className="flex items-center">
                        <span className="custom-indicator bg-yellow-500 inline-block mr-2"></span><span className="text-yellow-600 font-bold ">WARNING</span>
                    </div>
                    <div className="flex items-center">
                        <span className="custom-indicator bg-red-500 inline-block mr-2"></span><span className="text-red-500 font-bold ">FAULT</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute text-center" style={{ top: '35vh', right: '28vw' }}>
            <span className="text-white text-monitoring-custom font-bold py-1 text-center block">Quality Check</span>
            <div className="bg-white shadow-md gray-custom p-3 flex flex-col items-center">
                <div className="flex items-center">
                    <div className="mr-2">
                        <img src="/QC.png" className="custom-logo-qc object-cover"/>
                    </div>
                    <div className="text-left">
                        <p className="text-black font-bold text-monitoring-custom">PROCESS VALUE</p>
                        <div className="bg-black text-white px-3 py-2 rounded-md mt-1">
                            <p className="text-green-400 text-custom-pressure text-center font-bold">{qcData.weigher} kg</p>
                        </div>
                    </div>
                </div>
                <div className="text-black font-semibold mt-3 text-center text-monitoring-custom w-full">
                    <p>On Spec: <span className="font-bold">{qcData.onSpec}</span> bag</p>
                    <p>Off Spec: <span className="font-bold">54</span> bag</p>
                </div>
            </div>
        </div>
        <div className="absolute gray-custom shadow-md p-1 text-center" style={{ top: '40vh', right: '5%' }}>
            <div className="bg-black text-white px-3 py-2 text-monitoring-custom">
                <p className="font-bold">COUNTER TOTAL</p>
                <p className="text-green-400 text-custom-pressure font-bold">88888 bag</p>
            </div>
            <div className="bg-black text-white px-3 py-2 mt-2 text-monitoring-custom">
                <p className="font-bold">PERFORMANCE</p>
                <p className="text-green-400 text-custom-pressure font-bold">88888 bag/menit</p>
            </div>
        </div>
        <div className="conveyor-closing absolute z-20" style={{ bottom: '15%', left: '5%' }}>
            <div className="belt">
                <span className="belt-text underline">Closing Conveyor</span>
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
        <div className="conveyor-bag absolute z-20" style={{ bottom: '15%', left: '31.5%' }}>
            <div className="belt">
                <span className="belt-text underline">Bag Turner Conveyor</span>
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
        <div className="conveyor-check absolute z-20" style={{ bottom: '15%', left: '51.5%' }}>
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
        <div className="conveyor-incline absolute z-20" style={{ bottom: '15%', right: '1%' }}>
            <div className="belt">
                <span className="belt-text underline">Incline Conveyor</span>
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
        <div className="flex absolute motor-m712d_1 items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-custom-pressure">M712D_1</span>
                <span className="text-green-400 font-semibold text-custom-pressure">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m712d_2 items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-custom-pressure">M712D_2</span>
                <span className="text-green-400 font-semibold text-custom-pressure">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m713d items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-custom-pressure">M713D</span>
                <span className="text-green-400 font-semibold text-custom-pressure">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m714d items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-custom-pressure">M714D</span>
                <span className="text-green-400 font-semibold text-custom-pressure">88.8 A</span>
            </div>
        </div>
    </div>
    );
}
