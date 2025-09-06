import React, { useEffect, useRef } from 'react';

interface LightRaysProps {
  className?: string;
}

const LightRays: React.FC<LightRaysProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Light ray properties
    const rays: {
      x: number;
      y: number;
      length: number;
      width: number;
      angle: number;
      speed: number;
      color: string;
      alpha: number;
    }[] = [];

    // Create light rays
    const createRays = () => {
      const numRays = 20;
      
      for (let i = 0; i < numRays; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + Math.random() * 200;
        const length = Math.random() * 800 + 400;
        const width = Math.random() * 100 + 50;
        const angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Slight angle variation
        const speed = Math.random() * 0.2 + 0.1;
        const hue = Math.random() * 60 + 200; // Blue to purple hues
        const color = `hsl(${hue}, 100%, 70%)`;
        const alpha = Math.random() * 0.3 + 0.1;
        
        rays.push({ x, y, length, width, angle, speed, color, alpha });
      }
    };

    createRays();

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw rays
      rays.forEach(ray => {
        ctx.save();
        ctx.translate(ray.x, ray.y);
        ctx.rotate(ray.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, -ray.length);
        gradient.addColorStop(0, `${ray.color.replace('hsl', 'hsla').replace(')', `, ${ray.alpha})`)}`); 
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-ray.width / 2, 0);
        ctx.lineTo(ray.width / 2, 0);
        ctx.lineTo(ray.width / 4, -ray.length);
        ctx.lineTo(-ray.width / 4, -ray.length);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Move rays
        ray.y -= ray.speed;
        
        // Reset rays that go off screen
        if (ray.y < -ray.length) {
          ray.y = canvas.height + Math.random() * 200;
          ray.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default LightRays;