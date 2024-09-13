let targetColor = 'red';
let otherColors = ['blue', 'green', 'yellow'];
let testRunning = false;
let startTime, reactionTimes = [], falsePositives = 0;

function startTest() {
  let targetDiv = document.getElementById('target');
  targetDiv.textContent = '';
  testRunning = true;
  document.getElementById('startButton').style.display = 'none';
  setTimeout(() => showRandomColor(), Math.random() * 2000 + 1000);
}

function showRandomColor() {
  if (!testRunning) return;
  
  let color = Math.random() < 0.3 ? targetColor : otherColors[Math.floor(Math.random() * otherColors.length)];
  let targetDiv = document.getElementById('target');
  targetDiv.style.backgroundColor = color;
  
  startTime = new Date();
  setTimeout(() => {
    targetDiv.style.backgroundColor = 'white'; // Reset color
    if (testRunning) setTimeout(showRandomColor, 500);
  }, 1000);
}

document.body.onkeypress = (e) => {
  if (e.code === 'Space') {
    if (!testRunning) {
      startTest();
    } else {
      recordReaction();
    }
  }
};

document.body.onclick = () => {
  if (!testRunning) {
    startTest();
  } else {
    recordReaction();
  }
};

function recordReaction() {
  let currentColor = document.getElementById('target').style.backgroundColor;
  let reactionTime = new Date() - startTime;
  
  if (currentColor === targetColor) {
    reactionTimes.push(reactionTime);
  } else {
    falsePositives++;
  }
}

// End the test after a certain period (e.g., 20 seconds)
setTimeout(() => {
  testRunning = false;
  let avgReactionTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
  alert(`Test ended. Average Reaction Time: ${avgReactionTime} ms, False Positives: ${falsePositives}`);
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('target').textContent = 'Press spacebar or click to start';
}, 20000);
