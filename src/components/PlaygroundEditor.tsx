import { useState, useEffect, useMemo, useRef, Fragment, KeyboardEvent, UIEvent } from 'react';
import { useIntl } from 'react-intl';
import cx from 'clsx';

import setCaretPosition from 'src/utils/setCaretPosition';
import findPlaygroundMatches from 'src/utils/findPlaygroundMatches';
import FlagSelect from './FlagSelect';

const initText = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, JavaScript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

const initialRegex = '[A-Z]\\w+';
const initialFlags = 'g';

// Shared by the textarea and the highlight layer behind it so both lay text out identically.
const textLayout =
  'px-4 py-3 font-mono text-[13px] md:text-sm leading-8 tracking-wider whitespace-pre-wrap break-words [scrollbar-gutter:stable]';

const normalizeFlags = (flags: string) =>
  ['g', 'm', 'i'].filter(flag => flags.includes(flag)).join('');

const Playground = () => {
  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  const [regex, setRegex] = useState(initialRegex);
  const [flags, setFlags] = useState(initialFlags);
  const [text, setText] = useState(initText);

  const ranges = useMemo(() => findPlaygroundMatches(text, regex, flags), [text, regex, flags]);

  const highlightedText = useMemo(() => {
    const parts = [];
    let cursor = 0;

    ranges.forEach(({ start, end }, index) => {
      parts.push(text.slice(cursor, start));
      parts.push(
        <mark
          key={index}
          data-highlight
          className="rounded bg-regreen-400 text-ink-950 shadow-[0_0_0_2px_#5ff59b]"
        >
          {text.slice(start, end)}
        </mark>,
      );
      cursor = end;
    });
    parts.push(text.slice(cursor));

    return parts.map((part, index) => <Fragment key={`p${index}`}>{part}</Fragment>);
  }, [text, ranges]);

  useEffect(() => {
    setCaretPosition(regexInput.current, initialRegex.length);
  }, []);

  const syncScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    if (!backdrop.current) return;
    backdrop.current.scrollTop = event.currentTarget.scrollTop;
  };

  // Ctrl+M toggles the multiline flag; keep it from reaching the textarea.
  const onTextKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'm') {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div dir="ltr" className="panel">
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02] rounded-t-xl">
          <span className="panel-label">{formatMessage({ id: 'general.regex' })}</span>
        </div>
        <div className="flex items-center gap-2 p-2">
          <div
            className={cx(
              'flex flex-1 items-center h-11 px-3 rounded-lg font-mono text-sm md:text-base',
              'bg-ink-950/70 border border-white/[0.06] transition-[border-color,box-shadow]',
              'focus-within:border-regreen-400/40 focus-within:shadow-[0_0_0_3px_rgb(95_245_155/0.08)]',
            )}
          >
            <span className="text-neutral-600">/</span>
            <input
              ref={regexInput}
              aria-label={formatMessage({ id: 'general.regex' })}
              className="border-0 px-1 flex-1 focus:outline-none font-mono text-sm md:text-base text-regreen-400 bg-transparent focus:ring-0 w-full"
              type="text"
              onChange={event => setRegex(event.currentTarget.value)}
              value={regex}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            <span className="text-neutral-600">
              /<span className="text-regreen-400">{flags}</span>
            </span>
          </div>
          <FlagSelect flags={flags} setFlags={newFlags => setFlags(normalizeFlags(newFlags))} />
        </div>
      </div>

      <div
        dir="ltr"
        className="panel flex flex-col flex-1 min-h-0 overflow-hidden cursor-text"
        onClick={() => textarea.current?.focus()}
      >
        <div className="flex items-center justify-between px-4 h-9 border-b border-white/[0.05] bg-white/[0.02] shrink-0">
          <span className="panel-label">{formatMessage({ id: 'general.text' })}</span>
        </div>
        <div className="relative flex-1 min-h-0">
          <div
            ref={backdrop}
            aria-hidden
            className={cx(textLayout, 'absolute inset-0 overflow-hidden text-neutral-300 pointer-events-none')}
          >
            {highlightedText}
            {/* Keeps a trailing newline from collapsing so both layers stay the same height. */}
            {'\n'}
          </div>
          <textarea
            ref={textarea}
            aria-label={formatMessage({ id: 'general.text' })}
            className={cx(
              textLayout,
              'absolute inset-0 w-full h-full resize-none overflow-y-auto overflow-x-hidden',
              'bg-transparent border-0 text-transparent caret-neutral-100 focus:ring-0 focus:outline-none',
              'placeholder:text-neutral-600 selection:bg-regreen-400/30 selection:text-transparent',
            )}
            value={text}
            onChange={event => setText(event.currentTarget.value)}
            onScroll={syncScroll}
            onKeyDown={onTextKeyDown}
            placeholder="Text here"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
