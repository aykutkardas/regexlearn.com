import { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useEventListener from '@use-it/event-listener';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import lookie from 'lookie';

const ReportStep = dynamic(import('src/components/ReportStep'), { ssr: false });
const Hint = dynamic(import('src/components/Hint'), { ssr: false });
import FlagBox from 'src/components/FlagBox';
import setCaretPosition from 'src/utils/setCaretPosition';
import tagWrapper from 'src/utils/tagWrapper';
import checkRegex from 'src/utils/checkRegex';
import { Lesson, LessonData } from 'src/types';

import styles from './InteractiveArea.module.css';
import Icon from '../Icon';

interface Props {
  lesson: Lesson;
  data: LessonData;
  step: number;
  isShow?: boolean;
  parentError: boolean;
  onChangeSuccess: Function;
  setIsOpenModal: Function;
}

const InteractiveArea = ({
  lesson,
  data,
  step,
  isShow,
  parentError,
  onChangeSuccess,
  setIsOpenModal,
}: Props) => {
  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const [regex, setRegex] = useState(data.initialValue || '');
  const [flags, setFlags] = useState(data.initialFlags || '');
  const [content, setContent] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  const skipStep = () => {
    setError(false);
    setSuccess(true);
  };

  const checkBrowserSupport = () => {
    try {
      checkRegex(data, { regex, flags });
      return true;
    } catch (error) {
      return false;
    }
  };

  const applyRegex = () => {
    if (data.interactive === false) return;

    if (data.safariAccept) {
      const isTrueRegex = data.regex[0] == regex;
      setError(!isTrueRegex);
      setSuccess(isTrueRegex);

      if (!checkBrowserSupport()) return;
    }

    const { isSuccess, isMatch, err, regex: grouppedRegex } = checkRegex(data, { regex, flags });

    if (err) {
      setError(Boolean(err));
      return;
    }

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
  };

  const focusInput = () => {
    regexInput?.current?.focus();
  };

  const blurInput = () => {
    regexInput?.current?.blur();
  };

  useEffect(() => {
    setError(false);

    if (data.interactive === false) {
      setSuccess(true);
      return;
    }

    setSuccess(false);

    const lastStep = lookie.get(`lesson.${lesson.key}`)?.lastStep || 0;
    const isCompletedStep = step < lastStep;
    const currentFlags = isCompletedStep ? data.flags : data.initialFlags;
    const currentRegex = isCompletedStep ? data.regex[0] : data.initialValue;

    applyRegex();
    setContent(data.content);
    setFlags(currentFlags || '');
    setRegex(currentRegex || '');
    setIsChanged(false);
    blurInput();

    setTimeout(() => setCaretPosition(regexInput.current, data.cursorPosition || 0));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, data.cursorPosition]);

  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  const handleFocus = e => {
    if (e.keyCode !== 9) return;
    e.preventDefault();
    focusInput();
  };

  const handleChangeFlags = flags => {
    setFlags(flags);
    setIsChanged(true);
  };

  useEventListener('keydown', handleFocus);

  useEffect(applyRegex, [regex, flags, step, data, isChanged, checkBrowserSupport]);

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
        [styles.InteractiveAreaParentError]: parentError,
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
