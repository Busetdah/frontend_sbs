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

    useSSE("/api/hopperairpressure", setPressure, (data) => data?.pressure || 0);
    useSSE("/api/hopperweigher1", setWeigherData1, (data) => ({ lpv: data?.lpvweigher1 || 0, sv: data?.svweigher1 || 0 }));
    useSSE("/api/hopperweigher2", setWeigherData2, (data) => ({ lpv: data?.lpvweigher2 || 0, sv: data?.svweigher2 || 0 }));

    return (
    <div className="custom-height bg-blue py-1 relative">
        <div className="grid grid-cols-6 relative z-10">
                <div className="col-start-1 flex flex-col items-center">
                    <p className="text-center text-white font-medium mb-2">
                        Control & Monitoring <br /> Room Temperature
                    </p>
                    <div className="grid grid-cols-2 row-start-2">
                        <div className="col-start-1 flex flex-col items-center space-y-2">
                            <div className="flex items-center">
                                <GiFire className="text-orange-500 text-3xl" />
                                <span className="text-white font-medium ml-2">{monitoringRoom.temp}°C</span>
                            </div>
                            <div className="flex items-center">
                                <GiWaterDrop className="text-blue-500 text-3xl" />
                                <span className="text-white font-medium ml-2">{monitoringRoom.humd}%</span>
                            </div>
                        </div>
                        <div className="col-start-2 flex flex-col items-center">
                            <img className="rotateUp w-10 h-8 object-cover" src="/turbo.jpg.png"></img>
                            <p className="text-red-500 font-semibold text-lg mt-2">BLOWER OFF</p>
                        </div>
                    </div>
                </div>
            <div className="col-start-3 flex flex-col items-center ">
                <div className="grid grid-col-2 gap-x-4">
                    <div className="col-start-1 flex text-center">
                        <p className="text-white font-medium">
                            Camera<br />Quality Color Product
                        </p>
                    </div>
                    <div className="col-start-2 flex flex-col items-center">
                        <label className="bg-gray-800 text-sm text-white font-semibold py-1 px-2 w-12">
                            PASS
                        </label>
                        <label className="bg-red-500 text-sm text-white font-semibold py-1 px-2 w-12">
                            FAIL
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="conveyor-belt absolute z-20" style={{ top: '5%', right: '3%' }}>
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
        {/* <div className="absolute line-1">
            <div className="garis-1-1"></div>
        </div> */}
        <div className="custom-placing absolute mt-8 z-99">
            <ReactSpeedometer 
            maxValue={150} 
            value={34} 
            needleColor="red" 
            startColor="green" 
            segments={10}
            endColor="red"
            width={250}
            height={100}
            />
        </div>
        <div className="conveyor-translator absolute z-20" style={{ top: '17%', left: '20%' }}>
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
                <span className="text-white font-bold text-lg">M2379</span>
                <span className="text-green-400 font-semibold text-lg">88.8 A</span>
            </div>
        </div>
        <div className="hopper">
            <div className="flex flex-col absolute hopper-detail text-center">
                <span className="font-bold text-white ">Air <br/> Pressure</span>
                <span>
                    <span className="text-green-400 text-xl font-semibold">{airPressure}</span>
                    <span className="text-white font-semibold"> psi</span>
                </span>
            </div>
            <img src="/hopper.png" className="absolute custom-hopper mt-4"></img>
        </div>
        <div className="absolute bg-white rounded-lg shadow-md p-2 text-center" style={{ top: '30%', left: '22%', }}>
            <p className="text-black font-bold text-sm">WEIGHER BUCKET 1</p>
            <div className="bg-green-900 text-white px-3 py-2 rounded-md mt-1">
                <p className="text-lg">
                    PV: <span className="text-green-400 font-bold">{weigherData1.lpv}</span> Kg
                </p>
                <p className="text-lg">
                    SV: <span className="text-red-500 font-bold">{weigherData1.sv}</span> Kg
                </p>
            </div>
        </div>
        <div className="absolute bg-white rounded-lg shadow-md p-2 text-center" style={{ top: '30%', left: '35%', }}>
            <p className="text-black font-bold text-sm">WEIGHER BUCKET 2</p>
            <div className="bg-green-900 text-white px-3 py-2 rounded-md mt-1">
                <p className="text-lg">
                    PV: <span className="text-green-400 font-bold">{weigherData2.lpv}</span> Kg
                </p>
                <p className="text-lg">
                    SV: <span className="text-red-500 font-bold">{weigherData2.sv}</span> Kg
                </p>
            </div>
        </div>
        <div className="absolute" style={{ top: '43vh', left: '22%' }}>
            <div className="text-white text-sm font-bold py-1 text-center">
                SEWING MACHINE
            </div>
            <div className="absolute gray-custom p-2 flex items-center">
                <img src="/sewing.png" className="w-10 h-16 object-cover" />
                <div className="ml-2 flex flex-col text-white">
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-gray-500 inline-block mr-2"></span><span className="text-green-600 font-bold ">RUN</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 inline-block mr-2"></span><span className="text-red-500 font-bold ">STOP</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-yellow-500 inline-block mr-2"></span><span className="text-yellow-600 font-bold ">TRIP</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute flex flex-col justify-center" style={{ top: '43vh', left: '35%' }}>
            <div className="text-white text-sm font-bold py-1 text-center">
                EARLY WARNING SYSTEM (EWS)
            </div>
            <div className="gray-custom p-2 flex items-center justify-center w-full">
                <img src="/ews.png" className="w-16 h-16 object-cover" />
                <div className="ml-2 flex flex-col text-white">
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-gray-500 inline-block mr-2"></span><span className="text-green-600 font-bold ">RUN</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-yellow-500 inline-block mr-2"></span><span className="text-yellow-600 font-bold ">WARNING</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 inline-block mr-2"></span><span className="text-red-500 font-bold ">FAULT</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute text-center" style={{ top: '35vh', right: '30%' }}>
            <span className="text-white text-sm font-bold py-1 text-center block">Quality Check</span>
            <div className="bg-white shadow-md gray-custom p-3 flex flex-col items-center">
                <div className="flex items-center">
                    <div className="mr-2">
                        <img src="/QC.png" className="w-18 h-16 object-cover"/>
                    </div>
                    <div className="text-left">
                        <p className="text-black font-bold text-sm">PROCESS VALUE</p>
                        <div className="bg-black text-white px-3 py-2 rounded-md mt-1">
                            <p className="text-green-400 text-lg text-center font-bold">{qcData.weigher} kg</p>
                        </div>
                    </div>
                </div>
                <div className="text-black font-semibold mt-3 text-center w-full">
                    <p>On Spec: <span className="font-bold">{qcData.onSpec}</span> bag</p>
                    <p>Off Spec: <span className="font-bold">54</span> bag</p>
                </div>
            </div>
        </div>
        <div className="absolute gray-custom shadow-md p-1 text-center" style={{ top: '40vh', right: '5%' }}>
            <div className="bg-black text-white px-3 py-2">
                <p className="text-sm font-bold">COUNTER TOTAL</p>
                <p className="text-green-400 text-lg font-bold">88888 bag</p>
            </div>
            <div className="bg-black text-white px-3 py-2 mt-2">
                <p className="text-sm font-bold">PERFORMANCE</p>
                <p className="text-green-400 text-lg font-bold">88888 bag/menit</p>
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
                <span className="text-white font-bold text-lg">M712D_1</span>
                <span className="text-green-400 font-semibold text-lg">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m712d_2 items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-lg">M712D_2</span>
                <span className="text-green-400 font-semibold text-lg">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m713d items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-lg">M713D</span>
                <span className="text-green-400 font-semibold text-lg">88.8 A</span>
            </div>
        </div>
        <div className="flex absolute motor-m714d items-center w-fit">
            <img src="/motor.png" className="custom-motor-height object-cover" />
            <div className="ml-2 flex flex-col">
                <span className="text-white font-bold text-lg">M714D</span>
                <span className="text-green-400 font-semibold text-lg">88.8 A</span>
            </div>
        </div>
    </div>
    );
}
