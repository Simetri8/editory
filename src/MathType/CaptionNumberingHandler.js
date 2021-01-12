import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import DOMHelper from '../Elements/DOMHelper';
import ModalDialogContainer from '../Editor/ModalDialogContainer';
import SectionPrefixHelper from '../Editor/SectionPrefixHelper';
import SelectBoxContainer from '../Editor/SelectBoxContainer';

/// xxx(1616) /*CaptionNumberingHandler*/

/// var r = n(3)/*_.assignIn*/;  // 5 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 16 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var ye = n(5)/*sizzle*/;  // 7 times
/// var Ae = n.n(ye);
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var bn = n(51)/*SelectBoxContainer*/;  // 2 times
/// var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 1 times
/// var Mo = n(208)/*SectionPrefixHelper*/;  // 3 times
var CaptionNumberingData = [{
    key: "default",
    value: "Default"
},
{
    key: "section",
    value: "Section Level 1"
},
{
    key: "subsection",
    value: "Section Level 2"
},
{
    key: "subsubsection",
    value: "Section Level 3"
}];
class CaptionNumbering extends React.Component {
    constructor(e) {
        super(e);
        this.handleImageNameChange = (e) => {
            this.setState({
                imageCaption: _.assignIn({},
                this.state.imageCaption, {
                    name: e
                })
            });
        };
        this.handleImageNumberingOn = (e) => {
            this.setState({
                imageCaption: _.assignIn({},
                this.state.imageCaption, {
                    numeringType: e
                })
            });
        };
        this.handleTableNameChange = (e) => {
            this.setState({
                tableCaption: _.assignIn({},
                this.state.tableCaption, {
                    name: e
                })
            });
        };
        this.handleTableNumberingOn = (e) => {
            this.setState({
                tableCaption: _.assignIn({},
                this.state.tableCaption, {
                    numeringType: e
                })
            });
        };
        this.state = {
            imageCaption: this.props.info.image,
            tableCaption: this.props.info.table
        };
    }
    renderContent() {
        var e = this.state;
        var t = e.imageCaption;
        var n = e.tableCaption;
        return React.createElement("div", {
            style: {
                padding: 10
            }
        },
        React.createElement("div", {
            style: {
                paddingBottom: 10
            }
        },
        React.createElement("span", {
            style: {
                width: 80,
                display: "inline-block"
            }
        },
        "Image Prefix:"), React.createElement("input", {
            style: {
                marginRight: 10
            },
            value: t.name,
            onChange: (e) => {
                return this.handleImageNameChange(e.currentTarget.value);
            }
        }), React.createElement("span", {
            style: {
                paddingRight: 5,
                paddingLeft: 15
            }
        },
        "Numbering on:"), React.createElement(SelectBoxContainer, {
            width: 150,
            style: {
                display: "inline-block",
                color: "black"
            },
            data: CaptionNumberingData,
            value: t.numeringType || "default",
            onChange: this.handleImageNumberingOn
        })), React.createElement("div", null, React.createElement("span", {
            style: {
                width: 80,
                display: "inline-block"
            }
        },
        "Table Prefix:"), React.createElement("input", {
            style: {
                marginRight: 10
            },
            value: n.name,
            onChange: (e) => {
                return this.handleTableNameChange(e.currentTarget.value);
            }
        }), React.createElement("span", {
            style: {
                paddingRight: 5,
                paddingLeft: 15
            }
        },
        "Numbering on:"), React.createElement(SelectBoxContainer, {
            width: 150,
            style: {
                display: "inline-block",
                color: "black"
            },
            data: CaptionNumberingData,
            value: n.numeringType || "default",
            onChange: this.handleTableNumberingOn
        })), React.createElement("div", {
            style: {
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "orange"
            }
        },
        "*Note:Prefix apply for all captions of table/image"));
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: 530,
                maxWidth: "95vw"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Ok",
            message: "",
            isProgressing: false,
            onOk: () => {
                return this.props.onOk({
                    image: this.state.imageCaption,
                    table: this.state.tableCaption
                });
            },
            onCancel: this.props.onClose,
            onNo: this.props.onClose,
            isOkDisabled: false,
            show: true
        },
        React.createElement("div", {
            style: {
                flex: 1,
                maxHeight: "80vh",
                overflow: "visible",
                minHeight: 170,
                position: "relative"
            }
        },
        this.renderContent()));
    }
}
class CaptionNumberingHandler extends BaseComponent {
    constructor(e) {
        super(e);
        this.needImageCaption = false;
        this.needTableCaption = false;
        this.getImageCaptionInfo = () => {
            return {
                caption: this.getTarget().getPageSettings().imageCaptions[0]
            };
        };
        this.getTableCaptionInfo = () => {
            return {
                caption: this.getTarget().getPageSettings().tableCaptions[0]
            };
        };
        this.notifyImageCaptionNumbering = (e) => {
            if ("request-prefix-edit" != e) {
                this.needImageCaption = true;
            } else {
                this.showCaptionNumberDialog();
            }
        };
        this.notifyTableCaptionNumbering = (e) => {
            if ("request-prefix-edit" != e) {
                this.needTableCaption = true;
            } else {
                this.showCaptionNumberDialog();
            }
        };
        this.handleDialogOk = (e) => {
            var t = this.getTarget().getPageSettings();
            var n = _.assignIn({},
            t, {
                imageCaptions: [e.image],
                tableCaptions: [e.table]
            });
            this.getTarget().setPageSettings(n);
            this.handleClose();
        };
        this.handleClose = () => {
            this.getTarget().closeRender(this);
        };
    }
    processImageCaptionNumbering(e) {
        var t = this.getTarget().getPageSettings().imageCaptions[0];
        if (this.needImageCaption || e) {
            this.needImageCaption = false;
            return "default" == t.numeringType ? this.buildPrefixNumber(t, "role-image-caption") : this.buildPrefixNumberForSection(t, "role-image-caption");
        }
    }
    processTableCaptionNumbering(e) {
        var t = this.getTarget().getPageSettings().tableCaptions[0];
        if (this.needTableCaption || e) {
            this.needTableCaption = false;
            return "default" == t.numeringType ? this.buildPrefixNumber(t, "role-table-caption") : this.buildPrefixNumberForSection(t, "role-table-caption");
        }
    }
    buildPrefixNumber(e, t) {
        var n = this.getTarget().getEditorHtmlElement();
        jQuery(n).find(".".concat(t, "-prefix")).each((n, r) => {
            jQuery(r).find(">.".concat(t, "-name")).text(e.name);
            jQuery(r).find(">.".concat(t, "-number")).text("".concat(n + 1));
        });
    }
    buildPrefixNumberForSection(e, t) {
        var n = this.getTarget().getEditorHtmlElement();
        var r = DOMHelper.findEditLines(n);
        jQuery(n).find(".".concat(t, "-prefix")).each((n, a) => {
            var i = jQuery(a).closest("x-line").get(0);
            var o = "0.";
            if ("section" == e.numeringType) {
                o = SectionPrefixHelper.buildPrefix(i, r, 1);
            }
            if ("subsection" == e.numeringType) {
                o = SectionPrefixHelper.buildPrefix(i, r, 2);
            }
            if ("subsubsection" == e.numeringType) {
                o = SectionPrefixHelper.buildPrefix(i, r, 3);
            }
            jQuery(a).find(">.".concat(t, "-name")).text(e.name);
            jQuery(a).find(">.".concat(t, "-number")).text("".concat(o).concat(n + 1));
        });
    }
    render() {
        var e = this.getTarget().getPageSettings();
        var t = e.imageCaptions[0];
        var n = e.tableCaptions[0];
        return React.createElement(CaptionNumbering, {
            info: {
                image: t,
                table: n
            },
            onOk: this.handleDialogOk,
            onClose: this.handleClose
        });
    }
    showCaptionNumberDialog() {
        this.getTarget().requestRender(this);
    }
}
/*n.d(t, "a", function () {
    return CaptionNumberingHandler;
})*/

export default CaptionNumberingHandler