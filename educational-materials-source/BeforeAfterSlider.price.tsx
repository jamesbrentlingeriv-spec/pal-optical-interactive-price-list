import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  beforeFilter?: string;
  afterFilter?: string;
  overlayColor?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  beforeFilter = "",
  afterFilter = "",
  overlayColor = ""
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-xl border border-gray-200 dark:border-[#292524] ${className}`}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onMouseDown={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (The "Result") */}
      <div className="relative w-full h-full">
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover block"
          style={{ filter: afterFilter }}
          referrerPolicy="no-referrer"
        />
        {overlayColor && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-60"
            style={{ backgroundColor: overlayColor }}
          />
        )}
      </div>
      
      {/* Before Image (The "Original") */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <div 
          className="absolute inset-0"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
        >
          <img 
            src={beforeImage} 
            alt="Before" 
            className="w-full h-full object-cover block max-w-none"
            style={{ filter: beforeFilter }}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-[#1C1917] rounded-full shadow-xl flex items-center justify-center border border-gray-200 dark:border-[#292524]">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
};
