export default function Header() {
    return (
      <div className="bg-grey text-white">
        <div className="flex items-center justify-between px-4 py-1/2">
          <div className="flex items-center space-x-4">
            <img src="/PetroLogo.png" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold">SMART BAGGING SYSTEM</h1>
          <img src="/pergudangan.png" className="h-16 w-auto" />
        </div>
        <div className="border-t-2 border-black"></div>
        <div className="flex items-center text-center justify-between bg-grey px-4 py-1 text-sm">
          <div className="text-red-500 font-bold">STOPPED</div>
          <div className="text-white font-semibold">BAGGING OUTPUT PREDICTION WITH MACHINE LEARNING TECHNOLOGY</div>
          <div className="text-white">00/00/0000 00:00:00</div>
        </div>
      </div>
    );
  }

  
  