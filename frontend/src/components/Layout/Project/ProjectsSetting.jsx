import ProjectSidebar from "./ProjectSidebar";
import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";

const ProjectSetting = () =>{
    const {id} = useParams();
    const [name,setName] = useState("");

      useEffect(()=>{
        const getprojectname = async() =>{
        try{
            const res = await axios.post("http://localhost:5000/api/getname",id);
            setName(res.data.data.name);
        }
        catch(err){
            console.log("Something wrong",err.message);
        }
        }
        getprojectname();
    },[])

    return(
        <div>
            <ProjectSidebar projectid={id} projectname={name} />
        </div>
    )
}

export default ProjectSetting;