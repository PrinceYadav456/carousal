/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Paintbrush, Hammer, Pencil, MonitorPlay, Camera } from "lucide-react";
import CircularGallery from "../components/CircularGallery"; // adjust path if needed

// --- DYNAMIC CURATED DATA WITH REAL IMAGES ---
import wallBg from "../assets/faded-orange-wall-with-row-spotlights-empty-room.jpg";
import studioBg from "../assets/4125099.jpg";

const WALL_BG = wallBg;
const Studio_BG = studioBg;

const CATEGORIES = [
  { 
    id: 1, title: "Painting",  bg: WALL_BG, desc: "Oil, Acrylic & Watercolor", CursorIcon: Paintbrush,
    gallery: [
      { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop", title: "The Renaissance", desc: "Oil on Canvas, 1512" },
      { src: "https://images.unsplash.com/photo-1578301978693-85fa9c03fa75?q=80&w=1000&auto=format&fit=crop", title: "Modern Abstract", desc: "Acrylic Mixed Media, 2021" },
      { src: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1000&auto=format&fit=crop", title: "Impressionist Era", desc: "Watercolor Landscape, 1889" },
      { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop", title: "Contemporary", desc: "Textured Oil, 2018" },
      { src: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Classic Portrait", desc: "Oil on Board, 1840" },
      { src: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Classic Portrait", desc: "Oil on Board, 1840" },
      { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop", title: "Contemporary", desc: "Textured Oil, 2018" },
      { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop", title: "Contemporary", desc: "Textured Oil, 2018" },
      { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop", title: "Contemporary", desc: "Textured Oil, 2018" },
    ]
  },
  { 
    id: 2, title: "Sculpture",  bg: Studio_BG, desc: "Marble, Bronze & Clay", CursorIcon: Hammer,
    gallery: [
      { src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop", title: "Hellenistic Marble", desc: "Carved Stone, 200 BC" },
      { src: "https://images.unsplash.com/photo-1611084620025-07ee4b815fb5?q=80&w=1000&auto=format&fit=crop", title: "The Thinker", desc: "Bronze Cast, 1904" },
      { src: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1000&auto=format&fit=crop", title: "Modern Form", desc: "Polished Clay, 1985" },
      { src: "https://images.pexels.com/photos/3357591/pexels-photo-3357591.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Abstract Curves", desc: "Resin & Fiberglass, 2010" },
      { src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop", title: "Hellenistic Marble", desc: "Carved Stone, 200 BC" },
      { src: "https://images.unsplash.com/photo-1611084620025-07ee4b815fb5?q=80&w=1000&auto=format&fit=crop", title: "The Thinker", desc: "Bronze Cast, 1904" },
      { src: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1000&auto=format&fit=crop", title: "Modern Form", desc: "Polished Clay, 1985" },
      { src: "https://images.pexels.com/photos/3357591/pexels-photo-3357591.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Abstract Curves", desc: "Resin & Fiberglass, 2010" },
      { src: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1000&auto=format&fit=crop", title: "Modern Form", desc: "Polished Clay, 1985" },
    ]
  },
  { 
    id: 3, title: "Drawing",  bg: WALL_BG, desc: "Charcoal, Pencil & Ink", CursorIcon: Pencil, 
    gallery: [
      { src: "https://images.pexels.com/photos/1595242/pexels-photo-1595242.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Charcoal Figure", desc: "Charcoal on Paper, 1920" },
      { src: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural Sketch", desc: "Graphite, 1955" },
      { src: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Ink Wash", desc: "India Ink, 1890" },
      { src: "https://images.pexels.com/photos/1595242/pexels-photo-1595242.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Charcoal Figure", desc: "Charcoal on Paper, 1920" },
      { src: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural Sketch", desc: "Graphite, 1955" },
      { src: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Ink Wash", desc: "India Ink, 1890" },
      { src: "https://images.pexels.com/photos/1595242/pexels-photo-1595242.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Charcoal Figure", desc: "Charcoal on Paper, 1920" },
      { src: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural Sketch", desc: "Graphite, 1955" },
      { src: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Ink Wash", desc: "India Ink, 1890" }
    ] 
  },
  { 
    id: 4, title: "Digital Art",  bg: Studio_BG, desc: "NFTs, 3D & Vector", CursorIcon: MonitorPlay, 
    gallery: [
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", title: "Cybernetic Grid", desc: "3D Render, 2023" },
      { src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", title: "Neon Dreams", desc: "Vector Illustration, 2021" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", title: "Generative Flow", desc: "Algorithm Art, 2024" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", title: "Cybernetic Grid", desc: "3D Render, 2023" },
      { src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", title: "Neon Dreams", desc: "Vector Illustration, 2021" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", title: "Generative Flow", desc: "Algorithm Art, 2024" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", title: "Cybernetic Grid", desc: "3D Render, 2023" },
      { src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", title: "Neon Dreams", desc: "Vector Illustration, 2021" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", title: "Generative Flow", desc: "Algorithm Art, 2024" }
    ] 
  },
  { 
    id: 5, title: "Photography", bg: WALL_BG, desc: "Portrait, Landscape & Macro", CursorIcon: Camera, 
    gallery: [
      { src: "https://images.unsplash.com/photo-1554046920-90dcac4b0a70?q=80&w=1000&auto=format&fit=crop", title: "Urban Shadows", desc: "35mm Film, 1994" },
      { src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1000&auto=format&fit=crop", title: "Alpine Vistas", desc: "Digital Medium Format, 2022" },
      { src: "https://images.unsplash.com/photo-1506744626753-eda8182a4a2b?q=80&w=1000&auto=format&fit=crop", title: "Long Exposure", desc: "Nightscape Series, 2019" },
      { src: "https://images.unsplash.com/photo-1554046920-90dcac4b0a70?q=80&w=1000&auto=format&fit=crop", title: "Urban Shadows", desc: "35mm Film, 1994" },
      { src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1000&auto=format&fit=crop", title: "Alpine Vistas", desc: "Digital Medium Format, 2022" },
      { src: "https://images.unsplash.com/photo-1506744626753-eda8182a4a2b?q=80&w=1000&auto=format&fit=crop", title: "Long Exposure", desc: "Nightscape Series, 2019" },
      { src: "https://images.unsplash.com/photo-1554046920-90dcac4b0a70?q=80&w=1000&auto=format&fit=crop", title: "Urban Shadows", desc: "35mm Film, 1994" },
      { src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1000&auto=format&fit=crop", title: "Alpine Vistas", desc: "Digital Medium Format, 2022" },
      { src: "https://images.unsplash.com/photo-1506744626753-eda8182a4a2b?q=80&w=1000&auto=format&fit=crop", title: "Long Exposure", desc: "Nightscape Series, 2019" }
    ] 
  }
];

const premiumEase = [0.16, 1, 0.3, 1];
const fastDuration = 0.5;

// --- MAIN CAROUSEL COMPONENT ---
export default function DesignCarousel() {
  const [activeId, setActiveId] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 300, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const ActiveIcon = hoveredId ? CATEGORIES.find(c => c.id === hoveredId)?.CursorIcon : null;

  return (
    <div className="relative w-screen h-dvh bg-[#050505] overflow-hidden flex flex-col md:flex-row text-white font-sans selection:bg-amber-400/30 md:cursor-none">
      
      {/* CUSTOM CURSOR */}
      <motion.div className="hidden md:block fixed top-0 left-0 pointer-events-none z-9999" style={{ x: cursorXSpring, y: cursorYSpring }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {ActiveIcon ? (
              <motion.div
                key="icon-cursor"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-10 h-10 bg-black/40 rounded-full backdrop-blur-md border border-amber-400/50 shadow-sm"
              >
                <ActiveIcon strokeWidth={1.5} size={18} className="text-amber-400" />
              </motion.div>
            ) : (
              <motion.div
                key="default-cursor"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 bg-white rounded-full mix-blend-difference"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* MAIN ACCORDION */}
      {CATEGORIES.map((cat) => (
        <Panel
          key={cat.id}
          data={cat}
          isActive={activeId === cat.id}
          onClick={() => setActiveId(cat.id)}
          onHoverStart={() => setHoveredId(cat.id)}
          onHoverEnd={() => setHoveredId(null)}
        />
      ))}
    </div>
  );
}

// --- PANEL BLOCK ---
const Panel = ({ data, isActive, onClick, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      onClick={!isActive ? onClick : undefined}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      animate={{ flex: isActive ? 10 : 1 }}
      transition={{ duration: fastDuration, ease: premiumEase }}
      className={`relative w-full md:w-auto h-full border-b md:border-b-0 md:border-r border-white/5 bg-[#050505] group transition-all duration-300 ${
        isActive ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {/* SHARED FADED BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${data.bg})` }}
          animate={{ scale: isActive ? 1 : 1.2 }}
          transition={{ duration: fastDuration, ease: premiumEase }}
        />
      </div>

      {/* --- MOBILE VIEW: CENTERED IMAGE + TEXT BELOW --- */}
      <div className="md:hidden absolute inset-0 w-full h-full overflow-y-hidden overscroll-none flex z-20 transition-opacity duration-300">
        {isActive && data.gallery.map((item, i) => (
          <div key={i} className="relative w-full h-full shrink-0 snap-center flex flex-col items-center justify-center overflow-hidden">
            {/* Background faded text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-10">
              <span className="text-[25vh] font-serif uppercase leading-none whitespace-nowrap text-transparent tracking-tighter" style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)" }}>
                {item.title} —
              </span>
            </div>

            {/* Centered image */}
            <div className="relative z-30 flex flex-col items-center w-[85%] max-w-[380px] -mt-17">
              <div className="relative w-[220px] h-[220px] shadow-[0_30px_60px_rgba(0,0,0,0.9)] bg-[#111] z-20">
                <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover border border-white/10" />
              </div>
              {/* Text below the image */}
              <div className="relative mt-4 z-40 text-center pointer-events-none">
                <h4 className="text-3xl sm:text-5xl font-serif italic font-bold text-white mb-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] leading-none">
                  {item.title}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-2 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  <div className="h-[2px] w-6 bg-amber-400"></div>
                  <p className="text-[8px] font-bold text-white tracking-[2px] uppercase">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW: CIRCULAR GALLERY --- */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-20">
        {isActive && <CircularGallery gallery={data.gallery} />}
      </div>

      {/* GRADIENT OVERLAY */}
      <div className={`absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-1000 pointer-events-none z-40 ${isActive ? 'from-[#050505]/90 via-[#050505]/20' : 'from-[#050505]/80 via-transparent'}`} />

      {/* STATIC UI INDICATORS */}
      <div className="absolute bottom-6 left-4 md:bottom-16 md:left-12 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div className="relative flex flex-col gap-1 md:gap-4">
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
                  className="text-3xl md:text-8xl font-serif italic text-white drop-shadow-xl leading-none"
                >
                  {data.title}
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 0.5, delay: 0.15, ease: premiumEase }}
                  className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2"
                >
                  <motion.span 
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                    className="text-[7px] md:text-[8px] tracking-[2px] uppercase text-amber-400 ml-2"
                  >
                    <span className="md:hidden">Swipe to explore →</span>
                    <span className="hidden md:inline">Scroll to flip ↓</span>
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INACTIVE VERTICAL TEXT */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h3
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-lg md:text-4xl font-serif font-bold tracking-[6px] uppercase text-white/40 whitespace-nowrap md:-rotate-90 origin-center select-none"
          >
            {data.title}
          </motion.h3>
        </div>
      )}
    </motion.div>
  );
};