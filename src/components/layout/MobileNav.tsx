import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  BookOpen,
  CheckSquare,
  BarChart3,
  PenLine,
  Menu,
  X,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calculator, label: 'Quant Vault', path: '/quant-vault' },
  { icon: BookOpen, label: 'Vocab Hub', path: '/vocab-hub' },
  { icon: CheckSquare, label: 'Progress', path: '/progress' },
  { icon: BarChart3, label: 'Mock Scores', path: '/mock-scores' },
  { icon: PenLine, label: 'Daily Log', path: '/daily-log' },
];

export const MobileNav = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-3 border-zinc-800 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded border-2 border-white bg-primary shadow-[2px_2px_0px_#ffffff]">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
            <h1 className="font-black text-white uppercase tracking-wider">The OG IPMAT Hub</h1>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-white border-2 border-transparent hover:border-zinc-700 rounded transition-all">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-black border-r-3 border-zinc-800 p-0 text-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 px-6 py-5 border-b-3 border-zinc-800">
                  <div className="flex items-center justify-center w-10 h-10 rounded border-2 border-white bg-primary shadow-[4px_4px_0px_#ffffff]">
                    <GraduationCap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="font-black text-white text-lg uppercase tracking-wider">The OG IPMAT Hub</h1>
                    <p className="text-xs text-primary font-bold uppercase">Study Companion</p>
                  </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded text-sm font-bold transition-all border-2",
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
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded border-2 border-transparent hover:border-red-500 transition-all uppercase tracking-wide"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Bottom Navigation for quick access */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-3 border-black lg:hidden shadow-[0px_-4px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded transition-colors",
                  isActive ? "text-black" : "text-zinc-400 hover:text-black"
                )}
              >
                <div className={cn(
                  "p-1 rounded border-2 transition-all",
                  isActive ? "bg-primary border-black shadow-[2px_2px_0px_#000]" : "border-transparent bg-transparent"
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={cn("text-[10px] font-black uppercase", isActive ? "text-black" : "text-zinc-400")}>
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
