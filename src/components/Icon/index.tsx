import IcoMoon, { IconComponent } from 'react-icomoon';

const iconSet = require('./selection.json');

const Icon: typeof IconComponent = props => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
