function tagWrapper(val, regex, className, el = "span") {
  if (typeof val !== "string") return val;
  return val.replace(regex, `<${el} href="#" ${className ? ' class="' + className + '"' : ''}>$1</${el}>`);
}

export default tagWrapper;
