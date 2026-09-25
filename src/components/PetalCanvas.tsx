import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  density?: number;
  interactive?: boolean;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ density = 42, interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseSpeedX = (e.clientX - lastMouseX) * 0.15;
      mouseSpeedY = (e.clientY - lastMouseY) * 0.15;
      lastMouseX = mouseX = e.clientX;
      lastMouseY = mouseY = e.clientY;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    class Petal {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      rotation: number = 0;
      rotSpeed: number = 0;
      opacity: number = 0;
      flip: number = 0;
      flipSpeed: number = 0;
      colorVariation: number = 0;

      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -25;
        this.size = 8 + Math.random() * 11;
        this.speedX = -0.8 + Math.random() * 1.8;
        this.speedY = 1.0 + Math.random() * 1.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.025;
        this.opacity = 0.35 + Math.random() * 0.55;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = 0.015 + Math.random() * 0.025;
        this.colorVariation = Math.random();
      }

      update() {
        // Wind sway
        this.x += this.speedX + Math.sin(this.rotation) * 0.6;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;
        this.flip += this.flipSpeed;

        // Interactive mouse wind push
        if (interactive) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 2.5;
            this.x += (dx / dist) * force + mouseSpeedX * 0.2;
            this.y += (dy / dist) * force + mouseSpeedY * 0.2;
          }
        }

        if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(Math.cos(this.flip), 1);
        ctx.globalAlpha = this.opacity;

        // Organic Sakura Petal with notched tip
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size * 0.45, -this.size * 0.5, this.size, -this.size * 0.2, this.size, this.size * 0.4);
        ctx.bezierCurveTo(this.size, this.size, this.size * 0.35, this.size * 1.25, 0, this.size * 1.35);
        ctx.bezierCurveTo(-this.size * 0.35, this.size * 1.25, -this.size, this.size, -this.size, this.size * 0.4);
        ctx.bezierCurveTo(-this.size, -this.size * 0.2, -this.size * 0.45, -this.size * 0.5, 0, 0);

        const grad = ctx.createLinearGradient(0, -this.size * 0.4, 0, this.size * 1.2);
        if (this.colorVariation > 0.6) {
          // Soft pink blush
          grad.addColorStop(0, 'rgba(255, 235, 245, 0.95)');
          grad.addColorStop(1, 'rgba(244, 114, 182, 0.7)');
        } else if (this.colorVariation > 0.3) {
          // Deeper cherry rose
          grad.addColorStop(0, 'rgba(255, 240, 245, 0.98)');
          grad.addColorStop(1, 'rgba(236, 72, 153, 0.75)');
        } else {
          // Warm ivory with faint dawn tint
          grad.addColorStop(0, 'rgba(255, 250, 245, 0.92)');
          grad.addColorStop(1, 'rgba(251, 207, 232, 0.6)');
        }

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    }

    const petals: Petal[] = [];
    for (let i = 0; i < density; i++) {
      petals.push(new Petal(true));
    }

    // Expose global burst trigger
    (window as unknown as { triggerPetalStorm: () => void }).triggerPetalStorm = () => {
      for (let i = 0; i < 35; i++) {
        const p = new Petal();
        p.x = width / 2 + (Math.random() - 0.5) * 300;
        p.y = height / 2 + (Math.random() - 0.5) * 200;
        p.speedX = (Math.random() - 0.5) * 10;
        p.speedY = -3 + Math.random() * 8;
        petals.push(p);
      }
      if (petals.length > density * 2.5) {
        petals.splice(0, 35);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      mouseSpeedX *= 0.92;
      mouseSpeedY *= 0.92;

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [density, interactive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
