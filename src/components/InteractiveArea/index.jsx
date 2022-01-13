/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import lookie from 'lookie';

import setCaretPosition from 'src/utils/setCaretPosition';
import tagWrapper from 'src/utils/tagWrapper';
import isSafari from 'src/utils/isSafari';
import checkRegex from 'src/utils/checkRegex';

const FlagBox = dynamic(import('src/components/FlagBox'), { ssr: false });
const ReportStep = dynamic(import('src/components/ReportStep'), { ssr: false });
const Hint = dynamic(import('src/components/Hint'), { ssr: false });

import * as styles from './InteractiveArea.module.css';

function InteractiveArea({ lessonName, data, step, isShow, parentError, onChangeSuccess }) {
  const { formatMessage } = useIntl();
  const regexInput = useRef(null);
  const [regex, setRegex] = useState(data.initialValue || '');
  const [flags, setFlags] = useState(data.initialFlags || '');
  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  const [isSafariAccept, setIsSafariAccept] = useState();

  useState(() => {
    setIsSafariAccept(isSafari() && data.safariAccept);
  }, []);

  const skipStep = () => {
    setError(false);
    setSuccess(true);
  };

  const applyRegex = () => {
    if (data.interactive === false) return true;

    if (isSafariAccept) {
      const isTrueRegex = data.regex[0] == regex;
      setError(!isTrueRegex);
      setSuccess(isTrueRegex);
      return true;
    }

    const { isSuccess, isMatch, err, $regex } = checkRegex(data, { regex, flags });

    if (err) {
      setError(err);
    } else {
      setMatch(isMatch);
      setSuccess(isSuccess);

      if (regex) {
        setContent(tagWrapper(data.content, $regex, styles.InteractiveAreaResultTag));
      } else {
        setContent(data.content);
      }

      if (isChanged && isSuccess) {
        setError(false);
      } else if (isMatch) {
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const onChange = e => {
    setIsChanged(true);
    setRegex(e.target.value);
  };

  const focusInput = () => {
    regexInput?.current.focus();
  };

  const blurInput = () => {
    regexInput?.current.blur();
  };

  useEffect(() => {
    setError(false);
    setSuccess(false);

    if (data.interactive === false) {
      setSuccess(true);
      return;
    }

    const lastStep = lookie.get(`lesson.${lessonName}`)?.lastStep || 0;
    const isCompletedStep = step < lastStep;

    applyRegex();
    setContent(data.content);
    setFlags(isCompletedStep ? data.flags : data.initialFlags || '');
    setRegex((isCompletedStep ? data.regex[0] : data.initialValue) || '');
    setIsChanged(false);
    blurInput();
    setTimeout(() => {
      setCaretPosition(regexInput.current, data.cursorPosition || 0);
      focusInput();
    });
  }, [step, data.cursorPosition]);

  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  const handleFocus = e => {
    if (e.keyCode !== 9) return;
    e.preventDefault();
    focusInput();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => document.removeEventListener('keydown', handleFocus);
  }, []);

  useEffect(applyRegex, [regex, flags, step]);

  if (!isShow) return null;

  const highlightedContent = (content || data.content || '').replace(/\n/gm, '<br />');

  const placeholder = formatMessage({
    id: 'general.regex',
  }).toLowerCase();

  return (
    <div
      className={cx({
        [styles.InteractiveAreaError]: error,
        [styles.InteractiveAreaMatch]: match,
        [styles.InteractiveAreaSuccess]: success,
        [styles.InteractiveAreaParentError]: parentError,
      })}
    >
      <div
        className={styles.InteractiveAreaBlockContent}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />
      {isSafariAccept && (
        <div className={styles.SafariWarning} onClick={skipStep}>
          <FormattedMessage id="learn.safari.unsupportWarning" />
        </div>
      )}
      <div
        className={styles.InteractiveAreaBlockRegex}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <ReportStep data={data} step={step} />
        <Hint regex={data.regex} flags={data.flags} />
        <div className={styles.InteractiveAreaInputWrapper} data-flags={flags}>
          <input
            ref={regexInput}
            key={step}
            type="text"
            className={styles.InteractiveAreaInput}
            style={{ width: regex.length * 15 || 60 }}
            readOnly={data.readOnly}
            value={regex}
            onChange={onChange}
            placeholder={placeholder}
            spellCheck={false}
          />
        </div>
        {data.useFlagsControl && (
          <FlagBox onChange={setIsChanged} flags={flags} setFlags={setFlags} />
        )}
      </div>
    </div>
  );
}

export default InteractiveArea;
