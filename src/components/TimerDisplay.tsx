import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const formatRemainingTime = (remainingTime: number) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds} sec${seconds !== 1 ? 's' : ''}`);

  return parts.join(' ');
};

interface TimerDisplayProps {
  duration: number;
  isPlaying: boolean;
  onComplete: () => void;
  timerKey: number;
}
const TimerDisplay = ({
  duration,
  timerKey,
  isPlaying,
  onComplete,
}: TimerDisplayProps) => {
  return (
    <div>
      <div>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          key={timerKey}
          duration={duration}
          size={300}
          strokeWidth={12}
          colors={['#3B82F6', '#8B5CF6', '#EF4444', '#DC2626']}
          colorsTime={[duration, duration * 0.66, duration * 0.33, 0]}
          onComplete={() => {
            onComplete();
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <div className="text-2xl">{formatRemainingTime(remainingTime)}</div>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default TimerDisplay;
