import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function for shake detection (browser/mobile)
export const detectShake = (callback: () => void, threshold = 15) => {
  let lastX = 0;
  let lastY = 0;
  let lastZ = 0;
  let lastUpdate = 0;

  const handleMotion = (event: DeviceMotionEvent) => {
    const current = Date.now();
    if ((current - lastUpdate) > 100) {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      
      const deltaX = Math.abs(lastX - (acceleration.x || 0));
      const deltaY = Math.abs(lastY - (acceleration.y || 0));
      const deltaZ = Math.abs(lastZ - (acceleration.z || 0));

      if ((deltaX > threshold && deltaY > threshold) || 
          (deltaX > threshold && deltaZ > threshold) || 
          (deltaY > threshold && deltaZ > threshold)) {
        callback();
      }
      
      lastX = acceleration.x || 0;
      lastY = acceleration.y || 0;
      lastZ = acceleration.z || 0;
      lastUpdate = current;
    }
  };

  return {
    start: () => window.addEventListener('devicemotion', handleMotion),
    stop: () => window.removeEventListener('devicemotion', handleMotion)
  };
};

// Function for mouse/cursor position tracking
export const trackMousePosition = (element: HTMLElement, callback: (x: number, y: number) => void) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    callback(x, y);
  };

  return {
    start: () => element.addEventListener('mousemove', handleMouseMove),
    stop: () => element.removeEventListener('mousemove', handleMouseMove)
  };
};

// Function for keypress detection
export const detectKeyPress = (key: string, callback: () => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === key.toLowerCase()) {
      callback();
    }
  };

  return {
    start: () => window.addEventListener('keydown', handleKeyDown),
    stop: () => window.removeEventListener('keydown', handleKeyDown)
  };
};