import Icon from 'src/components/Icon';

const SupportButton = ({ small }: { small?: boolean }) => (
  <div className="fixed bottom-5 right-5 hidden sm:flex flex-col space-y-2">
    <a
      href="https://github.com/sponsors/aykutkardas"
      target="_blank"
      rel="noreferrer"
      aria-label="Sponsor Me"
      title="Sponsor Me"
    >
      <div className="w-10 h-10 cursor-pointer hover:scale-110 transition inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shadow-xl">
        <Icon icon="hearth" size={24} />
      </div>
    </a>
    <a
      href="https://www.buymeacoffee.com/aykutkardas"
      target="_blank"
      rel="noreferrer"
      aria-label="Buy Me a Coffee"
      title="Buy Me a Coffee"
    >
      <div className="w-10 h-10 cursor-pointer hover:scale-110 transition inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-500 shadow-xl">
        <Icon icon="coffee" size={24} />
      </div>
    </a>
  </div>
);

export default SupportButton;
