import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useCursor, Edges, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Generate zones on the terrain
const generateCity = (size = 120) => {
  const buildings = [];
  
  // Riyadh Landmarks Approximations
  buildings.push({
    id: 'kingdom_centre',
    position: [0, 20, 0] as [number, number, number],
    scale: [6, 40, 2] as [number, number, number],
    type: 'landmark',
    data: { name: 'برج المملكة', temperature: 38, airQuality: 42, energy: 120.5, soilMoisture: 10 }
  });

  buildings.push({
    id: 'faisaliah',
    position: [15, 12.5, -20] as [number, number, number],
    scale: [4, 25, 4] as [number, number, number],
    type: 'pyramid_landmark',
    data: { name: 'برج الفيصلية', temperature: 37, airQuality: 45, energy: 95.2, soilMoisture: 12 }
  });
  
  buildings.push({
    id: 'kabd',
    position: [-20, 15, 10] as [number, number, number],
    scale: [8, 30, 8] as [number, number, number],
    type: 'commercial',
    data: { name: 'مركز الملك عبدالله المالي', temperature: 35, airQuality: 30, energy: 210.0, soilMoisture: 15 }
  });

  // Random City Blocks and Farms
  for (let i = 0; i < 250; i++) {
    const x = (Math.random() - 0.5) * size;
    const z = (Math.random() - 0.5) * size;
    
    // Clear space around landmarks
    if (Math.abs(x) < 8 && Math.abs(z) < 8) continue;
    if (Math.abs(x - 15) < 6 && Math.abs(z + 20) < 6) continue;
    if (Math.abs(x + 20) < 10 && Math.abs(z - 10) < 10) continue;

    // Density pattern
    const distToCenter = Math.sqrt(x*x + z*z);
    
    // Increase farm frequency and bring them closer
    const isFarm = distToCenter > 15 && Math.random() > 0.15;
    
    const heightBase = Math.max(1, 15 - distToCenter * 0.3); 
    const height = isFarm ? Math.random() * 0.5 + 0.5 : Math.random() * heightBase + 1 + Math.random();

    const type = isFarm ? 'farm' : height > 8 ? 'commercial' : height > 3 ? 'residential' : 'park';

    buildings.push({
      id: `b_${i}`,
      position: [x, height / 2, z] as [number, number, number],
      scale: isFarm ? [4 + Math.random() * 4, height, 4 + Math.random() * 4] : [1.5 + Math.random(), height, 1.5 + Math.random()] as [number, number, number],
      type,
      data: {
        name: type === 'farm' ? 'منطقة زراعية' : height > 8 ? 'منطقة تجارية' : height > 3 ? 'منطقة سكنية' : 'مرافق',
        temperature: Math.floor(30 + Math.random() * 15),
        airQuality: Math.floor(20 + Math.random() * 60),
        soilMoisture: type === 'farm' ? Math.floor(60 + Math.random() * 30) : Math.floor(10 + Math.random() * 20),
        energy: (Math.random() * 50).toFixed(1)
      }
    });
  }
  return buildings;
};

