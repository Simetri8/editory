import classNames from 'classnames';
import React from 'react';
import ToolbarIcons from './Toolbar/ToolbarIcons';

/// xxx(257) /*DocumentIcons*/

/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
/// var i = n(14)/*classnames*/;  // 2 times
/// var o = n.n(i);
/// var s = n(37)/*ToolbarIcons*/;  // 4 times
var DocumentIcons = {
    addDocument: (e, t) => React.createElement("x-icon", {
        title: "Create New Document",
        onClick: e ? null : t,
        class: classNames("composite-icon", {
            disabled: e
        }),
        style: {
            position: "relative"
        }
    },
    e ? ToolbarIcons.newFileDisabled : ToolbarIcons.newFile),
    addDirectory: (e, t) => React.createElement("x-icon", {
        title: "Create New Directory",
        onClick: e ? null : t,
        class: classNames("composite-icon", {
            disabled: e
        }),
        style: {
            position: "relative"
        }
    },
    e ? ToolbarIcons.newFolderDisabled : ToolbarIcons.newFolder)
}

export default DocumentIcons