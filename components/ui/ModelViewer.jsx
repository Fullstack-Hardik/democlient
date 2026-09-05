/* eslint-disable react-hooks/rules-of-hooks */
 
import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, Environment, ContactShadows, Bounds, Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-white font-medium">{`${Math.round(progress)}%`}</span>
    </Html>
  );
};

const Model = ({ url }) => {
  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  const content = useMemo(() => {
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
    if (ext === 'fbx') return useFBX(url).clone();
    return null;
  }, [url, ext]);

  if (!content) return null;

  return <primitive object={content} />;
};

const ModelViewer = ({
  url,
  width = '100%',
  height = '100%',
  autoRotate = true,
  autoRotateSpeed = 1.0,
}) => {
  // Preload the model if it's a GLTF
  useEffect(() => {
    if (url.endsWith('.glb') || url.endsWith('.gltf')) {
      useGLTF.preload(url);
    }
  }, [url]);

  return (
    <div style={{ width, height, position: 'relative', margin: '0 auto', touchAction: 'pan-y' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} style={{ touchAction: 'pan-y' }}>
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          {/* Bounds component automatically centers and fits the model! */}
          <Bounds fit clip observe margin={1.1}>
            <Model url={url} />
          </Bounds>
          <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={20} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls 
          makeDefault
          enableZoom={false} 
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          enableDamping={true}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
