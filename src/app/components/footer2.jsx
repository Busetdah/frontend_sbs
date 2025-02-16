"use client";
import { useEffect, useState } from "react";
import { FcHome, FcLeft } from "react-icons/fc"; 
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer2() {
  const pathname = usePathname();
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // Tombol hanya muncul di halaman /historyprediction/
    if (pathname === "/historyprediction/") {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [pathname]);

  const handleBack = () => {
    sessionStorage.setItem("predicted", "true"); // Simpan session
    window.location.href = "/page-2"; // Redirect ke /page-2
  };

  return (
    <div className="bg-grey footer-height flex text-monitoring-custom justify-between items-center sticky bottom-0 px-4">
      <div className="flex items-center gap-3">
        <Link href="/historyprediction">
          <button>HISTORICAL PREDICTION</button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {showBackButton && (
          <button 
            onClick={handleBack}
            className="p-0 bg-white rounded-none border-none outline-none"
          >
            <FcLeft size={35} />
          </button>
        )}

        <Link href="/">
          <FcHome size={35} />
        </Link>
      </div>
    </div>
  );
}
