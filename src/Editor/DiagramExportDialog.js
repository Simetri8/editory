import _ from 'lodash';
import { Promise } from 'bluebird';
import FileSaver from 'file-saver';
import React from 'react';
import CheckBoxWrapper from '../Mathcha/CheckBoxWrapper';
import FontProcessor, { createNewFileName } from '../Font/FontProcessor';
import InputRadio from '../Elements/InputRadio';
import InputWrapper from '../Elements/InputWrapper';
import LoadingIcon from '../Elements/LoadingIcon';
import ModalDialogContainer from './ModalDialogContainer';
import ModalDialogHelper from './ModalDialogHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(467) /*DiagramExportDialog*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 34 times
/// var o = n.n(i);
/// var s = n(88)/*ModalDialogHelper*/;  // 1 times
/// var l = n(105)/*ModalDialogContainer*/;  // 1 times
/// var c = n(121)/*FontProcessor*/;  // 12 times
/// var d = n(101)/*CheckBoxWrapper*/;  // 2 times
/// var h = n(118)/*InputWrapper*/;  // 1 times
var u = {
    height: 250,
    width: "100%",
    position: "relative",
    border: "1px solid gray",
    backgroundImage: "linear-gradient(45deg,#bdbcbc 25%,transparent 25%),linear-gradient(-45deg,#bdbcbc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#bdbcbc 75%),linear-gradient(-45deg,transparent 75%,#bdbcbc 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0,0 10px,10px -10px,-10px 0px",
    boxSizing: "border-box"
};
var p = {
    maxWidth: "200%",
    maxHeight: "200%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%) scale(0.5,0.5)"
};
var m = {
    display: "inline-block",
    border: "1px solid lightgray",
    borderRadius: 3,
    padding: 5,
    margin: 0,
    width: 210,
    lineHeight: "1.4em"
}
/// f = n(447)/*LoadingIcon*/,  // 1 times
/// g = n(30)/*blubirdjs*/,  // 8 times
/// y = n.n(g)
/// A = n(168)/*FileSaver*/,  // 6 times
/// E = n.n(A)
/// v = n(19)/*TimerHelper*/,  // 1 times
/// S = n(209)/*InputRadio*/;  // 4 times
/*n.d(t, "a", function () {
    return T
});*/
var C = ModalDialogHelper.getModalDialog(),
x = null,
I = null;
class T extends React.Component {
    constructor(e) {
        super(e);
        this.generatePdf = (e, t, r) => {}/*this.generatePdf=((e,t,r)=>Promise.resolve(Promise.all([n.e(1),n.e(2)]).then(n.bind(null,1536)).then(n=>n.default.fromSvg(e,t,r).then(e=>({blob:e,str:null,width:t,height:r})))));*/;
        this.handlePaddingChanged = (e => {
            var t = e.currentTarget.value;
            t && !/^\d+$/.test(t) || this.setState({
                padding: t
            });
            this.invalidateImage()
        });
        this.onTransparentCheckboxChange = (() => {
            this.setState({
                transparent: !this.state.transparent
            });
            this.invalidateImage()
        });
        this.onOk = (() => {
            this.setState({
                isLoading: !0
            });
            this.generate(!0, this.state.imageType, this.state.scale).
            finally(() => {
                this.setState({
                    isLoading: !1
                })
            })
        });
        this.onNoGridCheckChange = (() => {
            this.setState({
                noGrid: !this.state.noGrid
            });
            this.invalidateImage()
        });
        var t = this.props.isDiagram ? I : x;
        this.state = _.assignIn({
            transparent: !1,
            padding: "2",
            scale: 2
        },
        t, {
            imageType: this.props.imageType,
            isLoading: !1
        })
    }
    componentDidMount() {
        this.invalidateImage()
    }
    componentWillUnmount() {
        this.props.isDiagram ? I = this.state : x = this.state
    }
    invalidateImage() {
        this.setState({
            isLoading: !0
        });
        TimerHelper.next(() => {
            this.generateToCanvas().then(() => {
                this.setState({
                    isLoading: !1
                })
            })
        })
    }
    getDiagramExportOption(e) {
        return {
            padding: this.getPaddingValue(),
            transparent: this.state.transparent,
            noGrid: this.state.noGrid,
            scale: e,
            bgColor: this.props.fixedContextHandler.getMainThemeColor()
        }
    }
    generateForDiagram(e, t) {
        if ("PNG" == e) return Promise.resolve(FontProcessor.exportDiagramPng(this.props.requestMathAreaElement(), this.getDiagramExportOption(t)));
        var n = Promise.resolve(FontProcessor.exportDiagramSvg(this.props.requestMathAreaElement(), this.getDiagramExportOption()));
        return "SVG" == e ? Promise.resolve(n) : n.then(e => {
            var t = e.str,
            n = e.width,
            r = e.height;
            return this.generatePdf(t, n, r)
        })
    }
    handleDiagramDownload(e, t) {
        switch (e) {
        case "SVG":
            FileSaver.saveAs(t, "diagram-".concat(Object(createNewFileName)(new Date), ".svg"));
            break;
        case "PNG":
            FileSaver.saveAs(t, "diagram-".concat(Object(createNewFileName)(new Date), ".png"));
            break;
        case "PDF":
            FileSaver.saveAs(t, "diagram-".concat(Object(createNewFileName)(new Date), ".pdf"))
        }
    }
    handleMathDownload(e, t) {
        switch (e) {
        case "SVG":
            FileSaver.saveAs(t, "math-".concat(Object(createNewFileName)(new Date), ".svg"));
            break;
        case "PNG":
            FileSaver.saveAs(t, "math-".concat(Object(createNewFileName)(new Date), ".png"));
            break;
        case "PDF":
            FileSaver.saveAs(t, "math-".concat(Object(createNewFileName)(new Date), ".pdf"))
        }
    }
    generateToCanvas() {
        return this.props.isDiagram ? Promise.resolve(FontProcessor.exportDiagramCanvas(this.props.requestMathAreaElement(), this.htmlCanvas, this.getDiagramExportOption())) : Promise.resolve(FontProcessor.exportCanvas(this.props.requestMathAreaElement(), this.htmlCanvas, this.getMathExportOption()))
    }
    generate(e, t, n) {
        return this.props.isDiagram ? this.generateForDiagram(t, n).then(n => (e && this.handleDiagramDownload(t, n.blob), n)) : this.generateForMath(t, n).then(n => (e && this.handleMathDownload(t, n.blob), n))
    }
    getMathExportOption(e) {
        return {
            padding: this.getPaddingValue(),
            transparent: this.state.transparent,
            scale: e,
            bgColor: this.props.fixedContextHandler.getMainThemeColor()
        }
    }
    generateForMath(e, t) {
        if ("PNG" == e) return Promise.resolve(FontProcessor.exportPng(this.props.requestMathAreaElement(), this.getMathExportOption(t)));
        var n = Promise.resolve(FontProcessor.exportSvg(this.props.requestMathAreaElement(), this.getMathExportOption()));
        return "SVG" == e ? n : n.then(e => {
            var t = e.str,
            n = e.width,
            r = e.height;
            return this.generatePdf(t, n, r)
        })
    }
    getPaddingValue() {
        return /^\d+$/.test(this.state.padding) ? Number.parseInt(this.state.padding, 10) : 0
    }
    renderNoGridCheck() {
        if (this.props.isDiagram) return React.createElement("div", {
            style: {
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement(CheckBoxWrapper, {
            name: "No Grid",
            checked: this.state.noGrid,
            style: {
                marginLeft: 1,
                flex: "50%"
            },
            onValueChanged: this.onNoGridCheckChange
        }))
    }
    renderPaddingInput() {
        if (!this.props.isDiagram) return React.createElement("div", {
            style: {
                flex: "50%"
            }
        },
        React.createElement("label", {
            style: {
                paddingRight: 5
            }
        },
        "Padding:"), InputWrapper.wrapInput(React.createElement("input", {
            style: {
                width: 30
            },
            value: this.state.padding,
            onChange: this.handlePaddingChanged
        })), React.createElement("label", {
            style: {
                paddingLeft: 2
            }
        },
        "px"))
    }
    renderImageScaleSize() {
        if ("PNG" == this.state.imageType) return React.createElement("fieldset", {
            style: {
                display: "inline-block",
                border: "1px solid lightgray",
                borderRadius: 3,
                padding: 5,
                margin: 0,
                marginLeft: 10,
                lineHeight: "1.4em"
            }
        },
        React.createElement(InputRadio, {
            value: "latex",
            label: "1x",
            checked: 1 === this.state.scale,
            onSelect: () => this.setState({
                scale: 1
            })
        }), React.createElement(InputRadio, {
            value: "latex",
            label: "2x",
            checked: 2 === this.state.scale,
            onSelect: () => this.setState({
                scale: 2
            })
        }), React.createElement(InputRadio, {
            value: "latex",
            label: "3x",
            checked: 3 === this.state.scale,
            onSelect: () => this.setState({
                scale: 3
            })
        }), React.createElement(InputRadio, {
            value: "latex",
            label: "4x",
            checked: 4 === this.state.scale,
            onSelect: () => this.setState({
                scale: 4
            })
        }))
    }
    renderLoading() {
        if (this.state.isLoading) return React.createElement("svg", {
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            }
        },
        React.createElement(LoadingIcon, {
            width: 540,
            height: 250
        }))
    }
    renderPdfWarning() {
        if ("PDF" == this.state.imageType) return React.createElement("span", {
            style: {
                marginLeft: 10,
                color: "orange"
            }
        },
        "Note: Pdf Export only supports text in alphabet ")
    }
    render() {
        return React.createElement("div", null, React.createElement(C, {
            show: !0
        },
        React.createElement(ModalDialogContainer, {
            style: {
                width: 540,
                top: 140
            },
            message: "",
            isProgressing: !1,
            isOkDisabled: !1,
            onOk: this.onOk,
            onCancel: this.props.onCancel,
            okLabel: "Download",
            centerButtons: !0,
            cancelStyle: {
                width: 100,
                height: 24
            },
            okStyle: {
                width: 100,
                height: 24
            },
            show: !0
        },
        React.createElement("div", {
            style: {
                flex: 1
            }
        },
        React.createElement("div", {
            style: u
        },
        React.createElement("canvas", {
            ref: e => this.htmlCanvas = e,
            style: _.assignIn({},
            p)
        }), this.renderLoading()), React.createElement("div", {
            style: {
                marginTop: 10
            }
        },
        React.createElement("fieldset", {
            style: m
        },
        React.createElement("div", {
            style: {
                display: "inline-block",
                width: 74
            },
            onClick: () => this.setState({
                imageType: "SVG"
            })
        },
        React.createElement("input", {
            type: "radio",
            value: "latex",
            checked: "SVG" == this.state.imageType,
            onChange: () => this.setState({
                imageType: "SVG"
            })
        }), React.createElement("label", {
            style: {
                marginLeft: 3
            }
        },
        "SVG")), React.createElement("div", {
            style: {
                display: "inline-block",
                width: 74
            },
            onClick: () => this.setState({
                imageType: "PDF"
            })
        },
        React.createElement("input", {
            type: "radio",
            value: "latex",
            checked: "PDF" == this.state.imageType,
            onChange: () => this.setState({
                imageType: "PDF"
            })
        }), React.createElement("label", {
            style: {
                marginLeft: 3
            }
        },
        "PDF")), React.createElement("div", {
            style: {
                display: "inline-block"
            },
            className: "test-png-radio",
            onClick: () => this.setState({
                imageType: "PNG"
            })
        },
        React.createElement("input", {
            type: "radio",
            value: "latex",
            checked: "PNG" == this.state.imageType,
            onChange: () => this.setState({
                imageType: "PNG"
            })
        }), React.createElement("label", {
            style: {
                marginLeft: 3
            }
        },
        "PNG"))), this.renderImageScaleSize(), this.renderPdfWarning()), React.createElement("div", {
            style: {
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement(CheckBoxWrapper, {
            name: "Background Transparent",
            checked: this.state.transparent,
            style: {
                marginLeft: 1,
                width: 202
            },
            onValueChanged: this.onTransparentCheckboxChange
        }), this.renderPaddingInput()), this.renderNoGridCheck()))))
    }
}

export default T