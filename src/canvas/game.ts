type Particle = {
   x: number,
   y: number,
   height: number,
   width: number,
   color: string,
   dead: boolean;

}

class CanvasAnimation {
   private canvas: HTMLCanvasElement;
   private ctx: CanvasRenderingContext2D;
   private enemies: Particle[] = [];
   private enemyBullets: Particle[] = [];
   private playerBullets: Particle[] = [];
   private player: Particle | null = null;
   private bulletSpeed: number = 1;
   private tick: number = 100;
   private enemySpeed: number = 3;
   private gameWon: boolean = false;


   constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d')!;
      this.initEnemy(5);
      this.initPlayer();
      this.addListener();
   }

   private initPlayer() {
      this.player = {
         x: 20,
         y: this.canvas.height - 40 - 20,
         color: 'blue',
         height: 20,
         width: 20,
         dead: false
      }
   }


   private addListener() {
      window.addEventListener('keydown', (e) => {
         if (!this.player) return;
         if (e.key === 'ArrowLeft') {
            if (this.player.x <= 0) this.player.x = 0;
            else this.player.x = this.player.x - 10;
         } else if (e.key === 'ArrowRight') {
            if (this.player.x + this.player.width >= this.canvas.width) this.player.x = this.canvas.width - this.player.width
            else this.player.x = this.player.x + 10;
         } else if (e.code == "Space") {
            if (this.player.dead === true || this.gameWon === true) {
               this.resetGame();
               this.startAnimation();
            } else {
               this.playerBullets.push({
                  x: this.player.x + this.player.width / 2,
                  y: this.player.y - 10,
                  color: 'red',
                  height: 10,
                  width: 2,
                  dead: false
               })
            }
         }
      })
   }

   checkPlayerEnemyBulletIntersection() {
      if (!this.player) return;
      if (this.tick % 3 !== 0) return;
      for (const bullet of this.enemyBullets) {
         if (this.player.y <= bullet.y && this.player.y + this.player.height >= bullet.y && this.player.x <= bullet.x && this.player.x + this.player.width >= bullet.x) {
            this.player.dead = true;
         }
      }
   }

   private initCanvas() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }

   private drawRect(rect: Particle) {
      this.ctx.beginPath();
      this.ctx.fillStyle = rect.color;
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
   }

   private drawAllRect(rects: Particle[]) {
      rects.forEach((rect: Particle) => {
         if (!rect.dead) this.drawRect(rect)
      })
   }
   private updateEnemy() {
      this.enemies.forEach((enemy) => {
         enemy.x += this.enemySpeed;
      })
   }
   private updateEnemyBullet() {
      const newEnemyBullet: Particle[] = [];
      this.enemyBullets.forEach((bullet) => {
         bullet.y += this.bulletSpeed;
         if (bullet.y < this.canvas.height) {
            newEnemyBullet.push(bullet);
         }
      })
      this.enemyBullets = newEnemyBullet;
   }
   private updatePlayerBullet() {
      const newPlayerBullet: Particle[] = [];
      this.playerBullets.forEach((bullet) => {
         bullet.y -= this.bulletSpeed;
         if (bullet.y > 0 - bullet.height) {
            newPlayerBullet.push(bullet);
         }
      })
      this.playerBullets = newPlayerBullet;
   }
   private checkEnemyBoundary() {
      if (this.enemies[this.enemies.length - 1].x + this.enemies[this.enemies.length - 1].width > this.canvas.width || this.enemies[0].x < 0) {
         this.enemySpeed = -this.enemySpeed;
      }
   }
   private initEnemy(num: number) {
      for (let i = 0; i < num; i++) {
         this.enemies.push({
            x: 60 * i + 20,
            y: 20,
            height: 40,
            width: 40,
            color: 'green',
            dead: false
         })

      }
   }

   private addEnemyBullets() {
      if (this.tick % 100 === 0) {
         this.enemies.forEach((enemy) => {
            if (!enemy.dead) {
               this.enemyBullets.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height,
                  color: 'yellow',
                  height: 10,
                  width: 2,
                  dead: false
               })
               this.enemyBullets.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height + 20,
                  color: 'yellow',
                  height: 10,
                  width: 2,
                  dead: false
               })
            }

         })
      }
   }

   private endScreen() {
      this.ctx.beginPath();
      this.initCanvas();
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "white";
      const text = "Game Over, press space to play again";
      const textMetrics = this.ctx.measureText(text);
      this.ctx.fillText(text, (this.canvas.width - textMetrics.width) / 2, this.canvas.height / 2);
   }

   private winScreen() {
      this.ctx.beginPath();
      this.initCanvas();
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "white";
      const text = "Game Won, press space to play again";
      const textMetrics = this.ctx.measureText(text);
      this.ctx.fillText(text, (this.canvas.width - textMetrics.width) / 2, this.canvas.height / 2);
   }

   private resetGame() {
      this.gameWon = false;
      this.enemyBullets = [];
      this.playerBullets = [];
      this.enemies = [];
      this.tick = 100
      this.initEnemy(5);
      this.initPlayer();
   }

   private checkPlayerBulletEnemyIntersection() {
      for (const enemy of this.enemies) {
         if (enemy.dead) continue;
         for (const playerBullet of this.playerBullets) {
            if (playerBullet.dead) continue;
            if (enemy.y <= playerBullet.y && enemy.y + enemy.height >= playerBullet.y && enemy.x <= playerBullet.x && enemy.x + enemy.width >= playerBullet.x) {
               enemy.dead = true;
               playerBullet.dead = true;
            }
         }
      }
   }

   private checkGameOver() {
      let gameWonLocal = true;
      for (const enemy of this.enemies) {
         if (!enemy.dead) gameWonLocal = false;
      }
      this.gameWon = gameWonLocal;
   }



   startAnimation() {
      if (this.player?.dead) {
         this.endScreen()
         return;
      }
      if (this.gameWon) {
         this.winScreen();
         return;
      }
      this.initCanvas();
      this.drawAllRect(this.enemies);
      this.updateEnemy();
      this.checkEnemyBoundary();
      this.addEnemyBullets();
      this.drawAllRect(this.enemyBullets);
      this.updateEnemyBullet();
      this.tick++;
      this.drawRect(this.player!)
      this.drawAllRect(this.playerBullets);
      this.updatePlayerBullet();
      this.checkPlayerEnemyBulletIntersection();
      this.checkPlayerBulletEnemyIntersection();
      this.checkGameOver();
      window.requestAnimationFrame(() => this.startAnimation())
   }

}


export default CanvasAnimation