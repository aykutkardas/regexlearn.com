import cx from 'classnames';

import * as styles from '../../pages/[lang]/Home.module.css';

const ProductButton = () => {
  return (
    <div className={styles.ProductHuntButtonWrapper}>
      <a
        href="https://www.producthunt.com/golden-kitty-awards-2021/education"
        target="_blank"
        rel="noreferrer"
        className={cx('animate__animated animate__shakeY', styles.GoldenKittyButton)}
      >
        <div>
          <img
            src="https://ph-static.imgix.net/golden-kitty/2021/intro_kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=450&h=450&fit=max&dpr=2"
            alt=""
          />
          Vote on Product Hunt
        </div>
        <i>for Golden Kitty Awards</i>
        <span>{`Don't forget to hit ''Complete Voting'' button after passing other categories`}</span>
      </a>
      {false && (
        <a
          href="https://www.producthunt.com/posts/regexlearn?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-regexlearn"
          target="_blank"
          rel="noreferrer"
          className={styles.ProductHuntButton}
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=319999&theme=light&period=daily"
            alt="RegexLearn - Learn RegEx step by step, from zero to advanced | Product Hunt"
            style={{ width: 250, height: 54, marginBottom: 30 }}
            width="250"
            height="54"
          />
        </a>
      )}
    </div>
  );
};

export default ProductButton;
