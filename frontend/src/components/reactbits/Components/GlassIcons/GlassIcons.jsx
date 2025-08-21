import React, { useState, useEffect } from 'react';

const gradientMapping = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const GlassIcons = ({ items, className, onItemClick }) => {
  const [touchedIndex, setTouchedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getBackgroundStyle = (color) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  const handleTouchStart = (index) => {
    setTouchedIndex(index);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTouchedIndex(null), 300);
  };

  const handleClick = (item) => {
    if (onItemClick) {
      onItemClick(item.subjectId || item.id || item.label);
    }
  };

  return (
    <div
      className={`grid gap-4 md:gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-6 md:py-[3em] overflow-visible ${
        className || ""
      }`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          className={`relative bg-transparent outline-none w-20 h-20 md:w-[4.5em] md:h-[4.5em] [perspective:16em] md:[perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group transition-all duration-300 ${
            item.customClass || ""
          } ${touchedIndex === index ? 'mobile-active' : ''}`}
          onClick={() => handleClick(item)}
          onTouchStart={() => handleTouchStart(index)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e) => {
            if (!isMobile) e.currentTarget.classList.add('scale-95');
          }}
          onMouseUp={(e) => {
            if (!isMobile) e.currentTarget.classList.remove('scale-95');
          }}
          onMouseLeave={(e) => {
            if (!isMobile) e.currentTarget.classList.remove('scale-95');
          }}
        >
          {/* Background layer */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-2xl md:rounded-[1.25em] block transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[12deg] md:rotate-[15deg] group-hover:rotate-[20deg] md:group-hover:rotate-[25deg] group-hover:translate-x-[-0.3em] md:group-hover:translate-x-[-0.5em] group-hover:translate-y-[-0.3em] md:group-hover:translate-y-[-0.5em] group-hover:translate-z-[0.3em] md:group-hover:translate-z-[0.5em]"
            style={{
              ...getBackgroundStyle(item.color),
              boxShadow: "0.4em -0.4em 0.6em hsla(223, 10%, 10%, 0.15)",
            }}
          ></span>

          {/* Glass layer */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-2xl md:rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-md md:backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:translate-z-[1.5em] md:group-hover:translate-z-[2em]"
            style={{
              boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <span
              className="m-auto w-8 h-8 md:w-[1.5em] md:h-[1.5em] flex items-center justify-center"
              aria-hidden="true"
            >
              {React.cloneElement(item.icon, {
                className: "w-5 h-5 md:w-6 md:h-6 text-white"
              })}
            </span>
          </span>

          {/* Label */}
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-xs md:text-base opacity-0 transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:translate-y-2 md:group-hover:translate-y-[20%]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
