import { Updatable } from "./ObserverListener";
import { Drawable, Movement, Particle } from "./utils";

import { tick } from "./canvasAnimation";
import { enemyCollection } from "../../main";

export class EnemyMovement extends Movement {
   // df: number = 0;

   constructor(speedX: number, speedY: number) {
      super(speedX, speedY);
   }

   move(particle: Particle) {
      // particle.x += (this.accX * tick * tick) >> 1;
      // particle.y += (this.accY * tick * tick) >> 1;
      // console.group(`Color: ${particle.color}`);
      // console.log(`(accX: ${this.accX}, accY: ${this.accY})`);
      // console.log(`(x: ${particle.x},y: ${particle.y})`);
      // console.groupEnd();
      particle.x += this.speedX;
      particle.y += this.speedY;
   }

   hasHitWall(particle: Particle, canvas: HTMLCanvasElement) {
      // if (particle.x < 0) {
      //    console.log('outside')
      //    particle.x = 0;
      // }
      return enemyCollection.enemies[enemyCollection.enemies.length - 1].x + enemyCollection.enemies[enemyCollection.enemies.length - 1].w > canvas.width || enemyCollection.enemies[0].x < 0
   }

   reverseDirection() {
      // particle.x += this.df;
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
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
      this.movement.move(this);
      if (this.movement.hasHitWall(this, canvas)) {
         this.movement.reverseDirection();
      }
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

export class EnemyCollection {
   enemies: Enemy[];


   constructor(count: number, movement: EnemyMovement) {
      this.enemies = [];
      this.initEnemies(count, movement);
   }

   initEnemies(count: number, movement: EnemyMovement) {
      const colors = ['red', 'blue', 'green', 'yellow', 'pink']
      for (let i = 0; i < count; i++) {
         this.enemies.push(Enemy.create({
            x: 20 + 60 * i,
            y: 20,
            h: 40,
            w: 40,
            color: colors[i],
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