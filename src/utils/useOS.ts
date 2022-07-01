import UAParser from 'ua-parser-js';

const getOS = (): string | null => {
  if (typeof window === 'undefined') return null;

  return new UAParser().getOS().name;
};

type UseOS = {
  os: string | null;
  isDesktop: boolean;
  isMobile: boolean;
  isMacOS: boolean;
};

const useOS = (): UseOS => {
  const os = getOS();
  const isDesktop = ['Windows', 'Mac OS', 'Linux'].includes(os);
  const isMobile = ['Android', 'iOS'].includes(os);
  const isMacOS = 'Mac OS' === os;

  return { os, isMacOS, isDesktop, isMobile };
};

export default useOS;
