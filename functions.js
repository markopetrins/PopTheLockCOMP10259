/**
 * Marko Petrina, 000906417
 * March 15, 2023
 * This file is used to store various functions dealing with both strings and integers
 */
const startBtn = document.getElementById("startBtn"); //Start button
const rect = document.getElementById("pin"); //Rectangle
const point = document.getElementById("point"); //Point
const score = document.getElementById("updatingScore"); //Updating score
const endGame = document.getElementById("staticEnd"); //Game Over display
const endScore = document.getElementById("updateEnd"); //Final score
const centerX = 200; // half of the canvas width
const centerY = 300; // half of the canvas height
const radius = 90; // radius of the circle
let angle = 0;
let intervalId;

/**
 * Function uses an eventlistener to start rotating the pin upon clicking the start button.
 */
startBtn.addEventListener("click", function() {
  startBtn.style.display = "none"; // hide the button
  score.textContent = '0';
  endGame.textContent = ''; // set initial text content to empty
  endScore.textContent = ''; // set initial text content to empty
  intervalId = setInterval(function() {
     // Calculate the position of the rectangle based on the current angle
    const x = centerX + radius * Math.sin(-angle * Math.PI / 180); 
    const y = centerY + radius * Math.cos(-angle * Math.PI / 180);
     // Set the position of the rectangle
    rect.setAttribute("x", x - rect.getAttribute("width") / 2);
    rect.setAttribute("y", y - rect.getAttribute("height") / 2);
     // Increment the angle
    angle++;
    // If the rectangle has completed a full rotation, reset it to 0
    if (angle >= 360) {
      angle = 0;
    }
  }, 3);
});

/**
 * Function uses an eventlistener to determine if the rectangle was placed on top of the point upon the user pressing the spacebar.
 */
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    // Get the position of the rectangle and the circle
    const rectX = parseInt(rect.getAttribute("x"));
    const rectY = parseInt(rect.getAttribute("y"));
    const pointX = parseInt(point.getAttribute("cx"));
    const pointY = parseInt(point.getAttribute("cy"));
     // Calculate the distance between the rectangle and the circle using the Pythagorean theorem
    const distance = Math.sqrt(Math.pow(pointX - rectX, 2) + Math.pow(pointY - rectY, 2));
    if (distance <= 18) {
      score.textContent = parseInt(score.textContent) + 1;
      const newAngle = Math.random() * 360; // generate a new random angle
      // Calculate the position of the circle based on the new angle
      const newX = centerX + radius * Math.sin(-newAngle * Math.PI / 180);
      const newY = centerY + radius * Math.cos(-newAngle * Math.PI / 180);
      // Set the position of the circle to the new position
      point.setAttribute("cx", newX);
      point.setAttribute("cy", newY);
    } else {
       // If the distance is greater than the radius of the circle, the game is over
      clearInterval(intervalId); // stop the interval
      startBtn.style.display = "inline-block"; // show the start button
      endGame.textContent = "GAME OVER!!"; // set the text content of endGame when the game is over
      endScore.textContent = "Your score was " + score.textContent; // set the text content of endScore when the game is over
    }
  }
});
