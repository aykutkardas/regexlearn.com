import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Editor, EditorState, CompositeDecorator, ContentState, ContentBlock } from 'draft-js';
import { useIntl } from 'react-intl';
import cx from 'clsx';

import FlagBox from 'src/components/FlagBox';
import ReportPlayground from 'src/components/ReportPlayground';
import setCaretPosition from 'src/utils/setCaretPosition';

const Highlight = ({ children }) => (
  <span className="shadow-sm h-3 mx-1 my-[1px] px-1 py-[2px] rounded-md text-white bg-green-500">
    {children}
  </span>
);

const initText = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, JavaScript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

const initialContent = ContentState.createFromText(initText);

const Playground = () => {
  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const editor = useRef(null);
  const [regex, setRegex] = useState('[A-Z]\\w+');
  const [flags, setFlags] = useState('g');
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(initialContent),
  );

  const onChangeFlags = flags => {
    setFlags(flags);
  };

  const onChangeRegex = (event: FormEvent<HTMLInputElement>) => {
    setRegex(event?.currentTarget?.value || '');
  };

  const checkRegex = () => {
    let rowIndex = 0;
    let matchCount = 0;

    if (!regex) {
      const content = editorState.getCurrentContent();
      setEditorState(EditorState.createWithContent(content));
      return;
    }

    function findWithRegex(content: ContentBlock, callback: Function) {
      const isMultiple = flags.includes('m');
      const isNeededMultiple = regex.startsWith('^') || regex.endsWith('$');

      if (!isMultiple && isNeededMultiple && rowIndex > 0) return;

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
      } else {
        const newContent = ContentState.createFromText(text);
        setEditorState(EditorState.createWithContent(newContent));
      }

      if (matches.length) {
        matchCount++;
      }

      rowIndex++;
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

    const newEditorState = EditorState.createWithContent(
      editorState.getCurrentContent(),
      HighlightDecorator,
    );

    setEditorState(newEditorState);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkRegex, [regex, flags]);

  useEffect(() => {
    setCaretPosition(regexInput?.current, regex.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={cx(
          'bg-jet-500 text-xs rounded-md relative tracking-wider text-neutral-300',
          'text-left w-full items-start flex flex-col',
        )}
        onClick={() => regexInput.current.focus()}
      >
        <span className="mb-2 text-[10px] text-neutral-400">
          {formatMessage({ id: 'general.regex' })}
        </span>
        <input
          ref={regexInput}
          className="border-0 rounded-md py-5 focus:outline-none focus:ring-neutral-700 tracking-wider w-full text-sm leading-5 text-regreen-400 bg-neutral-600/40 h-7"
          type="text"
          onChange={e => onChangeRegex(e)}
          value={regex}
          spellCheck={false}
        />
      </div>
      <div className="py-3">
        <FlagBox flags={flags} setFlags={onChangeFlags} />
      </div>
      <div
        className={cx(
          'bg-jet-500 text-xs rounded-md relative tracking-wider text-neutral-300 h-auto',
          'flex flex-col text-left w-full items-start',
        )}
        onClick={() => editor.current.focus()}
      >
        <span className="mb-2 text-[10px] text-neutral-400">
          {formatMessage({ id: 'general.text' })}
        </span>
        <div
          className={cx(
            'overflow-y-scroll text-sm bg-neutral-700/40 rounded-lg w-full overflow-x-hidden leading-6 p-2',
            '[&_.public-DraftEditor-content]:min-h-[calc(100vh-5rem-13rem)]  [&_.public-DraftEditor-content]:ring-0',
          )}
        >
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Text here"
          />
        </div>
        <ReportPlayground />
      </div>
    </>
  );
};

export default Playground;
