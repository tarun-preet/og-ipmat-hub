import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  BookOpen,
  CheckSquare,
  BarChart3,
  PenLine,
  LogOut,
  GraduationCap,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calculator, label: 'Quant Vault', path: '/quant-vault' },
  { icon: BookOpen, label: 'Vocab Hub', path: '/vocab-hub' },
  { icon: CheckSquare, label: 'Progress Tracker', path: '/progress' },
  { icon: BarChart3, label: 'Mock Scores', path: '/mock-scores' },
  { icon: PenLine, label: 'Daily Log', path: '/daily-log' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-black border-r-3 border-zinc-800 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b-3 border-zinc-800">
        <div className="flex items-center justify-center w-10 h-10 rounded border-2 border-white bg-primary shadow-[4px_4px_0px_#ffffff]">
          <GraduationCap className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="font-black text-white text-xl leading-tight uppercase tracking-wider">The OG IPMAT Hub</h1>
          <p className="text-xs text-primary font-bold uppercase tracking-widest">Study Companion</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded text-sm font-bold transition-all duration-200 border-2",
                isActive
                  ? "bg-primary text-black border-white shadow-[4px_4px_0px_#ffffff] translate-x-[-2px] translate-y-[-2px]"
                  : "text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900 hover:border-zinc-800"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-zinc-400 group-hover:text-white")} />
              <span className="uppercase tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t-3 border-zinc-800 bg-black">
        <div className="flex items-center gap-3 mb-4 px-2 p-3 border-2 border-zinc-800 rounded bg-zinc-900">
          <div className="w-9 h-9 rounded bg-secondary flex items-center justify-center border-2 border-black">
            <span className="text-sm font-black text-black">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
            <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full px-3 py-2 mb-2 text-sm font-bold text-primary hover:text-primary/80 hover:bg-primary/10 rounded border-2 border-transparent hover:border-primary transition-all uppercase tracking-wide"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              Dark Mode
            </>
          )}
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded border-2 border-transparent hover:border-red-500 transition-all uppercase tracking-wide"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
};
