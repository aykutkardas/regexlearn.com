const Checkbox = ({ children, ...props }) => (
  <label className="inline-flex items-center cursor-pointer" htmlFor={props.id}>
    <input
      className="appearance-none text-green-300 checked:bg-green-400 focus:outline-0 focus:ring-0 focus:border-0 rounded-sm"
      type="checkbox"
      {...props}
    />
    {children && <span className="ml-1 dark:text-neutral-300">{children}</span>}
  </label>
);

export default Checkbox;
