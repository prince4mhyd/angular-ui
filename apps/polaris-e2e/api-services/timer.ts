let startTime;
let endTime;

export function startTimer() {
    startTime = Date.now();
}

export function stopTimer() {
    endTime = Date.now();
}

export function elapsedTime() {
    return endTime - startTime;
}

export const responseTimes = {
    fast: 500,
    medium: 2000,
    slow: 5000,
};
