import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from '../Elements/BaseComponent';
import BlockHelper from '../Elements/BlockHelper';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import ModalDialogContainer from '../Editor/ModalDialogContainer';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1624) /*LatexTableTemplateHandler*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 43 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var C = n(2)/*lodash*/;  // 2 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var O = n(13)/*CreateEditorObject*/;  // 10 times
/// var k = n(6)/*DiagramIdHelper*/;  // 3 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 1 times
class LatexTableTemplateContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.handleKeyDown = (e) => {
            switch (e.keyCode) {
            case 37:
                return this.props.onArrow("left");
            case 38:
                return this.props.onArrow("top");
            case 39:
                return this.props.onArrow("right");
            case 40:
                return this.props.onArrow("bottom");
            case 13:
                return this.props.onArrow("enter");
            }
        };
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            ReactDOM.findDOMNode(this).focus();
        });
    }
    render() {
        return React.createElement("div", {
            style: _.assignIn({},
            this.props.style, {
                outline: "none"
            }),
            tabIndex: -1,
            onKeyDown: this.handleKeyDown
        },
        this.props.children);
    }
}
class LatexTableTemplate extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selected: {
                row: 0,
                column: 0
            }
        };
        this.models = [this.make({
            hLines: [{
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            }],
            vLines: [{
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            }]
        }), this.make({}), this.make({
            hLines: [{
                nOfLines: 1
            },
            {
                nOfLines: 2
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            }],
            vLines: [{
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            },
            {
                nOfLines: 1
            }]
        },
        true), this.make({
            hLines: [{
                nOfLines: 1,
                booktabRule: true
            },
            {
                nOfLines: 1,
                booktabRule: true
            },
            null, {
                nOfLines: 1,
                booktabRule: true
            }]
        },
        false), this.make({
            hLines: [{
                nOfLines: 1,
                booktabRule: true
            },
            {
                nOfLines: 1,
                booktabRule: true
            },
            null, {
                nOfLines: 1,
                booktabRule: true
            }]
        },
        true)];
        this.handleArrowKey = (e) => {
            var t = Math.floor((this.models.length - 1) / 4);
            var n = this.state.selected;
            var r = n.row;
            var a = n.column;
            var i = r;
            if ("left" == e) {
                if (a - 1 < 0) {
                    if (i > 0) {
                        a = 3;
                        i--;
                    }
                } else {
                    a--;
                }
            }
            if ("top" == e && i > 0) {
                i--;
            }
            if ("right" == e) {
                if (a + 1 > this.maxColumnOf(i)) {
                    if (i < t) {
                        a = 0;
                        i++;
                    }
                } else {
                    a++;
                }
            }
            if ("bottom" == e && i + 1 <= t) {
                i++;
                a = Math.min(a, this.maxColumnOf(i));
            }
            if ("enter" != e) {
                this.setState({
                    selected: {
                        row: i,
                        column: Math.max(0, a)
                    }
                });
            } else {
                this.props.onOk(this.getCurrentModel());
            }
        };
    }
    make(e, t) {
        var n = _.assignIn({
            id: DiagramIdHelper.nextId(),
            type: "composite",
            text: "\\latex-table",
            column: 3,
            row: 3,
            elements: {
                "0_0": CreateEditorObject.createEmptyEditor(),
                "0_1": CreateEditorObject.createEmptyEditor(),
                "0_2": CreateEditorObject.createEmptyEditor(),
                "1_0": CreateEditorObject.createEmptyEditor(),
                "1_1": CreateEditorObject.createEmptyEditor(),
                "1_2": CreateEditorObject.createEmptyEditor(),
                "2_0": CreateEditorObject.createEmptyEditor(),
                "2_1": CreateEditorObject.createEmptyEditor(),
                "2_2": CreateEditorObject.createEmptyEditor()
            }
        },
        e);
        return t && (n.elements["0_0"].colSpan = 3, n.elements["0_1"].hidden = true, n.elements["0_2"].hidden = true),
        n;
    }
    getSvgStyle(e, t) {
        return {
            border: e === this.state.selected.row && t === this.state.selected.column ? "2px solid #47af4c" : "2px solid transparent",
            width: 110,
            height: 75
        };
    }
    maxColumnOf(e) {
        return Math.min(4, this.models.length - 4 * e) - 1;
    }
    getCurrentModel() {
        var e = 4 * this.state.selected.row + this.state.selected.column;
        return this.models[e];
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: 500,
                maxWidth: "95vw"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Ok",
            message: "",
            isProgressing: false,
            onOk: () => {
                this.props.onOk(this.getCurrentModel());
            },
            onCancel: this.props.onClose,
            onNo: this.props.onClose,
            isOkDisabled: false,
            show: true
        },
        React.createElement("div", null, React.createElement(LatexTableTemplateContainer, {
            onArrow: this.handleArrowKey,
            style: {
                width: "100%",
                display: "flex",
                flexDirection: "row",
                marginBottom: 5,
                flexWrap: "wrap"
            }
        },
        React.createElement("svg", {
            style: this.getSvgStyle(0, 0),
            onClick: () => {
                return this.setState({
                    selected: {
                        row: 0,
                        column: 0
                    }
                });
            }
        },
        React.createElement("g", {
            style: {
                stroke: "black"
            }
        },
        React.createElement("path", {
            d: "M10,10 L100,10"
        }), React.createElement("path", {
            d: "M10,25 L100,25"
        }), React.createElement("path", {
            d: "M10,40 L100,40"
        }), React.createElement("path", {
            d: "M10,55 L100,55"
        }), React.createElement("path", {
            d: "M10,10 L10,55"
        }), React.createElement("path", {
            d: "M40,10 L40,55"
        }), React.createElement("path", {
            d: "M70,10 L70,55"
        }), React.createElement("path", {
            d: "M100,10 L100,55"
        }), this.box(14, 14), this.box(44, 14), this.box(74, 14), this.box(14, 29), this.box(44, 29), this.box(74, 29), this.box(14, 44), this.box(44, 44), this.box(74, 44))), React.createElement("svg", {
            style: this.getSvgStyle(0, 1),
            onClick: () => {
                return this.setState({
                    selected: {
                        row: 0,
                        column: 1
                    }
                });
            }
        },
        React.createElement("g", {
            style: {
                stroke: "black"
            }
        },
        this.box(14, 14), this.box(44, 14), this.box(74, 14), this.box(14, 29), this.box(44, 29), this.box(74, 29), this.box(14, 44), this.box(44, 44), this.box(74, 44))), React.createElement("svg", {
            style: this.getSvgStyle(0, 2),
            onClick: () => {
                return this.setState({
                    selected: {
                        row: 0,
                        column: 2
                    }
                });
            }
        },
        React.createElement("g", {
            style: {
                stroke: "black"
            }
        },
        React.createElement("path", {
            d: "M10,10 L100,10"
        }), React.createElement("path", {
            d: "M10,25 L100,25"
        }), React.createElement("path", {
            d: "M10,28 L100,28"
        }), React.createElement("path", {
            d: "M10,43 L100,43"
        }), React.createElement("path", {
            d: "M10,58 L100,58"
        }), React.createElement("path", {
            d: "M10,10 L10,25"
        }), React.createElement("path", {
            d: "M10,28 L10,58"
        }), React.createElement("path", {
            d: "M40,28 L40,58"
        }), React.createElement("path", {
            d: "M70,28 L70,58"
        }), React.createElement("path", {
            d: "M100,10 L100,25"
        }), React.createElement("path", {
            d: "M100,28 L100,58"
        }), this.box(14, 14, 82), this.box(14, 32), this.box(44, 32), this.box(74, 32), this.box(14, 47), this.box(44, 47), this.box(74, 47))), React.createElement("svg", {
            style: this.getSvgStyle(0, 3),
            onClick: () => {
                return this.setState({
                    selected: {
                        row: 0,
                        column: 3
                    }
                });
            }
        },
        React.createElement("g", {
            style: {
                stroke: "black"
            }
        },
        React.createElement("path", {
            d: "M10,10 L100,10",
            style: {
                strokeWidth: 2
            }
        }), React.createElement("path", {
            d: "M10,29 L100,29"
        }), React.createElement("path", {
            d: "M10,62 L100,62",
            style: {
                strokeWidth: 2
            }
        }), this.box(14, 16), this.box(44, 16), this.box(74, 16), this.box(14, 35), this.box(44, 35), this.box(74, 35), this.box(14, 48), this.box(44, 48), this.box(74, 48))), React.createElement("svg", {
            style: this.getSvgStyle(1, 0),
            onClick: () => {
                return this.setState({
                    selected: {
                        row: 1,
                        column: 0
                    }
                });
            }
        },
        React.createElement("g", {
            style: {
                stroke: "black"
            }
        },
        React.createElement("path", {
            d: "M10,10 L100,10",
            style: {
                strokeWidth: 2
            }
        }), React.createElement("path", {
            d: "M10,29 L100,29"
        }), React.createElement("path", {
            d: "M10,62 L100,62",
            style: {
                strokeWidth: 2
            }
        }), this.box(14, 16, 82), this.box(44, 16), this.box(74, 16), this.box(14, 35), this.box(44, 35), this.box(74, 35), this.box(14, 48), this.box(44, 48), this.box(74, 48))))));
    }
    box(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 22;
        return React.createElement("rect", {
            x: e,
            y: t,
            width: n,
            height: "7",
            style: {
                fill: "lightgray",
                stroke: "none"
            }
        });
    }
}
class LatexTableTemplateHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.handleClose = () => {
            this.getTarget().closeRender(this);
        };
        this.handleOk = (e) => {
            var t = this.getTarget();
            var n = t.getController();
            var r = CreateEditorObject.createLineFromBlock(_.cloneDeep(e));
            r.style = {
                align: "center"
            };
            var a = [{
                id: DiagramIdHelper.nextId(),
                blocks: []
            },
            r, {
                id: DiagramIdHelper.nextId(),
                blocks: []
            }];
            var i = n.insertLines(a, t.getContainerModel());
            var o = _.cloneDeep(i.editorChangeInfo.selected);
            var s = BlockHelper.findLeafSelected(o);
            s.lineIndex--;
            s.charIndex = 0;
            s.key = "0_0";
            s.selected = {
                lineIndex: 0,
                charIndex: 0
            };
            i.editorChangeInfo.selected = o;
            t.handleResult(i);
            t.closeRender(this);
        };
    }
    render() {
        return React.createElement(LatexTableTemplate, {
            onClose: this.handleClose,
            onOk: this.handleOk
        });
    }
    showLatexTemplateDialog() {
        this.getTarget().requestRender(this);
    }
}
/*n.d(t, "a", function () {
    return LatexTableTemplateHandler;
})*/

export default LatexTableTemplateHandler