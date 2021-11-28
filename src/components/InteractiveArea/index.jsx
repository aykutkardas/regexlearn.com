/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import cx from 'classnames';
import lookie from 'lookie';

import Mousetrap from '../../utils/mousetrap';
import setCaretPosition from '../../utils/setCaretPosition';
import tagWrapper from '../../utils/tagWrapper';
import isSafari from '../../utils/isSafari';
import checkRegex from '../../utils/checkRegex';

import Hint from '../Hint';
import ReportStep from '../ReportStep';
import FlagBox from '../FlagBox';

import shortcuts from '../../shortcuts';

import * as styles from './InteractiveArea.module.css';

function InteractiveArea({ data, step, isShow, parentError, onChangeSuccess }) {
  const { formatMessage } = useIntl();
  const regexInput = useRef(null);
  const [regex, setRegex] = useState(data.initialValue || '');
  const [flags, setFlags] = useState(data.initialFlags || '');
  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  const isSafariAndAccept = isSafari() && data.safariAccept;

  const toastConfig = {
    theme: 'colored',
    autoClose: true,
    position: 'top-center',
  };

  const skipStep = () => {
    setError(false);
    setSuccess(true);
  };

  const applyRegex = () => {
    if (data.interactive === false) return true;

    if (isSafariAndAccept) {
      if (data.regex[0] == regex) {
        setError(false);
        setSuccess(true);
        toast.success(formatMessage({ id: 'general.completedStep' }), toastConfig);
      } else {
        setError(true);
        setSuccess(false);
      }
      return true;
    }

    const { isSuccess, isMatch, err, $regex } = checkRegex(data, { regex, flags });

    toast.dismiss();

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
        toast.success(formatMessage({ id: 'general.completedStep' }), toastConfig);
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
    if (regexInput?.current) {
      regexInput.current.focus();
    }
  };

  const blurInput = () => {
    if (regexInput?.current) {
      regexInput.current.blur();
    }
  };

  useEffect(() => {
    setError(false);
    setSuccess(false);

    toast.dismiss();

    if (data.interactive === false) {
      setSuccess(true);
      return;
    }

    const lastStep = lookie.get('lastStep') || 0;
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
    }, 300);
  }, [step, data.cursorPosition]);

  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.focus, e => {
      e.preventDefault();
      focusInput();
    });

    return () => Mousetrap.unbind(shortcuts.focus);
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
      {isSafariAndAccept && (
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
