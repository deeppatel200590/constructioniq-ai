import DashboardSidebar from "./DashboardSidebar";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [openModal,setOpenModal] = useState(false);
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");

  const handleCreateProject = () =>{
    setOpenModal(true);
  }

  const createProject = async(e) =>{
    e.preventDefault();
    let token = localStorage.getItem("token");
    const data={
      name,
      desc,
      token
    }
    const res = await axios.post("http://localhost:5000/api/createproject",data);
    if(res.data.message == "success"){
      navigate(`/project/${res.data.id}`)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your construction projects from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Projects</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">8</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-3xl font-bold mt-2 text-yellow-500">4</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Drawings</h3>
            <p className="text-3xl font-bold mt-2">37</p>
          </div>

        </div>

        {/* Create Project */}
        <div className="mb-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition" onClick={handleCreateProject}>
            + Create New Project
          </button>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Projects
          </h2>

          <div className="space-y-4">

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Hospital Project</h3>
                <p className="text-sm text-gray-500">
                  Last updated today
                </p>
              </div>

              <button className="text-blue-600 font-medium">
                Open →
              </button>
            </div>

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Mall Project</h3>
                <p className="text-sm text-gray-500">
                  Pending Analysis
                </p>
              </div>

              <button className="text-blue-600 font-medium">
                Open →
              </button>
            </div>

          </div>

        </div>

      </main>


    {/* Project form */}
    {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white w-120 rounded-xl p-6">

                <h2 className="text-2xl font-bold">
                    Create New Project
                </h2>

                  <p className="text-gray-500 mt-2">
                      Enter the project details below.
                  </p>

                  {/* Project Form */}
                  <form className="flex flex-col w-65" onSubmit={createProject}>
                    <input type="text" className="p-2 border mt-5 rounded" placeholder="Enter Project Name" required onChange = {(e)=>{setName(e.target.value)}}></input>
                    <input type="text" className="p-2 border mt-5 rounded" placeholder="Enter Project Description" required onChange = {(e)=>{setDesc(e.target.value)}}></input>
                    <div className="gap-5 flex mt-7 justify-between">
                      <button type="button" className="bg-red-500 text-white p-2 rounded hover:bg-red-800 cursor-pointer" onClick={()=>{setOpenModal(false) }}>Cancel</button>
                      <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-800 cursor-pointer">Create</button>
                    </div>  
                  </form>

              </div>

        </div>
    )}

    </div>
  );
};

export default Dashboard;