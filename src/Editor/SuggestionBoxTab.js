import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import Global from '../Global';

/// xxx(452) /*SuggestionBoxTab*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3);  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
/// var s = n(11)/*Global*/;  // 1 times
/// var l = n(14)/*classnames*/;  // 1 times
/// var c = n.n(l);
class d extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.itemStyle = {
            padding: "3px 7px",
            cursor: "pointer"
        };
        this.handleMouseEnter = (e) => {
            this.setState({
                hoverKey: e
            })
        };
        this.handleMouseOut = (e) => {
            if (this.state.hoverKey === e) this.setState({
                hoverKey: null
            })
        }
    }
    renderItem(e) {
        var t = this.itemStyle;
        if (Global.isMobileOrTablet()) t = _.assignIn({},
        t, {
            padding: " 5px 7px"
        });
        if (e.key === this.props.selectedKey) t = _.assignIn({},
        t, {
            borderBottom: "2px solid rgba(174,180,173,0.76)"
        });
        else if (e.key === this.state.hoverKey) t = _.assignIn({},
        t, {
            borderBottom: "2px solid rgba(174,180,173,0.36)"
        });
        return React.createElement("div", {
            className: classNames("role-tab-item", {
                selected: e.key === this.props.selectedKey
            }),
            key: e.key,
            style: t,
            onMouseEnter: () => {
                return this.handleMouseEnter(e.key)
            },
            onMouseOut: () => {
                return this.handleMouseOut(e.key)
            },
            onClick: () => {
                if (this.props.onSelect) this.props.onSelect(e.key)
            }
        },
        e.value)
    }
    render() {
        return React.createElement("div", {
            style: {
                display: "flex",
                borderTop: "1px solid rgba(175,175,175,0.2)",
                marginTop: 3,
                paddingTop: 4,
                paddingBottom: 2,
                fontSize: 10
            }
        },
        this.props.items.map((e) => {
            return this.renderItem(e)
        }))
    }
}

export default d