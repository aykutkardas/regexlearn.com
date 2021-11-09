import hotkeys from "hotkeys-js";

hotkeys.filter = function (event) {
    var tagName = (event.target || event.srcElement).tagName;
    hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
    return true;
}

export default hotkeys;