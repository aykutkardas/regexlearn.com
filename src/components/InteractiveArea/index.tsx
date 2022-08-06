import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useEventListener from '@use-it/event-listener';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';

const ReportStep = dynamic(import('src/components/ReportStep'), { ssr: false });
const Hint = dynamic(import('src/components/Hint'), { ssr: false });
import FlagBox from 'src/components/FlagBox';
import setCaretPosition from 'src/utils/setCaretPosition';
import tagWrapper from 'src/utils/tagWrapper';
import checkRegex from 'src/utils/checkRegex';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';

import styles from './InteractiveArea.module.css';
import Icon from '../Icon';

interface Props {
  isShow?: boolean;
  setIsOpenModal: Function;
}

const InteractiveArea = ({ isShow, setIsOpenModal }: Props) => {
  const {
    data,
    lessonData,
    step,
    lastStep,
    nextStep,
    prevStep,
    success,
    setSuccess,
    match,
    setMatch,
    error,
    setError,
    lockError,
  } = useContext(InteractiveAreaContext);

  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const [regex, setRegex] = useState(data.initialValue || '');
  const [flags, setFlags] = useState(data.initialFlags || '');
  const [content, setContent] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [skip, setSkip] = useState(false);

  const skipStep = () => {
    setRegex(data.regex[0]);
    setFlags(data.flags);
    setError(false);
    setSuccess(true);
    setMatch(true);
    setSkip(true);
  };

  useEffect(() => {
    setCaretPosition(regexInput.current, data.cursorPosition || 0);

    if (lastStep > step) {
      const newRegex = data.regex?.[0];
      const newFlags = data.flags;

      setRegex(newRegex);
      setFlags(newFlags);
      setSuccess(true);
      applyRegex(newRegex, newFlags);

      return;
    }

    if (step === lessonData.length - 1) {
      confetti({
        particleCount: 400,
        startVelocity: 30,
        gravity: 0.5,
        spread: 350,
        origin: {
          x: 0.5,
          y: 0.4,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBrowserSupport = useCallback(() => {
    try {
      checkRegex(data, { regex, flags });
      return true;
    } catch (error) {
      return false;
    }
  }, [data, regex, flags]);

  const applyRegex = (regex, flags) => {
    if (skip) return;
    if (data.interactive === false) return;

    if (data.safariAccept) {
      const isTrueRegex = data.regex[0] == regex;
      setError(!isTrueRegex);
      setSuccess(isTrueRegex);

      if (!checkBrowserSupport()) return;
    }

    const { isSuccess, isMatch, err, regex: grouppedRegex } = checkRegex(data, { regex, flags });

    if (err) {
      setError(true);
      setMatch(false);
      setSuccess(false);
      return;
    }

    setError(false);
    setMatch(isMatch);
    setSuccess(isSuccess);

    if (!regex) {
      setContent(data.content);
    } else {
      setContent(
        tagWrapper({
          value: data.content,
          regex: grouppedRegex,
          attributes: { class: styles.InteractiveAreaResultTag },
        }),
      );
    }

    if ((isChanged && isSuccess) || isMatch) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const onChange = e => {
    setIsChanged(true);
    setRegex(e.target.value);
    applyRegex(e.target.value, flags);
  };

  const focusInput = () => {
    regexInput?.current?.focus();
  };

  const handleChangeFlags = flags => {
    setFlags(flags);
    setIsChanged(true);
    applyRegex(regex, flags);
  };

  const handleFocus = e => {
    if (e.keyCode !== 9) return;
    e.preventDefault();
    focusInput();
  };

  const handleChangeStep = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        prevStep();
      } else {
        nextStep();
      }
    }
  };

  useEventListener('keypress', e => {
    handleChangeStep(e);
    handleFocus(e);
  });

  if (!isShow) return null;

  const readableContent = (content || data.content || '').replace(/\n/gm, '<br />');

  const placeholder = formatMessage({
    id: 'general.regex',
  }).toLowerCase();

  return (
    <div
      className={cx({
        [styles.InteractiveAreaError]: error,
        [styles.InteractiveAreaMatch]: match,
        [styles.InteractiveAreaSuccess]: success,
        [styles.InteractiveAreaLockError]: lockError,
      })}
    >
      {data.safariAccept && (
        <div className={styles.SafariWarning} onClick={skipStep}>
          <FormattedMessage id="learn.safari.unsupportWarning" />
        </div>
      )}
      <div
        className={styles.InteractiveAreaBlockContent}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{ __html: readableContent }}
      />
      <div
        className={styles.InteractiveAreaBlockRegex}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <ReportStep title={data.title} step={step} />

        {!data.noHint && (
          <Hint hiddenFlags={data.hiddenFlags} regex={data.regex} flags={data.flags} />
        )}
        <div
          className={cx(styles.InteractiveAreaInputWrapper, {
            [styles.InteractiveAreaHiddenFlags]: data.hiddenFlags,
          })}
          data-flags={flags}
        >
          <input
            ref={regexInput}
            key={step}
            type="text"
            className={styles.InteractiveAreaInput}
            style={{ width: regex.length * 15 || 60 }}
            readOnly={data.readOnly}
            value={data.visibleRegex || regex}
            onChange={onChange}
            placeholder={placeholder}
            spellCheck={false}
          />
        </div>
        {data.videoURL && (
          <div className={styles.WatchButton} onClick={() => setIsOpenModal(true)}>
            <Icon icon="play" size={18} />
            <FormattedMessage id="general.watch" />
          </div>
        )}
        {data.useFlagsControl && <FlagBox flags={flags} setFlags={handleChangeFlags} />}
      </div>
    </div>
  );
};

export default InteractiveArea;
