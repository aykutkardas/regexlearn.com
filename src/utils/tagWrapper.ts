type TagWrapper = { value: string; regex: RegExp; tagName?: string; attributes?: object };

const tagWrapper = ({ value, regex, tagName = 'span', attributes = {} }: TagWrapper): string => {
  if (typeof value !== 'string') return value;

  const setAttributes = attrs =>
    Object.entries(attrs)
      .map(([key, val]) => `${key === 'className' ? 'class' : key}="${val}"`)
      .join(' ');

  return value.replace(regex, `<${tagName} ${setAttributes(attributes)}>$1</${tagName}>`);
};

export default tagWrapper;
