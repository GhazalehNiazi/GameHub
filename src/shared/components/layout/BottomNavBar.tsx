import { useNavigate, useLocation } from "react-router";

export function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic config map of icons, labels, and target routing destinations
  const tabs = [
    { id: "home", label: "Home", path: "/dashboard", icon: "🏠" },
    { id: "history", label: "History", path: "/history", icon: "🏆" },
    { id: "friends", label: "Friends", path: "/friends", icon: "👥" },
    { id: "play", label: "Play", path: "/play", icon: "🎮" },
  ];

  return (
    <nav className='w-full bg-white rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/50 flex items-center justify-around py-3 px-2'>
      {tabs.map((tab) => {
        const isActive =
          location.pathname === tab.path ||
          (tab.id === "home" && location.pathname === "/");

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className='flex flex-col items-center justify-center flex-1 transition-all active:scale-95 cursor-pointer'
          >
            <span
              className={`text-lg transition-transform ${isActive ? "scale-110" : "opacity-60"}`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[10px] mt-1 font-medium transition-colors ${
                isActive ? "text-zinc-900 font-bold" : "text-zinc-400"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
