import React, { useEffect, useRef } from 'react';

interface GalaxyProps {
  className?: string;
}

const Galaxy: React.FC<GalaxyProps> = ({ className = '' }) => {
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

    // Star properties
    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: number;
    }[] = [];

    // Create stars
    const createStars = () => {
      const numStars = Math.floor(canvas.width * canvas.height / 1000);
      
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 + 0.5;
        const hue = Math.random() * 60 + 200; // Blue to purple hues
        const color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.8 + 0.2})`;
        const velocity = Math.random() * 0.05 + 0.02;
        
        stars.push({ x, y, radius, color, velocity });
      }
    };

    createStars();

    // Nebula properties
    const nebulae: {
      x: number;
      y: number;
      radius: number;
      color: string;
    }[] = [];

    // Create nebulae
    const createNebulae = () => {
      const numNebulae = 5;
      
      for (let i = 0; i < numNebulae; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 200 + 100;
        const hue = Math.random() * 60 + 200; // Blue to purple hues
        const color = `hsla(${hue}, 100%, 50%, 0.1)`;
        
        nebulae.push({ x, y, radius, color });
      }
    };

    createNebulae();

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw and update stars
      stars.forEach(star => {
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars slightly
        star.y -= star.velocity;
        
        // Reset stars that go off screen
        if (star.y < -star.radius) {
          star.y = canvas.height + star.radius;
          star.x = Math.random() * canvas.width;
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

export default Galaxy;