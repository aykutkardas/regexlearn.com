import { createElement } from 'react';
import tagWrapper from 'src/utils/tagWrapper';

interface HighlightedTextProps {
  id?: string;
  tagName?: string;
  search?: RegExp;
  children?: React.ReactNode;
  text: string;
  attrs?: { [key: string]: string };
}

const HighlightedText = ({
  children,
  tagName,
  search,
  text,
  attrs = {},
  ...props
}: HighlightedTextProps) => {
  return createElement(tagName || 'div', {
    ...props,
    dangerouslySetInnerHTML: {
      __html: tagWrapper({
        value: text,
        regex: search,
        attributes: attrs,
      }),
    },
  });
};

export default HighlightedText;
