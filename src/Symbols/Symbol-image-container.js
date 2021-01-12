import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import CursorHandler from '../Editor/CursorHandler';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import ImageViewer from '../Editor/ImageViewer';

/// xxx(1518) /*Symbol-image-container*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 14 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(3)/*_.assignIn*/;  // 4 times
/// var s = n.n(o);
/// var l = n(29)/*CompositeBlock*/;  // 2 times
/// var c = n(85)/*CursorHandler*/;  // 1 times
/// var d = n(191)/*ImageViewer2*/;  // 1 times
/// var h = n(24)/*EventHelper*/;  // 1 times
/// var u = n(21)/*EditArea*/;  // 1 times
/// var p = n(96)/*BatchedUpdates*/;  // 2 times
/// var m = n(13)/*CreateEditorObject*/;  // 1 times
/// var pte = n(23)/*PropTypesExporter*/,  // 2 times
/// propTypes = n.n(pte);
class f extends CompositeBlock {
    constructor(e) {
        super(e);
        this.onSelected = (e => {
            if (!this.getEditorInfo().isReadOnly) {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withHandledCursorSelected().build());
                this.props.onSelectedChanged({
                    controlled: true
                });
                console.log("on selected")
            }
        });
        this.onDataChanged = (e => {
            this.props.onDataChanged(e, {
                focusAcquired: !0,
                isOneLineChanged: !0
            })
        });
        this.handleAddCaption = (e => {
            var t = this.props.data,
            n = CreateEditorObject.createEmptyEditor();
            n.lines[0].style = {
                align: "center"
            };
            var r = _.assignIn({},
            t, {
                elements: {
                    caption: n
                }
            });
            BatchedUpdates. in (() => {
                this.props.onDataChanged(r);
                this.props.onSelectedChanged({
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    },
                    key: "caption"
                })
            });
            e.stopPropagation();
            e.preventDefault()
        });
        this.handleCaptionPrefixMouseDown = (e => {
            this.props.onSelectedChanged({
                key: "caption",
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            });
            e.stopPropagation();
            e.preventDefault()
        });
        this.handleDeleteCaption = (e => {
            var t = _.assignIn({},
            this.props.data, {
                elements: _.assignIn({},
                this.props.data.elements, {
                    caption: void 0
                })
            });
            BatchedUpdates. in (() => {
                this.props.onDataChanged(t);
                this.props.onSelectedChanged({
                    controlled: !0
                })
            });
            e.preventDefault();
            e.stopPropagation()
        });
        this.handleEditCaptionPrefix = (e => {
            this.context.notifyImageCaptionNumbering("request-prefix-edit");
            e.preventDefault();
            e.stopPropagation()
        });
        this.containerClassName = "image-container no-cursor-selected no-editor"
    }
    useCustomBaseLine() {
        return !1
    }
    isInlineMode() {
        return !1
    }
    componentDidMount() {
        super.componentDidMount();
        this.context.notifyImageCaptionNumbering()
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.context.notifyImageCaptionNumbering()
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        e.data.elements.caption != this.props.data.elements.caption && this.context.notifyImageCaptionNumbering()
    }
    getJustifyContentFromAlign(e) {
        return "center" == (e = e || "left") ? "center" : "right" == e ? "flex-end" : "flex-start"
    }
    getTextAlignFromFirstLine() {
        var e = this.props.data.elements.caption.lines[0].style;
        return e && e.align || "left"
    }
    renderCaption() {
        if (!this.props.data.elements.caption) return this.props.selected ? React.createElement("div", {
            style: {
                fontFamily: '"Segoe UI",Arial,Verdana,sans-serif'
            },
            className: "add-caption no-print",
            onMouseDown: this.handleAddCaption,
            key: "add-caption"
        },
        "Add Caption") : void 0;
        var e = this.context.getImageCaptionInfo(),
        t = this.props.data;
        return React.createElement("div", {
            key: "caption",
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: this.getJustifyContentFromAlign(t.align),
                marginTop: 10
            }
        },
        React.createElement("span", {
            className: "no-print-outline",
            style: {
                outline: this.props.selected ? "1px solid lightgray" : "none",
                position: "relative",
                textAlign: this.getTextAlignFromFirstLine()
            }
        },
        React.createElement("span", {
            className: "role-image-caption-prefix",
            style: {
                paddingRight: 5,
                fontWeight: "bold"
            },
            onMouseDown: this.handleCaptionPrefixMouseDown
        },
        React.createElement("span", {
            className: "role-image-caption-name"
        },
        e.caption.name), " ", React.createElement("span", {
            className: "role-image-caption-number"
        },
        "1"), ":"), React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("caption"), {
            showBorder: !1,
            isTextMode: !0,
            className: "image-caption",
            style: {
                minWidth: 50,
                display: "inline"
            }
        })), this.renderCaptionActions()))
    }
    renderCaptionActions() {
        return this.props.selected ? [React.createElement("span", {
            key: "delete",
            className: "no-print",
            style: {
                position: "absolute",
                left: -53,
                top: -1,
                color: "#ce0303",
                cursor: "pointer",
                background: "white",
                padding: "0px 3px",
                border: "1px solid lightgray",
                lineHeight: "1.2em",
                width: 14,
                textAlign: "center"
            },
            onMouseDown: this.handleDeleteCaption
        },
        React.createElement("i", {
            className: "fa fa-times",
            style: {
                verticalAlign: "-1px"
            }
        })), React.createElement("span", {
            key: "edit",
            className: "no-print",
            style: {
                position: "absolute",
                left: -28,
                top: -1,
                color: "rgb(17,85,204)",
                cursor: "pointer",
                background: "white",
                padding: "0px 3px",
                border: "1px solid lightgray",
                lineHeight: "1.2em",
                width: 14,
                textAlign: "center"
            },
            onMouseDown: this.handleEditCaptionPrefix
        },
        React.createElement("i", {
            className: "fa fa-edit",
            style: {
                verticalAlign: "-2px"
            }
        }))] : null
    }
    renderComponent() {
        return [React.createElement(ImageViewer, {
            key: "image-view",
            selectOnly: this.isSelectModeOnly(),
            width: "300",
            height: "300",
            isSelected: this.props.selected && this.props.selected.controlled,
            onSelected: this.onSelected,
            data: this.props.data,
            onDataChanged: this.onDataChanged
        }), this.renderCaption()]
    }
}
f.contextTypes = _.assignIn({
    getImageCaptionInfo: PropTypes.any,
    notifyImageCaptionNumbering: PropTypes.any
},
CompositeBlock.contextTypes);
var SymbolImageContainer = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.")
    }
    getViewComponent() {
        return f
    }
    getLatextName() {
        return "\\image-container"
    }
    getModel(e) {
        var t = this.getModelFromStructure({},
        this.getLatextName());
        return t.align = "center",
        t.scaleOption = "width",
        t.imageSize = {
            width:
            300,
            height: 300
        },
        t.url = e && e.imageUrl ? e.imageUrl : "",
        t
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            keyInsertOnSelection: "value",
            elements: {
                caption: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            height: 25,
            singleBlockLine: !0,
            selectControlled: !0,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("div", {
                style: {
                    color: "gray"
                }
            },
            React.createElement("i", {
                className: "fa fa-picture-o",
                "aria-hidden": "true"
            }))
        })]
    }
    toLatex(e, t) {
        return e.url ? "bbcode" == t.textType ? "[".concat("img", "]").concat(e.url || "", "[/img]") : "\nimage[".concat(e.url || "", "]\n") : ""
    }
}

export default SymbolImageContainer