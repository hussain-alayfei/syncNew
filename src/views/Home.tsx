import { BarChart, Calendar, Map, ArrowLeft, Droplets, MoreHorizontal, Lightbulb } from 'lucide-react';

interface HomeProps {
  setActiveView: (view: string) => void;
}

export function Home({ setActiveView }: HomeProps) {
  return (
    <div className="flex flex-col gap-6 min-h-screen">
      {/* Welcome Hero */}
      <div className="mb-6 bg-gradient-to-l from-primary to-primary-container rounded-xl p-8 text-on-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-bold mb-2">مرحبا بك</h2>
          <p className="text-lg opacity-90">معنا تدير ري مزارعك وتقلل الهدر المائي</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Quick Actions (Spans 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-2">
          <button onClick={() => setActiveView('dashboard')} className="w-full text-right bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-lg text-primary">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">تقارير الاداء</h3>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-outline group-hover:text-primary transition-colors transform group-hover:-translate-x-1" />
          </button>
          
          <button onClick={() => setActiveView('schedule')} className="w-full text-right bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-lg text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">جداول الري</h3>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-outline group-hover:text-primary transition-colors transform group-hover:-translate-x-1" />
          </button>

          <button onClick={() => setActiveView('map')} className="w-full text-right bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-lg text-primary">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">خريطة نظام الري</h3>
                <p className="text-xs font-medium text-outline">الخريطة التفاعلية</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-outline group-hover:text-primary transition-colors transform group-hover:-translate-x-1" />
          </button>
        </div>

        {/* Irrigation Gauges (Spans 8) */}
        <div className="col-span-12 lg:col-span-8 bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <Droplets className="w-6 h-6" />
              متابعة نظام الري
            </h3>
            <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:bg-surface-container transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex justify-around items-end h-full py-4">
            {/* Gauge 1: Quality */}
            <div className="text-center relative">
              <svg className="w-32 h-32 transform -rotate-180" viewBox="0 0 36 36">
                <path className="text-surface-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="50, 100" strokeWidth="3"></path>
                <path className="text-status-active stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="45, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                <span className="text-3xl font-bold text-on-surface">89%</span>
                <span className="text-xs font-medium text-outline">جودة الري</span>
              </div>
            </div>
            
            {/* Gauge 2: Waste */}
            <div className="text-center relative">
              <svg className="w-32 h-32 transform -rotate-180" viewBox="0 0 36 36">
                <path className="text-surface-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="50, 100" strokeWidth="3"></path>
                <path className="text-status-active stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="5.5, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                <span className="text-3xl font-bold text-on-surface">11%</span>
                <span className="text-xs font-medium text-outline">نسبة الهدر</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Cumulative Waste Chart (Spans 6) */}
        <div className="col-span-12 lg:col-span-6 bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-on-secondary-fixed">مستوى الهدر التراكمي</h3>
            <button className="text-outline hover:text-primary"><MoreHorizontal className="w-6 h-6" /></button>
          </div>
          
          <div className="relative h-48 flex items-end justify-between px-4">
            {/* Y Axis Labels */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs font-medium text-outline pb-6 text-left w-12 z-10">
              <span>مرتفع جدا</span>
              <span>مرتفع</span>
              <span>متوسط</span>
              <span>منخفض</span>
            </div>
            
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pr-14 z-0">
              <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
              <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
              <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
              <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
            </div>
            
            {/* Bars */}
            <div className="flex justify-between w-full pr-14 z-10 h-[calc(100%-24px)] items-end">
              <div className="w-8 bg-secondary-fixed rounded-t-md h-[10%] opacity-50"></div>
              <div className="w-8 bg-secondary-fixed rounded-t-md h-[15%] opacity-50"></div>
              <div className="w-8 bg-secondary-fixed rounded-t-md h-[20%] opacity-50"></div>
              
              {/* Highlighted Bar */}
              <div className="w-8 bg-primary rounded-t-md h-[85%] relative flex justify-center">
                <div className="absolute -top-3 w-3 h-3 rounded-full bg-white border-2 border-primary"></div>
                <div className="w-px h-full bg-white opacity-30 border-dashed border-l"></div>
              </div>
              
              <div className="w-8 bg-secondary-fixed rounded-t-md h-[18%] opacity-50"></div>
              <div className="w-8 bg-secondary-fixed rounded-t-md h-[12%] opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Summary & Recommendations (Spans 6) */}
        <div className="col-span-12 lg:col-span-6 bg-surface rounded-xl p-6 shadow-sm border border-surface-container-highest">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-on-secondary-fixed">الملخص</h3>
            <button className="text-outline hover:text-primary"><MoreHorizontal className="w-6 h-6" /></button>
          </div>
          
          <div className="bg-surface-container-low rounded-lg p-4 mb-6 border border-surface-container">
            <h4 className="text-sm font-bold text-on-surface mb-3">انواع النباتات والموارد المائية</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-tertiary-fixed text-primary text-xs font-medium rounded-md">مياه جوفية</span>
              <span className="px-3 py-1 bg-tertiary-fixed text-primary text-xs font-medium rounded-md">مياه ابار</span>
              <span className="px-3 py-1 bg-tertiary-fixed text-primary text-xs font-medium rounded-md">مياه معالجة</span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-medium rounded-md">عنب</span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-medium rounded-md">لوزيات</span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-medium rounded-md">برتقال</span>
            </div>
          </div>
          
          <div className="relative pl-2">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-tertiary-fixed p-1 rounded">
                  <Lightbulb className="text-primary w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-primary">التوصيات</h4>
              </div>
              <ul className="space-y-3 text-sm font-bold text-on-secondary-fixed-variant">
                <li className="flex items-start gap-2 before:content-['•'] before:text-primary">
                  <span>رفع كفاءة نظام الري عن طريق تغيير نظام دفع المياه</span>
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-primary">
                  <span>متابعة جداول الري المخصصة والالتزام بها</span>
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-primary">
                  <span>زيادة التنوع النباتي للمنطقة</span>
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-primary">
                  <span>بدء الري عند الفجر الساعة 5:15</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
