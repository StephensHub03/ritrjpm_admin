import { useEffect, useState, useRef } from 'react';
import { resolveLocalScrapedImage } from '../utils/localScrapedImages';

interface OrbitImagesProps {
  images: string[];
  shape?: 'circle' | 'ellipse';
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  responsive?: boolean;
  radius?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  showPath?: boolean;
  paused?: boolean;
}

export default function OrbitImages({
  images,
  shape = 'ellipse',
  radiusX = 480,
  radiusY = 160,
  rotation = -8,
  duration = 30,
  itemSize = 160,
  responsive = true,
  radius = 240,
  direction = 'normal',
  fill = false,
  showPath = true,
  paused = false,
}: OrbitImagesProps) {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const angleOffsetRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive scaling factor
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!responsive) {
      setScale(1);
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const targetRadiusX = shape === 'ellipse' ? radiusX : radius;
      const safetyPadding = 60;
      const maxOrbitWidth = targetRadiusX * 2 + itemSize + safetyPadding;
      
      if (width < maxOrbitWidth) {
        setScale(Math.max(0.4, width / maxOrbitWidth));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, radiusX, radius, itemSize, shape]);

  // Dimensions based on shape and scaling
  const effectiveRadiusX = (shape === 'ellipse' ? radiusX : radius) * scale;
  const effectiveRadiusY = (shape === 'ellipse' ? radiusY : radius) * scale;
  const effectiveItemSize = itemSize * scale;

  const rotRad = (rotation * Math.PI) / 180;

  // GPU-Accelerated Animation Loop (Bypasses React re-renders)
  useEffect(() => {
    if (paused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      previousTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        const speed = (2 * Math.PI) / duration;
        const directionMultiplier = direction === 'reverse' ? -1 : 1;
        angleOffsetRef.current = (angleOffsetRef.current + directionMultiplier * speed * deltaTime) % (2 * Math.PI);
      }
      previousTimeRef.current = time;

      // Direct DOM update using translate3d for GPU acceleration
      images.forEach((_, index) => {
        const item = itemRefs.current[index];
        if (item) {
          const totalItems = images.length;
          const baseAngle = (index * 2 * Math.PI) / totalItems;
          const currentAngle = baseAngle + angleOffsetRef.current;

          // Ellipse coordinate calculation
          const x = effectiveRadiusX * Math.cos(currentAngle);
          const y = effectiveRadiusY * Math.sin(currentAngle);

          // Path rotation
          const rx = x * Math.cos(rotRad) - y * Math.sin(rotRad);
          const ry = x * Math.sin(rotRad) + y * Math.cos(rotRad);

          // Apply GPU accelerated transform
          item.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
          // Dynamic depth z-index sorting
          item.style.zIndex = `${Math.round(y) + 300}`;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [paused, duration, direction, effectiveRadiusX, effectiveRadiusY, rotRad, images.length]);

  return (
    <div
      className="orbit-container"
      style={{
        position: 'relative',
        width: '100%',
        height: `${effectiveRadiusY * 2 + 60}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        margin: '40px 0',
      }}
    >
      {/* Centered SVG Path */}
      {showPath && (
        <svg
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            width: `${effectiveRadiusX * 2}px`,
            height: `${effectiveRadiusY * 2}px`,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          {shape === 'ellipse' ? (
            <ellipse
              cx={effectiveRadiusX}
              cy={effectiveRadiusY}
              rx={effectiveRadiusX}
              ry={effectiveRadiusY}
              fill={fill ? 'rgba(6, 24, 70, 0.02)' : 'none'}
              stroke="rgba(6, 24, 70, 0.15)"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
          ) : (
            <circle
              cx={effectiveRadiusX}
              cy={effectiveRadiusX}
              r={effectiveRadiusX}
              fill={fill ? 'rgba(6, 24, 70, 0.02)' : 'none'}
              stroke="rgba(6, 24, 70, 0.15)"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
          )}
        </svg>
      )}

      {/* Orbiting Items Wrapper */}
      {images.map((imgUrl, index) => {
        const resolvedSrc = resolveLocalScrapedImage(imgUrl);

        return (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: `${effectiveItemSize}px`,
              height: `${effectiveItemSize}px`,
              marginLeft: `-${effectiveItemSize / 2}px`,
              marginTop: `-${effectiveItemSize / 2}px`,
              willChange: 'transform',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Inner hoverable item */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: '0 10px 24px rgba(6, 24, 70, 0.18)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.boxShadow = '0 15px 32px rgba(6, 24, 70, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(6, 24, 70, 0.18)';
              }}
            >
              <img
                src={resolvedSrc || undefined}
                alt={`Orbiting student ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: (resolvedSrc && resolvedSrc.toLowerCase().includes('robo')) ? 'left center' : 'center',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
