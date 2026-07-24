import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [con, setCon] = useState("");
  const submit = async(e) =>{
    e.preventDefault();
    
    const userData = {
      name,
      email,
      pass,
      con
    };
    try{
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData
      );

    if(res.data.message == "success"){
      navigate("/verify",{
        state:{
          email:email
        }
      });
    }
    else{
      alert(res.data.message);
    }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            🏗️ ConstructionIQ AI
          </h1>
          <p className="text-gray-500 mt-2">
            Create your ConstructionIQ account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={submit}>

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{
                setName(e.target.value);
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Work Email
            </label>
            <input
              type="email"
              placeholder="john@company.com"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{
                setPass(e.target.value);
              }}
            />

            <p className="text-xs text-gray-500 mt-2">
              Must be at least 8 characters with one uppercase letter and one number.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{
                setCon(e.target.value);
              }}
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
            />
            <label className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>.
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center">
            <hr className="flex-1" />
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-1" />
          </div>

          {/* Google Button (Future) */}
          <button
            type="button"
            disabled
            className="w-full border rounded-lg py-3 text-gray-400 cursor-not-allowed"
          >
            Continue with Google (Coming Soon)
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/"
              className="ml-1 text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;