import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useIntl } from 'react-intl';
import cx from 'clsx';

import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
  ContentBlock,
  getDefaultKeyBinding,
} from 'draft-js';

import setCaretPosition from 'src/utils/setCaretPosition';
import FlagSelect from './FlagSelect';

function myKeyBindingFn(e): string | null {
  if (e.ctrlKey && e.key.toLowerCase() === 'm') {
    e.preventDefault();
    return null;
  }
  return getDefaultKeyBinding(e);
}

const Highlight = ({ children }) => (
  <span className="px-[3px] mx-px py-0.5 rounded-md text-ink-950 bg-regreen-400">
    {children}
  </span>
);

const initText = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, JavaScript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

const initialContent = ContentState.createFromText(initText);

const Playground = () => {
  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const editor = useRef(null);

  const [state, setState] = useState({
    regex: '',
    flags: '',
    editorState: EditorState.createEmpty(),
  });

  const onChangeFlags = flags => {
    let newFlags = '';
    if (flags.includes('g')) {
      newFlags += 'g';
    }
    if (flags.includes('m')) {
      newFlags += 'm';
    }
    if (flags.includes('i')) {
      newFlags += 'i';
    }
    setState({
      regex: state.regex,
      flags: newFlags,
      editorState: checkRegex(state.regex, newFlags, state.editorState),
    });
  };

  const onChangeRegex = (event: FormEvent<HTMLInputElement>) => {
    const regex = event?.currentTarget?.value || '';
    setState({ ...state, regex, editorState: checkRegex(regex, state.flags, state.editorState) });
  };

  const onChangeContent = (editorState: EditorState) => {
    setState({ ...state, editorState });
  };

  const checkRegex = (regex, flags, editorState) => {
    let rowIndex = 0;
    let matchCount = 0;

    if (!regex) {
      const content = editorState.getCurrentContent();
      return EditorState.createWithContent(content);
    }

    const blockCount = editorState.getCurrentContent().getBlockMap().size;

    function findWithRegex(content: ContentBlock, callback: Function) {
      const isMultiple = flags.includes('m');
      const currentRow = rowIndex;

      rowIndex++;

      // Without the multiline flag, `^` only matches the start of the whole
      // text (first row) and `$` only its end (last row).
      if (!isMultiple) {
        if (regex.startsWith('^') && currentRow > 0) return;
        if (regex.endsWith('$') && currentRow < blockCount - 1) return;
      }

      const isGlobal = flags.includes('g');

      if (!isGlobal && matchCount > 0) return;

      const text = content.getText();
      const currentRegex = new RegExp(regex, isGlobal ? flags : `g${flags}`);

      let matches = [...text.matchAll(currentRegex)];

      if (!isGlobal) {
        matches = matches.slice(0, 1);
      }

      if (regex && matches.length) {
        matches.forEach(match => callback(match.index, match.index + match[0].length));
      }

      if (matches.length) {
        matchCount++;
      }
    }

    function handleStrategy(content: ContentBlock, callback: Function) {
      try {
        findWithRegex(content, callback);
      } catch (err) {}
    }

    const HighlightDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: Highlight,
      },
    ]);

    return EditorState.createWithContent(editorState.getCurrentContent(), HighlightDecorator);
  };

  useEffect(() => {
    const regex = '[A-Z]\\w+';
    const flags = 'g';
    setState({
      regex,
      flags,
      editorState: checkRegex(regex, flags, EditorState.createWithContent(initialContent)),
    });
    setCaretPosition(regexInput.current, regex.length);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div dir="ltr" className="panel">
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02] rounded-t-xl">
          <span className="panel-label">{formatMessage({ id: 'general.regex' })}</span>
        </div>
        <div className="flex items-center gap-2 p-2">
          <div
            className={cx(
              'flex flex-1 items-center h-11 px-3 rounded-lg font-mono text-sm md:text-base',
              'bg-ink-950/70 border border-white/[0.06] transition-[border-color,box-shadow]',
              'focus-within:border-regreen-400/40 focus-within:shadow-[0_0_0_3px_rgb(95_245_155/0.08)]',
            )}
          >
            <span className="text-neutral-600">/</span>
            <input
              ref={regexInput}
              aria-label={formatMessage({ id: 'general.regex' })}
              className="border-0 px-1 flex-1 focus:outline-none font-mono text-sm md:text-base text-regreen-400 bg-transparent focus:ring-0 w-full"
              type="text"
              onChange={e => onChangeRegex(e)}
              value={state.regex}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            <span className="text-neutral-600">
              /<span className="text-regreen-400">{state.flags}</span>
            </span>
          </div>
          <FlagSelect flags={state.flags} setFlags={onChangeFlags} />
        </div>
      </div>

      <div
        dir="ltr"
        className="panel flex flex-col flex-1 min-h-0 overflow-hidden cursor-text"
        onClick={() => editor.current.focus()}
      >
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02] shrink-0">
          <span className="panel-label">{formatMessage({ id: 'general.text' })}</span>
        </div>
        <div
          className={cx(
            'overflow-y-auto flex-1 w-full flex px-4 py-3 font-mono text-[13px] md:text-sm text-neutral-300 overflow-x-hidden !leading-8',
            '[&_.public-DraftEditor-content]:min-h-full [&_.DraftEditor-root]:w-full [&_.public-DraftEditor-content]:ring-0',
            '[&_.public-DraftEditorPlaceholder-root]:text-neutral-600',
          )}
        >
          <Editor
            ref={editor}
            editorState={state.editorState}
            onChange={onChangeContent}
            placeholder="Text here"
            keyBindingFn={myKeyBindingFn}
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
