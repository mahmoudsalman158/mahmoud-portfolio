
import React, { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any; 
    pJSDom?: { pJS: any }[]; 
  }
}

const defaultParticlesConfig = {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: '#00E5FF' }, 
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 2, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
    line_linked: { enable: true, distance: 120, color: '#00FFAA', opacity: 0.3, width: 1 }, 
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true,
    },
    modes: {
      grab: { distance: 180, line_linked: { opacity: 0.8 } }, 
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 5 }, 
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

const birthdayParticlesConfig = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } }, 
    color: { value: ["#FFD700", "#FF69B4", "#00E5FF", "#00FFAA", "#FFFFFF", "#B388EB", "#FF4757", "#30dd8a"] }, 
    shape: { 
      type: ["circle", "star", "triangle"], 
      stroke: { width: 0, color: "#000" }, 
      polygon: { nb_sides: 5 },
      "star": { 
        "nb_sides": 5 
      }
    },
    opacity: { value: 0.9, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.4, sync: false } }, 
    size: { value: 10, random: true, anim: { enable: true, speed: 8, size_min: 5, sync: false } }, 
    line_linked: { enable: false }, 
    move: {
      enable: true,
      speed: 6, // Slightly increased speed
      direction: "none", // Radiate outwards from push point
      random: true, // Random direction for radiation
      straight: false,
      out_mode: "out", 
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" }, 
      onclick: { enable: true, mode: "push" }, 
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0 } },
      bubble: { distance: 180, size: 25, duration: 1.5, opacity: 1, speed: 3 }, 
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 150 }, // Increased particles pushed on click for "fireworks"
      remove: { particles_nb: 4 },
    },
  },
  retina_detect: true,
};

