import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <BlackHoleHeroSection 
        distance={24} 
        brightness={1}
        hotColor="#FFF3DE"
        midColor="#FF9838"
        coolColor="#8E3A0B"
      >
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            <h1 className="text-6xl font-bold tracking-tighter">Welcome to the void</h1>
        </div>
      </BlackHoleHeroSection>
    </main>
  );
}
