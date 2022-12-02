import 'draft-js/dist/Draft.css';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { parse } from 'query-string';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
  ContentBlock,
  getDefaultKeyBinding,
} from 'draft-js';

import setCaretPosition from 'src/utils/setCaretPosition';
import FlagSelect from './FlagSelect';
import Button, { ButtonVariants } from './Button';
import copy from 'copy-to-clipboard';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function myKeyBindingFn(e): string | null {
  if (e.ctrlKey && e.key.toLowerCase() === 'm') {
    e.preventDefault();
    return null;
  }
  return getDefaultKeyBinding(e);
}

const Highlight = ({ children }) => (
  <span className="shadow-sm h-3 px-[3px] mx-[1px] py-[2px] rounded-md text-white bg-green-500">
    {children}
  </span>
);

const initText = `Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within the framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, JavaScript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.`;

const initialContent = ContentState.createFromText(initText);

const Playground = () => {
  const { formatMessage } = useIntl();
  const regexInput = useRef<HTMLInputElement>(null);
  const editor = useRef(null);
  const [hasChange, setHasChange] = useState(false);

  const [state, setState] = useState({
    regex: '',
    flags: '',
    editorState: EditorState.createEmpty(),
  });

  const [initial, setInitial] = useState({
    regex: state.regex,
    flags: state.flags,
    text: state.editorState?.getCurrentContent()?.getPlainText() || '',
  });

  const onChangeFlags = flags => {
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
    setState({
      regex: state.regex,
      flags: newFlags,
      editorState: checkRegex(state.regex, newFlags, state.editorState),
    });
    setHasChange(initial.flags !== newFlags);
  };

  const onChangeRegex = (event: FormEvent<HTMLInputElement>) => {
    const regex = event?.currentTarget?.value || '';
    setState({ ...state, regex, editorState: checkRegex(regex, state.flags, state.editorState) });
    setHasChange(initial.regex !== regex);
  };

  const onChangeContent = (editorState: EditorState) => {
    setState({ ...state, editorState });
    const nextText = editorState.getCurrentContent().getPlainText();
    if (initial.text !== nextText) {
      setHasChange(true);
    }
  };

  const checkRegex = (regex, flags, editorState) => {
    let rowIndex = 0;
    let matchCount = 0;

    if (!regex) {
      const content = editorState.getCurrentContent();
      return EditorState.createWithContent(content);
    }

    function findWithRegex(content: ContentBlock, callback: Function) {
      const isMultiple = flags.includes('m');
      const isNeededMultiple = regex.startsWith('^') || regex.endsWith('$');

      if (!isMultiple && isNeededMultiple && rowIndex > 0) return;

      const isGlobal = flags.includes('g');

      if (!isGlobal && matchCount > 0) return;

      const text = content.getText();
      const currentRegex = new RegExp(regex, isGlobal ? flags : `g${flags}`);

      let matches = [...text.matchAll(currentRegex)];

      if (!isGlobal) {
        matches = matches.slice(0, 1);
      }

      if (regex && matches.length) {
        matches.forEach(match => callback(match.index, match.index + match[0].length));
      }

      if (matches.length) {
        matchCount++;
      }

      rowIndex++;
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

    return EditorState.createWithContent(editorState.getCurrentContent(), HighlightDecorator);
  };

  const handleShare = () => {
    axios
      .post('/shares', {
        regex: state.regex,
        flags: state.flags,
        text: state.editorState.getCurrentContent().getPlainText(),
      })
      .then(res => {
        history.replaceState(null, '', `?id=${res.data._id}`);
        setInitial({
          regex: state.regex,
          flags: state.flags,
          text: state.editorState.getCurrentContent().getPlainText(),
        });
        setHasChange(false);
        copy(window.location.href);
        toast.success(formatMessage({ id: 'general.shareLinkCopied' }));
      })
      .catch(() => {
        toast.error(formatMessage({ id: 'general.somethingWentWrong' }));
      });
  };

  useEffect(() => {
    const { id } = parse(window.location.search);

    if (!id) {
      const regex = '[A-Z]\\w+';
      const flags = 'g';
      setState({
        regex,
        flags,
        editorState: checkRegex(
          regex,
          flags,
          EditorState.createWithContent(initialContent),
        ),
      });
      setInitial({ regex: state.regex, flags: state.flags, text: initialContent.getPlainText() });
      setCaretPosition(regexInput?.current, state.regex.length);
      return;
    }

    axios.get(`/shares/${id}`).then(res => {
      const { regex, flags, text } = res.data;
      setState({
        flags,
        regex,
        editorState: checkRegex(
          regex,
          flags,
          EditorState.createWithContent(ContentState.createFromText(text)),
        ),
      });
      setInitial({ regex, flags, text });
      setCaretPosition(regexInput?.current, regex.length);
    });
  }, []);

  return (
    <>
      <div
        className={cx(
          'bg-jet-500 rounded-md relative tracking-wider text-neutral-300 mb-5 mt-4',
          'w-full flex items-center',
        )}
      >
        <span className="bg-neutral-600/40 px-2 py-1 rounded-t-md ml-3 text-[10px] text-neutral-400 absolute -top-[23px]">
          {formatMessage({ id: 'general.regex' })}
        </span>
        <div className="flex items-center px-1 py-6 text-neutral-500 tracking-wider w-full rounded-md bg-neutral-600/40 h-7 md:text-sm">
          <span className="ml-3">/</span>
          <input
            ref={regexInput}
            className="border-0 px-1 flex-1 focus:outline-none md:text-sm leading-5 text-regreen-400 bg-transparent focus:ring-0 w-full"
            type="text"
            onChange={e => onChangeRegex(e)}
            value={state.regex}
            spellCheck={false}
          />
          <span>
            /<span className="text-green-500">{state.flags}</span>
          </span>
          <FlagSelect flags={state.flags} setFlags={onChangeFlags} />
        </div>
        <Button
          className="h-12 py-0 ml-2 w-fit relative"
          variant={ButtonVariants.Primary}
          onClick={handleShare}
          disabled={!hasChange}
        >
          {formatMessage({ id: 'general.share' })}
        </Button>
      </div>

      <div
        className={cx(
          'bg-jet-500 rounded-md relative tracking-wider text-neutral-300 h-auto',
          'flex flex-col text-left w-full items-start',
        )}
        onClick={() => editor.current.focus()}
      >
        <span className="bg-neutral-700/40 px-2 py-1 rounded-t-md ml-3 relative text-[10px] text-neutral-400">
          {formatMessage({ id: 'general.text' })}
        </span>
        <div className="bg-neutral-700/40 rounded-lg w-full p-2 flex">
          <div
            className={cx(
              'overflow-y-scroll h-[calc(100vh-5rem-10rem)] w-full flex md:text-sm  overflow-x-hidden !leading-7',
              '[&_.public-DraftEditor-content]:min-h-full [&_.DraftEditor-root]:w-full  [&_.public-DraftEditor-content]:ring-0',
            )}
          >
            <Editor
              ref={editor}
              editorState={state.editorState}
              onChange={onChangeContent}
              placeholder="Text here"
              keyBindingFn={myKeyBindingFn}
            />
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'dark:bg-neutral-700 dark:text-neutral-50 text-sm',
        }}
      />
    </>
  );
};

export default Playground;
