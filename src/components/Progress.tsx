const toPercent = (current: number, total: number) => Math.round((current / total) * 100);

interface Props {
  current: number;
  total: number;
  showProgressText?: boolean;
}

const Progress = ({ current, total, showProgressText = true }: Props) => (
  <div className="tw-w-36 tw-flex tw-items-center tw-flex-col tw-justify-start tw-select-none tw-relative">
    <div className="tw-w-full tw-max-w-[200px] tw-h-[2px] tw-rounded-sm tw-bg-neutral-600">
      <div
        className="tw-h-[6px] tw-min-w-[6px] tw-rounded-full tw-bg-green-400 tw-relative tw-bottom-[2px] tw-transition-all tw-duration-300 tw-max-w-full"
        style={{ width: `${toPercent(current, total)}%` }}
      />
    </div>
    {showProgressText && (
      <div className="tw-text-sm tw-font-bold tw-w-full tw-mt-2 tw-absolute tw-text-center tw-text-neutral-400">
        {`${current} / ${total}`}
      </div>
    )}
  </div>
);

export default Progress;
