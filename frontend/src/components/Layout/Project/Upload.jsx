import ProjectSidebar from "./ProjectSidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, FileText, Image, Trash2 } from "lucide-react";

const Upload = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getProjectName = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/getname",
          { id }
        );

        setName(res.data.data.name);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProjectName();
  }, [id]);

  const handleFileChange = (e) => {
    setFiles([...files,...e.target.files]);
  };
  

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };


    const send=async()=>{
      const formdata = new FormData();

      files.forEach((file) => {
        formdata.append("files", file);
      });

      formdata.append("id",id);
      const res = await axios.post("http://localhost:5000/api/upload",formdata);
      console.log(res.data);
    }

  return (
    <div className="flex bg-gray-100 h-screen">
      <ProjectSidebar projectid={id} projectname={name} />

      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Upload Drawings
          </h1>

          <p className="text-gray-500 mt-2">
            Upload construction drawings for AI analysis.
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <label
            htmlFor="fileUpload"
            className="border-2 border-dashed border-blue-400 rounded-xl h-72 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
          >
            <UploadCloud
              size={60}
              className="text-blue-600 mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-700">
              Drag & Drop Files
            </h2>

            <p className="text-gray-500 mt-2">
              or click to browse files
            </p>

            <button
              type="button"
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse Files
            </button>

            <input
              id="fileUpload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Supported */}
          <div className="mt-6 text-sm text-gray-500">
            Supported: PDF, PNG, JPG
          </div>

        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="bg-white mt-8 rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-5">
              Selected Files
            </h2>

            <div className="space-y-4">

              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">

                    {file.type.includes("image") ? (
                      <Image className="text-blue-600"/>
                    ) : (
                      <FileText className="text-red-600" />
                    )}

                    <div>
                      <p className="font-medium">
                        {file.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>

                </div>
              ))}

            </div>

            <button
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
              onClick={send}
            >
              Upload Drawings
            </button>

          </div>
        )}

        {/* AI Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mt-8">

          <h2 className="text-2xl font-bold">
            🤖 AI Analysis Ready
          </h2>

          <p className="mt-3 text-blue-100">
            After uploading your drawings, ConstructionIQ AI
            will inspect them for clashes, missing standards,
            and generate a detailed construction report.
          </p>

        </div>

      </main>
    </div>
  );
};

export default Upload;