import "./step.scss";

import { useState, useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import _ from "lodash";

function Steps({ data, step }) {
  const [regex, setRegex] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setError(false);
    setResult([]);
    setRegex("");
    if (regexInput) {
      regexInput.current.focus();
    }
  }, [step]);

  useEffect(() => {
    try {
      const reg = new RegExp(regex, data.flags);
      const regResult = [...data.content.matchAll(reg)]
        .map((res) => res[0])
        .filter((res) => !!res);
      setResult(regResult);
      const isSuccess = _.isEmpty(_.xor(data.answer, regResult));

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
          }
        );
        setError(false);
      } else {
        toast.dismiss();
        setError(true);
      }
    } catch (err) {
      setError(true);
      setResult([]);
    }
  }, [regex]);

  return (
    <div className="step" key={step}>
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
        className="step-block"
        data-title={formatMessage({ id: "general.text" })}
      >
        {data.content}
      </div>
      <div
        className="step-block"
        data-title={formatMessage({ id: "general.regex" })}
      >
        <div className="step-input" data-flags={data.flags}>
          <input
            ref={regexInput}
            key={step}
            type="text"
            style={{
              width: regex.length * 15 || 50,
            }}
            value={regex || data.initialValue || ""}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={formatMessage({ id: "general.regex" }).toLowerCase()}
            spellCheck={false}
          />
        </div>
      </div>
      <div
        className={"step-block " + (error ? "error" : "")}
        data-title={formatMessage({ id: "general.result" })}
      >
        {result.map((item, index) => (
          <span key={index} className="step-result-tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Steps;
