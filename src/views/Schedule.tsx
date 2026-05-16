import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  Droplets, 
  Timer, 
  Thermometer,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Schedule() {
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  interface CalendarDay {
    day: number;
    isOut?: boolean;
    isSelected?: boolean;
    isActive?: boolean;
    activeColor?: string;
  }

  // Generating a static calendar layout to match the design
  const calendarDays: CalendarDay[] = [
    { day: 29, isOut: true }, { day: 30, isOut: true }, { day: 31, isOut: true },
    ...Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const isSelected = day === selectedDay;
      const isActive = [7, 9, 12, 16, 20, 26].includes(day);
      const activeColor = [9, 16, 26].includes(day) ? 'bg-status-active' : 'bg-primary';
      
      return { day, isSelected, isActive, activeColor };
    }),
    { day: 1, isOut: true }, { day: 2, isOut: true }
  ];

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Calendar Widget */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-surface-container p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-on-surface">رحلة السقاية</h3>
            <div className="flex items-center gap-2" dir="ltr">
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <div className="bg-white border border-surface-container px-4 py-1 rounded-lg text-sm font-bold text-on-surface flex items-center gap-2 cursor-pointer hover:bg-surface-subtle transition-colors">
                  April <ChevronDown className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-white border border-surface-container px-4 py-1 rounded-lg text-sm font-bold text-on-surface flex items-center gap-2 cursor-pointer hover:bg-surface-subtle transition-colors">
                  2026 <ChevronDown className="w-4 h-4 text-primary" />
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-xl p-6" dir="ltr">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-xs font-bold text-on-surface-variant">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4 text-center min-h-[300px]">
              {calendarDays.map((date, idx) => (
                <div 
                  key={idx} 
                  onClick={() => !date.isOut && setSelectedDay(date.day)}
                  className={twMerge(
                    clsx(
                      "aspect-square flex items-center justify-center rounded-lg text-sm transition-colors relative",
                      date.isOut ? "text-outline bg-transparent" : "bg-white shadow-sm cursor-pointer hover:bg-surface-bright",
                      date.isSelected ? "border-2 border-primary text-primary font-bold" : "text-on-surface"
                    )
                  )}
                >
                  {date.day}
                  {!date.isOut && date.isActive && (
                    <div className={clsx("absolute bottom-2 w-1.5 h-1.5 rounded-full", date.activeColor)}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Detail Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        {/* Hero Image Card */}
        <div className="bg-primary rounded-[32px] p-2 overflow-hidden relative">
          <div className="h-64 rounded-[24px] overflow-hidden relative">
            <img 
              alt="Wheat Field" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSSu_lvgolAYkkFRYr6IZrSPJEjq6pN4-l5DgB2IqXiZEjhdc85fpRmZJaMvvKLKNfbRPDfHhoyMLaQZWalDbWvVgm8jePobaQETmqGo2x4p3Lmpgmgt-M5O51LrZtOTQOzmOKlvjszWy4LeY3tZMGOxNh5segpBxQSoy_LuCW6TiTxLTUBhWfqM5-XQhpMWMjWJ9CIs1kItZRixZhjnTD2jB7E05_YPpoPtBwXCsGcVcrAb4RnJMd8czQqL1zuzJ_27u2_HJepzc" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          {/* Floating Detail Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0">
              <ChevronDown className="w-5 h-5 text-primary" />
            </div>
            <div className="text-right flex-1 px-4">
              <h4 className="text-sm font-bold text-on-surface">حقل القمح الشرقي</h4>
              <p className="text-xs font-medium text-on-surface-variant">الري القادم: 4:00 مساءً</p>
            </div>
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img 
                alt="Thumbnail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeysxVo3b9EgtQwqE0s-1cAbGXbTnasSrcffwso9NKLLwsB4oeyzAMD1bhLR431CbXtZ2J_HRUHURAUSgJKJbjfpMCOL5zcQAEALIdm491DpSpvtRiy2b1RKreX_gvpa0IWldJCtIntjoFBrXURfbrWMcpe3golqjx2WTKTmyEE7-4ewH4YGG8kmzNwEcB5NaGNOUaFXBs0SiHI4MMzvo8FU7ErsweV6SYKzX9nNhBP2GjIWLlrs-VWgWMBpyBo1uttVADdNb818s" 
              />
            </div>
          </div>
        </div>

        {/* Event Details Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-surface-container p-6 relative">
          {isEditing && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl p-6 text-center">
               <h4 className="font-bold text-lg mb-2 text-on-surface">وضع التعديل</h4>
               <p className="text-sm text-on-surface-variant mb-4">يمكنك الآن سحب الإفلات لتغيير أوقات الري في الجدول.</p>
               <button onClick={() => setIsEditing(false)} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">تم حفظ التعديلات</button>
             </div>
          )}
          <h3 className="text-xl font-bold text-on-surface mb-4">تفاصيل الجدولة (يوم {selectedDay})</h3>
          <div className="space-y-4">
            
            <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-lg border border-surface-container-low">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">كمية المياه المقدرة</p>
                <p className="text-lg font-bold text-on-surface">12,500 لتر</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-lg border border-surface-container-low">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">مدة الري</p>
                <p className="text-lg font-bold text-on-surface">45 دقيقة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-lg border border-surface-container-low">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">الظروف الجوية المتوقعة</p>
                <p className="text-lg font-bold text-on-surface">28°C مشمس</p>
              </div>
            </div>

          </div>
          
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => setIsEditing(true)} 
              className="flex-1 bg-white border-2 border-primary text-primary rounded-xl py-2 text-sm font-bold hover:bg-surface-container-low transition-colors"
            >
              تعديل
            </button>
            <button 
              onClick={handleConfirm}
              className={clsx(
                "flex-1 text-white rounded-xl py-2 text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all",
                isConfirmed ? "bg-status-active" : "bg-primary hover:bg-primary-container"
              )}
            >
              {isConfirmed ? <><Check className="w-4 h-4"/> تم التأكيد</> : "تأكيد بدء الري"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
