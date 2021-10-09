import IcoMoon from "react-icomoon";

const iconSet = require("./selection.json");

const Icon = ({ ...props }) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
