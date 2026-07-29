import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim : true
    },
    description:{
        type : String,
        trim : true
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    status:{
        type : String,
        enum : ["pending","completed"],
        default : "pending"
    }
},{
    timestamps : true
});

const Project = mongoose.model("project",ProjectSchema);

export default Project;