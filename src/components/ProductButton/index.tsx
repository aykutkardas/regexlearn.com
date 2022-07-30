import styles from '../../pages/[lang]/Home.module.css';

interface Props {
  onlyBuyMeACoffee?: boolean;
}

const ProductButton = ({ onlyBuyMeACoffee }: Props) => (
  <div className={onlyBuyMeACoffee ? null : styles.ProductHuntButtonWrapper}>
    <a href="https://www.buymeacoffee.com/aykutkardas" target="_blank" rel="noreferrer">
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style={{ height: 50, width: 217 }}
      />
    </a>
    {!onlyBuyMeACoffee && (
      <a
        href="https://www.producthunt.com/posts/regexlearn?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-regexlearn"
        target="_blank"
        rel="noreferrer"
        className={styles.ProductHuntButton}
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=319999&theme=light&period=daily"
          alt="RegexLearn - Learn Regex step by step, from zero to advanced | Product Hunt"
          style={{ width: 250, height: 54, marginBottom: 30 }}
        />
      </a>
    )}
  </div>
);

export default ProductButton;
