import { useLanguageDirection } from 'src/utils/useLanguageDirection';

const toPercent = (current: number, total: number) => Math.round((current / total) * 100);

interface Props {
  current: number;
  total: number;
  showProgressText?: boolean;
}

const Progress = ({ current, total, showProgressText = true }: Props) => {
  const direction = useLanguageDirection();
  const progressText = direction === 'rtl' ? `${total} / ${current}` : `${current} / ${total}`;
  const percent = toPercent(current, total);

  return (
    <div className="w-36 sm:w-48 flex items-center flex-col justify-start gap-2 select-none">
      <div
        className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          className="h-full min-w-[6px] rounded-full bg-gradient-to-r from-emerald-500 to-regreen-400 shadow-[0_0_12px_rgb(95_245_155/0.5)] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showProgressText && (
        <div className="text-[11px] font-mono font-medium text-neutral-500 tracking-wider">
          {progressText}
        </div>
      )}
    </div>
  );
};

export default Progress;
