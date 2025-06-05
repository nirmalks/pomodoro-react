import { downloadMarkdownLog, getStats } from '../lib/utils';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Stats = () => {
  const { todayMins, yesterdayMins, streak } = getStats();
  return (
    <Card className="flex items-center">
      <div className="p-4 m-6 text-left text-gray-700">
        <p>
          <strong>Today:</strong> {todayMins} min
        </p>
        <p>
          <strong>Yesterday:</strong> {yesterdayMins} min
        </p>
        <p>
          <strong>Streak:</strong> {streak} day{streak !== 1 ? 's' : ''}
        </p>
        <Button
          onClick={downloadMarkdownLog}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-full font-semibold transition-colors"
        >
          Download Logs
        </Button>
      </div>
    </Card>
  );
};

export default Stats;
