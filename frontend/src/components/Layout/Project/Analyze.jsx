import ProjectSidebar from "./ProjectSidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Brain,
  FileText,
  AlertTriangle,
  CheckCircle,
  FolderOpen,
} from "lucide-react";

const Analyze = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectName = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/getname",
          { id }
        );

        setName(res.data.data.name);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProjectName();
  }, [id]);

  if (loading) {
    return (
      <div className="flex">
        <ProjectSidebar projectid={id} projectname="Loading..." />

        <div className="flex-1 flex justify-center items-center h-screen">
          <div className="text-xl font-semibold text-gray-500">
            Loading Project...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 h-screen">

      <ProjectSidebar projectid={id} projectname={name} />

      <div className="flex-1 p-8 overflow-y-auto">

        <div className="mb-8">

          <p className="text-sm text-gray-500">
            Dashboard / Projects / Analyze
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {name}
          </h1>

          <p className="text-gray-500 mt-2">
            AI powered construction drawing analysis
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <FolderOpen size={35} className="text-blue-600 mb-4" />
            <h3 className="text-gray-500">Drawings</h3>
            <h2 className="text-3xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Brain size={35} className="text-purple-600 mb-4" />
            <h3 className="text-gray-500">AI Analyses</h3>
            <h2 className="text-3xl font-bold mt-2">8</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <AlertTriangle size={35} className="text-red-500 mb-4" />
            <h3 className="text-gray-500">Issues Found</h3>
            <h2 className="text-3xl font-bold mt-2">14</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <CheckCircle size={35} className="text-green-600 mb-4" />
            <h3 className="text-gray-500">Resolved</h3>
            <h2 className="text-3xl font-bold mt-2">9</h2>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              AI Analysis
            </h2>

            <div className="border rounded-lg p-6">

              <Brain
                className="text-purple-600 mb-4"
                size={50}
              />

              <h3 className="text-xl font-semibold">
                Start New Analysis
              </h3>

              <p className="text-gray-500 mt-3">
                Upload drawings and let ConstructionIQ AI detect
                clashes, missing elements, code violations and
                generate intelligent reports.
              </p>

              <button
                className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg"
              >
                Analyze Drawings
              </button>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Recent Documents
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between border rounded-lg p-4">

                <div className="flex items-center gap-4">

                  <FileText
                    className="text-red-500"
                    size={35}
                  />

                  <div>

                    <h3 className="font-semibold">
                      Electrical.pdf
                    </h3>

                    <p className="text-sm text-gray-500">
                      Uploaded yesterday
                    </p>

                  </div>

                </div>

                <button className="text-blue-600 font-medium">
                  View
                </button>

              </div>

              <div className="flex items-center justify-between border rounded-lg p-4">

                <div className="flex items-center gap-4">

                  <FileText
                    className="text-red-500"
                    size={35}
                  />

                  <div>

                    <h3 className="font-semibold">
                      Plumbing.pdf
                    </h3>

                    <p className="text-sm text-gray-500">
                      Uploaded 2 days ago
                    </p>

                  </div>

                </div>

                <button className="text-blue-600 font-medium">
                  View
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analyze;