import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Layers, 
  Sparkles, 
  Monitor, 
  Waves, 
  Sun, 
  ChevronRight, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface EducationalMaterial {
  id: string;
  title: string;
  icon: any;
  description: string;
  benefits: string[];
  visualType: 'slider' | 'comparison' | 'video' | 'lens-comparison';
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  prescription?: string;
  beforeFilter?: string;
  afterFilter?: string;
  videoUrl?: string;
  colors?: { name: string; hex: string; image: string; overlay?: string; videoUrl?: string }[];
}

const EDUCATIONAL_DATA: EducationalMaterial[] = [
  {
    id: 'polycarbonate',
    title: 'Polycarbonate',
    icon: Shield,
    description: 'Polycarbonate lenses are the industry standard for safety. They are significantly more impact-resistant than standard plastic, making them the only choice for children, athletes, and safety eyewear.',
    benefits: [
      '10x more impact-resistant than plastic',
      'Built-in 100% UV protection',
      'Thinner and lighter than CR-39',
      'Essential for rimless or semi-rimless frames'
    ],
    visualType: 'lens-comparison',
    prescription: '-5.00D',
    beforeImage: '', 
    afterImage: '',
    beforeLabel: 'Standard Plastic',
    afterLabel: 'Polycarbonate'
  },
  {
    id: 'high-index',
    title: 'High-Index Lenses',
    icon: Layers,
    description: 'High-index lenses are designed for people with strong prescriptions. They bend light more efficiently, allowing the lens to be significantly thinner and lighter than traditional materials.',
    benefits: [
      'Up to 50% thinner than standard lenses',
      'Reduces the "coke-bottle" effect',
      'Lighter weight for all-day comfort',
      'Better aesthetics for high prescriptions'
    ],
    visualType: 'lens-comparison',
    prescription: '-5.00D',
    beforeImage: '', 
    afterImage: '',
    beforeLabel: 'Standard Lens',
    afterLabel: 'High-Index'
  },
  {
    id: 'ar-coating',
    title: 'Anti-Reflective Coating',
    icon: Sparkles,
    description: 'Anti-reflective (AR) coating eliminates reflections from the front and back of your lenses. This allows more light to pass through, improving your vision and making your eyes more visible to others.',
    benefits: [
      'Reduces glare from night driving and computers',
      'Improves contrast and visual clarity',
      'Makes lenses nearly invisible',
      'Reduces eye strain from overhead lighting'
    ],
    visualType: 'slider',
    beforeImage: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=1200', // Night road with car lights
    afterImage: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=1200',
    beforeLabel: 'Without AR (Heavy Glare)',
    afterLabel: 'With AR Coating',
    beforeFilter: 'blur(2px) brightness(2.2) contrast(1.4) drop-shadow(0 0 35px white) drop-shadow(0 0 55px rgba(255,255,255,0.9))', // Intense sunburst/starburst effect
    afterFilter: 'brightness(0.9) contrast(1.2)' // Clearer, high-contrast nighttime view
  },
  {
    id: 'blue-light',
    title: 'Blue Light Coating',
    icon: Monitor,
    description: 'Blue light filtering lenses are designed to reduce the amount of high-energy blue light reaching the eye from digital screens and artificial lighting.',
    benefits: [
      'Reduces digital eye strain',
      'May improve sleep quality',
      'Filters harmful blue-violet light',
      'Ideal for heavy computer/phone users'
    ],
    visualType: 'slider',
    beforeImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', // Computer screen
    afterImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    beforeLabel: 'Unfiltered',
    afterLabel: 'Blue Light Filter',
    beforeFilter: 'brightness(1.2) saturate(1.5)', // Harsh blue
    afterFilter: 'sepia(0.3) brightness(0.9)' // Calm yellow
  },
  {
    id: 'polarization',
    title: 'Polarization',
    icon: Waves,
    description: 'Polarized lenses contain a special filter that blocks intense reflected light (glare) from surfaces like water, snow, and roads. Unlike standard sunglasses, they actually improve what you can see.',
    benefits: [
      'Eliminates blinding glare',
      'Increases visual contrast and color saturation',
      'Reduces squinting and eye fatigue',
      'Essential for fishing, driving, and skiing'
    ],
    visualType: 'slider',
    beforeImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', // Lake
    afterImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    beforeLabel: 'Standard Sun',
    afterLabel: 'Polarized',
    beforeFilter: 'brightness(2) contrast(0.5) blur(1px)', // Glare on water
    afterFilter: 'brightness(1) contrast(1.2) saturate(1.5)', // See through water
    colors: [
      { name: 'Neutral Gray', hex: '#4B5563', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', overlay: '#4B5563' },
      { name: 'High-Contrast Brown', hex: '#78350F', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', overlay: '#78350F' },
      { name: 'G-15 Green', hex: '#064E3B', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', overlay: '#064E3B' }
    ]
  },
  {
    id: 'transitions',
    title: 'Transitions',
    icon: Sun,
    description: 'Transitions (photochromic) lenses automatically darken when exposed to UV light and return to clear indoors. They provide seamless protection and convenience in any light condition.',
    benefits: [
      'Convenience of two-in-one glasses',
      'Blocks 100% of UVA and UVB rays',
      'Reduces glare and eye fatigue',
      'Available in multiple stylish colors'
    ],
    visualType: 'video',
    videoUrl: '/trans/transgrey.mp4',
    beforeImage: '',
    afterImage: '',
    beforeLabel: '',
    afterLabel: '',
    colors: [
      { name: 'Grey', hex: '#374151', image: '', videoUrl: '/trans/transgrey.mp4' },
      { name: 'Brown', hex: '#451A03', image: '', videoUrl: '/trans/transbrown.mp4' },
      { name: 'Graphite Green', hex: '#064E3B', image: '', videoUrl: '/trans/transg15.mp4' },
      { name: 'Sapphire', hex: '#1D4ED8', image: '', videoUrl: '/trans/transblue.mp4' },
      { name: 'Amethyst', hex: '#7E22CE', image: '', videoUrl: '/trans/transpurp.mp4' },
      { name: 'Emerald', hex: '#059669', image: '', videoUrl: '/trans/transemerald.mp4' }
    ]
  }
];

export const EducationalMaterials: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);

  const selectedMaterial = EDUCATIONAL_DATA.find(m => m.id === selectedId);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
    }
  }, [selectedId, activeColorIdx]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 pb-4 rainbow-border-bottom">
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-[#F5F5F4]">Educational Materials</h2>
        <p className="text-gray-500 dark:text-[#A8A29E] max-w-2xl">
          Learn about the different lens materials and options available to enhance your vision and protect your eyes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDUCATIONAL_DATA.map((material) => (
          <div key={material.id} className="rainbow-border rounded-2xl">
            <motion.button
              whileHover={{ y: -4 }}
              onClick={() => {
                setSelectedId(material.id);
                setActiveColorIdx(0);
              }}
              className="w-full h-full bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-gray-200 dark:border-[#292524] shadow-sm text-left hover:border-black dark:hover:border-[#F5F5F4] transition-all group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#292524] rounded-xl flex items-center justify-center text-black dark:text-[#F5F5F4] mb-4 group-hover:bg-black dark:group-hover:bg-[#F5F5F4] group-hover:text-white dark:group-hover:text-[#1C1917] transition-colors">
                <material.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-black dark:text-[#F5F5F4]">{material.title}</h3>
              <p className="text-sm text-gray-500 dark:text-[#A8A29E] line-clamp-2 mb-4">{material.description}</p>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-black dark:text-[#F5F5F4]">
                <span>Learn More</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedMaterial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />
            <motion.div 
              className="rainbow-border rounded-3xl w-full max-w-5xl max-h-[90vh] relative z-10"
            >
              <div className="bg-white dark:bg-[#1C1917] w-full h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 bg-white/80 dark:bg-[#1C1917]/80 backdrop-blur-md rounded-full text-[#1C1917] dark:text-[#F5F5F4] hover:bg-white dark:hover:bg-[#292524] transition-colors z-20 shadow-sm"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>

              {/* Visual Side */}
              <div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#0C0A09] p-6 flex flex-col gap-6">
                <div className="flex-1 min-h-[300px]">
                  {selectedMaterial.visualType === 'slider' ? (
                    <BeforeAfterSlider 
                      beforeImage={selectedMaterial.beforeImage}
                      afterImage={selectedMaterial.colors ? selectedMaterial.colors[activeColorIdx].image : selectedMaterial.afterImage}
                      beforeLabel={selectedMaterial.beforeLabel}
                      afterLabel={selectedMaterial.colors ? selectedMaterial.colors[activeColorIdx].name : selectedMaterial.afterLabel}
                      beforeFilter={selectedMaterial.beforeFilter}
                      afterFilter={selectedMaterial.afterFilter}
                      overlayColor={selectedMaterial.colors ? selectedMaterial.colors[activeColorIdx].overlay : undefined}
                      className="h-full shadow-lg"
                    />
                  ) : selectedMaterial.visualType === 'comparison' ? (
                    <div className="h-full flex flex-col gap-4">
                      <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-200 dark:border-[#292524] shadow-sm">
                        <img src={selectedMaterial.beforeImage} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                          {selectedMaterial.beforeLabel}
                        </div>
                      </div>
                      <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-200 dark:border-[#292524] shadow-sm">
                        <img src={selectedMaterial.afterImage} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                          {selectedMaterial.afterLabel}
                        </div>
                      </div>
                    </div>
                  ) : selectedMaterial.visualType === 'lens-comparison' ? (
                    <div className="h-full flex flex-col gap-8 items-center justify-center bg-white dark:bg-[#1C1917] rounded-xl border border-gray-200 dark:border-[#292524] p-8">
                      <div className="text-center space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#78716C]">Prescription</p>
                        <p className="text-2xl font-mono font-bold text-black dark:text-[#F5F5F4]">{selectedMaterial.prescription}</p>
                      </div>
                      
                      <div className="w-full space-y-12">
                        {/* Standard Lens */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-end px-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#A8A29E]">{selectedMaterial.beforeLabel}</span>
                            <span className="text-[10px] font-medium text-gray-400 dark:text-[#78716C]">Standard Thickness</span>
                          </div>
                          <div className="relative h-16 w-full flex items-center justify-center">
                            {/* Lens Profile - Minus Lens (-5.00D) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-12 bg-gray-200/30 dark:bg-[#292524]/30 rounded-[50%_50%_50%_50%_/_20%_20%_80%_80%] border-x-[12px] border-black/10 dark:border-[#F5F5F4]/10" />
                            </div>
                            <div className="w-full h-0.5 bg-black/5 dark:bg-[#F5F5F4]/5 z-0" />
                          </div>
                        </div>

                        {/* High-Index/Polycarbonate Lens */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-end px-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-[#F5F5F4]">{selectedMaterial.afterLabel}</span>
                            <span className="text-[10px] font-medium text-green-600 dark:text-[#10B981]">~35-50% Thinner</span>
                          </div>
                          <div className="relative h-16 w-full flex items-center justify-center">
                            {/* Lens Profile - Thinner Minus Lens */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-12 bg-green-100/30 dark:bg-[#065F46]/30 rounded-[50%_50%_50%_50%_/_10%_10%_90%_90%] border-x-[4px] border-green-600/20 dark:border-[#10B981]/20" />
                            </div>
                            <div className="w-full h-0.5 bg-black/5 dark:bg-[#F5F5F4]/5 z-0" />
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-500 dark:text-[#A8A29E] italic text-center max-w-[200px]">
                        Cross-section view demonstrating edge thickness reduction.
                      </p>
                    </div>
                  ) : (
                    <div className="h-full rounded-xl overflow-hidden border border-gray-200 dark:border-[#292524] shadow-lg bg-black relative">
                      {selectedMaterial.colors && selectedMaterial.colors[activeColorIdx].videoUrl ? (
                        <video 
                          key={selectedMaterial.colors[activeColorIdx].videoUrl}
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        >
                          <source src={selectedMaterial.colors[activeColorIdx].videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <iframe 
                          src={selectedMaterial.videoUrl} 
                          className="w-full h-full"
                          allow="autoplay; encrypted-media" 
                          allowFullScreen
                        />
                      )}
                    </div>
                  )}
                </div>

                {selectedMaterial.colors && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] dark:text-[#A8A29E]">Available Colors</p>
                    <div className="flex gap-3">
                      {selectedMaterial.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => setActiveColorIdx(idx)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            activeColorIdx === idx 
                              ? 'bg-white dark:bg-[#292524] border-[#1C1917] dark:border-[#F5F5F4] shadow-sm' 
                              : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-[#292524]/50'
                          }`}
                        >
                          <div 
                            className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10" 
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-medium text-[#1C1917] dark:text-[#F5F5F4]">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white dark:bg-[#1C1917]">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-[#292524] rounded-2xl flex items-center justify-center text-black dark:text-[#F5F5F4]">
                      <selectedMaterial.icon size={28} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-black dark:text-[#F5F5F4]">{selectedMaterial.title}</h2>
                    <p className="text-gray-500 dark:text-[#A8A29E] leading-relaxed">{selectedMaterial.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-[#F5F5F4]">Key Benefits</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedMaterial.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="text-black dark:text-[#F5F5F4] mt-0.5 shrink-0" size={18} />
                          <span className="text-sm text-gray-700 dark:text-[#D6D3D1]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-[#292524]">
                    <div className="bg-gray-50 dark:bg-[#292524] p-4 rounded-2xl flex items-start gap-3">
                      <Info className="text-[#D97706] mt-0.5 shrink-0" size={18} />
                      <p className="text-xs text-gray-500 dark:text-[#A8A29E] leading-normal">
                        Consult with our opticians to determine if {selectedMaterial.title} is the right choice for your lifestyle and prescription.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};
