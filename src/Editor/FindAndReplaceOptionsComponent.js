import classNames from 'classnames';
import React from 'react';

/// xxx(138) /*FindAndReplaceOptionsComponent*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(14)/*classnames*/;  // 1 times
/// var o = n.n(i);
class s extends React.Component {
    renderItems(e) {
        return e.map(e => {
            if (! ((this.props.hiddenKeys || []).indexOf(e.key) >= 0)) return React.createElement("sb-item", {
                style: e.style,
                class: classNames({
                    selected: this.props.selectedKeys.indexOf(e.key) >= 0,
                    disabled: (this.props.disabledKeys || []).indexOf(e.key) >= 0 || this.props.disabled
                }),
                key: e.key,
                onMouseDown: t => {
                    this.props.preventDefault && t.preventDefault();
                    this.props.stopPropagation && t.stopPropagation();
                    this.props.onSelect && this.props.onSelect(e)
                }
            },
            e.element)
        })
    }
    render() {
        return React.createElement("select-buttons", {
            style: this.props.style,
            class: "setting-group-options"
        },
        this.renderItems(this.props.items))
    }
}

export default s