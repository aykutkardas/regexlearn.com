import UAParser from 'ua-parser-js';

const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;

  const browserName = new UAParser().getBrowser().name;

  return browserName === 'Safari';
};

export default isSafari;
