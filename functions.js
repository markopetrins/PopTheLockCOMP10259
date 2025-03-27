const startBtn = document.getElementById("startBtn");
const startButtonContainer = document.getElementById("startButtonContainer");
const rect = document.getElementById("pin");
const point = document.getElementById("point");
const score = document.getElementById("updatingScore");
const endGame = document.getElementById("staticEnd");
const endScore = document.getElementById("updateEnd");
const controls = document.getElementById("controls");
const centerX = 200;
const centerY = 300;
const radius = 90;
let angle = 0;
let intervalId;
let gameSpeed = 3;
let highScore = localStorage.getItem('highScore') || 0;
let isGameRunning = false;
let clockwise = true; // true for clockwise, false for counter-clockwise

// Display high score
const highScoreDisplay = document.createElement('text');
highScoreDisplay.setAttribute('x', '130');
highScoreDisplay.setAttribute('y', '90');
highScoreDisplay.setAttribute('class', 'staticScore');
highScoreDisplay.textContent = `High Score: ${highScore}`;
document.querySelector('svg').appendChild(highScoreDisplay);

/**
 * Function to start the game
 */
function startGame() {
    if (isGameRunning) return;
    
    startButtonContainer.style.display = "none";
    score.textContent = '0';
    endGame.textContent = '';
    endScore.textContent = '';
    controls.textContent = 'Press Spacebar to Pop!';
    isGameRunning = true;
    gameSpeed = 3;
    clockwise = true; // Reset direction
    
    intervalId = setInterval(function() {
        const x = centerX + radius * Math.sin(-angle * Math.PI / 180);
        const y = centerY + radius * Math.cos(-angle * Math.PI / 180);
        
        rect.setAttribute("x", x - rect.getAttribute("width") / 2);
        rect.setAttribute("y", y - rect.getAttribute("height") / 2);
        
        if (clockwise) {
            angle++;
        } else {
            angle--;
        }
        
        if (angle >= 360) {
            angle = 0;
        } else if (angle < 0) {
            angle = 359;
        }
    }, gameSpeed);
}

/**
 * Function to handle game over
 */
function gameOver() {
    clearInterval(intervalId);
    isGameRunning = false;
    startButtonContainer.style.display = "block";
    endGame.textContent = "GAME OVER!";
    endScore.textContent = `Your score: ${score.textContent}`;
    
    // Update high score
    const currentScore = parseInt(score.textContent);
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
    
    // Add some visual feedback
    point.style.fill = '#ff6b6b';
    setTimeout(() => {
        point.style.fill = 'yellow';
    }, 500);
}

/**
 * Function to handle successful pop
 */
function successfulPop() {
    const currentScore = parseInt(score.textContent);
    score.textContent = currentScore + 1;
    
    // Increase game speed every 5 points
    if (currentScore % 5 === 0) {
        gameSpeed = Math.max(1, gameSpeed - 0.5);
    }
    
    // Change direction
    clockwise = !clockwise;
    
    // Update interval with new speed and direction
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        const x = centerX + radius * Math.sin(-angle * Math.PI / 180);
        const y = centerY + radius * Math.cos(-angle * Math.PI / 180);
        
        rect.setAttribute("x", x - rect.getAttribute("width") / 2);
        rect.setAttribute("y", y - rect.getAttribute("height") / 2);
        
        if (clockwise) {
            angle++;
        } else {
            angle--;
        }
        
        if (angle >= 360) {
            angle = 0;
        } else if (angle < 0) {
            angle = 359;
        }
    }, gameSpeed);
    
    // Generate new point position
    const newAngle = Math.random() * 360;
    const newX = centerX + radius * Math.sin(-newAngle * Math.PI / 180);
    const newY = centerY + radius * Math.cos(-newAngle * Math.PI / 180);
    
    // Add visual feedback
    point.style.fill = '#4ecdc4';
    setTimeout(() => {
        point.style.fill = 'yellow';
        point.setAttribute("cx", newX);
        point.setAttribute("cy", newY);
    }, 100);
}

// Event Listeners
startButtonContainer.addEventListener("click", startGame);

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && isGameRunning) {
        const rectX = parseInt(rect.getAttribute("x"));
        const rectY = parseInt(rect.getAttribute("y"));
        const pointX = parseInt(point.getAttribute("cx"));
        const pointY = parseInt(point.getAttribute("cy"));
        
        const distance = Math.sqrt(Math.pow(pointX - rectX, 2) + Math.pow(pointY - rectY, 2));
        
        if (distance <= 25) {
            successfulPop();
        } else {
            gameOver();
        }
    }
});
