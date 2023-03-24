export interface Drawable {
   draw(ctx: CanvasRenderingContext2D): void;
}

export interface Particle {
   x: number;
   y: number;
   w: number;
   h: number;
   color: string;
   dead: boolean;
}



export abstract class Movement {
   speedX: number;
   speedY: number;

   constructor(speedX: number, speedY: number) {
      this.speedX = speedX
      this.speedY = speedY;
   }

   move(particle: Particle) {
      // particle.x += this.accX;
      // particle.y += this.accY;
   }
}