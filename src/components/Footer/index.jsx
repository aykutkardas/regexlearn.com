import Icon from "../Icon";

function Footer() {
  return (
    <div className="landing-footer">
      <div className="landing-footer-links">
        <a
          href="https://github.com/aykutkardas/regexlearn.com"
          target="_blank"
          rel="noreferrer"
          className="landing-footer-link"
        >
          <Icon icon="github" size={20} color="white" />
        </a>
        <a
          href="https://twitter.com/aykutkardas"
          target="_blank"
          rel="noreferrer"
          className="landing-footer-link"
        >
          <Icon icon="twitter" size={20} color="white" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
