import { useState } from 'react';
import { Card } from './ui/card';
import TimerDisplay from './TimerDisplay';
import DurationInput from './DurationInput';
import { formatDate } from '../lib/utils';
import Stats from './Stats';
import { Button } from './ui/button';

const Timer = () => {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const duration = durationMinutes * 60;
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const handleReset = () => {
    setTimerKey((prev) => prev + 1);
    setIsPlaying(false);
    setCompleted(true);
    setHasStarted(false);
  };

  const handleStart = () => {
    setHasStarted(true);
    setTimerKey((prev) => prev + 1);
    setIsPlaying(true);
    setCompleted(false);
  };

  const getButtonText = () => {
    if (completed) return 'Start Again';
    if (!hasStarted) return 'Start';
    return isPlaying ? 'Pause' : 'Resume';
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      let value = parseInt(e.target.value, 10);
      if (isNaN(value)) return;
      if (value < 30) value = 30;
      if (value > 120) value = 120;
      setDurationMinutes(value);
    }
  };

  const logPomodoro = () => {
    const today = formatDate(new Date());
    const prev = JSON.parse(localStorage.getItem('pomodoro-log') || '{}');
    const updated = {
      ...prev,
      [today]: [...(prev[today] || []), durationMinutes],
    };
    localStorage.setItem('pomodoro-log', JSON.stringify(updated));
  };
  const onComplete = () => {
    setIsPlaying(false);
    setCompleted(true);
    setHasStarted(false);
    logPomodoro();
    return { shouldRepeat: false };
  };

  const onPause = () => {
    setIsPlaying(false);
  };
  return (
    <>
      <div className="text-center p-4">
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          Pomodoro Timer
        </h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col w-full justify-between md:flex-row">
            {hasStarted ? (
              ''
            ) : (
              <div className="md:flex-1">
                <DurationInput
                  duration={durationMinutes}
                  onChange={handleDurationChange}
                />
              </div>
            )}
            <div className="md:flex-1">
              <Card className="p-12 mt-6 mb-6 md:m-6">
                <TimerDisplay
                  onComplete={onComplete}
                  timerKey={timerKey}
                  duration={duration}
                  isPlaying={isPlaying}
                ></TimerDisplay>
                <div className="mt-6 flex gap-4 justify-center">
                  {isPlaying ? (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                      onClick={onPause}
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                      onClick={handleStart}
                    >
                      {getButtonText()}
                    </Button>
                  )}
                  <div className="flex gap-4 justify-center">
                    <Button
                      className="px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <Stats></Stats>
        </div>
      </div>
    </>
  );
};

export default Timer;
