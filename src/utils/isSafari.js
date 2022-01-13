function isSafari() {
  if (typeof window === 'undefined') return;

  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') < 0) {
      return true;
    }
  }

  return false;
}

export default isSafari;
