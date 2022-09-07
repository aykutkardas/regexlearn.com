const sizes = {
  default: { height: 50, width: 217 },
  small: { height: 40, width: 174 },
};

const SupportButton = ({ small }: { small?: boolean }) => (
  <div className="mx-auto mt-4 hover:scale-110 transition">
    <a href="https://www.buymeacoffee.com/aykutkardas" target="_blank" rel="noreferrer">
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style={small ? sizes.small : sizes.default}
      />
    </a>
  </div>
);

export default SupportButton;
