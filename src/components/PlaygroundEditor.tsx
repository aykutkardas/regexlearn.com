import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Editor, EditorState, CompositeDecorator, ContentState, ContentBlock } from 'draft-js';
import { useIntl } from 'react-intl';
import cx from 'classnames';

import FlagBox from 'src/components/FlagBox';
import ReportPlayground from 'src/components/ReportPlayground';
import setCaretPosition from 'src/utils/setCaretPosition';

const Highlight = ({ children }) => (
  <span className="shadow-sm h-3 mx-1 my-[1px] px-1 py-[2px] rounded-md text-white bg-green-500">
    {children}
  </span>
);

const initText = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, Javascript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

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
          'bg-jet-500 my-5 p-3 text-xs rounded-md relative shadow-lg tracking-wider text-neutral-300',
          'block text-left w-full items-start',
          'before:content-[attr(data-title)] before:absolute before:-top-4 before:left-2 before:bg-jet-500 before:text-[10px] before:text-neutral-400 before:py-1 before:px-2 before:rounded-md',
        )}
        data-title={formatMessage({ id: 'general.regex' })}
        onClick={() => regexInput.current.focus()}
      >
        <input
          ref={regexInput}
          className="border-0 rounded-md py-5 focus:outline-none focus:ring-neutral-700 tracking-wider w-full text-sm leading-5 text-regreen-400 bg-neutral-600/40 h-7"
          type="text"
          onChange={e => onChangeRegex(e)}
          value={regex}
          spellCheck={false}
        />
      </div>
      <div className="mb-5 pb-3 pl-3">
        <FlagBox flags={flags} setFlags={onChangeFlags} />
      </div>
      <div
        className={cx(
          'bg-jet-500 my-5 p-3 text-xs rounded-md relative shadow-lg tracking-wider text-neutral-300',
          'block text-left w-full items-start',
          'before:content-[attr(data-title)] before:absolute before:-top-4 before:left-2 before:bg-jet-500 before:text-[10px] before:text-neutral-400 before:py-1 before:px-2 before:rounded-md',
        )}
        data-title={formatMessage({ id: 'general.text' })}
        onClick={() => editor.current.focus()}
      >
        <div className="overflow-y-scroll bg-neutral-700/40 rounded-lg w-full overflow-x-hidden leading-6 p-2 h-[350px]">
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
