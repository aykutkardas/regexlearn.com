function isSafari() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') < 0) {
      return true;
    }
  }

  return false;
}

export default isSafari;
