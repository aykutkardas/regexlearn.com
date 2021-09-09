import "./step.scss";

import { useState, useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import _ from "lodash";

import Hint from "../Hint";

function Steps({ data, step }) {
  const [regex, setRegex] = useState(data.initialValue || "");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setError(false);
    setSuccess(false);
    setContent(data.content);
    setRegex(data.initialValue || "");
    checkRegex();
    if (regexInput) {
      regexInput.current.focus();
    }
  }, [step]);

  const checkRegex = () => {
    try {
      let $regex = regex;
      [...$regex.matchAll(/\\(\d+)/g)].forEach((item) => {
        $regex = $regex.replace("\\" + item[1], "\\" + (parseInt(item[1]) + 1));
      });

      const reg = new RegExp("(" + $regex + ")", data.flags);
      const regResult = [...data.content.matchAll(reg)]
        .map((res) => res[0])
        .filter((res) => !!res);
      const isSuccess =
        data.answer.length === regResult.length &&
        _.isEmpty(_.xor(data.answer, regResult));

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
        setSuccess(true);
      } else {
        toast.dismiss();
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(checkRegex, [regex]);

  return (
    <div className={"step " + (error ? "error" : "")} key={step}>
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
        className="step-block"
        data-title={formatMessage({ id: "general.regex" })}
      >
        <Hint regex={data.regex} flags={data.flags} />

        <div className="step-input" data-flags={data.flags}>
          <input
            ref={regexInput}
            key={step}
            type="text"
            readOnly={success}
            style={{
              width: regex.length * 15 || 50,
            }}
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={formatMessage({ id: "general.regex" }).toLowerCase()}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Steps;
