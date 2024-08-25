import React, { useState } from "react";
import loginImg from "../assets/login-img.png"; // Replace with your image path

const LoginPage = () => {
  // State to manage the form type (login or sign up)
  const [isSignUp, setIsSignUp] = useState(false);

  // Function to handle toggle between login and sign up
  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-left flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-black overflow-hidden">
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        {/* Container for sliding effect */}
        <div
          className={`flex transition-transform duration-1000 ease-in-out transform ${
            isSignUp ? "" : ""
          }`}
        >
          {/* Left Side - Form Component */}
          <div
            className={`w-1/2 p-8 flex flex-col transition-transform duration-1000 ease-in-out ${
              isSignUp ? "translate-x-[600px]" : "translate-x-0"
            }`}
          >
            <h1 className="text-white text-4xl font-bold mb-8">
              {isSignUp ? "Sign Up" : "Log In"}
            </h1>
            <form className="flex flex-col space-y-6">
              <div>
                <label className="block text-white text-lg mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 text-white border border-white rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-white text-lg mb-2">
                  {isSignUp ? "Email" : "Password"}
                </label>
                <input
                  type={isSignUp ? "email" : "password"}
                  className="w-full p-3 text-white border border-white rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Enter your ${isSignUp ? "email" : "password"}`}
                />
              </div>
              {/* {!isSignUp && (
                <div className="text-right">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Forgot Password?
                  </a>
                </div>
              )} */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded shadow-lg hover:bg-green-700 transition duration-300"
              >
                {isSignUp ? "SIGN UP" : "LOG IN"}
              </button>
            </form>
            <div className="text-white mt-6 text-center">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="text-green-500 hover:text-green-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="text-green-500 hover:text-green-700 focus:outline-none"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Image Component */}
          <div
            className={`w-1/2 p-8 flex items-center justify-center transition-transform duration-1000 ease-in-out ${
              isSignUp ? "-translate-x-[600px]" : "translate-x-0"
            }`}
          >
            <img src={loginImg} alt="Login" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
