import { FcHome } from "react-icons/fc";
import Link from 'next/link';

export default function Footer() {
    return (
      <div className="bg-grey footer-height flex justify-between items-center ">
        <div className="ml-4 space-x-3">
            <button>REAL TIME TREND</button>
            <button>HISTORICAL TREND</button>
            <button>HISTORICAL ALARM</button>
        </div>
        <Link href="/page-2">
          <div className="mr-8">
            <FcHome size={35} />
          </div>
        </Link>
      </div>
    );
  }

  
  