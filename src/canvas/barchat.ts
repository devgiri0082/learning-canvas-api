function drawBarChart(canvas: HTMLCanvasElement) {
   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
   const data = [16, 68, 20, 30, 54];
   ctx.beginPath();
   ctx.fillStyle = 'white'
   ctx.fillRect(0, 0, canvas.width, canvas.width);

   //drawing the bar chart
   data.forEach((height, index) => {
      //position to draw from
      const x = index * 100 + 25;
      const y = 490 - height * 5 - 30;

      //drawing each bar 
      ctx.beginPath();
      ctx.fillStyle = 'skyblue';
      ctx.fillRect(x, y, 50, height * 5);
   });

   //drawing the axis
   ctx.beginPath();

   //drawing x axis
   ctx.moveTo(25, 490 - 30);
   ctx.lineTo(490, 490 - 30);

   //drawing y axis
   ctx.closePath();
   ctx.lineTo(25, 0);

   //styling axis
   ctx.strokeStyle = 'Black';
   ctx.lineWidth = 2;
   ctx.stroke();

   //drawing x axis label

   const xlables = ['Jan', 'Feb', "March", "April", 'May'];

   xlables.forEach((lable, index) => {
      const x = index * 100 + 25 + 50 / 2;
      const y = 490 - 30;

      ctx.beginPath();

      ctx.fillStyle = 'black';
      ctx.font = '12px Arial'

      ctx.fillText(lable, x, y + 20);
      ctx.beginPath();

      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 5);
      // this is done to get the path at the beginning
      ctx.closePath();
      ctx.lineTo(x, y + 5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "Green";
      ctx.stroke();

   })

   //drawing y axis label
   const ylable = new Array(11).fill(0);
   ylable.forEach((_, index) => {
      const x = 25;
      const y = 490 - (46 * (index + 1)) + 16;
      const value = 46 * index;
      ctx.font = "12px Arial"
      ctx.fillText(String(value), x - 25, y + 10);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 5, y);
      // this is done to get the path at the beginning
      ctx.closePath();
      ctx.lineTo(x + 5, y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "Green";
      ctx.stroke();
   })
}

export default drawBarChart