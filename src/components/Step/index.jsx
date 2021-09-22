import "./step.scss";

import { useState, useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import Mousetrap from "mousetrap";
import _ from "lodash";

import Hint from "../Hint";
import FlagBox from "../FlagBox";
import shortcuts from "../../shortcuts";
import cx from "classnames";

function Steps({ data, step, onChangeSuccess }) {
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

  useEffect(() => {
    onChangeSuccess(success);
  }, [success]);

  const checkRegex = () => {
    try {
      let $regex = regex;
      [...$regex.matchAll(/\\(\d+)/g)].forEach((item) => {
        $regex = $regex.replace("\\" + item[1], "\\" + (parseInt(item[1]) + 1));
      });

      const reg = new RegExp("(" + $regex + ")", flags);
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
        setContent(
          data.content.replace(reg, "<span class='step-result-tag'>$1</span>")
        );
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
    focusInput();
  }, [step]);

  useEffect(checkRegex, [regex, flags]);

  return (
    <div
      className={cx("step", {
        error,
        success,
        match,
      })}
    >
      <h2 className="step-title">
        <FormattedMessage id={data.title} />
      </h2>
      <p
        className="step-description"
        dangerouslySetInnerHTML={{
          __html: formatMessage({ id: data.description }).replace(
            /`(\S*?[^`]*)`/gim,
            "<span class='step-word'>$1</span>"
          ),
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
