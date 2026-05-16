import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, Thermometer, Droplets, Volume2, CloudRain, Zap, 
  Trash2, Leaf, AlertTriangle, Layers, Radio, Shield, 
  Activity, Map as MapIcon, ChevronLeft, MapPin
} from 'lucide-react';
import { clsx } from 'clsx';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { TerrainMap } from '../components/TerrainMap';

interface DigitalTwinProps {
  setActiveView?: (view: string) => void;
}

const LIVE_DATA = [
  { id: 'air', label: 'جودة الهواء', value: 42, unit: 'AQI', status: 'جيد', icon: Wind, color: 'text-status-active' },
  { id: 'temp', label: 'درجة الحرارة', value: 38, unit: '°C', status: 'طبيعي', icon: Thermometer, color: 'text-waste-alert' },
  { id: 'humidity', label: 'الرطوبة', value: 25, unit: '%', status: 'منخفض', icon: Droplets, color: 'text-primary' },
  { id: 'water_saved', label: 'المياه الموفرة للزراعة', value: 34, unit: '%', status: 'ممتاز', icon: CloudRain, color: 'text-primary' },
  { id: 'water', label: 'استهلاك المياه العام', value: 1.2, unit: 'مليون م³/يوم', status: 'تحسن', icon: Droplets, color: 'text-blue-400' },
  { id: 'energy', label: 'استهلاك الطاقة', value: 2.8, unit: 'جيجاواط', status: 'طبيعي', icon: Zap, color: 'text-yellow-400' },
  { id: 'farms', label: 'كفاءة المزارع الذكية', value: 85, unit: '%', status: 'مرتفع', icon: Leaf, color: 'text-[#10b981]' },
  { id: 'green', label: 'مؤشر الغطاء النباتي', value: 23, unit: '%', status: 'في تحسن', icon: Leaf, color: 'text-status-active' },
];

const CHART_DATA = [
  { name: 'الآن', value: 50 },
  { name: '+6 ساعات', value: 80 },
  { name: '+12 ساعة', value: 90 },
  { name: '+24 ساعة', value: 120 },
  { name: '+36 ساعة', value: 150 },
  { name: '+48 ساعة', value: 180 },
];

const BAR_DATA = [
  { name: 'الأحد', uv: 80, saved: 20 },
  { name: 'الاثنين', uv: 75, saved: 25 },
  { name: 'الثلاثاء', uv: 60, saved: 40 },
  { name: 'الأربعاء', uv: 65, saved: 35 },
  { name: 'الخميس', uv: 85, saved: 15 },
  { name: 'الجمعة', uv: 70, saved: 30 },
  { name: 'السبت', uv: 55, saved: 45 },
];

