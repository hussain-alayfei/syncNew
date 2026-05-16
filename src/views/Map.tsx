import { useState } from 'react';
import { Plus, Minus, Layers, ArrowRight, Radio, AlertTriangle, BarChart2, ArrowLeft, Droplets, Thermometer, Map as MapIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

interface MapProps {
  setActiveView?: (view: string) => void;
}

const ZONES = [
  {
    id: 1,
    name: "حقل الطماطم الشمالي",
    status: "active",
    waterConsumption: 120,
    humidity: "82%",
    temp: "24°C",
    nextIrrigation: "اكتمل الري",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=200&auto=format&fit=crop",
    position: "top-[20%] right-[10%] w-[35%] h-[45%] -skew-x-12 rotate-2",
  },
  {
    id: 2,
    name: "حقل القمح الشرقي",
    status: "warning",
    waterConsumption: 250,
    humidity: "45%",
    temp: "28°C",
    nextIrrigation: "4:00 مساءً",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIxK6Mk6k-Or5EHURmhDoKec9Ea__pF0pzVsrxPGnaLeUtkwAlJEDzq8vXG3JS6Pxq47i1SwcJC3dVwLQfp_ipgXgACNKN6E9kMg3S5MNUYerJ2fhWG0HrtbFM3dsT65m2737Z3zfHt0aagLFd5FzT_XmT-D2JDD845WRVXNBu9BLuNWgE0i-B4dqMVowJFdQ9Yovqt0ExcQ0iJzP8Rl8b4Q1HgAymSf_jf60jWHCGZY8YOtl411cRjSRzZl5ttRyEcjD_bdQXnrM",
    position: "top-[30%] right-[50%] w-[25%] h-[50%] skew-y-6 -rotate-6",
  },
  {
    id: 3,
    name: "مزرعة النخيل",
    status: "normal",
    waterConsumption: 80,
    humidity: "60%",
    temp: "26°C",
    nextIrrigation: "غداً 6:00 صباحاً",
    image: "https://images.unsplash.com/photo-1596328546171-77e37b5fec33?q=80&w=200&auto=format&fit=crop",
    position: "bottom-[10%] left-[10%] w-[30%] h-[35%]",
  }
];

export function Map({ setActiveView }: MapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLayers, setShowLayers] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'irrigation' | 'temperature'>('irrigation');
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

  const activeZoneData = ZONES.find(z => z.id === selectedZone);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-surface-subtle overflow-hidden">
      {/* Simulated Map Background */}
      <div 
        className={clsx(
          "w-full h-full relative transition-all duration-1000 ease-in-out origin-center",
          activeLayer === 'temperature' && "hue-rotate-180 brightness-110 saturate-150",
          activeLayer === 'satellite' && "saturate-100 brightness-100",
          activeLayer === 'irrigation' && "saturate-50 contrast-125"
        )}
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABz-zzPOz-rbcxqsprljS1rxLqvt43VZZUZcz8r4eq7ZSZBoKrPdOV9AhZhv7D-2CW8ixfmsi6SYoIbE4yppsK_y7SnqqJniKGuCbvKThUAC_VYUV-u7KsgKR9Bg2py-C47_o1lnd8_4EOJTHXY37p-eiu8TOnBBX0A0svNV4FfkiRgsexZahGOs30PXSlSP1T1ARoE7vaULDUqKdKi1g0Qw5o7BlrG1EdHInkEGC4ed4mjKDWcEjc3_veCdPeRdGMiRG54ihWOZY')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          transform: `scale(${zoomLevel})`
        }}
      >
        {/* Irrigation Zones Overlay */}
        <AnimatePresence>
          {activeLayer === 'irrigation' && ZONES.map((zone) => {
            const isSelected = selectedZone === zone.id;
            
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={zone.id}
                onClick={() => setSelectedZone(isSelected ? null : zone.id)}
                className={clsx(
                  "absolute border-2 flex items-center justify-center cursor-pointer transition-all duration-300",
                  zone.position,
                  isSelected ? "z-20 shadow-2xl scale-[1.02]" : "z-10 hover:scale-[1.01]",
                  zone.status === 'active' && "border-status-active/80 bg-status-active/20 hover:bg-status-active/30",
                  zone.status === 'warning' && "border-waste-alert/80 bg-waste-alert/20 hover:bg-waste-alert/30",
                  zone.status === 'normal' && "border-primary/50 bg-primary/10 hover:bg-primary/20",
                  isSelected && "border-opacity-100 bg-opacity-40"
                )}
              >
                <motion.div 
                  layoutId={`icon-${zone.id}`}
                  className="w-12 h-12 md:w-16 md:h-16 bg-surface rounded-full shadow-lg flex items-center justify-center relative"
                >
                  {zone.status === 'active' && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  )}
                  {zone.status === 'warning' ? (
                    <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-waste-alert" />
                  ) : (
                    <Radio className={clsx("w-6 h-6 md:w-8 md:h-8 text-primary", zone.status === 'active' && "text-status-active")} />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Temperature Layer Annotations */}
        <AnimatePresence>
          {activeLayer === 'temperature' && ZONES.map((zone) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={`temp-${zone.id}`}
              className={clsx(
                "absolute flex items-center justify-center pointer-events-none",
                zone.position
              )}
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg font-bold text-lg flex items-center gap-2 text-waste-alert">
                <Thermometer className="w-5 h-5" />
                {zone.temp}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-30" dir="ltr">
        <button onClick={handleZoomIn} className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
          <Plus className="w-5 h-5" />
        </button>
        <button onClick={handleZoomOut} className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
          <Minus className="w-5 h-5" />
        </button>
        <div className="relative mt-2">
          <button onClick={() => setShowLayers(!showLayers)} className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors relative z-20">
            <Layers className="w-5 h-5" />
          </button>
          
          <AnimatePresence>
            {showLayers && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-12 top-0 bg-surface rounded-lg shadow-md p-2 w-36 border border-outline-variant/20 z-10 flex flex-col gap-1"
                dir="rtl"
              >
                <button 
                  onClick={() => { setActiveLayer('satellite'); setShowLayers(false); }} 
                  className={clsx("text-xs text-right w-full px-3 py-2 rounded font-bold transition-colors flex items-center gap-2", activeLayer === 'satellite' ? "bg-primary-container text-on-primary-container" : "hover:bg-surface-container-low text-on-surface-variant")}
                >
                  <MapIcon className="w-4 h-4" /> القمر الصناعي
                </button>
                <button 
                  onClick={() => { setActiveLayer('irrigation'); setShowLayers(false); }} 
                  className={clsx("text-xs text-right w-full px-3 py-2 rounded font-bold transition-colors flex items-center gap-2", activeLayer === 'irrigation' ? "bg-primary-container text-on-primary-container" : "hover:bg-surface-container-low text-on-surface-variant")}
                >
                  <Droplets className="w-4 h-4" /> طبقة الري
                </button>
                <button 
                  onClick={() => { setActiveLayer('temperature'); setShowLayers(false); }} 
                  className={clsx("text-xs text-right w-full px-3 py-2 rounded font-bold transition-colors flex items-center gap-2", activeLayer === 'temperature' ? "bg-primary-container text-on-primary-container" : "hover:bg-surface-container-low text-on-surface-variant")}
                >
                  <Thermometer className="w-4 h-4" /> طبقة الحرارة
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-30 flex gap-3">
        <button onClick={() => setActiveView && setActiveView('home')} className="w-10 h-10 bg-surface rounded-full shadow-md flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="bg-surface/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-md flex items-center gap-2 border border-outline-variant/30">
          <span className="text-xl font-bold text-on-surface">خريطة الري</span>
        </div>
      </div>

      {/* Floating Data Panel */}
      <div className="absolute bottom-8 right-8 z-30 w-[400px]">
        <AnimatePresence mode="wait">
          {activeZoneData ? (
             <motion.div 
               key={`zone-${activeZoneData.id}`}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="bg-surface/95 backdrop-blur-md rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden"
             >
               <div className="p-6">
                 <div className="flex justify-between items-start mb-6 border-b border-outline-variant/20 pb-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       {activeZoneData.status === 'warning' ? <AlertTriangle className="w-6 h-6 text-waste-alert" /> : <Radio className="w-6 h-6 text-primary" />}
                       <h2 className="text-xl font-bold text-on-surface">{activeZoneData.name}</h2>
                     </div>
                     <span className={clsx(
                       "inline-block px-2 py-1 rounded-md text-xs font-bold mt-1",
                       activeZoneData.status === 'warning' && "bg-error-container text-on-error-container",
                       activeZoneData.status === 'active' && "bg-primary-container text-on-primary-container",
                       activeZoneData.status === 'normal' && "bg-surface-container-highest text-on-surface-variant"
                     )}>
                       {activeZoneData.status === 'warning' ? 'تنبيه: انخفاض الرطوبة' : activeZoneData.status === 'active' ? 'جاري الري الآن' : 'وضع طبيعي'}
                     </span>
                   </div>
                   <button onClick={() => setSelectedZone(null)} className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center transition-colors">
                     <Minus className="w-5 h-5 text-on-surface-variant" />
                   </button>
                 </div>
     
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                     <p className="text-xs text-on-surface-variant mb-1 font-medium">استهلاك المياه اليومي</p>
                     <div className="flex items-baseline gap-1 mt-1">
                       <span className="text-3xl font-bold text-primary">{activeZoneData.waterConsumption}</span>
                       <span className="text-xs font-medium text-on-surface-variant">لتر</span>
                     </div>
                   </div>
                   <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                     <p className="text-xs text-on-surface-variant mb-1 font-medium">متوسط الرطوبة</p>
                     <div className="flex items-baseline gap-1 mt-1">
                       <span className={clsx(
                         "text-3xl font-bold",
                         activeZoneData.status === 'warning' ? "text-waste-alert" : "text-primary"
                       )}>{activeZoneData.humidity}</span>
                     </div>
                   </div>
                 </div>
     
                 <div 
                   onClick={() => setActiveView && setActiveView('schedule')}
                   className="bg-surface-container rounded-xl p-3 flex items-center gap-4 border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                 >
                   <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                     <img 
                       alt={`${activeZoneData.name} Thumbnail`} 
                       className="w-full h-full object-cover" 
                       src={activeZoneData.image} 
                     />
                   </div>
                   <div className="flex-1">
                     <h3 className="text-sm font-bold text-on-surface">إدارة الجدولة</h3>
                     <p className="text-xs font-medium text-on-surface-variant mt-1">الري القادم: {activeZoneData.nextIrrigation}</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
                     <ArrowLeft className="w-5 h-5" />
                   </div>
                 </div>
               </div>
             </motion.div>
          ) : (
            <motion.div 
              key="global-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-surface/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart2 className="w-6 h-6 text-primary" />
                      <h2 className="text-xl font-bold text-on-surface">ملخص المزرعة</h2>
                    </div>
                    <span className="inline-block bg-primary-fixed text-on-primary-fixed px-2 py-1 rounded-md text-xs font-bold mt-1">اضغط على حقل للتفاصيل</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant mb-1 font-medium">الاستهلاك الكلي</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold text-primary">450</span>
                      <span className="text-xs font-medium text-on-surface-variant">لتر</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant mb-1 font-medium">حالة النظام</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <div className="w-3 h-3 bg-waste-alert rounded-full mt-2"></div>
                      <span className="text-lg font-bold text-on-surface">1 تنبيه</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

