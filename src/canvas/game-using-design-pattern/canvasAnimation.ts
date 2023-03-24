import { EnemyCollection } from "./Enemy";
import { Listener } from "./ObserverListener";
import { pauseGame } from "../../main";

export let tick = 0;

export default class CanvasAnimation extends Listener {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   enemyCollection: EnemyCollection;
   // tick: number = 0;

   constructor(
      canvas: HTMLCanvasElement,
      enemyCollection: EnemyCollection) {
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
      if (pauseGame === true) {
         return;
      }
      // this.updateTick();
      this.initCanvas();
      this.enemyCollection.drawEnemies(this.ctx);
      this.notify(this.canvas);
      window.requestAnimationFrame(() => this.animation());
   }

   // private updateTick() {
   //    tick += 1;
   //    // this.tick += 1;
   //    // setInterval(() => this.updateTick(), 1000);
   // }

   // public getTick() {
   //    return this.tick;
   // }

   startAnimation() {
      // this.updateTick();
      this.animation();
   }
}