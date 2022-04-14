import IcoMoon, { IconProps } from 'react-icomoon';

const iconSet = require('./selection.json');

const Icon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
