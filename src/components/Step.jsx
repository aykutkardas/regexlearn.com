import { FormattedMessage } from "react-intl";

function Steps({ data }) {
  return (
    <div className="step">
      <h2>
        <FormattedMessage id={data.title} />
      </h2>
      <p>
        <FormattedMessage id={data.description} />
      </p>
    </div>
  );
}

export default Steps;
