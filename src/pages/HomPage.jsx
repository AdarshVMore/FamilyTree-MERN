import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-black to-green-900 py-5 px-10 ">
      <div className="w-full mx-auto">
        <nav className="flex fixed top-10 w-[90vw] justify-between items-center mb-10">
          <div className="text-white font-bold text-xl"></div>
          <ul className="flex space-x-10">
            <li>
              <a
                href="#"
                className="text-white text-lg hover:text-green-400 transition duration-300"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-lg hover:text-green-400 transition duration-300"
              >
                CALENDAR
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-lg hover:text-green-400 transition duration-300"
              >
                CHAT
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-lg hover:text-green-400 transition duration-300"
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a href="/auth">
                <button className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300">
                  LOG IN
                </button>
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex text-left flex-col items-start md:flex-row md:items-center md:justify-between">
          {/* Text Content */}
          <div className="max-w-xl mb-10 md:mb-0">
            <h1 className="text-white text-5xl font-bold mb-4">
              Building Bridges Between Generations
            </h1>
            <p className="text-white text-lg mb-6">
              Connect with your family story on{" "}
              <span className="text-green-400 font-bold">VanshikaRoots®</span>{" "}
              and discover the what, where, and who of how it all leads to you.
            </p>
            <button className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">
              Start Your Lineage
            </button>
          </div>

          {/* Decorative Circle */}
          <div className="relative hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
