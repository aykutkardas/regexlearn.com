import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useEventListener from '@use-it/event-listener';
import cx from 'clsx';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';

const Hint = dynamic(import('src/components/Hint'), { ssr: false });
import FlagBox from 'src/components/FlagBox';
import Icon from 'src/components/Icon';
import setCaretPosition from 'src/utils/setCaretPosition';
import tagWrapper from 'src/utils/tagWrapper';
import checkRegex from 'src/utils/checkRegex';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';

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

    // Read-only steps cannot rely on focus/change events to render their
    // pre-filled regex result.
    if (data.readOnly && data.initialValue) {
      applyRegex(data.initialValue, data.initialFlags || '');
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
          attributes: {
            class: 'highlight transition-colors mx-px px-1 py-0.5 rounded-md text-ink-950',
          },
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

  const onFocus = e => {
    if (data.readOnly) {
        return;
    }

    onChange(e);
  }

  const focusInput = () => {
    regexInput?.current?.focus();
  };

  const handleChangeFlags = flags => {
    let newFlags = '';
    if (flags.includes('g')) {
      newFlags += 'g';
    }
    if (flags.includes('m')) {
      newFlags += 'm';
    }
    if (flags.includes('i')) {
      newFlags += 'i';
    }
    setFlags(newFlags);
    setIsChanged(true);
    applyRegex(regex, newFlags);
  };

  const handleFocus = e => {
    if (e.keyCode !== 9) return;
    e.preventDefault();
    focusInput();
  };

  const handleChangeStep = e => {
    if (e.ctrlKey) return;
    // Focused buttons/links already handle Enter natively.
    if (e.target?.closest?.('button, a')) return;

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
      dir="ltr"
      className={cx('mt-8', {
        '[&_.highlight]:bg-red-400 ': error,
        '[&_.highlight]:bg-yellow-500': match,
        '[&_.highlight]:!bg-regreen-400': success,
        '[&_.regex-block]:!border-red-400/60 [&_.regex-block]:shadow-[0_0_0_3px_rgb(248_113_113/0.12)]':
          lockError,
      })}
    >
      {data.safariAccept && (
        <button
          className="text-yellow-500 hover:text-yellow-400 text-xs px-3 py-1 mx-auto flex rounded-md mb-3 underline underline-offset-2"
          onClick={skipStep}
        >
          <FormattedMessage id="learn.safari.unsupportWarning" />
        </button>
      )}
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02]">
          <span className="panel-label">{formatMessage({ id: 'general.text' })}</span>
          <span aria-hidden className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </span>
        </div>
        <div
          className="px-4 py-4 font-mono text-[13px] leading-7 tracking-wide text-neutral-300 text-left break-words"
          dangerouslySetInnerHTML={{ __html: readableContent }}
        />
      </div>

      <div
        className={cx(
          'panel regex-block mt-4 transition-[border-color,box-shadow] duration-200',
          'focus-within:border-regreen-400/40 focus-within:shadow-[0_0_0_3px_rgb(95_245_155/0.08)]',
        )}
      >
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02] rounded-t-xl">
          <span className="panel-label">{formatMessage({ id: 'general.regex' })}</span>
          {!data.noHint && (
            <Hint hiddenFlags={data.hiddenFlags} regex={data.regex} flags={data.flags} />
          )}
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-5">
          <div
            className={cx(
              'bg-ink-950/70 border border-white/[0.06] px-4 py-2 rounded-lg flex items-center justify-center max-w-full font-mono text-base',
              "before:content-['/'] before:text-neutral-600",
              "after:content-['/'_attr(data-flags)] after:text-neutral-500",
              { 'after:hidden before:hidden': data.hiddenFlags },
            )}
            data-flags={flags}
          >
            <input
              ref={regexInput}
              key={step}
              type="text"
              aria-label={formatMessage({ id: 'general.regex' })}
              className="bg-transparent border-0 outline-none !ring-0 text-center max-w-[440px] min-w-[5ch] px-1 py-0 font-mono text-base tracking-wider text-regreen-400 placeholder:text-neutral-600"
              style={{ width: `${Math.max((data.visibleRegex || regex).length, 4) + 1}ch` }}
              readOnly={data.readOnly}
              value={data.visibleRegex || regex}
              onChange={onChange}
              onFocus={onFocus}
              placeholder={placeholder}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
          {(data.videoURL || data.useFlagsControl) && (
            <div
              className={cx(
                'w-full flex flex-wrap items-center gap-3',
                data.videoURL ? 'justify-between' : 'justify-center',
              )}
            >
              {data.videoURL && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                  onClick={() => setIsOpenModal(true)}
                >
                  <Icon icon="video-camera" size={14} className="text-red-400" />
                  <FormattedMessage id="general.watch" />
                </button>
              )}
              {data.useFlagsControl && <FlagBox flags={flags} setFlags={handleChangeFlags} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveArea;
