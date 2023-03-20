function drawPieChart(canvas: HTMLCanvasElement) {
   const data = [100, 68, 20, 30, 100];
   const colors = ["orange", "green", "blue", "yellow", "teal"];
   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
   let startAngle = 0;
   const total = data.reduce((acc, current) => acc + current, 0);
   data.forEach((dataPoint, index) => {
      const x = 250;
      const y = 250;
      const fraction = dataPoint / total;
      const endAngle = startAngle + 2 * Math.PI * fraction;

      ctx.fillStyle = colors[index];

      const gradient = ctx.createRadialGradient(250, 250, 10, 250, 250, 100);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, colors[index])
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, 100, startAngle, endAngle, false);

      ctx.fill()
      ctx.strokeStyle = "blue"
      ctx.stroke();

      startAngle = endAngle

   })

   ctx.beginPath();
   ctx.font = '30px Arial';
   ctx.fillStyle = 'blue';
   const text = "Sales data from 2025";
   const size = ctx.measureText(text);
   console.log(size.width);
   ctx.fillText(text, 250 - size.width / 2, 400);

}

export default drawPieChart;

// [5, 5, 10, 20] => 40;
// [0.125, 0.125, 0.25, 0.5] => 1;
// [0.3925, 0.3925, 0.785, 1.57] => 3.14;
// [2.4649, 2.4649, 4.9298, 9.8596] => 19.7192;