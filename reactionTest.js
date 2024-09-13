// Array of possible colors
const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

// Function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Select the message div and the body
const messageDiv = document.getElementById("message");

// Game settings
const totalTrials = 5;
let currentTrial = 0;
const reactionTimes = [];

// Choose a random target color for the user
const targetColor = getRandomElement(colors);
messageDiv.textContent = `Click when you see ${targetColor}`;

function displayResults() {
    const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    messageDiv.textContent = `Average reaction time: ${averageTime.toFixed(2)} ms`;
}

// Function to start a new trial
function startTrial() {
    let flashCount = 0;
    const flashMax = 5;
    const flashInterval = 500; // 500 milliseconds

    const intervalId = setInterval(() => {
        if (flashCount >= flashMax) {
            clearInterval(intervalId);
            messageDiv.textContent = "Game over! You missed it!";
            return;
        }

        const randomColor = getRandomElement(colors);
        document.body.style.backgroundColor = randomColor;

        // If the random color matches the target color, wait for user click
        if (randomColor === targetColor) {
            const startTime = new Date().getTime();
            document.body.onclick = () => {
                const endTime = new Date().getTime();
                const reactionTime = endTime - startTime;
                reactionTimes.push(reactionTime);
                clearInterval(intervalId);
                document.body.onclick = null;

                currentTrial++;
                if (currentTrial < totalTrials) {
                    messageDiv.textContent = `Trial ${currentTrial + 1} of ${totalTrials}. Get ready...`;
                    setTimeout(startTrial, 2000);
                } else {
                    displayResults();
                }
            }
        } else {
            document.body.onclick = null;
        }

        flashCount++;
    }, flashInterval);
}

// Start the first trial after giving the user a moment to read the instruction
setTimeout(() => {
    messageDiv.textContent = `Trial 1 of ${totalTrials}. Get ready...`;
    setTimeout(startTrial, 2000);
}, 3000);
