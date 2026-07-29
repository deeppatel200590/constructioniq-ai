import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

const DashboardSidebar = () => {
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building2 size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold">ConstructionIQ</h1>
            <p className="text-xs text-slate-400">
              AI Project Manager
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          Main
        </p>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-2 hover:bg-slate-800 transition">
          <FolderKanban size={20} />
          Projects
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-2 hover:bg-slate-800 transition">
          <Settings size={20} />
          Settings
        </button>

      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;