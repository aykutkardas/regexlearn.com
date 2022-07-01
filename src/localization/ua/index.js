import cheatsheet from './cheatsheet.json';
import general from './general.json';
import landing from './landing.json';
import learn from './learn.json';
import lessons from './lessons.json';

const messages = {
  ...cheatsheet,
  ...general,
  ...landing,
  ...learn,
  ...lessons,
};

export default messages;
