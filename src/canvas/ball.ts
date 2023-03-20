export default function drawBall(canvas: HTMLCanvasElement) {
   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

   // Ball properties
   const ballRadius = 20;
   let ballX = canvas.width / 2;
   let ballY = ballRadius;
   let ballVelocity = 0; // Pixels per second
   const gravity = 1; // Pixels per second squared
   const floorLevel = canvas.height - ballRadius;

   // Draw the ball at its current position
   function draw(x: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(100, x, ballRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
   }

   // Update the ball's position and velocity
   function update(time: number) {
      const delta = time / 1000; // Convert time to seconds
      ballVelocity += gravity * delta; // Apply gravity
      ballY += ballVelocity * delta; // Move the ball
      if (ballY >= floorLevel) {
         ballY = floorLevel; // Stop the ball at the floor
         ballVelocity = 0; // Reset the velocity
      }
   }

   // Animate the ball
   function animate(time: number) {
      // update(time);
      let x = 0;
      draw(x);
      x = x + 5;
      window.requestAnimationFrame(animate);
   }

   // Start the animation
   window.requestAnimationFrame(animate);
}
