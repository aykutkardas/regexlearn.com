import { useState, useEffect, FunctionComponent, Fragment } from 'react';

interface Props {
  Component: FunctionComponent;
  children: JSX.Element | JSX.Element[];
  [key: string]: any;
}

const EscapeWrapperSSR = ({ Component, children, ...props }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Fragment>{children}</Fragment>;
  }

  // @ts-ignore [TODO]: Fix this
  return <Component {...props}>{children}</Component>;
};

export default EscapeWrapperSSR;
