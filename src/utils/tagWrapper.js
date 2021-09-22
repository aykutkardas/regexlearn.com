function tagWrapper(val, regex, className) {
  if (typeof val !== "string") return val;
  return val.replace(regex, `<span class='${className}'>$1</span>`);
}

export default tagWrapper;
