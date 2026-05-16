import { useState, useEffect } from 'react';
import { RefreshCw, ListOrdered, Info, Check, Smartphone, Wifi, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';

export function DeviceConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let timer4: NodeJS.Timeout;

    if (isConnecting) {
      setActiveStep(1); // Connecting to phone
      timer1 = setTimeout(() => {
        setActiveStep(2); // Connecting to wifi/network
        timer2 = setTimeout(() => {
          setActiveStep(3); // Syncing with server
          timer3 = setTimeout(() => {
            setIsConnecting(false);
            setSuccess(true);
            setActiveStep(4); // Done
            timer4 = setTimeout(() => {
              setSuccess(false);
              setActiveStep(0);
            }, 4000);
          }, 2000);
        }, 2000);
      }, 1500);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isConnecting]);

  const handleConnect = () => {
    if(!isConnecting && !success) {
      setIsConnecting(true);
    }
  }

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-8 items-center justify-center p-4">
      {/* Device Side */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full lg:w-5/12 flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="bg-surface rounded-3xl shadow-lg border border-surface-container overflow-hidden w-full relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-bright to-surface-container-low opacity-50"></div>
          
          {/* Animated Connecting Effects */}
          <AnimatePresence>
            {isConnecting && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
               >
                 <motion.div 
                   animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="w-40 h-40 bg-primary/20 rounded-full"
                 />
                 <motion.div 
                   animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
                   transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                   className="absolute w-40 h-40 bg-primary/30 rounded-full"
                 />
               </motion.div>
            )}
          </AnimatePresence>
          
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: success ? 1.1 : 1, opacity: 1, y: isConnecting ? [0, -10, 0] : 0 }}
            transition={{ 
              scale: { type: 'spring', stiffness: 200, damping: 20 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            alt="3D illustration of an industrial smart sensor pipe meter" 
            className="relative z-10 w-[80%] max-w-sm h-auto object-contain drop-shadow-2xl" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8yDSB5s7tOhZGAaYr6v29lJqgkJwogaPl5S8bKCcizzW2RkNZLYL3GW5Q3VPBMmlZQWFrrdrZwHzpbVoxFuvBgiQrLo6PlSuaRbrkmM7QRU_xoqzCZTxv48XNz0SH26wCHpKZTImv2nlCX0OgOENl0G9jzmpcEMc2gCsUXnWYOoGk4oddL_KUp5gEBfTaUEuu7inNrbtSYxuOnldLyQR9knZ8FGMmQTYuahHbLRy3hqH2ZUbqVQNWHNiWFDSXMjC636MioJPkpnE" 
          />

          {/* Status Badges on Image */}
          <AnimatePresence>
            {success && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0 }}
                 className="absolute top-6 right-6 bg-status-active text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
               >
                 <Check className="w-5 h-5" />
                 متصل بنجاح
               </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low rounded-2xl p-6 text-center border border-outline-variant shadow-sm transition-all duration-300">
            <span className="text-sm font-medium text-on-surface-variant mb-2 block">الحالة</span>
            <div className={`text-2xl font-bold flex items-center justify-center gap-2 transition-colors duration-500 ${success ? 'text-status-active' : isConnecting ? 'text-primary animate-pulse' : 'text-outline'}`}>
              {success ? 'متصل' : isConnecting ? 'جاري الاتصال...' : 'غير متصل'}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-6 text-center border border-outline-variant shadow-sm transition-all duration-300">
            <span className="text-sm font-medium text-on-surface-variant mb-2 block">رقم السيريال</span>
            <div className={`text-xl font-mono font-bold flex items-center justify-center gap-2 transition-colors duration-500 ${success ? 'text-on-surface' : 'text-outline'}`}>
              {success ? 'SN-8492X' : '----'}
            </div>
          </div>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          onClick={handleConnect}
          disabled={isConnecting || success}
          whileHover={{ scale: (isConnecting || success) ? 1 : 1.02 }}
          whileTap={{ scale: (isConnecting || success) ? 1 : 0.98 }}
          className={clsx(
            "w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-md",
            success ? "bg-status-active text-white border-b-4 border-status-active/80" 
            : isConnecting ? "bg-primary-container text-primary cursor-not-allowed border-b-4 border-primary-container/80"
            : "bg-primary text-on-primary hover:bg-primary/90 border-b-4 border-primary-fixed-variant"
          )}
        >
          {success ? (
            <><Check className="w-6 h-6" /> الجهاز جاهز للعمل</>
          ) : isConnecting ? (
            <><RefreshCw className="w-6 h-6 animate-spin" /> يرجى الانتظار...</>
          ) : (
            <><RefreshCw className="w-6 h-6" /> ابدأ عملية الربط</>
          )}
        </motion.button>
      </motion.div>

      {/* Steps Side */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        className="w-full lg:w-5/12 max-w-lg"
      >
        <div className="bg-surface rounded-3xl shadow-lg border border-surface-container p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
          
          <h2 className="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
            <ListOrdered className="w-7 h-7 text-primary" />
            خطوات الإعداد الموجه
          </h2>
          
          <div className="flex-1 flex flex-col gap-8 relative">
            {/* Progress Line */}
            <div className="absolute right-[23px] top-6 bottom-6 w-1 bg-surface-container-highest z-0 rounded-full overflow-hidden">
               <motion.div 
                 className="w-full bg-primary"
                 initial={{ height: 0 }}
                 animate={{ height: `${(Math.max(activeStep - 1, 0) / 3) * 100}%` }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
               />
            </div>
            
            {[
              { step: 1, title: 'البحث عن الجهاز', desc: 'يتم تشغيل البلوتوث والبحث عن الأجهزة القريبة.', icon: Smartphone },
              { step: 2, title: 'الاتصال بالشبكة', desc: 'نقل إعدادات Wi-Fi إلى الجهاز الذكي.', icon: Wifi },
              { step: 3, title: 'التسجيل في السحابة', desc: 'تسجيل الجهاز في منصة إيكو سينك بشكل آمن.', icon: Server },
              { step: 4, title: 'استكمال الإعداد', desc: 'الجهاز متصل وجاهز لتلقي أوامر الري.', icon: Check }
            ].map((s, i) => {
              const isActive = activeStep === s.step;
              const isPast = activeStep > s.step || success;
              const isPending = activeStep < s.step && !success;
              const Icon = s.icon;

              return (
                <div key={s.step} className={clsx("flex gap-6 relative z-10 transition-all duration-500", isPending ? "opacity-40" : "opacity-100")}>
                  <motion.div 
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isPast || isActive ? "var(--color-primary)" : "var(--color-surface-container-high)"
                    }}
                    className={clsx(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-surface shadow-sm transition-colors",
                      (isPast || isActive) ? "text-on-primary" : "text-on-surface-variant"
                    )}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <div className="pt-2 flex-1">
                    <h3 className={clsx("text-lg font-bold mb-1 transition-colors", (isActive || isPast) ? "text-on-surface" : "text-on-surface-variant")}>
                      {s.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                    
                    <AnimatePresence>
                      {isActive && !isPast && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                              className="h-full bg-primary"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-5 bg-tertiary-fixed/50 rounded-2xl border border-tertiary-fixed-dim/50 flex gap-4 items-start"
          >
            <div className="bg-tertiary-fixed text-tertiary p-2 rounded-full shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-on-tertiary-container leading-relaxed">يرجى التأكد من أنك متواجد ضمن نطاق 5 أمتار من الجهاز وأن مصدر الطاقة موصول لديه لضمان استقرار الاتصال.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

