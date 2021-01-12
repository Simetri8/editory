import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Global from '../Global';
import InputWrapper from '../Elements/InputWrapper';
import IsNumber, { IsNumberC } from '../Mathcha/IsNumber';
import MovingHandler from '../Editor/MovingHandler';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(195) /*PrintSettingsMarginInput*/

/// var r = n(3);  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 1 times
/// var l = n.n(s);
/// var c = n(118)/*InputWrapper*/;  // 2 times
/// var d = n(11)/*Global*/;  // 2 times
/// var h = n(16)/*ReactDOM*/;  // 1 times
/// var u = n(57)/*MovingHandler*/;  // 1 times
/// var f = n(179)/*IsNumber*/;  // 5 times
/// var g = n(19)/*TimerHelper*/;  // 1 times
var p = () => {};
var m = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    var n = t.resetOnSpecialKeys || false;
    var r = t.getSpecificEventData || (() => {
        return {}
    });
    var i = t.onDragStart || p;
    var s = t.onDragStop || p;
    var l = t.onDragMove || p;
    return class extends React.Component {
        constructor(e) {
            super(e);
            this.wasUsingSpecialKeys = false;
            this.movingHandler = new MovingHandler({
                noPreventDefault: true
            });
            this.onMouseDown = (e) => {
                if (!this.props.disableSlider) {
                    if (!this.movingHandler.baseElement) this.movingHandler.setBaseElement(Object(ReactDOM.findDOMNode)(this));
                    this.movingHandler.mouseDown(e)
                }
            };
            this.onMouseMove = (e, t, i, o) => {
                var s = o.metaKey || o.ctrlKey || o.shiftKey || o.altKey;
                if (n && this.wasUsingSpecialKeys !== s) this.wasUsingSpecialKeys = s;
                else this.setState(_.assignIn({
                    isMoving: true,
                    moveDeltaX: e.x,
                    moveDeltaY: e.y
                },
                r(o)));
                l(o)
            };
            this.state = {
                isMouseDown: false,
                isMoving: false,
                moveDeltaX: 0,
                moveDeltaY: 0
            };
            this.movingHandler.onMovingStarted = (e) => {
                this.setState({
                    isMoving: false,
                    isMouseDown: true
                });
                i(e)
            };
            this.movingHandler.onMoved = (e, t, n) => {
                s(n);
                this.setState({
                    isMoving: false,
                    isMouseDown: false
                })
            };
            this.movingHandler.onMoving = this.onMouseMove
        }
        render() {
            return React.createElement(e, Object.assign({},
            this.props, {
                dataDrag: this.state,
                onMouseDown: this.onMouseDown
            }))
        }
    }
};
class y extends React.Component {
    constructor(e) {
        super(e);
        this.onDoubleClick = (e) => {
            e.stopPropagation();
            var t = e.currentTarget;
            TimerHelper.waitALitteWhile(function () {
                t.select()
            });
            this.setState({
                startEditing: true
            })
        };
        this.onChange = (e) => {
            var t = this.props;
            var n = t.defaultUnableToParseValue;
            var r = t.decimals;
            var a = e.currentTarget.value;
            if (!Object(IsNumber)(a)) return this.setState({
                currentValue: a
            }),
            void console.log("value is not in number format");
            var i = Object(IsNumberC)(a, n, r);
            this.setState({
                currentValue: i
            });
            this.props.onValueChanged(this.safeNumber(i), true)
        };
        this.onBlur = (e) => {
            var t = this.safeNumber(this.props.value, true);
            this.setAndStopEditing(t)
        };
        this.onKeyDown = (e) => {
            var t = this.getStepValue(e, this.props.step);
            var n = this.safeNumber(this.props.value);
            var r = e.which;
            if (r === A.UP) {
                e.preventDefault();
                this.changeValue(n + t)
            } else if (r === A.DOWN) {
                e.preventDefault();
                this.changeValue(n - t)
            } else if (r === A.ENTER) {
                e.preventDefault();
                if (this.isInEditingMode()) this.setAndStopEditing(e.currentTarget.value);
                else {
                    this.setState({
                        startEditing: true
                    });
                    e.currentTarget.select()
                }
            } else if (r !== A.BACKSPACE || this.isInEditingMode()) {
                if (-1 === E.indexOf(r)) e.preventDefault()
            } else e.preventDefault();
            if (this.props.onKeyDown) this.props.onKeyDown(e)
        };
        this.onMouseDown = (e) => {
            e.stopPropagation();
            if (this.props.onMouseDown) this.props.onMouseDown(e)
        };
        this.state = {
            startEditing: !!Global.isMobileOrTablet(),
            wasUsingSpecialKeys: false,
            dragStartValue: e.value,
            currentValue: e.value
        }
    }
    isStartDrag(e) {
        return e.isMouseDown && !e.isMoving
    }
    isDragging(e) {
        return e.isMoving
    }
    isUnDrag(e, t) {
        return !t.isMouseDown && e.isMouseDown
    }
    isValueChangedNotInEditing(e, t, n) {
        return e.value != t.value && (!n || Global.isMobileOrTablet())
    }
    getVelocity() {
        return this.props.velocity || 1
    }
    componentWillReceiveProps(e) {
        if (this.isStartDrag(e.dataDrag)) this.setState({
            dragStartValue: this.props.value
        });
        else if (this.isDragging(e.dataDrag)) {
            var t = this.getStepValue(e.dataDrag, this.props.step);
            this.changeValue(this.state.dragStartValue + e.dataDrag.moveDeltaX * this.getVelocity() * t)
        } else if (this.isUnDrag(this.props.dataDrag, e.dataDrag)) this.changeValue(this.props.value, true);
        else if (this.isValueChangedNotInEditing(e, this.props, this.state.startEditing)) this.setState({
            currentValue: e.value
        })
    }
    min() {
        return this.props.min
    }
    max() {
        return this.props.max
    }
    safeNumber(e, t) {
        var n = this.props;
        var r = n.defaultUnableToParseValue;
        var a = n.decimals;
        return _.clamp(Object(IsNumberC)(e, r, t ? a : void 0), this.min(), this.max())
    }
    changeValue(e, t) {
        if ((e = this.safeNumber(e, true)) != this.state.currentValue && this.setState({
            currentValue: e
        }), t) {
            var n = this.safeNumber(this.props.value, true);
            if (n != this.props.value) this.props.onValueChanged(n)
        } else if (this.safeNumber(this.props.value, true) != e) this.props.onValueChanging(e)
    }
    setAndStopEditing(e) {
        this.changeValue(this.safeNumber(e), true);
        this.setState({
            startEditing: false
        })
    }
    getStepValue(e, t) {
        var n = t;
        return e.metaKey || e.ctrlKey ? n = n / this.props.stepModifier : e.shiftKey && (n = n * this.props.stepModifier),
        n
    }
    getCursor() {
        return this.isInEditingMode() ? "auto" : "ew-resize"
    }
    isInEditingMode() {
        return this.state.startEditing || this.props.disableSlider
    }
    render() {
        var e = this.getCursor();
        var t = !this.isInEditingMode();
        var n = this.state.currentValue;
        if (! (this.isInEditingMode() && !Object(IsNumber)(n))) n = Object(IsNumberC)(n, this.props.defaultUnableToParseValue, this.props.decimals);
        var r = _.assignIn({
            width: 20
        },
        this.props.style, {
            cursor: e,
            padding: "2px 2px 2px 2px"
        });
        return this.props.disabled ? InputWrapper.wrapInput(React.createElement("input", {
            autoCorrect: "off",
            autoCapitalize: "off",
            type: "text",
            className: this.props.className,
            readOnly: true,
            disabled: true,
            value: n,
            style: {
                cursor: e,
                textAlign: this.props.textAlign || "left"
            }
        }), _.assignIn({},
        r, {
            cursor: "default",
            background: "#f7f7f7",
            border: "1px solid #e6e5e5",
            color: "lightgray"
        })) : InputWrapper.wrapInput(React.createElement("input", {
            autoCorrect: "off",
            autoCapitalize: "off",
            type: "text",
            className: this.props.className,
            readOnly: t,
            value: n,
            style: {
                cursor: e,
                textAlign: this.props.textAlign || "left"
            },
            onKeyDown: this.onKeyDown,
            onDoubleClick: this.onDoubleClick,
            onChange: this.onChange,
            onMouseDown: this.onMouseDown,
            onTouchStart: this.onMouseDown,
            onBlur: this.onBlur
        }), r)
    }
}
y.defaultProps = {
    className: "",
    decimals: 0,
    max: Number.MAX_VALUE,
    min: Number.MIN_VALUE,
    step: 1,
    stepModifier: 10,
    defaultUnableToParseValue: 0
};
var PrintSettingsMarginInput = m(y, {
    resetOnSpecialKeys: true,
    touch: true,
    getSpecificEventData: (e) => {
        return {
            metaKey: e.metaKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey
        }
    },
    onDragMove: (e) => {
        e.stopPropagation();
        e.preventDefault()
    },
    onDragStart: (e) => {
        e.handledTouchStart = true
    }
});
var A = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    BACKSPACE: 8
};
var E = [8, 9, 35, 36, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190, 189, 173, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 110]

export default PrintSettingsMarginInput