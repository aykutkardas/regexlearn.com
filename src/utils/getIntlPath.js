const getIntlPath = (href, lang, toString = false) => {
  let pathname = href;

  if (toString) {
    return pathname
      .replace('/[lang]', `/${lang}`)
  }

  return { pathname, query: { lang } }
};

export default getIntlPath;
