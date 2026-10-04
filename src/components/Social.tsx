import Icon from 'src/components/Icon';

const socialLinkClassName =
  'w-8 h-8 inline-flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/6 transition-colors';

const Social = () => (
  <div className="flex items-center gap-1">
    <a
      href="https://github.com/aykutkardas/regexlearn.com"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
      className={socialLinkClassName}
    >
      <Icon icon="github" size={18} />
    </a>
    <a
      href="https://twitter.com/aykutkardas"
      target="_blank"
      rel="noreferrer"
      aria-label="Twitter"
      className={socialLinkClassName}
    >
      <Icon icon="twitter" size={18} />
    </a>
  </div>
);

export default Social;
