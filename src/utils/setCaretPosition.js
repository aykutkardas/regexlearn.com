function setCaretPosition(inputEl, pos) {
  if (!inputEl || !inputEl.setSelectionRange) return;

  inputEl.focus();
  inputEl.setSelectionRange(pos, pos);
}

export default setCaretPosition;
