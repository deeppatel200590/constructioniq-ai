import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Model/connection.js";
import sendEmail from "./utils/Mail.js";
import bcrypt from "bcrypt";
import User from "./Model/user.js";
import jwt from "jsonwebtoken";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "ConstructionIQ AI Backend is Running 🚀",
  });
});

app.post("/api/auth/signup",async(req,res)=>{
    console.log("Route hit!");
    const {name,email,pass,con} = req.body;
    try{
        if (!name || !email || !pass || !con) {
            return res.json({
                message: "All fields are required",
            });
        }
        else if (pass !== con) {
            return res.json({
                message: "Passwords do not match",
            });
        }
        else{
            const existinguser = await User.findOne({email});
            if(existinguser){
                return res.json({message:"Email is alredy exist"});
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            const hashedpass =  await bcrypt.hash(pass,10);
            const user = new User({
                name,
                email,
                password: hashedpass,
                otp,
                otpExpiry,
                isVerified: false,
            });
            await user.save();
            
            await sendEmail(
                email,
                "ConstructionIQ AI OTP",
                `Your OTP is ${otp}. It will expire in 10 minutes.`
            );

            return res.json({message: "success",});
        }
    }
    catch(err){
        console.log(err);
        res.json({message:"Something went wrong"});
    }
})

app.post("/api/auth/verify",async(req,res)=>{
    const {email,otp} = req.body;
    try{
        const data = await User.findOne({email});
        if(!data){
            return res.json({message:"User Not Found"});
        }
        else if(data.otp != otp ){
            return res.json({message:"Invalid OTP!"});
        }
        else if(data.otpExpiry < new Date()){
            return res.json({messsage:"OTP expired!"});
        }
        data.isVerified = true;
        data.otp = null;
        data.otpExpiry = null;
        await data.save();
        const payload = {
            id:data._id,
            email:data.email,
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:"7D", 
            }
        );
        return res.json({message:"success",token});
    }
    catch(err){
        console.log(err);
        return res.json
    }
})

app.post("/api/auth/login",(req,res)=>{
    const {email,pass} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "User not found" });
    }

    if (!user.isVerified) {
        return res.json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
        return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
     res.json({
        message: "Login successful",
        token
    });
})

connectDB();
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});