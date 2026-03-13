import React, { useEffect, useRef } from 'react';

interface InkDropTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const InkDropTransition: React.FC<InkDropTransitionProps> = ({
  isActive,
  onComplete,
  duration = 2000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    startTimeRef.current = Date.now();

    // Watercolor palette
    const colors = [
      'rgba(14, 58, 91, 0.15)',   // Teal - darker
      'rgba(233, 75, 102, 0.12)',  // Coral
      'rgba(245, 210, 128, 0.1)',  // Golden
      'rgba(6, 214, 160, 0.12)',   // Emerald
      'rgba(47, 128, 237, 0.1)',   // Blue
    ];

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      // Phase 1: Ink drop falls (0-0.3)
      if (progress < 0.3) {
        const dropProgress = progress / 0.3;
        const dropY = centerY * 0.2 + dropProgress * centerY * 0.3;
        const dropSize = 8 + dropProgress * 4;
        const dropOpacity = 1 - dropProgress * 0.3;

        ctx.fillStyle = `rgba(14, 58, 91, ${dropOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(centerX, dropY, dropSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Phase 2: Ink spreads and bleeds (0.3-1.0)
      if (progress >= 0.3) {
        const spreadProgress = (progress - 0.3) / 0.7;

        // Main ink blob spreads
        const maxRadius = Math.max(canvas.width, canvas.height) / (2 * window.devicePixelRatio);
        const currentRadius = maxRadius * spreadProgress;

        // Multiple layers of spreading watercolor
        for (let layer = 0; layer < 4; layer++) {
          const layerDelay = layer * 0.15;
          const layerProgress = Math.max(0, Math.min(1, (spreadProgress - layerDelay) / (1 - layerDelay)));

          if (layerProgress > 0) {
            const radius = currentRadius * layerProgress;
            const opacity = (1 - layerProgress) * 0.4;
            const colorIndex = (layer + Math.floor(spreadProgress * 5)) % colors.length;

            // Organic blob shape using multiple circles
            ctx.fillStyle = colors[colorIndex].replace('0.', `${opacity}.`);

            // Create organic spreading pattern
            const numPoints = 12 + layer * 3;
            for (let i = 0; i < numPoints; i++) {
              const angle = (Math.PI * 2 * i) / numPoints;
              const variation = 0.3 + Math.sin(angle * 3 + spreadProgress * Math.PI) * 0.2;
              const x = centerX + Math.cos(angle) * radius * variation;
              const y = centerY + Math.sin(angle) * radius * variation;
              const size = (8 - layer * 1.5) * (1 - layerProgress * 0.5);

              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Watercolor splatter effect
        const splatterCount = Math.floor(spreadProgress * 30);
        for (let i = 0; i < splatterCount; i++) {
          const angle = (Math.PI * 2 * i) / Math.max(1, splatterCount);
          const distance = currentRadius * (0.7 + Math.random() * 0.3);
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const splatSize = 2 + Math.random() * 4;
          const splatOpacity = (1 - spreadProgress) * 0.3;
          const colorIdx = Math.floor(Math.random() * colors.length);

          ctx.fillStyle = colors[colorIdx].replace('0.', `${splatOpacity}.`);
          ctx.beginPath();
          ctx.arc(x, y, splatSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, duration, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default InkDropTransition;
