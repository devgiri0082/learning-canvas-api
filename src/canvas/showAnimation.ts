export default function snowAnimation(canvas: HTMLCanvasElement) {
   var particles: any = [];
   var tick = 0;
   function loop() {
      window.requestAnimationFrame(loop);
      createParticles();
      updateParticles();
      killParticles();
      drawParticles();
   }
   window.requestAnimationFrame(loop);
   function createParticles() {
      //check on every 10th tick check 
      if (tick % 10 == 0) {
         //add particle if fewer than 100 
         if (particles.length < 100) {
            particles.push({
               x: Math.random() * canvas.width, //between 0 and canvas width 
               y: 0,
               speed: 0 + Math.random() * 1, //between 2 and 5 
               radius: 5 + Math.random() * 5, //between 5 and 10 
               color: "white",
            });
         }
      }
   }

   function updateParticles() {
      for (var i in particles) {
         var part = particles[i];
         part.y += part.speed;
      }
   }

   function killParticles() {
      for (var i in particles) {
         var part = particles[i];
         if (part.y > canvas.height) {
            part.y = 0;
         }
      }
   }

   function drawParticles() {
      var c: any = canvas.getContext('2d');
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);
      for (var i in particles) {
         var part = particles[i];
         c.beginPath();
         c.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
         c.closePath();
         c.fillStyle = part.color;
         c.fill();
      }
   }
}
