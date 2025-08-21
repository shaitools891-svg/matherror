<style jsx global>{`
    :root {
        --color-1: ${currentTheme.primary || '#3b82f6'};
        --color-2: ${currentTheme.secondary || '#8b5cf6'};
        --color-3: #ffffff;
        --color-4: #f0f9ff;
    }
    
    .dark {
        --color-1: #60a5fa;
        --color-2: #a78bfa;
        --color-3: #f8fafc;
        --color-4: #dbeafe;
    }

    /* Enhanced gooey nav container */
    .gooey-nav-wrapper {
        background: linear-gradient(135deg, ${currentTheme.primary || '#3b82f6'} 0%, ${currentTheme.secondary || '#8b5cf6'} 100%);
        border-radius: 24px;
        padding: 6px;
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        position: relative;
        overflow: hidden;
    }

    .gooey-nav-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(0, 0, 0, 0.05) 100%);
        border-radius: inherit;
        pointer-events: none;
    }

    /* Override ReactBits nav styling for better integration */
    .gooey-nav-wrapper nav {
        background: rgba(255, 255, 255, 0.95) !important;
        border-radius: 18px;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        z-index: 1;
    }

    .dark .gooey-nav-wrapper nav {
        background: rgba(0, 0, 0, 0.8) !important;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Fix for ReactBits GooeyNav - Remove white background on active items */
    .gooey-nav-wrapper .effect.filter {
        filter: blur(8px) contrast(120) blur(0);
        mix-blend-mode: screen;
    }

    .gooey-nav-wrapper .effect.filter::before {
        background: transparent !important;
    }

    /* Remove the white pill background that appears on active items */
    .gooey-nav-wrapper li::after {
        display: none !important;
    }

    .gooey-nav-wrapper li.active::after {
        display: none !important;
    }

    /* Remove the white background from the effect */
    .gooey-nav-wrapper .effect.filter::after {
        display: none !important;
    }

    /* Better text styling */
    .gooey-nav-wrapper li a {
        color: rgba(0, 0, 0, 0.8) !important;
        font-weight: 500;
        text-shadow: none;
        transition: all 0.3s ease;
        position: relative;
        z-index: 2;
    }

    .dark .gooey-nav-wrapper li a {
        color: rgba(255, 255, 255, 0.9) !important;
    }

    .gooey-nav-wrapper li.active a,
    .gooey-nav-wrapper li a:hover {
        color: white !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    /* Custom active indicator instead of the white background */
    .gooey-nav-wrapper li.active {
        position: relative;
    }

    .gooey-nav-wrapper li.active::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 16px);
        height: calc(100% + 8px);
        background: linear-gradient(45deg, var(--color-1), var(--color-2));
        border-radius: 12px;
        z-index: 1;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Ensure particles still work */
    .gooey-nav-wrapper .particle,
    .gooey-nav-wrapper .point {
        z-index: 3;
    }
`}</style>
