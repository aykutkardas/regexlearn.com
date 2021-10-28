function setCaretPosition(inputEl, pos) {
  if (!inputEl) return;

  // Modern browsers
  if (inputEl.setSelectionRange) {
    inputEl.focus();
    inputEl.setSelectionRange(pos, pos);

    // IE8 and below
  } else if (inputEl.createTextRange) {
    const range = inputEl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

export default setCaretPosition;
