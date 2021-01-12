import _ from 'lodash';
import jQuery from 'jquery';
import Popover from 'react-popover';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentInfoWorker from './Mathcha/document-info-worker';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import TimerHelper from './Mathcha/TimerHelper';
import WorkerInitializer from './Mathcha/WorkerInitializer';

/// xxx(1566) /*DocumentInfo*/

/// var k = n(0)/*React*/;  // 31 times
/// var B = n.n(k);
/// var Pe = n(3);  // 5 times
/// var Fe = n.n(Pe);
/// var He = n(16)/*ReactDOM*/;  // 1 times
/// var _e = n.n(He);
/// var gi = n(5)/*sizzle*/;  // 6 times
/// var yi = n.n(gi);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var so = n(750)/*react-popover*/;  // 1 times
/// var lo = n.n(so);
/// var io = n(178)/*WorkerInitializer*/;  // 1 times
/// var diw = n(1482)/*document-info-worker*/;  // 1 times
var oo = (DocumentInfoWorker, {
    full: "full",
    fullOverall: "fullOverall",
    overalIncremental: "overalIncremental"
});
var ho = {
    width: "100%",
    padding: 5
};
var uo = {};
var po = {
    marginBottom: 5,
    fontWeight: "bold"
};
var mo = {
    marginBottom: 5
};
var fo = {
    display: "inline-block",
    textAlign: "left",
    paddingLeft: 10
};
var go = {
    width: 40,
    display: "inline-block"
};
var Ao = new WorkerInitializer("document-info.worker");
class DocumentStatisticsComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showLabel: null
        };
    }
    getInfo() {
        return this.props.data || this.getEmptyInfo();
    }
    getEmptyInfo() {
        return {
            chars: 0,
            charsAll: 0,
            inlineMath: 0,
            lineBreaks: 0,
            mathFractions: 0,
            mathSections: 0,
            words: 0,
            mathSqrts: 0,
            lines: 0,
            mathPowers: 0,
            mathVectors: 0,
            mathMatrices: 0,
            language: "none"
        };
    }
    renderLineInfo(e, t, n) {
        return React.createElement("div", {
            style: uo
        },
        React.createElement("span", {
            style: go
        },
        t), React.createElement("span", {
            style: fo
        },
        e), n ? React.createElement("span", null, React.createElement(Popover, {/*enterExitTransitionDurationMs:false,refreshIntervalMs:false,*/style: {
                zIndex: 9999999
            },
            place: "above",
            tipSize: 4,
            body: React.createElement("span", null, n),
            isOpen: this.state.showLabel === e,
            onOuterAction: () => {
                return this.setState({
                    showLabel: null
                });
            }
        },
        React.createElement("a", {
            style: {
                padding: "0 5px",
                color: "lightblue"
            },
            href: "#",
            className: "button",
            ref: "target",
            onClick: () => {
                return this.setState({
                    showLabel: e
                });
            }
        },
        React.createElement("i", {
            className: "fa fa-info-circle"
        })))) : void 0);
    }
    render() {
        var e = this.getInfo();
        return React.createElement("div", {
            style: ho
        },
        React.createElement("div", {
            style: po
        },
        "Text Mode"), React.createElement("div", {
            style: mo
        },
        this.renderLineInfo("Words", e.words, "A Word is separated by whitespaces,tabs,...,not counting words in \\diagram"), this.renderLineInfo("Characters", e.chars), this.renderLineInfo("All Characters", e.charsAll, "All Characters including whitespaces,tabs,..."), this.renderLineInfo("Lines", e.lines || 0, "NOT counting inside \\table,\\theorem"), this.renderLineInfo("Line Breaks", e.lineBreaks, "A Line Break is separated by explicit new line character (by press Enter),NOT couting inside \\table,\\theorem")), React.createElement("div", {
            style: po
        },
        "Math Mode"), React.createElement("div", {
            style: mo
        },
        this.renderLineInfo("Math", e.mathSections, "All Math Sections:inline-math,math-container,align,..."), this.renderLineInfo("Inline Math", e.inlineMath), this.renderLineInfo("Fractions", e.mathFractions, "Count on \\frac,\\dfrac,\\cfrac,\\tfrac"), this.renderLineInfo("Square Roots", e.mathSqrts, "Count on \\sqrt"), this.renderLineInfo("Powers", e.mathPowers, "Count on \\power,\\power-index"), this.renderLineInfo("Vectors", e.mathVectors, "Count on \\vec,\\overrightarrow"), this.renderLineInfo("Matrices", e.mathMatrices, "Count on \\matrix \\smallmatrix")), React.createElement("div", {
            style: po
        },
        "Others"), React.createElement("div", {
            style: _.assignIn({},
            uo, {
                position: "relative"
            })
        },
        React.createElement("span", {
            style: {
                width: 150,
                display: "inline-block"
            }
        },
        "Spell check language:"), React.createElement("span", {
            style: fo
        },
        this.mapLanguageCodeToText(e.language)), React.createElement("div", {
            style: {
                position: "absolute",
                right: 0,
                top: 0,
                color: "rgb(17,85,204)",
                cursor: "pointer"
            },
            onClick: () => {
                return this.props.requestPageSettings();
            }
        },
        "[Change]")), React.createElement("div", {
            style: {
                height: 10
            }
        }));
    }
    mapLanguageCodeToText(e) {
        switch (e) {
        case "none":
            return "(none) Not Selected";
        case "vi":
            return "(vi) Vietnamese";
        case "en-us":
            return "(en-us) English (United State)";
        default:
            return e;
        }
    }
}
class DocumentStatisticsModal extends React.Component {
    render() {
        return React.createElement("div", null, React.createElement(ModalDialogContainer, {
            show: true,
            style: {
                width: 400,
                minHeight: 150,
                maxWidth: "95vw",
                top: 100,
                transform: "translate(-50%,0)",
                overflow: "visible"
            },
            contentStyle: {
                overflow: "visible"
            },
            footerStyle: {
                justifyContent: "center"
            },
            onClose: this.props.onClose,
            isProgressing: null == this.props.data
        },
        React.createElement(DocumentStatisticsComponent, {
            requestPageSettings: this.props.requestPageSettings,
            data: this.props.data,
            ref: (e) => {
                return this.pageSettingsRef = e;
            }
        })));
    }
}
class DocumentInfo extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.id = Math.random().toString();
        this.lastModel = null;
        this.runLater = TimerHelper.createLaterRunObject("latest", 300);
        this.positionInfo = {
            intervalId: null,
            lastScrollAppear: false,
            containerLayer: null
        };
        this.state = {
            info: {
                words: 0,
                mathSections: 0,
                language: "none"
            },
            showFullInfo: false
        };
        this.closeInfoDialog = () => {
            this.setState({
                showFullInfo: false,
                fullInfo: null
            });
        };
        this.handleRequestPageSettings = () => {
            this.closeInfoDialog();
            this.props.requestPageSettings();
        };
        this.handleMoreClick = () => {
            this.setState({
                showFullInfo: true
            });
            this.requestFullInfo();
        };
    }
    componentDidMount() {
        this.detectSrollbarAppear();
    }
    detectSrollbarAppear() {
        this.positionInfo.intervalId = setInterval(() => {
            if (this.positionInfo) {
                var e = this.positionInfo.containerLayer;
                if (!e) {
                    e = jQuery("container-layer").get(0);
                    this.positionInfo.containerLayer = e;
                }
                var t = e.scrollWidth > e.clientWidth;
                if (this.positionInfo.lastScrollAppear != t) {
                    this.positionInfo.lastScrollAppear = t;
                    var n = ReactDOM.findDOMNode(this);
                    var r = jQuery(n).find(">document-info-bar");
                    if (e.scrollWidth > e.clientWidth) {
                        jQuery(r).css("bottom", 15);
                    } else {
                        jQuery(r).css("bottom", 5);
                    }
                }
            }
        },
        2E3);
    }
    setLineChanged(e, t, n) {
        Ao.request({
            action: oo.overalIncremental,
            modelId: e,
            line: t,
            lineIndex: n
        },
        this.id).then((e) => {
            if ("result" == e.status) {
                this.setState({
                    info: _.assignIn({},
                    this.state.info, e.data)
                });
            }
        });
    }
    componentWillUnmount() {
        this.runLater.cancel();
        if (this.positionInfo && this.positionInfo.intervalId) {
            clearInterval(this.positionInfo.intervalId);
        }
    }
    getSpellCheckLanguageFromModel(e) {
        return e.pageSettings && e.pageSettings.spellCheck && e.pageSettings.spellCheck.language || "none";
    }
    setDocumentModel(e, t) {
        if (this.state.info.language != this.getSpellCheckLanguageFromModel(e)) {
            this.setState({
                info: _.assignIn({},
                this.state.info, {
                    language: this.getSpellCheckLanguageFromModel(e)
                })
            });
        }
        this.runLater.later(() => {
            var n = true;
            if (t && this.lastModel && this.lastModel.id === e.id && this.lastModel.lines.length === e.lines.length) {
                var r = this.lastModel.lines.findIndex((t, n) => {
                    return t != e.lines[n];
                });
                if (e.lines[r]) {
                    n = false;
                    this.setLineChanged(e.id, e.lines[r], r);
                }
            }
            if (n) {
                Ao.request({
                    action: oo.fullOverall,
                    model: e
                },
                this.id).then((e) => {
                    if ("result" == e.status) {
                        this.setState({
                            info: _.assignIn({},
                            this.state.info, e.data)
                        });
                    }
                });
            }
            this.lastModel = e;
        });
    }
    requestFullInfo() {
        Ao.request({
            action: oo.full,
            model: this.lastModel
        },
        this.id).then((e) => {
            if ("result" == e.status) {
                this.setState({
                    fullInfo: _.assignIn({},
                    e.data, {
                        lines: this.countLinesOnDom(),
                        language: this.state.info.language
                    })
                });
            }
        });
    }
    renderFullInfo() {
        if (this.state.showFullInfo) {
            return React.createElement(DocumentStatisticsModal, {
                requestPageSettings: this.handleRequestPageSettings,
                data: this.state.fullInfo,
                onClose: this.closeInfoDialog,
                onDataChanged: () => {}
            });
        }
    }
    countLinesOnDom() {
        var e = jQuery("edit-area.root-editor").find(">area-container>x-line");
        if (e.length <= 0) {
            throw new Error("dom structure has changed!");
        }
        var t = 0;
        var n = Number.MIN_SAFE_INTEGER;
        var r = 0;
        for (; r < e.length; r++) {
            var a = jQuery(e.get(r)).find(">x-blocks").get(0).getClientRects();
            var i = 0;
            for (; i < a.length; i++) {
                var o = a.item(i);
                if (o.top > n) {
                    t = t + 1;
                }
                n = o.top;
            }
        }
        return t;
    }
    render() {
        if (!this.props.show) {
            return React.createElement("document-info-container", null);
        }
        var e = this.state.info;
        return React.createElement("document-info-container", null, React.createElement("document-info-bar", {
            style: {
                cursor: "pointer"
            },
            onClick: this.handleMoreClick
        },
        React.createElement("span", null, "Lang:", e.language, ",Words:", e.words, ",Math:", e.mathSections, " ", React.createElement("span", null, "More"))), this.renderFullInfo());
    }
}
/*n.d(t, "a", function () {
    return DocumentInfo;
});*/

export default DocumentInfo