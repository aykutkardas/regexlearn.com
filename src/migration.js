const lookie = require("lookie").default;

export async function migration() {
  if (typeof window === "undefined") return;

  const isOlderCookie = typeof lookie.get('lastStep') === 'number';

  if (!isOlderCookie) return;

  await lookie.set('lesson.regex101', {
    currentStep: lookie.get('currentStep'),
    lastStep: lookie.get('lastStep'),
  });

  await lookie.remove('currentStep');
  await lookie.remove('lastStep');
}
