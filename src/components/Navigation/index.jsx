import "./navigation.scss";

function Navigation({ steps, step, nextStep, prevStep }) {
  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          onClick={prevStep}
        >
          Prev Step
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className="navigation-step navigation-next-step"
          onClick={nextStep}
        >
          Next Step
        </div>
      )}
    </div>
  );
}

export default Navigation;