export function DigitalTwin({ setActiveView }: DigitalTwinProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [time, setTime] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState<any>(null);
  
  // Toolbar state
  const [activeToolbarItem, setActiveToolbarItem] = useState<string | null>(null);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeLayer, setActiveLayer] = useState('all');
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-[#0f172a] text-white overflow-hidden font-sans">
      
      {/* 3D Interactive Canvas */}
      <div className="absolute inset-0 z-0">
        <TerrainMap selectedZone={selectedArea} onBuildingSelect={setSelectedArea} activeLayer={activeLayer} />
      </div>

      {/* Selected Area HUD Overlay */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
          >
            <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-[#38bdf8] rounded-xl p-5 shadow-[0_10px_40px_rgba(56,189,248,0.2)] flex items-center gap-8" dir="rtl">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-[#38bdf8]" />
                  {selectedArea.data.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  النوع:{' '}
                  {selectedArea.type === 'farm'
                    ? 'منطقة زراعية وحقول'
                    : selectedArea.type === 'landmark' || selectedArea.type === 'pyramid_landmark'
                    ? 'معلم رئيسي'
                    : selectedArea.type === 'commercial'
                    ? 'مباني تجارية وإدارية'
                    : selectedArea.type === 'residential'
                    ? 'منطقة سكنية'
                    : 'مرافق عامة'}
                </p>
              </div>
              <div className="flex gap-6 border-r border-[#334155] pr-6">
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">الحرارة</div>
                  <div className={clsx("text-xl font-bold font-mono", selectedArea.data.temperature > 35 ? "text-error" : "text-white")}>{selectedArea.data.temperature}°C</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">جودة الهواء</div>
                  <div className="text-xl font-bold font-mono text-white">{selectedArea.data.airQuality} AQI</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">استهلاك الطاقة</div>
                  <div className="text-xl font-bold font-mono text-[#f59e0b]">{selectedArea.data.energy} kWh</div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedArea(null)}
                className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center hover:bg-[#ef4444] hover:text-white transition-colors mr-2"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 pointer-events-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveView && setActiveView('home')} 
            className="w-10 h-10 bg-[#1e293b]/70 backdrop-blur-md rounded-full shadow-lg border border-[#334155] flex items-center justify-center text-white hover:bg-[#334155] transition-colors pointer-events-auto flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">التوأم الرقمي لمدينة الرياض</h1>
            <p className="text-sm tracking-widest text-[#38bdf8]">RIYADH DIGITAL TWIN</p>
          </div>
        </div>

        <div className="flex gap-2 pointer-events-auto bg-[#1e293b]/60 backdrop-blur-md p-1.5 rounded-full border border-[#334155]">
          {['الكل', 'الطاقة', 'الضوضاء', 'النفايات', 'المياه', 'جودة الهواء', 'المناخ'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
                activeTab === tab ? "bg-[#3b82f6] text-white" : "text-gray-300 hover:text-white hover:bg-[#334155]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-left">
          <div className="text-xs text-gray-400 font-medium mb-1 flex items-center justify-end gap-2">
            مباشر 
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#10b981]" 
            />
          </div>
          <div className="text-2xl font-mono tracking-wider">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
          <div className="text-xs text-gray-400 tracking-widest">{time.toISOString().split('T')[0]}</div>
        </div>
      </div>

      {/* LEFT PANEL (Live Data - physical left) */}
      <AnimatePresence>
        {showLeftPanel && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-24 left-6 bottom-32 w-64 flex flex-col gap-4 z-20 pointer-events-none"
          >
            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl overflow-hidden flex-1 pointer-events-auto flex flex-col pt-4">
              <h2 className="px-5 text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                البيانات الحية
              </h2>
              
              <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-hide" dir="rtl">
                <div className="flex flex-col gap-1">
                  {LIVE_DATA.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#334155]/50 transition-colors cursor-pointer border border-transparent hover:border-[#334155]">
                      <item.icon className={clsx("w-5 h-5", item.color)} />
                      <div className="flex-1 text-right">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <div className="flex items-end gap-1 justify-end flex-row-reverse">
                          <span className="text-[10px] text-gray-400 mb-0.5">{item.unit}</span>
                          <span className="text-lg font-bold font-mono leading-tight" dir="ltr">{item.value}</span>
                        </div>
                      </div>
                      {item.status && <div className="text-[10px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">{item.status}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-5 h-40 pointer-events-auto flex flex-col justify-center items-center relative overflow-hidden text-center" dir="rtl">
              <p className="text-xs text-gray-300 absolute top-4 right-4">مؤشر الاستدامة العام</p>
              
              <div className="relative w-24 h-24 mt-4 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="42" className="stroke-[#334155]" strokeWidth="8" fill="none" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * 0.72) }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                    cx="48" cy="48" r="42" className="stroke-[#10b981]" strokeWidth="8" fill="none" 
                    strokeDasharray="264" strokeLinecap="round" 
                  />
                </svg>
                <div className="flex flex-col items-center justify-center z-10">
                  <span className="text-3xl font-bold font-mono" dir="ltr">72</span>
                  <span className="text-[10px] text-gray-400">من 100</span>
                </div>
              </div>
              <div className="absolute bottom-4 text-[#10b981] text-xs font-bold bg-[#10b981]/10 px-3 py-1 rounded-full">جيد</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL (Charts - physical right) */}
      <AnimatePresence>
        {showRightPanel && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-24 right-6 bottom-32 w-80 flex flex-col gap-4 z-20 pointer-events-auto"
            dir="rtl"
          >
            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-4 overflow-hidden h-[30%]">
              <h2 className="text-sm font-bold text-gray-200 mb-3">جودة الهواء حسب المناطق</h2>
              <div className="relative w-full h-[calc(100%-2rem)] bg-[#0f172a] rounded-lg border border-[#334155] overflow-hidden">
                {/* Mini Map representation */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Miniature_map_of_world.svg')] bg-cover bg-center [filter:invert(1)_hue-rotate(180deg)]"></div>
                
                {/* Heatmap overlay dots */}
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-[#10b981] rounded-full blur-[20px] opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-[#ef4444] rounded-full blur-[25px] opacity-60"></div>
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#3b82f6] rounded-full blur-[30px] opacity-60"></div>
                
                {/* Legend inside map */}
                <div className="absolute right-2 top-2 flex flex-col gap-1">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div><span className="text-[9px] text-gray-300">جيد</span></div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#eab308]"></div><span className="text-[9px] text-gray-300">متوسط</span></div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f97316]"></div><span className="text-[9px] text-gray-300">غير صحي</span></div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ef4444]"></div><span className="text-[9px] text-gray-300">طوارئ</span></div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-4 overflow-hidden h-[25%] flex flex-col">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h2 className="text-sm font-bold text-gray-200">اتجاه التلوث (التوقع)</h2>
                  <p className="text-[10px] text-gray-400">توقع 48 ساعة القادمة</p>
                </div>
              </div>
              <div className="flex-1 w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-4 overflow-hidden h-[25%] flex flex-col">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h2 className="text-sm font-bold text-gray-200">كفاءة استهلاك المياه الزراعية</h2>
                  <p className="text-[10px] text-gray-400">الاستهلاك الفعلي (أزرق) مقابل الوفر (أخضر)</p>
                </div>
              </div>
              <div className="flex-1 w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BAR_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      cursor={{fill: '#334155', opacity: 0.4}}
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                    />
                    <Bar dataKey="uv" stackId="a" fill="#0ea5e9" name="الاستهلاك" />
                    <Bar dataKey="saved" stackId="a" fill="#10b981" name="الوفر" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1e293b]/70 backdrop-blur-xl border border-[#334155] rounded-xl p-4 flex-1 flex flex-col overflow-hidden">
              <h2 className="text-sm font-bold text-gray-200 mb-3 text-center border-b border-[#334155] pb-2">التنبيهات والمبادرات</h2>
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide flex-1">
                <div className="flex items-center gap-3 p-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg">
                  <Leaf className="w-5 h-5 text-[#10b981]" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-200">تفعيل الري الذكي</p>
                    <p className="text-[10px] text-gray-400">المزارع في المحيط الغربي - توفير 40%</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-[#eab308]/10 border border-[#eab308]/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#eab308]" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-200">تسرب مياه محتمل</p>
                    <p className="text-[10px] text-gray-400">المنطقة الزراعية رقم 4 - التوجيه للصيانة</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </div>

                <div className="flex items-center gap-3 p-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-lg">
                  <Activity className="w-5 h-5 text-[#3b82f6]" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-200">مستويات الرطوبة للتربة</p>
                    <p className="text-[10px] text-gray-400">ضمن المستويات المثالية للمحاصيل</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOOLBAR POPUPS */}
      <AnimatePresence>
        {activeToolbarItem === 'layers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-[#1e293b]/90 backdrop-blur-xl border border-[#334155] rounded-xl p-3 shadow-2xl flex gap-2"
          >
            {[
              { id: 'all', label: 'الكل' },
              { id: 'farm', label: 'المزارع' },
              { id: 'commercial', label: 'التجاري' },
              { id: 'residential', label: 'السكني' },
            ].map(layer => (
               <button
                 key={layer.id}
                 onClick={() => setActiveLayer(layer.id)}
                 className={clsx(
                   "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                   activeLayer === layer.id ? "bg-[#38bdf8] text-white" : "bg-[#0f172a] text-gray-400 hover:text-white hover:bg-[#334155]"
                 )}
               >
                 {layer.label}
               </button>
            ))}
          </motion.div>
        )}
        
        {(activeToolbarItem === 'sim' || activeToolbarItem === 'predict' || activeToolbarItem === 'reports') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-[#1e293b]/90 backdrop-blur-xl border border-[#334155] rounded-xl p-4 shadow-2xl text-center"
          >
            <p className="text-white font-bold mb-1">
              {activeToolbarItem === 'sim' ? 'وضع المحاكاة' : activeToolbarItem === 'predict' ? 'نماذج التوقع' : 'التقارير التحليلية'}
            </p>
            <p className="text-xs text-gray-400">هذه الميزة قيد التطوير وسيتم إتاحتها قريباً.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM TOOLBAR */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
      >
        <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-[#334155] rounded-full p-2 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {[
             { id: 'layers', icon: Layers, label: 'الطبقات' },
             { id: 'data', icon: Activity, label: 'البيانات الحية' },
             { id: 'sim', icon: Shield, label: 'المحاكاة' },
             { id: 'predict', icon: MapIcon, label: 'التوقعات' },
             { id: 'reports', icon: Radio, label: 'التقارير' },
             { id: 'alerts', icon: AlertTriangle, label: 'التنبيهات' },
          ].map((item, idx) => {
            const isActive = activeToolbarItem === item.id || (item.id === 'data' && showLeftPanel) || (item.id === 'alerts' && showRightPanel);
            
            return (
              <button 
                key={item.id}
                onClick={() => {
                  if (item.id === 'data') {
                    setShowLeftPanel(prev => !prev);
                  } else if (item.id === 'alerts') {
                    setShowRightPanel(prev => !prev);
                  } else {
                    setActiveToolbarItem(activeToolbarItem === item.id ? null : item.id);
                  }
                }}
                className={clsx(
                  "flex flex-col items-center gap-1.5 w-16 px-1 py-2 rounded-full transition-all group relative",
                  isActive ? "bg-[#334155] text-white" : "text-gray-400 hover:text-white hover:bg-[#334155]"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive && "text-[#38bdf8]")} />
                <span className="text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-[#0f172a] px-2 py-1 rounded min-w-max border border-[#334155]">
                  {item.label}
                </span>
                {/* Optional separator line */}
                {idx !== 5 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-[#334155]"></div>}
              </button>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
