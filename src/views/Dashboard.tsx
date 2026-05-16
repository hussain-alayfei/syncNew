import { useState } from 'react';
import { 
  Droplets, 
  Gauge, 
  Router, 
  AlertTriangle, 
  Brain, 
  ArrowLeft, 
  LineChart as LineChartIcon, 
  BarChart3, 
  PieChart as PieChartIcon,
  Check
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const consumptionData = [
  { time: '00:00', consumption: 300, humidity: 45 },
  { time: '04:00', consumption: 250, humidity: 50 },
  { time: '08:00', consumption: 400, humidity: 40 },
  { time: '12:00', consumption: 800, humidity: 25 },
  { time: '16:00', consumption: 700, humidity: 30 },
  { time: '20:00', consumption: 350, humidity: 40 },
];

const wasteData = [
  { sector: 'قطاع أ', waste: 20 },
  { sector: 'قطاع ب', waste: 65 },
  { sector: 'قطاع ج', waste: 15 },
  { sector: 'قطاع د', waste: 10 },
];

const sourceData = [
  { name: 'مياه جوفية', value: 45, color: '#006c53' },
  { name: 'مياه آبار', value: 30, color: '#69dab5' },
  { name: 'مياه معالجة', value: 25, color: '#bdc2fd' },
];

export function Dashboard() {
  const [activeMapLayer, setActiveMapLayer] = useState<'humidity' | 'pressure'>('pressure');
  const [removedAlerts, setRemovedAlerts] = useState<number[]>([]);
  const [appliedAlerts, setAppliedAlerts] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-8">
      {/* Zone 1: KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant text-sm font-semibold">توفير المياه التراكمي</span>
            <Droplets className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-on-surface">
            12,450 <span className="text-base text-on-surface-variant font-normal">لتر</span>
          </div>
          <div className="text-sm text-status-active font-medium mt-1">+2.4% عن الشهر الماضي (1,245 ر.س)</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant text-sm font-semibold">مؤشر كفاءة الري</span>
            <Gauge className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-on-surface">
            89<span className="text-xl">%</span>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-2 mt-3">
            <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant text-sm font-semibold">صحة النظام</span>
            <Router className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1">
              <div className="text-xl font-bold text-on-surface">42/45</div>
              <div className="text-xs text-on-surface-variant">مستشعرات نشطة</div>
            </div>
            <div className="h-10 w-px bg-outline-variant"></div>
            <div className="flex-1">
              <div className="text-xl font-bold text-on-surface">94%</div>
              <div className="text-xs text-on-surface-variant">متوسط البطارية</div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-error-container shadow-sm bg-opacity-50">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant text-sm font-semibold">تنبيهات التسرب</span>
            <AlertTriangle className="w-6 h-6 text-waste-alert" />
          </div>
          <div className="text-3xl font-bold text-waste-alert">
            1 <span className="text-base font-normal">نشط</span>
          </div>
          <div className="text-sm text-on-surface-variant font-medium mt-1">تسرب محتمل في القطاع ب-3</div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone 2: Geospatial Map */}
        <section className="col-span-2 bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-surface-container flex justify-between items-center">
            <h2 className="text-xl font-semibold text-on-surface">الخريطة الحرارية للمزرعة</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveMapLayer('humidity')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${activeMapLayer === 'humidity' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
              >
                الرطوبة
              </button>
              <button 
                onClick={() => setActiveMapLayer('pressure')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${activeMapLayer === 'pressure' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
              >
                الضغط
              </button>
            </div>
          </div>
          <div className="flex-1 relative bg-surface-container-low min-h-[400px]">
            {/* Simulated Map Background */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-80 ${activeMapLayer === 'humidity' ? 'hue-rotate-180 brightness-110' : ''}`} 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHAlae9kWSUj2rb1e7qLukwHsNIuPRsXB_Zqwnp7K5jmExq6HAkhB-v_OxZyABfKqdtFwQ73ogATI30wgA2iXskOv6gZyZMBSyUaBbcJrZbdR1Gn7jX-om2j-WTKpdUgd5XwnchTl2r3nZMyYcfvpysaXBn9zMEhWSow8frAHU4Ja_DaxWQY69WeYsRTW9uL46LNDtnv-p9mEUNONpAvHiFwq_yHi6HWtDHowjKcu3c9E_fYOnb6hyS00nsLoJr7KiN9dphJJaDVk')" }}
            ></div>
            
            {/* Simulated Nodes */}
            <div className="absolute top-[30%] left-[40%] w-4 h-4 bg-status-active rounded-full ring-4 ring-status-active/30 transition-transform hover:scale-125 cursor-pointer"></div>
            <div className="absolute top-[50%] left-[60%] w-4 h-4 bg-status-active rounded-full ring-4 ring-status-active/30 transition-transform hover:scale-125 cursor-pointer"></div>
            <div className="absolute top-[70%] left-[30%] w-4 h-4 bg-waste-alert rounded-full ring-4 ring-waste-alert/30 transition-transform hover:scale-125 cursor-pointer"></div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg border border-outline-variant backdrop-blur-sm">
              <div className="text-xs font-semibold mb-2 text-on-surface">مفتاح الخريطة</div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-status-active rounded-full"></div>
                <span className="text-xs text-on-surface-variant">مستشعر طبيعي</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-waste-alert rounded-full"></div>
                <span className="text-xs text-on-surface-variant">{activeMapLayer === 'pressure' ? 'انخفاض الضغط / تسرب' : 'جفاف التربة'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Zone 4: AI & Automation Panel */}
        <section className="col-span-1 flex flex-col gap-6">
          {/* AI Recommendations */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-6">
            <h2 className="text-xl font-semibold text-on-surface mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              توصيات الذكاء الاصطناعي
            </h2>
            <ul className="space-y-4">
              {!removedAlerts.includes(1) && (
                <li className="bg-surface p-4 rounded-lg border-r-4 border-primary transition-all duration-300">
                  <div className="text-sm font-semibold text-on-surface">تعديل توقيت القطاع ج-1</div>
                  <div className="text-xs text-on-surface-variant mt-1">تأخير الري إلى 5:15 صباحاً بناءً على توقعات انخفاض التبخر غداً.</div>
                  {appliedAlerts.includes(1) ? (
                    <div className="mt-2 text-xs text-status-active font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> تم التطبيق
                    </div>
                  ) : (
                    <div className="flex gap-4 mt-2">
                      <button onClick={() => setAppliedAlerts([...appliedAlerts, 1])} className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                        <ArrowLeft className="w-4 h-4" /> تطبيق التعديل 
                      </button>
                      <button onClick={() => setRemovedAlerts([...removedAlerts, 1])} className="text-xs text-on-surface-variant font-semibold flex items-center gap-1 hover:underline">
                        تجاهل
                      </button>
                    </div>
                  )}
                </li>
              )}
              {!removedAlerts.includes(2) && (
                <li className="bg-surface p-4 rounded-lg border-r-4 border-tertiary-container transition-all duration-300">
                  <div className="text-sm font-semibold text-on-surface">إيقاف الري في القطاع أ-2</div>
                  <div className="text-xs text-on-surface-variant mt-1">مستويات رطوبة التربة وصلت إلى 92%، الري غير ضروري اليوم.</div>
                  {appliedAlerts.includes(2) ? (
                    <div className="mt-2 text-xs text-status-active font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> تم التطبيق
                    </div>
                  ) : (
                    <div className="flex gap-4 mt-2">
                      <button onClick={() => setAppliedAlerts([...appliedAlerts, 2])} className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                        <ArrowLeft className="w-4 h-4" /> تطبيق التعديل 
                      </button>
                      <button onClick={() => setRemovedAlerts([...removedAlerts, 2])} className="text-xs text-on-surface-variant font-semibold flex items-center gap-1 hover:underline">
                        تجاهل
                      </button>
                    </div>
                  )}
                </li>
              )}
              {removedAlerts.length === 2 && (
                <li className="text-sm text-center text-on-surface-variant py-4">لا توجد توصيات جديدة حالياً.</li>
              )}
            </ul>
          </div>

          {/* Upcoming Timeline */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-6 flex-1">
            <h2 className="text-xl font-semibold text-on-surface mb-4">الجدول الزمني للري</h2>
            <div className="relative pr-4 border-r-2 border-surface-container-high pl-6">
              <div className="mb-6 relative">
                <div className="absolute -right-[23px] top-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                <div className="text-xs text-primary font-semibold mb-1">الآن • 04:00 ص</div>
                <div className="bg-surface p-3 rounded-lg border border-outline-variant">
                  <div className="text-sm font-semibold text-on-surface">بدء ضخ القطاع الشمالي</div>
                  <div className="text-xs text-on-surface-variant">المدة المقدرة: 45 دقيقة</div>
                </div>
              </div>
              
              <div className="mb-6 relative">
                <div className="absolute -right-[23px] top-1 w-4 h-4 bg-surface-container-high rounded-full border-2 border-white"></div>
                <div className="text-xs text-on-surface-variant font-semibold mb-1">05:15 ص</div>
                <div className="bg-surface p-3 rounded-lg border border-outline-variant opacity-70">
                  <div className="text-sm font-semibold text-on-surface">جدولة القطاع ج-1 (محدث)</div>
                  <div className="text-xs text-on-surface-variant">تلقائي بواسطة النظام</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Zone 3: Data Visualization */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-6 flex flex-col h-80">
          <h2 className="text-xl font-semibold text-on-surface mb-4">الاستهلاك vs رطوبة التربة (24 ساعة)</h2>
          <div className="flex-1 w-full h-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consumptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dee4df" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6d7a74', fontSize: 12}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6d7a74', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6d7a74', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px border #eaefeb' }} 
                  itemStyle={{ color: '#171d1a' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="consumption" stroke="#006c53" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="الاستهلاك (لتر)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#69dab5" strokeWidth={3} dot={false} name="الرطوبة (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-6 flex flex-col">
            <h2 className="text-base font-semibold text-on-surface mb-4">مستويات الهدر حسب القطاع</h2>
            <div className="flex-1 w-full h-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dee4df" />
                  <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{fill: '#6d7a74', fontSize: 10}} />
                  <Tooltip cursor={{fill: '#eff5f0'}} />
                  <Bar dataKey="waste" fill="#29a482" radius={[4, 4, 0, 0]} name="الهدر (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-6 flex flex-col">
            <h2 className="text-base font-semibold text-on-surface mb-4">توزيع مصادر المياه</h2>
            <div className="flex-1 w-full h-full min-h-[140px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
