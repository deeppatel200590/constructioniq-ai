import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify",
        {
          email,
          otp,
        }
      );

      console.log(res.data.message);
      if(res.data.message == "success"){
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
      alert(res.data.message);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            🏗️ ConstructionIQ AI
          </h1>

          <p className="text-gray-500 mt-2">
            Verify your email address
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter OTP
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-[10px] outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-3">
              OTP has been sent to
              <span className="font-semibold"> {email}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Verify OTP
          </button>

          <button
            type="button"
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg transition"
          >
            Resend OTP
          </button>

        </form>
      </div>
    </div>
  );
};

export default Verify;