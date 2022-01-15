import { useState, useRef } from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import * as styles from './Playground.module.css';

const Highlight = ({ children }) => {
  return <span className={styles.Highlight}>{children}</span>;
};

export default function Playground() {
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();
  const [regex, setRegex] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = e => {
    const newRegex = e.target.value;
    setRegex(newRegex);

    function findWithRegex(content, callback) {
      try {
        let $regex = newRegex;

        [...content.getText().matchAll($regex)].forEach(match =>
          callback(match.index, match.index + match[0].length),
        );
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

    const newEditorState = EditorState.set(editorState, { decorator: HighlightDecorator });
    setEditorState(newEditorState);
  };

  return (
    <div className={cx('container', styles.PlaygroundContainer)}>
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8">
          <div className={styles.PlaygroundBlockRegexInputWrapper}>
            <input
              ref={regexInput}
              className={cx(styles.PlaygroundBlockRegexInput)}
              type="text"
              onChange={onChange}
              value={regex}
              spellCheck={false}
            />
          </div>
          <div
            className={styles.InteractiveAreaBlockContent}
            data-title={formatMessage({ id: 'general.text' })}
          >
            <Editor editorState={editorState} onChange={setEditorState} />
          </div>
        </div>
      </div>
    </div>
  );
}
