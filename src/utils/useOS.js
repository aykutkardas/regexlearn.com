// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

function useOS() {
  const os = getOS();
  const isDesktop = ["Windows", "Mac OS", "Linux"].includes(os);
  const isMobile = ["Android", "iOS"].includes(os);

  return { os, isDesktop, isMobile };
}

export default useOS;
