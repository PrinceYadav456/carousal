import React, { useRef, useEffect, useState } from "react";
/* eslint-disable-next-line no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CircularGallery = ({ gallery }) => {
  const snapTimeout = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // --- Responsive values (unchanged) ---
  const getResponsiveRadius = () => {
    if (window.innerWidth < 480) return 350;
    if (window.innerWidth < 768) return 500;
    if (window.innerWidth < 1024) return 800;
    return 490;
  };

  const getResponsiveItemSize = () => {
    if (window.innerWidth < 480) return 180;
    if (window.innerWidth < 768) return 240;
    if (window.innerWidth < 1024) return 300;
    return 230;
  };

  const getResponsiveCenterOffset = () => {
    if (window.innerWidth < 480) return "-100px";
    if (window.innerWidth < 768) return "-50px";
    if (window.innerWidth < 1024) return "0px";
    return "-500px";
  };

  const getResponsiveVerticalOffset = () => {
    if (window.innerWidth < 480) return "-20px";
    if (window.innerWidth < 768) return "-40px";
    if (window.innerWidth < 1024) return "-60px";
    return "-2px";
  };

  const radius = getResponsiveRadius();
  const itemSize = getResponsiveItemSize();
  const centerOffset = getResponsiveCenterOffset();
  const verticalOffset = getResponsiveVerticalOffset();

  // --- Rotation state ---
  const rawAngle = useMotionValue(0);
  const angle = useSpring(rawAngle, { stiffness: 60, damping: 20 });
  const speedFactor = 0.005;

  const snapToNearest = () => {
    const step = (2 * Math.PI) / gallery.length;
    const current = rawAngle.get();
    const snapped = Math.round(current / step) * step;
    rawAngle.set(snapped);
  };

  // --- Attach/detach events based on desktop mode ---
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // only attach events on desktop

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * speedFactor;
      rawAngle.set(rawAngle.get() + delta);
      clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(snapToNearest, 150);
    };

    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchEndX = e.touches[0].clientX;
      const delta = (touchStartX - touchEndX) * speedFactor * 2;
      rawAngle.set(rawAngle.get() + delta);
      touchStartX = touchEndX;
      clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(snapToNearest, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
    };
  }, [isDesktop, gallery.length]);

  // --- Pre‑compute motion values ---
  const xTransforms = [];
  const yTransforms = [];
  const opacityTransforms = [];

  /* eslint-disable react-hooks/rules-of-hooks */
  for (let i = 0; i < gallery.length; i++) {
    const initialAngle = (i / gallery.length) * 2 * Math.PI;
    xTransforms[i] = useTransform(angle, (a) =>
      radius * Math.cos(initialAngle + a)
    );
    yTransforms[i] = useTransform(angle, (a) =>
      radius * Math.sin(initialAngle + a)
    );
    opacityTransforms[i] = useTransform(angle, (a) => {
      const currentAngle = initialAngle + a;
      return Math.cos(currentAngle) > 0 ? 1 : 0;
    });
  }

  // --- Scroll indicator ---
  const indicatorDotX = useTransform(angle, (a) => 30 * Math.cos(a));
  const indicatorDotY = useTransform(angle, (a) => 30 * Math.sin(a));

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden z-20">
      {/* Fixed wheel container */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-y-1/2"
        style={{
          top: `calc(50% + ${verticalOffset})`,
          left: `calc(50% + ${centerOffset})`,
        }}
      >
        {gallery.map((item, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              x: xTransforms[i],
              y: yTransforms[i],
              opacity: opacityTransforms[i],
              width: itemSize,
              height: itemSize,
            }}
            whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0px 30px 60px rgba(0,0,0,0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl shadow-2xl block"
            />
            {/* Text block – fully transparent background */}
            <div
              className="absolute top-0 left-full -translate-x-1/7 h-full flex flex-col justify-center items-end pr-4 pointer-events-none"
              style={{ width: "auto", minWidth: "200px" }}
            >
              <h4 className="text-white text-2xl md:text-4xl font-serif italic font-bold leading-tight text-right drop-shadow-lg">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-px w-8 bg-amber-400" />
                <p className="text-white/90 text-xs uppercase tracking-wider drop-shadow">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none z-50">
        <div className="w-full h-full border border-white/30 rounded-full relative">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
            style={{ x: indicatorDotX, y: indicatorDotY }}
          />
        </div>
      </div>
    </div>
  );
};

export default CircularGallery;