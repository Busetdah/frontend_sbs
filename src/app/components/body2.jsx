export default function Body2() {

    const pressure = 2;
    let status = "NORMAL";
    let statusColor = "text-yellow-500";
    let boxColor = "bg-gray-500";

    if (pressure < 60) {
        status = "LOW";
        statusColor = "text-green-500";
        boxColor = "bg-green-500";
    } else if (pressure > 90) {
        status = "OVER";
        statusColor = "text-red-500";
        boxColor = "bg-red-500";
    }

    return (
    <div className="custom-height bg-blue py-1 relative">
        <div className="absolute solenoid-valve">
            <img className="solenoid-valve-image" src="/sol_val.png"/>
        </div>
        <div className="absolute kodrum">
            <img className="kodrum-image" src="/kodrum.png"/>
        </div>
        <div className="absolute custom-hopper2">
            <img src="/hopper-2.png"></img>
        </div>
        <div className="absolute w-52 p-2 flex items-center gray-custom rounded-sm" style={{bottom: "7%", left: "10%",}}>
            <img src="/ctq1.png" alt="CTQ" className="w-8 h-18 mr-2" />
            <div className="flex-1 text-gray-800">
                <h2 className="text-sm font-bold text-center">Variable CTQ</h2>
                <div className="bg-gray-800 p-1 rounded-sm mt-2 flex flex-col items-center">
                    <div className="text-sm font-bold text-green-400">{pressure} Psi</div>
                </div>
                <div className="flex justify-around mt-4">
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "LOW" ? "bg-green-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-green-700 text-sm font-semibold">LOW</span>
                </div>
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "NORMAL" ? "bg-yellow-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-yellow-700 text-sm font-semibold">NORMAL</span>
                </div>
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "OVER" ? "bg-red-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-red-700 text-sm font-semibold">OVER</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute w-52 p-2 flex items-center gray-custom rounded-sm" style={{bottom: "30%", left: "48%",}}>
            <img src="/ctq2.png" alt="CTQ" className="w-8 h-18 mr-2" />
            <div className="flex-1 text-gray-800">
                <h2 className="text-sm font-bold text-center">Variable CTQ</h2>
                <div className="bg-gray-800 p-1 rounded-sm mt-2 flex flex-col items-center">
                    <div className="text-sm font-bold text-green-400">{pressure} Psi</div>
                </div>
                <div className="flex justify-around mt-4">
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "LOW" ? "bg-green-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-green-700 text-sm font-semibold">LOW</span>
                </div>
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "NORMAL" ? "bg-yellow-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-yellow-700 text-sm font-semibold">NORMAL</span>
                </div>
                <div className="flex flex-col items-center">
                    <div
                    className={`w-4 h-4 border border-white rounded-sm ${
                        status === "OVER" ? "bg-red-500" : "bg-gray-500"
                    }`}
                    ></div>
                    <span className="text-red-700 text-sm font-semibold">OVER</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute w-60 p-2 gray-custom border border-white text-gray-800" style={{ bottom: "30%", right: "10%" }}>
            <h2 className="text-lg font-bold text-center">Variable CTQ</h2>
            <div className="bg-gray-800  p-3 rounded-sm mt-2 flex flex-col items-center">
                <div className="text-2xl font-bold text-green-400">{pressure} kg</div>
            </div>
            <div className="flex justify-between mt-3 px-2 text-sm">
                <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 border border-white mr-2"></div>
                <span className="font-semibold text-green-600">ONSPEC</span>
                </div>
                <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 border border-white mr-2"></div>
                <span className="font-semibold text-red-600">OFFSPEC</span>
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-800">
                <p>On Spec: <span className="font-bold">888 bag</span></p>
                <p>Off Spec: <span className="font-bold">888 bag</span></p>
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
    </div>
    );
}
