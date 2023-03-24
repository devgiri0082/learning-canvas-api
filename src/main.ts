import CanvasAnimation from './canvas/game-using-design-pattern/canvasAnimation';
import { EnemyCollection, EnemyMovement } from './canvas/game-using-design-pattern/Enemy';

// import CanvasAnimation from './canvas/game';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */`
    <h1 class="title">Learning canvas API</h1>
    <canvas id="canvas" height='490' width='490'></canvas>
    <div class='start'>
    <button class="button" >Pause/Play</button>
    <div class="state">T</div>
    </div>
`


const pausePlay = document.querySelector("button");

export let pauseGame = true;


export const enemyCollection = new EnemyCollection(5, new EnemyMovement(5, 0));
export const animation = new CanvasAnimation(
   document.querySelector("#canvas") as HTMLCanvasElement,
   enemyCollection
);

pausePlay?.addEventListener('click', () => {
   pauseGame = !pauseGame;
   document.querySelector(".state")!.innerHTML = `${pauseGame ? 'T' : 'F'}`
   if (pauseGame === false) {
      animation.startAnimation();
   }

})

