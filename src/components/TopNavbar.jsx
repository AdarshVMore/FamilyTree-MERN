import React from "react";

const TopNavbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Family Tree</div>
      <div className="flex space-x-4">
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          Home
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          Trees
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          Search
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          DNA
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          Help
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
          Extras
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
