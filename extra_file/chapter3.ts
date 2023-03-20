

export default function advanceDrawingAndEvents(canvas: HTMLCanvasElement) {
   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
   const src = '/vite.svg'
   const img = new Image();
   img.src = src;
   ctx.beginPath();
   ctx.fillStyle = 'gray'
   ctx.fillRect(0, 0, canvas.width, canvas.height)
   img.onload = () => {
      //creating pattern with repetition in yaxis
      ctx.beginPath();
      const pat1 = ctx.createPattern(img, 'repeat-y') as CanvasPattern;
      ctx.fillStyle = pat1;
      ctx.fillRect(0, 0, 100, 100);
      ctx.closePath();

      //creating patter with repetition in all axis
      ctx.beginPath();
      ctx.globalAlpha = 30 / 100;
      const pat2 = ctx.createPattern(img, 'repeat') as CanvasPattern;
      ctx.moveTo(150, 150);
      ctx.lineTo(250, 250);
      ctx.lineTo(450, 150);
      ctx.closePath()
      ctx.fillStyle = pat2;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.stroke();


      //react with opacity
      ctx.beginPath();
      ctx.globalAlpha = 50 / 100;
      ctx.fillStyle = 'Red';
      ctx.fillRect(280, 280, 40, 40);
      ctx.globalAlpha = 30 / 100;
      ctx.fillRect(300, 300, 40, 40);
      ctx.globalAlpha = 1.0;
      ctx.closePath();


      //save and restore state

      for (let i = 0; i < 5; i++) {
         ctx.beginPath();
         ctx.save();
         ctx.fillStyle = 'Green';
         ctx.translate(30, 120 + i * 60);
         ctx.fillRect(0, 0, 50, 50);
         ctx.restore()
         ctx.closePath();
      }

      // clipping

      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, canvas.width, 150);
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(300, 200);
      ctx.lineTo(250, 100);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.clip();
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, canvas.width, 150);

      ctx.beginPath();
      ctx.save()
      ctx.fillStyle = 'red'
      ctx.rect(50, 50, 100, 100); // Define a rectangular path
      ctx.fill();
      ctx.clip(); // Set the current path as the clipping path
      ctx.beginPath();
      ctx.fillStyle = 'green'
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();
      // ctx.beginPath();
      ctx.fillStyle = 'cyan'
      ctx.moveTo(140, 140);
      ctx.lineTo(180, 140);
      ctx.lineTo(160, 160);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(200, 200, 100, 0, 2 * Math.PI);
      ctx.fillStyle = 'green'
      ctx.fill();
      ctx.strokeStyle = 'blue'
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = 'neon';
      ctx.fillRect(110, 150, 1, 1)


      console.log(ctx.isPointInPath(100, 100), ctx.isPointInPath(110, 150));

   }
}