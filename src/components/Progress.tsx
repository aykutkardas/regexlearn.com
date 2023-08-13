const toPercent = (current: number, total: number) => Math.round((current / total) * 100);

interface Props {
  current: number;
  total: number;
  showProgressText?: boolean;
}

const Progress = ({ current, total, showProgressText = true }: Props) => (
  <div className="w-36 flex items-center flex-col justify-start select-none relative">
    <div className="w-full max-w-[200px] h-[2px] rounded-sm bg-neutral-600">
      <div
        className="h-[6px] min-w-[6px] rounded-full bg-regreen-400 relative bottom-[2px] transition-all duration-300 max-w-full"
        style={{ width: `${toPercent(current, total)}%` }}
      />
    </div>
    {showProgressText && (
      <div className="text-sm font-bold w-full mt-2 absolute text-center text-neutral-400">
        {`${current} / ${total}`}
      </div>
    )}
  </div>
);

export default Progress;
