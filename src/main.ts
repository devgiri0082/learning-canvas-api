import './style.css'
import setupCanvas from './canvas/test'
import drawBarChart from './canvas/barchat'
import drawPieChart from './canvas/piechart'
import advanceDrawingAndEvents from './canvas/chapter3'
import animation from './canvas/chapter4'
import drawBall from './canvas/ball'
import snowAnimation from './canvas/showAnimation'
import CanvasAnimation from './canvas/game'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */`
    <h1 class="title">Learning canvas API</h1>
    <canvas id="canvas" height='490' width='490'></canvas>
`

const animation = new CanvasAnimation(document.querySelector("#canvas") as HTMLCanvasElement);
animation.startAnimation();
