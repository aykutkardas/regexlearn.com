import Icon from 'src/components/Icon';

const Social = () => (
  <div className="tw-flex tw-justify-between tw-gap-3">
    <a
      href="https://github.com/aykutkardas/regexlearn.com"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
      className="dark:tw-text-neutral-100 dark:hover:tw-text-green-400"
    >
      <Icon icon="github" size={20} />
    </a>
    <a
      href="https://twitter.com/aykutkardas"
      target="_blank"
      rel="noreferrer"
      aria-label="Twitter"
      className="dark:tw-text-neutral-100 dark:hover:tw-text-green-400"
    >
      <Icon icon="twitter" size={20} />
    </a>
  </div>
);

export default Social;
