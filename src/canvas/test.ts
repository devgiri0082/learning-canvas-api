async function setupCanvas(canvas: HTMLCanvasElement) {
   const height = canvas.height;
   const width = canvas.width;
   const rectSize = { width: 150, height: 100 }
   let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

   const grad = ctx.createLinearGradient(100, 200, 400, 300);
   grad.addColorStop(0, 'green');
   grad.addColorStop(0.33, 'red');
   grad.addColorStop(0.66, 'black');
   grad.addColorStop(1, 'blue')

   ctx.fillStyle = grad
   ctx.fillRect(0, 0, 400, 200)

}

function percentToValue(percentage: number, total: number): number {
   return ((percentage / 100) * total);
}

export default setupCanvas