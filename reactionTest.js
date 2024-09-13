let colors = ['red', 'blue', 'green', 'yellow'];
let targetColor;
let testRunning = false;
let startTime, reactionTimes = [], falsePositives = 0;
let testDuration = 20000; // Test duration in milliseconds

document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners once the DOM is fully loaded
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
});

function startTest() {
    testRunning = true;
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('instructions').textContent = `React to the color: ${targetColor}`;
    document.getElementById('target').textContent = '';
    
    // Reset values
    reactionTimes = [];
    falsePositives = 0;

    // Start the color display loop
    setTimeout(() => showRandomColor(), getRandomInterval());

    // Set a timeout to end the test after the specified duration
    setTimeout(endTest, testDuration);
}

function showRandomColor() {
    if (!testRunning) return;

    let color = Math.random() < 0.3 ? targetColor : colors[Math.floor(Math.random() * colors.length)];
    let targetDiv = document.getElementById('target');
    targetDiv.style.backgroundColor = color;

    startTime = new Date();
    setTimeout(() => {
        targetDiv.style.backgroundColor = 'white'; // Reset color
        if (testRunning) setTimeout(showRandomColor, getRandomInterval());
    }, 1000);
}

function recordReaction() {
    if (!testRunning) return;

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
    let avgReactionTime = reactionTimes.length === 0 ? 0 : reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    alert(`Test ended. Average Reaction Time: ${avgReactionTime.toFixed(2)} ms, False Positives: ${falsePositives}`);
    document.getElementById('target').style.backgroundColor = 'white';
    document.getElementById('instructions').textContent = 'Press spacebar or click to start';
    document.getElementById('target').textContent = 'Test ended. Press spacebar or click to restart';
}
