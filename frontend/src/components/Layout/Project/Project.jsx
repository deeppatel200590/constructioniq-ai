import ProjectSidebar from "./ProjectSidebar";
import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";

const Project = () => {

  const [name,setName] = useState("");
  const [data,setData] = useState({});
  const id = useParams();

  useEffect(()=>{
    const getprojectname = async() =>{
      try{
        const res = await axios.post("http://localhost:5000/api/getname",id);
        setName(res.data.data.name);
        setData(res.data.data);
      }
      catch(err){
        console.log("Something wrong",err.message);
      }
    }
    getprojectname();
  },[])
  
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <ProjectSidebar projectid={data._id} projectname={name}/>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">

        {/* Header */}
        <div className="mb-8">
        {console.log(data)}
          <h1 className="text-3xl font-bold text-gray-800">
            {name}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your drawings, run AI analysis, and review reports.
          </p>

        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[600px]">

          <h2 className="text-2xl font-semibold">
            Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Project overview will appear here.
          </p>

        </div>

      </main>

    </div>
  );
};

export default Project;