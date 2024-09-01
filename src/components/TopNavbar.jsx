import React from "react";

const TopNavbar = () => {
  return (
    <div className="flex z-10 w-[100vw] top-0 left-0 justify-between fixed items-center p-4 bg-green-900 text-white">
      <div className="text-lg font-bold">Family Tree</div>
      <div className="flex space-x-4">
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          Home
        </button>
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          Trees
        </button>
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          Search
        </button>
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          DNA
        </button>
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          Help
        </button>
        <button className="px-3 py-1 bg-green-700 rounded hover:bg-green-600">
          Extras
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
