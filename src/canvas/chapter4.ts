export default function animation(canvas: HTMLCanvasElement) {
   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

   // // Clear a rectangular area around the circle
   // ctx.clearRect(0, 0, 10, 10);

   // // Redraw any objects that were previously covered by the cleared area
   // ctx.beginPath();
   // ctx.arc(100, 100, 50, 0, 2 * Math.PI);
   // ctx.fillStyle = 'blue';
   // ctx.fill();
   window.requestAnimationFrame(() => drawIt(canvas, 0, true))
}

function drawIt(canvas: HTMLCanvasElement, x: number, animationRunning: boolean) {
   if (!animationRunning) return;
   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
   if (x >= 490 - 10) {
      animationRunning = false;
   }
   window.requestAnimationFrame(() => drawIt(canvas, x + 5, animationRunning));
   ctx.beginPath();
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   // ctx.translate(0, 5);
   // ctx.fillRect(50, x, 100, 100)
   ctx.fillStyle = 'green';
   ctx.arc(100, x, 10, 0, 2 * Math.PI);
   ctx.fill();
}