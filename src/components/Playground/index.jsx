import { useState, useRef } from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { Editor, EditorState, CompositeDecorator, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import * as styles from './Playground.module.css';

import FlagBox from '../FlagBox';

const Highlight = ({ children }) => {
  return <span className={styles.Highlight}>{children}</span>;
};

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});

export default function Playground() {
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState));

  const onChangeRegex = flags => {
    setFlags(flags);
    onChange({ target: { value: regex } }, flags);
  };

  const onChange = (e, newFlags = flags) => {
    const newRegex = e.target.value;
    setRegex(newRegex);

    let rowIndex = 0;
    let matchCount = 0;

    function findWithRegex(content, callback) {
      try {
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
      } catch (err) {}
    }

    function handleStrategy(content, callback) {
      findWithRegex(content, callback);
    }

    const HighlightDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: Highlight,
      },
    ]);

    let newEditorState = EditorState.set(editorState, { decorator: null });

    newEditorState = EditorState.set(newEditorState, { decorator: HighlightDecorator });

    setEditorState(newEditorState);
  };

  return (
    <div className={cx('container', styles.PlaygroundContainer)}>
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8">
          <div className={styles.InteractiveAreaBlockRegex}>
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
                onChange={onChange}
                value={regex}
                spellCheck={false}
              />
            </span>
          </div>
          <FlagBox flags={flags} setFlags={onChangeRegex} />
          <div
            className={styles.InteractiveAreaBlockContent}
            data-title={formatMessage({ id: 'general.text' })}
          >
            <Editor editorState={editorState} onChange={setEditorState} placeholder="Text here" />
          </div>
        </div>
      </div>
    </div>
  );
}
