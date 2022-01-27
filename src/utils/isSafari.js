import UAParser from "ua-parser-js";

function isSafari() {
  if (typeof window === 'undefined') return;

  const browserName = new UAParser().getBrowser().name;

  return browserName === 'Safari';
}

export default isSafari;
