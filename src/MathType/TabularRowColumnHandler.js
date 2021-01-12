import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';
import SelectionFinder from './SelectionFinder';
import TabularBulbToggler from './TabularBulbToggler';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1608) /*TabularRowColumnHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 7 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var TabularBulbToggler = n(1650)/*TabularBulbToggler*/;  // 2 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 2 times
class TabularRowColumnInsertion extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            position: "bottom"
        };
        this.handleKeyDown = (e) => {
            if (e.preventDefault(), e.stopPropagation(), 37 != e.keyCode) {
                if (39 != e.keyCode) {
                    if (38 != e.keyCode) {
                        if (40 != e.keyCode) {
                            if (13 != e.keyCode) {
                                this.props.onClose();
                            } else {
                                this.props.onSelect(this.state.position);
                            }
                        } else {
                            this.setState({
                                position: "bottom"
                            });
                        }
                    } else {
                        this.setState({
                            position: "top"
                        });
                    }
                } else {
                    if (this.props.rowOnly) {
                        return;
                    }
                    this.setState({
                        position: "right"
                    });
                }
            } else {
                if (this.props.rowOnly) {
                    return;
                }
                this.setState({
                    position: "left"
                });
            }
        };
    }
    renderInsertLeftColumn(e) {
        if (!this.props.rowOnly) {
            return React.createElement("div", {
                style: {
                    position: "absolute",
                    left: -5,
                    top: "50%",
                    backgroundColor: "white",
                    whiteSpace: "nowrap",
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: "rgb(144,143,143) 1px 1px 2px",
                    marginRight: 2,
                    transform: "translate(-100%,-50%)",
                    border: "left" == e ? "1px solid green" : "1px solid #c3c2c2",
                    fontSize: 11,
                    color: "left" == e ? "green" : "black",
                    zIndex: 999999
                }
            },
            "Left Column");
        }
    }
    renderInsertRightColumn(e) {
        if (!this.props.rowOnly) {
            return React.createElement("div", {
                style: {
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    backgroundColor: "white",
                    whiteSpace: "nowrap",
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: "rgb(144,143,143) 1px 1px 2px",
                    marginLeft: 5,
                    transform: "translate(0,-50%)",
                    border: "right" == e ? "1px solid green" : "1px solid #c3c2c2",
                    fontSize: 11,
                    color: "right" == e ? "green" : "black",
                    zIndex: 999999
                }
            },
            "Right Column");
        }
    }
    renderInsertRowAbove(e) {
        return React.createElement("div", {
            style: {
                position: "absolute",
                top: -5,
                left: "50%",
                transform: "translate(-50%,-100%)",
                backgroundColor: "white",
                whiteSpace: "nowrap",
                padding: 3,
                borderRadius: 2,
                boxShadow: "rgb(144,143,143) 1px 1px 2px",
                marginBottom: 2,
                border: "top" == e ? "1px solid green" : "1px solid #c3c2c2",
                fontSize: 11,
                color: "top" == e ? "green" : "black",
                zIndex: 999999
            }
        },
        "Row Above");
    }
    renderInsertRowBelow(e) {
        return React.createElement("div", {
            style: {
                position: "absolute",
                top: "100%",
                left: "50%",
                backgroundColor: "white",
                whiteSpace: "nowrap",
                padding: 3,
                borderRadius: 2,
                boxShadow: "rgb(144,143,143) 1px 1px 2px",
                marginTop: 5,
                transform: "translateX(-50%)",
                border: "bottom" == e ? "1px solid green" : "1px solid #c3c2c2",
                fontSize: 11,
                color: "bottom" == e ? "green" : "black",
                zIndex: 999999
            }
        },
        "Row Below");
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            ReactDOM.findDOMNode(this).focus();
        });
        var e = SelectionFinder.getSelectedEditor(this.props.editor, this.props.selected);
        this.jBulb = TabularBulbToggler.tempraryHide(e);
    }
    componentWillUnmount() {
        if (this.jBulb) {
            TabularBulbToggler.restore(this.jBulb);
        }
    }
    render() {
        var e = this.props;
        var t = e.editor;
        var n = e.selected;
        var r = e.baseElement;
        var i = SelectionFinder.getSelectedEditor(t, n);
        var s = DOMHelper.findRectElementToElement(i.parentElement, r);
        var l = _.assignIn({},
        {
            width: 100,
            height: 100,
            position: "absolute",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: '"Segoe UI",Arial,Verdana,sans-serif'
        },
        {
            width: s.width,
            height: s.height,
            top: s.top,
            left: s.left
        });
        return React.createElement("div", {
            "data-test-select": "row-column-insertion",
            style: l,
            tabIndex: -1,
            onKeyDown: this.handleKeyDown
        },
        this.renderInsertLeftColumn(this.state.position), this.renderInsertRightColumn(this.state.position), this.renderInsertRowAbove(this.state.position), this.renderInsertRowBelow(this.state.position));
    }
}
class TabularRowColumnHandler {
    constructor(e) {
        this.target = e;
        this.handleClose = () => {
            this.clear();
            this.target.hidenInputFocus();
        };
        this.handleSelect = (e) => {
            var t = DOMHelper.findTabularReactInstance(this.target.getContainerModel().cursorPos);
            switch (e) {
            case "left":
                t.insertColumnOnLeft();
                break;
            case "top":
                t.insertRowAbove();
                break;
            case "right":
                t.insertColumnOnRight(true);
                break;
            case "bottom":
                t.insertRowBelow(true);
            }
        };
    }
    show() {
        this.target.requestRender(this);
    }
    clear() {
        this.target.closeRender(this);
    }
    render() {
        var e = this.target.getContainerModel();
        return React.createElement(TabularRowColumnInsertion, {
            rowOnly: e.isPlotCasesSelected(),
            onClose: this.handleClose,
            onSelect: this.handleSelect,
            baseElement: this.target.getMathTypeHtmlElement(),
            selected: e.cursorSelected,
            editor: this.target.getEditorHtmlElement()
        });
    }
}
/*n.d(t, "a", function () {
    return TabularRowColumnHandler;
})*/

export default TabularRowColumnHandler