import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface ForestSceneProps {
  width?: number;
  height?: number;
}

export default function ForestScene({ width = 1600, height = 900 }: ForestSceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create PixiJS app
    const app = new PIXI.Application();
    appRef.current = app;

    (async () => {
      // Initialize with container size if available
      const container = canvasRef.current!;
      const rect = container.getBoundingClientRect();
      const initW = rect.width || width;
      const initH = rect.height || height;
      await app.init({
        width: initW,
        height: initH,
        backgroundColor: 0x87ceeb,
        antialias: true,
      });

      container.appendChild(app.canvas as HTMLCanvasElement);
      // Ensure the canvas matches container visually and ignores events
      (app.canvas as HTMLCanvasElement).style.width = '100%';
      (app.canvas as HTMLCanvasElement).style.height = '100%';
      (app.canvas as HTMLCanvasElement).style.display = 'block';
      (app.canvas as HTMLCanvasElement).style.pointerEvents = 'none';

      // Sky gradient
      const skyGradient = new PIXI.Graphics();
      skyGradient.rect(0, 0, 1600, 900);
      skyGradient.fill({ color: 0x87ceeb });
      app.stage.addChild(skyGradient);

      // Sun with glow
      const sun = new PIXI.Graphics();
      sun.circle(1200, 180, 50);
      sun.fill({ color: 0xfffacd });
      sun.filters = [new PIXI.BlurFilter(8)];
      app.stage.addChild(sun);

      // Distant mountains
      const mountains = new PIXI.Graphics();
      mountains.moveTo(0, 480);
      mountains.bezierCurveTo(400, 380, 800, 420, 1200, 460);
      mountains.lineTo(1600, 400);
      mountains.lineTo(1600, 900);
      mountains.lineTo(0, height);
      mountains.fill({ color: 0xa7d8de, alpha: 0.4 });
      mountains.filters = [new PIXI.BlurFilter(2)];
      app.stage.addChild(mountains);

      // Trees (circles with gradient)
      const treesContainer = new PIXI.Container();
      const treePositions = [
        { x: 120, y: 580, r: 70 },
        { x: 240, y: 590, r: 80 },
        { x: 380, y: 575, r: 75 },
        { x: 540, y: 585, r: 85 },
        { x: 720, y: 580, r: 70 },
        { x: 900, y: 590, r: 90 },
        { x: 1100, y: 575, r: 80 },
        { x: 1300, y: 585, r: 75 },
        { x: 1480, y: 580, r: 85 },
      ];

      treePositions.forEach((tree) => {
        const treeGraphic = new PIXI.Graphics();
        treeGraphic.circle(tree.x, tree.y, tree.r);
        treeGraphic.fill({ color: 0x34a853, alpha: 0.75 });
        treesContainer.addChild(treeGraphic);
      });
      app.stage.addChild(treesContainer);

      // Water with animated ripples
      const water = new PIXI.Graphics();
      water.rect(0, 640, 1600, 140);
      water.fill({ color: 0x4a90e2, alpha: 0.85 });
      app.stage.addChild(water);

      // Animated ripples
      const ripples: PIXI.Graphics[] = [];
      const rippleData = [
        { x: 400, y: 690, maxRadius: 160 },
        { x: 900, y: 710, maxRadius: 200 },
        { x: 1300, y: 700, maxRadius: 170 },
      ];

      rippleData.forEach((data, i) => {
        const ripple = new PIXI.Graphics();
        ripple.ellipse(data.x, data.y, 140, 12);
        ripple.stroke({ color: 0xffffff, width: 2, alpha: 0.3 });
        app.stage.addChild(ripple);
        ripples.push(ripple);

        // Animate ripple
        let radius = 140;
        let growing = true;
        app.ticker.add(() => {
          if (growing) {
            radius += 0.3;
            if (radius >= data.maxRadius) growing = false;
          } else {
            radius -= 0.3;
            if (radius <= 140) growing = true;
          }
          ripple.clear();
          ripple.ellipse(data.x, data.y, radius, 12 + (radius - 140) / 10);
          ripple.stroke({ color: 0xffffff, width: 2, alpha: 0.3 });
        });
      });

      // Fountain spray (animated)
      const fountain = new PIXI.Graphics();
      let fountainScale = 1;
      let fountainGrowing = true;
      
      const drawFountain = (scale: number) => {
        fountain.clear();
        fountain.moveTo(800, 640);
        fountain.bezierCurveTo(790, 640 - 100 * scale, 790, 640 - 100 * scale, 800, 640 - 100 * scale);
        fountain.bezierCurveTo(810, 640 - 100 * scale, 810, 640 - 100 * scale, 800, 640);
        fountain.fill({ color: 0xffffff, alpha: 0.7 });
      };

      drawFountain(fountainScale);
      fountain.filters = [new PIXI.BlurFilter(4)];
      app.stage.addChild(fountain);

      app.ticker.add(() => {
        if (fountainGrowing) {
          fountainScale += 0.005;
          if (fountainScale >= 1.15) fountainGrowing = false;
        } else {
          fountainScale -= 0.005;
          if (fountainScale <= 1) fountainGrowing = true;
        }
        drawFountain(fountainScale);
      });

      // Foreground grass
      const grass = new PIXI.Graphics();
      grass.moveTo(0, 740);
      grass.bezierCurveTo(300, 720, 600, 760, 900, 740);
      grass.bezierCurveTo(1200, 720, 1400, 780, 1600, 760);
      grass.lineTo(1600, 900);
      grass.lineTo(0, height);
      grass.fill({ color: 0x2d7a3e, alpha: 0.9 });
      app.stage.addChild(grass);

      // Particles (floating leaves/dust)
      const particlesContainer = new PIXI.Container();
      app.stage.addChild(particlesContainer);

      for (let i = 0; i < 20; i++) {
        const particle = new PIXI.Graphics();
        particle.circle(0, 0, 2);
        particle.fill({ color: 0xffffff, alpha: 0.6 });
        particle.x = Math.random() * 1600;
        particle.y = Math.random() * 900;
        particlesContainer.addChild(particle);

        const speed = 0.2 + Math.random() * 0.5;
        const drift = (Math.random() - 0.5) * 0.3;

        app.ticker.add(() => {
          particle.y += speed;
          particle.x += drift;
          particle.alpha = 0.3 + Math.sin(Date.now() / 1000 + i) * 0.3;

          if (particle.y > 900) {
            particle.y = 0;
            particle.x = Math.random() * 1600;
          }
        });
      }

      // Responsive resize: scale stage to cover container
      const BASE_W = 1600;
      const BASE_H = 900;
      const resize = () => {
        const r = container.getBoundingClientRect();
        const w = Math.max(1, r.width);
        const h = Math.max(1, r.height);
        app.renderer.resize(w, h);
        const scale = Math.max(w / BASE_W, h / BASE_H);
        app.stage.scale.set(scale);
        app.stage.x = (w - BASE_W * scale) / 2;
        app.stage.y = (h - BASE_H * scale) / 2;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);
      window.addEventListener('resize', resize);

    })();

    return () => {
      const app = appRef.current;
      if (app) {
        app.destroy(true, { children: true });
      }
    };
  }, [width, height]);

  return <div ref={canvasRef} className="w-full h-full" style={{ position: 'relative' }} />;
}
