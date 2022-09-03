const Checkbox = ({ children, ...props }) => (
  <label className="tw-inline-flex tw-items-center tw-cursor-pointer" htmlFor={props.id}>
    <input
      className="appearance-none tw-text-green-300 checked:tw-bg-green-400 focus:tw-outline-0 focus:tw-ring-0 focus:tw-border-0 tw-rounded-sm"
      type="checkbox"
      {...props}
    />
    {children && <span className="tw-ml-1 dark:tw-text-neutral-300">{children}</span>}
  </label>
);

export default Checkbox;
