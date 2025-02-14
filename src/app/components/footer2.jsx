import { FcHome } from "react-icons/fc";
import Link from 'next/link';

export default function Footer2() {
    return (
      <div className="bg-grey footer-height flex justify-between items-center ">
        <div className="ml-4 space-x-3">
            <button>REAL TIME TREND</button>
        </div>
        <Link href="/">
          <div className="mr-8">
            <FcHome size={35} />
          </div>
        </Link>
      </div>
    );
  }

  
  