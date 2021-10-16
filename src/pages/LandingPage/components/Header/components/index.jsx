import "./hamburger.scss";

const Burger = ({ open, setOpen }) => (
  <button type="button" className="menu" onClick={() => setOpen(!open)}>
    <div className={`${open ? "opened" : ""}`} />
    <div className={`${open ? "opened" : ""}`} />
    <div className={`${open ? "opened" : ""}`} />
  </button>
);

export default Burger;
