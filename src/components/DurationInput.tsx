import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

type DurationInputProps = {
  duration: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DurationInput = ({ duration, onChange }: DurationInputProps) => {
  return (
    <Card className="p-12 mt-6 mb-6 w-64">
      <CardHeader>
        <CardTitle>Duration</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <input
            type="number"
            min={30}
            max={120}
            step={15}
            onChange={onChange}
            value={duration}
            className="border p-2 w-full rounded"
          ></input>
        </p>
      </CardContent>
    </Card>
  );
};

export default DurationInput;
