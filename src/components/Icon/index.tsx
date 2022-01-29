import IcoMoon from 'react-icomoon';

const iconSet = require('./selection.json');

type IconArgs = {
  icon: string;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: Function;
};

const Icon: React.FC<IconArgs> = ({ icon, ...props }) => (
  <IcoMoon iconSet={iconSet} icon={icon} {...props} />
);

export default Icon;
