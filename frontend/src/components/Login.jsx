import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();
    
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    const submitlogin = async(e) => {
        e.preventDefault();
        const userData = {
            email,pass
        }
        const res = await axios.post("http://localhost:5000/api/auth/login",userData);
        if(res.data.message == "success"){
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        }
        else{
            alert(res.data.message);
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white w-96 p-8 rounded-xl shadow-lg">
                <form className="flex flex-col gap-5" onSubmit={submitlogin}>
                    <h1 className="text-3xl font-bold text-center">Login</h1>

                    <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border rounded-md p-3 outline-none focus:border-blue-500"
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                    </div>

                    <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border rounded-md p-3 outline-none focus:border-blue-500"
                        onChange={(e)=>{
                            setPass(e.target.value)
                        }}
                    />
                    </div>

                    <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
                    Login
                    </button>

                    <p className="text-center text-sm">
                    Don't have an account?
                    <Link to="/signup"  className="text-blue-600 hover:underline ml-1">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;