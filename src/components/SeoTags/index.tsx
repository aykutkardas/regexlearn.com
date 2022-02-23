const baseURL = 'https://regexlearn.com';

interface Props {
  title: string;
  description: string;
  href: string;
  image?: string;
}

const SeoTags = ({
  title,
  description,
  href = '',
  image = baseURL + '/images/og-regexlearn-image.jpg',
}: Props) => (
  <>
    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content={baseURL + href} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="regexlearn.com" />
    <meta property="twitter:url" content={baseURL + href} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </>
);

export default SeoTags;
