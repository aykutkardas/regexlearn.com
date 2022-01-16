import { useState, useEffect, useRef, Fragment } from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { Editor, EditorState, CompositeDecorator, ContentState } from 'draft-js';
import { Scrollbars } from 'react-custom-scrollbars';

import FlagBox from '../FlagBox';
import setCaretPosition from 'src/utils/setCaretPosition';

import * as styles from './Playground.module.css';
import 'draft-js/dist/Draft.css';

const Highlight = ({ children }) => {
  return <span className={styles.Highlight}>{children}</span>;
};

const initialText = `Regular Expressions, abbreviated as RegEx or RegExp, are a string of characters created within the framework of RegEx syntax rules. You can easily manage your data with RegEx, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, Javascript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

const initialContent = ContentState.createFromText(initialText);

export default function Playground() {
  const editor = useRef(null);
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();
  const [regex, setRegex] = useState('[A-Z]\\w+');
  const [flags, setFlags] = useState('g');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContent));
  const [mounted, setMounted] = useState(false);

  const Wrapper = mounted ? Scrollbars : Fragment;
  const props = mounted
    ? {
        autoHide: true,
        style: {
          width: '100%',
          height: '100%',
          paddingRight: 30,
        },
      }
    : {};

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeFlags = flags => {
    setFlags(flags);
    onChangeRegex({ target: { value: regex } }, flags);
  };

  const onChangeRegex = (e, newFlags = flags) => {
    const newRegex = e.target.value;
    setRegex(newRegex);

    let rowIndex = 0;
    let matchCount = 0;

    if (!newRegex) {
      const content = editorState.getCurrentContent();
      const newEditorState = EditorState.createWithContent(content);
      setEditorState(newEditorState);
      return;
    }

    function findWithRegex(content, callback) {
      const isGlobal = newFlags.includes('g');
      const isMultiple = newFlags.includes('m');

      const isNeededMultiple = newRegex.startsWith('^') || newRegex.endsWith('$');

      if (!isMultiple && isNeededMultiple && rowIndex > 0) return;
      if (!isGlobal && matchCount > 0) return;

      const reg = new RegExp(newRegex, isGlobal ? newFlags : `g${newFlags}`);

      const text = content.getText();

      let matches = [...text.matchAll(reg)];

      if (!isGlobal) {
        matches = matches.slice(0, 1);
      }

      if (newRegex && matches.length) {
        matches.forEach(match => callback(match.index, match.index + match[0].length));
      } else {
        setEditorState(EditorState.createWithText(text));
      }

      rowIndex++;

      if (matches.length) {
        matchCount++;
      }
    }

    function handleStrategy(content, callback) {
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

  useEffect(() => {
    onChangeFlags(flags);
    setCaretPosition(regexInput?.current, regex.length);
  }, []);

  return (
    <>
      <div
        className={styles.InteractiveAreaBlockRegex}
        data-title={formatMessage({ id: 'general.regex' })}
        onClick={() => regexInput.current.focus()}
      >
        <span
          className={styles.PlaygroundBlockRegexInputWrapper}
          data-flags={flags}
          style={{ paddingRight: flags.length * 13 || 15 }}
        >
          <input
            ref={regexInput}
            style={{ width: regex.length * 10 || 90 }}
            className={cx(styles.PlaygroundBlockRegexInput)}
            type="text"
            onChange={onChangeRegex}
            value={regex}
            spellCheck={false}
          />
        </span>
      </div>
      <FlagBox flags={flags} setFlags={onChangeFlags} />
      <div
        className={styles.InteractiveAreaBlockContent}
        data-title={formatMessage({ id: 'general.text' })}
        onClick={() => editor.current.focus()}
      >
        <div className={styles.EditorWrapper}>
          <Wrapper {...props}>
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Text here"
            />
          </Wrapper>
        </div>
      </div>
    </>
  );
}
