import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Editor, EditorState, CompositeDecorator, ContentState, ContentBlock } from 'draft-js';
import { useIntl } from 'react-intl';
import cx from 'classnames';

import FlagBox from 'src/components/FlagBox';
import ReportPlayground from 'src/components/ReportPlayground';
import setCaretPosition from 'src/utils/setCaretPosition';

import styles from './Playground.module.css';

const Highlight = ({ children }) => <span className={styles.Highlight}>{children}</span>;

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
        className={styles.InteractiveAreaBlockRegex}
        data-title={formatMessage({ id: 'general.regex' })}
        onClick={() => regexInput.current.focus()}
      >
        <input
          ref={regexInput}
          className={cx(styles.PlaygroundBlockRegexInput)}
          type="text"
          onChange={e => onChangeRegex(e)}
          value={regex}
          spellCheck={false}
        />
      </div>
      <FlagBox flags={flags} setFlags={onChangeFlags} />
      <div
        className={styles.InteractiveAreaBlockContent}
        data-title={formatMessage({ id: 'general.text' })}
        onClick={() => editor.current.focus()}
      >
        <div className={cx('overflow-y-scroll', styles.EditorWrapper)}>
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
