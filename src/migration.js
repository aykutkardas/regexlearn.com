const lookie = require("lookie").default;

export async function migration() {
  if (typeof window === "undefined") return;

  const isOlderCookie = typeof lookie.get('lastStep') === 'number';

  if (isOlderCookie) {
    await lookie.set('lesson.regex101', {
      currentStep: lookie.get('currentStep') || 0,
      lastStep: lookie.get('lastStep') || 0,
    });

    await lookie.remove('currentStep');
    await lookie.remove('lastStep');
  };

  const isValidCurrentStep = typeof lookie.get('lesson.regex101')?.currentStep === 'number';

  if (!isValidCurrentStep) {
    await lookie.set('lesson.regex101', {
      currentStep: 0,
      lastStep: 0,
    });
  }
}
