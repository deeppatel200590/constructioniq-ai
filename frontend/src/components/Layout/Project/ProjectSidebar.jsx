import {
  LayoutDashboard,
  Upload,
  Brain,
  FileText,
  History,
  Settings,
  Building2,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProjectSidebar = (props) => {
  console.log("this is id:",props.projectid)
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col justify-between">

      {/* Logo & Project Name */}
      <div>

        <div className="p-6 border-b border-slate-700">

          <div className="flex items-center gap-3">

            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                ConstructionIQ AI
              </h1>

              <p className="text-sm text-slate-400">
                {props.projectname}
              </p>
            </div>

          </div>

        </div>

        {/* Navigation */}
        <nav className="mt-6">

          <ul className="space-y-2 px-4">

            {/* Overview */}
            <li>
              <Link
                to={`/project/${props.projectid}`}
                className="flex items-center gap-3 bg-blue-600 p-3 rounded-lg cursor-pointer"
              >
                <LayoutDashboard size={20} />
                Overview
              </Link>
            </li>

            {/* Upload */}
            <li>
              <Link
                to={`/upload/${props.projectid}`}
                className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
              >
                <Upload size={20} />
                Upload Drawings
              </Link>
            </li>

            {/* Analyze */}
            <li>
              <Link
                to={`/analyze/${props.projectid}`}
                className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
              >
                <Brain size={20} />
                Analyze
              </Link>
            </li>

            {/* Reports */}
            <li>
              <Link
                to={`/reports/${props.projectid}`}
                className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
              >
                <FileText size={20} />
                Reports
              </Link>
            </li>

            {/* History */}
            <li>
              <Link
                to={`/history/${props.projectid}`}
                className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
              >
                <History size={20} />
                History
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                to={`/projectsetting/${props.projectid}`}
                className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition"
              >
                <Settings size={20} />
                Project Settings
              </Link>
            </li>

          </ul>

        </nav>

      </div>

      {/* Bottom Section */}

      <div className="border-t border-slate-700 p-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 w-full hover:bg-slate-800 p-3 rounded-lg transition"
        >
          <LayoutDashboard size={20} />
          Back to Dashboard
        </Link>

      </div>

    </aside>
  );
};

export default ProjectSidebar;