import "./step.scss";

import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import cx from "classnames";
import Mousetrap from "mousetrap";
import _ from "lodash";

import Hint from "@components/Hint";
import FlagBox from "@components/FlagBox";

import tagWrapper from "@utils/tagWrapper";
import setCaretPosition from "@utils/setCaretPosition";

import shortcuts from "../../../../shortcuts";

function Steps({ data, step, error: parentError, onChangeSuccess }) {
  const [regex, setRegex] = useState(data.initialValue || "");
  const [flags, setFlags] = useState(data.initialFlags || "");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();

  const focusInput = () => {
    if (regexInput) {
      regexInput.current.focus();
    }
  };

  const blurInput = () => {
    if (regexInput) {
      regexInput.current.blur();
    }
  };

  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  const checkRegex = () => {
    try {
      let $regex = regex;
      [...$regex.matchAll(/\\(\d+)/g)].forEach((item) => {
        $regex = $regex.replace(
          `\\${item[1]}`,
          `\\${parseInt(item[1], 10) + 1}`
        );
      });

      const reg = new RegExp(`(${$regex})`, flags);
      const matchType = flags?.includes("g") ? "matchAll" : "match";
      const regResult = [...data.content[matchType](reg)]
        .map((res) => res[0])
        .filter((res) => !!res);

      const isMatch =
        data.answer.length === regResult.length &&
        _.isEmpty(_.xor(data.answer, regResult));

      setMatch(isMatch);

      const isSuccess =
        isMatch &&
        data.regex === regex &&
        _.isEmpty(_.xor(data.flags.split(""), flags.split("")));

      setSuccess(isSuccess);

      toast.dismiss();

      if (regex) {
        setContent(tagWrapper(data.content, reg, "step-result-tag"));
      } else {
        setContent(data.content);
      }

      if (isSuccess) {
        toast.success(
          formatMessage(
            {
              id: step
                ? "general.completedCurrentStep"
                : "general.completedStarterStep",
            },
            { step }
          ),
          {
            theme: "colored",
            autoClose: false,
            position: "top-center",
          }
        );

        setError(false);
      } else if (isMatch) {
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.focus, (e) => {
      e.preventDefault();
      focusInput();
    });

    return () => Mousetrap.unbindGlobal(shortcuts.focus);
  }, []);

  useEffect(() => {
    setError(false);
    setSuccess(false);
    setContent(data.content);
    setFlags(data.initialFlags);
    setRegex(data.initialValue || "");
    checkRegex();
    blurInput();
    setTimeout(() => {
      setCaretPosition(regexInput.current, data.cursorPosition);
      focusInput();
    }, 300);
  }, [step, data.cursorPosition]);

  useEffect(checkRegex, [regex, flags]);

  const description = formatMessage({ id: data.description });

  return (
    <div
      className={cx("step", {
        error,
        success,
        match,
        parentError,
      })}
    >
      <h2
        className="step-title"
        dangerouslySetInnerHTML={{
          __html: tagWrapper(
            formatMessage({ id: data.title }),
            /`(\S*?[^`]*)`/gim,
            "step-word"
          ).replace(/\\n/gim, "<br/>"),
        }}
      />
      <p
        className="step-description"
        dangerouslySetInnerHTML={{
          __html: tagWrapper(description, /`(\S*?[^`]*)`/gim, "step-word"),
        }}
      />
      <div
        className="step-block step-block-content"
        data-title={formatMessage({ id: "general.text" })}
        dangerouslySetInnerHTML={{
          __html: (content || data.content).replace(/\n/gm, "<br />"),
        }}
      />
      <div
        className="step-block step-block-regex"
        data-title={formatMessage({ id: "general.regex" })}
      >
        <Hint regex={data.regex} flags={data.flags} />
        <div className="step-input" data-flags={flags}>
          <input
            ref={regexInput}
            key={step}
            type="text"
            style={{ width: regex.length * 15 || 50 }}
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={formatMessage({ id: "general.regex" }).toLowerCase()}
            spellCheck={false}
          />
        </div>
        {data.useFlagsControl && <FlagBox flags={flags} setFlags={setFlags} />}
      </div>
    </div>
  );
}

export default Steps;
