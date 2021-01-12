import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockHelper from './BlockHelper';
import DataChangeModel from '../Editor/DataChangeModel';
import EventHelper from '../Mathcha/EventHelper';
import InputWrapper from './InputWrapper';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(239) /*LineTagSetting*/

/*n.d(t, "a", function () {
    return y
});*/
/// var r = n(0)/*React*/;  // 12 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 3 times
/// var l = n.n(s);
/// var c = n(5)/*sizzle*/;  // 1 times
/// var d = n.n(c);
/// var h = n(24)/*EventHelper*/;  // 2 times
/// var u = n(203)/*DataChangeModel*/;  // 1 times
/// var p = n(7)/*PropUpdateHelper*/;  // 6 times
/// var m = n(12)/*BlockHelper*/;  // 1 times
/// var f = n(118)/*InputWrapper*/;  // 1 times
/// var g = n(19)/*TimerHelper*/;  // 2 times
class y extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showSetting: false
        };
        this.onTagInfoChanged = (e, t) => {
            if (e) {
                this.props.onTagInfoChanged(e, DataChangeModel.getBuilder().withFocusAcquired().withPreventScroll().build());
            } else {
                this.props.onTagInfoChanged(e, null);
            }
        };
        this.handleTagMouseDown = (e) => {
            if (e.stopPropagation(), !this.isSelectModeOnly()) {
                if (this.props.tagInfo && this.props.tagInfo.type) {
                    this.setState({
                        showSetting: true
                    });
                } else {
                    var t = this.props.tagInfo || {};
                    if (! (t = PropUpdateHelper.setProp(t, "type", "auto")).tagId) {
                        t = PropUpdateHelper.setProp(t, "tagId", BlockHelper.nextTagId());
                    }
                    this.onTagInfoChanged(t, false);
                }
            }
        };
    }
    isSelectModeOnly() {
        var e = jQuery(ReactDOM.findDOMNode(this)).closest("math-type");
        return e.hasClass("read-only") || e.hasClass("select-only");
    }
    renderTagSetting() {
        return React.createElement(A, {
            onClose: () => {
                return this.setState({
                    showSetting: false
                });
            },
            tagInfo: this.props.tagInfo,
            onTagInfoChanged: this.onTagInfoChanged
        });
    }
    render() {
        var e = this.state.showSetting ? this.renderTagSetting() : null;
        var t = this.props.tagInfo;
        if (t && t.type) {
            var n = t && t.tagId;
            var r = "(?)";
            return "custom" == t.type ? t.tagName && (r = "(".concat(t.tagName, ")")) : r = "",
            React.createElement("ref-tag", {
                style: this.props.existStyle,
                onMouseDown: this.handleTagMouseDown,
                class: classNames("line-tag", {
                    automatic: "auto" == t.type
                }),
                id: n,
                "data-tag-id": n
            },
            React.createElement("label", null, r), e);
        }
        return React.createElement("ref-tag", {
            style: this.props.emptyStyle,
            onMouseDown: this.handleTagMouseDown,
            class: "empty-line-tag"
        },
        React.createElement("label", null, "(...)"), e);
    }
}
class A extends React.Component {
    constructor() {
        super(...arguments);
        this.onTagNameChanged = (e) => {
            var t = this.props.tagInfo;
            this.props.onTagInfoChanged(PropUpdateHelper.setProp(t, "tagName", e), true);
        };
        this.onBlur = () => {
            this.isRealBlur = true;
            TimerHelper.next(() => {
                if (this.isRealBlur) {
                    this.props.onClose();
                }
            });
        };
        this.onFocus = () => {
            this.isRealBlur = false;
        };
    }
    componentDidMount() {
        TimerHelper.next(() => {
            this.tagSetting.focus();
        });
    }
    onSelectMouseDown(e) {
        var t = this.props.tagInfo;
        if (t && t.type === e) {
            this.props.onTagInfoChanged(PropUpdateHelper.setProp(t, "type", void 0), false);
        } else {
            if (!t) {
                t = {};
            }
            if (! ("custom" != e || t.tagName)) {
                t = PropUpdateHelper.setProp(t, "tagName", "");
            }
            this.props.onTagInfoChanged(PropUpdateHelper.setProp(t, "type", e), false);
        }
    }
    renderTagNameInput() {
        var e = this.props.tagInfo;
        if (e && "custom" == e.type) {
            return InputWrapper.wrapInput(React.createElement("input", {
                autoCorrect: "off",
                autoCapitalize: "off",
                value: e.tagName,
                onMouseDown: (e) => {
                    return e.stopPropagation();
                },
                onKeyDown: (e) => {
                    return e.stopPropagation();
                },
                onKeyUp: (e) => {
                    return e.stopPropagation();
                },
                onChange: (e) => {
                    this.onTagNameChanged(e.target.value);
                }
            }), {
                height: 17,
                width: 70,
                marginLeft: 1
            });
        }
    }
    render() {
        var e = this.props.tagInfo;
        return React.createElement("x-setting", {
            class: "mt-common-dialog line-tag-setting no-print",
            ref: (e) => {
                return this.tagSetting = e;
            },
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            tabIndex: -1,
            onMouseDown: EventHelper.onMouseDownStopPropagation,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement("main-setting", {
            class: "setting-group-options",
            style: {
                display: "flex"
            }
        },
        React.createElement("i", {
            onMouseDown: () => {
                return this.onSelectMouseDown("auto");
            },
            className: classNames({
                selected: e && "auto" == e.type
            })
        },
        "(1)"), React.createElement("i", {
            onMouseDown: () => {
                return this.onSelectMouseDown("custom");
            },
            className: classNames({
                selected: e && "custom" == e.type
            })
        },
        "(A)"), this.renderTagNameInput()));
    }
}

export default y