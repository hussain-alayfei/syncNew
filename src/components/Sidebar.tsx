import { 
  Tractor, 
  Home, 
  Map as MapIcon, 
  Calendar, 
  Router, 
  Plus, 
  LogOut,
  LayoutDashboard,
  MonitorPlay
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'map', icon: MapIcon, label: 'خريطة الري' },
    { id: 'schedule', icon: Calendar, label: 'الجدولة' },
    { id: 'devices', icon: Router, label: 'الأجهزة' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { id: 'digital-twin', icon: MonitorPlay, label: 'التوأم الرقمي' },
  ];

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-on-secondary-fixed shadow-xl flex flex-col py-6 z-50 text-white">
      <div className="px-6 mb-8 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Tractor className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-8 text-primary-fixed">إيكو سينك</h1>
            <p className="text-sm text-secondary-fixed-dim">EcoSync</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={twMerge(
                clsx(
                  "flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-colors duration-200 text-right",
                  isActive 
                    ? "bg-primary-fixed text-on-primary-fixed font-semibold" 
                    : "text-secondary-fixed-dim hover:text-white hover:bg-on-secondary-fixed-variant"
                )
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto flex flex-col gap-4">
        <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
          <Plus className="w-5 h-5" />
          إضافة مزرعة جديدة
        </button>
        <button className="flex items-center gap-4 text-secondary-fixed-dim hover:text-white px-4 py-3 hover:bg-on-secondary-fixed-variant transition-colors duration-200 rounded-lg text-right w-full">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-semibold">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
