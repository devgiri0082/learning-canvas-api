import { tick } from "../main";

export interface Updatable {
   update(canvas: HTMLCanvasElement): void;
}

interface Drawable {
   draw(ctx: CanvasRenderingContext2D): void;
}

interface Particle {
   x: number;
   y: number;
   w: number;
   h: number;
   color: string;
   dead: boolean;
}

abstract class Movement {
   speedX: number;
   speedY: number;

   // acX: number;
   // acY: number;
   constructor(speedX: number, speedY: number) {
      this.speedX = speedX
      this.speedY = speedY;
   }

   // constructor(acX: number, acY: number) {
   //    this.acX = acX;
   //    this.acY = acY;
   // }

   move(particle: Particle) {
      // const tick = animation.getTick();
      particle.x += (this.speedX * tick * tick) >> 1;
      particle.y += (this.speedY * tick * tick) >> 1;

      // particle.x += this.speedX;
      // particle.y += this.speedY;
      // s = ut + 1/2 at^2
      //  where to get tick from 
      //  game should be a static class right ?
   }
}

class EnemyMovement extends Movement {
   constructor(speedX: number, speedY: number) {
      super(speedX, speedY);
   }

   // move(particle: Particle) {
   //    super.move(particle);
   // particle.x += this.speedX;
   // particle.y += this.speedY;
   // }

   hasHitWall(particle: Particle, canvas: HTMLCanvasElement) {
      return particle.x + particle.w > canvas.width || particle.x < 0
   }
   reverseDirection() {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
   }
}


class Listener {
   observer: Updatable[];

   constructor() {
      this.observer = [];
   }

   addObserver(updatable: Updatable) {
      this.observer.push(updatable);
   }

   removeObserver(updatable: Updatable) {
      const index = this.observer.indexOf(updatable);
      this.observer.splice(index, 1);
   }

   notify(canvas: HTMLCanvasElement) {
      this.observer.forEach(observe => {
         observe.update(canvas);
      })
   }


}

class CanvasAnimation extends Listener {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   enemyCollection: EnemyCollection

   constructor(canvas: HTMLCanvasElement, enemyCollection: EnemyCollection) {
      super();
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d')!;
      this.enemyCollection = enemyCollection;
      this.observeEnemy();
   }

   private observeEnemy() {
      this.enemyCollection.enemies.forEach(enemy => this.addObserver(enemy))
   }

   private initCanvas() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.closePath();
   }

   private animation() {
      this.initCanvas();
      this.enemyCollection.drawEnemies(this.ctx);
      this.notify(this.canvas);
      window.requestAnimationFrame(() => this.animation());
   }

   startAnimation() {
      this.animation();
   }
}

class Enemy implements Updatable, Particle, Drawable {
   x: number;
   y: number;
   w: number;
   h: number;
   color: string;
   dead: boolean;
   movement: EnemyMovement

   constructor(props: Particle, movement: EnemyMovement) {
      this.x = props.x;
      this.y = props.y;
      this.w = props.w;
      this.h = props.h;
      this.color = props.color;
      this.dead = props.dead;
      this.movement = movement

   }

   update(canvas: HTMLCanvasElement): void {
      if (this.movement.hasHitWall(this, canvas))
         this.movement.move(this);
   }

   draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.closePath();
   }

   public static create(props: Particle, movement: EnemyMovement) {
      return new Enemy(props, movement);
   }

}

class EnemyCollection {
   enemies: Enemy[];


   constructor(count: number, movement: EnemyMovement) {
      this.enemies = [];
      this.initEnemies(count, movement);
   }

   initEnemies(count: number, movement: EnemyMovement) {
      for (let i = 0; i < count; i++) {
         this.enemies.push(Enemy.create({
            x: 20 + 60 * i,
            y: 20,
            h: 40,
            w: 40,
            color: 'green',
            dead: false,
         }, movement))
      }
   }
   drawEnemies(ctx: CanvasRenderingContext2D) {
      this.enemies.forEach(enemy => {
         enemy.draw(ctx);
      })
   }
}

// export default CanvasAnimation