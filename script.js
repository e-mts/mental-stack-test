// Array of possible colors
const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

// Function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to get a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const totalTrials = 10; // Increase the number of trials for longer test duration
let currentTrial = 0;
const reactionTimes = [];

const targetColor = getRandomElement(colors);
const messageDiv = document.getElementById("message");

messageDiv.textContent = `Click when you see ${targetColor}`;

function displayResults() {
    const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    messageDiv.textContent = `Average reaction time: ${averageTime.toFixed(2)} ms`;
}

function startTrial() {
    let targetShown = false;
    const maxFlashCount = getRandomInt(10, 20); // Randomize the number of flashes per trial
    let flashCount = 0;
    const minInterval = 200; // Minimum interval between flashes in ms
    const maxInterval = 1000; // Maximum interval between flashes in ms

    const intervalId = setInterval(() => {
        if (flashCount >= maxFlashCount || (targetShown && (flashCount > maxFlashCount / 2))) {
            clearInterval(intervalId);
            if (!targetShown) {
                startTrial(); // Restart the trial if the target color didn't show
            }
            return;
        }

        const randomColor = getRandomElement(colors);
        document.body.style.backgroundColor = randomColor;

        if (randomColor === targetColor) {
            targetShown = true;
            const startTime = new Date().getTime();
            document.body.onclick = () => {
                const endTime = new Date().getTime();
                const reactionTime = endTime - startTime;
                reactionTimes.push(reactionTime);

                clearInterval(intervalId);
                document.body.onclick = null;
                document.body.style.backgroundColor = '';

                currentTrial++;
                if (currentTrial < totalTrials) {
                    messageDiv.textContent = `Trial ${currentTrial + 1} of ${totalTrials}. Get ready...`;
                    setTimeout(startTrial, 2000);
                } else {
                    displayResults();
                }
            };
        } else {
            document.body.onclick = null;
        }

        flashCount++;
        clearInterval(intervalId);
        setTimeout(startTrial, getRandomInt(minInterval, maxInterval)); // Randomize the interval before next flash
    }, getRandomInt(minInterval, maxInterval));
}

// Start the game after displaying the initial instructions
setTimeout(() => {
    messageDiv.textContent = `Trial 1 of ${totalTrials}. Get ready...`;
    setTimeout(startTrial, 2000);
}, 3000);
