const setCaretPosition = (inputEl: HTMLInputElement, pos: number): void => {
  if (!inputEl || !inputEl.setSelectionRange) return;

  inputEl.focus();
  inputEl.setSelectionRange(pos, pos);
};

export default setCaretPosition;