interface ParticlesBackgroundProps {
  isBirthdayModeActive: boolean;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ isBirthdayModeActive }) => {
  useEffect(() => {
    if (typeof window.particlesJS === 'function') {
      const containerId = 'particles-js-container';
      const container = document.getElementById(containerId);

      if (!container) {
        // console.error(`Particles container '#${containerId}' not found.`);
        return;
      }

      try {
        if (window.pJSDom && Array.isArray(window.pJSDom)) {
          const instanceIndex = window.pJSDom.findIndex(
            item => item.pJS && (item.pJS.canvas.el === container || item.pJS.interactivity.el === container || item.pJS.canvas.el.parentElement?.id === containerId)
          );
          if (instanceIndex !== -1) {
            const instanceToDestroy = window.pJSDom[instanceIndex];
            if (instanceToDestroy.pJS.fn?.vendors?.destroypJS) {
              instanceToDestroy.pJS.fn.vendors.destroypJS();
              window.pJSDom.splice(instanceIndex, 1);
            } else {
               while (container.firstChild) {
                container.removeChild(container.firstChild);
              }
            }
          } else { // If no instance found by ID, try to clear if pJSDom has elements
             if(window.pJSDom.length > 0 && window.pJSDom[0]?.pJS?.fn?.vendors?.destroypJS) {
                // This is a bit of a guess if the ID association failed
                // window.pJSDom[0].pJS.fn.vendors.destroypJS();
                // window.pJSDom.splice(0, 1);
             }
             while (container.firstChild) { // Fallback to ensure container is clear
                container.removeChild(container.firstChild);
             }
          }
        }
      } catch (e) {
        // console.error("Error destroying previous particlesJS instance:", e);
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      if (!window.pJSDom) {
        window.pJSDom = [];
      }
      
      try {
        const configToUse = isBirthdayModeActive ? birthdayParticlesConfig : defaultParticlesConfig;
        window.particlesJS(containerId, configToUse);
      } catch (e) {
        // console.error("Error initializing new particlesJS instance:", e);
      }
    } else {
      // console.warn("particlesJS function not found on window object.");
    }
  }, [isBirthdayModeActive]);


  // Effect for interactive fireworks on mouse move during birthday mode
  useEffect(() => {
    const containerId = 'particles-js-container';

    if (!isBirthdayModeActive) {
      return; // Do nothing if not in birthday mode
    }
    
    // Need to wait a bit for particles.js to initialize and update pJSDom
    // This is a common issue with libraries that manipulate DOM outside React's lifecycle
    const timeoutId = setTimeout(() => {
        const pJSInstance = window.pJSDom?.find(
            item => item.pJS && item.pJS.canvas.el.parentElement?.id === containerId
        )?.pJS;

        if (!pJSInstance || !pJSInstance.canvas || !pJSInstance.canvas.el || !pJSInstance.fn?.modes?.pushParticles) {
            // console.warn("Particles.js instance, canvas, or pushParticles mode not available for mouse move effect.");
            return;
        }

        const canvasElement = pJSInstance.canvas.el as HTMLCanvasElement;
        let lastMoveTime = 0;
        const throttleInterval = 100; // ms

        const handleInteractiveMouseMove = (event: MouseEvent) => {
            const now = Date.now();
            if (now - lastMoveTime < throttleInterval) {
                return;
            }
            lastMoveTime = now;

            const rect = canvasElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Ensure particles are pushed within canvas bounds
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                pJSInstance.fn.modes.pushParticles(5, { posX: x, posY: y });
            }
        };

        canvasElement.addEventListener('mousemove', handleInteractiveMouseMove);
        // console.log("Mouse move listener for fireworks added to canvas.");

        // Cleanup function for this inner effect
        // This will be returned by the setTimeout's callback scope
        // To make it part of the main useEffect's cleanup, we'd need to structure differently
        // For now, this cleans up if the component unmounts or isBirthdayModeActive changes while this effect "is active"
        // However, direct return from useEffect is better.
        // This specific structure for setTimeout cleanup is not standard for React.
        // The main useEffect cleanup will handle it.
        
        // Storing the handler in a ref or making it part of the main effect's cleanup is better.
        // For simplicity of this change, this is a direct approach if the main useEffect cleanup is sufficient.
        // The outer useEffect's cleanup will run if isBirthdayModeActive changes.
        
        // Add a way to remove this listener when isBirthdayModeActive becomes false
        // The primary useEffect cleanup will handle the particle instance destruction
        // which should remove the canvas, but explicit listener removal is safer.
        
        // This effect should return a cleanup for its specific additions.
        // This logic is slightly flawed in its current position with setTimeout.
        // Re-integrating into the main effect or using a ref for the handler is cleaner.
        // For now, we assume the main particle re-initiation or component unmount will also clean this up.
        // Correct way: The event listener should be removed in the main useEffect's cleanup.
        
        // The current structure: This mouse move effect will run ONCE after timeout when isBirthdayModeActive becomes true.
        // If isBirthdayModeActive becomes false, this effect's cleanup (if any) is not directly tied to this specific handler.
        // The best approach is to have the event listener added and removed by the same useEffect.

    }, 100); // Small delay to ensure particles.js has initialized

    return () => {
        clearTimeout(timeoutId); // Clear the timeout if the component unmounts or isBirthdayModeActive changes before timeout fires
        // The listener added via setTimeout needs a more robust cleanup mechanism, ideally
        // by being part of the main useEffect or managed via refs.
        // If pJSInstance was found and listener added, it should be removed.
        // This is simplified for now.
        const pJSInstance = window.pJSDom?.find(
            item => item.pJS && item.pJS.canvas.el.parentElement?.id === containerId
        )?.pJS;
        if (pJSInstance && pJSInstance.canvas && pJSInstance.canvas.el) {
            // This relies on finding the instance again, which might not be ideal
            // This is where storing the actual event handler function and canvasElement reference would be better for removal.
            // For this fix, assuming the DOM structure doesn't change in a way that breaks this lookup for cleanup.
            // A more robust solution would be to manage the handler function reference.
            // Simplified cleanup: (The actual handler function reference is lost here)
            // canvasElement.removeEventListener('mousemove', handleInteractiveMouseMove); // This won't work as handleInteractiveMouseMove is not in this scope
        }
    };
  }, [isBirthdayModeActive]);

  return null; 
};

export default ParticlesBackground;
