const Checkbox = ({ children, ...props }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer group" htmlFor={props.id}>
    <input
      className="w-4 h-4 rounded-[5px] bg-white/6 border border-white/15 transition-colors cursor-pointer group-hover:border-white/30 checked:border-transparent checked:bg-regreen-500 checked:hover:bg-regreen-500 focus:checked:bg-regreen-500 focus:ring-2 focus:ring-regreen-400/60 focus:ring-offset-0"
      type="checkbox"
      {...props}
    />
    {children && <span className="text-neutral-300 group-hover:text-white transition-colors">{children}</span>}
  </label>
);

export default Checkbox;
