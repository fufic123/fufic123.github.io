document.addEventListener("DOMContentLoaded", () => {
    const timeDisplay = document.getElementById("time-display");
    const heartRateDisplay = document.querySelector("#heart-rate span");
    const stepsDisplay = document.querySelector("#steps span");
    const motionDisplay = document.querySelector("#motion span");
  
    let steps = 0;
    let heartRate = 80;
    let motion = "Idle";
    let stepInterval = 3000;
    let lastStepTime = Date.now();
    let speedChangeInterval = 10000;
    let lastSpeedChangeTime = Date.now();
  
    function updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
  
    function updateSteps() {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastStepTime;
  
      if (currentTime - lastSpeedChangeTime >= speedChangeInterval) {
        stepInterval = Math.floor(Math.random() * 2500) + 500;
        lastSpeedChangeTime = currentTime;
      }
  
      if (timeDiff > stepInterval) {
        steps += Math.floor(Math.random() * 5) + 1;
        lastStepTime = currentTime;
  
        if (stepInterval < 1000) {
          motion = "Running";
          heartRate = Math.min(160, heartRate + 5);
        } else if (stepInterval < 2000) {
          motion = "Walking";
          heartRate = Math.min(120, heartRate + 2);
        } else {
          motion = "Idle";
          heartRate = Math.max(80, heartRate - 2);
        }
  
        stepsDisplay.textContent = steps;
        motionDisplay.textContent = motion;
        heartRateDisplay.textContent = heartRate;
  
        stepsDisplay.parentElement.classList.add("pulse");
        setTimeout(() => stepsDisplay.parentElement.classList.remove("pulse"), 500);
  
        if (motion !== "Idle") {
          heartRateDisplay.parentElement.classList.add("blink");
          setTimeout(() => heartRateDisplay.parentElement.classList.remove("blink"), 1500);
        }
      }
    }
  
    setInterval(() => {
      updateTime();
      updateSteps();
    }, 500);
  
    updateTime();
    updateSteps();
  });
  