function Building({ data, onSelect, isSelected }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isLandmark = data.type === 'landmark' || data.type === 'pyramid_landmark';
  const color = isLandmark ? '#38bdf8' : data.type === 'commercial' ? '#0ea5e9' : data.type === 'farm' ? '#22c55e' : data.type === 'residential' ? '#334155' : '#10b981';
  
  useFrame((state) => {
    if (ref.current && isLandmark) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + data.position[0]) * 0.4;
    }
  });

  return (
    <group position={data.position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        onClick={(e) => { e.stopPropagation(); onSelect(data); }}
        scale={hovered || isSelected ? [data.scale[0]*1.1, data.scale[1]*1.02, data.scale[2]*1.1] : data.scale}
        castShadow
        receiveShadow
      >
        {data.type === 'pyramid_landmark' ? (
          <coneGeometry args={[0.5, 1, 4]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial 
          color={hovered || isSelected ? '#ffffff' : color} 
          emissive={isLandmark || hovered || isSelected ? color : '#000000'}
          emissiveIntensity={hovered || isSelected ? 0.8 : isLandmark ? 0.5 : 0}
          transparent
          opacity={isLandmark ? 0.85 : 0.6}
          roughness={data.type === 'farm' ? 0.8 : 0.1}
          metalness={data.type === 'farm' ? 0.1 : 0.8}
        />
        <Edges scale={1.001} threshold={15} color={hovered || isSelected ? '#ffffff' : isLandmark ? '#7dd3fc' : '#1e293b'} />
      </mesh>

      {/* Floating Labels for Landmarks or Hovered item */}
      {(isLandmark || hovered || isSelected) && (
        <Html position={[0, data.scale[1]/2 + (isLandmark ? 4 : 2), 0]} center zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center pointer-events-none transition-opacity duration-300">
            <div className={`backdrop-blur-md border px-3 py-1.5 rounded shadow-lg text-xs font-bold text-center ${
              hovered || isSelected ? 'bg-[#3b82f6]/90 border-white text-white scale-110' : 'bg-[#0f172a]/80 border-[#38bdf8] text-[#38bdf8]'
            } transition-all`}>
              {data.data.name}
              <div className={data.data.airQuality > 50 ? "text-[#ef4444]" : "text-[#10b981]"}>
                {data.data.airQuality} AQI
              </div>
            </div>
            <div className={`w-0.5 ${isLandmark ? 'h-8' : 'h-4'} bg-gradient-to-t ${hovered || isSelected ? 'from-transparent to-white' : 'from-transparent to-[#38bdf8]'}`}></div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraAnimator({ selectedZone }: { selectedZone: any }) {
  const { camera, controls } = useThree();
  
  useFrame(() => {
    if (selectedZone && controls) {
      // Offset by the parent group's position [0, -5, 0]
      const targetPos = new THREE.Vector3(
        selectedZone.position[0], 
        selectedZone.position[1] - 5, 
        selectedZone.position[2]
      );
      
      const desiredCamPos = targetPos.clone().add(new THREE.Vector3(15, 10, 20)); // offset zoom
      
      camera.position.lerp(desiredCamPos, 0.05);
      
      if ((controls as any).target) {
        (controls as any).target.lerp(targetPos, 0.05);
      }
    }
  });
  
  return null;
}

export function TerrainMap({ onBuildingSelect, selectedZone, activeLayer = 'all' }: { onBuildingSelect: (data: any) => void, selectedZone?: any, activeLayer?: string }) {
  const buildings = useMemo(() => generateCity(100), []);

  return (
    <Canvas camera={{ position: [40, 45, 60], fov: 35 }}>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 40, 140]} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[20, 50, 20]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-20, 20, -20]} intensity={4} color="#38bdf8" />
      <pointLight position={[20, 10, 30]} intensity={3} color="#10b981" />
      <pointLight position={[0, 5, 0]} intensity={2} color="#f59e0b" />

      <group position={[0, -5, 0]}>
        {/* Ground grid & plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#020617" roughness={0.9} metalness={0.1} />
        </mesh>
        <gridHelper args={[200, 50, '#1e293b', '#0f172a']} position={[0, 0.05, 0]} />

        {/* Generate Buildings */}
        {buildings.filter(b => activeLayer === 'all' || activeLayer === b.type || (activeLayer === 'commercial' && b.type.includes('landmark'))).map((b) => (
          <Building key={b.id} data={b} onSelect={onBuildingSelect} isSelected={selectedZone?.id === b.id} />
        ))}
      </group>

      <CameraAnimator selectedZone={selectedZone} />

      <OrbitControls 
        makeDefault 
        autoRotate={!selectedZone} 
        autoRotateSpeed={0.3} 
        maxPolarAngle={Math.PI / 2.1} 
        minDistance={10} 
        maxDistance={120} 
        target={[0, 10, 0]}
      />
    </Canvas>
  );
}
