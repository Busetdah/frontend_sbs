'use client'
'use client'
import Link from 'next/link';
import { FcHome } from 'react-icons/fc';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

export default function Footer() {
  const [loading, setLoading] = useState(false);
  
  const handlePrediction = () => {
    setLoading(true);
    sessionStorage.setItem("predicted", "true");
    const randomTime = Math.floor(Math.random() * 2500) + 2500; 
    setTimeout(() => {
      window.location.href = '/page-2';
    }, randomTime);
  };

  return (
    <div className="relative z-99">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          <FaSearch className="text-blue-400 text-7xl animate-pulse drop-shadow-lg mb-4" />
          <AiOutlineLoading3Quarters className="text-blue-300 text-6xl animate-spin mb-4" />
          <div className="text-white text-2xl">Predicting Data...</div>
        </div>
      )}
      
      <div className="bg-grey footer-height flex justify-between text-monitoring-custom items-center p-4 z-40">
        <div className="ml-4 space-x-3">
        <Link href="/realtime">
          <button>REAL TIME TREND</button>
        </Link>
        <Link href="/history">
          <button>HISTORICAL TREND</button>
          </Link>
          <button>HISTORICAL ALARM</button>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button 
            className="bg-blue-800 text-white px-6 py-2 rounded-sm shadow-md hover:bg-blue-600"
            onClick={handlePrediction}
            disabled={loading}
          >
            Mulai Prediksi
          </button>
        </div>
        
        <Link href="/">
          <div className="mr-8">
            <FcHome size={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
