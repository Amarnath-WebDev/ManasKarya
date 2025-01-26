import React, { useState, useEffect, useCallback } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // "work" or "break"
  const [customTime, setCustomTime] = useState({ work: 25, break: 5 });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);

  const switchMode = useCallback(() => {
    if (mode === "work") {
      setMode("break");
      setTimeLeft(customTime.break * 60);
    } else {
      setMode("work");
      setTimeLeft(customTime.work * 60);
    }
  }, [mode, customTime]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            playSound();
            setShowAlert(true);
            switchMode();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, switchMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const playSound = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-09.wav");
    audio.play();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(customTime.work * 60);
    setShowAlert(false);
  };

  const saveCustomTime = () => {
    setTimeLeft(customTime.work * 60);
    setMode("work");
    setIsRunning(false);
  };

  const handleCustomTimeChange = (e) => {
    const { name, value } = e.target;
    setCustomTime((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDateTime = () => {
    return currentDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="font-sans bg-gray-100 h-screen flex flex-col items-center justify-center text-center">
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Times Up!</h2>
            <p className="text-gray-600 mt-2">Take a break or get back to work!</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-gray-900">Pomodoro Timer</h1>
        <p className="text-sm text-gray-600 mt-2">{formatDateTime()}</p>

        <div className="mt-6 text-gray-700">
          <p className="text-xl font-semibold">
            {mode === "work" ? "Focus Time!" : "Break Time!"}
          </p>
          <p className="text-6xl font-bold mt-4">{formatTime(timeLeft)}</p>
        </div>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 text-gray-700">
          <h2 className="text-lg font-bold">Set Custom Times</h2>
          <div className="flex justify-between items-center mt-4 space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="work" className="text-gray-600">Work (minutes)</label>
              <input
                type="number"
                id="work"
                name="work"
                min="1"
                value={customTime.work}
                onChange={handleCustomTimeChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="break" className="text-gray-600">Break (minutes)</label>
              <input
                type="number"
                id="break"
                name="break"
                min="1"
                value={customTime.break}
                onChange={handleCustomTimeChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={saveCustomTime}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Custom Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
