import React, { useState, useEffect, useRef } from 'react';

// GooeyNav Component
const GooeyNav = ({
items,
animationTime = 600,
particleCount = 15,
particleDistances = [90, 10],
particleR = 100,
timeVariance = 300,
colors = [1, 2, 3, 1, 2, 3, 1, 4],
initialActiveIndex = 0,
onItemClick,
getIcon,
getActiveColor,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate:
        rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty(
          "--color",
          `var(--color-${p.color}, white)`
        );
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current)
      return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const isVertical = navRef.current?.classList.contains('flex-col');
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    const liEl = e.currentTarget.parentElement;
    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    // Update active color CSS variable
    if (getActiveColor && containerRef.current) {
      const activeColor = getActiveColor(index);
      containerRef.current.style.setProperty('--active-color', activeColor);
    }

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }


    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    // Call the external click handler
    if (onItemClick) {
      onItemClick(items[index], index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: { parentElement: liEl }, preventDefault: () => {} }, index);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      // Trigger initial animation for the default active item
      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi =
        navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
            --color-1: #3b82f6;
            --color-2: #8b5cf6;
            --color-3: #06b6d4;
            --color-4: #10b981;
          }
          .gooey-effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .gooey-effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
            isolation: isolate;
          }
          .gooey-effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: black;
            opacity: 0;
            pointer-events: none;
          }
          .gooey-effect.filter::after {
            content: "";
            position: absolute;
            inset: 0 0 0 2rem;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
            animation: pill 0.3s ease both, fadeOutGlow 0.5s ease 2s forwards;
          }
          @keyframes fadeOutGlow {
            to {
              opacity: 0;
              transform: scale(0);
            }
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .gooey-nav-item.active {
            color: var(--active-color, black) !important;
            text-shadow: none;
            font-weight: 600 !important;
          }
          .gooey-nav-item.active svg {
            color: var(--active-color, black) !important;
          }
          .gooey-nav-item svg {
            color: white;
            transition: color 0.3s ease;
          }
          .gooey-nav-item.active::after {
            opacity: 1;
            transform: scale(1);
            animation: fadeOut 0.5s ease 2s forwards;
          }
          @keyframes fadeOut {
            to {
              opacity: 0;
              transform: scale(0);
            }
          }
          .gooey-nav-item::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            border: 2px solid rgba(255, 255, 255, 0.8);
            background: transparent;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          .gooey-nav-vertical .gooey-nav-item {
            margin-bottom: 4px;
            width: 100%;
          }
          .gooey-nav-vertical .gooey-nav-item:last-child {
            margin-bottom: 0;
          }
          .gooey-nav-vertical .gooey-nav-item a {
            display: block;
            width: 100%;
            text-align: left;
          }
        `}
      </style>
      <div className="relative overflow-hidden" ref={containerRef}>
        <nav
          className="flex relative gooey-nav-vertical"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="flex flex-col gap-2 list-none p-0 m-0 relative z-[3]"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`gooey-nav-item rounded-lg relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${activeIndex === index ? "active" : ""}`}
              >
                <a
                  onClick={(e) => handleClick(e, index)}
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none py-2 px-3 inline-block text-sm font-medium hover:text-white transition-colors block w-full text-left flex items-center gap-2"
                >
                  {getIcon && item.icon && getIcon(item.icon, "w-4 h-4")}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="gooey-effect filter" ref={filterRef} />
      </div>
    </>
  );
};

export default GooeyNav;
