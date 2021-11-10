const Shortcut = ({ command }) => {
  const readableCommand = command
    .replace(/\+/g, " + ")
    .replace(/right/g, ">")
    .replace(/left/g, "<")
    .toUpperCase();

  return <div className="shortcut">{readableCommand}</div>;
};

export default Shortcut;
