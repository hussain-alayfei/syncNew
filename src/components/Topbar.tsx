import { Search, Bell, HelpCircle } from 'lucide-react';

interface TopbarProps {
  setActiveView?: (view: string) => void;
}

export function Topbar({ setActiveView }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 w-[calc(100%-16rem)] h-20 bg-surface border-b border-outline-variant flex justify-between items-center px-8 mr-64 z-40">
      <div 
        className="hidden md:block text-2xl font-bold leading-8 text-primary cursor-pointer hover:text-primary-container transition-colors"
        onClick={() => setActiveView && setActiveView('home')}
      >
        إيكو سينك
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="بحث..." 
            className="bg-surface-container-low border border-outline-variant rounded-full py-2 px-4 pr-10 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-64"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-on-surface-variant" />
        </div>
        
        <button className="text-primary hover:bg-surface-container-highest rounded-full transition-all p-2">
          <Bell className="w-5 h-5" />
        </button>
        
        <button className="text-primary hover:bg-surface-container-highest rounded-full transition-all p-2">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 bg-surface-container-low py-1.5 px-3 rounded-full border border-outline-variant">
          <span className="text-sm font-semibold text-primary">المزرعة النشطة</span>
        </div>
        
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYFNJmGro3_7jsptPXbh951PYBHv5bFU7LfUm6PpZsDGkg-MIoLdjpRYOQIJpvbORuNk-1KkcVbG3DGwIjWgVPqxkiRTHcOadCvmjCIq3Ygg6Fi4vzCXK4fiFnLXDSuHSVXKhx2APJaabdAWp8YWA3beT-v1NLaBrTx4nj8fscl8I5SIDcDzqrHNp9F6Q0Tgn7nIJYHw1iJQIMO4eFcz5bL4V48p9I63bKTPeXPuxM4aMbI_MMgn0HBhrT7M3k417yypIbHm3t1E" 
          alt="User Avatar" 
          className="w-10 h-10 rounded-full border border-outline-variant object-cover" 
        />
      </div>
    </header>
  );
}
