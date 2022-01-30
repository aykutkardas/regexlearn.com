import IcoMoon from 'react-icomoon';

const iconSet = require('./selection.json');

type IconArgs = {
  icon: string;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: Function;
  removeInlineStyle?: boolean;
};

const Icon = (props: IconArgs) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
