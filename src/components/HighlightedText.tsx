import { createElement } from 'react';

import tagWrapper from 'src/utils/tagWrapper';

interface HighlightedTextProps {
  id?: string;
  className?: string;
  element?: string;
  tagName?: string;
  search?: RegExp;
  children?: React.ReactNode;
  text: string;
  attrs?: { [key: string]: string };
}

const HighlightedText = ({
  children,
  search = /`(\S*?[^`]*)`/gim,
  text,
  element = 'div',
  tagName = 'span',
  attrs = {},
  ...props
}: HighlightedTextProps) => {
  return createElement(element, {
    ...props,
    dangerouslySetInnerHTML: {
      __html: tagWrapper({
        value: text,
        regex: search,
        attributes: attrs,
        tagName: tagName,
      }).replace(/\\n/gim, '<br/>'),
    },
  });
};

export default HighlightedText;
