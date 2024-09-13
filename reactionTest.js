let colors = ['red', 'blue', 'green', 'yellow'];
let targetColor;
let testRunning = false;
let startTime, reactionTimes = [], falsePositives = 0;

function initializeTest() {
  document.body.onkeypress = (e) => {
    if (e.code === 'Space') {
      if (!testRunning) {
        startTest();
      } else {
        recordReaction();
      }
    }
  };

  document.getElementById('target').onclick = () => {
    if (!testRunning) {
      startTest();
    } else {
      recordReaction();
    }
  };
}

function startTest() {
  testRunning = true;
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('instructions').textContent = `React to the color: ${targetColor}`;
  document.getElementById('target').textContent = '';
  setTimeout(() => showRandomColor(), getRandomInterval());
}

function showRandomColor() {
  if (!testRunning) return;

  let color = Math.random() < 0.3 ? targetColor : colors[Math.floor(Math.random() * colors.length)];
  let targetDiv = document.getElementById('target');
  targetDiv.style.backgroundColor = color;

  startTime = new Date();
  setTimeout(() => {
    targetDiv.style.backgroundColor = 'white';
    if (testRunning) setTimeout(showRandomColor, getRandomInterval());
  }, 1000);
}

function recordReaction() {
  let currentColor = document.getElementById('target').style.backgroundColor;
  let reactionTime = new Date() - startTime;

  if (currentColor === targetColor) {
    reactionTimes.push(reactionTime);
  } else {
    falsePositives++;
  }
}

function getRandomInterval() {
  return Math.random() * 2000 + 1000;
}

function endTest() {
  testRunning = false;
  let avgReactionTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
  alert(`Test ended. Average Reaction Time: ${avgReactionTime} ms, False Positives: ${falsePositives}`);
  document.getElementById('target').style.backgroundColor = 'white';
  document.getElementById('instructions').textContent = 'Press spacebar or click to start';
  document.getElementById('target').textContent = 'Test ended. Press spacebar or click to restart';
}

// Set a timeout to end the test after a certain period (e.g., 20 seconds)
setTimeout(endTest, 20000);

// Initialize the test when the page loads
initializeTest();
