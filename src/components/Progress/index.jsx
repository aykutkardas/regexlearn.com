import { Line } from "rc-progress";

const Progress = ({ steps, step }) => {
  const percent = (step / steps.length) * 100;
  return (
    <div className="progress">
      <Line
        percent={percent}
        strokeWidth="4"
        strokeColor="#5ff59b"
        trailColor="#5b5b5b"
      />
      <div className="progress-status">{`${step} / ${steps.length - 1}`}</div>
    </div>
  );
};

export default Progress;
