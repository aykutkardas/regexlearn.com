function tagWrapper({ value, regex, el = "span", attributes = {} }) {
  if (typeof value !== "string") return value;

  const setAttributes = (attrs) => Object.entries(attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  return value.replace(regex, `<${el} ${setAttributes(attributes)}>$1</${el}>`);
}

export default tagWrapper;
