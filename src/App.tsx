import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './views/Dashboard';
import { Home } from './views/Home';
import { DeviceConnection } from './views/DeviceConnection';
import { Schedule } from './views/Schedule';
import { Map } from './views/Map';
import { DigitalTwin } from './views/DigitalTwin';
import { clsx } from 'clsx';

export default function App() {
  const [activeView, setActiveView] = useState('digital-twin');

  return (
    <div className="min-h-screen">
      <Topbar setActiveView={setActiveView} />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main content shifted to the left to avoid right sidebar in RTL */}
      <main className={clsx("mr-64 mt-20", activeView === 'map' || activeView === 'digital-twin' ? 'p-0' : 'p-8')}>
        {activeView === 'home' && <Home setActiveView={setActiveView} />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'schedule' && <Schedule />}
        {activeView === 'devices' && <DeviceConnection />}
        {activeView === 'map' && <Map setActiveView={setActiveView} />}
        {activeView === 'digital-twin' && <DigitalTwin setActiveView={setActiveView} />}
        {activeView !== 'home' && activeView !== 'dashboard' && activeView !== 'devices' && activeView !== 'schedule' && activeView !== 'map' && activeView !== 'digital-twin' && (
          <div className="flex h-[60vh] items-center justify-center text-on-surface-variant p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">جاري العمل على هذه الصفحة</h2>
              <p>يرجى اختيار "الرئيسية" من القائمة للعودة.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

