import { FcHome } from "react-icons/fc";
import Link from 'next/link';

export default function Footer2() {
    return (
      <div className="bg-grey footer-height flex text-monitoring-custom justify-between items-center footer-2-custom sticky bottom-0">
        <div className="ml-4 space-x-3">
        <Link href="/historyprediction">
            <button>HISTORICAL PREDICTION</button>
        </Link>
        </div>
        <Link href="/">
          <div className="mr-8">
            <FcHome size={35} />
          </div>
        </Link>
      </div>
    );
  }

  
  