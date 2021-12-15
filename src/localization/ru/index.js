import cheatsheet from './cheatsheet.json';
import general from './general.json';
import landing from './landing.json';
import learn from './learn.json';

const messages = {
  ...cheatsheet,
  ...general,
  ...landing,
  ...learn,
};

export default messages;
