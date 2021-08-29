import "./step.scss";

import { useState, useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import _ from "lodash";

function Steps({ data }) {
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
  }, [data.title]);

  useEffect(() => {
    try {
      const reg = new RegExp(regex, data.flags);
      const regResult = [...data.content.matchAll(reg)]
        .map((res) => res[0])
        .filter((res) => !!res);
      setResult(regResult);
      const isSuccess = _.isEmpty(_.xor(data.answer, regResult));

      if (isSuccess) {
        toast.success("Step 1 - Completed", { theme: "colored" });
        setError(false);
      } else {
        toast.dismiss();
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }, [regex]);

  return (
    <div className="step">
      <h2 className="step-title">
        <FormattedMessage id={data.title} />
      </h2>
      <p className="step-description">
        <FormattedMessage id={data.description} />
      </p>
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
        <div className="step-input">
          <input
            ref={regexInput}
            type="text"
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
