import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Editor, EditorState, CompositeDecorator, ContentState, ContentBlock } from 'draft-js';
import { useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

import FlagBox from 'src/components/FlagBox';
import ReportPlayground from 'src/components/ReportPlayground';
import setCaretPosition from 'src/utils/setCaretPosition';
import EscapeWrapperSSR from '../EscapeWrapperSSR';

import styles from './Playground.module.css';

const Highlight = ({ children }) => <span className={styles.Highlight}>{children}</span>;

const initialContent = ContentState.createFromText(
  `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, Javascript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`,
);

const Playground = () => {
  const [regex, setRegex] = useState('[A-Z]\\w+');
  const [flags, setFlags] = useState('g');
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(initialContent),
  );

  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const editor = useRef(null);

  const onChangeFlags = flags => {
    setFlags(flags);
    onChangeRegex(null, flags, regex);
  };

  const onChangeRegex = (
    event: FormEvent<HTMLInputElement>,
    newFlags?: string,
    defaultRegex?: string,
  ) => {
    const newRegex = event?.currentTarget?.value || defaultRegex || '';
    setRegex(newRegex);

    let rowIndex = 0;
    let matchCount = 0;

    if (!newRegex) {
      const content = editorState.getCurrentContent();
      const newEditorState = EditorState.createWithContent(content);
      setEditorState(newEditorState);
      return;
    }

    function findWithRegex(content: ContentBlock, callback: Function) {
      const currentFlags = newFlags || flags;
      const isMultiple = currentFlags.includes('m');
      const isNeededMultiple = newRegex.startsWith('^') || newRegex.endsWith('$');

      if (!isMultiple && isNeededMultiple && rowIndex > 0) return;

      const isGlobal = currentFlags.includes('g');

      if (!isGlobal && matchCount > 0) return;

      const text = content.getText();
      const currentRegex = new RegExp(newRegex, isGlobal ? currentFlags : `g${currentFlags}`);

      let matches = [...text.matchAll(currentRegex)];

      if (!isGlobal) {
        matches = matches.slice(0, 1);
      }

      if (newRegex && matches.length) {
        matches.forEach(match => callback(match.index, match.index + match[0].length));
      } else {
        const newContent = ContentState.createFromText(text);
        setEditorState(EditorState.createWithContent(newContent));
      }

      rowIndex++;

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

    const newEditorState = EditorState.createWithContent(
      editorState.getCurrentContent(),
      HighlightDecorator,
    );

    setEditorState(newEditorState);
  };

  useEffect(() => {
    onChangeFlags(flags);
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
            onChange={e => onChangeRegex(e)}
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
          <EscapeWrapperSSR
            Component={Scrollbars}
            autoHide={true}
            style={{
              width: '100%',
              height: '100%',
              paddingRight: 30,
            }}
          >
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Text here"
            />
          </EscapeWrapperSSR>
        </div>
        <ReportPlayground />
      </div>
    </>
  );
};

export default Playground;
