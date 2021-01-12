import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import SelectionBuilder from './SelectionBuilder';
import TimerHelper from '../Mathcha/TimerHelper';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(1623) /*SelectionHandler*/

/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
/// var c = n(14)/*classnames*/;  // 1 times
/// var d = n.n(c);
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 2 times
/// var ba = n(70)/*TransformHelper*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 1 times
class Selection extends React.Component {
    constructor() {
        super(...arguments);
        this.latestHandler = TimerHelper.createLaterRunObject("latest", "a-little-while");
        this.state = {
            rects: [],
            isActive: true
        };
    }
    clearInfo() {
        this.setState({
            rects: []
        });
    }
    shouldComponentUpdate(e, t) {
        return t.rects != this.state.rects || t.isActive != this.state.isActive;
    }
    setActive(e) {
        this.latestHandler.later(() => {
            if (this.state.isActive != e) {
                this.setState({
                    isActive: e
                });
            }
        });
    }
    setTextSelectionInfo(e, t) {
        this.innerSetSelectionInfo(e, t);
    }
    setListTypeSelectionInfo(e, t) {
        this.innerSetSelectionInfo(e, t);
    }
    innerSetSelectionInfo(e, t) {
        if (t) {
            return TimerHelper.next(() => {
                this.innerSetSelectionInfo(e, false);
            });
        }
        this.selectionInfo = e;
        var n = SelectionBuilder.buildSelectionRectsFromEditor(e);
        this.setState({
            rects: n
        });
    }
    refresh(e) {
        if (this.state.rects && 0 != this.state.rects.length) {
            this.innerSetSelectionInfo(this.selectionInfo, e);
        }
    }
    getRectElement(e, t) {
        var n = {
            transform: (new TransformHelper).translate(Math.round(e.left), Math.round(e.top)).scale(e.width / 100, (e.height + 1) / 100).toCssStyle()
        };
        return React.createElement("x-selection", {
            key: t,
            style: n
        });
    }
    renderRects() {
        return _.map(this.state.rects, (e, t) => {
            return this.getRectElement(e, t);
        });
    }
    render() {
        return React.createElement("selection-wrapper", {
            class: classNames({
                inactive: !this.state.isActive
            })
        },
            this.renderRects());
    }
}
class SelectionHandler {
    constructor(e) {
        this.target = e;
        this.getSelectionRef = (e) => {
            this.selection = e;
        };
    }
    renderSelection() {
        return React.createElement(Selection, {
            ref: this.getSelectionRef
        });
    }
    getSelection() {
        return this.selection;
    }
    handleSelectionChanged(e, t) {
        if (t.mainSelected) {
            if (t.extendedMainSelected) {
                this.selection.setTextSelectionInfo(this.buildTextSelectionInfo(t.extendedMainSelected, t.mainSelected), false);
            } else {
                this.selection.clearInfo();
                var n = BlockHelper.findLeafSelected(t.mainSelected);
                if (this.isListItemSelected(n)) {
                    this.selection.setListTypeSelectionInfo(this.buildListTypeSelectionInfo(t.mainSelected, n), false);
                }
            }
        } else {
            if (this.selection) this.selection.clearInfo();
        }
    }
    clearExtendedSelected() {
        this.target.setState({
            extendedMainSelected: null
        });
    }
    clearSelected() {
        this.target.setState({
            mainSelected: null,
            extendedMainSelected: null
        });
    }
    setSelected(e) {
        this.target.setState({
            mainSelected: e,
            extendedMainSelected: null
        });
    }
    setSelection(e, t) {
        this.target.setState({
            mainSelected: t,
            extendedMainSelected: e
        });
    }
    extendSelection(e) {
        if (this.target.state.extendedMainSelected) {
            this.target.setState({
                mainSelected: e
            });
        } else {
            this.target.setState({
                extendedMainSelected: this.target.state.mainSelected,
                mainSelected: e
            });
        }
    }
    buildTextSelectionInfo(e, t) {
        return {
            rootEditor: this.target.getEditorHtmlElement(),
            extendSelected: e,
            selected: t,
            elementToCalculate: this.target.getMathTypeHtmlElement(),
            type: "text-selection"
        };
    }
    buildListTypeSelectionInfo(e, t) {
        return {
            rootEditor: this.target.getEditorHtmlElement(),
            selected: e,
            leafSelected: t,
            elementToCalculate: this.target.getMathTypeHtmlElement(),
            type: "list-type-selection"
        };
    }
    isListItemSelected(e) {
        return e && e.controlled && !!e.listTypeSelect;
    }
    refreshSelection(e) {
        this.selection.refresh(e);
    }
    requestClearSelect() {
        if (this.target.state.mainSelected) {
            if (!this.clearSelectRequest) {
                this.clearSelectRequest = setTimeout(() => {
                    this.target.clearSelect();
                    this.clearSelectRequest = null;
                },
                    100);
            }
        }
    }
    cancelClearSelect() {
        if (this.clearSelectRequest) {
            clearTimeout(this.clearSelectRequest);
            this.clearSelectRequest = null;
        }
    }
}
/*n.d(t, "a", function () {
    return SelectionHandler;
})*/

export default SelectionHandler