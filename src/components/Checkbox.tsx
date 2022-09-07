const Checkbox = ({ children, ...props }) => (
  <label className="inline-flex items-center cursor-pointer" htmlFor={props.id}>
    <input
      className="w-4 h-4 rounded-sm  bg-neutral-600 border-0 focus:outline-none checked:hover:bg-regreen-500/60 checked:bg-regreen-500 hover:checked:bg-reegreen-500 focus:checked:bg-regreen-500 focus:ring-1 focus:ring-regreen-400 focus:ring-offset-2 focus:ring-offset-jet-500"
      type="checkbox"
      {...props}
    />
    {children && <span className="ml-1 text-neutral-300">{children}</span>}
  </label>
);

export default Checkbox;
