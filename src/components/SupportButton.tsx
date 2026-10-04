import Icon from 'src/components/Icon';

const SupportButton = () => (
  <a
    href="https://www.buymeacoffee.com/aykutkardas"
    target="_blank"
    rel="noreferrer"
    aria-label="Buy Me a Coffee"
    title="Buy Me a Coffee"
    className="fixed bottom-5 ltr:right-5 rtl:left-5 z-30 hidden sm:inline-flex group"
  >
    <span className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-linear-to-tr/srgb from-yellow-600 to-yellow-400 text-ink-950 shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-300/40 transition-transform group-hover:scale-110 group-hover:-rotate-6">
      <Icon icon="coffee" size={22} />
    </span>
  </a>
);

export default SupportButton;
