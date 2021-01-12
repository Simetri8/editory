import _ from 'lodash';
import classNames from 'classnames';
import Hammer from 'hammerjs';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { ShapeRectangleB } from '../Shapes/Shape-rectangle';
import { ShapeRegularPolygonAlmostB } from '../Shapes/Shape-regular-polygon-almost';
import AccessibilityDialog from '../Editor/AccessibilityDialog';
import ArrowRenderer, { ArrowRendererC, ArrowRendererB } from '../Editor/ArrowRenderer';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import ColorHelper from '../Mathcha/ColorHelper';
import ColorPicker from '../Editor/ColorPicker';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import ControlPoints from '../Geometry/ControlPoints';
import CreateEditorObject from '../Elements/CreateEditorObject';
import CursorHandler from '../Editor/CursorHandler';
import DataChangeModel from '../Editor/DataChangeModel';
import DiagramElementCreater from '../Editor/DiagramElementCreater';
import DiagramEntityHelper from '../Editor/DiagramEntityHelper';
import DiagramExportDialog from '../Editor/DiagramExportDialog';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from '../Elements/DOMHelper';
import DynamicSvg from '../Editor/DynamicSvg';
import EditArea from '../Editor/EditArea';
import EditorAction from '../Editor/EditorAction';
import EntityChanger from '../Editor/EntityChanger';
import EntityFinder from '../Editor/EntityFinder';
import EntityHelper from '../Editor/EntityHelper';
import EntityUtils from '../Editor/EntityUtils';
import EventHelper from '../Mathcha/EventHelper';
import ExpandableComponent, { ExpandableComponentB } from '../Elements/ExpandableComponent';
import ExportHandlerForTest from '../Document/ExportHandlerForTest';
import FillColorIcon from '../Shapes/FillColorIcon';
import FindAndReplaceOptionsComponent from '../Editor/FindAndReplaceOptionsComponent';
import FindEntityHelper from '../Editor/FindEntityHelper';
import FontList from '../Font/FontList';
import FontSizeSelectBox from '../Editor/FontSizeSelectBox';
import FreeLineCorrector from '../Shapes/FreeLineCorrector';
import Geometry from '../Geometry/Geometry';
import Global from '../Global';
import GuideDetector from '../Shapes/GuideDetector';
import ImageLoader from '../Mathcha/ImageLoader';
import IntersectionEntityHelper from '../Editor/IntersectionEntityHelper';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import LabelItemContainer from '../Elements/LabelItemContainer';
import LatexConverter from '../Latex/LatexConverter';
import LinePointItemGroup from '../Editor/Toolbar/LinePointItemGroup';
import MathPlotSettingsBuilder from '../Mathcha/MathPlotSettingsBuilder';
import MathType from '../MathType';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import MouseDownEventAddRemove from '../Editor/MouseDownEventAddRemove';
import MovingHandler from '../Editor/MovingHandler';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import PathSimplifier from '../Geometry/PathSimplifier';
import PatternDef from '../Mathcha/PatternDef';
import PointDetector from '../Shapes/PointDetector';
import PolygonRenderer from '../Editor/PolygonRenderer';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import RotationControlPointHelper from '../Geometry/RotationControlPointHelper';
import ScrollTo from '../Mathcha/ScrollTo';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import Serialization from '../Serialization';
import ShapeArc from '../Shapes/Shape-arc';
import ShapeArrowHead1 from '../Shapes/Shape-arrow-head-1';
import ShapeArrowHead2 from '../Shapes/Shape-arrow-head-2';
import ShapeArrowHead3 from '../Shapes/Shape-arrow-head-3';
import ShapeArrowHead4 from '../Shapes/Shape-arrow-head-4';
import ShapeArrowHead6 from '../Shapes/Shape-arrow-head-6';
import ShapeArrowHead7 from '../Shapes/Shape-arrow-head-7';
import ShapeAxis2d from '../Shapes/Shape-axis2d';
import ShapeBendArrow from '../Shapes/Shape-bend-arrow';
import ShapeBendUpArrow from '../Shapes/Shape-bend-up-arrow';
import ShapeBrace from '../Shapes/Shape-brace';
import ShapeCalloutLeftRightArrow from '../Shapes/Shape-callout-left-right-arrow';
import ShapeCalloutQuadArrow from '../Shapes/Shape-callout-quad-arrow';
import ShapeCalloutRightArrow from '../Shapes/Shape-callout-right-arrow';
import ShapeChevronArrow from '../Shapes/Shape-chevron-arrow';
import ShapeConnectionHelper from '../Shapes/ShapeConnectionHelper';
import ShapeControlDistance from '../Shapes/ShapeControlDistance';
import ShapeCurveLeftArrow from '../Shapes/Shape-curve-left-arrow';
import ShapeCurveRightArrow from '../Shapes/Shape-curve-right-arrow';
import ShapeDocArc, { ShapeDocArcB } from '../Shapes/Shape-doc-arc';
import ShapeDocBevel from '../Shapes/Shape-doc-bevel';
import ShapeDocBlockArc, { ShapeDocBlockArcB } from '../Shapes/Shape-doc-block-arc';
import ShapeDocCan from '../Shapes/Shape-doc-can';
import ShapeDocChord from '../Shapes/Shape-doc-chord';
import ShapeDocCloud from '../Shapes/Shape-doc-cloud';
import ShapeDocCross from '../Shapes/Shape-doc-cross';
import ShapeDocCube from '../Shapes/Shape-doc-cube';
import ShapeDocDiagonalStripe from '../Shapes/Shape-doc-diagonal-stripe';
import ShapeDocDiamond from '../Shapes/Shape-doc-diamond';
import ShapeDocDonut from '../Shapes/Shape-doc-donut';
import ShapeDocFoldedCorner from '../Shapes/Shape-doc-folded-corner';
import ShapeDocFrame from '../Shapes/Shape-doc-frame';
import ShapeDocHalfFrame from '../Shapes/Shape-doc-half-frame';
import ShapeDocLShape from '../Shapes/Shape-doc-l-shape';
import ShapeDocMoon from '../Shapes/Shape-doc-moon';
import ShapeDocPie from '../Shapes/Shape-doc-pie';
import ShapeDocPlaque from '../Shapes/Shape-doc-plaque';
import ShapeDocRightAngle from '../Shapes/Shape-doc-right-angle';
import ShapeDocRightTriangle from '../Shapes/Shape-doc-right-triangle';
import ShapeDocRoundedDiagonalCornerRect from '../Shapes/Shape-doc-rounded-diagonal-corner-rect';
import ShapeDocRoundedRect from '../Shapes/Shape-doc-rounded-rect';
import ShapeDocRoundedSameSideCornerRect from '../Shapes/Shape-doc-rounded-same-side-corner-rect';
import ShapeDocRoundedSingleCornerRect from '../Shapes/Shape-doc-rounded-single-corner-rect';
import ShapeDocSmileyFace from '../Shapes/Shape-doc-smiley-face';
import ShapeDocSnipDiagonalCornerRect from '../Shapes/Shape-doc-snip-diagonal-corner-rect';
import ShapeDocSnipRoundSingleCornerRect from '../Shapes/Shape-doc-snip-round-single-corner-rect';
import ShapeDocSnipSameSideCornerRect from '../Shapes/Shape-doc-snip-same-side-corner-rect';
import ShapeDocSnipSingleCornerRect from '../Shapes/Shape-doc-snip-single-corner-rect';
import ShapeDocTearDrop from '../Shapes/Shape-doc-tear-drop';
import ShapeDocTrapezoid from '../Shapes/Shape-doc-trapezoid';
import ShapeDocTriangle from '../Shapes/Shape-doc-triangle';
import ShapeDownArrow from '../Shapes/Shape-down-arrow';
import ShapeEllipse from '../Shapes/Shape-ellipse';
import ShapeFlowAlternativeProcess from '../Shapes/Shape-flow-alternative-process';
import ShapeFlowCard from '../Shapes/Shape-flow-card';
import ShapeFlowCollate from '../Shapes/Shape-flow-collate';
import ShapeFlowConnector from '../Shapes/Shape-flow-connector';
import ShapeFlowData from '../Shapes/Shape-flow-data';
import ShapeFlowDecision from '../Shapes/Shape-flow-decision';
import ShapeFlowDelay from '../Shapes/Shape-flow-delay';
import ShapeFlowDirectAccessStorage from '../Shapes/Shape-flow-direct-access-storage';
import ShapeFlowDisplay from '../Shapes/Shape-flow-display';
import ShapeFlowDocument from '../Shapes/Shape-flow-document';
import ShapeFlowExtract from '../Shapes/Shape-flow-extract';
import ShapeFlowInternalStorage from '../Shapes/Shape-flow-internal-storage';
import ShapeFlowMagneticDisk from '../Shapes/Shape-flow-magnetic-disk';
import ShapeFlowManualInput from '../Shapes/Shape-flow-manual-input';
import ShapeFlowManualOperation from '../Shapes/Shape-flow-manual-operation';
import ShapeFlowMerge from '../Shapes/Shape-flow-merge';
import ShapeFlowMultidocument from '../Shapes/Shape-flow-multidocument';
import ShapeFlowOffPageConnector from '../Shapes/Shape-flow-off-page-connector';
import ShapeFlowOr from '../Shapes/Shape-flow-or';
import ShapeFlowPredefinedProcess from '../Shapes/Shape-flow-predefined-process';
import ShapeFlowPreparation from '../Shapes/Shape-flow-preparation';
import ShapeFlowProcess from '../Shapes/Shape-flow-process';
import ShapeFlowPunchedTape from '../Shapes/Shape-flow-punched-tape';
import ShapeFlowSequentialAccessStorage from '../Shapes/Shape-flow-sequential-access-storage';
import ShapeFlowSort from '../Shapes/Shape-flow-sort';
import ShapeFlowStoredData from '../Shapes/Shape-flow-stored-data';
import ShapeFlowSummingJunction from '../Shapes/Shape-flow-summing-junction';
import ShapeFlowTerminator from '../Shapes/Shape-flow-terminator';
import ShapeFreeDrawing from '../Shapes/Shape-free-drawing';
import ShapeGrid from '../Shapes/Shape-grid';
import ShapeHelper from '../Shapes/ShapeHelper';
import ShapeIntersectHelper from '../Shapes/ShapeIntersectHelper';
import ShapeLeftArrow from '../Shapes/Shape-left-arrow';
import ShapeLeftRightArrow from '../Shapes/Shape-left-right-arrow';
import ShapeLeftTopRightArrow from '../Shapes/Shape-left-top-right-arrow';
import ShapeLeftUpArrow from '../Shapes/Shape-left-up-arrow';
import ShapeLineBox from '../Shapes/Shape-line-box';
import ShapeLoader from '../Shapes/ShapeLoader';
import ShapeManagement from '../Shapes/ShapeManagement';
import ShapeNotchedRightArrow from '../Shapes/Shape-notched-right-arrow';
import ShapeParabola from '../Shapes/Shape-parabola';
import ShapeParallelogram from '../Shapes/Shape-parallelogram';
import ShapePentagonArrow from '../Shapes/Shape-pentagon-arrow';
import ShapePolynomial from '../Shapes/Shape-polynomial';
import ShapeQuadArrow from '../Shapes/Shape-quad-arrow';
import ShapeRightArrow from '../Shapes/Shape-right-arrow';
import ShapeScale from '../Shapes/ShapeScale';
import ShapesDestructer from '../Shapes/ShapesDestructer';
import ShapeSpring from '../Shapes/Shape-spring';
import ShapeStripedRightArrow from '../Shapes/Shape-striped-right-arrow';
import ShapeUpArrow from '../Shapes/Shape-up-arrow';
import ShapeUpDownArrow from '../Shapes/Shape-up-down-arrow';
import ShapeUtil from '../Shapes/ShapeUtil';
import ShapeUTurnArrow from '../Shapes/Shape-u-turn-arrow';
import ShapeWave from '../Shapes/Shape-wave';
import SketchPickerWrapper from '../Editor/SketchPickerWrapper';
import SkewHelper from '../Geometry/SkewHelper';
import SnapToGridSize from '../Editor/SnapToGridSize';
import StyleHelper from '../Mathcha/StyleHelper';
import SwitchCaseError from '../Mathcha/SwitchCaseError';
import TemporaryShapeCreator from '../Shapes/TemporaryShapeCreator';
import TextColorItem from '../Elements/TextColorItem';
import TextHelper from '../Mathcha/TextHelper';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarChangeHandleWrapper from '../Editor/Toolbar/ToolbarChangeHandleWrapper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';
import TransformHelper from '../Editor/TransformHelper';
import WorkerInitializer from '../Mathcha/WorkerInitializer';

/// xxx(1507) /*Symbol-diagram*/

function tn(e, t) {
    var n = _.find(e, (e) => {
        return !DiagramIdHelper.isDiagramGroupId(e.id)
    });
    return n ? DiagramIdHelper.isDiagramLinkedId(n.id) ? FindEntityHelper.findOriginalEntityFromLink(n, t.elements) : n : tn(e[0].entities, t)
}
function nn(e, t, n, r, i) {
    return t.length <= 0 ? React.createElement("div", null) : function e(t, n, r, a) {
        var i = a ? _.some : _.every;
        return i(n, (n) => {
            if (DiagramIdHelper.isDiagramGroupId(n.id)) return e(t, n.entities, r, a);
            if (DiagramIdHelper.isDiagramLinkedId(n.id)) {
                var i = FindEntityHelper.findOriginalEntityFromLink(n, r.elements);
                var s = ShapesDestructer.findConnectedEditorAndConnections([i.id], r);
                var l = DiagramEntityHelper.getEntitiesByIds(s, r);
                return e(t, l, r, a)
            }
            return t(n)
        })
    } (e, t, n, i) ? r(tn(t, n)) : React.createElement("div", null)
}
function rn(e, t, n, r, i) {
    return n.length <= 0 ? React.createElement("div", null) : function e(t, n, r, a) {
        return _.every(r, (r) => {
            var i = EntityUtils.getEntityType(r);
            if (t.indexOf(i) >= 0) return true;
            if (n && "shape-composite" == i) return ShapeLoader.getShapeManagement(r).isSupportStyle(n, r);
            if ("group" == i) return e(t, n, r.entities, a);
            if ("linked" == i) {
                var o = FindEntityHelper.findOriginalEntityFromLink(r, a.elements);
                var s = ShapesDestructer.findConnectedEditorAndConnections([o.id], a);
                var l = DiagramEntityHelper.getEntitiesByIds(s, a);
                return e(t, n, l, a)
            }
        })
    } (e, t, n, r) ? i(tn(n, r)) : React.createElement("div", null)
}
function dn() {
    return React.createElement("svg", {
        style: {
            width: "17px",
            height: "14px",
            strokeWidth: "1px",
            stroke: "none",
            fill: "green",
            overflow: "visible"
        }
    },
    React.createElement("g", {
        style: {
            transform: "translate(1px,3px) scale(0.4,0.4)"
        }
    },
    React.createElement("path", {
        d: "M27.998,16c-0.012,6.628-5.373,11.986-11.999,11.998C9.373,27.986,4.012,22.627,4,15.999C4.012,9.373,9.373,4.012,15.999,4c2.024,0.003,3.928,0.515,5.601,1.402l-2.6,2.6h8.002V0l-2.476,2.476c-2.47-1.561-5.39-2.475-8.527-2.476C7.164,0.002,0.002,7.164,0,15.999C0.002,24.837,7.164,31.998,15.999,32C24.835,31.998,31.998,24.838,32,16H27.998z"
    }), React.createElement("path", {
        d: "M10.001,16c0,3.314,2.685,5.999,5.999,6c3.314-0.002,5.999-2.688,5.999-6H22c-0.001-3.314-2.686-6-6-6.001C12.686,10,10.001,12.686,10.001,16z M19.999,15.999L19.999,15.999c-0.004,2.21-1.79,3.995-3.999,3.999c-2.208-0.004-3.995-1.789-3.999-3.999C12.005,13.792,13.792,12.004,16,12C18.209,12.004,19.995,13.79,19.999,15.999z"
    })))
}
function un(e) {
    return e.entities.concat(_.values(e.linkedEditors))
}
function On(e, t, n, r, a, i) {
    if (e || t) {
        var o = {
            x: 0,
            y: 0
        };
        var s = mn.rotateEntities(r, o, -e, a);
        var l = EntityFinder.getFromEntities(s.entities, {
            editorRef: i,
            editors: s.allEditors
        },
        n);
        var c = Geometry.getCenterPoint(l);
        var d = gn.skewEntities(s.entities, c, -t, s.allEditors);
        var h = EntityFinder.getFromEntities(d.entities, {
            editorRef: i,
            editors: d.allEditors
        },
        n);
        var u = Geometry.getCenterPoint(h);
        var p = Geometry.pointRotate(u, o, e);
        return Geometry.moveRectBy2Points(h, u, p)
    }
    return EntityFinder.getFromEntities(r, {
        editorRef: i,
        editors: a
    },
    n)
}
function Nn() {
    return React.createElement("svg", {
        style: {
            width: "14px",
            height: "14px",
            strokeWidth: "1px",
            stroke: "none",
            fill: "green",
            overflow: "visible"
        }
    },
    React.createElement("rect", {
        transform: "skewX(-30)",
        x: 4,
        y: 4,
        width: 10,
        height: 10,
        fill: "orange",
        stroke: "white"
    }))
}
function gr(e) {
    return {
        shapeType: ItemDefaultSettings.getSettings(e, "shapeType"),
        radius: ItemDefaultSettings.getSettings(e, "radius")
    }
}
function wr(e) {
    return Geometry.round2(e)
}
function Ma(e) {
    var t = e.rect;
    return {
        p1: {
            x: t.left,
            y: t.top
        },
        p2: {
            x: t.left + t.width,
            y: t.top + t.height
        }
    }
}
/// n.r(t)
/// var xx = n(91)/*MathType*/;  // 1 times
/// var r = n(0)/*React*/;  // 1250 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(6)/*DiagramIdHelper*/;  // 175 times
/// var s = n(35)/*slicedToArray*/;  // 6 times
/// var l = n.n(s);
/// var c = n(3);  // 114 times
/// var d = n.n(c);
/// var h = n(2)/*lodash*/;  // 91 times
/// var u = n.n(h);
/// var p = n(16)/*ReactDOM*/;  // 16 times
/// var m = n.n(p);
/// var f = n(4)/*DOMHelper*/;  // 8 times
/// var g = n(21)/*EditArea*/;  // 1 times
/// var y = n(24)/*EventHelper*/;  // 16 times
/// var A = n(7)/*PropUpdateHelper*/;  // 70 times
/// var E = n(1)/*Geometry*/;  // 133 times
/// var v = n(77)/*TextHelper*/;  // 2 times
/// var S = n(18)/*StyleHelper*/;  // 1 times
/// var C = n(85)/*CursorHandler*/;  // 3 times
/// var x = n(11)/*Global*/;  // 24 times
/// var I = n(14)/*classnames*/;  // 12 times
/// var T = n.n(I);
/// var b = n(69)/*ExpandableComponent*/;  // 10 times
class L extends ExpandableComponentB {
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.value != this.props.value
    }
    getItemOptionClss(e) {
        return classNames("thickness-option", {
            selected: e === this.getThickness()
        })
    }
    renderHalfPixel() {
        if (this.props.supportHalfPixel) {
            var e = React.createElement("line", {
                x1: 2,
                y1: 5,
                x2: 37,
                y2: 5
            });
            return React.createElement("item-option", {
                class: this.getItemOptionClss(.5),
                onMouseDown: (e) => {
                    return this.onItemSelect(.5, e)
                }
            },
            React.createElement("svg", {
                style: {
                    width: 40,
                    height: 20
                }
            },
            React.cloneElement(e, {
                style: {
                    strokeWidth: "0.5px"
                }
            })))
        }
    }
    renderExpandComponent() {
        var e = React.createElement("line", {
            x1: 2,
            y1: 5,
            x2: 37,
            y2: 5
        });
        var t = {
            width: 40,
            height: 20
        };
        return React.createElement(ExpandableComponent, null, this.renderHalfPixel(), React.createElement("item-option", {
            class: this.getItemOptionClss(1),
            onMouseDown: (e) => {
                return this.onItemSelect(1, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "1px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(2),
            onMouseDown: (e) => {
                return this.onItemSelect(2, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "2px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(3),
            onMouseDown: (e) => {
                return this.onItemSelect(3, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "3px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(4),
            onMouseDown: (e) => {
                return this.onItemSelect(4, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "4px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(5),
            onMouseDown: (e) => {
                return this.onItemSelect(5, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "5px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(6),
            onMouseDown: (e) => {
                return this.onItemSelect(6, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "6px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(7),
            onMouseDown: (e) => {
                return this.onItemSelect(7, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "7px"
            }
        }))), React.createElement("item-option", {
            class: this.getItemOptionClss(8),
            onMouseDown: (e) => {
                return this.onItemSelect(8, e)
            }
        },
        React.createElement("svg", {
            style: t
        },
        React.cloneElement(e, {
            style: {
                strokeWidth: "8px"
            }
        }))))
    }
    getComponentClassName() {
        return "thickness"
    }
    getThickness() {
        return this.props.value || 1
    }
    renderComponent() {
        var e = {
            strokeWidth: this.getThickness()
        };
        var t = Math.max(this.getThickness() / 2, 1);
        var n = "M9,".concat(7 - t, " L13,").concat(11 - t, " L17,").concat(7 - t);
        var r = "M9,".concat(17 + t, " L13,").concat(13 + t, " L17,").concat(17 + t);
        return React.createElement("x-item", {
            class: "setting",
            title: "Stroke Thickness"
        },
        React.createElement("x-thickness", null, React.createElement("svg", {
            className: "thickness"
        },
        React.createElement("path", {
            d: n
        }), React.createElement("path", {
            d: r
        }), React.createElement("line", {
            x1: 2,
            y1: 12,
            x2: 24,
            y2: 12,
            style: e
        }))))
    }
}
/// var R = n(160)/*FillColorIcon*/;  // 5 times
class M extends ExpandableComponentB {
    constructor(e) {
        super(e);
        this.partMap = null
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.part != this.props.part
    }
    renderPair(e, t) {
        return this.partMap = this.partMap || {},
        this.partMap[e.key] = e,
        this.partMap[t.key] = t,
        React.createElement("pair-option", null, React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(e.key),
            onMouseDown: this.onItemSelect.bind(this, e.key)
        },
        e), React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(t.key),
            onMouseDown: this.onItemSelect.bind(this, t.key)
        },
        t))
    }
    render2Pair(e, t, n, r) {
        return this.partMap = this.partMap || {},
        this.partMap[e.key] = e,
        this.partMap[t.key] = t,
        this.partMap[n.key] = n,
        this.partMap[r.key] = r,
        React.createElement("pair-option", null, React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(e.key),
            onMouseDown: this.onItemSelect.bind(this, e.key)
        },
        e), React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(t.key),
            onMouseDown: this.onItemSelect.bind(this, t.key)
        },
        t), React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(n.key),
            onMouseDown: this.onItemSelect.bind(this, n.key)
        },
        n), React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(r.key),
            onMouseDown: this.onItemSelect.bind(this, r.key)
        },
        r))
    }
    getItemOptionClss(e) {
        return classNames({
            selected: this.props.part === e
        })
    }
    renderOne(e) {
        return this.partMap = this.partMap || {},
        this.partMap[e.key] = e,
        React.createElement("item-option", {
            style: this.getItemOptionStyle(),
            class: this.getItemOptionClss(e.key),
            onMouseDown: this.onItemSelect.bind(this, e.key)
        },
        e)
    }
    renderSelected() {
        if ("no" == this.props.part) return React.createElement(w, null);
        var e = this.partMap[this.props.part];
        return React.cloneElement(e, {
            style: _.assignIn({},
            e.props.style, {
                transform: "translateY(2px)"
            })
        })
    }
    getCustomClass() {
        return ""
    }
    renderExpandContainer() {
        var e = super.renderExpandContainer();
        return e || this.partMap || this.renderOptions(),
        e
    }
    renderExpandComponent() {
        return this.renderOptions()
    }
    getComponentClassName() {
        return "arrow-part"
    }
    renderComponent() {
        return React.createElement("x-item", {
            class: "setting",
            style: this.getItemStyle()
        },
        this.renderSelected())
    }
}
var w = () => {
    return React.createElement("div", {
        style: {
            display: "block",
            position: "absolute",
            left: "4px",
            top: "7px",
            background: "lightgray",
            width: "10px",
            height: "10px"
        }
    })
};
/// var O = n(84)/*ControlPoints*/;  // 8 times
/// var D = n(10)/*ShapeHelper*/;  // 4 times
class N extends M {
    constructor(e) {
        super(e);
        this.title = "Shaft Type"
    }
    renderOptions() {
        return React.createElement(ExpandableComponent, null, this.renderOne(React.createElement("svg", {
            style: k,
            key: "-"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2-"
        },
        React.createElement("line", {
            x1: "0",
            y1: "8.5",
            x2: "60",
            y2: "8.5"
        }), React.createElement("line", {
            x1: "0",
            y1: "11.5",
            x2: "60",
            y2: "11.5"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "."
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "1.125 3.35"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2."
        },
        React.createElement("line", {
            x1: "0",
            y1: "8.5",
            x2: "60",
            y2: "8.5",
            strokeDasharray: "1.125 3.35"
        }), React.createElement("line", {
            x1: "0",
            y1: "11.5",
            x2: "60",
            y2: "11.5",
            strokeDasharray: "1.125 3.35"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "--"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "6 6"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2--"
        },
        React.createElement("line", {
            x1: "0",
            y1: "8.5",
            x2: "60",
            y2: "8.5",
            strokeDasharray: "6 6"
        }), React.createElement("line", {
            x1: "0",
            y1: "11.5",
            x2: "60",
            y2: "11.5",
            strokeDasharray: "6 6"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "~"
        },
        ControlPoints.getWaveLine({
            x: 0,
            y: 10
        },
        {
            x: 60,
            y: 10
        },
        5, 2.5, 0, 0))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2~"
        },
        ControlPoints.getDoubleWaveLine({
            x: 0,
            y: 10
        },
        {
            x: 60,
            y: 10
        },
        5, 2.5))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "~."
        },
        React.cloneElement(ControlPoints.getWaveLine({
            x: 0,
            y: 10
        },
        {
            x: 60,
            y: 10
        },
        5, 2.5, 0, 0), {
            strokeDasharray: "1 1"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2~."
        },
        React.cloneElement(ControlPoints.getDoubleWaveLine({
            x: 0,
            y: 10
        },
        {
            x: 60,
            y: 10
        },
        5, 2.5), {
            strokeDasharray: "1 1"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "|"
        },
        React.createElement("path", {
            d: ShapeHelper.getRulerLinesDFromPoints([{
                x: 0,
                y: 10
            },
            {
                x: 60,
                y: 10
            }], 8, 10),
            style: {
                stroke: "gray",
                strokeWidth: 1,
                fill: "none"
            }
        }))))
    }
    getComponentClassName() {
        return super.getComponentClassName() + " arrow-shaft"
    }
    getItemStyle() {
        return {
            width: 40
        }
    }
    getItemOptionStyle() {
        return {
            width: 60
        }
    }
}
var k = {
    width: "100%",
    height: "100%",
    stroke: "gray",
    strokeWidth: "1px",
    fill: "none",
    overflow: "hidden"
};
class B extends M {
    constructor(e) {
        super(e);
        this.title = "Shaft Type"
    }
    renderOptions() {
        return React.createElement(ExpandableComponent, null, this.renderOne(React.createElement("svg", {
            style: k,
            key: "-"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "."
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "1.125 3.35"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "--"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "6 6"
        }))))
    }
    getItemStyle() {
        return {
            width: 40
        }
    }
    getItemOptionStyle() {
        return {
            width: 60
        }
    }
    getComponentClassName() {
        return super.getComponentClassName() + " arrow-shaft"
    }
}
/// var P = n(51)/*SelectBoxContainer*/;  // 3 times
/// var F = n(206)/*MathPlotSettingsBuilder*/;  // 1 times
/// var H = n(178)/*WorkerInitializer*/;  // 1 times
var workerInitializer = null;
class U {
    constructor() {
        this.id = Math.random().toString()
    }
    getWall() {
        if (null == workerInitializer) workerInitializer = new WorkerInitializer("builtin.worker");
        return workerInitializer
    }
    isValidExpression(e) {
        return this.getWall().request({
            isValidation: true,
            expression: e
        },
        this.id)
    }
}
/// var G = n(19)/*TimerHelper*/;  // 3 times
/// var z = n(25)/*ColorHelper*/;  // 51 times
/// var Y = n(13)/*CreateEditorObject*/;  // 4 times
class K extends React.PureComponent {
    constructor(e) {
        super(e);
        this.plotValidation = new U;
        this.onSelectedLineChanged = (e) => {
            var t = this.props.functions.find((t) => {
                return t.model.id === e
            });
            this.setState({
                selectedFuncModelId: e,
                wrappedFunction: this.wrapInEditor(t.model)
            })
        };
        this.onAddNewLine = () => {
            var e = this.props;
            var t = e.functions;
            var n = e.onFunctionsChanged;
            var r = DiagramIdHelper.nextId();
            var a = t.concat([{
                model: {
                    id: r,
                    lines: [{
                        id: DiagramIdHelper.nextId(),
                        blocks: [{
                            id: DiagramIdHelper.nextId(),
                            text: "4*sin(x)+5*cos(x/2)"
                        }]
                    }]
                }
            }]);
            n(a);
            TimerHelper.next(() => {
                this.setState({
                    selectedFuncModelId: r,
                    wrappedFunction: this.wrapInEditor(a[a.length - 1].model)
                })
            })
        };
        this.onRemoveCurrentLine = () => {
            var e = this.props;
            var t = e.functions;
            var n = e.onFunctionsChanged;
            if (! (t.length <= 1)) {
                var r = t.findIndex((e) => {
                    return e.model.id === this.state.selectedFuncModelId
                });
                var a = PropUpdateHelper.remove(t, r);
                this.setState({
                    selectedFuncModelId: a[0].model.id,
                    wrappedFunction: this.wrapInEditor(a[0].model)
                });
                n(a)
            }
        };
        this.onMathTypeModelChanged = (e) => {
            var t = e.lines[0].blocks[0].elements.mathValue;
            this.changeFunction((e) => {
                return PropUpdateHelper.setProp(e, "model", t)
            })
        };
        this.handleThicknessChanged = (e) => {
            this.changeFunction((t) => {
                return PropUpdateHelper.setProp(t, "style", PropUpdateHelper.setProp(t.style || {},
                "thickness", e))
            })
        };
        this.handleStrokeColorChanged = (e) => {
            this.changeFunction((t) => {
                return PropUpdateHelper.setProp(t, "style", PropUpdateHelper.setProp(t.style || {},
                "strokeColor", e))
            })
        };
        this.handleStrokeTypeChanged = (e) => {
            this.changeFunction((t) => {
                return PropUpdateHelper.setProp(t, "style", PropUpdateHelper.setProp(t.style || {},
                "strokeType", e))
            })
        };
        this.state = {
            selectedFuncModelId: this.props.functions[0].model.id,
            wrappedFunction: this.wrapInEditor(this.props.functions[0].model),
            isExpressionValid: true
        }
    }
    wrapInEditor(e) {
        var t = CreateEditorObject.createComposite("\\math-container");
        t.elements.mathValue = e;
        t.displayMode = false;
        var n = CreateEditorObject.createEmptyEditor();
        return n.lines[0].blocks.push(t),
        n
    }
    changeFunction(e) {
        var t = this.props;
        var n = t.functions;
        var r = t.onFunctionsChanged;
        var a = n.findIndex((e) => {
            return e.model.id === this.state.selectedFuncModelId
        });
        var i = e(n[a]);
        r(PropUpdateHelper.setIndex(n, a, i))
    }
    renderInvalidText() {
        if (!this.state.isExpressionValid) return React.createElement("div", {
            className: "role-invalid-expression",
            style: {
                color: "#D0021B",
                position: "absolute",
                right: 3,
                bottom: 0,
                fontFamily: "Arial",
                fontSize: 12,
                opacity: .5
            }
        },
        "Invalid Expression")
    }
    render() {
        var e = this.props.functions;
        var t = e.find((e) => {
            return e.model.id === this.state.selectedFuncModelId
        });
        var n = ColorHelper.getStyle(t.style, "thickness");
        var r = ColorHelper.getStyle(t.style, "strokeColor");
        var i = ColorHelper.getStyle(t.style, "strokeType");
        var o = e.map((e, t) => {
            return {
                key: e.model.id,
                value: "Line " + t
            }
        });
        var s = MathPlotSettingsBuilder.editorModelToExpression(t.model);
        return this.plotValidation.isValidExpression(s).then((e) => {
            var t = e.status;
            var n = e.data;
            if ("running" != t && n != this.state.isExpressionValid) this.setState({
                isExpressionValid: n
            })
        }),
        React.createElement("pls-tab", {
            style: V
        },
        React.createElement("div", {
            style: {
                margin: 10,
                marginBottom: 5,
                display: "flex"
            }
        },
        React.createElement(SelectBoxContainer, {
            data: o,
            isReadOnly: true,
            onChange: this.onSelectedLineChanged,
            value: t.model.id,
            width: 100
        }), React.createElement("button", {
            className: "btn-normal",
            style: {
                margin: "0 4px"
            },
            onMouseDown: this.onAddNewLine
        },
        "Add Line"), React.createElement("button", {
            className: "btn-normal",
            style: {
                margin: "0 4px"
            },
            onMouseDown: this.onRemoveCurrentLine
        },
        "Remove"), React.createElement("div", {
            style: {
                marginTop: -2,
                display: "flex"
            }
        },
        React.createElement(L, {
            value: n,
            onItemSelect: this.handleThicknessChanged
        }), React.createElement(FillColorIcon, {
            value: r,
            onItemSelect: this.handleStrokeColorChanged
        }), React.createElement(B, {
            part: i,
            onItemSelect: this.handleStrokeTypeChanged
        }))), React.createElement("div", {
            style: {
                margin: 10,
                marginTop: 5,
                overflow: "visible",
                fontFamily: "Asana-Math,Asana",
                background: "white",
                border: this.state.isExpressionValid ? "1px solid lightgray" : "1px solid #D0021B",
                maxWidth: 481,
                maxHeight: 80,
                position: "relative"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement("span", {
            style: {
                color: "gray"
            }
        },
        "f(x)="), React.createElement(MathType, {
            restrictedView:
            true,
            oneMode: "math-mode",
            multiline: false,
            onModelChanged: this.onMathTypeModelChanged,
            model: this.state.wrappedFunction,
            insidePlotFunction: true,
            enableContextMenu: true,
            style: {
                padding: 4,
                border: "none",
                marginTop: 0,
                background: "white",
                width: "100%"
            }
        })), this.renderInvalidText()))
    }
}
var V = {
    flexDirection: "column",
    flexGrow: 1,
    borderLeft: "1px solid lightgray"
};
/// var j = n(138)/*FindAndReplaceOptionsComponent*/;  // 6 times
/// var q = n(41)/*NumericSliderComponent*/;  // 26 times
/// var Q = n(17)/*ItemDefaultSettings*/;  // 68 times
class Z extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleAxisTypeChanged = (e) => {
            var t = e.key;
            var n = this.props;
            var r = n.axes;
            (0, n.onAxesChanged)(ItemDefaultSettings.setSetting(r, "axisType", t))
        };
        this.handleAxisArrangmentChanged = (e) => {
            var t = e.key;
            var n = this.props;
            var r = n.axes;
            (0, n.onAxesChanged)(ItemDefaultSettings.setSetting(r, "axisArrangement", t))
        }
    }
    handleChangeAxisSetting(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        var a = this.props;
        var i = a.axes;
        var o = a.onAxesChanged;
        var s = ItemDefaultSettings.setSetting(i[e] || {},
        t, n);
        if (r.dependTo && n && !s.settings[r.dependTo]) s = ItemDefaultSettings.setSetting(s, r.dependTo, true);
        (r.dependFroms || []).forEach((e) => {
            if (!n && s.settings[e]) s = ItemDefaultSettings.setSetting(s, e, false)
        });
        o(PropUpdateHelper.setProp(i, e, s))
    }
    renderAxesTab() {
        var e = this.props.axes;
        var t = e.xAxis || {};
        var n = e.yAxis || {};
        var r = ItemDefaultSettings.getPlotSettings(e, "axisType");
        var i = ItemDefaultSettings.getPlotSettings(t, "scale");
        var o = ItemDefaultSettings.getPlotSettings(n, "scale");
        var s = ItemDefaultSettings.getPlotSettings(e, "axisArrangement");
        return React.createElement("div", {
            style: {
                margin: 10,
                fontSize: 12
            }
        },
        React.createElement("div", null, React.createElement("span", {
            style: {
                display: "inline-block",
                width: 90
            }
        },
        "Axes Type:"), React.createElement(FindAndReplaceOptionsComponent, {
            style: {
                fontSize: 12,
                display: "inline-block",
                lineHeight: "1.2em",
                marginLeft: 4
            },
            preventDefault: true,
            stopPropagation: true,
            selectedKeys: [r],
            onSelect: this.handleAxisTypeChanged,
            items: X
        })), React.createElement("div", {
            style: {
                marginTop: 5
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 90
            }
        },
        "Arrangement:"), React.createElement(FindAndReplaceOptionsComponent, {
            disabled: "school" != r,
            style: {
                fontSize: 12,
                display: "inline-block",
                lineHeight: "1.2em",
                marginLeft: 4
            },
            preventDefault: true,
            stopPropagation: true,
            selectedKeys: [s],
            onSelect: this.handleAxisArrangmentChanged,
            items: J
        })), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                marginTop: 5
            }
        },
        React.createElement("span", {
            style: {
                width: 90,
                display: "inline-block"
            }
        },
        "Scale:"), React.createElement(NumericSliderComponent, {
            title: "Scale",
            decimals: 1,
            containerStyle: {
                paddingTop: 0,
                marginLeft: 2
            },
            style: {
                width: 50
            },
            unit: "px",
            min: .1,
            max: 500,
            step: .1,
            value: i,
            onValueChanging: (e) => {
                return this.handleChangeAxisSetting("xAxis", "scale", e)
            },
            onValueChanged: (e) => {
                return this.handleChangeAxisSetting("xAxis", "scale", e)
            }
        }), React.createElement(NumericSliderComponent, {
            title: "Scale",
            decimals: 1,
            containerStyle: {
                paddingTop: 0,
                marginLeft: 4
            },
            style: {
                width: 46
            },
            unit: "px",
            min: .1,
            max: 500,
            step: .1,
            value: o,
            onValueChanging: (e) => {
                return this.handleChangeAxisSetting("yAxis", "scale", e)
            },
            onValueChanged: (e) => {
                return this.handleChangeAxisSetting("yAxis", "scale", e)
            }
        })))
    }
    render() {
        return React.createElement("pls-tab", {
            style: $
        },
        this.renderAxesTab())
    }
}
var X = [{
    key: "school",
    style: {
        width: 70,
        textAlign: "center"
    },
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "School")
},
{
    style: {
        marginLeft: 4,
        width: 70,
        textAlign: "center"
    },
    key: "scientific",
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "Scientific")
},
{
    style: {
        marginLeft: 4,
        textAlign: "center"
    },
    key: "scientific-clean",
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "Scientific Clean")
}];
var J = [{
    key: "axis-plot-label",
    style: {
        width: 70,
        textAlign: "center"
    },
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "Label Top")
},
{
    style: {
        marginLeft: 4,
        width: 70,
        textAlign: "center"
    },
    key: "axis-label-plot",
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "Plot Top")
},
{
    style: {
        marginLeft: 4,
        textAlign: "center"
    },
    key: "plot-axis-label",
    element: React.createElement("span", {
        style: {
            padding: 4,
            lineHeight: "!5px"
        }
    },
    "Axis Top")
}];
var $ = {
    flexDirection: "column",
    flexGrow: 1,
    borderLeft: "1px solid lightgray"
};
/// var ee = n(37)/*ToolbarIcons*/;  // 9 times
/// var te = n(33)/*ItemRemoveSelected*/;  // 33 times
/// var ne = n(242)/*TextColorItem*/;  // 2 times
class re extends React.PureComponent {
    handleChangeAxisSetting(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var r = this.props;
        var a = r.axis;
        var i = r.onAxisChanged;
        var o = ItemDefaultSettings.setSetting(a || {},
        e, t);
        if (n.dependTo && t && !o.settings[n.dependTo]) o = ItemDefaultSettings.setSetting(o, n.dependTo, true);
        (n.dependFroms || []).forEach((e) => {
            if (!t && o.settings[e]) o = ItemDefaultSettings.setSetting(o, e, false)
        });
        i(o)
    }
    renderMajorTickCount(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                width: 100
            }
        },
        React.createElement("span", {
            style: {
                width: 55,
                position: "relative"
            },
            className: "toolbar-container"
        },
        React.createElement("span", null, "Count:"), React.createElement("span", {
            style: {
                padding: "0 5px",
                color: "lightblue"
            }
        },
        React.createElement("i", {
            className: "fa fa-info-circle"
        }), React.createElement("div", {
            className: "unsupport-justification-text tool-bar-text",
            style: {
                position: "absolute",
                top: "100%",
                margintop: 5,
                color: "orange",
                background: "white",
                border: "1px solid lightgray",
                textAlign: "center",
                fontSize: 12,
                padding: 3,
                width: 220,
                lineHeight: "1.4em"
            }
        },
        "Number of Tick is just approximate"))), React.createElement(NumericSliderComponent, {
            title: "Number of steps",
            velocity: .1,
            containerStyle: {
                paddingTop: 4,
                marginLeft: 2
            },
            style: {
                width: 25
            },
            unit: "",
            min: 1,
            max: 40,
            step: 1,
            value: n,
            disabled: !e && !t,
            onValueChanging: (e) => {
                return this.handleChangeAxisSetting("majorSteps", e)
            },
            onValueChanged: (e) => {
                return this.handleChangeAxisSetting("majorSteps", e)
            }
        }))
    }
    renderMinorTickCount(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                width: 100
            }
        },
        React.createElement("span", {
            style: {
                width: 55
            }
        },
        "Count:"), React.createElement(NumericSliderComponent, {
            title: "Number of minor steps between steps",
            velocity: .1,
            containerStyle: {
                paddingTop: 4,
                marginLeft: 2
            },
            style: {
                width: 25
            },
            unit: "",
            min: 1,
            max: 20,
            step: 1,
            value: n,
            disabled: !e && !t,
            onValueChanging: (e) => {
                return this.handleChangeAxisSetting("minorStep", e)
            },
            onValueChanged: (e) => {
                return this.handleChangeAxisSetting("minorStep", e)
            }
        }))
    }
    renderAxis() {
        var e = this.props.axis || {};
        var t = ItemDefaultSettings.getPlotSettings(e, "plotAxisShow");
        var n = ItemDefaultSettings.getPlotSettings(e, "plotAxisNumering");
        var r = ItemDefaultSettings.getPlotSettings(e, "plotGridShow");
        var i = ItemDefaultSettings.getPlotSettings(e, "majorSteps");
        var o = ItemDefaultSettings.getPlotSettings(e, "majorTextColor");
        var s = ItemDefaultSettings.getPlotSettings(e, "majorTextFontSize");
        var l = ItemDefaultSettings.getPlotSettings(e, "minorTickShow");
        var c = ItemDefaultSettings.getPlotSettings(e, "minorGridShow");
        var d = ItemDefaultSettings.getPlotSettings(e, "minorStep");
        var h = ItemDefaultSettings.getPlotSettings(e, "unitType");
        var u = ItemDefaultSettings.getPlotSettings(e, "axisColor");
        var p = "horizontal" == this.props.gridOrientation ? ToolbarIcons.gridY : ToolbarIcons.gridX;
        var m = ItemDefaultSettings.getPlotSettings(e, "axisThickness");
        return React.createElement("div", {
            style: oe
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("span", {
            style: {
                width: 70,
                display: "inline-block"
            }
        },
        "Axis:"), React.createElement(SelectBoxContainer, {
            width: 70,
            style: {
                position: "relative",
                lineHeight: "1.4em",
                marginTop: 3,
                marginLeft: 5
            },
            inputStyle: {
                color: "black"
            },
            data: ae,
            value: h,
            onChange: (e) => {
                return this.handleChangeAxisSetting("unitType", e)
            }
        }), React.createElement(FillColorIcon, {
            style: {
                stroke: "none",
                lineHeight: "1.4em",
                marginLeft: 4
            },
            value: u,
            onItemSelect: (e) => {
                return this.handleChangeAxisSetting("axisColor", e)
            }
        }), React.createElement(L, {
            supportHalfPixel: true,
            style: {
                marginLeft: 4
            },
            value: m,
            onItemSelect: (e) => {
                return this.handleChangeAxisSetting("axisThickness", e)
            }
        })), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("span", {
            style: {
                width: 70,
                display: "inline-block"
            }
        },
        "Major Ticks:"), React.createElement("div", {
            style: {
                display: "flex",
                width: 80
            }
        },
        React.createElement("x-item", {
            title: "Enable Axis",
            onMouseDown: () => {
                this.handleChangeAxisSetting("plotAxisShow", !t, {
                    dependFroms: ["plotAxisNumering", "minorTickShow"]
                })
            },
            class: classNames("setting", {
                selected: t
            }),
            style: se
        },
        ToolbarIcons.axis), React.createElement("x-item", {
            title: "Grid",
            onMouseDown: () => {
                return this.handleChangeAxisSetting("plotGridShow", !r, {
                    dependFroms: ["minorGridShow"]
                })
            },
            class: classNames("setting", {
                selected: r
            }),
            style: se
        },
        p)), this.renderMajorTickCount(t, r, i), React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                width: 64
            }
        },
        "Numering:"), React.createElement("x-item", {
            title: "Show Number",
            onMouseDown: () => {
                return this.handleChangeAxisSetting("plotAxisNumering", !n, {
                    dependTo: "plotAxisShow"
                })
            },
            class: classNames("setting", {
                selected: n
            }),
            style: se
        },
        ItemRemoveSelected.svgNumberIcon()), React.createElement(TextColorItem, {
            style: {
                stroke: "none",
                lineHeight: "1.4em"
            },
            value: o,
            onItemSelect: (e) => {
                return this.handleChangeAxisSetting("majorTextColor", e)
            }
        }), React.createElement(SelectBoxContainer, {
            width: 50,
            style: {
                position: "relative",
                lineHeight: "1.4em",
                marginTop: 3,
                marginLeft: 5
            },
            inputStyle: {
                color: "black"
            },
            data: ie,
            value: s,
            onChange: (e) => {
                return this.handleChangeAxisSetting("majorTextFontSize", Number.parseInt(e.toString(), 10))
            }
        }))), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("span", {
            style: {
                width: 70,
                display: "inline-block"
            }
        },
        "Minor Ticks:"), React.createElement("div", {
            style: {
                display: "flex",
                width: 80
            }
        },
        React.createElement("x-item", {
            title: "Enable Axis",
            onMouseDown: () => {
                this.handleChangeAxisSetting("minorTickShow", !l, {
                    dependTo: "plotAxisShow"
                })
            },
            class: classNames("setting", {
                selected: l
            }),
            style: se
        },
        ToolbarIcons.axis), React.createElement("x-item", {
            title: "Grid",
            onMouseDown: () => {
                return this.handleChangeAxisSetting("minorGridShow", !c, {
                    dependTo: "plotGridShow"
                })
            },
            class: classNames("setting", {
                selected: c
            }),
            style: se
        },
        p)), this.renderMinorTickCount(l, c, d)))
    }
    render() {
        return React.createElement("pls-tab", {
            style: le
        },
        React.createElement("div", {
            style: {
                margin: 10,
                fontSize: 12
            }
        },
        this.renderAxis()))
    }
}
var ae = [{
    key: "radix10",
    value: "Number"
},
{
    key: "pi",
    value: "Radian"
}];
var ie = [{
    key: 8,
    value: "8px"
},
{
    key: 9,
    value: "9px"
},
{
    key: 10,
    value: "10px"
},
{
    key: 11,
    value: "11px"
},
{
    key: 12,
    value: "12px"
},
{
    key: 13,
    value: "13px"
},
{
    key: 14,
    value: "14px"
},
{
    key: 15,
    value: "15px"
},
{
    key: 16,
    value: "16px"
},
{
    key: 17,
    value: "17px"
},
{
    key: 18,
    value: "18px"
},
{
    key: 19,
    value: "19px"
},
{
    key: 20,
    value: "20px"
},
{
    key: 21,
    value: "21px"
},
{
    key: 22,
    value: "22px"
}];
var oe = {
    display: "flex",
    flexDirection: "column",
    lineHeight: "2.5em"
};
var se = {
    width: 24,
    marginLeft: 4,
    marginRight: 4
};
var le = {
    flexDirection: "column",
    flexGrow: 1,
    borderLeft: "1px solid lightgray"
};
class ce extends React.Component {
    constructor(e) {
        super(e);
        this.onAxesChanged = (e) => {
            this.props.onShapeChanged(PropUpdateHelper.setProp(this.props.shape, "axes", e))
        };
        this.handleXAxisChanged = (e) => {
            var t = _.assignIn({},
            this.props.shape.axes, {
                xAxis: e
            });
            this.props.onShapeChanged(PropUpdateHelper.setProp(this.props.shape, "axes", t))
        };
        this.handleYAxisChanged = (e) => {
            var t = _.assignIn({},
            this.props.shape.axes, {
                yAxis: e
            });
            this.props.onShapeChanged(PropUpdateHelper.setProp(this.props.shape, "axes", t))
        };
        this.onFunctionsChanged = (e) => {
            this.props.onShapeChanged(PropUpdateHelper.setProp(this.props.shape, "functions", e))
        };
        this.handleSettingIconClick = () => {
            this.setState({
                expandedMode: true
            });
            this.props.requestSettingMode()
        };
        this.state = {
            selectedTab: "func",
            expandedMode: false
        }
    }
    renderFuncTab() {
        if ("func" == this.state.selectedTab) return React.createElement(K, {
            functions: this.props.shape.functions,
            onFunctionsChanged: this.onFunctionsChanged
        })
    }
    renderAxesTab() {
        if ("axes" == this.state.selectedTab) return React.createElement(Z, {
            axes: this.props.shape.axes,
            onAxesChanged: this.onAxesChanged
        })
    }
    renderYAxisTab() {
        if ("y-axis" == this.state.selectedTab) return React.createElement(re, {
            gridOrientation: "horizontal",
            axis: this.props.shape.axes.yAxis,
            onAxisChanged: this.handleYAxisChanged
        })
    }
    renderXAxisTab() {
        if ("x-axis" == this.state.selectedTab) return React.createElement(re, {
            gridOrientation: "vertical",
            axis: this.props.shape.axes.xAxis,
            onAxisChanged: this.handleXAxisChanged
        })
    }
    renderSettingIcon() {
        var e = {
            background: "#fbfafa",
            position: "absolute",
            left: this.props.shape.data.p1.x - 3,
            top: this.props.shape.data.p1.y - 26,
            width: 20,
            height: 18,
            textAlign: "center",
            cursor: "pointer",
            fontSize: 18
        };
        return React.createElement("div", {
            className: "no-print plot-settings-icon-wrapper",
            style: e,
            onMouseDown: this.handleSettingIconClick
        },
        React.createElement("i", {
            className: "fa fa-cog",
            "aria-hidden": "true"
        }))
    }
    render() {
        if (!this.state.expandedMode) return this.renderSettingIcon();
        var e = PropUpdateHelper.update(he, {
            background: "rgb(247,247,247)",
            borderRight: "1px solid #f1f0f0",
            borderBottom: "1px solid lightgray",
            position: "relative"
        });
        var t = PropUpdateHelper.update(e, {
            borderTop: "1px solid lightgray"
        });
        var n = this.props.shape.data.p1;
        var r = PropUpdateHelper.update(ue, {
            top: n.y - 135,
            left: Math.min(n.x, 100)
        });
        return React.createElement("plot-line-settings", {
            class: "no-print",
            style: r,
            onDoubleClick: (e) => {
                return e.stopPropagation()
            }
        },
        React.createElement("pls-tab-items", {
            style: de
        },
        React.createElement("pls-tab-item", {
            onClick: () => {
                return this.setState({
                    selectedTab: "func"
                })
            },
            style: "func" == this.state.selectedTab ? e : he
        },
        "Func"), React.createElement("pls-tab-item", {
            onClick: () => {
                return this.setState({
                    selectedTab: "axes"
                })
            },
            style: "axes" == this.state.selectedTab ? t : he
        },
        "Axes"), React.createElement("pls-tab-item", {
            onClick: () => {
                return this.setState({
                    selectedTab: "x-axis"
                })
            },
            style: "x-axis" == this.state.selectedTab ? t : he
        },
        "X Axis"), React.createElement("pls-tab-item", {
            onClick: () => {
                return this.setState({
                    selectedTab: "y-axis"
                })
            },
            style: "y-axis" == this.state.selectedTab ? t : he
        },
        "Y Axis")), this.renderFuncTab(), this.renderAxesTab(), this.renderYAxisTab(), this.renderXAxisTab())
    }
}
var de = {
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    background: "white"
};
var he = {
    padding: "8px 8px",
    marginRight: -1,
    cursor: "pointer"
};
var ue = {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: -2,
    top: "-100%",
    width: 550,
    minWidth: 500,
    border: "1px solid lightgray",
    background: "#f7f7f7",
    boxShadow: "1px 1px 1px 0px #e0dddd",
    borderLeft: "1px solid lightgray",
    paddingLeft: 0,
    minHeight: 65,
    zIndex: 1E5,
    fontFamily: '"Segoe UI",Arial,Verdana,sans-serif'
};
/// var pe = n(23)/*PropTypesExporter*/;  // 12 times
/// var me = n.n(pe);
/// var fe = n(5)/*sizzle*/;  // 24 times
/// var ge = n.n(fe);
/// var ye = n(86)/*FindEntityHelper*/;  // 7 times
/// var Ae = n(95)/*DocumentCorruption*/;  // 1 times
/// var Ee = n(42)/*ColorTypeConverter*/;  // 14 times
/// var ve = n(48)/*FontList*/;  // 1 times
class Se extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSelectItem = (e, t) => {
            if (t.isInGroup) {
                var n = FindEntityHelper.findGroupedEnityFromEditor(t.id, this.props.data.shapes);
                if (n) this.props.onSelectItem(e, n)
            } else this.props.onSelectItem(e, t)
        }
    }
    shouldComponentUpdate(e) {
        return e.singleSelectedId != this.props.singleSelectedId || e.groupSelectedIds != this.props.groupSelectedIds || e.data.elements != this.props.data.elements || e.selected != this.props.selected
    }
    componentDidUpdate(e) {
        if (_.keys(e.data.elements).length != _.keys(this.props.data.elements).length) return this.props.editorDidUpdate(),
        void(this.editorDidUpdate = false);
        if (this.editorDidUpdate) {
            this.props.editorDidUpdate();
            this.editorDidUpdate = false
        }
    }
    getEditorModels() {
        var e = this.props.data.elements;
        if (!e) return [];
        var t = [];
        return _.keys(e).forEach((n) => {
            DocumentCorruption.deleteWrongFormatDiagramEditor(this.props.data, n);
            var r = e[n];
            if (r) t.push(r)
        }),
        t
    }
    renderEditors() {
        return _.map(this.getEditorModels(), (e) => {
            var t = this.props.selected && this.props.selected.key === e.id;
            return React.createElement(Ce, {
                editorDidUpdate: () => {
                    this.editorDidUpdate = true;
                    this.forceUpdate()
                },
                key: e.id,
                isSelected: this.props.selectionCarrier.isAnySelected(e.id, true),
                isEditing: t,
                editingSelected: t ? this.props.selected.selected : null,
                editor: e,
                renderEditArea: this.props.renderEditArea,
                onEditing: this.props.onEditing,
                onSelectItem: this.handleSelectItem
            })
        })
    }
    render() {
        return React.createElement("diagram-editors", null, this.renderEditors())
    }
}
class Ce extends React.Component {
    constructor(e) {
        super(e);
        this.handleEventRequestEditing = (e, t) => {
            console.log("Received !", e, t);
            setTimeout(() => {
                ReactDOM.unstable_batchedUpdates(() => {
                    this.requestEditing(t.left, t.top)
                })
            },
            50)
        };
        this.onCoverLayerMouseDown = (e, t) => {
            this.props.onSelectItem(e, t)
        };
        this.onEditorContainerMouseDown = (e) => {
            if (console.log("editor mouse down"), "COVER-LAYER" !== e.target.tagName) {
                var t = EventHelper.getCustomEventInfo(e);
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder(t).withRequestCursorSelect().build())
            }
        };
        this.onCoverLayerDoubleClick = (e) => {
            if (!this.props.isEditing) {
                console.log("cover doube clicked!!");
                this.requestEditing(e.clientX, e.clientY);
                e.preventDefault();
                e.stopPropagation()
            }
        };
        this.handleEditorContainerRef = (e) => {
            this.editorContainer = e
        };
        this.state = {
            isRequestingEdit: false,
            lastMousePos: null,
            suppressTransformation: false,
            requestedTransformationOnMount: !this.hasTransformation(this.props.editor)
        }
    }
    isEditorContentOrSelectedChanged(e, t) {
        return ItemDefaultSettings.getTextSetting(e.editor, "fontSize") != ItemDefaultSettings.getTextSetting(t.editor, "fontSize") || e.editor.lines != t.editor.lines || e.editingSelected != t.editingSelected
    }
    hasTransformation(e) {
        var t = e.shape.data;
        var n = t.rotation;
        var r = t.skewX;
        var a = t.flipX;
        return !! n || !!r || !!a
    }
    componentWillReceiveProps(e) {
        var t = this.hasTransformation(e.editor);
        if (e.isEditing && this.state.isRequestingEdit) {
            this.setState({
                isRequestingEdit: false,
                lastMousePos: null
            });
            if (t) this.props.onEditing(true)
        }
        if (!e.isEditing && this.props.isEditing && t) this.props.onEditing(false);
        if (this.isEditorContentOrSelectedChanged(e, this.props) && t) this.setState({
            suppressTransformation: true
        })
    }
    shouldComponentUpdate(e, t) {
        return t.suppressTransformation != this.state.suppressTransformation || t.isRequestingEdit != this.state.isRequestingEdit || t.requestedTransformationOnMount != this.state.requestedTransformationOnMount || (e.isSelected != this.props.isSelected || e.editor != this.props.editor || e.isEditing != this.props.isEditing || e.editingSelected != this.props.editingSelected)
    }
    componentDidUpdate(e, t) {
        if (!this.state.isRequestingEdit || t.isRequestingEdit) if (!this.state.suppressTransformation || this.props.editingSelected) {
            if (! (t.suppressTransformation === this.state.suppressTransformation && t.isRequestingEdit === this.state.isRequestingEdit && t.requestedTransformationOnMount === this.state.requestedTransformationOnMount && e.editor === this.props.editor && e.isSelected === this.props.isSelected && e.isEditing === this.props.isEditing)) this.props.editorDidUpdate()
        } else this.context.fixedContextHandler.getBatchUpdater().requestAfterProcess(() => {
            this.setState({
                suppressTransformation: false
            })
        });
        else {
            console.log("double click handled");
            var n = this.state.lastMousePos;
            if (this.hasTransformation(this.props.editor)) {
                var r = DOMHelper.getElementRect(this.editorContainer);
                var a = {
                    x: r.left + r.width / 2,
                    y: r.top + r.height / 2
                };
                var i = Geometry.pointRotate({
                    x: n.left,
                    y: n.top
                },
                a, -this.props.editor.shape.data.rotation);
                n = {
                    left: i.x,
                    top: i.y
                }
            }
            var o = document.elementFromPoint(n.left, n.top);
            this.context.selectFromPos(o, n)
        }
    }
    componentDidMount() {
        if (this.hasTransformation(this.props.editor)) this.context.fixedContextHandler.getBatchUpdater().requestAfterProcess(() => {
            this.context.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                this.setState({
                    requestedTransformationOnMount: true
                })
            },
            10)
        });
        this.props.editorDidUpdate();
        this.registerRequestEditingEvent()
    }
    componentWillUnmount() {
        this.unregisterRequestEditingEvent()
    }
    registerRequestEditingEvent() {
        if (Global.isMobileOrTablet()) {
            var e = ReactDOM.findDOMNode(this);
            jQuery(e).on("request-editing", this.handleEventRequestEditing)
        }
    }
    unregisterRequestEditingEvent() {
        if (Global.isMobileOrTablet()) {
            var e = ReactDOM.findDOMNode(this);
            jQuery(e).off("request-editing", this.handleEventRequestEditing)
        }
    }
    requestEditing(e, t) {
        this.setState({
            isRequestingEdit: true,
            lastMousePos: {
                left: e,
                top: t
            }
        })
    }
    renderCover(e) {
        return this.state.isRequestingEdit || this.props.isEditing ? null : React.createElement("cover-layer", {
            onDoubleClick: (e) => {
                return this.onCoverLayerDoubleClick(e)
            },
            onTouchStart: (t) => {
                return this.onCoverLayerMouseDown(t, e)
            },
            onMouseDown: (t) => {
                return this.onCoverLayerMouseDown(t, e)
            }
        })
    }
    render() {
        var e = this.props.editor;
        var t = {
            left: e.shape.data.p.x,
            top: e.shape.data.p.y
        };
        var n = e.shape.data;
        var r = n.rotation;
        var i = void 0 === r ? 0 : r;
        var o = n.skewX;
        var s = void 0 === o ? 0 : o;
        var l = n.flipX;
        if (! (this.state.suppressTransformation || !this.state.requestedTransformationOnMount || this.state.isRequestingEdit)) {
            t.transform = "";
            if (i) t.transform = "rotate(".concat(i, "deg)");
            if (s) t.transform += " skewX(".concat(s, "deg)");
            if (l) t.transform += " scaleX(-1)"
        }
        var c = {
            border: "1px solid transparent"
        };
        if ((this.props.isEditing || this.props.isSelected) && (c.border = "1px dashed green"), this.props.isEditing && (c.border = "1px dashed green", c.zIndex = 10, c.background = "rgba(255,255,255,0.380)"), this.props.isEditing && this.hasTransformation(e)) {
            if (!this.lastEditorShape) {
                var d = {
                    minWidth: this.editorContainer.clientWidth,
                    minHeight: this.editorContainer.clientHeight,
                    border: "1px solid gray",
                    transform: "translate(-50%,-50%) rotate(".concat(i, "deg) skewX(").concat(s, "deg)"),
                    position: "absolute"
                };
                this.lastEditorShape = React.createElement("div", {
                    className: "shadow-box",
                    style: d
                })
            }
        } else this.lastEditorShape = null;
        var h = "no-border-on-print";
        return e.isTextMode ? h = classNames(h, "text-diagram-editor") : (h = classNames(h, "math-diagram-editor"), c.fontSize = this.context.mathFontSizeBase, c.fontFamily = FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)),
        React.createElement("position-container", {
            "data-rotation": Geometry.round2(i),
            "data-skewx": Geometry.round2(s),
            "data-flipx": !!l,
            style: t,
            "data-amt": "diagram/shapes/math-text"
        },
        this.lastEditorShape, React.createElement("dg-editor-container", {
            class: h,
            onMouseDown: this.onEditorContainerMouseDown,
            style: c,
            ref: this.handleEditorContainerRef
        },
        this.props.renderEditArea(e, this.getEditAreaStyle(e)), this.renderCover(e)))
    }
    getEditAreaStyle(e) {
        var t = ColorHelper.getEditorStyle(e, "textColor");
        var n = ColorTypeConverter.getHtmlColor(t);
        return "#000" != n ? {
            color: n,
            fill: n,
            stroke: n,
            borderColor: n
        } : null
    }
}
Ce.contextTypes = {
    getEditorInfo: PropTypes.any,
    mathFontSizeBase: PropTypes.any,
    selectFromPos: PropTypes.any,
    baseMathModeFontFamily: PropTypes.any,
    fixedContextHandler: PropTypes.any
};
/// var xe = n(44)/*ShapeManagement*/;  // 9 times
/// var sLoader = n(1532)/*ShapeLoader*/;  // 15 times
class Ie extends ExpandableComponentB {
    constructor(e) {
        super(e);
        this.icons = null;
        this.iconMap = {};
        this.state = {
            selectedIconKey: this.getIcons()[0].component.key
        }
    }
    renderIconOption(e, t, n) {
        return React.createElement("item-option", {
            title: n,
            onMouseDown: () => {
                return this.selectItem(t)
            },
            style: {
                width: 23,
                height: "auto",
                float: "left",
                marginRight: 1
            },
            key: (t || "").toString()
        },
        e.component, React.createElement("item-caption", {
            style: {
                fontSize: "8px",
                width: "100%",
                display: "block",
                marginTop: "-2px",
                textAlign: "center"
            }
        },
        e.caption))
    }
    getCssExpandStyle() {
        return {
            display: "block",
            position: "absolute",
            left: 38,
            top: 0,
            background: "white",
            boxShadow: "0px 0px 1px 1px #c7c3c3",
            padding: 5
        }
    }
    selectItem(e) {
        this.props.onItemSelect(e);
        this.setState({
            selectedIconKey: e
        });
        this.closeExpand()
    }
    getIconOption(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        var n = this.getIconMap()[e];
        return this.renderIconOption(n, e, t)
    }
    renderComponent() {
        var e = _.find(this.getIcons(), (e) => {
            return e.component.key === this.state.selectedIconKey
        });
        return React.createElement("composite-shape-selector", {
            onMouseDown: this.onMouseDown
        },
        React.createElement("x-item", {
            style: {
                display: "flex",
                padding: 0,
                width: 30
            }
        },
        React.createElement("div", {
            style: {
                width: 22
            }
        },
        e.component), React.createElement("select-shape-mark", {
            style: {
                width: 5,
                paddingLeft: 2
            }
        },
        React.createElement("i", {
            className: "fa fa-caret-right",
            style: {
                lineHeight: "22px",
                fontSize: 10
            }
        }))))
    }
    render() {
        return React.createElement("expandable-component", {
            ref: (e) => {
                return this.component = e
            },
            class: this.getComponentClassName(),
            tabIndex: 0,
            onFocus: this.onFocus,
            onBlur: this.onLostFocus
        },
        this.renderExpandContainer(), this.renderComponent())
    }
    getIcons() {
        return this.icons ? this.icons : (this.icons = this.initIcons(), this.icons.forEach((e) => {
            return this.iconMap[e.component.key] = e
        }), this.icons)
    }
    getIconMap() {
        return this.getIcons(),
        this.iconMap
    }
    getComponentClassName() {
        return "shape-selector"
    }
}
class Te extends Ie {
    renderExpandComponent() {
        return React.createElement("css-expand", {
            style: this.getCssExpandStyle()
        },
        React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("axis2d"), this.getIconOption("wave"), this.getIconOption("parabola"), this.getIconOption("polynomial"), this.getIconOption("spring"), this.getIconOption("brace"), this.getIconOption("ruler"), this.getIconOption("ruler-curve"), this.getIconOption("grid")))
    }
    getComponentClassName() {
        return "composite-shape-selector"
    }
    initIcons() {
        var e = _.chain(ShapeLoader.getCompositesMts()).filter((e) => {
            return !! e.getIcon
        }).map((e) => {
            return e.getIcon()
        }).value();
        var t = ColorHelper.getIconSvgStyle();
        return _.assign(t, {
            height: 20,
            transform: "translate(-1px,5px)"
        }),
        e.push({
            caption: "ruler",
            component: React.createElement("svg", {
                key: "ruler",
                style: t
            },
            React.createElement("path", {
                d: "  M3,7 L23,7 M8,4 L8,10 M13,4 L13,10 M18,4 L18,10"
            }))
        }),
        e.push({
            caption: "ruler",
            component: React.createElement("svg", {
                key: "ruler-curve",
                style: t
            },
            React.createElement("path", {
                d: " M3,10 C8,4 16,4 21,11 M5.46,4.17 L8.25,9.48 M11.73,2.62 L11.68,8.62 M17.94,4.26 L15.07,9.53 M22.62,8.19 L17.99,12.01"
            }))
        }),
        e
    }
}
class be extends Ie {
    renderExpandComponent() {
        return React.createElement("css-expand", {
            style: this.getCssExpandStyle()
        },
        React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("straight-no-head", "Line"), this.getIconOption("cubic-no-head", "Curve"), this.getIconOption("straight", "Arrow"), this.getIconOption("cubic", "Curved Arrow"), this.getIconOption("polygon", "Polygon"), this.getIconOption("polygon-curve", "Curved Polygon")))
    }
    initIcons() {
        var e = ColorHelper.getIconSvgStyle();
        return _.assign(e, {
            transform: "translate(1px,2px)"
        }),
        [{
            component: React.createElement("svg", {
                key: "straight-no-head",
                style: e
            },
            React.createElement("path", {
                d: "M2,9 L18,9"
            }))
        },
        {
            component: React.createElement("svg", {
                key: "cubic-no-head",
                style: e
            },
            React.createElement("path", {
                d: " M4,9 C17,-2 5,18 20,6"
            }))
        },
        {
            component: React.createElement("svg", {
                key: "straight",
                style: e
            },
            React.createElement("path", {
                d: "M2,9 L18,9"
            }), React.createElement("path", {
                d: "M12.97,5.15 L18,9.08 L12.97,13"
            }))
        },
        {
            component: React.createElement("svg", {
                key: "cubic",
                style: _.assignIn({},
                e, {
                    transform: "translate(-2px,2px)"
                })
            },
            React.createElement("path", {
                d: " M4,9 C17,-2 5,18 20,6"
            }), React.createElement("path", {
                d: " M15.7,3.11 L21.39,6.7 L15.7,10.28",
                style: {
                    transform: "translate(-1px,12px) rotate(-34deg)"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "polygon",
                style: e
            },
            React.createElement("path", {
                d: "M2,2 L12,4 L14,9 L5,12 L2,2",
                style: {
                    transform: "translate(2px,0px)"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "polygon-curve",
                style: e
            },
            React.createElement("path", {
                d: "M2,2 C4,0 6,0 10,6 S12,12 5,12 S4,7 4,7 S0,2 2,2",
                style: {
                    transform: "translate(4px,1px)"
                }
            }))
        }]
    }
}
class Le extends Ie {
    constructor(e) {
        super(e);
        this.state = {
            selectedIconKey: "rectangle"
        }
    }
    renderExpandComponent() {
        return React.createElement("css-expand", {
            style: this.getCssExpandStyle()
        },
        React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("rectangle", "Rectangle"), this.getIconOption("doc-rounded-rect", "Rounded Rectangle"), this.getIconOption("doc-rounded-single-corner-rect", "Rounded Single Corner Rectangle"), this.getIconOption("doc-rounded-same-side-corner-rect", "Rounded Same Side Corner Rectangle"), this.getIconOption("doc-rounded-diagonal-corner-rect", "Rounded Diagonal Corner Rectangle"), this.getIconOption("doc-snip-single-corner-rect", "Snip Single Corner Rectangle"), this.getIconOption("doc-snip-same-side-corner-rect", "Snip Same Side Corner Rectangle"), this.getIconOption("doc-snip-diagonal-corner-rect", "Snip Diagonal Corner Rectangle"), this.getIconOption("doc-snip-round-single-corner-rect", "Snip Round Single Corner Rectangle")), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 10
            }
        },
        React.createElement("div", {
            style: {
                borderTop: "1px solid gray",
                height: 1,
                flexGrow: 1
            }
        })), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("square", "Square"), this.getIconOption("parallelogram", "Parallelogram"), this.getIconOption("doc-triangle", "Triangle"), this.getIconOption("doc-right-triangle", "Right Triangle"), this.getIconOption("doc-trapezoid", "Trapezoid"), this.getIconOption("doc-diamond", "Diamond"), this.getIconOption("regular-polygon-5", "Regular Pentagon"), this.getIconOption("regular-polygon-6", "Hexagon"), this.getIconOption("regular-polygon-8", "Octagon"), this.getIconOption("regular-polygon-10", "Decagon")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("ellipse", "Ellipse"), this.getIconOption("circle", "Circle"), this.getIconOption("doc-arc", "Arc"), this.getIconOption("doc-chord", "Chord"), this.getIconOption("doc-pie", "Pie"), this.getIconOption("doc-frame", "Frame"), this.getIconOption("doc-half-frame", "Half Frame"), this.getIconOption("doc-l-shape", "L Shape"), this.getIconOption("doc-diagonal-stripe", "Diagonal Stripe"), this.getIconOption("doc-cross", "Cross")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("doc-plaque", "Plaque"), this.getIconOption("doc-can", "Can"), this.getIconOption("doc-cube", "Cube"), this.getIconOption("doc-bevel", "Bevel"), this.getIconOption("doc-donut", "Donut"), this.getIconOption("doc-block-arc", "Block Arc"), this.getIconOption("doc-folded-corner", "Folded Corner Document"), this.getIconOption("doc-moon", "Moon"), this.getIconOption("doc-tear-drop", "Tear Drop"), this.getIconOption("doc-cloud", "Cloud")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("doc-smiley-face", "Smiley Face"), this.getIconOption("doc-right-angle", "Right Angle")), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2
            }
        },
        React.createElement("div", {
            style: {
                borderTop: "1px solid gray",
                height: 1,
                flexGrow: 1
            }
        }), React.createElement("div", {
            style: {
                fontSize: 10,
                color: "gray",
                paddingRight: 5,
                paddingLeft: 5
            }
        },
        "Flowchart"), React.createElement("div", {
            style: {
                borderTop: "1px solid gray",
                height: 1,
                flexGrow: 1
            }
        })), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("flow-process", "Process"), this.getIconOption("flow-alternative-process", "Alternative Process"), this.getIconOption("flow-decision", "Decision"), this.getIconOption("flow-data", "Data"), this.getIconOption("flow-predefined-process", "Predefined Process"), this.getIconOption("flow-internal-storage", "Internal Storage"), this.getIconOption("flow-document", "Document"), this.getIconOption("flow-multidocument", "Multidocument"), this.getIconOption("flow-terminator", "Terminator"), this.getIconOption("flow-preparation", "Preparation")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("flow-manual-input", "Manual Input"), this.getIconOption("flow-manual-operation", "Manual Operation"), this.getIconOption("flow-connector", "Connector"), this.getIconOption("flow-off-page-connector", "Off-page Connector"), this.getIconOption("flow-card", "Card"), this.getIconOption("flow-punched-tape", "Punched Tape"), this.getIconOption("flow-summing-junction", "Summing Junction"), this.getIconOption("flow-or", "Or"), this.getIconOption("flow-collate", "Collate"), this.getIconOption("flow-sort", "Sort")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("flow-extract", "Extract"), this.getIconOption("flow-merge", "Merge"), this.getIconOption("flow-stored-data", "Sorted Data"), this.getIconOption("flow-delay", "Delay"), this.getIconOption("flow-sequential-access-storage", "Sequential Access Storage"), this.getIconOption("flow-magnetic-disk", "Magnetic Disk"), this.getIconOption("flow-direct-access-storage", "Direct Access Storage"), this.getIconOption("flow-display", "Display")))
    }
    initIcons() {
        var e = _.chain(ShapeLoader.getCompositesMts()).filter((e) => {
            return !! e.getIcon
        }).map((e) => {
            return e.getIcon()
        }).value();
        var t = ColorHelper.getIconSvgStyle();
        return [{
            component: React.createElement("svg", {
                key: "arc",
                style: t
            },
            React.createElement("path", {
                d: " M11.74,15.28 C11.25,15.42 10.73,15.5 10.2,15.5 C7.21,15.5 4.78,13.12 4.78,10.19 C4.78,7.26 7.21,4.89 10.2,4.89 C11.13,4.89 12.01,5.12 12.77,5.52",
                style: {
                    transform: "translate(2px,-1px)",
                    transformOrigin: "50% 50%"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "regular-polygon",
                style: t
            },
            React.createElement("polygon", {
                points: "7,2 12,5 12,10 7,13 2,10  2,5 ",
                style: {
                    transform: "translate(4px,2px)"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "regular-polygon-5",
                style: t
            },
            React.createElement("path", {
                d: " M16.75,10.2 L12.22,16.43 L4.9,14.05 L4.9,6.35 L12.22,3.97 Z",
                style: {
                    transform: "translate(1px,0)"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "regular-polygon-6",
                style: t
            },
            React.createElement("path", {
                d: " M17.18,10.29 L13.66,16.38 L6.63,16.38 L3.11,10.29 L6.63,4.19 L13.66,4.19 Z",
                style: {
                    transform: "translate(1px,0)"
                }
            }), React.createElement("text", {
                fontSize: "8",
                fontWeight: "100",
                x: "9",
                y: "13",
                fill: "none"
            },
            "6"))
        },
        {
            component: React.createElement("svg", {
                key: "regular-polygon-8",
                style: t
            },
            React.createElement("path", {
                d: " M16.5,10.75 L14.6,15.35 L10,17.25 L5.4,15.35 L3.5,10.75 L5.4,6.15 L10,4.25 L14.6,6.15 Z",
                style: {
                    transform: "translate(1px,-0.5px)"
                }
            }), React.createElement("text", {
                fontSize: "8",
                x: "9",
                y: "13",
                fill: "none"
            },
            "8"))
        },
        {
            component: React.createElement("svg", {
                key: "regular-polygon-10",
                style: t
            },
            React.createElement("path", {
                d: " M17.13,10.5 L15.78,14.62 L12.28,17.17 L7.94,17.17 L4.43,14.62 L3.09,10.5 L4.43,6.38 L7.94,3.83 L12.28,3.83 L15.78,6.38 Z",
                style: {
                    transform: "translate(1px,0)"
                }
            }), React.createElement("text", {
                fontSize: "8",
                x: "6.5",
                y: "13",
                fill: "none"
            },
            "10"))
        },
        {
            component: React.createElement("svg", {
                key: "polygon-curve",
                style: t
            },
            React.createElement("path", {
                d: "M2,2 C4,0 6,0 10,6 S12,12 5,12 S4,7 4,7 S0,2 2,2",
                style: {
                    transform: "translate(3px,3px)"
                }
            }))
        },
        {
            component: React.createElement("svg", {
                key: "polygon",
                style: t
            },
            React.createElement("path", {
                d: "M2,2 L12,4 L14,9 L5,12 L2,2",
                style: {
                    transform: "translate(3px,3px)"
                }
            }))
        }].concat(e)
    }
}
class Re extends Ie {
    constructor(e) {
        super(e);
        this.state = {
            selectedIconKey: "right-arrow"
        }
    }
    renderExpandComponent() {
        return React.createElement("css-expand", {
            style: this.getCssExpandStyle()
        },
        React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("arrow-head-1"), this.getIconOption("arrow-head-2"), this.getIconOption("arrow-head-3"), this.getIconOption("arrow-head-4"), this.getIconOption("arrow-head-6", "Circle Plus"), this.getIconOption("arrow-head-7", "Plus"), this.getIconOption("right-arrow", "Right Arrow"), this.getIconOption("left-arrow", "Left Arrow"), this.getIconOption("up-arrow", "Up Arrow"), this.getIconOption("down-arrow", "Down Arrow")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("left-right-arrow", "Left Right Arrow"), this.getIconOption("up-down-arrow", "Up Down Arrow"), this.getIconOption("quad-arrow", "Quad Arrow"), this.getIconOption("left-top-right-arrow", "Left Top Right Arrow"), this.getIconOption("bend-arrow", "Bend Arrow"), this.getIconOption("u-turn-arrow", "U Turn Arrow"), this.getIconOption("left-up-arrow", "Left Up Arrow"), this.getIconOption("bend-up-arrow", "Bend Up Arrow"), this.getIconOption("curve-left-arrow", "Curve Left Arrow"), this.getIconOption("curve-right-arrow", "Curve Right Arrow")), React.createElement("css-shapes", {
            style: {
                display: "flex"
            }
        },
        this.getIconOption("striped-right-arrow", "Striped Right Arrow"), this.getIconOption("notched-right-arrow", "Notched Right Arrow"), this.getIconOption("pentagon-arrow", "Pentagon Arrow"), this.getIconOption("chevron-arrow", "Chevron Arrow"), this.getIconOption("callout-right-arrow", "Callout Right Arrow"), this.getIconOption("callout-left-right-arrow", "Callout Left Right Arrow"), this.getIconOption("callout-quad-arrow", "Callout Quad Arrow")))
    }
    initIcons() {
        return _.chain(ShapeLoader.getCompositesMts()).filter((e) => {
            return !! e.getIcon
        }).map((e) => {
            return e.getIcon()
        }).value()
    }
}
/// var Me = n(113)/*SnapToGridSize*/;  // 9 times
/// var we = n(141)/*DiagramElementCreater*/;  // 4 times
class Oe extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSelectTextModeItem = () => {
            this.handleSelectTextItem(true)
        };
        this.handleSelectMathModeItem = () => {
            this.handleSelectTextItem(false)
        };
        this.handleSelectPlot = () => {
            this.onCompositeShapeSelect("plot")
        };
        this.handleSelectImage = () => {
            this.onCompositeShapeSelect("image")
        };
        this.handleSelectTextItem = (e) => {
            DiagramElementCreater.createBy(this.getShapeCreationInfo(), (t) => {
                var n = CreateEditorObject.createOneTextEditor(e ? "text" : "fx", DiagramIdHelper.nextDiagramEditorId());
                var r = SnapToGridSize.getRandomPosYAround(t.top + 120, t.top + 160, t.bottom);
                n.shape = {
                    data: {
                        p: {
                            x: t.left + 120,
                            y: r.y1
                        }
                    }
                };
                if (e) n.isTextMode = true;
                this.props.onAddNewItem("text", n)
            })
        };
        this.onArrowShapeSelect = (e) => {
            if ("polygon" == e || "polygon-curve" == e) return this.onShapeSelect(e);
            DiagramElementCreater.createBy(this.getShapeCreationInfo(), (t) => {
                var n = SnapToGridSize.getRandomPosYAround(t.top + 100, t.top + 200, t.bottom);
                var r = {
                    id: DiagramIdHelper.nextDiagramArrowId(),
                    data: [{
                        x: t.left + 100,
                        y: n.y1
                    },
                    {
                        x: t.left + 200,
                        y: n.y1 + 100
                    }],
                    head: ">",
                    tail: "no",
                    shaft: "-"
                };
                if (! ("cubic" != e && "cubic-no-head" != e && "ruler-curve" != e)) {
                    r.type = "cubic";
                    n = SnapToGridSize.getRandomPosYAround(t.top + 70, t.top + 130, t.bottom);
                    r.data = [Geometry.toRelativeControlPointCubic({
                        p1: {
                            x: t.left + 100,
                            y: n.y1 + 30
                        },
                        cp: {
                            x: t.left + 140,
                            y: n.y1
                        },
                        cp2: {
                            x: t.left + 160,
                            y: n.y1 + 60
                        },
                        p2: {
                            x: t.left + 200,
                            y: n.y1 + 30
                        }
                    })]
                }
                if (e.indexOf("ruler") >= 0) {
                    r.head = "no";
                    r.shaft = "|"
                }
                if (e.indexOf("no-head") >= 0) r.head = "no";
                this.props.onAddNewItem("shape-arrow", r)
            })
        };
        this.onCompositeShapeSelect = (e) => {
            if ("ruler" == e || "ruler-curve" == e) return this.onArrowShapeSelect(e);
            if ("polygon" == e || "polygon-curve" == e) return this.onShapeSelect(e);
            var t = null;
            if (! ("regular-polygon-5" != e && "regular-polygon-6" != e && "regular-polygon-8" != e && "regular-polygon-10" != e)) {
                t = {
                    sides: Number.parseInt(_.last(e.split("-")), 10)
                };
                e = "regular-polygon"
            }
            var n = ShapeLoader.getCompositeShapeManagementFromType(e).createShape(this.getShapeCreationInfo());
            if (t) n = _.assignIn({},
            n, {
                data: _.assignIn({},
                n.data, t)
            });
            this.props.onAddNewItem("shape-composite", n)
        };
        this.onShapeSelect = (e) => {
            var t = DiagramIdHelper.nextDiagramShapeId();
            if ("polygon" == e) DiagramElementCreater.createBy(this.getShapeCreationInfo(), (n) => {
                var r = SnapToGridSize.getRandomPosYAround(n.top + 20, n.top + 170, n.bottom);
                var a = {
                    id: t,
                    type: e,
                    data: [{
                        x: n.left + 70,
                        y: r.y1
                    },
                    {
                        x: n.left + 120,
                        y: r.y1 + 30
                    },
                    {
                        x: n.left + 70,
                        y: r.y1 + 110
                    },
                    {
                        x: n.left + 40,
                        y: r.y1 + 90
                    },
                    {
                        x: n.left + 20,
                        y: r.y1 + 30
                    }]
                };
                this.props.onAddNewItem("shape-object", a)
            });
            if ("polygon-curve" == e) DiagramElementCreater.createBy(this.getShapeCreationInfo(), (n) => {
                var r = SnapToGridSize.getRandomPosYAround(n.top + 40, n.top + 120, n.bottom);
                var a = {
                    id: t,
                    type: e,
                    data: Geometry.smoothBeziers([{
                        p1: {
                            x: n.left + 140,
                            y: r.y1
                        },
                        p2: {
                            x: n.left + 230,
                            y: r.y1
                        },
                        cp: {
                            dx: 20,
                            dy: -20
                        },
                        cp2: {
                            dx: 20,
                            dy: -20
                        }
                    },
                    {
                        p1: {
                            x: n.left + 230,
                            y: r.y1
                        },
                        p2: {
                            x: n.left + 230,
                            y: r.y1 + 60
                        },
                        cp: {
                            dx: 20,
                            dy: 20
                        },
                        cp2: {
                            dx: -20,
                            dy: -30
                        }
                    },
                    {
                        p1: {
                            x: n.left + 230,
                            y: r.y1 + 60
                        },
                        p2: {
                            x: n.left + 140,
                            y: r.y1 + 60
                        },
                        cp: {
                            dx: -20,
                            dy: -20
                        },
                        cp2: {
                            dx: 20,
                            dy: 30
                        }
                    },
                    {
                        p1: {
                            x: n.left + 140,
                            y: r.y1 + 60
                        },
                        p2: {
                            x: n.left + 140,
                            y: r.y1
                        },
                        cp: {
                            dx: 20,
                            dy: -20
                        },
                        cp2: {
                            dx: -20,
                            dy: 10
                        }
                    }], true)
                };
                this.props.onAddNewItem("shape-object", a)
            })
        }
    }
    shouldComponentUpdate(e, t) {
        return t != this.state || e.hidden != this.props.hidden || e.onRequestFreeDrawing != this.props.onRequestFreeDrawing || e.freeDrawingSelected != this.props.freeDrawingSelected
    }
    setInfo(e, t) {
        this.container = t
    }
    getShapeCreationInfo() {
        var e = DOMHelper.getElementRect(this.container);
        var t = this.props.onRequestEditorInfo();
        return {
            diagramWidth: e.width,
            diagramHeight: e.height,
            diagramLeft: e.left,
            diagramTop: e.top,
            paddingTop: 130,
            paddingLeft: t.leftSideBarWidth
        }
    }
    renderDisableLayer(e) {
        if (e) return React.createElement("disabled-layer", null)
    }
    renderRemoveItem() {
        return Global.isMobileOrTablet() ? ItemRemoveSelected.getRemoveItem(() => {
            return this.props.onDeleteEntities(true)
        }) : null
    }
    renderSelectionBox() {
        return Global.isMobileOrTablet() ? React.createElement("db-selection", {
            style: {
                display: "block",
                height: "26px",
                width: "30px"
            }
        },
        React.createElement("svg", {
            className: "selectable",
            onMouseDown: this.props.requestTouchSelection,
            style: {
                width: "100%",
                height: "100%",
                overflow: "visible",
                position: "static"
            }
        },
        React.createElement("path", {
            style: {
                transform: "translate(7px,4px) scale(1.3)"
            },
            d: "M-0.5,0 L12.5,0  M-0.5,12 L12.5,12 M0,0 L0,12  M12,0 L12,12",
            stroke: "gray",
            strokeWidth: "0.5",
            strokeDasharray: "1 1"
        }))) : null
    }
    render() {
        if (this.props.hidden) return React.createElement("div", null);
        var e = this.props.freeDrawingSelected;
        return React.createElement("diagram-bar-region", null, React.createElement("diagram-bar", null, React.createElement("x-item", {
            style: {
                width: 24,
                fontFamily: "Asana-Math,Asana"
            },
            class: "text-field role-diagram-fx",
            onMouseDown: this.handleSelectMathModeItem
        },
        " fx "), React.createElement("x-item", {
            style: {
                width: 24,
                fontSize: 11,
                lineHeight: "14px",
                paddingTop: 5
            },
            class: "role-diagram-text",
            onMouseDown: this.handleSelectTextModeItem
        },
        " Text "), React.createElement(be, {
            onItemSelect: this.onArrowShapeSelect
        }), React.createElement(Le, {
            onItemSelect: (e) => {
                return this.onCompositeShapeSelect(e)
            }
        }), React.createElement(Te, {
            onItemSelect: (e) => {
                return this.onCompositeShapeSelect(e)
            }
        }), React.createElement(Re, {
            onItemSelect: (e) => {
                return this.onCompositeShapeSelect(e)
            }
        }), React.createElement("x-item", {
            style: {
                height: 16,
                position: "relative"
            },
            "data-amt": "diagram/items-bar/plot",
            onMouseDown: this.handleSelectPlot
        },
        React.createElement("div", {
            style: {
                position: "absolute",
                left: 2,
                top: 3
            }
        },
        ToolbarIcons.plot)), React.createElement("x-item", {
            style: {
                height: 16,
                position: "relative"
            },
            "data-amt": "diagram/items-bar/image",
            onMouseDown: this.handleSelectImage
        },
        React.createElement("div", {
            style: {
                position: "absolute",
                left: 1,
                top: 0
            }
        },
        ToolbarIcons.imageIcon)), React.createElement("x-item", {
            style: {
                height: 16,
                position: "relative",
                border: e ? "1px #e6e5e5 solid" : void 0,
                background: e ? "white" : void 0
            },
            "data-amt": "diagram/items-bar/free-drawing",
            onMouseDown: this.props.onRequestFreeDrawing
        },
        React.createElement("div", {
            style: {
                position: "absolute",
                left: 1,
                top: 0
            }
        },
        ToolbarIcons.pencilIcon)), this.renderRemoveItem(), this.renderSelectionBox(), this.renderDisableLayer(this.props.isDisabled)))
    }
}
/// var De = n(203)/*DataChangeModel*/;  // 1 times
class Ne extends M {
    renderOptions() {
        return React.createElement(ExpandableComponent, null, this.renderOne(React.createElement("svg", {
            style: k,
            key: "-"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "."
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "1.125 3.35"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "--"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "6 6"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2-"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10"
        }), React.createElement("line", {
            x1: "0",
            y1: "12",
            x2: "60",
            y2: "12"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2."
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "1.125 3.35"
        }), React.createElement("line", {
            x1: "0",
            y1: "12",
            x2: "60",
            y2: "12",
            strokeDasharray: "1.125 3.35"
        }))), this.renderOne(React.createElement("svg", {
            style: k,
            key: "2--"
        },
        React.createElement("line", {
            x1: "0",
            y1: "10",
            x2: "60",
            y2: "10",
            strokeDasharray: "6 6"
        }), React.createElement("line", {
            x1: "0",
            y1: "12",
            x2: "60",
            y2: "12",
            strokeDasharray: "6 6"
        }))))
    }
    getComponentClassName() {
        return super.getComponentClassName() + " arrow-shaft"
    }
    getItemOptionStyle() {
        return {
            width: 60
        }
    }
    getItemStyle() {
        return null
    }
}
/// var ke = n(332)/*SketchPickerWrapper*/;  // 1 times
/// var Be = n(107)/*ScrollTo*/;  // 2 times
var Pe = (e) => {
    var t = e.stops;
    var n = e.width;
    var r = e.height;
    var i = [...t].sort((e, t) => {
        return e.pos - t.pos
    });
    var o = "_" + Math.random().toString(36).substr(2, 9);
    var s = "url(#".concat(o, ")");
    return React.createElement("div", {
        className: "palette",
        style: {
            width: n,
            height: r,
            border: "1px solid lightgray",
            position: "relative"
        }
    },
    React.createElement("div", {
        style: {
            width: "100%",
            height: "100%",
            position: "absolute",
            background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center'
        }
    }), React.createElement("svg", {
        width: "100%",
        height: "100%",
        style: {
            position: "relative"
        }
    },
    React.createElement("defs", null, React.createElement("linearGradient", {
        id: o,
        x1: "0",
        y1: "0.5",
        x2: "1",
        y2: "0.5"
    },
    " ", i.map((e, t) => {
        return React.createElement("stop", {
            key: t,
            offset: e.pos,
            style: {
                stopColor: ColorTypeConverter.getHtmlColor(e.color)
            }
        })
    }))), React.createElement("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: s
    })))
};
class Fe extends React.PureComponent {
    render() {
        var e = this.props;
        var t = e.palette;
        var n = e.width;
        var r = e.height;
        if (!t) return React.createElement("div", {
            className: "palette",
            style: {
                width: n,
                height: r,
                border: "1px solid lightgray",
                position: "relative"
            }
        });
        var i = [...t.stops].sort((e, t) => {
            return e.pos - t.pos
        });
        var o = "_" + Math.random().toString(36).substr(2, 9);
        var s = "url(#".concat(o, ")");
        var l = t.center || {
            x: 50,
            y: 50
        };
        var c = {
            x: l.x / 100,
            y: l.y / 100
        };
        var d = t.scale || 1;
        if ("radial" == t.type) {
            var h = t.focal || {
                x: 0,
                y: 0
            };
            var u = {
                x: l.x + h.x,
                y: l.y + h.y
            };
            var p = "matrix(".concat(Geometry.round2(d), ",0,0,").concat(Geometry.round2(d), ",").concat(Geometry.round2(.5 - .5 * d), ",").concat(Geometry.round2(.5 - .5 * d), ")");
            return React.createElement("div", {
                className: "palette",
                style: {
                    width: n,
                    height: r,
                    border: "1px solid lightgray",
                    borderRadius: "50%",
                    position: "relative"
                }
            },
            React.createElement("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    borderRadius: "50%",
                    background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center'
                }
            }), React.createElement("svg", {
                width: "100%",
                height: "100%",
                style: {
                    position: "relative"
                }
            },
            React.createElement("defs", null, React.createElement("radialGradient", {
                id: o,
                cx: "".concat(c.x),
                gradientTransform: p,
                cy: "".concat(c.y),
                fx: "".concat(u.x / 100),
                fy: "".concat(u.y / 100)
            },
            " ", i.map((e, t) => {
                return React.createElement("stop", {
                    key: t,
                    offset: e.pos,
                    style: {
                        stopColor: ColorTypeConverter.getHtmlColor(e.color)
                    }
                })
            }))), React.createElement("circle", {
                cx: "50%",
                cy: "50%",
                r: "50%",
                fill: s
            })))
        }
        var m = "translate(".concat(c.x - .5, ",").concat(c.y - .5, ")");
        var f = t.scale ? "matrix(".concat(d, ",0,0,").concat(d, ",").concat(.5 - .5 * d, ",").concat(.5 - .5 * d, ")") : "";
        return React.createElement("div", {
            className: "palette",
            style: {
                width: n,
                height: r,
                border: "1px solid lightgray",
                position: "relative"
            }
        },
        React.createElement("div", {
            style: {
                width: "100%",
                height: "100%",
                position: "absolute",
                background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center'
            }
        }), React.createElement("svg", {
            width: "100%",
            height: "100%",
            style: {
                position: "relative"
            }
        },
        React.createElement("defs", null, React.createElement("linearGradient", {
            id: o,
            gradientTransform: "".concat(f, " ").concat(m, " rotate(").concat(t.rotation || 0, " ", .5, " ", .5, ")"),
            x1: "0",
            y1: "0.5",
            x2: 1,
            y2: .5
        },
        " ", i.map((e, t) => {
            return React.createElement("stop", {
                key: t,
                offset: e.pos,
                style: {
                    stopColor: ColorTypeConverter.getHtmlColor(e.color)
                }
            })
        }))), React.createElement("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: s
        })))
    }
}
/// var He = n(61);  // 1 times
/// var _e = n.n(He);
class Ue extends React.Component {
    constructor(e) {
        super(e);
        this.dragging = false;
        this.deltaX = 0;
        this.isDragRaise = false;
        this.handleMouseDown = (e) => {
            e.stopPropagation();
            if (!e.button) this.activate(e.clientX)
        };
        this.handleMouseMove = (e) => {
            var t = e.clientX;
            var n = e.clientY;
            if (this.dragging) {
                if (!this.isDragRaise) {
                    console.log("raise dragigng");
                    this.isDragRaise = true;
                    this.props.onDragging(true)
                }
                var r = this.props;
                var a = r.drop;
                var i = r.onPosChange;
                var o = ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect();
                if (Math.abs(n - o.top) > a) this.setState({
                    isInRemoveMode: true
                });
                else {
                    if (this.state.isInRemoveMode) this.setState({
                        isInRemoveMode: false
                    });
                    var s = _.clamp((t - o.left - this.deltaX) / this.props.width, 0, 1);
                    i(_.assignIn({},
                    this.props.stop, {
                        pos: s
                    }))
                }
            }
        };
        this.handleMouseUp = () => {
            this.deactivate()
        };
        this.state = {
            isInRemoveMode: false
        }
    }
    activate(e) {
        var t = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.deltaX = e - t.left - t.width / 2;
        this.dragging = true;
        this.isDragRaise = false;
        this.props.onActivate(this.props.stop);
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp)
    }
    deactivate() {
        this.dragging = false;
        this.props.onDragging(false);
        if (this.state.isInRemoveMode) {
            this.setState({
                isInRemoveMode: false
            });
            this.props.onDeleteColor(this.props.stop)
        }
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp)
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp)
    }
    render() {
        var e = this.props.stop;
        var t = e.pos;
        var n = e.color;
        var r = t * this.props.width;
        var i = this.props.isActive;
        var o = i ? "#4CAF50" : "white";
        var s = this.state.isInRemoveMode ? 15 : 0;
        return React.createElement("div", {
            style: PropUpdateHelper.update(ze, {
                left: r,
                top: s
            }),
            className: i ? "cs active" : "cs",
            onMouseDown: this.handleMouseDown
        },
        React.createElement("svg", {
            style: Ge
        },
        React.createElement("path", {
            d: "M 0,15 L 6,0 L 12,15 Q 6,6 0,15 Z",
            stroke: "gray",
            strokeWidth: "1",
            fill: o
        })), React.createElement("div", {
            style: PropUpdateHelper.update(Ye, {
                backgroundColor: ColorTypeConverter.getHtmlColor(n)
            })
        }), this.state.isInRemoveMode ? React.createElement("i", {
            style: We,
            className: "fa fa-times"
        }) : void 0)
    }
}
var We = {
    display: "block",
    position: "absolute",
    right: -11,
    top: -3,
    color: "#d00505"
};
var Ge = {
    width: 20,
    height: 20
};
var ze = {
    backgroundPosition: "right center",
    height: 17,
    position: "absolute",
    width: 12,
    cursor: "pointer",
    transform: "translateX(-50%)"
};
var Ye = {
    height: 8,
    left: 1,
    width: 8,
    position: "absolute",
    top: 12,
    borderRadius: 10,
    border: "1px solid lightgray"
};
class Ke extends React.Component {
    constructor(e) {
        super(e);
        this.handleMouseDown = (e) => {
            if (e.preventDefault(), !e.button) {
                var t = {
                    pos: (e.clientX - e.target.getBoundingClientRect().left) / this.props.width,
                    color: this.props.activeStop.color
                };
                this.props.onAddColor(t)
            }
        };
        this.handleStopDragging = (e) => {
            console.log("rendering");
            if (e != this.state.isDragging) {
                this.setState({
                    isDragging: e
                });
                this.props.onDragging(e)
            }
        };
        this.state = {
            isDragging: false
        }
    }
    render() {
        var e = this.props;
        var t = e.width;
        var n = e.stops;
        var r = (e.onAddColor, e.activeStop);
        var i = _.omit(e, ["width", "stops", "onAddColor", "activeStop"]);
        var o = {
            width: t,
            height: 17,
            position: "relative",
            cursor: this.state.isDragging ? "default" : "copy",
            marginTop: 1,
            border: "1px solid transparent"
        };
        return React.createElement("div", {
            className: "csh",
            style: o,
            onMouseDown: this.handleMouseDown
        },
        n.map((e, n) => {
            return React.createElement(Ue, Object.assign({
                key: n,
                stop: e,
                drop: 30,
                width: t,
                isActive: r === e
            },
            i, {
                onDragging: this.handleStopDragging
            }))
        }))
    }
}
/// var Ve = n(173)/*ColorPicker*/;  // 1 times
class je extends ColorPicker {
    renderComponent() {
        var e = ColorTypeConverter.getHtmlColor(this.props.value);
        return React.createElement("x-item", {
            style: {
                width: 26,
                border: "none"
            },
            title: "Stroke Color"
        },
        React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%",
                overflow: "visible"
            }
        },
        React.createElement("rect", {
            x: "2",
            y: "5",
            width: "25",
            height: "18",
            style: {
                strokeWidth: 1,
                stroke: "gray",
                fill: e
            }
        })))
    }
}
var qe = [{
    backgroundCss: "linear-gradient(45deg,rgba(0,128,0,1) 0%,rgba(0,128,0,1) 1%,rgba(255,255,0,1) 50%,rgba(0,128,0,1) 100%)",
    palette: {
        stops: [{
            pos: 0,
            color: [0, 128, 0, 1]
        },
        {
            pos: .01,
            color: [0, 128, 0, 1]
        },
        {
            pos: .5,
            color: [255, 255, 0, 1]
        },
        {
            pos: 1,
            color: [0, 128, 0, 1]
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(255,0,0,1) 0%,rgba(255,255,0,1) 25%,rgba(5,193,255,1) 50%,rgba(255,255,0,1) 75%,rgba(255,0,0,1) 100%)",
    palette: {
        stops: [{
            color: [255, 0, 0, 1],
            pos: 0
        },
        {
            color: [255, 255, 0, 1],
            pos: .25
        },
        {
            color: [5, 193, 255, 1],
            pos: .5
        },
        {
            color: [255, 255, 0, 1],
            pos: .75
        },
        {
            color: [255, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(53deg,rgba(153,218,255,1) 0%,rgba(0,128,128,1) 100%)",
    palette: {
        stops: [{
            color: [153, 218, 255, 1],
            pos: 0
        },
        {
            color: [0, 128, 128, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(255,255,0,1) 0%,rgba(0,128,128,1) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 0, 1],
            pos: 0
        },
        {
            color: [0, 128, 128, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(0,51,51,1) 0%,rgba(5,193,255,1) 50%,rgba(0,51,51,1) 100%)",
    palette: {
        stops: [{
            color: [0, 51, 51, 1],
            pos: 0
        },
        {
            color: [5, 193, 255, 1],
            pos: .5
        },
        {
            color: [0, 51, 51, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 49%,rgba(5,193,255,1) 50%,rgba(5,193,255,0.9) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [255, 255, 255, 1],
            pos: .49
        },
        {
            color: [5, 193, 255, 1],
            pos: .5
        },
        {
            color: [5, 193, 255, .9],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(255,255,255,1) 0%,rgba(0,0,0,0.9) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [0, 0, 0, .9],
            pos: 1
        }]
    }
},
{
    palette: {
        type: "radial",
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [0, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    palette: {
        type: "radial",
        focal: {
            x: -9,
            y: -13
        },
        scale: 1.32,
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [122, 38, 38, 1],
            pos: 1
        }]
    }
},
{
    palette: {
        type: "radial",
        focal: {
            x: -9,
            y: -11
        },
        scale: 1.32,
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [0, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    palette: {
        type: "radial",
        focal: {
            x: 20,
            y: 16
        },
        scale: 1.32,
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [0, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(0,255,0,1) 0%,rgba(255,0,0,1) 50%,rgba(255,255,0,1) 100%)",
    palette: {
        stops: [{
            color: [0, 255, 0, 1],
            pos: 0
        },
        {
            color: [255, 0, 0, 1],
            pos: .5
        },
        {
            color: [255, 255, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(45deg,rgba(255,0,0,1) 0%,rgba(255,255,0,1) 50%,rgba(255,0,0,1) 100%)",
    palette: {
        stops: [{
            color: [255, 0, 0, 1],
            pos: 0
        },
        {
            color: [255, 255, 0, 1],
            pos: .5
        },
        {
            color: [255, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(255,255,255) 0%,rgb(241,241,241) 50%,rgb(225,225,225) 51%,rgb(246,246,246) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [241, 241, 241, 1],
            pos: .5
        },
        {
            color: [225, 225, 225, 1],
            pos: .51
        },
        {
            color: [246, 246, 246, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(149,149,149) 0%,rgb(13,13,13) 46%,rgb(1,1,1) 50%,rgb(10,10,10) 53%,rgb(78,78,78) 76%,rgb(56,56,56) 87%,rgb(27,27,27) 100%)",
    palette: {
        stops: [{
            color: [149, 149, 149, 1],
            pos: 0
        },
        {
            color: [13, 13, 13, 1],
            pos: .46
        },
        {
            color: [1, 1, 1, 1],
            pos: .5
        },
        {
            color: [10, 10, 10, 1],
            pos: .53
        },
        {
            color: [78, 78, 78, 1],
            pos: .76
        },
        {
            color: [56, 56, 56, 1],
            pos: .87
        },
        {
            color: [27, 27, 27, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(167,207,223) 0%,rgb(35,83,138) 100%)",
    palette: {
        stops: [{
            color: [167, 207, 223, 1],
            pos: 0
        },
        {
            color: [35, 83, 138, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(255,255,255) 0%,rgb(229,229,229) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [229, 229, 229, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(174,188,191) 0%,rgb(110,119,116) 50%,rgb(10,14,10) 51%,rgb(10,8,9) 100%)",
    palette: {
        stops: [{
            color: [174, 188, 191, 1],
            pos: 0
        },
        {
            color: [110, 119, 116, 1],
            pos: .5
        },
        {
            color: [10, 14, 10, 1],
            pos: .51
        },
        {
            color: [10, 8, 9, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(183,222,237) 0%,rgb(113,206,239) 50%,rgb(33,180,226) 51%,rgb(183,222,237) 100%)",
    palette: {
        stops: [{
            color: [183, 222, 237, 1],
            pos: 0
        },
        {
            color: [113, 206, 239, 1],
            pos: .5
        },
        {
            color: [33, 180, 226, 1],
            pos: .51
        },
        {
            color: [183, 222, 237, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(203,96,179) 0%,rgb(173,18,131) 50%,rgb(222,71,172) 100%)",
    palette: {
        stops: [{
            color: [203, 96, 179, 1],
            pos: 0
        },
        {
            color: [173, 18, 131, 1],
            pos: .5
        },
        {
            color: [222, 71, 172, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(245,246,246) 0%,rgb(219,220,226) 21%,rgb(184,186,198) 49%,rgb(221,223,227) 80%,rgb(245,246,246) 100%)",
    palette: {
        stops: [{
            color: [245, 246, 246, 1],
            pos: 0
        },
        {
            color: [219, 220, 226, 1],
            pos: .21
        },
        {
            color: [184, 186, 198, 1],
            pos: .49
        },
        {
            color: [221, 223, 227, 1],
            pos: .8
        },
        {
            color: [245, 246, 246, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(210,223,237) 0%,rgb(200,215,235) 26%,rgb(166,192,227) 51%,rgb(175,199,232) 62%,rgb(186,208,239) 75%,rgb(153,181,219) 88%,rgb(121,155,200) 100%)",
    palette: {
        stops: [{
            color: [210, 223, 237, 1],
            pos: 0
        },
        {
            color: [200, 215, 235, 1],
            pos: .26
        },
        {
            color: [166, 192, 227, 1],
            pos: .51
        },
        {
            color: [175, 199, 232, 1],
            pos: .62
        },
        {
            color: [186, 208, 239, 1],
            pos: .75
        },
        {
            color: [153, 181, 219, 1],
            pos: .88
        },
        {
            color: [121, 155, 200, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(181,189,200) 0%,rgb(130,140,149) 36%,rgb(40,52,59) 100%)",
    palette: {
        stops: [{
            color: [181, 189, 200, 1],
            pos: 0
        },
        {
            color: [130, 140, 149, 1],
            pos: .36
        },
        {
            color: [40, 52, 59, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(254,252,234) 0%,rgb(241,218,54) 100%)",
    palette: {
        stops: [{
            color: [254, 252, 234, 1],
            pos: 0
        },
        {
            color: [241, 218, 54, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(206,219,233) 0%,rgb(170,197,222) 17%,rgb(97,153,199) 50%,rgb(58,132,195) 51%,rgb(65,154,214) 59%,rgb(75,184,240) 71%,rgb(58,139,194) 84%,rgb(38,85,139) 100%)",
    palette: {
        stops: [{
            color: [206, 219, 233, 1],
            pos: 0
        },
        {
            color: [170, 197, 222, 1],
            pos: .17
        },
        {
            color: [97, 153, 199, 1],
            pos: .5
        },
        {
            color: [58, 132, 195, 1],
            pos: .51
        },
        {
            color: [65, 154, 214, 1],
            pos: .59
        },
        {
            color: [75, 184, 240, 1],
            pos: .71
        },
        {
            color: [58, 139, 194, 1],
            pos: .84
        },
        {
            color: [38, 85, 139, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(30,87,153) 0%,rgb(41,137,216) 50%,rgb(32,124,202) 51%,rgb(125,185,232) 100%)",
    palette: {
        stops: [{
            color: [30, 87, 153, 1],
            pos: 0
        },
        {
            color: [41, 137, 216, 1],
            pos: .5
        },
        {
            color: [32, 124, 202, 1],
            pos: .51
        },
        {
            color: [125, 185, 232, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(240,249,255) 0%,rgb(203,235,255) 47%,rgb(161,219,255) 100%)",
    palette: {
        stops: [{
            color: [240, 249, 255, 1],
            pos: 0
        },
        {
            color: [203, 235, 255, 1],
            pos: .47
        },
        {
            color: [161, 219, 255, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(254,255,255) 0%,rgb(221,241,249) 35%,rgb(160,216,239) 100%)",
    palette: {
        stops: [{
            color: [254, 255, 255, 1],
            pos: 0
        },
        {
            color: [221, 241, 249, 1],
            pos: .35
        },
        {
            color: [160, 216, 239, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(184,225,252) 0%,rgb(169,210,243) 10%,rgb(144,186,228) 25%,rgb(144,188,234) 37%,rgb(144,191,240) 50%,rgb(107,168,229) 51%,rgb(162,218,245) 83%,rgb(189,243,253) 100%)",
    palette: {
        stops: [{
            color: [184, 225, 252, 1],
            pos: 0
        },
        {
            color: [169, 210, 243, 1],
            pos: .1
        },
        {
            color: [144, 186, 228, 1],
            pos: .25
        },
        {
            color: [144, 188, 234, 1],
            pos: .37
        },
        {
            color: [144, 191, 240, 1],
            pos: .5
        },
        {
            color: [107, 168, 229, 1],
            pos: .51
        },
        {
            color: [162, 218, 245, 1],
            pos: .83
        },
        {
            color: [189, 243, 253, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(59,103,158) 0%,rgb(43,136,217) 50%,rgb(32,124,202) 51%,rgb(125,185,232) 100%)",
    palette: {
        stops: [{
            color: [59, 103, 158, 1],
            pos: 0
        },
        {
            color: [43, 136, 217, 1],
            pos: .5
        },
        {
            color: [32, 124, 202, 1],
            pos: .51
        },
        {
            color: [125, 185, 232, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(109,179,242) 0%,rgb(84,163,238) 50%,rgb(54,144,240) 51%,rgb(30,105,222) 100%)",
    palette: {
        stops: [{
            color: [109, 179, 242, 1],
            pos: 0
        },
        {
            color: [84, 163, 238, 1],
            pos: .5
        },
        {
            color: [54, 144, 240, 1],
            pos: .51
        },
        {
            color: [30, 105, 222, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(228,245,252) 0%,rgb(191,232,249) 50%,rgb(159,216,239) 51%,rgb(42,176,237) 100%)",
    palette: {
        stops: [{
            color: [228, 245, 252, 1],
            pos: 0
        },
        {
            color: [191, 232, 249, 1],
            pos: .5
        },
        {
            color: [159, 216, 239, 1],
            pos: .51
        },
        {
            color: [42, 176, 237, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(167,199,220) 0%,rgb(133,178,211) 100%)",
    palette: {
        stops: [{
            color: [167, 199, 220, 1],
            pos: 0
        },
        {
            color: [133, 178, 211, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(208,228,247) 0%,rgb(115,177,231) 24%,rgb(10,119,213) 50%,rgb(83,159,225) 79%,rgb(135,188,234) 100%)",
    palette: {
        stops: [{
            color: [208, 228, 247, 1],
            pos: 0
        },
        {
            color: [115, 177, 231, 1],
            pos: .24
        },
        {
            color: [10, 119, 213, 1],
            pos: .5
        },
        {
            color: [83, 159, 225, 1],
            pos: .79
        },
        {
            color: [135, 188, 234, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(225,255,255) 0%,rgb(225,255,255) 7%,rgb(253,255,255) 12%,rgb(230,248,253) 30%,rgb(200,238,251) 54%,rgb(190,228,248) 75%,rgb(177,216,245) 100%)",
    palette: {
        stops: [{
            color: [225, 255, 255, 1],
            pos: 0
        },
        {
            color: [225, 255, 255, 1],
            pos: .07
        },
        {
            color: [253, 255, 255, 1],
            pos: .12
        },
        {
            color: [230, 248, 253, 1],
            pos: .3
        },
        {
            color: [200, 238, 251, 1],
            pos: .54
        },
        {
            color: [190, 228, 248, 1],
            pos: .75
        },
        {
            color: [177, 216, 245, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(213,206,166) 0%,rgb(201,193,144) 40%,rgb(183,173,112) 100%)",
    palette: {
        stops: [{
            color: [213, 206, 166, 1],
            pos: 0
        },
        {
            color: [201, 193, 144, 1],
            pos: .4
        },
        {
            color: [183, 173, 112, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(180,221,180) 0%,rgb(131,199,131) 17%,rgb(82,177,82) 33%,rgb(0,138,0) 67%,rgb(0,87,0) 83%,rgb(0,36,0) 100%)",
    palette: {
        stops: [{
            color: [180, 221, 180, 1],
            pos: 0
        },
        {
            color: [131, 199, 131, 1],
            pos: .17
        },
        {
            color: [82, 177, 82, 1],
            pos: .33
        },
        {
            color: [0, 138, 0, 1],
            pos: .67
        },
        {
            color: [0, 87, 0, 1],
            pos: .83
        },
        {
            color: [0, 36, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(205,235,142) 0%,rgb(165,201,86) 100%)",
    palette: {
        stops: [{
            color: [205, 235, 142, 1],
            pos: 0
        },
        {
            color: [165, 201, 86, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(201,222,150) 0%,rgb(138,182,107) 44%,rgb(57,130,53) 100%)",
    palette: {
        stops: [{
            color: [201, 222, 150, 1],
            pos: 0
        },
        {
            color: [138, 182, 107, 1],
            pos: .44
        },
        {
            color: [57, 130, 53, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(169,219,128) 0%,rgb(150,197,111) 100%)",
    palette: {
        stops: [{
            color: [169, 219, 128, 1],
            pos: 0
        },
        {
            color: [150, 197, 111, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(180,227,145) 0%,rgb(97,196,25) 50%,rgb(180,227,145) 100%)",
    palette: {
        stops: [{
            color: [180, 227, 145, 1],
            pos: 0
        },
        {
            color: [97, 196, 25, 1],
            pos: .5
        },
        {
            color: [180, 227, 145, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(216,224,222) 0%,rgb(174,191,188) 22%,rgb(153,175,171) 33%,rgb(142,166,162) 50%,rgb(130,157,152) 67%,rgb(78,92,90) 82%,rgb(14,14,14) 100%)",
    palette: {
        stops: [{
            color: [216, 224, 222, 1],
            pos: 0
        },
        {
            color: [174, 191, 188, 1],
            pos: .22
        },
        {
            color: [153, 175, 171, 1],
            pos: .33
        },
        {
            color: [142, 166, 162, 1],
            pos: .5
        },
        {
            color: [130, 157, 152, 1],
            pos: .67
        },
        {
            color: [78, 92, 90, 1],
            pos: .82
        },
        {
            color: [14, 14, 14, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(207,231,250) 0%,rgb(99,147,193) 100%)",
    palette: {
        stops: [{
            color: [207, 231, 250, 1],
            pos: 0
        },
        {
            color: [99, 147, 193, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(226,226,226) 0%,rgb(219,219,219) 50%,rgb(209,209,209) 51%,rgb(254,254,254) 100%)",
    palette: {
        stops: [{
            color: [226, 226, 226, 1],
            pos: 0
        },
        {
            color: [219, 219, 219, 1],
            pos: .5
        },
        {
            color: [209, 209, 209, 1],
            pos: .51
        },
        {
            color: [254, 254, 254, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(242,246,248) 0%,rgb(216,225,231) 50%,rgb(181,198,208) 51%,rgb(224,239,249) 100%)",
    palette: {
        stops: [{
            color: [242, 246, 248, 1],
            pos: 0
        },
        {
            color: [216, 225, 231, 1],
            pos: .5
        },
        {
            color: [181, 198, 208, 1],
            pos: .51
        },
        {
            color: [224, 239, 249, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(254,254,253) 0%,rgb(220,227,196) 42%,rgb(174,191,118) 100%)",
    palette: {
        stops: [{
            color: [254, 254, 253, 1],
            pos: 0
        },
        {
            color: [220, 227, 196, 1],
            pos: .42
        },
        {
            color: [174, 191, 118, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(241,231,103) 0%,rgb(254,182,69) 100%)",
    palette: {
        stops: [{
            color: [241, 231, 103, 1],
            pos: 0
        },
        {
            color: [254, 182, 69, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(255,214,94) 0%,rgb(254,191,4) 100%)",
    palette: {
        stops: [{
            color: [255, 214, 94, 1],
            pos: 0
        },
        {
            color: [254, 191, 4, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(234,185,45) 0%,rgb(199,152,16) 100%)",
    palette: {
        stops: [{
            color: [234, 185, 45, 1],
            pos: 0
        },
        {
            color: [199, 152, 16, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(246,248,249) 0%,rgb(229,235,238) 50%,rgb(215,222,227) 51%,rgb(245,247,249) 100%)",
    palette: {
        stops: [{
            color: [246, 248, 249, 1],
            pos: 0
        },
        {
            color: [229, 235, 238, 1],
            pos: .5
        },
        {
            color: [215, 222, 227, 1],
            pos: .51
        },
        {
            color: [245, 247, 249, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(255,255,255) 0%,rgb(243,243,243) 50%,rgb(237,237,237) 51%,rgb(255,255,255) 100%)",
    palette: {
        stops: [{
            color: [255, 255, 255, 1],
            pos: 0
        },
        {
            color: [243, 243, 243, 1],
            pos: .5
        },
        {
            color: [237, 237, 237, 1],
            pos: .51
        },
        {
            color: [255, 255, 255, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(242,249,254) 0%,rgb(214,240,253) 100%)",
    palette: {
        stops: [{
            color: [242, 249, 254, 1],
            pos: 0
        },
        {
            color: [214, 240, 253, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(254,255,255) 0%,rgb(210,235,249) 100%)",
    palette: {
        stops: [{
            color: [254, 255, 255, 1],
            pos: 0
        },
        {
            color: [210, 235, 249, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(125,126,125) 0%,rgb(14,14,14) 100%)",
    palette: {
        stops: [{
            color: [125, 126, 125, 1],
            pos: 0
        },
        {
            color: [14, 14, 14, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(69,72,77) 0%,rgb(0,0,0) 100%)",
    palette: {
        stops: [{
            color: [69, 72, 77, 1],
            pos: 0
        },
        {
            color: [0, 0, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(243,197,189) 0%,rgb(232,108,87) 50%,rgb(234,40,3) 51%,rgb(255,102,0) 75%,rgb(199,34,0) 100%)",
    palette: {
        stops: [{
            color: [243, 197, 189, 1],
            pos: 0
        },
        {
            color: [232, 108, 87, 1],
            pos: .5
        },
        {
            color: [234, 40, 3, 1],
            pos: .51
        },
        {
            color: [255, 102, 0, 1],
            pos: .75
        },
        {
            color: [199, 34, 0, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(239,197,202) 0%,rgb(210,75,90) 50%,rgb(186,39,55) 51%,rgb(241,142,153) 100%)",
    palette: {
        stops: [{
            color: [239, 197, 202, 1],
            pos: 0
        },
        {
            color: [210, 75, 90, 1],
            pos: .5
        },
        {
            color: [186, 39, 55, 1],
            pos: .51
        },
        {
            color: [241, 142, 153, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(254,204,177) 0%,rgb(241,116,50) 50%,rgb(234,85,7) 51%,rgb(251,149,94) 100%)",
    palette: {
        stops: [{
            color: [254, 204, 177, 1],
            pos: 0
        },
        {
            color: [241, 116, 50, 1],
            pos: .5
        },
        {
            color: [234, 85, 7, 1],
            pos: .51
        },
        {
            color: [251, 149, 94, 1],
            pos: 1
        }]
    }
},
{
    backgroundCss: "linear-gradient(135deg,rgb(248,80,50) 0%,rgb(241,111,92) 50%,rgb(246,41,12) 51%,rgb(240,47,23) 71%,rgb(231,56,39) 100%)",
    palette: {
        stops: [{
            color: [248, 80, 50, 1],
            pos: 0
        },
        {
            color: [241, 111, 92, 1],
            pos: .5
        },
        {
            color: [246, 41, 12, 1],
            pos: .51
        },
        {
            color: [240, 47, 23, 1],
            pos: .71
        },
        {
            color: [231, 56, 39, 1],
            pos: 1
        }]
    }
}];
class Qe extends React.PureComponent {
    constructor(e) {
        super(e);
        this.handleActivate = (e) => {
            this.setState({
                activeIndex: this.props.gradient.stops.findIndex((t) => {
                    return t === e
                })
            })
        };
        this.handleDeleteColor = (e) => {
            if (! (this.props.gradient.stops.length < 3)) {
                var t = PropUpdateHelper.remove(this.props.gradient.stops, this.props.gradient.stops.indexOf(e));
                var n = PropUpdateHelper.setProp(this.props.gradient, "stops", t);
                this.setState({
                    activeIndex: _.clamp(this.state.activeIndex, 0, n.stops.length - 1)
                });
                this.raiseGradientChanged(n, false)
            }
        };
        this.handlePosChange = (e) => {
            var t = PropUpdateHelper.setIndex(this.props.gradient.stops, this.state.activeIndex, e);
            var n = PropUpdateHelper.setProp(this.props.gradient, "stops", t);
            this.raiseGradientChanged(n, false)
        };
        this.handleAddColor = (e) => {
            var t = this.props.gradient.stops.concat([e]);
            var n = PropUpdateHelper.setProp(this.props.gradient, "stops", t);
            this.setState({
                activeIndex: this.props.gradient.stops.length
            });
            this.raiseGradientChanged(n, false)
        };
        this.handleSelectColor = (e) => {
            this.setState({
                activeIndex: this.props.gradient.stops.findIndex((t) => {
                    return t === e
                })
            })
        };
        this.handleStepColorChanged = (e) => {
            var t = ColorTypeConverter.getHtmlColor(e);
            var n = PropUpdateHelper.setProp(this.selectedStop(), "color", t);
            var r = PropUpdateHelper.setIndex(this.props.gradient.stops, this.state.activeIndex, n);
            var a = PropUpdateHelper.setProp(this.props.gradient, "stops", r);
            this.raiseGradientChanged(a, false)
        };
        this.handleStopDragging = (e) => {
            if (e != this.state.isDragging) this.setState({
                isDragging: e
            })
        };
        this.handleGradientTypeChanged = (e) => {
            var t = "linear" == e.key ? void 0 : e.key;
            this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "type", t), false)
        };
        this.handlePropertyChanged = (e, t, n) => {
            if ("rotation" != e) {
                var r = this.props.gradient.center || {
                    x: 50,
                    y: 50
                };
                var a = this.props.gradient.focal || {
                    x: 0,
                    y: 0
                };
                if ("centerX" == e) this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "center", {
                    x: t,
                    y: r.y
                }), n);
                if ("centerY" == e) this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "center", {
                    x: r.x,
                    y: t
                }), n);
                if ("focalX" == e) this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "focal", {
                    x: t,
                    y: a.y
                }), n);
                if ("focalY" == e) this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "focal", {
                    x: a.x,
                    y: t
                }), n);
                if ("scale" == e) this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "scale", t), n)
            } else this.raiseGradientChanged(PropUpdateHelper.setProp(this.props.gradient, "rotation", t), n)
        };
        this.state = {
            isDragging: false,
            activeIndex: 0
        }
    }
    get width1() {
        return 301
    }
    selectedStop() {
        return this.props.gradient.stops[this.state.activeIndex]
    }
    componentDidMount() {
        ScrollTo.registerEventToFixScroll(this.presetDiv)
    }
    componentWillUnmount() {
        ScrollTo.unregisterEventToFixScroll(this.presetDiv)
    }
    renderPresets() {
        return React.createElement("preset-container", {
            style: {
                display: "flex"
            }
        },
        React.createElement("presets", {
            style: {
                flexGrow: 1,
                border: "1px solid lightgray",
                position: "relative",
                padding: 2,
                paddingBottom: 12
            }
        },
        React.createElement("div", {
            ref: (e) => {
                return this.presetDiv = e
            },
            style: {
                overflowY: "auto",
                maxHeight: 85
            }
        },
        _.chunk(qe, 6).map((e, t) => {
            return React.createElement("ps-row", {
                key: t,
                style: et
            },
            e.map((e, t) => {
                return React.createElement("ps-box-container", {
                    key: t,
                    onMouseDown: () => {
                        return this.setFromPreset(e.palette)
                    },
                    style: tt
                },
                e.palette.type ? React.createElement(Fe, {
                    key: t,
                    width: 25,
                    height: 25,
                    palette: e.palette
                }) : React.createElement("ps-box", {
                    style: PropUpdateHelper.update(nt, {
                        background: e.backgroundCss
                    })
                }))
            }))
        })), React.createElement("div", {
            style: Xe
        },
        "Presets")), React.createElement("preview-container", {
            style: {
                display: "flex",
                border: "1px solid lightgray",
                position: "relative",
                padding: "4px 9px",
                paddingBottom: 12,
                borderLeft: "none"
            }
        },
        React.createElement(Fe, {
            width: 65,
            height: 65,
            palette: this.props.gradient
        }), React.createElement("div", {
            style: Xe
        },
        "Preview")))
    }
    calculateColorPickerLeft() {
        var e = this.selectedStop();
        return _.clamp(280 * e.pos - 5, 0, 270)
    }
    renderColorStops() {
        return this.props.gradient ? React.createElement("gradient-color-range", {
            style: Je
        },
        React.createElement(Pe, {
            width: 280,
            height: 25,
            stops: this.props.gradient.stops
        }), React.createElement("div", {
            style: PropUpdateHelper.update(Xe, {
                transform: "translateX(-50%)",
                left: "50%",
                color: this.state.isDragging ? "orange" : "gray"
            })
        },
        this.state.isDragging ? "Drag down to remove" : ""), React.createElement(Ke, {
            width: 280,
            activeStop: this.selectedStop(),
            stops: this.props.gradient.stops,
            onDragging: this.handleStopDragging,
            onPosChange: this.handlePosChange,
            onAddColor: this.handleAddColor,
            onActivate: this.handleActivate,
            onDeleteColor: this.handleDeleteColor
        }), React.createElement("div", {
            style: {
                display: this.state.isDragging ? "none" : "",
                position: "absolute",
                bottom: -10,
                left: this.calculateColorPickerLeft()
            }
        },
        React.createElement(je, {
            disableNoColor: true,
            value: ColorTypeConverter.getHtmlColor(this.selectedStop().color),
            onItemSelect: this.handleStepColorChanged
        }))) : React.createElement("gradient-color-range", {
            style: PropUpdateHelper.update(Je, {
                height: 47
            })
        })
    }
    raiseGradientChanged(e, t) {
        this.props.onGradientChanged(e, t)
    }
    setFromPreset(e) {
        var t = PropUpdateHelper.update(e, this.props.gradient ? {
            rotation: this.props.gradient.rotation
        } : {});
        this.raiseGradientChanged(t, false)
    }
    renderRadialGradientSettings() {
        var e = this.props.gradient.center || {
            x: 50,
            y: 50
        };
        var t = this.props.gradient.focal || {
            x: 0,
            y: 0
        };
        var n = this.props.gradient.scale || 1;
        return React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 4,
                paddingLeft: 10,
                width: 45
            }
        },
        "Center:"), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 4,
                fontSize: 14
            }
        },
        "("), React.createElement(NumericSliderComponent, {
            title: "Center x",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -25,
            max: 125,
            step: 1,
            value: e.x,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("centerX", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("centerX", e, false)
            }
        }), React.createElement(NumericSliderComponent, {
            title: "Center y",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0,
                marginRight: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -25,
            max: 125,
            step: 1,
            value: e.y,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("centerY", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("centerY", e, false)
            }
        }), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 0,
                fontSize: 14
            }
        },
        ")")), React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 4,
                paddingLeft: 10,
                width: 45
            }
        },
        "Focal:"), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 4,
                fontSize: 14
            }
        },
        "("), React.createElement(NumericSliderComponent, {
            title: "Focal x",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -45,
            max: 45,
            step: 1,
            value: t.x,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("focalX", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("focalX", e, false)
            }
        }), React.createElement(NumericSliderComponent, {
            title: "Focal y",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0,
                marginRight: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -45,
            max: 45,
            step: 1,
            value: t.y,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("focalY", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("focalY", e, false)
            }
        }), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 0,
                fontSize: 14
            }
        },
        ")")), React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 4,
                paddingLeft: 10,
                width: 45
            }
        },
        "Scale:"), React.createElement(NumericSliderComponent, {
            title: "Scale",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 9
            },
            style: {
                width: 25
            },
            unit: "%",
            min: 100,
            max: 300,
            step: 2,
            value: 100 * n,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("scale", e / 100, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("scale", e / 100, false)
            }
        }))))
    }
    renderLinearGradientSettings() {
        var e = this.props.gradient;
        var t = this.props.gradient.center || {
            x: 50,
            y: 50
        };
        var n = this.props.gradient.scale || 1;
        return React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 10,
                width: 45
            }
        },
        "Rotate:"), React.createElement(NumericSliderComponent, {
            title: "Rotation in degree",
            containerStyle: {
                paddingTop: 0
            },
            style: {
                width: 25,
                marginLeft: 6
            },
            unit: "deg",
            min: 0,
            max: 359,
            step: 1,
            value: e.rotation || 0,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("rotation", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("rotation", e, false)
            }
        })), React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 4,
                paddingLeft: 10,
                width: 45
            }
        },
        "Scale:"), React.createElement(NumericSliderComponent, {
            title: "Scale",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 9
            },
            style: {
                width: 25
            },
            unit: "%",
            min: 100,
            max: 300,
            step: 2,
            value: 100 * n,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("scale", e / 100, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("scale", e / 100, false)
            }
        })), React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                paddingTop: 4,
                paddingLeft: 10,
                width: 45
            }
        },
        "Center:"), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 4,
                fontSize: 14
            }
        },
        "("), React.createElement(NumericSliderComponent, {
            title: "Center x",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -25,
            max: 125,
            step: 1,
            value: t.x,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("centerX", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("centerX", e, false)
            }
        }), React.createElement(NumericSliderComponent, {
            title: "Center y",
            containerStyle: {
                paddingTop: 2,
                marginLeft: 0,
                marginRight: 0
            },
            style: {
                width: 25
            },
            unit: "%",
            min: -25,
            max: 125,
            step: 1,
            value: t.y,
            onValueChanging: (e) => {
                return this.handlePropertyChanged("centerY", e, true)
            },
            onValueChanged: (e) => {
                return this.handlePropertyChanged("centerY", e, false)
            }
        }), React.createElement("span", {
            style: {
                paddingTop: 2,
                paddingLeft: 0,
                fontSize: 14
            }
        },
        ")"))))
    }
    renderGradientSettings() {
        if (!this.props.gradient) return React.createElement("gradient-settings", {
            style: PropUpdateHelper.update(Ze, {
                height: 22
            })
        });
        var e = this.props.gradient.type || "linear";
        return React.createElement("gradient-settings", {
            style: Ze
        },
        React.createElement(FindAndReplaceOptionsComponent, {
            style: {
                flexGrow: 1
            },
            onSelect: this.handleGradientTypeChanged,
            items: at,
            selectedKeys: [e]
        }), "linear" == e ? this.renderLinearGradientSettings() : this.renderRadialGradientSettings())
    }
    render() {
        return React.createElement("gradient-container", {
            style: $e
        },
        this.renderPresets(), this.renderGradientSettings(), this.renderColorStops())
    }
}
var Ze = {
    fontSize: 12,
    color: "gray",
    display: "flex",
    marginTop: 10,
    border: "1px solid lightgray",
    position: "relative",
    padding: "8px 9px"
};
var Xe = {
    position: "absolute",
    bottom: "-0.5em",
    background: "rgb(247,247,247)",
    left: "10px",
    padding: "0 5px",
    fontSize: "11px",
    color: "gray"
};
var Je = {
    marginTop: 10,
    border: "1px solid lightgray",
    position: "relative",
    padding: "4px 9px",
    paddingBottom: 20,
    marginBottom: 20
};
var $e = {
    display: "flex",
    flexDirection: "column",
    width: 300
};
var et = {
    display: "flex"
};
var tt = {
    display: "block",
    padding: 2,
    cursor: "pointer"
};
var nt = {
    width: 25,
    height: 25,
    display: "block",
    border: "1px solid lightgray"
};
var rt = {
    padding: "3px 6px",
    textAlign: "center",
    width: 40,
    fontSize: 12
};
var at = [{
    style: rt,
    key: "linear",
    element: React.createElement("span", null, "Linear")
},
{
    style: rt,
    key: "radial",
    element: React.createElement("span", null, "Radial")
}];
class it extends React.Component {
    convertTikzSet() {
        return "\n\\tikzset{\npattern size/.store in=\\mcSize,\npattern size=5pt,\npattern thickness/.store in=\\mcThickness,\npattern thickness=0.3pt,\npattern radius/.store in=\\mcRadius,\npattern radius=1pt}"
    }
}
/// var ot = n(223)/*PatternDef*/;  // 3 times
class st extends it {
    renderSvgDefs(e) {
        return React.createElement("defs", null, PatternDef.renderPatternDefs(this.props.settings, e, e))
    }
    convertTikzPattern() {
        return ""
    }
    getPatternId() {
        return "_" + Math.random().toString(36).substr(2, 9)
    }
    renderRect(e) {
        return React.createElement("rect", {
            x: "0",
            y: "0",
            width: this.props.viewSize,
            height: this.props.viewSize,
            style: {
                fill: "url(#".concat(e, ")"),
                strokeWidth: 1,
                stroke: "black"
            }
        })
    }
    renderPattern() {
        var e = {
            cursor: "pointer",
            height: "".concat(this.props.viewSize, "px"),
            padding: 3
        };
        var t = this.getPatternId();
        return React.createElement("div", {
            style: e,
            onClick: () => {
                this.props.onClick()
            }
        },
        React.createElement("svg", {
            width: this.props.viewSize,
            height: this.props.viewSize,
            viewBox: "0 0 ".concat(this.props.viewSize, " ").concat(this.props.viewSize),
            xmlns: "http://www.w3.org/2000/svg"
        },
        this.renderSvgDefs(t), this.renderRect(t)))
    }
    render() {
        return React.createElement("pattern-box", {
            style: lt
        },
        this.renderPattern())
    }
}
var lt = {};
var ct = [{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cvertical lines}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{cvertical lines}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0}{\\mcSize}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
        }
    },
    name: "VerticalLinesPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@chorizontal lines}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{chorizontal lines}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0}}\n\\pgfusepath{stroke}}}\n\\makeatother"
        }
    },
    name: "HorizontalLinesPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cgrid}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{cgrid}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0}}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0}{\\mcSize}}\n\\pgfusepath{stroke}}}\n\\makeatother"
        }
    },
    name: "GridPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cnorth east lines}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{cnorth east lines}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{0pt}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+0.1pt}{\\mcSize+0.1pt}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
        }
    },
    name: "NorthEastLinesPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cnorth west lines}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{cnorth west lines}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+0.1pt}{-0.1pt}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
        }
    },
    name: "NorthWestLinesPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@ccrosshatch}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{ccrosshatch}\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+0.1pt}{-0.1pt}}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{0pt}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+0.1pt}{\\mcSize+0.1pt}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
        }
    },
    name: "CrossHatchPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cbricks}{\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{cbricks}\n{\\pgfpointorigin}\n{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0pt}{0.5*\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0.5*\\mcSize}}\n\\pgfpathmoveto{\\pgfpoint{0.5*\\mcSize}{0.5*\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{0.5*\\mcSize}{\\mcSize}}\n\\pgfpathmoveto{\\pgfpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{\\mcSize}}\n\\pgfusepath{stroke}}}\n\\makeatother"
        }
    },
    name: "BrickPattern"
},
{
    clss: class extends st {
        convertTikzPattern() {
            return "\n\\makeatletter\n\\pgfutil@ifundefined{pgf@pattern@name@cdots}{\n\\makeatletter\n\\pgfdeclarepatternformonly[\\mcRadius,\\mcThickness,\\mcSize]{cdots}\n{\\pgfpoint{-0.5*\\mcSize}{-0.5*\\mcSize}}\n{\\pgfpoint{0.5*\\mcSize}{0.5*\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathcircle\\pgfpointorigin{\\mcRadius}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
        }
    },
    name: "DotsPattern"
}];
class dt extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            patternSettings: void 0,
            patternSettingsChosen: void 0
        };
        this.onSizeChanged = (e, t) => {
            this.onSettingsChanged({
                name: this.state.patternSettingsChosen,
                size: e
            },
            t)
        };
        this.onThicknessChanged = (e, t) => {
            this.onSettingsChanged({
                name: this.state.patternSettingsChosen,
                thickness: e
            },
            t)
        };
        this.onTextColorPickerItemSelect = (e) => {
            this.onSettingsChanged({
                name: this.state.patternSettingsChosen,
                color: "rgba(".concat(e[0], ",").concat(e[1], ",").concat(e[2], ",").concat(e[3], ")")
            })
        };
        this.onSettingsChanged = (e, t) => {
            var n = this.getNewPatternSettings(e);
            this.setState({
                patternSettings: n
            });
            this.raisePatternChanged(n, t)
        };
        this.onRadiusChanged = (e, t) => {
            this.onSettingsChanged({
                name: this.state.patternSettingsChosen,
                radius: e
            },
            t)
        };
        if (null != this.props && null != this.props.pattern) {
            this.state.patternSettingsChosen = this.props.pattern.name;
            this.state.patternSettings = this.props.pattern
        }
    }
    componentWillReceiveProps(e) {
        if (null != e && null != e.pattern) {
            this.setState({
                patternSettingsChosen: e.pattern.name
            });
            this.setState({
                patternSettings: e.pattern
            })
        }
    }
    getSettingsDefault(e) {
        var t = e;
        return null != e && null != e.name && "DotsPattern" == e.name && (t = _.assign({},
        e, {
            radius: 1
        })),
        _.assign({},
        {
            name: "VerticalLinesPattern",
            size: 8,
            thickness: 1,
            color: "rgba(0,0,0,100)",
            radius: void 0
        },
        t)
    }
    onPatternSettingsChanged(e) {
        this.setState({
            patternSettingsChosen: e
        });
        var t = this.getSettingsDefault({
            name: e
        });
        this.setState({
            patternSettings: t
        });
        this.raisePatternChanged(t)
    }
    getNewPatternSettings(e) {
        return _.assign({},
        this.state.patternSettings, e)
    }
    raisePatternChanged(e, t) {
        this.props.onPatternChanged(e, t)
    }
    renderRadiusSetting(e) {
        if (e.radius) return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        },
        React.createElement(NumericSliderComponent, {
            title: "Radius",
            style: {
                width: 25
            },
            velocity: .1,
            unit: "px",
            min: 1,
            max: 100,
            step: 1,
            value: e.radius,
            icon: React.createElement("span", {
                style: {
                    width: 50,
                    display: "inline-block",
                    paddingRight: 5,
                    fontSize: 12,
                    color: "gray"
                }
            },
            "Radius:"),
            onValueChanging: (e) => {
                this.onRadiusChanged(e, true)
            },
            onValueChanged: (e) => {
                this.onRadiusChanged(e)
            }
        }))
    }
    renderSettings() {
        if (!this.state.patternSettings) return React.createElement("div", {
            style: gt
        });
        var e = this.state.patternSettings;
        return React.createElement("pattern-settings", {
            style: {
                border: "1px solid lightgray",
                marginTop: 20,
                padding: 5
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        },
        React.createElement(NumericSliderComponent, {
            title: "Size",
            style: {
                width: 25
            },
            velocity: .1,
            unit: "px",
            min: 1,
            max: 100,
            step: 1,
            value: e.size,
            icon: React.createElement("span", {
                style: {
                    width: 50,
                    display: "inline-block",
                    paddingRight: 5,
                    fontSize: 12,
                    color: "gray"
                }
            },
            "Size:"),
            onValueChanging: (e) => {
                this.onSizeChanged(e, true)
            },
            onValueChanged: (e) => {
                this.onSizeChanged(e)
            }
        })), React.createElement(L, {
            style: {
                marginLeft: 10
            },
            value: e.thickness,
            onItemSelect: (e) => {
                return this.onThicknessChanged(e)
            }
        }), React.createElement(FillColorIcon, {
            value: e.color,
            style: {
                paddingLeft: 5
            },
            onItemSelect: (e) => {
                this.onTextColorPickerItemSelect(e)
            }
        })), this.renderRadiusSetting(e))
    }
    renderPresets() {
        return ct.map((e, t) => {
            var n = e.clss;
            var r = e.name;
            var i = n;
            return React.createElement(i, {
                key: t,
                onClick: () => {
                    this.onPatternSettingsChanged(r)
                },
                settings: this.getSettingsDefault({
                    name: r,
                    radius: 1
                }),
                isChosen: this.state.patternSettingsChosen === r,
                viewSize: "25"
            })
        })
    }
    renderPreview(e) {
        if (!this.state.patternSettings) return React.createElement("div", {
            style: {
                width: 65,
                height: 65
            }
        });
        var t = e.clss;
        return React.createElement(t, {
            onClick: () => {
                this.onPatternSettingsChanged(e.name)
            },
            settings: this.state.patternSettings,
            isChosen: this.state.patternSettingsChosen === e.name,
            viewSize: "65"
        })
    }
    render() {
        var e = ct.find((e) => {
            return e.name === this.state.patternSettingsChosen
        });
        return React.createElement("fill-pattern-container", {
            style: ut
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                height: 100
            }
        },
        React.createElement("presets", {
            style: {
                display: "flex",
                flexDirection: "column",
                border: "1px solid lightgray"
            }
        },
        React.createElement("div", {
            style: ht
        },
        this.renderPresets()), React.createElement("div", {
            style: mt
        },
        "Presets")), React.createElement("preview-container", {
            style: pt
        },
        React.createElement("div", null, this.renderPreview(e)), React.createElement("div", {
            style: ft
        },
        "Preview"))), this.renderSettings())
    }
}
var ht = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "200px"
};
var ut = {
    display: "flex",
    flexDirection: "column",
    padding: 2
};
var pt = {
    borderTop: "1px solid lightgray",
    borderRight: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    position: "relative",
    padding: "4px 9px 12px"
};
var mt = {
    position: "absolute",
    background: "rgb(247,247,247)",
    left: "10px",
    top: 104,
    padding: "2px 8px",
    fontSize: "11px",
    color: "gray"
};
var ft = {
    position: "absolute",
    bottom: "-0.5em",
    background: "rgb(247,247,247)",
    left: "1px",
    padding: "2px 8px",
    fontSize: "11px",
    color: "gray"
};
var gt = {
    border: "1px solid lightgray",
    marginTop: "20px",
    padding: "5px",
    height: "30px"
};
/// var yt = n(57)/*MovingHandler*/;  // 13 times
/// var At = n(60)/*MouseDownEventAddRemove*/;  // 17 times
class Et extends ExpandableComponentB {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.onExpandContainerMouseDown = (e) => {
            e.stopPropagation()
        };
        this.handleColorChange = (e, t) => {
            this.setState({
                value: e
            });
            this.props.onItemSelect(e, true, t)
        };
        this.onColorSelectMouseDown = (e) => {
            EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build())
        };
        this.handleGradientChanged = (e, t) => {
            this.handleColorChange(e, t)
        };
        this.handlePatternChanged = (e, t) => {
            this.handleColorChange(e, t)
        };
        this.onTabItemsMouseDown = (e) => {
            if (this.lastPos = {
                x: this.state.containerLeft,
                y: this.state.containerTop
            },
            !this.movingHandler.baseElement) {
                var t = ReactDOM.findDOMNode(this);
                this.movingHandler.setBaseElement(t);
                this.movingHandler.setContainer(window.document.body)
            }
            this.movingHandler.mouseDown(e)
        };
        this.state = {
            selectedTab: this.getTabTypeBasedOnColor(this.props.value),
            value: this.props.value,
            expand: false,
            containerTop: 30,
            containerLeft: 0
        };
        this.movingHandler.onMoving = (e) => {
            this.setState({
                containerLeft: this.lastPos.x + e.x,
                containerTop: this.lastPos.y + e.y
            })
        };
        this.movingHandler.onMoved = () => {}
    }
    getTabTypeBasedOnColor(e) {
        return ColorHelper.isPattern(e) ? "Pattern" : ColorHelper.isGradient(e) ? "Gradient" : "Basic"
    }
    componentWillReceiveProps(e) {
        if (e.value != this.state.value) {
            this.setState({
                value: e.value
            });
            if (this.getTabTypeBasedOnColor(e.value) != this.state.selectedTab) this.setState({
                selectedTab: this.getTabTypeBasedOnColor(e.value)
            })
        }
    }
    getComponentClassName() {
        return "color-picker"
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.value != this.props.value || t.selectedTab != this.state.selectedTab || t.containerLeft != this.state.containerLeft || t.containerTop != this.state.containerTop || t.value != this.state.value
    }
    renderComponent() {
        var e = {
            fill: ColorHelper.isBasicColor(this.state.value) ? ColorTypeConverter.getHtmlColor(this.state.value) : "white",
            stroke: "gray"
        };
        return React.createElement("x-item", {
            class: "setting",
            style: {
                width: 23
            },
            title: "Fill Color"
        },
        ToolbarIcons.fillColor({
            width: "100%",
            height: "100%"
        },
        e))
    }
    renderNoColorSelect() {
        return React.createElement("no-color-select", {
            onMouseDown: () => {
                return this.handleColorChange("none")
            }
        },
        "No Color")
    }
    renderBasicColorContent(e) {
        if ("Basic" == this.state.selectedTab) {
            var t = ColorHelper.isBasicColor(this.state.value) ? this.state.value : "#000";
            return React.createElement("div", null, this.renderNoColorSelect(), React.createElement(SketchPickerWrapper, {
                style: {
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    borderRadius: 0
                },
                color: t,
                onChange: this.handleColorChange,
                scale: e
            }))
        }
    }
    renderGradientColorContent() {
        if ("Gradient" == this.state.selectedTab) {
            var e = ColorHelper.isGradient(this.state.value) ? this.state.value : void 0;
            return React.createElement(Qe, {
                gradient: e,
                onGradientChanged: this.handleGradientChanged
            })
        }
    }
    renderPatternContent() {
        if ("Pattern" == this.state.selectedTab) {
            var e = ColorHelper.isPattern(this.state.value) ? this.state.value : void 0;
            return React.createElement(dt, {
                pattern: e,
                onPatternChanged: this.handlePatternChanged
            })
        }
    }
    getTabItem(e, t) {
        return React.createElement("tab-item", {
            onMouseDown: () => {
                return this.setState({
                    selectedTab: e
                })
            },
            style: this.state.selectedTab === e ? It : xt
        },
        t)
    }
    renderExpandComponent() {
        return this.innerRenderExpandComponent(void 0, 1)
    }
    innerRenderExpandComponent(e, t) {
        var n = _.assignIn({},
        e, {
            top: this.state.containerTop,
            left: this.state.containerLeft
        });
        return React.createElement("color-select", {
            onTouchStart: (e) => {
                return e.nativeEvent.handledTouchStart = true
            },
            style: n,
            onMouseDown: this.onColorSelectMouseDown
        },
        React.createElement("tabs-container", {
            style: St
        },
        React.createElement("tab-items", {
            style: Ct
        },
        React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: this.onTabItemsMouseDown
        },
        React.createElement("drag-area", {
            style: vt
        })), this.getTabItem("Basic", "Color"), this.getTabItem("Gradient", "Gradient"), this.getTabItem("Pattern", "Pattern")), React.createElement("tab-content", {
            style: Tt
        },
        React.createElement("div", {
            style: bt
        }), this.renderBasicColorContent(t), this.renderGradientColorContent(), this.renderPatternContent())))
    }
}
var vt = {
    display: "block",
    width: "100%",
    height: "100%",
    cursor: "move",
    position: "absolute"
};
var St = {
    display: "flex",
    flexDirection: "column",
    background: "#f7f7f7",
    padding: 5,
    border: "1px solid lightgray",
    boxShadow: "1px 1px 1px 0px #e0dddd"
};
var Ct = {
    display: "flex",
    flexDirection: "row",
    marginLeft: -5,
    marginRight: -5,
    paddingLeft: 5,
    marginBottom: -1,
    position: "relative"
};
var xt = {
    fontSize: 12,
    padding: 5,
    display: "block",
    boxSizing: "border-box",
    border: "1px solid transparent",
    position: "relative",
    background: "#f7f7f7"
};
var It = Object.assign({},
xt, {
    border: "1px solid lightgray",
    color: "black",
    zIndex: 1,
    borderBottom: "1px solid rgb(247,247,247)"
});
var Tt = {
    paddingTop: 10,
    position: "relative"
};
var bt = {
    borderTop: "1px solid lightgray",
    marginLeft: -5,
    marginRight: -5,
    marginTop: -10,
    paddingTop: 10
};
/// var Lt = n(56)/*ToolbarChangeHandleWrapper*/;  // 25 times
/// var Rt = n(126)/*LabelItemContainer*/;  // 5 times
class Mt extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleArrangmentChanged = (e) => {
            var t;
            var n = this.props.getSelectedIds();
            var r = this.getSelectedShapesKeepOrder();
            var a = _.filter(this.props.data.shapes, (e) => {
                return n.indexOf(e.id) < 0
            });
            t = "front" == e ? a.concat(r) : r.concat(a);
            this.props.onShapesOrderChanged(t)
        }
    }
    render() {
        return React.createElement("div", null, React.createElement("main", {
            title: "Arrange Item Above or Below Others"
        },
        React.createElement(LabelItemContainer, {
            label: "Arrange",
            items: wt,
            onItemSelect: this.handleArrangmentChanged,
            icon: React.createElement("svg", {
                style: Ot
            },
            React.createElement("rect", {
                x: "2",
                y: "3",
                width: "9",
                height: "7",
                style: {
                    stroke: "gray",
                    fill: "#c1c0c0"
                }
            }), React.createElement("rect", {
                x: "7",
                y: "7",
                width: "9",
                height: "7",
                style: {
                    stroke: "gray",
                    fill: "#f9f8f8"
                }
            }))
        }), ItemRemoveSelected.separator()))
    }
    getSelectedShapesKeepOrder() {
        var e = this.props.data;
        var t = this.props.getSelectedIds();
        return _.filter(e.shapes, (e) => {
            return t.indexOf(e.id) >= 0
        })
    }
}
var wt = [{
    value: "front",
    display: "Bring to Front"
},
{
    value: "back",
    display: "Send to Back"
}];
var Ot = {
    width: 20,
    height: 15,
    float: "left"
};
/// var Dt = n(89)/*DynamicSvg*/;  // 4 times
class Nt extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onItemSelect = (e) => {
            var t = ItemDefaultSettings.setSetting(this.props.data, e, !ItemDefaultSettings.getSettings(this.props.data, e));
            this.props.onChanged(t)
        }
    }
    render() {
        var e = this.props.data;
        var t = ItemDefaultSettings.getSettings(e, "textSnapToGrid");
        var n = ItemDefaultSettings.getSettings(e, "onlyShowGridOnEditing");
        var r = ItemDefaultSettings.getSettings(e, "snapToOtherShapes");
        var i = ItemDefaultSettings.getSettings(e, "grid");
        var o = [{
            value: "textSnapToGrid",
            display: "Snap to Grid",
            checked: t,
            isCheckBox: true,
            disabled: !i
        },
        {
            value: "onlyShowGridOnEditing",
            display: "Only Show Grid on Editing",
            checked: n,
            isCheckBox: true,
            disabled: !i
        },
        {
            value: "snapToOtherShapes",
            display: "Snap to Other Shapes",
            checked: r,
            isCheckBox: true
        }];
        return React.createElement("div", null, React.createElement("main", {
            title: "Options"
        },
        React.createElement(LabelItemContainer, {
            label: "Options",
            containerStyle: {
                width: 200
            },
            items: o,
            onItemSelect: this.onItemSelect
        }), ItemRemoveSelected.separator()))
    }
}
/// var kt = n(244)/*ExportHandlerForTest*/;  // 1 times
/// var Bt = n(467)/*DiagramExportDialog*/;  // 1 times
/// var Pt = n(339)/*AccessibilityDialog*/;  // 1 times
class Ft extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            showExportDialog: null
        };
        this.handleAccessibilityChanged = (e) => {
            this.props.onModelChanged(_.assignIn({},
            this.props.data, {
                accessibility: e
            }));
            this.setState({
                showAccessibility: false
            })
        };
        this.handleRequestMathAreaElement = () => {
            return this.props.requestDiagramElement()
        };
        this.onExportMouseDown = (e) => {
            var t = this.props.requestDiagramElement();
            if (t) if (Global.isTestEnv()) ExportHandlerForTest.handleDiagramExportForTest(t);
            else this.setState({
                showExportDialog: e
            })
        }
    }
    render() {
        var e = ItemDefaultSettings.getSettings(this.props.data, "grid");
        var t = ItemDefaultSettings.getSettings(this.props.data, "gridSize");
        var n = ItemDefaultSettings.getSettings(this.props.data, "textSnapToGrid");
        var r = ItemDefaultSettings.getSettings(this.props.data, "onlyShowGridOnEditing");
        var i = ItemDefaultSettings.getSettings(this.props.data, "snapToOtherShapes");
        var o = null;
        if (e) o = React.createElement("main", null, React.createElement(NumericSliderComponent, {
            title: "Grid Size",
            key: "2",
            unit: "px",
            min: 2,
            max: 200,
            step: 1,
            value: t,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible"
                }
            },
            React.createElement("path", {
                style: {
                    transform: "translate(-4px,5px)",
                    stroke: "gray"
                },
                d: "M2,7 L20,7 M6,4 L6,10  M16,4 L16,10"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 6
                },
                p2: {
                    x: 14,
                    y: 6
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6
                }
            })),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("settings", "gridSize", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("settings", "gridSize", e, false, t)
            }
        }), ItemRemoveSelected.separator());
        var s = {
            marginTop: 2,
            marginLeft: 5,
            width: 65,
            zIndex: 10,
            position: "relative",
            fontSize: 12,
            height: 22
        };
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [e, t, n, r, i, this.state.showExportDialog, this.state.showAccessibility]
        },
        React.createElement("main", null, React.createElement("x-item", {
            title: "Showing Grid",
            style: _t,
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "grid", !e, void 0, void 0)
            },
            class: e ? "selected" : ""
        },
        React.createElement("svg", {
            style: Ht
        },
        React.createElement("path", {
            d: "M2,4 L20,4 M2,11 L20,11 M2,18 L20,18   M4,2 L4,20 M11,2 L11,20 M18,2 L18,20"
        }))), o, React.createElement(Nt, {
            data: this.props.data,
            onChanged: this.props.onModelChanged
        }), React.createElement("span", {
            style: {
                marginTop: 6,
                color: "gray",
                fontSize: 12,
                marginLeft: 3
            }
        },
        "Export:"), React.createElement("button", {
            className: "btn-normal save-as-svg",
            onMouseDown: () => {
                return this.onExportMouseDown("SVG")
            },
            style: s
        },
        "Image"), React.createElement("button", {
            className: "btn-normal",
            onMouseDown: () => {
                return this.props.requestTikzExport()
            },
            style: s
        },
        "Tikz"), ItemRemoveSelected.separator(), React.createElement(LabelItemContainer, {
            key: "1",
            containerStyle: {
                width: 150
            },
            caret: false,
            label: "...",
            style: {
                marginLeft: 4,
                color: "gray",
                fill: "gray",
                marginTop: 2
            },
            labelStyle: {
                paddingTop: 0,
                lineHeight: "1.5em",
                paddingBottom: 2
            },
            items: Ut,
            onItemSelect: () => {
                return this.setState({
                    showAccessibility: true
                })
            }
        }), this.renderAccessibilityDialog(), this.renderExportDialog()))
    }
    renderAccessibilityDialog() {
        if (this.state.showAccessibility) return React.createElement(AccessibilityDialog, {
            hideTitle: true,
            info: this.props.data.accessibility,
            onClose: () => {
                return this.setState({
                    showAccessibility: false
                })
            },
            onOk: this.handleAccessibilityChanged
        })
    }
    renderExportDialog() {
        if (this.state.showExportDialog) return React.createElement(DiagramExportDialog, {
            fixedContextHandler: this.props.fixedContextHandler,
            imageType: this.state.showExportDialog,
            requestMathAreaElement: this.handleRequestMathAreaElement,
            isDiagram: true,
            onCancel: () => {
                return this.setState({
                    showExportDialog: null
                })
            }
        })
    }
}
var Ht = _.assignIn({},
ColorHelper.getIconSvgStyle(), {
    height: 20,
    strokeWidth: .5
});
var _t = {
    width: 22,
    marginLeft: 3
};
var Ut = [{
    value: "accessibility",
    display: "Accessibility"
}];
/// var Wt = n(226)/*IntersectionEntityHelper*/;  // 3 times
class Gt extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleAction = (e) => {
            var t = this.props.entity;
            var n = this.getInfo(t);
            var r = n.selected;
            var a = n.blockIntersection;
            switch (e) {
            case "intersection-enable":
                return this.props.handleToggleIntersection(r);
            case "intersection-block":
                return this.props.handleToggleBlockIntersection(a)
            }
        }
    }
    render() {
        var e = this.props.entity;
        var t = this.getInfo(e);
        var n = t.selected;
        var r = t.blockIntersection;
        var i = [{
            value: "intersection-enable",
            display: "Intersection",
            isCheckBox: true,
            checked: n
        },
        {
            value: "intersection-block",
            display: "Block Intersection",
            isCheckBox: true,
            checked: r
        }];
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [n, r]
        },
        React.createElement("main", null, React.createElement(LabelItemContainer, {
            containerStyle: {
                width: 150
            },
            caret: false,
            label: "...",
            items: i,
            onItemSelect: this.handleAction
        }), ItemRemoveSelected.separator()))
    }
    getInfo(e) {
        return {
            selected: IntersectionEntityHelper.isEntityIn(this.props.intersections, e),
            blockIntersection: !!ItemDefaultSettings.getSettings(e, "blockIntersection")
        }
    }
}
class zt extends React.PureComponent {
    render() {
        var e = this.props.entity.shape.frameType;
        var t = ColorHelper.getIconSvgStyle();
        var n = "rectangle" == e;
        var r = "ellipse" == e;
        var i = "circle" == e;
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [e]
        },
        React.createElement("main", null, React.createElement("x-item", {
            title: "Rectangle Frame",
            style: Yt,
            onMouseDown: () => {
                return this.props.changeEntityProperty(null, "frameType", n ? void 0 : "rectangle", void 0, void 0)
            },
            class: n ? "selected" : ""
        },
        React.createElement("svg", {
            key: "rectangle",
            style: t
        },
        React.createElement("rect", {
            x: "5",
            y: "8",
            width: "12",
            height: "8"
        }))), React.createElement("x-item", {
            title: "Ellipse Frame",
            style: Yt,
            onMouseDown: () => {
                return this.props.changeEntityProperty(null, "frameType", r ? void 0 : "ellipse", void 0, void 0)
            },
            class: r ? "selected" : ""
        },
        React.createElement("svg", {
            key: "ellipse",
            style: t
        },
        React.createElement("ellipse", {
            cx: "11",
            cy: "12",
            rx: "6",
            ry: "4"
        }))), React.createElement("x-item", {
            title: "Circle Frame",
            style: Yt,
            onMouseDown: () => {
                return this.props.changeEntityProperty(null, "frameType", i ? void 0 : "circle", void 0, void 0)
            },
            class: i ? "selected" : ""
        },
        React.createElement("svg", {
            key: "circle",
            style: t
        },
        React.createElement("circle", {
            cx: "11",
            cy: "12",
            r: "5"
        }))), ItemRemoveSelected.separator()))
    }
}
var Yt = {
    width: 22
};
class Kt extends React.PureComponent {
    render() {
        var e = this.props.entities;
        if (!_.every(e, (e) => {
            return DiagramIdHelper.isDiagramIntersectionId(e.id)
        })) return React.createElement("div", null);
        var t = e[0];
        if (!t) return React.createElement("div", null);
        var n = ItemDefaultSettings.getSettings(t, "shapeType");
        var r = ItemDefaultSettings.getSettings(t, "radius");
        var i = t.style;
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [n, r, i]
        },
        React.createElement("intersections-details", null, React.createElement("x-item", {
            title: "Intersection Type",
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "shapeType", "o", false, void 0)
            },
            class: "intersection-type" + ("o" == n ? " selected" : "")
        },
        React.createElement("svg", null, React.createElement("circle", {
            style: {
                stroke: "black",
                strokeWidth: 1
            },
            cx: "12",
            cy: "12",
            r: "4"
        }))), React.createElement("x-item", {
            title: "Intersection Type",
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "shapeType", "o+", false, void 0)
            },
            class: "intersection-type" + ("o+" == n ? " selected" : "")
        },
        React.createElement("svg", null, React.createElement("path", {
            d: "M8,12 L16,12 M12,8 L12,16",
            style: {
                stroke: "black",
                strokeWidth: 1
            }
        }), React.createElement("circle", {
            style: {
                stroke: "black",
                strokeWidth: 1
            },
            cx: "12",
            cy: "12",
            r: "4"
        }))), React.createElement("x-item", {
            title: "Intersection Type",
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "shapeType", "x", false, void 0)
            },
            class: "intersection-type" + ("x" == n ? " selected" : "")
        },
        React.createElement("svg", null, React.createElement("path", {
            d: "M8,8 L16,16 M16,8 L8,16",
            style: {
                stroke: "black",
                strokeWidth: 1
            }
        }))), React.createElement("x-item", {
            title: "Intersection Type",
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "shapeType", "+", false, void 0)
            },
            class: "intersection-type" + ("+" == n ? " selected" : "")
        },
        React.createElement("svg", null, React.createElement("path", {
            d: "M8,12 L16,12 M12,8 L12,16",
            style: {
                stroke: "black",
                strokeWidth: 1
            }
        }))), ItemRemoveSelected.separator(), React.createElement(NumericSliderComponent, {
            title: "Intersection Size",
            unit: "px",
            min: 2,
            max: 50,
            step: 1,
            value: r,
            icon: React.createElement("span", {
                style: {
                    fontSize: 11,
                    color: "gray",
                    paddingRight: 2
                }
            },
            "Size"),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("settings", "radius", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("settings", "radius", e, false, t)
            }
        }), ItemRemoveSelected.separator()))
    }
}
class Vt extends M {
    constructor(e) {
        super(e);
        this.title = "Tail Arrow Type"
    }
    renderOptions() {
        return React.createElement(ExpandableComponent, null, this.renderOne(React.createElement("div", {
            style: jt,
            key: "no"
        },
        "No")), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "f<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)",
                fill: "gray",
                stroke: "none"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 Z"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "fh<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)",
                fill: "gray"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 L5.93,0 Z"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "f>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)",
                fill: "gray",
                stroke: "none"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-8px,0)"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 Z"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "fh>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)",
                fill: "gray"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-8px,0)"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 L5.93,0 Z"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: ">"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-8px,0)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-8px,0)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: qt,
            key: "("
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: ")"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "5",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: qt,
            key: "|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "||"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "-3.35",
            y1: "5.59",
            x2: "-3.35",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: ">>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "10",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2>>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "10",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "|<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2|<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: ">|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-8px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-8px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "8",
            y1: "0",
            x2: "15",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: qt,
            key: "+"
        },
        React.createElement("g", {
            style: {
                transform: "translate(5px,10px)"
            }
        },
        React.createElement("line", {
            x1: "-5.59",
            y1: "0",
            x2: "5.59",
            y2: "0"
        }), React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "12",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "x"
        },
        React.createElement("g", {
            style: {
                transform: "translate(5px,10px) rotate(45deg)"
            }
        },
        React.createElement("line", {
            x1: "-5.59",
            y1: "0",
            x2: "5.59",
            y2: "0"
        }), React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        })), React.createElement("g", {
            style: {
                transform: "translate(5px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "12",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "|<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2|<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: ">>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-16px,0px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "13",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "2>>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-16px,0px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "13",
            y1: "0",
            x2: "17",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: qt,
            key: "*"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("circle", {
            cx: "0",
            cy: "0",
            r: "3.35",
            fill: "currentColor"
        }), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "12",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "o"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "12",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }), React.createElement("circle", {
            cx: "0",
            cy: "0",
            r: "3.35",
            fill: "white"
        })))), this.render2Pair(React.createElement("svg", {
            style: qt,
            key: "hook-up-("
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "4",
            y1: "6",
            x2: "15",
            y2: "6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "hook-up-)"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "1",
            y1: "6",
            x2: "12",
            y2: "6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "hook-down-("
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "4",
            y1: "-6",
            x2: "15",
            y2: "-6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: qt,
            key: "hook-down-)"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "1",
            y1: "-6",
            x2: "12",
            y2: "-6",
            strokeDasharray: "1.125 1.35"
        })))))
    }
    getComponentClassName() {
        return super.getComponentClassName() + " arrow-tail"
    }
    getItemStyle() {
        return {
            marginLeft: 4,
            width: 15
        }
    }
    getItemOptionStyle() {
        return null
    }
}
var jt = {
    fontSize: "11px",
    padding: "3px",
    marginTop: "2px",
    display: "block"
};
var qt = {
    width: "100%",
    height: "100%",
    stroke: "gray",
    strokeWidth: "1px",
    fill: "none",
    overflow: "visible"
};
class Qt extends M {
    constructor(e) {
        super(e);
        this.title = "Head Arrow Type"
    }
    renderOptions() {
        return React.createElement(ExpandableComponent, null, this.renderOne(React.createElement("div", {
            style: jt,
            key: "no"
        },
        "No")), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: "f>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-14px,0)",
                fill: "gray",
                stroke: "none"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 Z"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "fh>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-14px,0)",
                fill: "gray"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 L5.93,0 Z"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "f<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "",
                fill: "gray",
                stroke: "none"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 Z"
        })), React.createElement("line", {
            x1: "-5",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "fh<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "",
                fill: "gray"
            }
        },
        React.createElement("path", {
            d: "M8.93,-4.29 L 0,0 L8.93,4.29 L5.93,0 Z"
        })), React.createElement("line", {
            x1: "-5",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: ">"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-14px,0)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(2px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-14px,0)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "-5",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "-5",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: Zt,
            key: ")"
        },
        React.createElement("g", {
            style: {
                transform: "translate(10px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-8",
            y1: "0",
            x2: "6",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "("
        },
        React.createElement("g", {
            style: {
                transform: "translate(12px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-10",
            y1: "0",
            x2: "0",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: Zt,
            key: "|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(12px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "-12",
            y1: "0",
            x2: "0",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "||"
        },
        React.createElement("g", {
            style: {
                transform: "translate(16px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "-3.35",
            y1: "5.59",
            x2: "-3.35",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "-14",
            y1: "0",
            x2: "-4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: ">>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2>>"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "-2",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "-2",
            y1: "0",
            x2: "4",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: ">|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-8px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "6",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translateX(-8px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "6",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "|<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "6",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2|<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(6px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "-6",
            y1: "0",
            x2: "6",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: Zt,
            key: "+"
        },
        React.createElement("g", {
            style: {
                transform: "translate(12px,10px)"
            }
        },
        React.createElement("line", {
            x1: "-5.59",
            y1: "0",
            x2: "5.59",
            y2: "0"
        }), React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("line", {
            x1: "-12",
            y1: "0",
            x2: "5",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "x"
        },
        React.createElement("g", {
            style: {
                transform: "translate(14px,10px) rotate(45deg)"
            }
        },
        React.createElement("line", {
            x1: "-5.59",
            y1: "0",
            x2: "5.59",
            y2: "0"
        }), React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        })), React.createElement("g", {
            style: {
                transform: "translate(5px,10px)"
            }
        },
        React.createElement("line", {
            x1: "-2",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: ">>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-16px,0px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2>>|"
        },
        React.createElement("g", {
            style: {
                transform: "translate(0px,10px)"
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(-1,1) translate(-16px,0px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        })), React.createElement("line", {
            x1: "0",
            y1: "0",
            x2: "10",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "|<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-0.45 17.64,-3.29"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,0.45 17.64,3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-0.45 10.93,-3.29"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,0.45 10.93,3.29"
        }), React.createElement("line", {
            x1: "-4",
            y1: "0",
            x2: "8",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "2|<<"
        },
        React.createElement("g", {
            style: {
                transform: "translate(4px,10px)"
            }
        },
        React.createElement("line", {
            x1: "0",
            y1: "5.59",
            x2: "0",
            y2: "-5.59"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,-1 17.64,-4.9"
        }), React.createElement("path", {
            d: "M6.71,0 Q11.67,1 17.64,4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,-1 10.93,-4.9"
        }), React.createElement("path", {
            d: "M0,0 Q4.96,1 10.93,4.9"
        }), React.createElement("line", {
            x1: "-4",
            y1: "0",
            x2: "8",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        })))), this.renderPair(React.createElement("svg", {
            style: Zt,
            key: "*"
        },
        React.createElement("g", {
            style: {
                transform: "translate(14px,10px)"
            }
        },
        React.createElement("circle", {
            cx: "0",
            cy: "0",
            r: "3.35",
            fill: "currentColor"
        }), React.createElement("line", {
            x1: "-14",
            y1: "0",
            x2: "2",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "o"
        },
        React.createElement("g", {
            style: {
                transform: "translate(14px,10px)"
            }
        },
        React.createElement("line", {
            x1: "-14",
            y1: "0",
            x2: "2",
            y2: "0",
            strokeDasharray: "1.125 1.35"
        }), React.createElement("circle", {
            cx: "0",
            cy: "0",
            r: "3.35",
            fill: "white"
        })))), this.render2Pair(React.createElement("svg", {
            style: Zt,
            key: "hook-up-)"
        },
        React.createElement("g", {
            style: {
                transform: "translate(10px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-8",
            y1: "6",
            x2: "1",
            y2: "6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "hook-up-("
        },
        React.createElement("g", {
            style: {
                transform: "translate(12px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-8",
            y1: "6",
            x2: "4",
            y2: "6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "hook-down-)"
        },
        React.createElement("g", {
            style: {
                transform: "translate(10px,10px)"
            }
        },
        React.createElement("path", {
            style: {
                transform: "scale(-1,1) translateX(-5px)"
            },
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-8",
            y1: "-6",
            x2: "1",
            y2: "-6",
            strokeDasharray: "1.125 1.35"
        }))), React.createElement("svg", {
            style: Zt,
            key: "hook-down-("
        },
        React.createElement("g", {
            style: {
                transform: "translate(12px,10px)"
            }
        },
        React.createElement("path", {
            d: "M5.59,-5.59 A 5.59,5.59 0 0,0 5.59,5.59"
        }), React.createElement("line", {
            x1: "-8",
            y1: "-6",
            x2: "4",
            y2: "-6",
            strokeDasharray: "1.125 1.35"
        })))))
    }
    getComponentClassName() {
        return super.getComponentClassName() + " arrow-head"
    }
    getItemStyle() {
        return {
            width: 18,
            marginLeft: -2
        }
    }
    getItemOptionStyle() {
        return null
    }
}
var Zt = {
    width: "100%",
    height: "100%",
    stroke: "gray",
    strokeWidth: "1px",
    fill: "none",
    overflow: "visible"
};
class Xt extends React.PureComponent {
    render() {
        var e = this.props.entity;
        var t = ItemDefaultSettings.getSettings(e, "breakWidth");
        var n = ItemDefaultSettings.getSettings(e, "breakPositionPercentage");
        var r = !!ItemDefaultSettings.getSettings(e, "breakWidth");
        var i = null;
        var o = null;
        var s = null;
        return r && (o = React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement(NumericSliderComponent, {
            title: "Break Size",
            unit: "px",
            min: 4,
            max: 200,
            step: 1,
            value: t,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible"
                }
            },
            React.createElement("g", {
                style: {
                    transform: "translate(-7px,0px)"
                }
            },
            React.createElement("line", {
                x1: "4",
                y1: "12",
                x2: "10",
                y2: "12",
                stroke: "gray",
                strokeWidth: "1"
            }), React.createElement("line", {
                x1: "10",
                y1: "12",
                x2: "18",
                y2: "12",
                stroke: "#e4e3e3",
                strokeWidth: "1"
            }), React.createElement("line", {
                x1: "18",
                y1: "12",
                x2: "24",
                y2: "12",
                stroke: "gray",
                strokeWidth: "1"
            })), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 6
                },
                p2: {
                    x: 14,
                    y: 6
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6
                }
            })),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("settings", "breakWidth", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("settings", "breakWidth", e, false, t)
            }
        })), i = React.createElement(ToolbarChangeHandleWrapper, {
            watch: [n]
        },
        React.createElement(NumericSliderComponent, {
            title: "Break Position",
            unit: "%",
            min: 0,
            max: 100,
            step: 1,
            value: 100 * n,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible"
                }
            },
            React.createElement("g", {
                style: {
                    transform: "translate(-7px,-2px)"
                }
            },
            React.createElement("line", {
                x1: "4",
                y1: "12",
                x2: "10",
                y2: "12",
                stroke: "gray",
                strokeWidth: "1"
            }), React.createElement("line", {
                x1: "10",
                y1: "12",
                x2: "18",
                y2: "12",
                stroke: "#e4e3e3",
                strokeWidth: "1"
            }), React.createElement("line", {
                x1: "18",
                y1: "12",
                x2: "24",
                y2: "12",
                stroke: "gray",
                strokeWidth: "1"
            })), React.createElement("path", {
                d: "M0,6 L9,6 M3,4 L0,6L3,8",
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6,
                    transform: "translate(-3px,8px)"
                }
            }), React.createElement("path", {
                d: "M5,6 L14,6  M11,4 L14,6 L11,8",
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6,
                    transform: "translate(4px,0)"
                }
            })),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("settings", "breakPositionPercentage", e / 100, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("settings", "breakPositionPercentage", e / 100, false, t)
            }
        })), s = ItemRemoveSelected.separator()),
        React.createElement("main", null, React.createElement("x-item", {
            title: "Adding Break In Middle Of Arrow",
            class: r ? "selected" : "",
            onMouseDown: () => {
                return this.props.changeEntityProperty("settings", "breakWidth", r ? void 0 : 20, false, void 0)
            }
        },
        React.createElement("svg", null, React.createElement("line", {
            x1: "2",
            y1: "12",
            x2: "10",
            y2: "12",
            stroke: "gray",
            strokeWidth: "1"
        }), React.createElement("line", {
            x1: "10",
            y1: "12",
            x2: "18",
            y2: "12",
            stroke: "#e4e3e3",
            strokeWidth: "1"
        }), React.createElement("line", {
            x1: "18",
            y1: "12",
            x2: "26",
            y2: "12",
            stroke: "gray",
            strokeWidth: "1"
        }))), ItemRemoveSelected.separator(), o, i, s)
    }
}
/// var Jt = n(151)/*ShapesDestructer*/;  // 4 times
/// var zz = n(190)/*DiagramEntityHelper*/;  // 3 times
/// var en = n(20)/*EntityUtils*/;  // 52 times
class an extends React.PureComponent {
    render() {
        return nn((e) => {
            return EntityUtils.isRullerArrow(e)
        },
        this.props.entities, this.props.diagram, (e) => {
            var t = ItemDefaultSettings.getSettings(e, "separatorDistance");
            var n = ItemDefaultSettings.getSettings(e, "separatorLength");
            var r = {
                width: "21px",
                height: "14px",
                strokeWidth: "1px",
                stroke: "lightgray",
                fill: "none",
                overflow: "visible"
            };
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t, n]
            },
            React.createElement("main", null, React.createElement(NumericSliderComponent, {
                title: "Separator Unit Distance",
                key: "2",
                unit: "px",
                min: 5,
                max: 200,
                step: 1,
                value: t,
                icon: React.createElement("svg", {
                    style: r
                },
                React.createElement("path", {
                    style: {
                        transform: "translate(-4px,5px)",
                        stroke: "gray"
                    },
                    d: "M2,7 L20,7 M6,4 L6,10  M16,4 L16,10"
                }), React.createElement(DynamicSvg, {
                    p1: {
                        x: 0,
                        y: 6
                    },
                    p2: {
                        x: 14,
                        y: 6
                    },
                    style: {
                        stroke: "green",
                        strokeOpacity: .8,
                        fill: "none",
                        fillOpacity: .6
                    }
                })),
                onValueChanging: (e) => {
                    return this.props.changeEntityProperty("settings", "separatorDistance", e, true, void 0)
                },
                onValueChanged: (e, t) => {
                    return this.props.changeEntityProperty("settings", "separatorDistance", e, false, t)
                }
            }), React.createElement(NumericSliderComponent, {
                title: "Separator Size",
                key: "3",
                unit: "px",
                min: 2,
                max: 50,
                step: 1,
                value: n,
                icon: React.createElement("svg", {
                    style: r
                },
                React.createElement("path", {
                    style: {
                        transform: "translate(-4px,3px)",
                        stroke: "gray"
                    },
                    d: "M2,7 L20,7 M6,4 L6,10  M16,4 L16,10"
                }), React.createElement(DynamicSvg, {
                    p1: {
                        x: 0,
                        y: 6
                    },
                    p2: {
                        x: 14,
                        y: 6
                    },
                    style: {
                        stroke: "green",
                        strokeOpacity: .8,
                        fill: "none",
                        fillOpacity: .6,
                        transform: "rotate(90deg) translate(3px,-10px)"
                    }
                })),
                onValueChanging: (e) => {
                    return this.props.changeEntityProperty("settings", "separatorLength", e, true, void 0)
                },
                onValueChanged: (e, t) => {
                    return this.props.changeEntityProperty("settings", "separatorLength", e, false, t)
                }
            }), ItemRemoveSelected.separator()))
        })
    }
}
class on extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleSelectStraightLineType = () => {
            this.props.changeEntityProperty(null, "type", void 0, void 0, void 0)
        };
        this.handleSelectQuadraticLineType = () => {
            var e = this.props.data;
            var t = e.connections;
            var n = e.elements;
            var r = _.chain(this.props.getSelectedEntites()).filter((e) => {
                return "quadratic" != e.type
            }).map((e) => {
                var r = PropUpdateHelper.setProp(e, "type", "quadratic");
                if (r.data || (r.data = {}), !r.data.cp) {
                    var a = ShapeManagement.getConnectionPoints(t, n, r);
                    var i = a.from;
                    var o = a.to;
                    var s = {
                        dh: Geometry.distance2Points(i, o) / 2 / 1.4,
                        df: .5
                    };
                    r = PropUpdateHelper.set(r, "data.cp", s)
                }
                return r
            }).value();
            this.props.raiseEntitiesChange(r, false)
        };
        this.handleSelectCubicLineType = () => {
            var e = this.props.data;
            var t = e.connections;
            var n = e.elements;
            var r = _.chain(this.props.getSelectedEntites()).filter((e) => {
                return "cubic" != e.type
            }).map((e) => {
                var r = PropUpdateHelper.setProp(e, "type", "cubic");
                if (!r.data) r.data = {};
                var a = ShapeManagement.getConnectionPoints(t, n, r);
                var i = a.from;
                var o = a.to;
                if (!r.data.cp) {
                    var s = {
                        dh: Geometry.distance2Points(i, o) / 2 / 1.4,
                        df: .5
                    };
                    r = PropUpdateHelper.set(r, "data.cp", s)
                }
                if (!r.data.cp2) {
                    var l = {
                        dh: Geometry.distance2Points(i, o) / 2 / 1.7,
                        df: .5
                    };
                    r = PropUpdateHelper.set(r, "data.cp2", l)
                }
                return r
            }).value();
            this.props.raiseEntitiesChange(r, false)
        };
        this.onTailChanged = (e) => {
            this.props.changeEntityProperty(null, "tail", e, void 0, void 0)
        };
        this.onShaftChanged = (e) => {
            this.props.changeEntityProperty(null, "shaft", e, void 0, void 0)
        };
        this.onHeadChanged = (e) => {
            this.props.changeEntityProperty(null, "head", e, void 0, void 0)
        }
    }
    render() {
        var e = this.props.entities;
        if (!_.every(e, (e) => {
            return DiagramIdHelper.isDiagramConnectionId(e.id)
        })) return React.createElement("div", null);
        var t = e[0];
        return t ? React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t.type]
        },
        React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("x-item", {
            title: "Straight Line",
            class: "straight-line-select" + this.getLineTypeSelected(t, void 0),
            onMouseDown: this.handleSelectStraightLineType
        },
        React.createElement("svg", null, React.createElement("line", {
            x1: "5",
            y1: "12",
            x2: "23",
            y2: "12",
            stroke: "gray",
            strokeWidth: "1"
        }), React.createElement("circle", {
            cx: "5",
            cy: "12",
            r: "2",
            fill: "green"
        }), React.createElement("circle", {
            cx: "23",
            cy: "12",
            r: "2",
            fill: "green"
        }))), React.createElement("x-item", {
            title: "Quadratic Curve Line",
            class: "quadratic-line-select" + this.getLineTypeSelected(t, "quadratic"),
            onMouseDown: this.handleSelectQuadraticLineType
        },
        React.createElement("svg", null, React.createElement("path", {
            d: "M5,12 Q14,5 23,12",
            stroke: "gray",
            strokeWidth: "1",
            fill: "none"
        }), React.createElement("circle", {
            cx: "5",
            cy: "12",
            r: "2",
            fill: "green"
        }), React.createElement("circle", {
            cx: "23",
            cy: "12",
            r: "2",
            fill: "green"
        }))), React.createElement("x-item", {
            title: "Cubic Curve Line",
            class: "cubic-line-select" + this.getLineTypeSelected(t, "cubic"),
            onMouseDown: this.handleSelectCubicLineType
        },
        React.createElement("svg", null, React.createElement("path", {
            d: "M5,12 C14,2 16,22 23,12",
            stroke: "gray",
            strokeWidth: "1",
            fill: "none"
        }), React.createElement("circle", {
            cx: "5",
            cy: "12",
            r: "2",
            fill: "green"
        }), React.createElement("circle", {
            cx: "23",
            cy: "12",
            r: "2",
            fill: "green"
        }))))), ItemRemoveSelected.separator(), React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t.tail, t.shaft, t.head]
        },
        React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement(Vt, {
            part: t.tail,
            onItemSelect: this.onTailChanged
        }), React.createElement(N, {
            part: t.shaft,
            onItemSelect: this.onShaftChanged
        }), React.createElement(Qt, {
            part: t.head,
            onItemSelect: this.onHeadChanged
        }))), ItemRemoveSelected.separator(), this.renderBreakInformation(t), this.renderRulerArrowCustomDetails(e)) : React.createElement("div", null)
    }
    getLineTypeSelected(e, t) {
        return e.type === t ? " selected" : ""
    }
    renderBreakInformation(e) {
        return React.createElement(Xt, {
            entity: e,
            changeEntityProperty: this.props.changeEntityProperty
        })
    }
    renderRulerArrowCustomDetails(e) {
        return React.createElement(an, {
            entities: e,
            diagram: this.props.data,
            changeEntityProperty: this.props.changeEntityProperty
        })
    }
}
/// var sn = n(291)/*FontSizeSelectBox*/;  // 1 times
class ln extends React.PureComponent {
    render() {
        var e = this.props.entity;
        var t = ColorHelper.getEntityStyle(e, "textColor");
        var n = ItemDefaultSettings.getTextSetting(e, "fontSize");
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [n, t]
        },
        React.createElement("main", {
            className: "font-size-container"
        },
        React.createElement(TextColorItem, {
            value: t,
            onItemSelect: (e, t) => {
                return this.props.changeEntityProperty("style", "textColor", e, false, t)
            }
        }), React.createElement("div", {
            style: {
                marginTop: 4,
                marginLeft: 4
            }
        },
        React.createElement(FontSizeSelectBox, {
            onChange: (e) => {
                return this.props.changeEntityProperty("settings", "fontSize", e, void 0, void 0)
            },
            value: n
        })), ItemRemoveSelected.separator()))
    }
}
class cn extends React.PureComponent {
    render() {
        var e = this.props.entity;
        var t = ItemDefaultSettings.getSettings(e, "cornerRadius");
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", {
            className: "font-size-container"
        },
        React.createElement(NumericSliderComponent, {
            title: "Corner Radius",
            key: "2",
            unit: "px",
            min: 0,
            max: 1E3,
            step: 1,
            value: t,
            icon: React.createElement("svg", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    strokeWidth: 1,
                    width: 21,
                    height: 14,
                    overflow: "visible"
                }
            },
            React.createElement("rect", {
                x: "3",
                y: "7",
                width: "10",
                height: "8",
                rx: "2",
                ry: "2"
            }), React.createElement("path", {
                d: " M9.5,4 C18.5,2 18.5,10 16.5,12"
            }), React.createElement("path", {
                d: " M15.21,8.81 L19.99,10.66 L15.21,12.5",
                style: {
                    transform: "rotate(90deg) translate(0px,0.2px)",
                    transformOrigin: "17.5977px 10.6561px 0px"
                }
            }), React.createElement("path", {
                d: " M10.21,1.81 L14.99,3.66 L10.21,5.5",
                style: {
                    transform: "rotate(182.81deg) translate(1px,0px)",
                    transformOrigin: " 12.5977px 3.6561px 0px"
                }
            })),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("settings", "cornerRadius", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("settings", "cornerRadius", e, false, t)
            }
        }), ItemRemoveSelected.separator()))
    }
}
class hn extends React.PureComponent {
    render() {
        var e = this.props.entity;
        var t = ShapeManagement.getDataValue(e, "rotation", 0);
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", null, React.createElement(NumericSliderComponent, {
            title: "Rotation in degree",
            containerStyle: {
                marginRight: 0
            },
            style: {
                width: 33
            },
            key: "2",
            unit: "",
            decimals: 1,
            min: 0,
            max: 359,
            step: 1,
            value: t,
            icon: dn(),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("data", "rotation", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("data", "rotation", e, false, t)
            }
        }), ItemRemoveSelected.separator()))
    }
}
var pn = new class {
    traverse(e) {
        var t = e.entities.map((t) => {
            return this.traverseSingle(t, e)
        });
        var n = (FindEntityHelper.findAllOriginalEditors(e.entities, e.allEditors) || []).map((t) => {
            return this.handleEditor(t, e)
        });
        return {
            entities: t,
            linkedEditors: n,
            allEditors: this.mergeEditors(n, e.allEditors)
        }
    }
    mergeEditors(e, t) {
        if (0 === e.length) return t;
        var n = _.clone(t);
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            n[a.id] = a
        }
        return n
    }
    innerTraverse(e, t) {
        return e.map((e) => {
            return this.traverseSingle(e, t)
        })
    }
    orNull(e) {
        return e || this.emptyFunc
    }
    emptyFunc(e, t) {
        return e
    }
    handleEditor(e, t) {
        return this.orNull(t.handleText)(e, t.data)
    }
    traverseSingle(e, t) {
        if (!e) return null;
        var n = EntityUtils.getEntityType(e);
        if ("connection" == n) {
            var r = e;
            return EntityUtils.isStraightConnection(e) ? this.orNull(t.handleStraightConnection)(e, t.data) : EntityUtils.isQuadraticConnection(r) ? this.orNull(t.handleQuadraticConnection)(e, t.data) : EntityUtils.isCubicConnection(r) ? this.orNull(t.handleCubicConnection)(e, t.data) : e
        }
        if ("shape-arrow" == n) return EntityUtils.isStraightLineArrow(e) ? this.orNull(t.handleStraightArrow)(e, t.data) : this.orNull(t.handleCubicArrow)(e, t.data);
        var a = e;
        if ("shape-composite" == n) return this.orNull(t.handleComposite)(e, t.data);
        if ("shape-object" == n) {
            if (EntityUtils.isPolygon(a)) return this.orNull(t.handlePolygon)(a, t.data);
            if (EntityUtils.isPolygonCurve(a)) return this.orNull(t.handlePolygonCurve)(a, t.data)
        }
        if ("text" == n) return this.orNull(t.handleText)(e, t.data);
        if ("group" == n) {
            var i = e;
            var o = this.innerTraverse(i.entities, t);
            var s = _.assignIn({},
            i, {
                entities: o
            });
            return this.orNull(t.handleGroupEntity)(s, t.data)
        }
        return e
    }
};
var mn = new class {
    rotateEntities(e, t, n, r) {
        return pn.traverse({
            entities: e,
            allEditors: r,
            data: {
                cp: t,
                rotation: n
            },
            handleStraightArrow(e, t) {
                var n = t.cp;
                var r = t.rotation;
                return _.assignIn({},
                e, {
                    data: e.data.map((e) => {
                        return Geometry.pointRotate(e, n, r)
                    })
                })
            },
            handleCubicArrow(e, t) {
                var n = t.cp;
                var r = t.rotation;
                var a = Geometry.toAbsoluteControlPointCubics(e.data).map((e) => {
                    return Geometry.bezierRotate(e, n, r)
                });
                return _.assignIn({},
                e, {
                    data: a.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleComposite(e, t) {
                var n = t.cp;
                var r = t.rotation;
                return ShapeLoader.getShapeManagement(e).rotateAround(e, r, n)
            },
            handlePolygon(e, t) {
                var n = t.cp;
                var r = t.rotation;
                return _.assignIn({},
                e, {
                    data: e.data.map((e) => {
                        return Geometry.pointRotate(e, n, r)
                    })
                })
            },
            handlePolygonCurve(e, t) {
                var n = t.cp;
                var r = t.rotation;
                var a = Geometry.toAbsoluteControlPointCubics(e.data).map((e) => {
                    return Geometry.bezierRotate(e, n, r)
                });
                return _.assignIn({},
                e, {
                    data: a.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleText(e, t) {
                var n = t.cp;
                var r = t.rotation;
                var a = e.shape.data;
                var i = a.rotation;
                var o = void 0 === i ? 0 : i;
                var s = a.p;
                return _.assignIn({},
                e, {
                    shape: _.assignIn({},
                    e.shape, {
                        data: _.assignIn({},
                        e.shape.data, {
                            p: Geometry.pointRotate(s, n, r),
                            rotation: Geometry.addRotation360(o, r)
                        })
                    })
                })
            },
            handleGroupEntity(e, t) {
                var n = t.rotation;
                var r = (e.data || {}).rotation;
                var a = void 0 === r ? 0 : r;
                return _.assignIn({},
                e, {
                    data: _.assignIn({},
                    e.data, {
                        rotation: Geometry.addRotation360(a, n)
                    })
                })
            }
        })
    }
};
/// var fn = n(81)/*SkewHelper*/;  // 8 times
var gn = new class {
    skewEntities(e, t, n, r) {
        return pn.traverse({
            entities: e,
            allEditors: r,
            data: {
                cp: t,
                skewX: n
            },
            handleStraightArrow(e, t) {
                var n = t.cp;
                var r = t.skewX;
                return _.assignIn({},
                e, {
                    data: SkewHelper.pointsFromSkew(n, r, e.data)
                })
            },
            handleCubicArrow(e, t) {
                var n = t.cp;
                var r = t.skewX;
                var a = Geometry.toAbsoluteControlPointCubics(e.data);
                var i = SkewHelper.genericLinesFromSkewedCenter(n, r, a);
                return _.assignIn({},
                e, {
                    data: i.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleComposite(e, t) {
                var n = t.cp;
                var r = t.skewX;
                return ShapeLoader.getShapeManagement(e).skewXAtCenter(e, r, n)
            },
            handlePolygon(e, t) {
                var n = t.cp;
                var r = t.skewX;
                return _.assignIn({},
                e, {
                    data: SkewHelper.pointsFromSkew(n, r, e.data)
                })
            },
            handlePolygonCurve(e, t) {
                var n = t.cp;
                var r = t.skewX;
                var a = Geometry.toAbsoluteControlPointCubics(e.data);
                var i = SkewHelper.genericLinesFromSkewedCenter(n, r, a);
                return _.assignIn({},
                e, {
                    data: i.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleText(e, t) {
                var n = t.cp;
                var r = t.skewX;
                return _.assignIn({},
                e, {
                    shape: _.assignIn({},
                    e.shape, {
                        data: _.assignIn({},
                        e.shape.data, {
                            p: SkewHelper.pointSkewed(n, r, e.shape.data.p)
                        })
                    })
                })
            },
            handleGroupEntity: (e) => {
                return e
            }
        })
    }
};
var yn = new class {
    unTransform(e, t, n, r, a) {
        var i = mn.rotateEntities(e, r, -t, a);
        return gn.skewEntities(i.entities, r, -n, i.allEditors)
    }
    transform(e, t, n, r, a) {
        var i = gn.skewEntities(e, r, n, a);
        return mn.rotateEntities(i.entities, r, t, i.allEditors)
    }
};
/// var An = n(119)/*EntityFinder*/;  // 5 times
/// var En = n(167)/*ShapeScale*/;  // 5 times
var vn = (e, t) => {
    var n = t.from;
    var r = t.to;
    var a = e.shape.data;
    var i = a.p;
    var o = a.flipX;
    return _.assignIn({},
    e, {
        shape: _.assignIn({},
        e.shape, {
            data: _.assignIn({},
            e.shape.data, {
                p: ShapeScale.scalePoint(i, n, r.rect, r.isFlipX),
                flipX: (r.isFlipX ? !o : o) || void 0
            })
        })
    })
};
var Sn = (e, t, n, r) => {
    var a = e[t.fromEditorId];
    var i = e[t.toEditorId];
    var o = vn(a, {
        from: n,
        to: r,
        editors: e
    });
    var s = vn(i, {
        from: n,
        to: r,
        editors: e
    });
    return Geometry.distance2Points(o.shape.data.p, s.shape.data.p) / Geometry.distance2Points(a.shape.data.p, i.shape.data.p) * (r.isFlipX ? -1 : 1)
};
var Cn = new class {
    scaleEntities(e, t, n, r) {
        return pn.traverse({
            entities: e,
            allEditors: r,
            data: {
                from: t,
                to: n,
                editors: r
            },
            handleStraightArrow(e, t) {
                var n = t.from;
                var r = t.to;
                return _.assignIn({},
                e, {
                    data: ShapeScale.scalePoints(e.data, n, r.rect, !!r.isFlipX)
                })
            },
            handleCubicArrow(e, t) {
                var n = t.from;
                var r = t.to;
                var a = Geometry.toAbsoluteControlPointCubics(e.data).map((e) => {
                    return ShapeScale.scalePropertyInData(e, ["p1", "cp", "cp2", "p2"], n, r.rect, !!r.isFlipX)
                });
                return _.assignIn({},
                e, {
                    data: a.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleComposite(e, t) {
                var n = t.from;
                var r = t.to;
                return ShapeLoader.getShapeManagement(e).scale(e, n, r.rect, !!r.isFlipX, !!r.isRotation180)
            },
            handlePolygon(e, t) {
                var n = t.from;
                var r = t.to;
                return _.assignIn({},
                e, {
                    data: ShapeScale.scalePoints(e.data, n, r.rect, !!r.isFlipX)
                })
            },
            handlePolygonCurve(e, t) {
                var n = t.from;
                var r = t.to;
                var a = Geometry.toAbsoluteControlPointCubics(e.data).map((e) => {
                    return ShapeScale.scalePropertyInData(e, ["p1", "cp", "cp2", "p2"], n, r.rect, !!r.isFlipX)
                });
                return _.assignIn({},
                e, {
                    data: a.map((e) => {
                        return Geometry.toRelativeControlPointCubic(e)
                    })
                })
            },
            handleText: vn,
            handleQuadraticConnection(e, t) {
                var n = t.from;
                var r = t.to;
                var a = t.editors;
                var i = Sn(a, e, n, r);
                return _.assignIn({},
                e, {
                    data: _.assignIn({},
                    e.data, {
                        cp: _.assignIn({},
                        e.data.cp, {
                            dh: e.data.cp.dh * i
                        })
                    })
                })
            },
            handleCubicConnection(e, t) {
                var n = t.from;
                var r = t.to;
                var a = t.editors;
                var i = Sn(a, e, n, r);
                return _.assignIn({},
                e, {
                    data: _.assignIn({},
                    e.data, {
                        cp: _.assignIn({},
                        e.data.cp, {
                            dh: e.data.cp.dh * i
                        }),
                        cp2: _.assignIn({},
                        e.data.cp2, {
                            dh: e.data.cp2.dh * i
                        })
                    })
                })
            }
        })
    }
};
/// var xn = n(47)/*RotationControlPointHelper*/;  // 42 times
class In extends React.PureComponent {
    constructor(e) {
        super(e);
        this.onMoving = (e, t) => {
            this.props.onPointMoving(t)
        };
        this.handleRotationControlPoint = (e) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {},
            RotationControlPointHelper.getReverseScale(this.props.scale))
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onPointMoved()
        };
        this.movingHandler.onMovingStarted = () => {
            if (this.props.onPointMovingStarted) this.props.onPointMovingStarted()
        }
    }
    render() {
        var e = this.props;
        var t = e.point;
        var n = e.scale;
        var r = RotationControlPointHelper.getScaledPoint(t, n);
        var i = Global.isMobileOrTablet() ? 7 : 4;
        return React.createElement("g", null, this.renderSuplementLine(r), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: this.handleRotationControlPoint
        },
        React.createElement("g", {
            style: _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                transform: ColorHelper.buildTranslateStyleTransform(r.x - i, r.y - i)
            })
        },
        ItemRemoveSelected.getRotationSvgIcon(i))))
    }
    renderSuplementLine(e) {
        if (this.props.center) {
            var t = this.props;
            var n = t.center;
            var r = t.scale;
            var i = RotationControlPointHelper.getScaledPoint(n, r);
            return React.createElement("line", {
                x1: i.x,
                y1: i.y,
                x2: e.x,
                y2: e.y,
                style: {
                    stroke: "gray",
                    strokeOpacity: .3,
                    strokeWidth: 1,
                    fill: "none"
                }
            })
        }
    }
}
class Tn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onMoved = () => {
            this.originalInfo = null;
            this.props.onEntitiesMoved()
        };
        this.onPointMovingStarted = () => {
            var e = this.props;
            var t = e.rect;
            var n = e.rotation;
            var r = e.entities;
            var a = e.diagram;
            var i = Geometry.getCenterPoint(t);
            this.originalInfo = {
                rect: t,
                unTransformedEntities: yn.unTransform(r, n, 0, i, a.elements)
            }
        };
        this.onMoving = (e) => {
            var t = this.props.rect;
            var n = this.originalInfo.unTransformedEntities;
            var r = n.entities;
            var a = n.allEditors;
            var i = Geometry.getCenterPoint(t);
            var o = RotationControlPointHelper.getRotationPoint(t, 0, this.props.scale);
            var s = Geometry.angleFrom3Points360(o.p, e, i);
            var l = mn.rotateEntities(r, i, s, a);
            this.props.onEntitiesMoving(un(l), s, this.originalInfo)
        }
    }
    render() {
        var e = this.props;
        var t = e.rect;
        var n = e.scale;
        var r = e.rotation;
        var i = RotationControlPointHelper.getRotationPoint(t, r, n);
        var o = Geometry.getCenterPoint(t);
        return React.createElement(In, {
            getRootElement: this.props.getRootElement,
            point: i.p,
            center: o,
            scale: n,
            onPointMoved: this.onMoved,
            onPointMoving: this.onMoving,
            onPointMovingStarted: this.onPointMovingStarted
        })
    }
}
/// var bn = n(161)/*ShapeControlDistance*/;  // 2 times
class Ln extends React.PureComponent {
    constructor(e) {
        super(e);
        this.onMoving = (e, t, n) => {
            var r = n.customData;
            var a = r.rect;
            var i = r.untransformedEntities;
            var o = i.allEditors;
            var s = i.entities;
            var l = this.props.rotation;
            var c = void 0 === l ? 0 : l;
            var d = Geometry.getCenterPoint(a);
            var h = Geometry.pointRotate(t, d, -c);
            var u = SkewHelper.skewXAngleFromDisplacement(a, {
                x: a.p1.x,
                y: a.p2.y
            },
            h);
            var p = yn.transform(s, c, u, d, o);
            this.props.onEntityMoving(un(p), u, n.customData)
        };
        this.handleSkewControlPointStart = (e) => {
            var t = this.props;
            var n = t.entities;
            var r = t.rect;
            var a = t.skewX;
            var i = void 0 === a ? 0 : a;
            var o = t.scale;
            var s = t.rotation;
            var l = void 0 === s ? 0 : s;
            var c = t.diagram;
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            var d = Geometry.getCenterPoint(r);
            var h = yn.unTransform(n, l, i, d, c.elements);
            this.movingHandler.mouseDown(e, {
                entities: n,
                rect: r,
                originalSkewX: i || 0,
                untransformedEntities: h
            },
            RotationControlPointHelper.getReverseScale(o))
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onEntityMoved()
        }
    }
    render() {
        var e = this.props;
        var t = e.scale;
        var n = e.rect;
        var r = e.skewX;
        var i = e.rotation;
        var o = SkewHelper.rectTo4PointsSkewed(n, r);
        var s = slicedToArray(o, 4)[3];
        var c = Geometry.getCenterPoint(n);
        var h = Geometry.pointRotate({
            x: s.x,
            y: s.y + ShapeControlDistance.skewControlDistance() / t
        },
        c, i);
        var u = RotationControlPointHelper.getScaledPoint(h, t);
        var p = Global.isMobileOrTablet() ? 7 : 4;
        return React.createElement(MouseDownEventAddRemove, {
            key: "skew-p",
            onTouchOrMouseDown: this.handleSkewControlPointStart
        },
        React.createElement("g", {
            style: _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                transform: ColorHelper.buildTranslateStyleTransform(u.x, u.y, i)
            })
        },
        React.createElement("rect", {
            transform: "skewX(-30)",
            x: -p,
            y: -p,
            width: 2 * p,
            height: 2 * p,
            fill: "orange",
            stroke: "white"
        })))
    }
}
/// var Rn = n(8)/*ShapeUtil*/;  // 3 times
/// var Mn = n(70)/*TransformHelper*/;  // 5 times
class wn extends React.Component {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.handleControlMouseDown = (e, t) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            var n = this.getGroupBoxRect();
            var r = Geometry.getCenterPoint(n);
            var a = this.props;
            var i = a.entities;
            var o = a.skewX;
            var s = void 0 === o ? 0 : o;
            var l = a.rotation;
            var c = void 0 === l ? 0 : l;
            var d = a.diagram;
            var h = yn.unTransform(i, c, s, r, d.elements);
            this.movingHandler.mouseDown(e, {
                cpInfo: t,
                rect: n,
                rotation: this.props.rotation,
                startEntities: this.props.entities,
                diagram: this.props.diagram,
                untransformedEntities: h
            })
        };
        this.onMouseMoving = (e, t, n, r) => {
            var a = n.customData;
            var i = a.cpInfo;
            var o = a.diagram;
            var s = a.rect;
            var l = a.rotation;
            var c = a.untransformedEntities;
            var h = Geometry.scalePoint(t, 1 / this.props.scale);
            var u = SnapToGridSize.getGridSizeIfSnapEnabled(o, r);
            var p = r.shiftKey;
            var m = r.altKey;
            var f = Geometry.snapToGridSize(h, u);
            if ("skew-x" != i.pos) {
                var g = _.assignIn({},
                s, {
                    rotation: l,
                    skewX: this.props.skewX
                });
                var y = ShapeUtil.moveControlPoint(i.pos, g, f, {
                    keepRatio: p,
                    symmetricResize: m
                });
                var A = Geometry.round2(y.rotation || 0) != Geometry.round2(l || 0);
                var v = y.flipX;
                var S = c.entities;
                var C = c.allEditors;
                var x = Cn.scaleEntities(S, s, {
                    rect: y,
                    isRotation180: A,
                    isFlipX: v
                },
                C);
                var I = Geometry.getCenterPoint(y);
                var T = gn.skewEntities(x.entities, I, y.skewX, x.allEditors);
                var b = mn.rotateEntities(T.entities, I, y.rotation, T.allEditors);
                this.setState({
                    lastRect: y
                });
                this.props.onEntitiesChanging(un(b), y.rotation, y.skewX);
                n.customData.entities = b
            }
        };
        this.handleRotationEntitiesMoving = (e, t, n) => {
            this.setState({
                tempRotation: t,
                lastRect: n.rect
            });
            this.props.onEntitiesChanging(e, t, this.props.skewX)
        };
        this.handleEntitiesMoved = () => {
            this.setState({
                tempRotation: null,
                lastRect: null,
                tempSkewX: null
            });
            this.props.onEntitiesChanged(this.props.entities, this.props.rotation, this.props.skewX)
        };
        this.handleSkewXEntitiesMoving = (e, t, n) => {
            this.setState({
                tempSkewX: t,
                lastRect: n.rect
            });
            this.props.onEntitiesChanging(e, this.props.rotation, t)
        };
        this.movingHandler.onMoving = this.onMouseMoving;
        this.movingHandler.onMoved = (e) => {
            this.setState({
                lastRect: null
            });
            if (e.customData.entities) this.props.onEntitiesChanged(un(e.customData.entities), this.props.rotation, this.props.skewX)
        };
        this.state = {
            tempRotation: null,
            tempSkewX: null
        }
    }
    getColorTheme() {
        return this.props.colorTheme || "green"
    }
    render() {
        var e = this.props.scale;
        var t = this.props.entities;
        if (!t || 0 === t.length) return React.createElement("g", null);
        var n = this.state.lastRect || this.getGroupBoxRect();
        var r = Geometry.scaleRectangle(n, e);
        var i = Geometry.getCenterPoint(r);
        var o = ShapeUtil.rectTo4Points(_.assignIn({},
        r, {
            skewX: this.getSkewX(),
            rotation: this.getRotation()
        }));
        var s = Geometry.pointsToLines(o, true);
        var l = ShapeHelper.pathsD(s);
        return React.createElement("g", null, React.createElement("path", {
            d: l,
            fill: "none",
            style: {
                strokeWidth: 1,
                stroke: this.getColorTheme(),
                strokeDasharray: "5 5"
            }
        }), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                return this.props.onGroupMouseDown(e)
            }
        },
        React.createElement("g", {
            className: "group-box-move",
            style: {
                cursor: "move",
                transform: (new TransformHelper).orgin(i.x, i.y).rotate(this.getRotation(), "deg").toCssStyle(),
                pointerEvents: "visiblePainted"
            }
        },
        React.createElement("rect", {
            x: i.x - 10,
            y: i.y - 10,
            width: 20,
            height: 20,
            style: {
                fill: "rgba(255,255,255,0.59)",
                stroke: this.getColorTheme()
            }
        }), React.createElement("g", {
            style: {
                transform: (new TransformHelper).translate(i.x - 9, i.y - 9).scale(.035).toCssStyle(),
                fill: this.getColorTheme()
            }
        },
        ToolbarIcons.arrowAltPath))), React.createElement("g", {
            role: "group-resize-container"
        },
        this.renderGroupResize(n)), React.createElement("g", null, this.getRotationControlPoint(n)), React.createElement("g", null, this.getSkewPoint(n)))
    }
    getRotationControlPoint(e) {
        return React.createElement(Tn, {
            key: "rotation-cp",
            rect: e,
            diagram: this.props.diagram,
            rotation: this.getRotation(),
            entities: this.props.entities,
            getRootElement: this.props.getRootElement,
            onEntitiesMoved: this.handleEntitiesMoved,
            onEntitiesMoving: this.handleRotationEntitiesMoving,
            scale: this.props.scale
        })
    }
    getSkewPoint(e) {
        return React.createElement(Ln, {
            skewX: this.getSkewX(),
            rect: e,
            diagram: this.props.diagram,
            rotation: this.getRotation(),
            entities: this.props.entities,
            getRootElement: this.props.getRootElement,
            scale: this.props.scale,
            onEntityMoving: this.handleSkewXEntitiesMoving,
            onEntityMoved: this.handleEntitiesMoved
        })
    }
    getRotation() {
        return null != this.state.tempRotation ? this.state.tempRotation : this.props.rotation || 0
    }
    getSkewX() {
        return null != this.state.tempSkewX ? this.state.tempSkewX : this.props.skewX || 0
    }
    getGroupBoxRect() {
        var e = this.props;
        var t = e.entities;
        var n = e.diagram;
        var r = e.editorRef;
        var a = e.scale;
        var i = e.rotation;
        var o = void 0 === i ? 0 : i;
        var s = e.skewX;
        return On(o, void 0 === s ? 0 : s, a, t, n.elements, r)
    }
    renderGroupResize(e) {
        var t = Geometry.scaleRectangle(e, this.props.scale);
        var n = ShapeUtil.rectTo4Points(_.assignIn({},
        t, {
            skewX: this.getSkewX(),
            rotation: this.getRotation()
        }));
        var r = slicedToArray(n, 4);
        var i = r[0];
        var o = r[1];
        var s = r[2];
        var c = r[3];
        var h = Geometry.getMiddlePointLine(i, c);
        var u = Geometry.getMiddlePointLine(i, o);
        var p = Geometry.getMiddlePointLine(o, s);
        var m = Geometry.getMiddlePointLine(s, c);
        return [{
            pos: "left-top",
            point: i,
            cursor: "nwse-resize"
        },
        {
            pos: "top",
            point: u,
            cursor: "ns-resize"
        },
        {
            pos: "top-right",
            point: o,
            cursor: "nesw-resize"
        },
        {
            pos: "right",
            point: p,
            cursor: "ew-resize"
        },
        {
            pos: "right-bottom",
            point: s,
            cursor: "nwse-resize"
        },
        {
            pos: "bottom",
            point: m,
            cursor: "ns-resize"
        },
        {
            pos: "bottom-left",
            point: c,
            cursor: "nesw-resize"
        },
        {
            pos: "left",
            point: h,
            cursor: "ew-resize"
        }].map((e) => {
            var t = e.pos;
            var n = e.point;
            var r = e.cursor;
            var i = _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                opacity: .7,
                cursor: r,
                transform: (new TransformHelper).orgin(n.x, n.y).rotate(this.getRotation(), "deg").toCssStyle()
            });
            return React.createElement(MouseDownEventAddRemove, {
                key: t,
                onTouchOrMouseDown: (t) => {
                    return this.handleControlMouseDown(t, e)
                }
            },
            React.createElement("rect", {
                x: n.x - 4,
                y: n.y - 4,
                style: i,
                width: 8,
                height: 8,
                fill: this.getColorTheme(),
                stroke: "white"
            }))
        })
    }
}
class Dn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleValueChanging = (e) => {
            this.rotateEntity(e, true, true)
        };
        this.handleValueChanged = (e, t) => {
            this.rotateEntity(e, false, t);
            this.originalInfo = null
        }
    }
    calculateOriginalInfo() {
        var e = this.props;
        var t = e.entity;
        var n = e.allEditors;
        var r = e.scale;
        var a = e.allEditorRef;
        var i = t.data || {};
        var o = i.rotation;
        var s = void 0 === o ? 0 : o;
        var l = i.skewX;
        var c = void 0 === l ? 0 : l;
        if (!this.originalInfo) {
            var d = On(s, c, r, t.entities, n, a);
            var h = Geometry.getCenterPoint(d);
            this.originalInfo = {
                entity: t,
                unrotatedEntities: yn.unTransform(t.entities, s, 0, h, n),
                rect: d
            }
        }
        return this.originalInfo
    }
    rotateEntity(e, t, n) {
        var r = this.calculateOriginalInfo();
        var a = r.rect;
        var i = r.unrotatedEntities;
        var o = r.entity;
        var s = Geometry.getCenterPoint(a);
        var l = mn.rotateEntities(i.entities, s, e, i.allEditors);
        var c = _.assignIn({},
        o, {
            data: _.assignIn({},
            o.data, {
                rotation: e
            })
        });
        this.props.onEntityChanged(un(l), c, t, n)
    }
    render() {
        var e = this.props.entity;
        var t = ShapeManagement.getDataValue(e, "rotation", 0);
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", null, React.createElement(NumericSliderComponent, {
            title: "Rotation in degree",
            containerStyle: {
                marginRight: 0
            },
            decimals: 1,
            style: {
                width: 33
            },
            key: "2",
            unit: "",
            min: 0,
            max: 359,
            step: 1,
            value: t,
            icon: dn(),
            onValueChanging: this.handleValueChanging,
            onValueChanged: this.handleValueChanged
        }), ItemRemoveSelected.separator()))
    }
}
class kn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleValueChanging = (e) => {
            this.rotateEntity(e, true, true)
        };
        this.handleValueChanged = (e, t) => {
            this.rotateEntity(e, false, t);
            this.originalInfo = null
        }
    }
    calculateOriginalInfo() {
        var e = this.props;
        var t = e.entity;
        var n = e.allEditors;
        var r = e.scale;
        var a = e.allEditorRef;
        var i = t.data || {};
        var o = i.rotation;
        var s = void 0 === o ? 0 : o;
        var l = i.skewX;
        var c = void 0 === l ? 0 : l;
        if (!this.originalInfo) {
            var d = On(s, c, r, t.entities, n, a);
            var h = Geometry.getCenterPoint(d);
            this.originalInfo = {
                entity: t,
                untransformedEntities: yn.unTransform(t.entities, s, c, h, n),
                rect: d,
                rotation: s
            }
        }
        return this.originalInfo
    }
    rotateEntity(e, t, n) {
        var r = this.calculateOriginalInfo();
        var a = r.rect;
        var i = r.untransformedEntities;
        var o = r.entity;
        var s = r.rotation;
        var l = Geometry.getCenterPoint(a);
        var c = yn.transform(i.entities, s, e, l, i.allEditors);
        var h = _.assignIn({},
        o, {
            data: _.assignIn({},
            o.data, {
                skewX: e
            })
        });
        this.props.onEntityChanged(un(c), h, t, n)
    }
    render() {
        var e = this.props.entity;
        var t = ShapeManagement.getDataValue(e, "skewX", 0);
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", null, React.createElement(NumericSliderComponent, {
            title: "Skew X in degree",
            containerStyle: {
                marginRight: 0
            },
            style: {
                width: 30
            },
            key: "2",
            unit: "\u00b0",
            min: -85,
            max: 85,
            step: 1,
            value: t,
            decimals: 1,
            icon: Nn(),
            onValueChanging: this.handleValueChanging,
            onValueChanged: this.handleValueChanged
        }), ItemRemoveSelected.separator()))
    }
}
class Bn extends React.PureComponent {
    render() {
        var e = this.props.entity;
        var t = ShapeManagement.getDataValue(e, "skewX", 0);
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", null, React.createElement(NumericSliderComponent, {
            title: "Skew X in degree",
            containerStyle: {
                marginRight: 0
            },
            style: {
                width: 30
            },
            key: "2",
            unit: "\u00b0",
            min: -85,
            max: 85,
            step: 1,
            value: t,
            decimals: 1,
            icon: Nn(),
            onValueChanging: (e) => {
                return this.props.changeEntityProperty("data", "skewX", e, true, void 0)
            },
            onValueChanged: (e, t) => {
                return this.props.changeEntityProperty("data", "skewX", e, false, t)
            }
        }), ItemRemoveSelected.separator()))
    }
}
/// var Pn = n(450)/*LinePointItemGroup*/;  // 1 times
class Fn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleControlBreakChanged = (e) => {
            var t = this.props.getChangedEntityProperty("settings", "isControlPointBreak", e);
            if (!e) t = _.map(t, (e) => {
                var t = e.data;
                var n = Geometry.smoothBeziers(t, EntityUtils.isPolygonCurve(e));
                return PropUpdateHelper.setProp(e, "data", n)
            });
            this.props.raiseEntitiesChange(t, false, false)
        }
    }
    render() {
        var e = this.props.entity;
        var t = ItemDefaultSettings.getSettings(e, "isControlPointBreak");
        return React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement("main", null, React.createElement("x-item", {
            title: "Disable Smooth At Joint Points",
            onMouseDown: () => {
                return this.handleControlBreakChanged(!t)
            },
            class: t ? "selected" : "",
            style: {
                width: 24,
                marginRight: -2
            }
        },
        React.createElement("svg", {
            style: {
                transform: "translate(5px,2px)",
                overflow: "visible"
            }
        },
        React.createElement("path", {
            d: "M3,17 L7,5 L 11,17",
            stroke: "gray",
            strokeWidth: "1",
            fill: "none"
        }), React.createElement("path", {
            d: "M0,11 L7,5 L 14,11",
            stroke: "lightgray",
            strokeWidth: "1",
            fill: "none"
        }), React.createElement("circle", {
            cx: "7",
            cy: "5",
            r: "2",
            fill: "green",
            stroke: "none"
        }), React.createElement("circle", {
            cx: "0",
            cy: "11",
            r: "2",
            fill: "#b1afaf",
            stroke: "none"
        }), React.createElement("circle", {
            cx: "14",
            cy: "11",
            r: "2",
            fill: "#b1afaf",
            stroke: "none"
        }))), ItemRemoveSelected.separator()))
    }
}
class Hn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onTailChanged = (e) => {
            this.props.changeEntityProperty(null, "tail", e, void 0, void 0)
        };
        this.onShaftChanged = (e) => {
            this.props.changeEntityProperty(null, "shaft", e, void 0, void 0)
        };
        this.onHeadChanged = (e) => {
            this.props.changeEntityProperty(null, "head", e, void 0, void 0)
        }
    }
    render() {
        var e = this.props.entities;
        if (!_.every(e, (e) => {
            return DiagramIdHelper.isDiagramArrowId(e.id)
        })) return React.createElement("div", null);
        var t = e[0];
        return t ? React.createElement("main", null, React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t.tail, t.shaft, t.head]
        },
        React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement(Vt, {
            part: t.tail || "no",
            onItemSelect: this.onTailChanged
        }), React.createElement(N, {
            part: t.shaft || "-",
            onItemSelect: this.onShaftChanged
        }), React.createElement(Qt, {
            part: t.head || "no",
            onItemSelect: this.onHeadChanged
        }))), ItemRemoveSelected.separator(), React.createElement(an, {
            changeEntityProperty: this.props.changeEntityProperty,
            diagram: this.props.diagram,
            entities: e
        })) : React.createElement("div", null)
    }
}
/// var _n = n(63)/*EntityHelper*/;  // 9 times
class Un extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            var e = this.props;
            var t = e.diagramModel;
            var n = e.selectedIds;
            var r = ShapesDestructer.partitionConnectedEntityByConnections(n, t);
            var a = slicedToArray(r, 3);
            var i = a[0];
            var s = a[1];
            var c = a[2];
            var h = this.findFirstIndexOf(t.shapes, i);
            var u = EntityHelper.removeEntities(t, i);
            var p = t.shapes.filter((e) => {
                return i.indexOf(e.id) >= 0
            });
            var m = this.regenerateShapeIds(p);
            var f = this.generateNewEditorIdsInGroup(t.elements, s, t.connections, c);
            var g = slicedToArray(f, 3);
            var y = g[0];
            var E = g[1];
            var v = g[2].map((e) => {
                return {
                    id: DiagramIdHelper.nextDiagramLinkedEntityId(),
                    linkedId: e
                }
            });
            var S = {
                id: DiagramIdHelper.nextDiagramGroupEntityId(),
                entities: m.concat(v)
            };
            u = _.assignIn({},
            u, {
                shapes: PropUpdateHelper.insert(u.shapes, h, S),
                elements: y,
                connections: E
            });
            this.props.onDiagramModelChanged(u, [S.id])
        }
    }
    generateNewEditorIdsInGroup(e, t, n, r) {
        var a = _.values(e).filter((e) => {
            return t.includes(e.id)
        });
        var i = {};
        var s = _.clone(e);
        a.forEach((e) => {
            var t = DiagramIdHelper.nextIdByPreviousId(e.id);
            i[e.id] = t;
            delete s[e.id];
            s[t] = _.assignIn({},
            e, {
                id: t,
                isInGroup: true
            })
        });
        var l = n.map((e) => {
            var n = r.includes(e.id);
            if (n != (t.includes(e.fromEditorId) || t.includes(e.toEditorId))) throw new Error("there is some problem on grouping editors with connections");
            return n ? _.assignIn({},
            e, {
                fromEditorId: i[e.fromEditorId] || e.fromEditorId,
                toEditorId: i[e.toEditorId] || e.toEditorId,
                isInGroup: true
            }) : e
        });
        return [s, l, _.values(i)]
    }
    findFirstIndexOf(e, t) {
        var n = e.findIndex((e) => {
            return t.indexOf(e.id) >= 0
        });
        return n >= 0 ? n : 0
    }
    render() {
        return React.createElement("button", {
            className: "btn-normal btn-diagram-group",
            style: {
                marginTop: 3
            },
            onClick: this.handleClick
        },
        "Group")
    }
    regenerateShapeIds(e) {
        return e.map((e) => {
            return _.assignIn({},
            e, {
                id: DiagramIdHelper.nextIdByPreviousId(e.id)
            })
        })
    }
}
/// var Wn = n(98)/*EditorAction*/;  // 4 times
/// var Gn = n(130)/*ShapeConnectionHelper*/;  // 5 times
class zn extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            var e = this.props;
            var t = e.diagramModel;
            var n = e.groupEntity;
            var r = this.findGroupIndex(t.shapes, n);
            var a = EntityHelper.removeEntities(t, [n.id]);
            var i = _.partition(n.entities, (e) => {
                return !DiagramIdHelper.isDiagramLinkedId(e.id)
            });
            var s = slicedToArray(i, 2);
            var c = s[0];
            var h = s[1];
            if (a = _.assignIn({},
            a, {
                shapes: PropUpdateHelper.insertMultiple(a.shapes, r, c)
            }), h.length > 0) {
                var p = h.map((e) => {
                    return FindEntityHelper.findOriginalEntityFromLink(e, t.elements)
                }).map((e) => {
                    return _.assignIn({},
                    e, {
                        isInGroup: false
                    })
                });
                var m = ShapesDestructer.findConnectedEditorAndConnections(h.map((e) => {
                    return e.linkedId
                }), t);
                var f = m.filter((e) => {
                    return DiagramIdHelper.isDiagramConnectionId(e)
                });
                a = _.assignIn({},
                a, {
                    elements: EditorAction.changeEditorsInMap(a.elements, p),
                    connections: ShapeConnectionHelper.setConnectionsInGroup(f, t.connections, false)
                });
                var g = _.uniq(c.map((e) => {
                    return e.id
                }).concat(m));
                this.props.onDiagramModelChanged(a, g)
            } else this.props.onDiagramModelChanged(a, c.map((e) => {
                return e.id
            }))
        }
    }
    findGroupIndex(e, t) {
        var n = e.indexOf(t);
        return n >= 0 ? n : 0
    }
    render() {
        return React.createElement("button", {
            className: "btn-normal btn-diagram-ungroup",
            style: {
                marginTop: 3
            },
            onClick: this.handleClick
        },
        "Ungroup")
    }
}
class Kn extends React.Component {
    constructor() {
        super(...arguments);
        this.handleDeleteItem = () => {
            this.props.onDeleteEntities()
        };
        this.handleThicknessChanged = (e) => {
            this.changeEntityStyle("thickness", e)
        };
        this.handleStrokeColorChanged = (e, t) => {
            this.changeEntityStyle("strokeColor", e, t)
        };
        this.handleFillColorChanged = (e, t, n) => {
            if (n) return this.changingEntityStyle("fillColor", e, t);
            this.changeEntityStyle("fillColor", e, t)
        };
        this.raiseEntitiesChange = (e, t, n) => {
            var r = n ? DataChangeModel.getBuilder().withFocusAcquired().build() : null;
            if (t) this.props.onEntitiesChanging(e, r);
            else this.props.onEntitiesChanged(e, r)
        };
        this.getSelectedEntites = () => {
            return this.isGroupSelected() ? this.getGroupSelectedEntities() : this.props.entity ? [this.props.entity] : [this.props.data]
        };
        this.getChangedEntitiesProperty = (e, t, n, r) => {
            return r = r || this.getSelectedEntites(),
            EntityHelper.changePropertyEntities(this.props.data, r, e, t, n)
        };
        this.changeEntityProperty = (e, t, n, r, a) => {
            var i = this.getChangedEntitiesProperty(e, t, n, this.getSelectedEntites());
            this.raiseEntitiesChange(i, r, a)
        };
        this.handleToggleIntersection = (e) => {
            if (e) this.props.onRemoveIntersections(this.getSelectedEntites());
            else this.props.onAddIntersections(this.getSelectedEntites())
        };
        this.handleToggleBlockIntersection = (e) => {
            this.changeEntityProperty("settings", "blockIntersection", !e)
        };
        this.handleGroupEntityRotationChanged = (e, t, n, r) => {
            if (n) this.props.onEntitiesChangingForGroup(e, t, r);
            else this.props.onEntitiesChangedForGroup(e, t, r)
        };
        this.handleNewTypeEntityChanged = (e, t) => {
            var n = PropUpdateHelper.replaceArrayItemBy(this.props.data.shapes, (n) => {
                return n.id != e.id ? null : t
            });
            var r = _.assignIn({},
            this.props.data, {
                shapes: n
            });
            this.props.onDiagramModelChanged(r, [t.id])
        };
        this.handleResetImageSize = (e) => {
            if (e.___size) {
                var t = e.___size.width / e.___size.height;
                var n = Geometry.rectWidth(e.data) / t;
                var r = e.data;
                var a = r.p1;
                var i = r.p2;
                var o = _.assignIn({},
                e, {
                    data: _.assignIn({},
                    e.data, {
                        p2: {
                            x: i.x,
                            y: a.y + n
                        }
                    })
                });
                this.props.onEntitiesChanged([o], null)
            }
        };
        this.handleRequestDiagramElement = () => {
            return this.props.diagramRef
        };
        this.handleDiagramModelChanged = (e) => {
            this.raiseEntitiesChange([e])
        };
        this.getSelectedIds = () => {
            return this.isGroupSelected() ? this.props.groupSelectedIds : [this.props.entity.id]
        };
        this.handleFreeDrawingThicknessChanged = (e) => {
            this.props.onFreeDrawingInfoChanged(_.assignIn({},
            this.props.freeDrawingInfo, {
                thickness: e
            }))
        };
        this.handleFreeDrawingStrokeColorChanged = (e) => {
            this.props.onFreeDrawingInfoChanged(_.assignIn({},
            this.props.freeDrawingInfo, {
                strokeColor: e
            }))
        }
    }
    shouldComponentUpdate(e) {
        var t = e.entity != this.props.entity || e.data.settings != this.props.data.settings || e.subSelection != this.props.subSelection || e.data.intersections != this.props.data.intersections || e.hidden != this.props.hidden || e.freeDrawingInfo != this.props.freeDrawingInfo || e.groupSelectedIds != this.props.groupSelectedIds;
        if (t || !e.groupSelectedIds || e.groupSelectedIds.length <= 0) return t;
        var n = this.getGroupSelectedEntities(e.data);
        var r = this.getGroupSelectedEntities(this.props.data);
        var a = 0;
        for (; a < n.length; a++) if (n[a] != r[a]) return true;
        return false
    }
    changeEntityStyle(e, t, n) {
        this.changeEntityProperty("style", e, t, false, n)
    }
    changingEntityStyle(e, t, n) {
        this.changeEntityProperty("style", e, t, true, n)
    }
    renderBezierCustomDetails(e) {
        return nn((e) => {
            return EntityUtils.isCubicLineArrow(e) && !EntityUtils.isConnection(e) || EntityUtils.isPolygonCurve(e)
        },
        e, this.props.data, (e) => {
            return React.createElement(Fn, {
                entity: e,
                getChangedEntityProperty: this.getChangedEntitiesProperty,
                raiseEntitiesChange: this.raiseEntitiesChange
            })
        })
    }
    renderArrowDetails(e) {
        return React.createElement(Hn, {
            entities: e,
            diagram: this.props.data,
            changeEntityProperty: this.changeEntityProperty
        })
    }
    renderConnectionDetails(e) {
        return React.createElement(on, {
            entities: e,
            data: this.props.data,
            raiseEntitiesChange: this.raiseEntitiesChange,
            getSelectedEntites: this.getSelectedEntites,
            changeEntityProperty: this.changeEntityProperty
        })
    }
    renderControlPointSettings(e) {
        return 1 != e.length ? null : nn((e) => {
            return EntityUtils.isShapeArrow(e) || EntityUtils.isPolygonCurve(e) || EntityUtils.isPolygon(e)
        },
        e, this.props.data, (e) => {
            var t = this.props.subSelection && this.props.subSelection.type === "line-point" ? this.props.subSelection : void 0;
            return React.createElement(LinePointItemGroup, {
                entity: e,
                subSelection: t,
                getSelectedEntites: this.getSelectedEntites,
                onRemoveControlPoint: this.props.onRemoveControlPoint,
                raiseEntitiesChange: this.raiseEntitiesChange,
                onNewTypeEntityChanged: this.handleNewTypeEntityChanged
            })
        })
    }
    renderIntersectionDetails(e) {
        return React.createElement(Kt, {
            entities: e,
            changeEntityProperty: this.changeEntityProperty
        })
    }
    renderStrokeColorPicker(e) {
        return 1 === e.length && DiagramIdHelper.isDiagramEditorId(e[0].id) && !e[0].shape.frameType ? null : rn(["shape-object", "shape-arrow", "connection", "intersection", "text"], "strokeColor", e, this.props.data, (e) => {
            var t = ColorHelper.getEntityStyle(e, "strokeColor");
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t]
            },
            React.createElement("main", null, React.createElement(FillColorIcon, {
                value: t,
                onItemSelect: this.handleStrokeColorChanged
            }), ItemRemoveSelected.separator()))
        })
    }
    renderThicknessPicker(e) {
        return 1 === e.length && DiagramIdHelper.isDiagramEditorId(e[0].id) && !e[0].shape.frameType ? null : rn(["shape-object", "shape-arrow", "connection", "intersection", "text"], "thickness", e, this.props.data, (e) => {
            var t = ColorHelper.getEntityStyle(e, "thickness");
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t]
            },
            React.createElement(L, {
                value: t,
                onItemSelect: this.handleThicknessChanged
            }))
        })
    }
    renderFillColorPicker(e) {
        return 1 === e.length && DiagramIdHelper.isDiagramEditorId(e[0].id) && !e[0].shape.frameType ? null : rn(["shape-object", "intersection", "text", "shape-arrow"], "fillColor", e, this.props.data, (e) => {
            var t = ColorHelper.getEntityStyle(e, "fillColor");
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t]
            },
            React.createElement("main", null, React.createElement(Et, {
                value: t,
                onItemSelect: this.handleFillColorChanged
            }), ItemRemoveSelected.separator()))
        })
    }
    renderRotation(e) {
        if (!e || 1 != e.length) return null;
        if (EntityUtils.isGroupedEntity(e[0])) {
            var t = this.props;
            var n = t.data;
            var r = t.editorRefMap;
            var i = t.scale;
            return React.createElement(Dn, {
                scale: i,
                entity: e[0],
                allEditors: n.elements,
                allEditorRef: r,
                onEntityChanged: this.handleGroupEntityRotationChanged
            })
        }
        return rn(["text"], "rotation", e, this.props.data, (e) => {
            return React.createElement(hn, {
                entity: e,
                changeEntityProperty: this.changeEntityProperty
            })
        })
    }
    renderSkewX(e) {
        if (!e || 1 != e.length) return null;
        if (EntityUtils.isGroupedEntity(e[0])) {
            var t = this.props;
            var n = t.data;
            var r = t.editorRefMap;
            var i = t.scale;
            return React.createElement(kn, {
                scale: i,
                entity: e[0],
                allEditors: n.elements,
                allEditorRef: r,
                onEntityChanged: this.handleGroupEntityRotationChanged
            })
        }
        return rn(["text"], "skewX", e, this.props.data, (e) => {
            return React.createElement(Bn, {
                entity: e,
                changeEntityProperty: this.changeEntityProperty
            })
        })
    }
    renderIntersecitonIcon(e) {
        return rn(["shape-object", "shape-arrow"], "intersection", e, this.props.data, (e) => {
            return React.createElement(Gt, {
                handleToggleBlockIntersection: this.handleToggleBlockIntersection,
                handleToggleIntersection: this.handleToggleIntersection,
                entity: e,
                intersections: this.props.data.intersections
            })
        })
    }
    renderRemove(e) {
        if (!_.every(e, (e) => {
            return DiagramIdHelper.isDiagramIntersectionId(e.id)
        })) return React.createElement(ToolbarChangeHandleWrapper, null, ItemRemoveSelected.getRemoveItem(this.handleDeleteItem))
    }
    isGroupSelected() {
        return this.props.groupSelectedIds && this.props.groupSelectedIds.length > 0
    }
    getGroupSelectedEntities() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.data;
        return e.shapes.filter((e) => {
            return this.props.groupSelectedIds.indexOf(e.id) >= 0
        }).concat(e.connections.filter((e) => {
            return this.props.groupSelectedIds.indexOf(e.id) >= 0
        })).concat(_.values(e.elements).filter((e) => {
            return this.props.groupSelectedIds.indexOf(e.id) >= 0
        }))
    }
    isAllTheSameCompositeEntityType(e) {
        var t = e[0];
        return !_.some(e, (e) => {
            return !DiagramIdHelper.isDiagramCompositeShapeId(e.id) || (e.type != t.type || void 0)
        })
    }
    renderCompositeCustomSettings(e) {
        if (this.isAllTheSameCompositeEntityType(e)) {
            var t = e[0];
            var n = ShapeLoader.getShapeManagement(t).getSettingsComponent();
            return React.createElement(n, {
                entity: t,
                forManyEntities: e.length > 1,
                onEntityPropertyChanging: (e, t, n, r) => {
                    this.changeEntityProperty(t, n, r, true, false)
                },
                onEntityPropertyChanged: (e, t, n, r, a) => {
                    this.changeEntityProperty(t, n, r, false, a)
                },
                onNewTypeEntityChanged: this.handleNewTypeEntityChanged
            })
        }
    }
    renderChangeImageButton(e) {
        if (1 === e.length) {
            var t = e[0];
            if (DiagramIdHelper.isDiagramCompositeShapeId(t.id) && "image" == t.type) return React.createElement("main", null, React.createElement("button", {
                className: "btn-normal",
                style: {
                    marginTop: 3,
                    marginLeft: 5,
                    marginRight: 5,
                    width: 120
                },
                onClick: () => {
                    return this.props.requestChangeImage(e[0])
                }
            },
            "Change Image"), React.createElement("button", {
                className: "btn-normal",
                style: {
                    marginTop: 3,
                    marginLeft: 5,
                    marginRight: 5,
                    width: 150
                },
                onClick: () => {
                    return this.handleResetImageSize(e[0])
                }
            },
            "Reset Size Ratio"), ItemRemoveSelected.separator())
        }
    }
    renderStrokeType(e) {
        return rn(["shape-object"], "strokeType", e, this.props.data, (e) => {
            var t = ColorHelper.getEntityStyle(e, "strokeType");
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t]
            },
            React.createElement("main", null, React.createElement(B, {
                part: t,
                onItemSelect: (e) => {
                    return this.changeEntityProperty("style", "strokeType", e)
                }
            }), ItemRemoveSelected.separator()))
        })
    }
    renderFrameStrokeType(e) {
        return rn(["text"], null, e, this.props.data, (e) => {
            if (!e.shape.frameType) return null;
            var t = ColorHelper.getEditorStyle(e, "strokeType");
            return React.createElement(ToolbarChangeHandleWrapper, {
                watch: [t]
            },
            React.createElement("main", null, React.createElement(Ne, {
                title: "Frame Stroke Type",
                part: t,
                onItemSelect: (e) => {
                    return this.changeEntityProperty("style", "strokeType", e)
                }
            }), ItemRemoveSelected.separator()))
        })
    }
    renderFrameType(e) {
        return rn(["text"], null, e, this.props.data, (e) => {
            return React.createElement(zt, {
                entity: e,
                changeEntityProperty: this.changeEntityProperty
            })
        })
    }
    renderRoundedCorner(e) {
        return nn((e) => {
            return DiagramIdHelper.isDiagramEditorId(e.id) && "rectangle" == e.shape.frameType || EntityUtils.isRectangle(e) || EntityUtils.isSquare(e)
        },
        e, this.props.data, (e) => {
            return React.createElement(cn, {
                entity: e,
                changeEntityProperty: this.changeEntityProperty
            })
        })
    }
    renderEditorSettings(e) {
        return rn(["text"], null, e, this.props.data, (e) => {
            return React.createElement(ln, {
                entity: e,
                changeEntityProperty: this.changeEntityProperty
            })
        })
    }
    renderDiagramDetail() {
        return React.createElement(Ft, {
            data: this.props.data,
            fixedContextHandler: this.props.fixedContextHandler,
            onModelChanged: this.handleDiagramModelChanged,
            requestDiagramElement: this.handleRequestDiagramElement,
            requestTikzExport: this.props.requestTikzExport,
            changeEntityProperty: this.changeEntityProperty
        })
    }
    renderArrangementAction(e) {
        return nn((e) => {
            return DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(e.id) || DiagramIdHelper.isDiagramGroupId(e.id)
        },
        e, this.props.data, () => {
            return React.createElement(Mt, {
                data: this.props.data,
                getSelectedIds: this.getSelectedIds,
                onShapesOrderChanged: this.props.onShapesOrderChanged
            })
        },
        true)
    }
    renderGroupSetting() {
        var e = this.getSelectedIds();
        return e.length > 1 ? [React.createElement(Un, {
            key: "group",
            diagramModel: this.props.data,
            selectedIds: e,
            onDiagramModelChanged: this.props.onDiagramModelChanged
        }), ItemRemoveSelected.separator1()] : 1 === e.length && DiagramIdHelper.isDiagramGroupId(e[0]) ? [React.createElement(zn, {
            key: "group2",
            diagramModel: this.props.data,
            groupEntity: this.getSelectedEntites()[0],
            onDiagramModelChanged: this.props.onDiagramModelChanged
        }), ItemRemoveSelected.separator1()] : void 0
    }
    renderFreeDrawing() {
        var e = this.props.freeDrawingInfo;
        var t = e.thickness;
        var n = e.strokeColor;
        return React.createElement("x-inside", null, React.createElement(ToolbarChangeHandleWrapper, {
            watch: [t]
        },
        React.createElement(L, {
            value: t,
            onItemSelect: this.handleFreeDrawingThicknessChanged
        })), React.createElement(ToolbarChangeHandleWrapper, {
            watch: [n]
        },
        React.createElement("main", null, React.createElement(FillColorIcon, {
            value: n,
            onItemSelect: this.handleFreeDrawingStrokeColorChanged
        }), ItemRemoveSelected.separator())))
    }
    renderDetails() {
        if (this.props.freeDrawingInfo) return this.renderFreeDrawing();
        var e;
        var t = true;
        return this.props.entity ? (e = [this.props.entity], t = false) : this.isGroupSelected() && (t = 0 == (e = this.getGroupSelectedEntities()).length),
        t ? React.createElement("x-inside", null, this.renderDiagramDetail()) : React.createElement("x-inside", null, this.renderArrowDetails(e), this.renderConnectionDetails(e), this.renderIntersectionDetails(e), this.renderBezierCustomDetails(e), this.renderFrameType(e), this.renderRoundedCorner(e), this.renderFrameStrokeType(e), this.renderThicknessPicker(e), this.renderStrokeColorPicker(e), this.renderFillColorPicker(e), this.renderStrokeType(e), this.renderControlPointSettings(e), this.renderRotation(e), this.renderSkewX(e), this.renderChangeImageButton(e), this.renderCompositeCustomSettings(e), this.renderEditorSettings(e), this.renderArrangementAction(e), this.renderGroupSetting(), this.renderIntersecitonIcon(e), this.renderRemove(e))
    }
    renderDisableLayer(e) {
        if (e) return React.createElement("disabled-layer", null)
    }
    render() {
        return this.props.hidden ? React.createElement("div", null) : React.createElement("diagram-settings", null, this.renderDetails(), this.renderDisableLayer(this.props.isDisabled))
    }
}
class Vn extends React.Component {
    constructor() {
        super(...arguments);
        this.randomId = ("G" + Math.random()).substr(2)
    }
    shouldComponentUpdate(e) {
        return e.data.settings != this.props.data.settings || e.selected != this.props.selected
    }
    render() {
        var e = ItemDefaultSettings.getSettings(this.props.data, "grid");
        var t = ItemDefaultSettings.getSettings(this.props.data, "onlyShowGridOnEditing");
        var n = ItemDefaultSettings.getSettings(this.props.data, "gridSize");
        var r = null;
        return !e || t && !this.props.selected || (r = React.createElement("g", null, React.createElement("defs", null, React.createElement("pattern", {
            id: this.randomId,
            width: n,
            height: n,
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M ".concat(n, " 0 L 0 0 0 ").concat(n),
            fill: "none",
            stroke: "lightgray",
            strokeWidth: "0.5"
        }))), React.createElement("rect", {
            width: "100%",
            height: "100%",
            fill: "url(#".concat(this.randomId, ")"),
            stroke: "lightgray",
            strokeWidth: "0.5"
        }))),
        React.createElement("svg", null, r)
    }
}
/// var jn = n(99)/*TemporaryShapeCreator*/;  // 8 times
/// var qn = n(189)/*ShapeIntersectHelper*/;  // 2 times
/// var Qn = n(139)/*ArrowRenderer*/;  // 8 times
class Zn extends React.Component {
    constructor(e) {
        super(e);
        this.handleContainerMouseMove = this.handleContainerMouseMove.bind(this);
        this.handleContainerMouseUp = this.handleContainerMouseUp.bind(this);
        this.state = {
            fromPos: null,
            toPos: null,
            fromEditor: null,
            toEditor: null,
            foundRect: null
        }
    }
    setInfo(e, t) {
        this.baseElement = e;
        this.container = t
    }
    startAt(e, t) {
        jQuery(this.container).on("mousemove", this.handleContainerMouseMove);
        jQuery(this.container).on("mouseup", this.handleContainerMouseUp);
        if (Global.isMobileOrTablet()) {
            jQuery(this.container).on("touchmove", this.handleContainerMouseMove);
            jQuery(this.container).on("touchend", this.handleContainerMouseUp);
            jQuery(this.container).on("touchcancel", this.handleContainerMouseUp)
        }
        this.setState({
            fromPos: Geometry.scalePoint(e, 1 / this.props.scale),
            toPos: null,
            fromEditor: t
        })
    }
    handleContainerMouseMove(e) {
        e.originalEvent.handledMove = true;
        var t = DOMHelper.getElementRect(this.baseElement);
        var n = EventHelper.getLeftTopFromEvent(e);
        var r = {
            x: n.left - t.left,
            y: n.top - t.top
        };
        var a = EventHelper.getTargetOnMoveEvent(e);
        if ("COVER-LAYER" == a.tagName) {
            var i = a.previousElementSibling.reactInstance.getModel().id;
            var o = this.props.diagramModel.elements[i];
            if (o.isInGroup) this.setState({
                toPos: Geometry.scalePoint(r, 1 / this.props.scale),
                toEditor: null,
                foundRect: null
            });
            else if (o.id != this.state.fromEditor.id) {
                var s = DOMHelper.findRectElementToRect(a.previousElementSibling, t);
                this.setState({
                    toPos: Geometry.scalePoint(r, 1 / this.props.scale),
                    toEditor: o,
                    foundRect: s
                })
            } else this.setState({
                toPos: Geometry.scalePoint(r, 1 / this.props.scale)
            })
        } else this.setState({
            toPos: Geometry.scalePoint(r, 1 / this.props.scale),
            toEditor: null,
            foundRect: null
        })
    }
    handleContainerMouseUp() {
        jQuery(this.container).off("mousemove", this.handleContainerMouseMove);
        jQuery(this.container).off("mouseup", this.handleContainerMouseUp);
        if (Global.isMobileOrTablet()) {
            jQuery(this.container).off("touchmove", this.handleContainerMouseMove);
            jQuery(this.container).off("touchend", this.handleContainerMouseUp);
            jQuery(this.container).off("touchcancel", this.handleContainerMouseUp)
        }
        if (this.state.toEditor) this.props.addConnection(this.createNewConnection(this.state.fromEditor.id, this.state.toEditor.id));
        this.setState({
            fromPos: null,
            toPos: null,
            fromEditor: null,
            foundRect: null
        })
    }
    createNewConnection(e, t) {
        return {
            id: DiagramIdHelper.nextDiagramConnectionId(),
            fromEditorId: e,
            toEditorId: t,
            head: ">",
            shaft: "-",
            tail: "no"
        }
    }
    getStartPoint() {
        var e = this.state.fromEditor;
        var t = this.props.refMap[e.id].editor;
        var n = TemporaryShapeCreator.getTextRectInfo(t, e);
        var r = TemporaryShapeCreator.getFrameShape(e, n);
        var a = ShapeConnectionHelper.getTempShape(e.shape.frameType, r);
        var i = e.shape.data.p;
        var s = {
            id: DiagramIdHelper.nextTemporaryEntity(),
            breakDownInfo: {
                data: [{
                    p1: i,
                    p2: this.state.toPos
                }]
            }
        };
        var l = ShapeIntersectHelper.getIntersects(s, a);
        return !l || l.length <= 0 ? null : l[0]
    }
    render() {
        if (!this.state.fromPos || !this.state.toPos) return null;
        var e = this.getStartPoint();
        if (null == e) return null;
        var t = e;
        var n = this.state.toPos;
        return React.createElement("g", {
            pointerEvents: "none"
        },
        React.createElement(ArrowRendererC, {
            type: "straight",
            thickness: 1,
            tail: "no",
            head: ">",
            shaft: "-",
            data: [t, n],
            className: "connection",
            isSelected: false,
            isGroupSelected: false,
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: {},
            htmlStyleInfo: {
                style: {
                    stroke: "green"
                }
            }
        }))
    }
}
var Xn = new class {
    getEntityHtmlStyleInfo(e, t) {
        switch (EntityUtils.getEntityType(e)) {
        case "connection":
            case "shape-arrow":
            return ColorHelper.getReactStyleInfo(e.style, ["strokeColor", "thickness", "fillColor", "lineJoin", "lineCap"], t);
        case "shape-object":
            return ColorHelper.getReactStyleInfo(e.style, ["strokeColor", "thickness", "fillColor", "strokeType", "lineJoin", "lineCap"], t);
        case "intersection":
            return ColorHelper.getReactStyleInfo(e.style, ["strokeColor", "thickness", "fillColor", "strokeType"], t);
        case "shape-composite":
            return ColorHelper.getReactStyleInfo(e.style, ShapeLoader.getShapeManagement(e).styleSupports(e) || [], t);
        case "text":
            return ColorHelper.getReactStyleInfo(e.shape.style, ["strokeColor", "thickness", "fillColor", "strokeType"], t)
        }
        return {
            style: {}
        }
    }
};
class Jn extends React.Component {
    shouldComponentUpdate(e) {
        var t = this.props;
        return !e.isEditorEditing && !t.isEditorEditing && (e.singleSelectedId != t.singleSelectedId || e.editorChangedHash != t.editorChangedHash || e.scale != t.scale || e.data.elements != t.data.elements)
    }
    getEditor(e) {
        return this.props.data.elements[e]
    }
    renderConnectionPoints() {
        var e = this.props.singleSelectedId;
        if (e) {
            var t = this.props.refMap[e];
            if (!t) return null;
            var n = this.props.data.elements[e];
            var r = TemporaryShapeCreator.getTextRectInfo(t.editor.parentNode, n);
            var i = TemporaryShapeCreator.getFrameShape(n, r);
            var o = i.outsideShape || i.shape;
            switch (n.shape.frameType) {
            case "circle":
                var s = o.cp;
                var l = o.r;
                var c = {
                    left: {
                        x: s.x - l,
                        y: s.y
                    },
                    top: {
                        x: s.x,
                        y: s.y - l
                    },
                    right: {
                        x: s.x + l,
                        y: s.y
                    },
                    bottom: {
                        x: s.x,
                        y: s.y + l
                    }
                };
                break;
            case "ellipse":
                s = o.cp;
                var d = o.rx;
                var h = o.ry;
                c = {
                    left: {
                        x: s.x - d,
                        y: s.y
                    },
                    top: {
                        x: s.x,
                        y: s.y - h
                    },
                    right: {
                        x: s.x + d,
                        y: s.y
                    },
                    bottom: {
                        x: s.x,
                        y: s.y + h
                    }
                };
                break;
            default:
                var u = o.rect;
                s = {
                    x: u.left + u.width / 2,
                    y: u.top + u.height / 2
                };
                c = {
                    left: {
                        x: u.left,
                        y: s.y
                    },
                    top: {
                        x: s.x,
                        y: u.top
                    },
                    right: {
                        x: u.left + u.width,
                        y: s.y
                    },
                    bottom: {
                        x: s.x,
                        y: u.top + u.height
                    }
                }
            }
            return React.createElement($n, {
                hide: this.props.isEditorEditing,
                scale: this.props.scale,
                model: n,
                points: c,
                onConnectionPointMouseDown: this.props.onConnectionPointMouseDown
            })
        }
    }
    getEditorRefs() {
        return _.filter(_.values(this.props.refMap), (e) => {
            return DiagramIdHelper.isDiagramEditorId(e.getData().id)
        })
    }
    getDefaultFillBorderColor() {
        return this.props.fixedContextHandler.getDefaultBorderColor()
    }
    renderFrameShape(e, t) {
        var n = e.shape.frameType;
        if (!n) return null;
        var r = Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor());
        var i = r.style;
        var o = r.defs;
        var s = TemporaryShapeCreator.getTextRectInfo(t, e);
        var l = TemporaryShapeCreator.getFrameShape(e, s);
        switch (e.___shapeInfo = l, n) {
        case "circle":
            var c = l.shape;
            var d = c.cp;
            var h = c.r;
            var u = React.createElement("circle", {
                key: e.id,
                cx: d.x,
                cy: d.y,
                r: h,
                style: i
            });
            if (l.outsideShape) {
                var p = l.outsideShape;
                d = p.cp;
                h = p.r;
                var m = React.createElement("circle", {
                    cx: d.x,
                    cy: d.y,
                    r: h,
                    style: i
                });
                return React.createElement("g", {
                    key: e.id
                },
                o, m, u)
            }
            return React.createElement("g", {
                key: e.id
            },
            o, u);
        case "rectangle":
            var f = l.shape.rect;
            var g = ItemDefaultSettings.getTextSetting(e, "cornerRadius");
            var y = React.createElement("rect", {
                key: e.id,
                rx: g,
                ry: g,
                x: f.left,
                y: f.top,
                width: f.width,
                height: f.height,
                style: i
            });
            if (l.outsideShape) {
                f = l.outsideShape.rect;
                var A = React.createElement("rect", {
                    rx: g,
                    ry: g,
                    x: f.left,
                    y: f.top,
                    width: f.width,
                    height: f.height,
                    style: i
                });
                return React.createElement("g", {
                    key: e.id
                },
                o, A, y)
            }
            return React.createElement("g", {
                key: e.id
            },
            o, y);
        case "ellipse":
            var E = l.shape;
            var v = E.cp;
            var S = E.rx;
            var C = E.ry;
            var x = React.createElement("ellipse", {
                key: e.id,
                cx: v.x,
                cy: v.y,
                rx: S,
                ry: C,
                style: i
            });
            if (l.outsideShape) {
                var I = l.outsideShape;
                v = I.cp;
                S = I.rx;
                C = I.ry;
                var T = React.createElement("ellipse", {
                    cx: v.x,
                    cy: v.y,
                    rx: S,
                    ry: C,
                    style: i
                });
                return React.createElement("g", {
                    key: e.id
                },
                o, T, x)
            }
            return React.createElement("g", {
                key: e.id
            },
            o, x)
        }
    }
    renderRects() {
        return _.map(this.getEditorRefs(), (e) => {
            var t = e.editor.parentNode;
            var n = jQuery(t.previousSibling).hasClass("shadow-box") ? t.previousSibling : t;
            var r = this.props.data.elements[e.getData().id];
            if (!r) return;
            return this.renderFrameShape(r, n)
        })
    }
    render() {
        return this.props.refMap ? React.createElement("g", null, this.renderRects(), this.renderConnectionPoints()) : React.createElement("g", null)
    }
}
class $n extends React.Component {
    render() {
        if (this.props.hide) return React.createElement("g", null);
        var e = this.props;
        var t = e.model;
        var n = e.points;
        return React.createElement("g", null, this.renderConnectionPoint(t, "left", n.left), this.renderConnectionPoint(t, "right", n.right), this.renderConnectionPoint(t, "bottom", n.bottom))
    }
    renderConnectionPoint(e, t, n) {
        var r = {
            left: n.x - 5,
            top: n.y - 5,
            width: 10,
            height: 10
        };
        var i = "";
        switch (t) {
        case "left":
            r.left -= 5;
            i = "M 249.43125 500.5 L 0.5 251.00371 L 250.39666 1.468574 L 388.85053 1.525764 L 197.54097 194.51019 L 594.16634 194.58168 L 594.0434 305.57099 L 194.93053 305.59147 L 388.29695 500.5 L 249.43125 500.5z";
            break;
        case "top":
            r.top -= 5;
            i = "M 0.5,249.76491 L 249.99629,0.8336513 L 499.53144,250.73032 L 499.47425,389.18419 L 306.48981,197.87462 L 306.41832,594.5 L 195.42902,594.37706 L 195.40854,195.26418 L 0.5,388.63061 L 0.5,249.76491 z ";
            break;
        case "right":
            r.left += 5;
            i = "M 345.23509 500.5 L 594.16634 251.00371 L 344.26968 1.468574 L 205.81581 1.525764 L 397.12537 194.51019 L 0.49999607 194.58168 L 0.62293607 305.57099 L 399.73581 305.59147 L 206.36939 500.5 L 345.23509 500.5 z ";
            break;
        case "bottom":
            r.top += 5;
            i = "M 499.53144,345.56874 L 250.03515,594.5 L 0.5,344.60333 L 0.55719,206.14946 L 193.54163,397.45903 L 193.61312,0.8336513 L 304.60242,0.9565913 L 304.6229,400.06947 L 499.53144,206.70304 L 499.53144,345.56874 z "
        }
        var o = 1;
        if (Global.isMobileOrTablet()) o = o * 1.4;
        var s = "translate(".concat(r.left, ",").concat(r.top, ") scale(").concat(o, ")");
        return React.createElement("g", {
            key: t,
            className: "connection-point",
            transform: s
        },
        React.createElement("rect", {
            className: "frame-rect",
            onMouseDown: () => {
                this.props.onConnectionPointMouseDown(e)
            },
            onTouchStart: () => {
                this.props.onConnectionPointMouseDown(e)
            },
            width: r.width,
            height: r.height,
            strokeWidth: "1",
            stroke: "none",
            fill: "transparent"
        }), React.createElement("g", {
            transform: "scale(0.015)",
            pointerEvents: "none"
        },
        React.createElement("path", {
            style: {
                fontSize: 12,
                fill: "purple"
            },
            d: i
        })))
    }
}
class er extends React.Component {
    getConnections() {
        return this.props.data.connections
    }
    shouldComponentUpdate(e) {
        var t = this.props;
        return !e.isEditorEditing && !t.isEditorEditing && (e.singleSelectedId != t.singleSelectedId || e.editorChangedHash != t.editorChangedHash || e.groupSelectedIds != t.groupSelectedIds || e.scale != t.scale || e.data.connections != t.data.connections)
    }
    renderConnections() {
        var e = this.getConnections();
        return _.map(e, (e) => {
            return this.renderConnection(e)
        })
    }
    selectConnection(e, t) {
        if (t.isInGroup) {
            var n = FindEntityHelper.findGroupedEnityFromConnection(t, this.props.data.shapes);
            if (n) this.props.onMouseDown(e, n)
        } else this.props.onMouseDown(e, t)
    }
    renderLine(e, t) {
        return e.type ? "quadratic" == e.type ? this.renderQuadraticLine(e, t) : this.renderCubicLine(e, t) : this.renderStraightLine(e, t)
    }
    isSelectedConnectionId(e) {
        return this.props.singleSelectedId === e
    }
    renderConnection(e) {
        if (!this.props.refMap[e.fromEditorId] || !this.props.refMap[e.toEditorId]) return null;
        var t = this.props;
        var n = t.data;
        var r = t.refMap;
        var i = ShapeConnectionHelper.getIdRectMap([e], {
            editorRef: r,
            editors: n.elements
        });
        var o = ShapeConnectionHelper.getCalculatedPosition(e, i, n.elements);
        if (e.___path = o, !o) return null;
        var s = ItemDefaultSettings.getSettings(e, "perpendicularDistance");
        return React.createElement("g", {
            className: "connection-group",
            key: e.fromEditorId + e.toEditorId + "_" + s
        },
        this.renderLine(e, o))
    }
    getDefaultFillBorderColor() {
        return this.props.fixedContextHandler.getDefaultBorderColor()
    }
    renderQuadraticLine(e, t) {
        var n = ColorHelper.getEntityStyle(e, "thickness");
        return React.createElement(ArrowRendererC, {
            type: "quadratic",
            tail: e.tail,
            head: e.head,
            shaft: e.shaft,
            thickness: n,
            data: [t],
            onMouseDown: (t) => {
                return this.selectConnection(t, e)
            },
            className: "connection",
            isSelected: this.isSelectedConnectionId(e.id),
            isGroupSelected: this.props.selectionCarrier.isInGroupSelected(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: e.settings,
            htmlStyleInfo: Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
        })
    }
    renderCubicLine(e, t) {
        var n = ColorHelper.getEntityStyle(e, "thickness");
        return React.createElement(ArrowRendererC, {
            type: "cubic",
            tail: e.tail,
            head: e.head,
            shaft: e.shaft,
            thickness: n,
            data: [t],
            onMouseDown: (t) => {
                return this.selectConnection(t, e)
            },
            className: "connection",
            isSelected: this.isSelectedConnectionId(e.id),
            isGroupSelected: this.props.selectionCarrier.isInGroupSelected(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: e.settings,
            htmlStyleInfo: Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
        })
    }
    renderStraightLine(e, t) {
        var n = ColorHelper.getEntityStyle(e, "thickness");
        return React.createElement(ArrowRendererC, {
            type: "straight",
            tail: e.tail,
            head: e.head,
            shaft: e.shaft,
            thickness: n,
            data: [t.p1, t.p2],
            onMouseDown: (t) => {
                return this.selectConnection(t, e)
            },
            className: "connection",
            isSelected: this.isSelectedConnectionId(e.id),
            isGroupSelected: this.isSelectedConnectionId(e.id) || this.props.selectionCarrier.isInGroupSelected(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: e.settings,
            htmlStyleInfo: Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
        })
    }
    render() {
        return this.props.refMap ? React.createElement("g", null, this.renderConnections()) : null
    }
}
class tr {
    constructor(e) {
        this.target = e
    }
    getCacheableData() {
        return this.state.data || this.props.data
    }
    get state() {
        return this.target.state
    }
    get props() {
        return this.target.props
    }
    editor() {
        var e = this.editorId();
        return null == e ? null : this.getCacheableData().elements[e]
    }
    editorId() {
        var e = this.singleSelectedEntityId();
        return e ? DiagramIdHelper.isDiagramEditorId(e) ? e : void 0 : null
    }
    connection() {
        var e = this.connectionId();
        if (null == e) return null;
        var t = this.getCacheableData().connections || [];
        return _.find(t, (t) => {
            return t.id === e
        })
    }
    connectionId() {
        var e = this.singleSelectedEntityId();
        return e ? DiagramIdHelper.isDiagramConnectionId(e) ? e : void 0 : null
    }
    shapeId() {
        var e = this.singleSelectedEntityId();
        return e ? DiagramIdHelper.isDiagramArrowId(e) || DiagramIdHelper.isDiagramShapeId(e) || DiagramIdHelper.isDiagramCompositeShapeId(e) || DiagramIdHelper.isDiagramGroupId(e) ? e : void 0 : null
    }
    shape() {
        var e = this.shapeId();
        if (null == e) return null;
        var t = this.getCacheableData().shapes || [];
        return _.find(t, (t) => {
            return t.id === e
        })
    }
    intersectionId() {
        var e = this.singleSelectedEntityId();
        return e ? DiagramIdHelper.isDiagramIntersectionId(e) ? e : void 0 : null
    }
    intersection() {
        if (this.intersectionId()) return this.getCacheableData().intersections
    }
    singleSelectedEntityId() {
        var e = this.getPropSelectedIdsOrEmpty();
        if (1 === e.length) return e[0]
    }
    entity() {
        var e = this.singleSelectedEntityId();
        return e ? DiagramIdHelper.isDiagramEditorId(e) ? this.editor() : DiagramIdHelper.isDiagramConnectionId(e) ? this.connection() : DiagramIdHelper.isDiagramArrowId(e) ? this.shape() : DiagramIdHelper.isDiagramShapeId(e) ? this.shape() : DiagramIdHelper.isDiagramIntersectionId(e) ? this.getCacheableData().intersections : DiagramIdHelper.isDiagramCompositeShapeId(e) ? this.shape() : DiagramIdHelper.isDiagramGroupId(e) ? this.shape() : void 0 : null
    }
    groupIds() {
        var e = this.getPropSelectedIdsOrEmpty();
        if (e.length > 1) return e
    }
    groupEntities() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.data;
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = this.groupIds();
        return n ? (t && (n = n.filter((e) => {
            return !DiagramIdHelper.isDiagramIntersectionId(e)
        })), EntityUtils.getEntities(e, n)) : null
    }
    getPropSelectedIdsOrEmpty() {
        return this.props.selected && this.props.selected.controlled && this.props.selected.controlSelectedInfo && this.props.selected.controlSelectedInfo.selectedIds || []
    }
    entities() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.data;
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = this.getPropSelectedIdsOrEmpty();
        return n ? (t && (n = n.filter((e) => {
            return !DiagramIdHelper.isDiagramIntersectionId(e)
        })), EntityUtils.getEntities(e, n)) : null
    }
    isSingleSelectedEditor() {
        var e = this.singleSelectedEntityId();
        return e && DiagramIdHelper.isDiagramEditorId(e)
    }
    selectDiagram() {
        if (! (this.props.selected && this.props.selected.controlled && !this.props.selected.selected && !this.props.selected.controlSelectedInfo)) this.props.onSelectedChanged({
            controlled: true
        })
    }
    getSubSelection() {
        if (this.props.selected && this.props.selected.controlled && this.props.selected.controlSelectedInfo) return this.props.selected.controlSelectedInfo.subSelection
    }
    setSubSelection(e) {
        if (this.props.selected) this.props.onSelectedChanged(_.assignIn({},
        this.props.selected, {
            controlSelectedInfo: _.assignIn({},
            this.props.selected.controlSelectedInfo, {
                subSelection: e
            })
        }))
    }
    select(e, t) {
        if (t = t || {},
        this.props.selected && this.props.selected.controlSelectedInfo) {
            var n = this.props.selected.controlSelectedInfo.selectedIds;
            if (n.indexOf(e) >= 0) return t.shiftKey && this.props.onSelectedChanged({
                controlled: true,
                controlSelectedInfo: {
                    selectedIds: _.filter(n, (t) => {
                        return t != e
                    })
                }
            }),
            void(this.props.selected.controlSelectedInfo.subSelection && this.props.onSelectedChanged({
                controlled: true,
                controlSelectedInfo: {
                    selectedIds: [e]
                }
            }));
            if (this.isAllIntersections(n) == this.isAllIntersections([e])) {
                var r = [e];
                if (t.shiftKey) r = n.concat([e]);
                this.props.onSelectedChanged({
                    controlled: true,
                    controlSelectedInfo: {
                        selectedIds: r
                    }
                })
            } else this.props.onSelectedChanged({
                controlled: true,
                controlSelectedInfo: {
                    selectedIds: [e]
                }
            })
        } else this.props.onSelectedChanged({
            controlled: true,
            controlSelectedInfo: {
                selectedIds: [e]
            }
        })
    }
    isAllIntersections(e) {
        return e.every((e) => {
            return DiagramIdHelper.isDiagramIntersectionId(e)
        })
    }
    selectGroup(e) {
        this.props.onSelectedChanged({
            controlled: true,
            controlSelectedInfo: {
                selectedIds: e
            }
        })
    }
    selectConnection(e, t) {
        this.select(e, t)
    }
    selectEditor(e, t) {
        this.select(e, t)
    }
    selectShape(e, t) {
        this.select(e, t)
    }
    selectIntersection(e, t) {
        this.select(e, t)
    }
}
class nr {
    constructor(e) {
        this.target = e;
        this.isDiagramMounted = false;
        this.queue = [];
        this.handleEditorFramesRef = (e) => {
            this.target.frames = e
        };
        this.handleConnectionsRef = (e) => {
            if (null != e) this.target.connections = e
        };
        this.handleDiagramControlsRef = (e) => {
            this.target.diagramControls = e
        };
        this.handleDiagramControlsDrawingRef = (e) => {
            this.target.diagramControlsDrawing = e
        };
        this.handleEditorsRef = (e) => {
            this.target.editors = e
        };
        this.handleDiagramBarRef = (e) => {
            if (null != e) this.call(() => {
                e.setInfo(this.target.compositeBlock, this.target.mathDiagram)
            })
        };
        this.handleConnectionFinderRef = (e) => {
            this.target.connectionFinder = e;
            if (null != e) this.call(() => {
                this.target.connectionFinder.setInfo(this.target.zoomRef, this.target.mathDiagram)
            })
        };
        this.handleRectangleSelectionLayerRef = (e) => {
            this.target.selectionLayer = e;
            if (null != e) this.call(() => {
                this.target.selectionLayer.setInfo(this.target.zoomRef)
            })
        };
        this.handleDiagramShapesRef = (e) => {
            this.target.diagramShapes = e
        };
        this.handleDiagramRef = (e) => {
            this.target.mathDiagram = e;
            if (null != e) this.call(() => {
                this.target.movingHandler.setBaseElement(this.target.zoomRef);
                this.target.movingHandler.setContainer(this.target.mathDiagram)
            })
        }
    }
    call(e) {
        if (this.isDiagramMounted) return e();
        this.queue.push(e)
    }
    notifyDiagramMounted() {
        this.isDiagramMounted = true;
        this.queue.forEach((e) => {
            return e()
        });
        this.queue = []
    }
    getCachedRefMethod(e, t) {
        return this.target.cacheRefMethod[e] || (this.target.cacheRefMethod[e] = t.bind(this)),
        this.target.cacheRefMethod[e]
    }
}
class rr extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onMoving = (e) => {
            var t = this.props.entity;
            return this.rotateEditor(t, e)
        }
    }
    render() {
        var e = this.props;
        var t = e.scale;
        var n = e.entity;
        var r = e.element;
        var i = EditorAction.getRotationPoints(n, r, t).p;
        return React.createElement(In, {
            getRootElement: this.props.getRootElement,
            point: i,
            scale: t,
            onPointMoved: this.props.onEntityMoved,
            onPointMoving: this.onMoving
        })
    }
    rotateEditor(e, t) {
        var n = e.shape.data.p;
        var r = {
            x: n.x,
            y: n.y - 10
        };
        var a = Geometry.angleFrom3Points360(r, t, n);
        var i = _.assignIn({},
        e, {
            shape: _.assignIn({},
            e.shape, {
                data: _.assignIn({},
                e.shape.data, {
                    rotation: a
                })
            })
        });
        this.props.onEntityMoving(i)
    }
}
class ar extends React.PureComponent {
    constructor(e) {
        super(e);
        this.onMoving = (e, t, n) => {
            var r = this.props.element.clientHeight;
            var a = this.props.element.clientWidth;
            var i = n.customData.entity;
            var o = i.shape.data;
            var s = o.p;
            var l = o.rotation;
            var c = void 0 === l ? 0 : l;
            var h = {
                x: s.x - a / 2 - 5,
                y: s.y + r / 2
            };
            var u = Geometry.pointRotate(t, s, -c);
            u = {
                x: u.x,
                y: u.y
            };
            var p = SkewHelper.skewXAngleFromDisplacementCp(s, h, u);
            var m = _.assignIn({},
            i, {
                shape: _.assignIn({},
                i.shape, {
                    data: _.assignIn({},
                    i.shape.data, {
                        skewX: p
                    })
                })
            });
            this.props.onEntityMoving(m)
        };
        this.handleSkewControlPointStart = (e) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {
                entity: this.props.entity
            },
            RotationControlPointHelper.getReverseScale(this.props.scale))
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onEntityMoved()
        }
    }
    render() {
        var e = this.props;
        var t = e.scale;
        var n = e.entity;
        var r = e.element;
        var i = EditorAction.getSkewPoint(n, r, t).p;
        var o = RotationControlPointHelper.getScaledPoint(i, t);
        var s = Global.isMobileOrTablet() ? 7 : 4;
        return React.createElement(MouseDownEventAddRemove, {
            key: "skew-p",
            onTouchOrMouseDown: this.handleSkewControlPointStart
        },
        React.createElement("g", {
            style: _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                transform: ColorHelper.buildTranslateStyleTransform(o.x, o.y, n.shape.data.rotation)
            })
        },
        React.createElement("rect", {
            transform: "skewX(-30)",
            x: -s,
            y: -s,
            width: 2 * s,
            height: 2 * s,
            fill: "orange",
            stroke: "white"
        })))
    }
}
class ir extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onMoving = (e) => {
            var t = this.props.entity;
            return this.rotateCompositeShape(t, e)
        }
    }
    render() {
        var e = this.props;
        var t = e.point;
        var n = e.scale;
        return React.createElement(In, {
            getRootElement: this.props.getRootElement,
            point: t,
            scale: n,
            onPointMoved: this.props.onEntityMoved,
            onPointMoving: this.onMoving
        })
    }
    rotateCompositeShape(e, t) {
        var n = ShapeLoader.getShapeManagement(e);
        if (n.getBaseRotationPoints) {
            var r = n.getBaseRotationPoints(e, this.props.scale);
            var a = r.p;
            var i = r.cp;
            var o = Geometry.angleFrom3Points360(a, t, i);
            var s = n.rotate(e, o);
            this.props.onEntityMoving(s)
        }
    }
}
class or extends React.PureComponent {
    constructor(e) {
        super(e);
        this.onMoving = (e, t, n, r) => {
            if (!n.customData.otherShapes) {
                n.customData.otherShapes = [];
                if (ItemDefaultSettings.getSettings(this.props.diagramModel, "snapToOtherShapes")) n.customData.otherShapes = this.props.diagramModel.shapes.filter((e) => {
                    return e.id != n.customData.entity.id
                })
            }
            var a = n.customData;
            var i = a.key;
            var o = a.entity;
            var s = a.otherShapes;
            var l = ShapeLoader.getShapeManagement(o);
            var c = {
                key: i,
                point: t,
                diagramModel: this.props.diagramModel,
                shape: o,
                e: r,
                otherShapes: s,
                isShift: r.shiftKey,
                isControl: r.ctrlKey,
                isAlt: r.altKey,
                snapToGridSize: SnapToGridSize.getGridSizeIfSnapEnabled(this.props.diagramModel, r),
                scale: this.props.scale
            };
            var d = l.moveControlPoint(c);
            if (this.lastSnapPoint != c.outputSnapPoint) {
                this.props.onSnapPoint(c.outputSnapPoint);
                this.lastSnapPoint = c.outputSnapPoint
            }
            this.props.onEntityMoving(d)
        };
        this.handleCompositeShapeControlPoint = (e, t) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {
                key: t,
                entity: this.props.shape
            },
            RotationControlPointHelper.getReverseScale(this.props.scale))
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onEntityMoved()
        }
    }
    render() {
        var e = this.props;
        var t = e.shape;
        var n = e.scale;
        var r = ShapeLoader.getShapeManagement(t);
        var i = RotationControlPointHelper.getCpRadius();
        var o = _.map(r.getControlPoints(t, n), (e) => {
            var t = i - 1;
            if (e.smaller && "square" != e.type) t = Math.round((i - 1) / 1.5);
            var r;
            var o = RotationControlPointHelper.getScaledPoint(e.p, n);
            var s = {
                pointerEvents: "visiblePainted",
                transform: (new TransformHelper).orgin(t, t).translate(o.x - t, o.y - t).rotate(e.rotation, "deg").toCssStyle(),
                cursor: e.cursor || "crosshair",
                opacity: .7
            };
            switch (e.type) {
            case "square":
                r = React.createElement("path", {
                    style: {
                        stroke: "orange",
                        fill: "yellow"
                    },
                    d: "M".concat(0, ",", t, " L").concat(t, ",").concat(t - t, " L").concat(t + i - 1, ",").concat(t, " L").concat(t, ",").concat(t + t, " Z")
                });
                break;
            case "skew":
                r = React.createElement("rect", {
                    transform: "skewX(-30)",
                    x: 0,
                    y: 0,
                    width: 2 * t,
                    height: 2 * t,
                    fill: "orange",
                    stroke: "white"
                });
                break;
            default:
                r = React.createElement("rect", {
                    x: 0,
                    y: 0,
                    width: 2 * t,
                    height: 2 * t,
                    fill: "green",
                    stroke: "white"
                })
            }
            return React.createElement(MouseDownEventAddRemove, {
                key: e.key,
                onTouchOrMouseDown: (t) => {
                    return this.handleCompositeShapeControlPoint(t, e.key)
                }
            },
            React.createElement("g", {
                key: e.key,
                style: s
            },
            r))
        });
        if (r.getRotationPoints) {
            var s = r.getRotationPoints(t, this.props.scale).p;
            o = o.concat([this.getRotationControlPoint(s, t)])
        }
        return React.createElement("g", null, o)
    }
    getRotationControlPoint(e, t) {
        return React.createElement(ir, {
            key: "rotation-cp",
            point: e,
            entity: t,
            getRootElement: this.props.getRootElement,
            onEntityMoved: this.props.onEntityMoved,
            onEntityMoving: this.props.onEntityMoving,
            scale: this.props.scale
        })
    }
}
class sr extends React.Component {
    constructor(e) {
        super(e);
        this.onMoving = (e, t, n) => {
            var r = this.props.diagramModel;
            var a = r.connections;
            var i = r.elements;
            var o = n.customData;
            var s = o.key;
            var l = o.entity;
            var c = ShapeManagement.getConnectionPoints(a, i, l);
            var h = c.from;
            var u = c.to;
            var p = Geometry.toRelativeControlPoint(t, h, u);
            var m = _.assignIn({},
            l, {
                data: _.assignIn({},
                l.data, {
                    [s] : p
                })
            });
            this.props.onEntityMoving(m)
        };
        this.handleBezierSubControlPoint = (e, t) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {
                key: t,
                entity: this.props.connection
            },
            RotationControlPointHelper.getReverseScale(this.props.scale))
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onEntityMoved()
        }
    }
    render() {
        return React.createElement("g", null, this.renderConnectionControlPoints(this.props.connection))
    }
    renderConnectionControlPoints(e) {
        return "quadratic" == e.type ? this.renderQuadraticConnectionControlPoint(e) : "cubic" == e.type ? this.renderCubicConnectionControlPoint(e) : void 0
    }
    renderQuadraticConnectionControlPoint(e) {
        var t = this.props;
        var n = t.diagramModel;
        var r = t.scale;
        var i = n.connections;
        var o = n.elements;
        var s = Global.isMobileOrTablet() ? 10 : 5;
        var l = ShapeManagement.getQuadraticAbsoluteControlPoint(i, o, e);
        var c = RotationControlPointHelper.getScaledPoint(l, r);
        var h = _.assignIn({
            transform: ColorHelper.buildTranslateStyleTransform(c.x - s, c.y - s)
        },
        RotationControlPointHelper.baseStyle());
        return React.createElement("g", {
            style: h,
            onMouseDown: (e) => {
                return this.handleBezierSubControlPoint(e, "cp")
            },
            onTouchStart: (e) => {
                return this.handleBezierSubControlPoint(e, "cp")
            }
        },
        React.createElement("circle", {
            cx: s,
            cy: s,
            r: s - 1
        }))
    }
    renderCubicConnectionControlPoint(e) {
        var t = this.props;
        var n = t.diagramModel;
        var r = t.scale;
        var i = n.connections;
        var o = n.elements;
        var s = Global.isMobileOrTablet() ? 10 : 5;
        var l = ShapeManagement.getCubicAbsoluteControlPoints(i, o, e);
        var c = RotationControlPointHelper.getScaledPoint(l[0], r);
        var h = RotationControlPointHelper.getScaledPoint(l[1], r);
        var u = _.assignIn({
            transform: ColorHelper.buildTranslateStyleTransform(c.x - s, c.y - s)
        },
        RotationControlPointHelper.baseStyle());
        var p = _.assignIn({
            transform: ColorHelper.buildTranslateStyleTransform(h.x - s, h.y - s)
        },
        RotationControlPointHelper.baseStyle());
        return [React.createElement(MouseDownEventAddRemove, {
            key: "cp",
            onTouchOrMouseDown: (e) => {
                return this.handleBezierSubControlPoint(e, "cp")
            }
        },
        React.createElement("g", {
            style: u
        },
        React.createElement("circle", {
            cx: s,
            cy: s,
            r: s - 1
        }))), React.createElement(MouseDownEventAddRemove, {
            key: "cp2",
            onTouchOrMouseDown: (e) => {
                return this.handleBezierSubControlPoint(e, "cp2")
            }
        },
        React.createElement("g", {
            style: p
        },
        React.createElement("circle", {
            cx: s,
            cy: s,
            r: s - 1
        })))]
    }
}
/// var lr = n(153)/*PointDetector*/;  // 2 times
/// var cr = n(162)/*GuideDetector*/;  // 3 times
class dr extends React.Component {
    constructor(e) {
        super(e);
        this.onMoving = (e, t, n, r) => {
            var a = n.customData;
            var i = a.key;
            var o = a.index;
            var s = a.entity;
            var l = a.type;
            var c = this.props.diagramModel;
            if ("mainPoint" == l) {
                var d = c.horizontalGuides || [];
                var h = c.verticalGuides || [];
                var u = !!r.altKey;
                var p = !u;
                var m = (d.length > 0 || h.length > 0) && !r.ctrlKey;
                var f = null;
                if (RotationControlPointHelper.isSnapToOtherShapes(c, r) && !u) {
                    var g = this.handleSnapToOther(n, s, o, t);
                    t = g.point;
                    if (g.snapToOtherShape) {
                        p = false;
                        m = false;
                        f = g.point
                    }
                }
                if (m && !u) {
                    var y = GuideDetector.detectWithPoints(h, d, [t]);
                    if (y) switch (p = false, y.type) {
                    case "horizontal":
                        case "vertical":
                        t = y.snapPoint;
                        f = y.snapPoint;
                        break;
                    case "both":
                        f = t = {
                            x: y.vSnapPoint.x,
                            y: y.hSnapPoint.y
                        }
                    }
                }
                if (r.shiftKey && (t = this.calculateVerticalHorizonOr45Deg(s, t, o)), u) {
                    var A = r.ctrlKey ? [] : h;
                    var v = r.ctrlKey ? [] : d;
                    var S = this.calculateKeepAngle(s, t, o, A, v);
                    t = S.point;
                    if (S.snapPoint) f = S.snapPoint
                }
                this.props.onSnapPoint(f);
                if (p && RotationControlPointHelper.isSnapToGrid(this.props.diagramModel, r) && (EntityUtils.isShapeArrow(s) || EntityUtils.isPolygon(s) || EntityUtils.isPolygonCurve(s))) t = Geometry.snapToGridSize(t, RotationControlPointHelper.snapToGridSize(this.props.diagramModel));
                var C = EntityHelper.moveMainControlPoint(s, o, t);
                this.props.onEntityMoving(C)
            }
            if ("subPoint" == l) this.handleSubPointMove(s, o, i, t)
        };
        this.handleBezierSubControlPoint = (e, t, n) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {
                type: "subPoint",
                index: t,
                key: n,
                entity: this.props.entity,
                downPoint: this.getDownPoint(e)
            },
            RotationControlPointHelper.getReverseScale(this.props.scale))
        };
        this.handleMainControlPoint = (e, t) => {
            this.movingHandler.setBaseElement(this.props.getRootElement());
            this.movingHandler.setContainer(document.body);
            this.movingHandler.mouseDown(e, {
                type: "mainPoint",
                index: t,
                entity: this.props.entity,
                downPoint: this.getDownPoint(e)
            },
            RotationControlPointHelper.getReverseScale(this.props.scale));
            this.props.onControlSelected({
                type: "line-point",
                index: t
            })
        };
        this.movingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = () => {
            this.props.onEntityMoved();
            this.props.onSnapPoint(null)
        }
    }
    render() {
        return React.createElement("g", null, this.renderControlPoints())
    }
    renderControlPoints() {
        if (this.props.entity) {
            var e = this.props.entity;
            if (EntityUtils.isShapeArrow(e)) {
                if (EntityUtils.isStraightLineArrow(e)) return this.renderStraightLinePoints(e);
                if (EntityUtils.isCubicLineArrow(e)) return this.renderCubicArrowPoints(e)
            }
            if (EntityUtils.isPrimitiveShape(e)) {
                if (EntityUtils.isPolygon(e)) return this.renderPolygonPoints(e.data);
                if (EntityUtils.isPolygonCurve(e)) return this.renderCubicPoints(e.data, e.data)
            }
        }
    }
    renderCubicPoints(e, t) {
        var n = RotationControlPointHelper.getCpRadius();
        var r = _.map(e, (e, t) => {
            var r = RotationControlPointHelper.getScaledPoint(e.p1, this.props.scale);
            var i = _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                transform: ColorHelper.buildTranslateStyleTransform(r.x - n, r.y - n),
                opacity: .5
            });
            return this.props.controlSelectedInfo && this.props.controlSelectedInfo.index === t && (i.opacity = 1),
            React.createElement(MouseDownEventAddRemove, {
                key: "m" + t,
                onTouchOrMouseDown: (e) => {
                    return this.handleMainControlPoint(e, t)
                }
            },
            React.createElement("g", {
                style: i
            },
            React.createElement("circle", {
                cx: n,
                cy: n,
                r: n - 1
            })))
        });
        var i = _.flatMap(t, (e, t) => {
            var r = Geometry.toAbsoluteControlPointCubic(e);
            var i = RotationControlPointHelper.getScaledPoint(r.cp, this.props.scale);
            var o = RotationControlPointHelper.getScaledPoint(r.cp2, this.props.scale);
            var s = _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                fill: "gray",
                transform: ColorHelper.buildTranslateStyleTransform(i.x - n, i.y - n),
                opacity: .5
            });
            var l = _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                fill: "gray",
                transform: ColorHelper.buildTranslateStyleTransform(o.x - n, o.y - n),
                opacity: .5
            });
            return [React.createElement(MouseDownEventAddRemove, {
                onTouchOrMouseDown: (e) => {
                    return this.handleBezierSubControlPoint(e, t, "cp")
                },
                key: "c1" + t
            },
            React.createElement("g", {
                style: s
            },
            React.createElement("circle", {
                cx: n,
                cy: n,
                r: n - 1
            }))), React.createElement(MouseDownEventAddRemove, {
                onTouchOrMouseDown: (e) => {
                    return this.handleBezierSubControlPoint(e, t, "cp2")
                },
                key: "c2" + t
            },
            React.createElement("g", {
                style: l
            },
            React.createElement("circle", {
                cx: n,
                cy: n,
                r: n - 1
            })))]
        });
        return r.concat(i)
    }
    renderCubicArrowPoints(e) {
        return this.renderCubicPoints(e.data.concat({
            p1: e.data[e.data.length - 1].p2,
            p2: null,
            cp: null,
            cp2: null
        }), e.data)
    }
    renderStraightLinePoints(e) {
        var t = RotationControlPointHelper.getCpRadius();
        return _.map(e.data, (e, n) => {
            var r = RotationControlPointHelper.getScaledPoint(e, this.props.scale);
            var i = _.assignIn({},
            RotationControlPointHelper.baseStyle(), {
                transform: ColorHelper.buildTranslateStyleTransform(r.x - t, r.y - t),
                opacity: .5
            });
            return this.props.controlSelectedInfo && this.props.controlSelectedInfo.index === n && (i.opacity = 1),
            React.createElement(MouseDownEventAddRemove, {
                key: n,
                onTouchOrMouseDown: (e) => {
                    return this.handleMainControlPoint(e, n)
                }
            },
            React.createElement("g", {
                style: i
            },
            React.createElement("circle", {
                cx: t,
                cy: t,
                r: t - 1
            })))
        })
    }
    renderPolygonPoints(e) {
        var t = RotationControlPointHelper.getCpRadius();
        return _.map(e, (e, n) => {
            var r = RotationControlPointHelper.getScaledPoint(e, this.props.scale);
            var i = _.assignIn({
                transform: ColorHelper.buildTranslateStyleTransform(r.x - t, r.y - t)
            },
            RotationControlPointHelper.baseStyle(), {
                opacity: .5
            });
            return this.props.controlSelectedInfo && this.props.controlSelectedInfo.index === n && (i.opacity = 1),
            React.createElement(MouseDownEventAddRemove, {
                key: "c" + n,
                onTouchOrMouseDown: (e) => {
                    return this.handleMainControlPoint(e, n)
                }
            },
            React.createElement("g", {
                style: i
            },
            React.createElement("circle", {
                cx: t,
                cy: t,
                r: t - 1
            })))
        })
    }
    handleSnapToOther(e, t, n, r) {
        if (!e.customData.otherShapes) {
            e.customData.otherShapes = this.props.diagramModel.shapes.filter((t) => {
                return t.id != e.customData.entity.id
            });
            e.customData.extraPoints = PointDetector.getSnapablePointsEntity(t, n)
        }
        var a = e.customData.otherShapes;
        var i = PointDetector.detectPoint(r, a, e.customData.extraPoints, 5 / this.props.scale);
        return i ? {
            point: r = i.snapPoint,
            snapToOtherShape: true
        } : {
            point: r,
            snapToOtherShape: false
        }
    }
    calculateVerticalHorizonOr45Deg(e, t, n) {
        if (EntityUtils.isStraightLineArrow(e)) {
            var r = e.data;
            t = Geometry.snapLinePoint45(r[0 === n ? 1 : n - 1], t)
        }
        if (EntityUtils.isPolygon(e)) {
            var a = e.data;
            t = Geometry.snapLinePoint45(a[0 === n ? a.length - 1 : n - 1], t)
        }
        return t
    }
    handlePointKeepAngle(e, t, n, r, a) {
        var i = Geometry.distance2Points(e, n);
        var o = Geometry.pointAtDistance(e, t, i);
        var s = Geometry.pointAtDistance(e, t, -i);
        var l = Geometry.distance2Points(n, o) < Geometry.distance2Points(n, s) ? o : s;
        var c = Number.MAX_SAFE_INTEGER;
        var d = null;
        return r.forEach((t) => {
            var n = Geometry.intersectRayRay(e, l, {
                x: t.x,
                y: 0
            },
            {
                x: t.x,
                y: 1
            });
            if (n) {
                var r = Geometry.distance2Points(l, n);
                d = r < c ? n : d;
                c = Math.min(c, r)
            }
        }),
        a.forEach((t) => {
            var n = Geometry.intersectRayRay(e, l, {
                x: 0,
                y: t.y
            },
            {
                x: 1,
                y: t.y
            });
            if (n) {
                var r = Geometry.distance2Points(l, n);
                d = r < c ? n : d;
                c = Math.min(c, r)
            }
        }),
        d && c <= 5 ? {
            point: d,
            snapPoint: d
        } : {
            point: l,
            snapPoint: null
        }
    }
    calculateKeepAngle(e, t, n, r, a) {
        if (EntityUtils.isStraightLineArrow(e)) {
            var i = e.data;
            var o = i[0 === n ? 1 : n - 1];
            var s = i[n];
            return this.handlePointKeepAngle(o, s, t, r, a)
        }
        if (EntityUtils.isPolygon(e)) {
            var l = e.data;
            var c = l[0 === n ? l.length - 1 : n - 1];
            var d = l[n];
            return this.handlePointKeepAngle(c, d, t, r, a)
        }
        return {
            point: t
        }
    }
    handleSubPointMove(e, t, n, r) {
        var a = e.data;
        var i = EntityUtils.isPolygonCurve(e);
        var o = a[t];
        var s = ItemDefaultSettings.getSettings(e, "isControlPointBreak");
        if ("cp" == n) {
            o = Geometry.setAbsoluteCpForBezier(o, r, null);
            a = PropUpdateHelper.setIndex(a, t, o);
            if (!s) a = Geometry.smoothBeziersFromCurrentPoint(a, i)
        } else if ("cp2" == n) {
            o = Geometry.setAbsoluteCpForBezier(o, null, r);
            a = PropUpdateHelper.setIndex(a, t, o);
            if (!s) a = Geometry.smoothBeziers(a, i)
        }
        this.props.onEntityMoving(_.assignIn({},
        e, {
            data: a
        }))
    }
    getDownPoint(e) {
        var t = EventHelper.getLeftTopFromEvent(e);
        return {
            x: t.left,
            y: t.top
        }
    }
}
class hr extends React.Component {
    constructor() {
        super(...arguments);
        this.getRootElement = () => {
            return this.baseSVGElement
        }
    }
    componentDidMount() {
        this.baseSVGElement = jQuery(ReactDOM.findDOMNode(this)).closest("svg").get(0)
    }
    setControlPoints(e) {
        if (! (this.controlPoint && this.controlPoint.x === e.x && this.controlPoint.y === e.y)) {
            this.controlPoint = e;
            this.forceUpdate()
        }
    }
    clearControlPoint() {
        if (null != this.controlPoint) {
            this.controlPoint = null;
            this.forceUpdate()
        }
    }
    getSelectedEntityType() {
        return EntityUtils.getEntityType(this.props.entity)
    }
    renderConnectionControlPoints(e) {
        if ("quadratic" == e.type || "cubic" == e.type) return React.createElement(sr, {
            connection: e,
            diagramModel: this.props.data,
            getRootElement: this.getRootElement,
            onEntityMoved: this.props.onEntityMoved,
            onEntityMoving: this.props.onEntityMoving,
            scale: this.props.scale
        })
    }
    renderCompositeShapeControlPoints(e) {
        return React.createElement(or, {
            diagramModel: this.props.data,
            getRootElement: this.getRootElement,
            onEntityMoved: this.props.onEntityMoved,
            onEntityMoving: this.props.onEntityMoving,
            onSnapPoint: this.props.onSnapPoint,
            scale: this.props.scale,
            shape: e
        })
    }
    renderEditorControlPoints(e) {
        if (!this.props.refMap[e.id]) return [];
        if (!this.props.isEditorEditing) {
            var t = this.props.refMap[e.id].editor;
            return [React.createElement(rr, {
                key: "rotation-cp",
                element: t,
                entity: e,
                getRootElement: this.getRootElement,
                onEntityMoved: this.props.onEntityMoved,
                onEntityMoving: this.props.onEntityMoving,
                scale: this.props.scale
            }), React.createElement(ar, {
                key: "skew-p",
                element: t,
                entity: e,
                elementHeight: t.clientHeight,
                getRootElement: this.getRootElement,
                onEntityMoved: this.props.onEntityMoved,
                onEntityMoving: this.props.onEntityMoving,
                scale: this.props.scale
            })]
        }
    }
    renderLinesControlPoints(e) {
        var t = this.props.subSelection && this.props.subSelection.type === "line-point" ? this.props.subSelection : void 0;
        return React.createElement(dr, {
            controlSelectedInfo: t,
            diagramModel: this.props.data,
            entity: e,
            getRootElement: this.getRootElement,
            onControlSelected: this.props.onSubSelectionChanged,
            onEntityMoved: this.props.onEntityMoved,
            onEntityMoving: this.props.onEntityMoving,
            scale: this.props.scale,
            onSnapPoint: this.props.onSnapPoint
        })
    }
    renderControlPoints() {
        if (this.props.entity) {
            var e = this.props.entity.id;
            return DiagramIdHelper.isDiagramConnectionId(e) ? this.renderConnectionControlPoints(this.props.entity) : DiagramIdHelper.isDiagramArrowId(e) || DiagramIdHelper.isDiagramShapeId(e) ? this.renderLinesControlPoints(this.props.entity) : DiagramIdHelper.isDiagramCompositeShapeId(e) ? this.renderCompositeShapeControlPoints(this.props.entity) : DiagramIdHelper.isDiagramEditorId(e) ? this.renderEditorControlPoints(this.props.entity) : void 0
        }
    }
    render() {
        return this.props.hidden ? React.createElement("g", null) : React.createElement("g", {
            className: "no-print"
        },
        this.renderControlPoints())
    }
}
class ur extends React.Component {
    renderDrawing() {
        if (!this.props.isEditorEditing && this.props.entity) {
            var e = [];
            var t = this.props.entity;
            if (EntityUtils.isCompositeShape(t)) {
                var n = ShapeLoader.getShapeManagement(t);
                if (n.getRotationPoints) {
                    var r = n.getRotationPoints(t, this.props.scale);
                    var i = r.p;
                    var o = r.cp;
                    i = Geometry.scalePoint(i, this.props.scale);
                    o = Geometry.scalePoint(o, this.props.scale);
                    e.push(React.createElement("path", {
                        key: "rotate-cp",
                        d: "M".concat(o.x, ",").concat(o.y, " L").concat(i.x, ",").concat(i.y),
                        style: {
                            stroke: "gray",
                            strokeOpacity: .3,
                            strokeWidth: 1,
                            fill: "none"
                        }
                    }))
                }
                if (n.getSupplementaryLines) {
                    var s = n.getSupplementaryLines(t);
                    s = Geometry.getScaleLines(s, this.props.scale);
                    var l = ShapeHelper.pathsD(s);
                    e.push(React.createElement("path", {
                        key: "sl",
                        d: l,
                        style: {
                            stroke: "gray",
                            strokeOpacity: .3,
                            strokeWidth: 1,
                            fill: "none"
                        }
                    }))
                }
            }
            if (EntityUtils.isDiagramEditor(t) && this.props.refMap[t.id]) {
                var c = this.props.refMap[t.id].editor;
                var d = EditorAction.getRotationPoints(t, c, this.props.scale);
                var h = d.cp;
                var u = d.p;
                u = Geometry.scalePoint(u, this.props.scale);
                h = Geometry.scalePoint(h, this.props.scale);
                var p = ShapeHelper.getLineD([u, h]);
                e.push(React.createElement("path", {
                    key: "sl",
                    d: p,
                    style: {
                        stroke: "gray",
                        strokeOpacity: .3,
                        strokeWidth: 1,
                        fill: "none"
                    }
                }))
            }
            return e
        }
    }
    render() {
        return React.createElement("g", {
            className: "controls-drawing no-print",
            style: {
                pointerEvents: "none"
            }
        },
        this.renderDrawing())
    }
}
var pr = new class {
    getIntersectsByPoints(e, t) {
        return {
            points: e,
            intersections: _.map(e, (e) => {
                var n = t.radius;
                switch (t.shapeType) {
                case "o":
                    return {
                        circle: {
                            cp: e,
                            r: n
                        }
                    };
                case "o+":
                    return {
                        circle: {
                            cp: e,
                            r: n
                        },
                        lines: [{
                            p1: {
                                x: e.x - n,
                                y: e.y
                            },
                            p2: {
                                x: e.x + n,
                                y: e.y
                            }
                        },
                        {
                            p1: {
                                x: e.x,
                                y: e.y - n
                            },
                            p2: {
                                x: e.x,
                                y: e.y + n
                            }
                        }]
                    };
                case "x":
                    var r = n / 1.3;
                    return {
                        lines: [{
                            p1: {
                                x: e.x - r,
                                y: e.y - r
                            },
                            p2: {
                                x: e.x + r,
                                y: e.y + r
                            }
                        },
                        {
                            p1: {
                                x: e.x + r,
                                y: e.y - r
                            },
                            p2: {
                                x: e.x - r,
                                y: e.y + r
                            }
                        }]
                    };
                case "+":
                    return {
                        lines: [{
                            p1: {
                                x: e.x - n,
                                y: e.y
                            },
                            p2: {
                                x: e.x + n,
                                y: e.y
                            }
                        },
                        {
                            p1: {
                                x: e.x,
                                y: e.y - n
                            },
                            p2: {
                                x: e.x,
                                y: e.y + n
                            }
                        }]
                    }
                }
            })
        }
    }
};
var mr = new class {
    getIntersections(e) {
        var t = {
            stroke: "transparent",
            strokeWidth: 6,
            fill: "none"
        };
        return e.intersections.map((e, n) => {
            var r = ControlPoints.fromCircle(e.circle, null);
            var i = ControlPoints.fromCircle(e.circle, null, t);
            var o = ControlPoints.fromPaths(e.lines, null);
            var s = ControlPoints.fromPaths(e.lines, null, t);
            return React.createElement("g", {
                key: n
            },
            r, i, o, s)
        })
    }
    getIntersectsByPoints(e, t) {
        var n = pr.getIntersectsByPoints(e, t);
        return {
            svgs: this.getIntersections(n),
            points: e
        }
    }
    getIntersects(e, t, n) {
        var r = ShapeIntersectHelper.getIntersects(e, t);
        return this.getIntersectsByPoints(r, n)
    }
};
class fr extends React.Component {
    componentWillReceiveProps(e) {
        if (e.intersections.settings != this.props.intersections.settings) _.values(this.getCache()).forEach((e) => {
            if (e.svg) e.svg = "invalid"
        })
    }
    getCache() {
        return this.intersectionsCache || {}
    }
    setCache(e) {
        this.intersectionsCache = e
    }
    hasNoIntersection(e) {
        if (!e || !e.items || e.items.length <= 0) return true;
        if (1 === e.items.length) {
            var t = e.items[0];
            if (!t.entities || t.entities.length <= 0) return true
        }
        return false
    }
    getDefaultFillBorderColor() {
        return this.props.fixedContextHandler.getDefaultBorderColor()
    }
    render() {
        if (this.hasNoIntersection(this.props.intersections)) return React.createElement("g", null);
        var e = [];
        var t = this.getShapeMap(this.props.shapes);
        var n = this.getCache();
        var r = {};
        var i = [];
        var s = this.props.intersections;
        var l = gr(s);
        var c = l.radius;
        var d = Xn.getEntityHtmlStyleInfo(s, this.getDefaultFillBorderColor());
        var h = 0;
        for (; h < s.items.length; h++) {
            var p = s.items[h];
            if (1 === p.entities.length) {
                var m = p.entities[0];
                var f = this.getIntersectionsBetweenShapes(p.id, [t[m]], this.props.shapes, n, r, l);
                var g = f.component;
                var y = f.points;
                e.push(g);
                i = i.concat(y)
            }
        }
        this.setCache(r);
        s.___points = i;
        var E = null;
        var v = {
            stroke: "green",
            strokeWidth: 1,
            transform: "translate(-".concat(c + 15, "px,-5px)")
        };
        var S = PropUpdateHelper.setProp(v, "transform", "rotate(90deg) translate(-".concat(c + 15, "px,-5px)"));
        var C = PropUpdateHelper.setProp(v, "transform", "rotate(180deg) translate(-".concat(c + 15, "px,-5px)"));
        var x = PropUpdateHelper.setProp(v, "transform", "rotate(270deg) translate(-".concat(c + 15, "px,-5px)"));
        return this.props.selectedId && DiagramIdHelper.isDiagramIntersectionId(this.props.selectedId) && (E = _.map(i, (e, t) => {
            var n = {
                transform: "translate(".concat(e.x, "px,").concat(e.y, "px)"),
                cursor: "move"
            };
            return React.createElement("g", {
                key: t,
                style: n
            },
            React.createElement("path", {
                d: "M0,5 10,5 M5,2 L10,5 L5,8",
                style: v
            }), React.createElement("path", {
                d: "M0,5 10,5 M5,2 L10,5 L5,8",
                style: S
            }), React.createElement("path", {
                d: "M0,5 10,5 M5,2 L10,5 L5,8",
                style: C
            }), React.createElement("path", {
                d: "M0,5 10,5 M5,2 L10,5 L5,8",
                style: x
            }))
        })),
        React.createElement("g", {
            className: "intersections-group",
            onMouseDown: (e) => {
                return this.props.selectIntersections(s, e)
            }
        },
        d.defs, E, React.createElement("g", {
            style: d.style
        },
        e))
    }
    stringHashCode(e) {
        var t;
        var n = 0;
        if (0 === e.length) return n;
        t = 0;
        for (; t < e.length; t++) {
            n = (n << 5) - n + e.charCodeAt(t);
            n = n | 0
        }
        return n
    }
    isValidCache(e, t, n) {
        if (e) {
            var r = false;
            if (e.data1 === t.data && e.data2 === n.data && (r = true), e.data2 === t.data && e.data1 === n.data && (r = true), !r) return false;
            var a = false;
            if (e.settings1 === t.settings && e.settings2 === n.settings && (a = true), e.settings1 === n.settings && e.settings2 === t.settings && (a = true), r && a) return true
        }
        return false
    }
    getIntersectionsBetweenShapes(e, t, n, r, i, o) {
        var s = [];
        var l = [];
        var c = 0;
        for (; c < t.length; c++) {
            var d = t[c];
            if (d) if (!ItemDefaultSettings.getSettings(d, "blockIntersection")) {
                var h = 0;
                for (; h < n.length; h++) {
                    var u = n[h];
                    if (u) if (d.id != u.id) if (!ItemDefaultSettings.getSettings(u, "blockIntersection")) {
                        var p = this.stringHashCode(d.id) + this.stringHashCode(u.id);
                        if (!i[p]) {
                            var m = r[p];
                            if (this.isValidCache(m, d, u)) {
                                if ("invalid" == m.svg) {
                                    var f = mr.getIntersectsByPoints(m.points, o);
                                    var g = f.svgs;
                                    var y = f.points;
                                    m.svg = React.createElement("g", {
                                        key: d.id + u.id,
                                        className: "intersection-group"
                                    },
                                    g)
                                }
                                if (m.svg && "string" != typeof m.svg) {
                                    s.push(m.svg);
                                    l = l.concat(m.points)
                                }
                                i[p] = r[p]
                            } else {
                                var A = mr.getIntersects(d, u, o);
                                g = A.svgs;
                                y = A.points;
                                if (i[p] = {
                                    data1: d.data,
                                    data2: u.data,
                                    settings1: d.settings,
                                    settings2: u.settings,
                                    points: y,
                                    svg: null
                                },
                                g && g.length > 0) {
                                    var E = React.createElement("g", {
                                        key: d.id + u.id,
                                        className: "intersection-group"
                                    },
                                    g);
                                    i[p].svg = E;
                                    s.push(E);
                                    l = l.concat(y)
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            component: React.createElement("g", {
                key: e
            },
            s),
            points: l
        }
    }
    getShapeMap(e) {
        var t = {};
        return e.forEach((e) => {
            return t[e.id] = e
        }),
        t
    }
}
/// var yr = n(255)/*PolygonRenderer*/;  // 2 times
class Ar extends React.Component {
    constructor() {
        super(...arguments);
        this.selectShape = (e, t) => {
            this.props.onSelect(e, t)
        };
        this.handleShapeChanged = (e) => {
            this.props.onShapeChanged(e)
        }
    }
    shouldComponentUpdate(e, t) {
        var n = this.props;
        return n.singleSelectedId != e.singleSelectedId || n.groupSelectedIds != e.groupSelectedIds || n.remoteSelections != e.remoteSelections || n.intersections != e.intersections || n.shapes != e.shapes || n.subSelection != e.subSelection
    }
    isSelectedId(e) {
        return this.props.selectionCarrier.isSingleSelected(e)
    }
    isGroupSelectedId(e) {
        return this.props.selectionCarrier.isInGroupSelected(e)
    }
    getDefaultFillBorderColor() {
        return this.props.fixedContextHandler.getDefaultBorderColor()
    }
    renderStraightLine(e, t, n) {
        var r = e.data;
        var i = ColorHelper.getEntityStyle(e, "thickness");
        return React.createElement(ArrowRendererC, {
            key: e.id,
            type: "straight",
            tail: e.tail,
            head: e.head,
            shaft: e.shaft,
            thickness: i,
            data: r,
            onMouseDown: (n) => {
                return t(n, e)
            },
            className: "connection",
            isSelected: this.isSelectedId(e.id),
            isGroupSelected: n || this.isGroupSelectedId(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: e.settings,
            htmlStyleInfo: Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
        })
    }
    renderCubicLine(e, t, n) {
        var r = _.map(e.data, (e) => {
            return Geometry.toAbsoluteControlPointCubic(e)
        });
        var i = ColorHelper.getEntityStyle(e, "thickness");
        return React.createElement(ArrowRendererC, {
            key: e.id,
            type: "cubic",
            tail: e.tail,
            head: e.head,
            shaft: e.shaft,
            thickness: i,
            data: r,
            onMouseDown: (n) => {
                return t(n, e)
            },
            className: "connection",
            isSelected: this.isSelectedId(e.id),
            isGroupSelected: n || this.isGroupSelectedId(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            settings: e.settings,
            htmlStyleInfo: Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
        })
    }
    getSelectedClassName(e, t, n) {
        return classNames(t, {
            selected: this.isSelectedId(e),
            "group-selected": n || this.isGroupSelectedId(e)
        })
    }
    renderArrow(e, t, n) {
        return EntityUtils.isStraightLineArrow(e) ? this.renderStraightLine(e, t, n) : this.renderCubicLine(e, t, n)
    }
    renderCompositeShape(e, t, n) {
        var r = n || this.isGroupSelectedId(e.id);
        var i = this.getSelectedClassName(e.id, "composite-shape", r);
        var o = this.getReactStyleInfo(e);
        var s = ShapeLoader.getShapeManagement(e).getComponent();
        var l = this.isSelectedId(e.id);
        var c = l ? this.props.subSelection : null;
        return React.createElement(s, {
            key: e.id,
            isSelected: l,
            isGroupSelected: r,
            isRemoteSelected: false,
            remoteSelectedColor: void 0,
            subSelection: c,
            shape: e,
            styleInfo: o,
            className: i,
            onShapeChanged: this.handleShapeChanged,
            fixedContextHandler: this.props.fixedContextHandler,
            onMouseDown: (n) => {
                return t(n, e)
            }
        })
    }
    getReactStyleInfo(e) {
        return Xn.getEntityHtmlStyleInfo(e, this.getDefaultFillBorderColor())
    }
    renderShape(e, t, n) {
        var r = this.getSelectedClassName(e.id, "shape", n);
        var a = this.getReactStyleInfo(e);
        if (EntityUtils.isPolygon(e)) return PolygonRenderer.renderPolygon(e, e.data, r, t, a, {
            isSelected: this.isSelectedId(e.id),
            isGroupSelected: n || this.isGroupSelectedId(e.id),
            isRemoteSelected: false,
            remoteSelectedColor: void 0
        });
        if (EntityUtils.isPolygonCurve(e)) {
            var i = _.map(e.data, (e) => {
                return Geometry.toAbsoluteControlPointCubic(e)
            });
            return PolygonRenderer.renderPolygonCurve(e, i, r, a, {
                isSelected: this.isSelectedId(e.id),
                isGroupSelected: n || this.isGroupSelectedId(e.id),
                isRemoteSelected: false,
                remoteSelectedColor: void 0
            },
            t)
        }
    }
    renderShapes(e, t, n, r) {
        return _.map(e, (e) => {
            if (r) this.props.selectionCarrier.addSelectedIdInEntityGroup(e.id);
            var a = EntityUtils.getEntityType(e);
            return "linked" == a && r && this.props.selectionCarrier.addSelectedIdInEntityGroup(e.linkedId),
            "shape-arrow" == a ? this.renderArrow(e, t, r) : "shape-object" == a ? this.renderShape(e, t, r) : "shape-composite" == a ? this.renderCompositeShape(e, t, r) : "group" == a ? this.renderGroup(e, n ? t : null, r) : void 0
        })
    }
    selectGroupShape(e, t, n) {
        this.selectShape(t, e)
    }
    renderGroup(e, t, n) {
        t = t || this.selectGroupShape.bind(this, e);
        var r = this.isSelectedId(e.id);
        var i = n || this.isGroupSelectedId(e.id);
        var o = classNames("grouped-shape", {
            selected: r
        });
        return React.createElement("g", {
            key: e.id,
            className: o
        },
        this.renderShapes(e.entities, t, true, r || i))
    }
    render() {
        return React.createElement("g", {
            className: "shapes-region",
            style: {
                stroke: "black",
                fill: "none"
            }
        },
        this.renderShapes(this.props.shapes, this.selectShape, false, false), React.createElement(fr, {
            fixedContextHandler: this.props.fixedContextHandler,
            selectIntersections: this.props.selectIntersections,
            selectedId: this.props.singleSelectedId,
            shapes: this.props.shapes,
            intersections: this.props.intersections
        }))
    }
}
class Er extends React.Component {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.state = {
            fromPos: null,
            toPos: null
        };
        this.movingHandler.onMoving = (e, t, n, r, a) => {
            this.setState({
                toPos: t
            });
            if ("move" == this.props.mode) this.props.onMoving(a)
        };
        this.movingHandler.onMoved = () => {
            if ("move" == this.props.mode);
            else if (this.state.toPos) {
                var e = {
                    p1: this.state.fromPos,
                    p2: this.state.toPos
                };
                var t = ReactDOM.findDOMNode(this);
                var n = DOMHelper.findRectElementToElement(t, this.zoomElement);
                var r = {
                    p1: {
                        x: e.p1.x + n.left,
                        y: e.p1.y + n.top
                    },
                    p2: {
                        x: e.p2.x + n.left,
                        y: e.p2.y + n.top
                    }
                };
                this.props.onRectangleSelect(Geometry.getScaleTuple(r, 1 / this.props.scale))
            }
            this.setState({
                fromPos: null,
                toPos: null
            })
        }
    }
    setInfo(e) {
        this.zoomElement = e
    }
    setMouseDown(e) {
        if (!this.movingHandler.container) {
            var t = ReactDOM.findDOMNode(this);
            var n = jQuery(t).closest("math-type").get(0);
            this.movingHandler.setContainer(n);
            this.movingHandler.setBaseElement(t)
        }
        var r = this.movingHandler.mouseDown(e);
        this.setState({
            fromPos: r
        })
    }
    renderSelection() {
        if ("move" == this.props.mode) return null;
        if (this.state.fromPos && this.state.toPos) {
            var e = Geometry.getClientRect({
                p1: this.state.fromPos,
                p2: this.state.toPos
            });
            return React.createElement("rect", {
                style: Sr,
                x: e.left,
                y: e.top,
                width: e.width,
                height: e.height
            })
        }
    }
    render() {
        return React.createElement("svg", {
            style: vr
        },
        this.renderSelection())
    }
}
var vr = {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "visible",
    left: 0,
    top: 0,
    pointerEvents: "none"
};
var Sr = {
    stroke: "gray",
    fill: "none",
    strokeWidth: 1,
    strokeDasharray: "1.5px 2.5px"
};
class Cr extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            container: null,
            movingPosition: null
        }
    }
    setInfo(e, t) {
        this.setState({
            container: e,
            movingPosition: t
        })
    }
    getHeight() {
        var e = DOMHelper.getElementRect(this.state.container);
        var t = this.state.movingPosition.y - e.top;
        return Math.max(t, 20)
    }
    render() {
        var e = {
            position: "absolute",
            left: "0%",
            right: "0%",
            height: 2,
            borderTop: "1px solid gray"
        };
        return this.state.movingPosition ? e.top = this.getHeight() : e.bottom = "0px",
        React.createElement("div", {
            style: e
        })
    }
}
var xr = new class {
    pixelToPointScale() {
        return.75
    }
};
var Ir = function () {
    return function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var n = [];
            var r = true;
            var a = false;
            var i = void 0;
            try {
                var o;
                var s = e[Symbol.iterator]();
                for (; ! (r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = true);
            } catch(e) {
                a = true;
                i = e
            } finally {
                try {
                    if (!r && s.
                    return) s.
                    return ()
                } finally {
                    if (a) throw i;
                }
            }
            return n
        } (e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
} ();
var Tr = 2 * Math.PI;
var br = function (e, t, n, r, a, i, o) {
    var s = e.x;
    var l = e.y;
    return {
        x: r * (s = s * t) - a * (l = l * n) + i,
        y: a * s + r * l + o
    }
};
var Lr = function (e, t) {
    var n = .551915024494 * (t < 0 ? -1 : 1);
    var r = Math.cos(e);
    var a = Math.sin(e);
    var i = Math.cos(e + t);
    var o = Math.sin(e + t);
    return [{
        x: r - a * n,
        y: a + r * n
    },
    {
        x: i + o * n,
        y: o - i * n
    },
    {
        x: i,
        y: o
    }]
};
var Rr = function (e, t, n, r) {
    var a = e * r - t * n < 0 ? -1 : 1;
    var i = (e * n + t * r) / (Math.sqrt(e * e + t * t) * Math.sqrt(e * e + t * t));
    return i > 1 && (i = 1),
    i < -1 && (i = -1),
    a * Math.acos(i)
};
var Mr = function (e) {
    var t = e.px;
    var n = e.py;
    var r = e.cx;
    var a = e.cy;
    var i = e.rx;
    var o = e.ry;
    var s = e.xAxisRotation;
    var l = void 0 === s ? 0 : s;
    var c = e.largeArcFlag;
    var d = void 0 === c ? 0 : c;
    var h = e.sweepFlag;
    var u = void 0 === h ? 0 : h;
    var p = [];
    if (0 === i || 0 === o) return [];
    var m = Math.sin(l * Tr / 360);
    var f = Math.cos(l * Tr / 360);
    var g = f * (t - r) / 2 + m * (n - a) / 2;
    var y = -m * (t - r) / 2 + f * (n - a) / 2;
    if (0 === g && 0 === y) return [];
    i = Math.abs(i);
    o = Math.abs(o);
    var A = Math.pow(g, 2) / Math.pow(i, 2) + Math.pow(y, 2) / Math.pow(o, 2);
    if (A > 1) {
        i = i * Math.sqrt(A);
        o = o * Math.sqrt(A)
    }
    var E = function (e, t, n, r, a, i, o, s, l, c, d, h) {
        var u = Math.pow(a, 2);
        var p = Math.pow(i, 2);
        var m = Math.pow(d, 2);
        var f = Math.pow(h, 2);
        var g = u * p - u * f - p * m;
        if (g < 0) g = 0;
        g = g / (u * f + p * m);
        var y = (g = Math.sqrt(g) * (o === s ? -1 : 1)) * a / i * h;
        var A = g * -i / a * d;
        var E = c * y - l * A + (e + n) / 2;
        var v = l * y + c * A + (t + r) / 2;
        var S = (d - y) / a;
        var C = (h - A) / i;
        var x = (-d - y) / a;
        var I = (-h - A) / i;
        var T = Rr(1, 0, S, C);
        var b = Rr(S, C, x, I);
        return 0 === s && b > 0 && (b = b - Tr),
        1 === s && b < 0 && (b = b + Tr),
        [E, v, T, b]
    } (t, n, r, a, i, o, d, u, m, f, g, y);
    var v = Ir(E, 4);
    var S = v[0];
    var C = v[1];
    var x = v[2];
    var I = v[3];
    var T = Math.abs(I) / (Tr / 4);
    if (Math.abs(1 - T) < 1E-7) T = 1;
    var b = Math.max(Math.ceil(T), 1);
    I = I / b;
    var L = 0;
    for (; L < b; L++) {
        p.push(Lr(x, I));
        x = x + I
    }
    return p.map(function (e) {
        var t = br(e[0], i, o, f, m, S, C);
        var n = t.x;
        var r = t.y;
        var a = br(e[1], i, o, f, m, S, C);
        var s = a.x;
        var l = a.y;
        var c = br(e[2], i, o, f, m, S, C);
        return {
            x1: n,
            y1: r,
            x2: s,
            y2: l,
            x: c.x,
            y: c.y
        }
    })
};
class Or {
    constructor() {
        this.idTestCount = 1E3
    }
    pathsTikz(e) {
        if (!e || e.length <= 0) return "";
        var t = "";
        var n = null;
        var r = e.length > 1;
        var a = 0;
        for (; a < e.length; a++) {
            var i = Geometry.roundPath(e[a]);
            var o = a > 0 ? Geometry.roundPoint(e[a - 1].p2) : null;
            var s = o && Geometry.pointEquals(o, i.p1);
            var l = a === e.length - 1;
            var c = !i.cp;
            if (s && r && c && n && Geometry.pointEquals(i.p2, n.p1)) {
                t = t + " -- cycle";
                n = null
            } else {
                if (s || (t = t + this.pointD(i.p1)), i.cp2) {
                    t = t + " .. controls ".concat(this.pointD(i.cp));
                    t = t + " and ".concat(this.pointD(i.cp2));
                    t = t + " .. ".concat(this.pointD(i.p2))
                } else if (i.cp) {
                    var d = Geometry.quadraticToCubic(i);
                    t = t + " .. controls ".concat(this.pointD(d.cp));
                    t = t + " and ".concat(this.pointD(d.cp2));
                    t = t + " .. ".concat(this.pointD(d.p2))
                } else t = t + " -- ".concat(this.pointD(i.p2));
                if (r && n && l && Geometry.pointEquals(i.p2, n.p1)) {
                    t = t + " -- cycle";
                    n = null
                } else if (!n) n = Geometry.roundPath(e[a])
            }
        }
        return t
    }
    getStrokeTypeTikz(e, t) {
        var n = ColorHelper.getStrokeDashArray(e, t);
        if (!n || n.length <= 0) return "";
        var r = xr.pixelToPointScale();
        var a = n.map((e) => {
            return wr(e * r)
        });
        return 2 === n.length ? "[dash pattern={on ".concat(a[0], "pt off ").concat(a[1], "pt}]") : 4 === n.length ? "[dash pattern={on ".concat(a[0], "pt off ").concat(a[1], "pt on ").concat(a[2], "pt off ").concat(a[3], "pt}]") : ""
    }
    pointsTikz(e) {
        var t = [];
        return _.forEach(e, (n, r) => {
            if (r > 0 && r === e.length - 1 && Geometry.pointEquals(e[0], n)) t.push("cycle");
            else t.push("(".concat(wr(n.x), ",").concat(wr(n.y), ")"))
        }),
        t.join(" -- ")
    }
    drawWithD(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "draw";
        t = t || {};
        var a = n ? this.rotateOptionsTikz(n.rotation, n.cp) : "";
        var i = n ? this.canvasRotateOptionsTikz(n.rotation, n.cp) : "";
        var o = this.style(t);
        var s = "\\".concat(r, " ").concat(a, " ").concat(o.style, " ").concat(e, ";");
        if (o.gradient && n && n.rotation && (s = "\\path ".concat(a, " ").concat(e, ";% fake path for bounding box"), s = s + "\n\\".concat(r, " ").concat(i, " ").concat(o.style, " ").concat(e, ";")), o.gradient && o.fading && "draw" == r && "none" != t.strokeColor) {
            var l = this.style({
                fillColor: t.fillColor
            });
            var c = this.style(_.assignIn({},
            t, {
                fillColor: void 0
            }));
            var h = "\\path ".concat(i, " ").concat(l.style, " ").concat(e, ";% for fading");
            var u = "\\draw ".concat(a, " ").concat(c.style, " ").concat(e, ";% for border");
            return {
                d: "".concat(h, " \n ").concat(u, " \n"),
                defs: (l.defs || []).concat(c.defs || [])
            }
        }
        return {
            d: s,
            defs: o.defs
        }
    }
    pointD(e) {
        return "(".concat(wr(e.x), ",").concat(wr(e.y), ")")
    }
    lineWidth(e) {
        return (e = xr.pixelToPointScale() * e) ? "[line width=".concat(e, "] ") : ""
    }
    shaft(e, t) {
        return this.getStrokeTypeTikz(e, t)
    }
    drawPaths(e, t, n) {
        return this.drawWithD(this.pathsTikz(e), t, n)
    }
    drawPoints(e, t) {
        return this.drawWithD(this.pointsTikz(e), t)
    }
    cycleLines(e, t) {
        var n = _.map(e, (e) => {
            return "(".concat(wr(e.x), ",").concat(wr(e.y), ")")
        }).join(" -- ") + " -- cycle";
        return this.drawWithD(n, t)
    }
    circleTikz(e) {
        return " (".concat(wr(e.cp.x), ",").concat(wr(e.cp.y), ") circle [x radius=").concat(wr(e.r), ",y radius=").concat(wr(e.r), "] ")
    }
    arcTikz(e) {
        var t = Mr({
            px: e.p1.x,
            py: e.p1.y,
            cx: e.p2.x,
            cy: e.p2.y,
            rx: e.rx,
            ry: e.ry,
            xAxisRotation: e.xRotation,
            largeArcFlag: 0,
            sweepFlag: 0
        });
        var n = t.map((n, r) => {
            return {
                p1: r > 0 ? {
                    x: t[r - 1].x,
                    y: t[r - 1].y
                } : e.p1,
                cp: {
                    x: n.x1,
                    y: n.y1
                },
                cp2: {
                    x: n.x2,
                    y: n.y2
                },
                p2: {
                    x: n.x,
                    y: n.y
                }
            }
        });
        return this.pathsTikz(n)
    }
    drawArc(e, t) {
        return this.drawWithD(this.arcTikz(e), t)
    }
    ellipseTikz(e) {
        return " (".concat(wr(e.cp.x), ",").concat(wr(e.cp.y), ") circle [x radius=").concat(wr(e.rx), ",y radius=").concat(wr(e.ry), "] ")
    }
    ellipseFromRectTikz(e) {
        return this.ellipseTikz({
            cp: {
                x: (e.p2.x + e.p1.x) / 2,
                y: (e.p2.y + e.p1.y) / 2
            },
            rx: (e.p2.x - e.p1.x) / 2,
            ry: (e.p2.y - e.p1.y) / 2
        })
    }
    rectangleTikz(e) {
        return "(".concat(wr(e.p1.x), ",").concat(wr(e.p1.y), ") rectangle (").concat(wr(e.p2.x), ",").concat(wr(e.p2.y), ") ")
    }
    roundCornerTikz(e) {
        return "[rounded corners=".concat(e * xr.pixelToPointScale(), "]")
    }
    canvasRotateOptionsTikz(e, t, n) {
        if (!e) return "";
        var r = t ? {
            x: t.x,
            y: -t.y
        } : void 0;
        var a = this.rotateOptionsTikz(-e, r, false);
        if (!a) return "";
        var i = "transform canvas={".concat(a, "}");
        return false === n ? i : "[".concat(i, "]")
    }
    rotateOptionsTikz(e, t, n) {
        if (!e) return "";
        var r = "";
        return r = t ? "rotate around={".concat(wr(e), ":(").concat(wr(t.x), ",").concat(wr(t.y), ")\n}") : "rotate=".concat(wr(e), " "),
        false === n ? r : "[".concat(r, "]")
    }
    color(e) {
        var t = ColorHelper.colorAsArray(e, ColorTypeConverter.blackArr);
        return "{rgb,255:red,".concat(t[0], ";green,").concat(t[1], ";blue,").concat(t[2], "}")
    }
    colorOptionsAsTikz(e) {
        if (!e || "none" == e) return {
            colorParts: []
        };
        if (_.isString(e)) {
            var t = ColorTypeConverter.stringToRgbaArr(e, ColorTypeConverter.blackArr);
            if (3 === t.length || 1 === t[3]) return {
                colorParts: ["".concat(this.color(t), " ")]
            };
            e = t
        }
        return _.isArray(e) ? {
            colorParts: ["".concat(this.color(e), " "), "".concat(e[3], " ")]
        } : ColorHelper.isPattern(e) ? this.patternToTikzPattern(e) : this.gradientToTikzShading(e)
    }
    patternToTikzPattern(e) {
        var t = this.generateNameId();
        var n = "".concat(PatternDef.convertTikzSetPatternDef()).concat(PatternDef.ConvertTikzPatternDefs(e, t));
        var r = e.color.match(/\d+/g);
        return {
            type: "pattern",
            def: n,
            colorParts: ["pattern=".concat(t, ",pattern size=").concat(.75 * e.size, "pt,pattern thickness=").concat(.75 * e.thickness, "pt,pattern radius=").concat(e.radius ? .75 * e.radius : 0, "pt,pattern color={rgb,255:red,").concat(r[0], ";green,").concat(r[1], ";blue,").concat(r[2], "}")]
        }
    }
    pointTransformPgf(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "bp";
        return "\\pgfpoint{".concat(wr(e), " ").concat(n, "}{").concat(wr(t), " ").concat(n, "}")
    }
    shiftPgf(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "bp";
        return "\\pgftransformshift{".concat(this.pointTransformPgf(e, t, n), "}")
    }
    scalePgf(e) {
        return "\\pgftransformscale{".concat(e, "}")
    }
    rotatePgf(e) {
        return "\\pgftransformrotate{".concat(e, "}")
    }
    generateNameId() {
        return Global.isTestEnv() ? (this.idTestCount += 1, "_" + this.idTestCount.toString(36).substr(0, 9)) : "_" + Math.random().toString(36).substr(2, 9)
    }
    getTikzRgbStop(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "bp";
        return "rgb(".concat(r).concat(a, ")=(").concat(e, ",").concat(t, ",").concat(n, ")")
    }
    getTikzFadingStop(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "bp";
        return "color(".concat(t).concat(n, ")=(transparent!").concat(100 - 100 * e, ")")
    }
    fromPgfTransforms(e) {
        return e.map((e) => {
            return "shift" == e.type ? this.shiftPgf(e.x, e.y) : "scale" == e.type ? this.scalePgf(e.scale) : this.rotatePgf(e.rotation)
        }).join(" ")
    }
    fromTikzLinearFading(e) {
        return this.fromTikzFading(e, {
            declareShading: "\\pgfdeclarehorizontalshading{#1}{150bp}{#2}"
        })
    }
    fromTikzRadialFading(e) {
        return this.fromTikzFading(e, {
            declareShading: "\\pgfdeclareradialshading{#1}{\\pgfpoint{".concat(e.focal.x, "bp}{").concat(e.focal.y, "bp}}{#2}")
        })
    }
    fromTikzFading(e, t) {
        if (_.every(e.sortedStops, (e) => {
            return e.a >= 1
        })) return {
            type: "gradient",
            colorParts: [],
            def: ""
        };
        var n = _.last(e.sortedStops);
        var r = e.sortedStops[0];
        var a = [PropUpdateHelper.set(r, "pos", 0)].concat(e.sortedStops).concat([PropUpdateHelper.set(n, "pos", e.lastStopPos)]).map((e) => {
            return this.getTikzFadingStop(e.a, e.pos)
        }).join(";\n");
        var i = this.generateNameId();
        var o = t.declareShading.replace("#1", i).replace("#2", a);
        var s = this.generateNameId();
        var l = ["\\pgfdeclarefading{".concat(s, "}{\\pgfuseshading{").concat(i, "}}")];
        var c = ["path fading=".concat(s, " ")];
        var d = [];
        if (e.transforms && e.transforms.length > 0) {
            var h = "\\pgfsetadditionalshadetransform{".concat(this.fromPgfTransforms(e.transforms), "}");
            var p = this.generateNameId();
            d = ["\n\\tikzset{".concat(p, "/.code={").concat(h, "}}")];
            l = ["\\pgfdeclarefading{".concat(s, "}{\\tikz \\fill[shading=").concat(i, ",").concat(p, "] (0,0) rectangle (50bp,50bp);}")];
            c.push("fading transform={xshift=2}")
        }
        return {
            type: "gradient",
            def: d.concat(o).concat(l).join("\n"),
            colorParts: c.concat([])
        }
    }
    fromTikzLinearGradient(e) {
        var t = this.fromTikzGradient(e, {
            declareShading: "\\pgfdeclarehorizontalshading{#1}{150bp}{#2}"
        });
        var n = this.fromTikzLinearFading(e);
        return {
            type: "gradient",
            def: t.def + n.def,
            colorParts: t.colorParts.concat(n.colorParts)
        }
    }
    fromTikzRadialGradient(e) {
        var t = this.fromTikzGradient(e, {
            declareShading: "\\pgfdeclareradialshading{#1}{\\pgfpoint{".concat(e.focal.x, "bp}{").concat(e.focal.y, "bp}}{#2}")
        });
        var n = this.fromTikzRadialFading(e);
        return {
            type: "gradient",
            def: t.def + n.def,
            colorParts: t.colorParts.concat(n.colorParts)
        }
    }
    fromTikzGradient(e, t) {
        var n = _.last(e.sortedStops);
        var r = e.sortedStops[0];
        var a = [PropUpdateHelper.set(r, "pos", 0)].concat(e.sortedStops).concat([PropUpdateHelper.set(n, "pos", e.lastStopPos)]).map((e) => {
            return this.getTikzRgbStop(e.r, e.g, e.b, e.pos)
        }).join(";\n");
        var i = [];
        var o = [];
        if (e.transforms && e.transforms.length > 0) {
            var s = "\\pgfsetadditionalshadetransform{".concat(this.fromPgfTransforms(e.transforms), "}");
            var l = this.generateNameId();
            i = ["\n\\tikzset{".concat(l, "/.code={").concat(s, "}}")];
            o = [l]
        }
        var c = this.generateNameId();
        var d = t.declareShading.replace("#1", c).replace("#2", a);
        var h = ["shading=".concat(c)];
        return {
            type: "gradient",
            def: i.concat(d).join("\n"),
            colorParts: h.concat(o)
        }
    }
    colorToRgbA1Round(e) {
        var t = ColorHelper.colorAsArray(e, ColorTypeConverter.blackArr);
        return {
            r: wr(t[0] / 255),
            g: wr(t[1] / 255),
            b: wr(t[2] / 255),
            a: void 0 === t[3] ? 1 : t[3]
        }
    }
    getRgbaSortedStops(e, t) {
        return _.sortBy(e, (e) => {
            return e.pos
        }).map((e) => {
            var n = this.colorToRgbA1Round(e.color);
            return {
                r: n.r,
                g: n.g,
                b: n.b,
                a: n.a,
                pos: t(e.pos)
            }
        })
    }
    isGradientAlphaExist(e) {
        return !! ColorHelper.isGradient(e) && _.some(e.stops, (e) => {
            return this.colorToRgbA1Round(e.color).a <= 1
        })
    }
    gradientToTikzShading(e) {
        var t = e.center || {
            x: 50,
            y: 50
        };
        if (e.type && "linear" != e.type) {
            var n = e.focal || {
                x: 0,
                y: 0
            };
            var r = {
                x: t.x + n.x,
                y: t.y + n.y
            };
            var a = e.center || {
                x: 50,
                y: 50
            };
            var i = e.scale || 1;
            var o = {
                x: a.x - 50,
                y: -(a.y - 50)
            };
            var s = {
                type: "shift",
                x: (2 * -(r.x - a.x) * 4 + o.x / 2 + (r.x - a.x) / 2) * i,
                y: (4 * (r.y - a.y) * 2 + o.y / 2 - (r.y - a.y) / 2) * i
            };
            var l = {
                x: 2 * (r.x - a.x) * 4,
                y: 2 * -(r.y - a.y) * 4
            };
            var c = {
                type: "scale",
                scale: i
            };
            var d = this.getRgbaSortedStops(e.stops, (e) => {
                return 25 * e
            });
            return this.fromTikzRadialGradient({
                sortedStops: d,
                focal: l,
                lastStopPos: 400,
                transforms: [s, c]
            })
        }
        var h = e.scale || 1;
        var u = {
            type: "shift",
            x: (t.x - 50) * h / 2,
            y: -(t.y - 50) * h / 2
        };
        var p = {
            type: "scale",
            scale: 2 * h
        };
        var m = {
            type: "rotate",
            rotation: -(e.rotation || 0)
        };
        var f = this.getRgbaSortedStops(e.stops, (e) => {
            return 37.5 + 50 * e / 2
        });
        return this.fromTikzLinearGradient({
            sortedStops: f,
            lastStopPos: 100,
            transforms: [u, m, p]
        })
    }
    colorOptions(e, t, n, r) {
        var a = [];
        if ("stroke" == t && "none" == e) a = ["draw opacity=0"];
        else {
            var i = this.colorOptionsAsTikz(e);
            if ("gradient" == i.type) return {
                def: "\n% Gradient Info\n  ".concat(i.def),
                fill: false === r ? i.colorParts.join(",") : "[".concat(i.colorParts.join(","), "]")
            };
            if ("pattern" == i.type) return {
                def: "\n% Pattern Info\n ".concat(i.def),
                fill: false === r ? i.colorParts.join(",") : "[".concat(i.colorParts.join(","), "]")
            };
            var o = i.colorParts;
            if (0 === o.length) return {
                fill: ""
            };
            var s = "";
            var l = "";
            if ("fill" == t) {
                s = "fill=".concat(o[0]);
                l = o.length > 1 ? "fill opacity=".concat(o[1]) : ""
            } else if ("stroke" == t) {
                s = "color=".concat(o[0]);
                l = o.length > 1 ? "draw opacity=".concat(o[1]) : ""
            } else if ("text" == t) {
                s = "color=".concat(o[0]);
                l = o.length > 1 ? "opacity=".concat(o[1]) : ""
            }
            a = [s];
            if (l) a.push(l);
            if ("evenodd" == n) a.push("even odd rule")
        }
        return false === r ? {
            fill: "".concat(a.join(","))
        } : {
            fill: "[".concat(a.join(","), "]")
        }
    }
    style(e) {
        if (!e) return {
            style: ""
        };
        var t = "";
        var n = "";
        var r = "";
        var a = "";
        var i = "";
        var o = "";
        var s = "";
        var l = [];
        var c = false;
        var d = false;
        var h = false;
        if (e.strokeType && (t = this.shaft(e.strokeType, e.thickness)), e.thickness && (n = this.lineWidth(e.thickness)), e.textColor) {
            var u = this.colorOptions(e.textColor, "text");
            i = u.fill;
            if (u.def) l.push(u.def)
        }
        if (e.fillColor) {
            var p = this.colorOptions(e.fillColor, "fill", e.fillRule);
            c = c || ColorHelper.isGradient(e.fillColor);
            h = h || ColorHelper.isPattern(e.fillColor);
            d = d || this.isGradientAlphaExist(e.fillColor);
            r = p.fill;
            if (p.def) l.push(p.def)
        }
        if (e.strokeColor) {
            var m = this.colorOptions(e.strokeColor, "stroke");
            a = m.fill;
            if (m.def) l.push(m.def)
        }
        return e.lineJoin && (o = "[line join=".concat(e.lineJoin, "]")),
        e.lineCap && (s = "[line cap=".concat(e.lineCap, "]")),
        {
            defs: l.length > 0 ? l : void 0,
            style: "".concat(a).concat(r).concat(i).concat(t).concat("").concat(n).concat(o).concat(s),
            gradient: c,
            pattern: h,
            fading: d
        }
    }
}
class Dr {
    constructor() {
        this.helper = new Or
    }
    fromTikzPathInfo(e, t) {
        return {
            data: e.d,
            defs: e.defs,
            regionDescription: t
        }
    }
    assignRegionDescription(e, t) {
        return t.regionDescription = e,
        t
    }
    fromTikzPathInfoes() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            data: t.map((e) => {
                return e.d
            }).join(" "),
            defs: _.flatMap(t, (e) => {
                return e.defs || []
            })
        }
    }
    getStyleNoFill(e) {
        return _.assignIn({},
        e, {
            fillColor: "none"
        })
    }
    getStyleNoStroke(e) {
        return _.assignIn({},
        e, {
            strokeColor: "none"
        })
    }
}
/// var Nr = n(164)/*Shape-ellipse*/;  // 2 times
class kr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "ellipse" == e.type
    }
    convert(e) {
        var t = Object(ShapeEllipse)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Ellipse"
        }
    }
}
class Br extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "circle" == e.type
    }
    convert(e) {
        var t = Object(ShapeEllipse)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Circle"
        }
    }
}
class Pr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramShapeId(e.id) && "polygon-curve" == e.type
    }
    convert(e) {
        var t = Geometry.toAbsoluteControlPointCubics(e.data);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Polygon Curved")
    }
}
class Fr extends Dr {
    check(e) {
        return false
    }
    convert(e) {
        var t = Geometry.toAbsoluteControlPointCubics(e.data);
        var n = {
            strokeType: e.shaft,
            thickness: e.style ? e.style.thickness : "",
            arrow: {
                head: e.head,
                tail: e.tail
            },
            strokeColor: e.style ? e.style.strokeColor : ""
        };
        return this.fromTikzPathInfo(this.helper.drawPaths(t, n))
    }
}
class Hr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramShapeId(e.id) && "polygon" == e.type
    }
    convert(e) {
        return this.fromTikzPathInfo(this.helper.cycleLines(e.data, e.style), "Shape:Polygon")
    }
}
/// var _r = n(288)/*Shape-arc*/;  // 2 times
class Ur extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arc" == e.type
    }
    convert(e) {
        var t = ItemDefaultSettings.getSettings(e, "centerConnectLine");
        var n = Object(ShapeArc)(e, t);
        var r = Object(ShapeArc)(e, true);
        var a = this.getStyleNoFill(e.style);
        var i = this.getStyleNoStroke(e.style);
        return this.assignRegionDescription("Shape:Arc", this.fromTikzPathInfoes(this.helper.drawPaths(r, i), this.helper.drawPaths(n, a)))
    }
}
/// var Wr = n(127)/*Shape-rectangle*/;  // 4 times
class Gr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "rectangle" == e.type
    }
    convert(e) {
        var t = ItemDefaultSettings.getSettings(e, "cornerRadius");
        var n = Object(ShapeRectangleB)(e, t);
        return this.fromTikzPathInfo(this.helper.drawPaths(n, e.style), "Shape:Rectangle")
    }
}
/// var zr = n(356)/*Shape-parallelogram*/;  // 1 times
class Yr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "parallelogram" == e.type
    }
    convert(e) {
        var t = Object(ShapeParallelogram)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Parallelogram")
    }
}
class Kr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "square" == e.type
    }
    convert(e) {
        var t = ItemDefaultSettings.getSettings(e, "cornerRadius");
        var n = Object(ShapeRectangleB)(e, t);
        return this.fromTikzPathInfo(this.helper.drawPaths(n, e.style), "Shape:Square")
    }
}
class Vr extends Dr {
    getStraightArrow(e) {
        var t = e.shaft;
        var n = e.head;
        var r = e.tail;
        var a = e.settings;
        var i = e.data;
        var o = e.style;
        var s = void 0 === o ? {} : o;
        var l = Object(ArrowRendererB)(i, {
            head: n,
            shaft: t,
            tail: r
        },
        a, s.thickness || 1);
        var c = this.fromPathInfo(l.pathsInfo, s, t);
        var d = this.fromHeadInfo(l.headInfo, s);
        var h = this.fromHeadInfo(l.tailInfo, s);
        return {
            d: [c.d, d, h].join("\n"),
            defs: c.defs
        }
    }
    getBezierArrow(e, t) {
        var n = e.shaft;
        var r = e.head;
        var a = e.tail;
        var i = e.settings;
        var o = e.data;
        var s = e.style;
        var l = void 0 === s ? {} : s;
        var c = t ? o : Geometry.toAbsoluteControlPointCubics(o);
        var d = Object(ArrowRenderer)(c, {
            head: r,
            shaft: n,
            tail: a
        },
        i, l.thickness || 1);
        var h = this.fromPathInfo(d.pathsInfo, l, n);
        var u = this.fromHeadInfo(d.headInfo, l);
        var p = this.fromHeadInfo(d.tailInfo, l);
        return {
            d: [h.d, u, p].join("\n"),
            defs: h.defs
        }
    }
    fromPathInfo(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var n = arguments.length > 2 ? arguments[2] : void 0;
        t = t || {};
        var r = this.pathsInfoD(e);
        var a = n ? this.helper.getStrokeTypeTikz(n, t.thickness) : void 0;
        var i = this.helper.style(t);
        return {
            d: "\\draw ".concat(i.style, " ").concat(a, " ").concat(r, ";"),
            defs: i.defs
        }
    }
    pathsInfoD(e) {
        var t = "";
        return e.points && (t = t + (" " + this.helper.pointsTikz(e.points))),
        e.lines && (t = t + (" " + this.helper.pathsTikz(e.lines))),
        t
    }
    fromHeadInfo(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!e) return "";
        var n = ColorHelper.getStyle(t, "strokeColor");
        var r = e.rotation;
        var a = e.p;
        var i = e.points ? this.helper.pointsTikz(e.points) : "";
        var o = e.lines ? this.helper.pathsTikz(e.lines) : "";
        var s = e.circle ? this.helper.circleTikz(e.circle) : "";
        var l = e.arc ? this.helper.arcTikz(e.arc) : "";
        var c = _.clone(t);
        c.strokeColor = false === e.stroke ? void 0 : n;
        c.fillColor = e.fill ? n : void 0;
        c.thickness = t.thickness || 1;
        var d = "";
        if (false === e.stroke) d = "[draw opacity=0]";
        var h = this.helper.style(c).style;
        return "\\draw [shift={(".concat(wr(a.x), ",").concat(wr(a.y), ")},rotate=").concat(r, "] ").concat(h, " ").concat(d, " ").concat(i, " ").concat(o, " ").concat(s, " ").concat(l, ";")
    }
}
class jr extends Vr {
    check(e) {
        return DiagramIdHelper.isDiagramArrowId(e.id)
    }
    convert(e) {
        if (!e.type) {
            var t = this.getStraightArrow(e);
            return {
                data: t.d,
                defs: t.defs,
                regionDescription: "Straight Lines"
            }
        }
        var n = this.getBezierArrow(e, false);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Curve Lines"
        }
    }
}
/// var qr = n(154)/*Shape-regular-polygon-almost*/;  // 2 times
class Qr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "regular-polygon" == e.type
    }
    convert(e) {
        var t = Object(ShapeRegularPolygonAlmostB)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Regular Polygon")
    }
}
class Zr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "regular-polygon-almost" == e.type
    }
    convert(e) {
        var t = Object(ShapeRegularPolygonAlmostB)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Polygon")
    }
}
/// var Xr = n(358)/*Shape-parabola*/;  // 1 times
class Jr extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "parabola" == e.type
    }
    convert(e) {
        var t = Object(ShapeParabola)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Parabola")
    }
}
/// var n359 = n(359)/*Shape-polynomial*/;  // 1 times
class ea extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "polynomial" == e.type
    }
    convert(e) {
        var t = Object(ShapePolynomial)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Polynomial")
    }
}
/// var ta = n(355)/*Shape-wave*/;  // 1 times
class na extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "wave" == e.type
    }
    convert(e) {
        var t = Object(ShapeWave)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Wave")
    }
}
/// var ra = n(362)/*Shape-grid*/;  // 1 times
class aa extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "grid" == e.type
    }
    convert(e) {
        var t = Object(ShapeGrid)(e);
        var n = this.getStyleNoFill(e.style);
        var r = this.getStyleNoStroke(e.style);
        return this.assignRegionDescription("Shape:Grid", this.fromTikzPathInfoes(this.helper.drawPoints(t.rect, r), this.helper.drawPaths(t.vLines, n), this.helper.drawPaths(t.hLines, n), this.helper.drawPoints(t.borders, n)))
    }
}
/// var ia = n(360)/*Shape-spring*/;  // 1 times
class oa extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "spring" == e.type
    }
    convert(e) {
        var t = Object(ShapeSpring)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Spring")
    }
}
/// var sa = n(361)/*Shape-brace*/;  // 1 times
class la extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "brace" == e.type
    }
    convert(e) {
        var t = Object(ShapeBrace)(e);
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Brace")
    }
}
/// var ca = n(357)/*Shape-line-box*/;  // 1 times
class da extends Vr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "line-box" == e.type
    }
    convert(e) {
        var t = Object(ShapeLineBox)(e);
        var n = e.data.innerShape;
        if (EntityUtils.isCubicLineArrow(n)) {
            var r = _.assignIn({},
            n, {
                data: t.data
            });
            var a = this.getBezierArrow(r, true);
            return this.fromTikzPathInfo(a, "Shape:Boxed Bezier Curve")
        }
        if (EntityUtils.isStraightLineArrow(n)) {
            var i = _.assignIn({},
            n, {
                data: t.data
            });
            var o = this.getStraightArrow(i);
            return this.fromTikzPathInfo(o, "Shape:Boxed Line")
        }
        return EntityUtils.isPolygon(n) ? this.fromTikzPathInfo(this.helper.cycleLines(t.data, e.style), "Shape:Boxed Polygon") : EntityUtils.isPolygonCurve(n) ? this.fromTikzPathInfo(this.helper.drawPaths(t.data, e.style), "Shape:Regular Polygon") : {
            data: "",
            regionDescription: "Unknown shape"
        }
    }
}
/// var ha = n(363)/*Shape-arrow-head-1*/;  // 1 times
class ua extends Dr {
    convert(e) {
        var t = this.getPathTikz(e);
        var n = this.helper.drawWithD(t, e.style);
        return {
            data: n.d,
            defs: n.defs
        }
    }
}
class pa extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-1" == e.type
    }
    getPathTikz(e) {
        var t = Object(ShapeArrowHead1)(e);
        return this.helper.pathsTikz(t)
    }
}
/// var ma = n(364)/*Shape-arrow-head-2*/;  // 1 times
class fa extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-2" == e.type
    }
    getPathTikz(e) {
        var t = Object(ShapeArrowHead2)(e);
        return this.helper.pathsTikz(t)
    }
}
/// var ga = n(365)/*Shape-arrow-head-3*/;  // 1 times
class ya extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-3" == e.type
    }
    getPathTikz(e) {
        var t = Object(ShapeArrowHead3)(e);
        return this.helper.pathsTikz(t)
    }
}
/// var Aa = n(366)/*Shape-arrow-head-4*/;  // 1 times
class Ea extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-4" == e.type
    }
    getPathTikz(e) {
        var t = Object(ShapeArrowHead4)(e);
        return this.helper.pathsTikz(t)
    }
}
/// var va = n(367)/*Shape-arrow-head-6*/;  // 1 times
class Sa extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-6" == e.type
    }
    convert(e) {
        var t = Object(ShapeArrowHead6)(e);
        return this.fromTikzPathInfoes(this.helper.drawPaths(t.circle, e.style), this.helper.drawPaths(t.line1, this.getStyleNoFill(e.style)), this.helper.drawPaths(t.line2, this.getStyleNoFill(e.style)))
    }
    getPathTikz() {
        return ""
    }
}
/// var Ca = n(368)/*Shape-arrow-head-7*/;  // 1 times
class xa extends ua {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "arrow-head-7" == e.type
    }
    getPathTikz(e) {
        return this.helper.pathsTikz(Object(ShapeArrowHead7)(e))
    }
}
class Ia extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramEditorId(e.id) && "square" == e.type
    }
    convert(e) {
        var t = e.elements;
        var n = e.connections;
        var r = [];
        var a = "";
        return _.forOwn(t, (e, t) => {
            a = a + "\\node [draw] [".concat(e.shape.frameType, "] (").concat(t, ") at (").concat(e.shape.data.p.x, ",").concat(e.shape.data.p.y, "){f(x)};\n")
        }),
        _.forEach(n, (e) => {
            var t = {
                strokeType: e.shaft,
                thickness: e.style ? e.style.thickness : "",
                arrow: {
                    head: e.head,
                    tail: e.tail
                },
                strokeColor: e.style ? e.style.strokeColor : ""
            };
            var n = this.helper.style(t);
            a = a + "\\draw ".concat(n.style, "(").concat(e.fromEditorId, ") -- (").concat(e.toEditorId, ");\n");
            if (n.defs) r = r.concat(n.defs)
        }),
        {
            data: a,
            defs: r,
            error: ""
        }
    }
}
/// var Ta = n(352)/*Shape-axis2d*/;  // 1 times
class ba extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "axis2d" == e.type
    }
    convert(e) {
        var t = Object(ShapeAxis2d)(e);
        var n = this.helper.pathsTikz([t.xAxis, t.yAxis]);
        var r = this.helper.pointsTikz(t.xArrow);
        var a = this.helper.pointsTikz(t.yArrow);
        var i = t.lines ? this.helper.pathsTikz(t.lines) : "";
        var o = t.textPoints ? t.textPoints.reduce((e, t) => {
            return e + " (".concat(Geometry.round2(t.p.x + 4), ",").concat(Geometry.round2(t.p.y - 3), ") node[anchor=east,scale=0.75]{").concat(t.text, "}")
        },
        "") : "";
        var s = e.style || {};
        var l = this.helper.style({
            strokeColor: s.strokeColor,
            thickness: s.thickness,
            strokeType: s.strokeType
        });
        var c = this.helper.style({
            textColor: s.textColor
        });
        var d = ["\\draw ".concat(l.style, " ").concat(n, " ").concat(r, " ").concat(a, " ").concat(i, ";")];
        return t.textPoints && d.push("\\draw ".concat(c.style, " ").concat(o, ";")),
        {
            data: d.join("\n"),
            defs: (l.defs || []).concat(c.defs || []),
            regionDescription: "Shape:Axis 2D"
        }
    }
}
/// var La = n(193)/*LatexConverter*/;  // 1 times
var Ra = new Or;
var wa = new class {
    convertFrame(e) {
        if (!e.shape.frameType) return {
            d: ""
        };
        var t = e.___shapeInfo;
        var n = e.shape.style || {};
        var r = {
            fillColor: n.fillColor,
            strokeColor: n.strokeColor,
            strokeType: n.strokeType,
            thickness: n.thickness
        };
        switch (e.shape.frameType) {
        case "circle":
            var a = Ra.circleTikz(t.shape);
            var i = "";
            return t.outsideShape && (i = Ra.circleTikz(t.outsideShape)),
            Ra.drawWithD("".concat(a, " ").concat(i), r);
        case "rectangle":
            var o = ItemDefaultSettings.getTextSetting(e, "cornerRadius");
            var s = Ma(t.shape);
            var l = Object(ShapeRectangleB)({
                data: s,
                type: "rectangle",
                id: "123"
            },
            o);
            var c = Ra.pathsTikz(l);
            var d = "";
            if (t.outsideShape) {
                var h = Ma(t.outsideShape);
                var u = Object(ShapeRectangleB)({
                    data: h,
                    type: "rectangle",
                    id: "123"
                },
                o);
                d = Ra.pathsTikz(u)
            }
            return Ra.drawWithD(" ".concat(c, " ").concat(d), r);
        case "ellipse":
            var p = Ra.ellipseTikz(t.shape);
            var m = "";
            return t.outsideShape && (m = Ra.ellipseTikz(t.outsideShape)),
            Ra.drawWithD("".concat(p, " ").concat(m), r)
        }
    }
    convert(e) {
        var t = [];
        var n = [];
        return Object.keys(e).forEach((r) => {
            t.push("% Text Node");
            var a = e[r];
            var i = LatexConverter.toLatex(a.lines, {
                inMathExpression: !a.isTextMode,
                newLineUsingBackSlash: true,
                tikzNode: true
            });
            var o = [];
            if (a.shape.settings) {
                var s = a.shape.settings;
                if (s.fontSize) {
                    var l = TextHelper.fontSizePercentageFromCommand(s.fontSize);
                    o.push("scale=".concat(l))
                }
            }
            if (a.shape.style) {
                var c = a.shape.style;
                if (c.textColor) o.push(Ra.colorOptions(c.textColor, "text", null, false).fill)
            }
            var d = a.shape.data;
            if (d.rotation) o.push("rotate=".concat(wr(-d.rotation)));
            if (d.skewX) o.push("xslant=".concat(wr(Math.tan(Geometry.toRadians(-d.skewX)))));
            if (d.flipX) o.push("xscale=-1");
            var h = o.length > 0 ? "[".concat(o.join(","), "]") : "";
            var u = a.isTextMode ? i : "$".concat(i, "$");
            var p = a.isTextMode ? "[align=left]" : "";
            var m = this.convertFrame(a);
            if (m.d) t.push(m.d);
            if (m.defs) n = n.concat(m.defs);
            t.push("\\draw (".concat(wr(d.p.x), ",").concat(wr(d.p.y), ") node ").concat(h, " ").concat(p, "{").concat(u, "};"))
        }),
        {
            d: t.join("\n"),
            defs: n
        }
    }
};
var Oa = new class extends Vr {
    check(e) {
        return DiagramIdHelper.isDiagramArrowId(e.id) && null == e.type
    }
    convert(e) {
        var t = [];
        return e.forEach((e) => {
            var n = e.___path;
            if (n) if (t.push("% Connection"), "cubic" == e.type) {
                var r = _.assign({},
                e, {
                    data: [n]
                });
                t.push(this.getBezierArrow(r, true).d)
            } else if ("quadratic" == e.type) {
                var a = Geometry.quadraticToCubic(n);
                var i = _.assign({},
                e, {
                    data: [a]
                });
                t.push(this.getBezierArrow(i, true).d)
            } else {
                var o = _.assign({},
                e, {
                    data: [n.p1, n.p2]
                });
                t.push(this.getStraightArrow(o).d)
            }
        }),
        {
            data: t.join("\n"),
            error: ""
        }
    }
};
class Da extends Dr {
    check(e) {
        return false
    }
    convert(e) {
        if (!e) return {
            data: ""
        };
        var t = e.___points;
        var n = pr.getIntersectsByPoints(t, gr(e));
        var r = [];
        return {
            data: n.intersections.map((t) => {
                var n = t.circle ? this.helper.circleTikz(t.circle) : "";
                var a = t.lines ? this.helper.pathsTikz(t.lines) : "";
                var i = this.helper.style(e.style);
                return i.defs && (r = r.concat(i.defs)),
                "\\draw ".concat(i.style, " ").concat(n, " ").concat(a, ";")
            }).join("\n"),
            defs: r
        }
    }
}
/// var Na = n(369)/*Shape-right-arrow*/;  // 1 times
class ka extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Right Arrow"
        }
    }
}
/// var Ba = n(370)/*Shape-left-arrow*/;  // 1 times
class Pa extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "left-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeLeftArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Left Arrow"
        }
    }
}
/// var Fa = n(371)/*Shape-up-arrow*/;  // 1 times
class Ha extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "up-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeUpArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Up Arrow"
        }
    }
}
/// var _a = n(372)/*Shape-down-arrow*/;  // 1 times
class Ua extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "down-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeDownArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Down Arrow"
        }
    }
}
/// var Wa = n(373)/*Shape-left-right-arrow*/;  // 1 times
class Ga extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "left-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeLeftRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Left Right Arrow"
        }
    }
}
/// var za = n(374)/*Shape-up-down-arrow*/;  // 1 times
class Ya extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "up-down-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeUpDownArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Up Down Arrow"
        }
    }
}
/// var Ka = n(375)/*Shape-quad-arrow*/;  // 1 times
class Va extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "quad-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeQuadArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Quad Arrow"
        }
    }
}
/// var ja = n(376)/*Shape-left-top-right-arrow*/;  // 1 times
class qa extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "left-top-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeLeftTopRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Left Top Right Arrow"
        }
    }
}
/// var Qa = n(377)/*Shape-left-up-arrow*/;  // 1 times
class Za extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "left-up-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeLeftUpArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Left Up Arrow"
        }
    }
}
/// var Xa = n(378)/*Shape-bend-arrow*/;  // 1 times
class Ja extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "bend-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeBendArrow)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Bend Arrow"
        }
    }
}
/// var n379 = n(379)/*Shape-bend-up-arrow*/;  // 1 times
class ei extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "bend-up-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeBendUpArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Bend Up Arrow"
        }
    }
}
/// var ti = n(380)/*Shape-u-turn-arrow*/;  // 1 times
class ni extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "u-turn-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeUTurnArrow)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "U Turn Arrow"
        }
    }
}
/// var ri = n(381)/*Shape-curve-left-arrow*/;  // 1 times
class ai extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "curve-left-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeCurveLeftArrow)(e);
        var n = t.slice(0, 3);
        var r = t.slice(3);
        var a = this.helper.drawPaths(n, e.style);
        var i = this.helper.drawPaths(r, e.style);
        return {
            data: a.d.concat(i.d),
            defs: (i.defs || []).concat(i.defs || []),
            regionDescription: "Curve Left Arrow"
        }
    }
}
/// var ii = n(382)/*Shape-curve-right-arrow*/;  // 1 times
class oi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "curve-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeCurveRightArrow)(e);
        var n = t.slice(0, 3);
        var r = t.slice(3);
        var a = this.helper.drawPaths(n, e.style);
        var i = this.helper.drawPaths(r, e.style);
        return {
            data: a.d.concat(i.d),
            defs: (i.defs || []).concat(i.defs || []),
            regionDescription: "Curve Right Arrow"
        }
    }
}
/// var si = n(383)/*Shape-striped-right-arrow*/;  // 1 times
class li extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "striped-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeStripedRightArrow)(e);
        var n = this.helper.drawPoints(t.points1, e.style);
        var r = this.helper.drawPoints(t.points2, e.style);
        var a = this.helper.drawPoints(t.points3, e.style);
        return {
            data: n.d + r.d + a.d,
            defs: (n.defs || []).concat(r.defs || []).concat(a.defs || []),
            regionDescription: "Striped Right Arrow"
        }
    }
}
/// var ci = n(384)/*Shape-notched-right-arrow*/;  // 1 times
class di extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "notched-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeNotchedRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Notched Right Arrow"
        }
    }
}
/// var hi = n(385)/*Shape-pentagon-arrow*/;  // 1 times
class ui extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "pentagon-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapePentagonArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Pentagon Arrow"
        }
    }
}
/// var pi = n(386)/*Shape-chevron-arrow*/;  // 1 times
class mi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "chevron-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeChevronArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Chevron Arrow"
        }
    }
}
/// var fi = n(387)/*Shape-callout-right-arrow*/;  // 1 times
class gi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "callout-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeCalloutRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Callout Right Arrow"
        }
    }
}
/// var yi = n(388)/*Shape-callout-left-right-arrow*/;  // 1 times
class Ai extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "callout-left-right-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeCalloutLeftRightArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Callout Left Right Arrow"
        }
    }
}
/// var Ei = n(389)/*Shape-callout-quad-arrow*/;  // 1 times
class vi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "callout-quad-arrow" == e.type
    }
    convert(e) {
        var t = Object(ShapeCalloutQuadArrow)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Callout Quad Arrow"
        }
    }
}
/// var Si = n(243)/*Shape-doc-rounded-rect*/;  // 1 times
class Ci extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-rounded-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRoundedRect)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Rounded Rect"
        }
    }
}
/// var xi = n(390)/*Shape-doc-rounded-single-corner-rect*/;  // 1 times
class Ii extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-rounded-single-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRoundedSingleCornerRect)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Rounded Single Corner Rect"
        }
    }
}
/// var Ti = n(391)/*Shape-doc-rounded-same-side-corner-rect*/;  // 1 times
class bi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-rounded-same-side-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRoundedSameSideCornerRect)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Rounded Same Side Corner Rect"
        }
    }
}
/// var Li = n(392)/*Shape-doc-rounded-diagonal-corner-rect*/;  // 1 times
class Ri extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-rounded-diagonal-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRoundedDiagonalCornerRect)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Rounded Diagonal Corner Rect"
        }
    }
}
/// var Mi = n(393)/*Shape-doc-snip-single-corner-rect*/;  // 1 times
class wi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-snip-single-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocSnipSingleCornerRect)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Snip Single Corner Rect"
        }
    }
}
/// var Oi = n(394)/*Shape-doc-snip-same-side-corner-rect*/;  // 1 times
class Di extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-snip-same-side-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocSnipSameSideCornerRect)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Snip Same Side Corner Rect"
        }
    }
}
/// var Ni = n(395)/*Shape-doc-snip-diagonal-corner-rect*/;  // 1 times
class ki extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-snip-diagonal-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocSnipDiagonalCornerRect)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Snip Diagonal Corner Rect"
        }
    }
}
/// var Bi = n(396)/*Shape-doc-snip-round-single-corner-rect*/;  // 1 times
class Pi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-snip-round-single-corner-rect" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocSnipRoundSingleCornerRect)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Snip Round Single Corner Rect"
        }
    }
}
/// var Fi = n(397)/*Shape-doc-right-triangle*/;  // 1 times
class Hi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-right-triangle" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRightTriangle)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Right Triangle"
        }
    }
}
/// var _i = n(398)/*Shape-doc-trapezoid*/;  // 1 times
class Ui extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-trapezoid" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocTrapezoid)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Trapezoid"
        }
    }
}
/// var Wi = n(399)/*Shape-doc-plaque*/;  // 1 times
class Gi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-plaque" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocPlaque)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Plaque"
        }
    }
}
/// var zi = n(400)/*Shape-doc-can*/;  // 1 times
class Yi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-can" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocCan)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Can"
        }
    }
}
/// var Ki = n(401)/*Shape-doc-cube*/;  // 1 times
class Vi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-cube" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocCube)(e);
        var n = e.style;
        var r = this.getStyleNoFill(e.style);
        return this.assignRegionDescription("Shape:Cube", this.fromTikzPathInfoes(this.helper.drawPoints(t.outerBox, n), this.helper.drawPoints(t.line1, r), this.helper.drawPoints(t.line2, r)))
    }
}
/// var ji = n(402)/*Shape-doc-bevel*/;  // 1 times
class qi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-bevel" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocBevel)(e);
        var n = e.style;
        var r = this.getStyleNoFill(e.style);
        return this.assignRegionDescription("Shape:Bevel", this.fromTikzPathInfoes(this.helper.drawPoints(t.outerBox, n), this.helper.drawPoints(t.innerBox, r), this.helper.drawPoints(t.leftTopLink, r), this.helper.drawPoints(t.rightTopLink, r), this.helper.drawPoints(t.rightBottomLink, r), this.helper.drawPoints(t.leftBottomLink, r)))
    }
}
/// var Qi = n(403)/*Shape-doc-donut*/;  // 1 times
class Zi extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-donut" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocDonut)(e);
        var n = this.helper.drawPaths(t, _.assignIn({},
        e.style, {
            fillRule: "evenodd"
        }));
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Donut"
        }
    }
}
/// var Xi = n(289)/*Shape-doc-block-arc*/;  // 2 times
class Ji extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-block-arc" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocBlockArcB)(Object(ShapeDocBlockArc)(e));
        return this.fromTikzPathInfo(this.helper.drawPaths(t, e.style), "Shape:Block Arc")
    }
}
/// var n404 = n(404)/*Shape-doc-folded-corner*/;  // 1 times
class eo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-folded-corner" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocFoldedCorner)(e);
        return this.assignRegionDescription("Shape:Folded Corner", this.fromTikzPathInfoes(this.helper.drawPaths(t.outerBox, e.style), this.helper.drawPaths(t.corner, this.getStyleNoFill(e.style))))
    }
}
/// var to = n(405)/*Shape-doc-moon*/;  // 1 times
class no extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-moon" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocMoon)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Moon"
        }
    }
}
/// var ro = n(290)/*Shape-doc-arc*/;  // 2 times
class ao extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-arc" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocArcB)(e);
        var n = Object(ShapeDocArc)(e);
        return this.assignRegionDescription("Shape:Arc", this.fromTikzPathInfoes(this.helper.drawPaths(n, this.getStyleNoStroke(e.style)), this.helper.drawPaths(t, this.getStyleNoFill(e.style))))
    }
}
/// var io = n(406)/*Shape-doc-chord*/;  // 1 times
class oo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-chord" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocChord)(e);
        return this.assignRegionDescription("Shape:Chord", this.fromTikzPathInfoes(this.helper.drawPaths(t, e.style)))
    }
}
/// var so = n(407)/*Shape-doc-pie*/;  // 1 times
class lo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-pie" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocPie)(e);
        return this.assignRegionDescription("Shape:Pie", this.fromTikzPathInfoes(this.helper.drawPaths(t, e.style)))
    }
}
/// var co = n(408)/*Shape-doc-tear-drop*/;  // 1 times
class ho extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-tear-drop" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocTearDrop)(e);
        return this.assignRegionDescription("Shape:Tear Drop", this.fromTikzPathInfoes(this.helper.drawPaths(t, e.style)))
    }
}
/// var uo = n(409)/*Shape-doc-cloud*/;  // 1 times
class po extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-cloud" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocCloud)(e);
        return this.assignRegionDescription("Shape:Cloud", this.fromTikzPathInfoes(this.helper.drawPaths(t.fill, e.style), this.helper.drawPaths(t.strokes, this.getStyleNoFill(e.style))))
    }
}
/// var mo = n(410)/*Shape-doc-smiley-face*/;  // 1 times
class fo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-smiley-face" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocSmileyFace)(e);
        var n = e.style;
        var r = this.getStyleNoFill(e.style);
        return this.assignRegionDescription("Shape:Smiley Face", this.fromTikzPathInfoes(this.helper.drawPaths(t.outerCircle, n), this.helper.drawPaths(t.eye1, n), this.helper.drawPaths(t.eye2, n), this.helper.drawPaths(t.smile, r)))
    }
}
/// var go = n(411)/*Shape-doc-triangle*/;  // 1 times
class yo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-triangle" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocTriangle)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Triangle"
        }
    }
}
/// var Ao = n(412)/*Shape-doc-diamond*/;  // 1 times
class Eo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-diamond" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocDiamond)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Diamond"
        }
    }
}
/// var vo = n(413)/*Shape-doc-frame*/;  // 1 times
class So extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-frame" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocFrame)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Frame"
        }
    }
}
/// var Co = n(414)/*Shape-doc-half-frame*/;  // 1 times
class xo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-half-frame" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocHalfFrame)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Half Frame"
        }
    }
}
/// var Io = n(415)/*Shape-doc-l-shape*/;  // 1 times
class To extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-l-shape" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocLShape)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:L Shape"
        }
    }
}
/// var bo = n(416)/*Shape-doc-diagonal-stripe*/;  // 1 times
class Lo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-diagonal-stripe" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocDiagonalStripe)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Diagonal Stripe"
        }
    }
}
/// var Ro = n(417)/*Shape-doc-cross*/;  // 1 times
class Mo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-cross" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocCross)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Cross"
        }
    }
}
/// var wo = n(418)/*Shape-doc-right-angle*/;  // 1 times
class Oo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "doc-right-angle" == e.type
    }
    convert(e) {
        var t = Object(ShapeDocRightAngle)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Shape:Right Angle"
        }
    }
}
/// var Do = n(419)/*Shape-flow-alternative-process*/;  // 1 times
class No extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-alternative-process" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowAlternativeProcess)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Alternative Process"
        }
    }
}
/// var ko = n(420)/*Shape-flow-predefined-process*/;  // 1 times
class Bo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-predefined-process" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowPredefinedProcess)(e);
        var n = e.style;
        var r = this.getStyleNoFill(e.style);
        return this.assignRegionDescription("Flowchart:Prodefined Process", this.fromTikzPathInfoes(this.helper.drawPoints(t.outerBox, n), this.helper.drawPoints(t.line1, r), this.helper.drawPoints(t.line2, r)))
    }
}
/// var Po = n(421)/*Shape-flow-internal-storage*/;  // 1 times
class Fo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-internal-storage" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowInternalStorage)(e);
        var n = e.style;
        var r = this.getStyleNoFill(e.style);
        return this.assignRegionDescription("Flowchart:Internal Storage", this.fromTikzPathInfoes(this.helper.drawPoints(t.outerBox, n), this.helper.drawPoints(t.line1, r), this.helper.drawPoints(t.line2, r)))
    }
}
/// var Ho = n(422)/*Shape-flow-document*/;  // 1 times
class _o extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-document" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowDocument)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Document"
        }
    }
}
/// var Uo = n(423)/*Shape-flow-multidocument*/;  // 1 times
class Wo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-multidocument" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowMultidocument)(e);
        return this.assignRegionDescription("Flowchart:Multidocument", this.fromTikzPathInfoes(this.helper.drawPaths(t.part1, e.style), this.helper.drawPaths(t.part2, e.style), this.helper.drawPaths(t.part3, e.style)))
    }
}
/// var Go = n(424)/*Shape-flow-terminator*/;  // 1 times
class zo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-terminator" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowTerminator)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Terminator"
        }
    }
}
/// var Yo = n(425)/*Shape-flow-punched-tape*/;  // 1 times
class Ko extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-punched-tape" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowPunchedTape)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Punched Tape"
        }
    }
}
/// var Vo = n(426)/*Shape-flow-summing-junction*/;  // 1 times
class jo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-summing-junction" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowSummingJunction)(e);
        return this.assignRegionDescription("Flowchart:Summing Junction", this.fromTikzPathInfoes(this.helper.drawPaths(t.circle, e.style), this.helper.drawPaths(t.line1, this.getStyleNoFill(e.style)), this.helper.drawPaths(t.line2, this.getStyleNoFill(e.style))))
    }
}
/// var qo = n(427)/*Shape-flow-or*/;  // 1 times
class Qo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-or" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowOr)(e);
        return this.assignRegionDescription("Flowchart:Or", this.fromTikzPathInfoes(this.helper.drawPaths(t.circle, e.style), this.helper.drawPaths(t.line1, this.getStyleNoFill(e.style)), this.helper.drawPaths(t.line2, this.getStyleNoFill(e.style))))
    }
}
/// var Zo = n(428)/*Shape-flow-stored-data*/;  // 1 times
class Xo extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-stored-data" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowStoredData)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Stored Data"
        }
    }
}
/// var Jo = n(429)/*Shape-flow-delay*/;  // 1 times
class $o extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-delay" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowDelay)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Delay"
        }
    }
}
/// var es = n(430)/*Shape-flow-sequential-access-storage*/;  // 1 times
class ts extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-sequential-access-storage" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowSequentialAccessStorage)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Sequential Access Storage"
        }
    }
}
/// var ns = n(431)/*Shape-flow-magnetic-disk*/;  // 1 times
class rs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-magnetic-disk" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowMagneticDisk)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Magnetic Disk"
        }
    }
}
/// var as = n(432)/*Shape-flow-direct-access-storage*/;  // 1 times
class is extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-direct-access-storage" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowDirectAccessStorage)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Direct Access Storage"
        }
    }
}
/// var os = n(433)/*Shape-flow-display*/;  // 1 times
class ss extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-display" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowDisplay)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Display"
        }
    }
}
/// var ls = n(434)/*Shape-flow-preparation*/;  // 1 times
class cs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-preparation" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowPreparation)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Preparation"
        }
    }
}
/// var ds = n(435)/*Shape-flow-manual-input*/;  // 1 times
class hs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-manual-input" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowManualInput)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Manual Input"
        }
    }
}
/// var us = n(436)/*Shape-flow-manual-operation*/;  // 1 times
class ps extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-manual-operation" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowManualOperation)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Manual Operation"
        }
    }
}
/// var ms = n(440)/*Shape-flow-merge*/;  // 1 times
class fs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-merge" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowMerge)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Merge"
        }
    }
}
/// var gs = n(437)/*Shape-flow-off-page-connector*/;  // 1 times
class ys extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-off-page-connector" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowOffPageConnector)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Off Page Connector"
        }
    }
}
/// var As = n(438)/*Shape-flow-data*/;  // 1 times
class Es extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-data" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowData)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Data"
        }
    }
}
/// var vs = n(439)/*Shape-flow-decision*/;  // 1 times
class Ss extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-decision" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowDecision)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Decision"
        }
    }
}
/// var Cs = n(441)/*Shape-flow-extract*/;  // 1 times
class xs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-extract" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowExtract)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Extract"
        }
    }
}
/// var Is = n(443)/*Shape-flow-collate*/;  // 1 times
class Ts extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-collate" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowCollate)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Collate"
        }
    }
}
/// var bs = n(444)/*Shape-flow-sort*/;  // 1 times
class Ls extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-sort" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowSort)(e);
        return this.assignRegionDescription("Flowchart:Sort", this.fromTikzPathInfoes(this.helper.drawPoints(t.outside, e.style), this.helper.drawPoints(t.line, this.getStyleNoFill(e.style))))
    }
}
/// var Rs = n(442)/*Shape-flow-card*/;  // 1 times
class Ms extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-card" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowCard)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Card"
        }
    }
}
/// var ws = n(445)/*Shape-flow-process*/;  // 1 times
class Os extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-process" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowProcess)(e);
        var n = this.helper.drawPoints(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Process"
        }
    }
}
/// var Ds = n(446)/*Shape-flow-connector*/;  // 1 times
class Ns extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "flow-connector" == e.type
    }
    convert(e) {
        var t = Object(ShapeFlowConnector)(e);
        var n = this.helper.drawPaths(t, e.style);
        return {
            data: n.d,
            defs: n.defs,
            regionDescription: "Flowchart:Connector"
        }
    }
}
class ks extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "plot" == e.type
    }
    convert(e) {
        return {
            data: "% Plotting does not support converting to Tikz"
        }
    }
}
/// var Bs = n(103)/*ImageLoader*/;  // 1 times
class Ps extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "image" == e.type
    }
    convert(e) {
        var t = ImageLoader.getComponentUrlToRawUrl(e.data.url || "");
        var n = t.lastIndexOf("/") + 1;
        var r = t.substr(n);
        if (32 === r.indexOf("-")) r = r.substr(33);
        var a = Geometry.rectWidthHeight(e.data);
        var i = a.width;
        var o = a.height;
        var s = "\\includegraphics[width=".concat(wr(.75 * i), "pt,height=").concat(wr(.75 * o), "pt]{").concat(r, "}");
        var l = [];
        var c = e.data;
        var d = Geometry.getCenterPoint(e.data);
        if (c.rotation) l.push("rotate=".concat(wr(-c.rotation)));
        if (c.skewX) l.push("xslant=".concat(wr(Math.tan(Geometry.toRadians(-c.skewX)))));
        if (c.flipX) l.push("xscale=-1");
        var h = l.length > 0 ? "[".concat(l.join(","), "]") : "";
        return {
            data: "\\draw (".concat(wr(d.x), ",").concat(wr(d.y), ") node ").concat(h, "{").concat(s, "};"),
            regionDescription: "Image"
        }
    }
}
/// var Fs = n(448)/*Shape-free-drawing*/;  // 1 times
class Hs extends Dr {
    check(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id) && "free-drawing" == e.type
    }
    convert(e) {
        var t = Object(ShapeFreeDrawing)(e);
        var n = _.assignIn({},
        e.style, {
            lineCap: "round",
            lineJoin: "round"
        });
        var r = this.helper.drawPaths(t, n);
        return {
            data: r.d,
            defs: r.defs,
            regionDescription: "Shape:Free Drawing"
        }
    }
}
var _s = new class {
    constructor() {
        this.intersectionConverter = new Da;
        setTimeout(() => {
            this.converters = [new Br, new kr, new Pr, new Fr, new Hr, new Fr, new Hr, new Ur, new Gr, new Kr, new jr, new Qr, new Zr, new Jr, new ea, new na, new oa, new la, new pa, new fa, new ya, new Ea, new Sa, new xa, new Ia, new ba, new aa, new da, new Yr, new ka, new Pa, new Ha, new Ua, new Ga, new Ya, new Va, new qa, new Za, new Ja, new ei, new ni, new ai, new oi, new li, new di, new ui, new mi, new gi, new Ai, new vi, new Ci, new Ii, new bi, new Ri, new wi, new Di, new ki, new Pi, new Hi, new Ui, new Gi, new Yi, new Vi, new qi, new Zi, new Ji, new eo, new no, new ao, new oo, new lo, new ho, new po, new fo, new yo, new Eo, new So, new xo, new To, new Lo, new Mo, new Oo, new No, new Bo, new Fo, new _o, new Wo, new zo, new Ko, new jo, new Qo, new Xo, new $o, new ts, new rs, new is, new ss, new cs, new hs, new ps, new fs, new ys, new Es, new Ss, new xs, new Ts, new Ls, new Ms, new Os, new Ns, new Ps, new Hs, new ks]
        },
        1E3)
    }
    findConverter(e) {
        return _.find(this.converters, (t) => {
            return t.check(e)
        })
    }
    convert(e) {
        var t = "";
        var n = [];
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            if (a.style || (a = _.assignIn({},
            a, {
                style: {}
            })), DiagramIdHelper.isDiagramGroupId(a.id)) {
                var i = this.convert(a.entities);
                t = t + "".concat(i.d, "\n");
                n = n.concat(i.defs)
            } else {
                var s = this.findConverter(a);
                if (s) {
                    var l = a;
                    if (!l.style) l = PropUpdateHelper.setProp(l, "style", {});
                    if (!l.settings) l = PropUpdateHelper.setProp(l, "settings", {});
                    var c = s.convert(l);
                    if (!Global.isTestEnv() && c.regionDescription) t = t + "%".concat(c.regionDescription, " [id:").concat(a.id, "] \n");
                    t = t + "".concat(c.data, "\n");
                    n = n.concat(c.defs || [])
                }
            }
        }
        return {
            d: t,
            defs: n
        }
    }
    convertModel(e) {
        var t = ItemDefaultSettings.getSettings(e, "diagramHeight");
        var n = this.convert(e.shapes);
        var r = wa.convert(e.elements);
        var a = Oa.convert(e.connections);
        var i = this.intersectionConverter.convert(e.intersections);
        var o = [];
        return o = (o = (o = (o = o.concat(n.defs || [])).concat(r.defs || [])).concat(a.defs || [])).concat(i.defs || []),
        "\n".concat(o.join("\n"), "\n\\tikzset{every picture/.style={line width=").concat(xr.pixelToPointScale(), "pt}}%set default line width to ").concat(xr.pixelToPointScale(), "pt\n\n\\begin{tikzpicture}[x=").concat(xr.pixelToPointScale(), "pt,y=").concat(xr.pixelToPointScale(), "pt,yscale=-1,xscale=1]\n%uncomment if require:\\path (0,").concat(t, ");%set diagram left start at 0,and has height of ").concat(t, "\n\n").concat(n.d, "\n").concat(r.d, "\n").concat(a.data, "\n").concat(i.data, "\n\\end{tikzpicture}\n")
    }
};
class Us extends React.Component {
    constructor() {
        super(...arguments);
        this.handleZoom = (e) => {
            var t = this.props.zoom;
            if ("zoom-in" == e.key) this.props.onZoom(t + .5);
            if ("zoom-out" == e.key) this.props.onZoom(t - .5)
        };
        this.onZoomActionSelected = (e) => {
            if ("hand-move" == e.key) this.props.requestViewPortFor("move" == this.props.viewPortActionFor ? void 0 : "move");
            if ("select" == e.key) this.props.requestViewPortFor("select" == this.props.viewPortActionFor ? void 0 : "select")
        }
    }
    renderSelectActions() {
        if (! (this.props.zoom <= 1)) {
            var e = [];
            if ("move" == this.props.viewPortActionFor) e.push("hand-move");
            if ("select" == this.props.viewPortActionFor) e.push("select");
            return React.createElement(FindAndReplaceOptionsComponent, {
                style: zs,
                preventDefault: true,
                stopPropagation: true,
                selectedKeys: e,
                onSelect: this.onZoomActionSelected,
                items: [{
                    key: "hand-move",
                    element: React.createElement("i", {
                        style: Gs,
                        className: "fa fa-hand-paper-o"
                    })
                },
                {
                    key: "select",
                    element: React.createElement("svg", {
                        style: {
                            width: 25,
                            height: 21,
                            marginBottom: -3,
                            marginLeft: -5,
                            marginTop: -2
                        }
                    },
                    React.createElement("path", {
                        style: {
                            transform: "translate(7px,4px) scale(1.3)"
                        },
                        d: "M-0.5,0 L12.5,0  M-0.5,12 L12.5,12 M0,0 L0,12  M12,0 L12,12",
                        stroke: "gray",
                        strokeWidth: "0.5",
                        strokeDasharray: "1 1"
                    }))
                }]
            })
        }
    }
    renderGuidesAdding() {
        if (this.props.zoom <= 1) {
            var e = [{
                value: "vertical",
                display: "Add Vertical Guide"
            },
            {
                value: "horizontal",
                display: "Add Horizontal Guide"
            },
            {
                value: "seperator",
                display: "Seperator",
                isSeperator: true
            },
            {
                value: "show-guides",
                display: "Show Guides",
                checked: this.props.showGuide,
                isCheckBox: true,
                disabled: !this.props.hasAnyGuide
            }];
            return React.createElement(LabelItemContainer, {
                labelStyle: {
                    paddingTop: 7,
                    paddingBottom: 2,
                    paddingLeft: 5,
                    paddingRight: 5
                },
                checkboxTextStyle: {
                    color: this.props.hasAnyGuide ? "black" : "lightgray"
                },
                containerStyle: {
                    width: 150
                },
                style: {
                    borderLeft: "1px solid lightgray"
                },
                label: "Guides",
                items: e,
                onItemSelect: (e) => {
                    if ("vertical" == e) this.props.onAddNewVerticalGuide();
                    if ("horizontal" == e) this.props.onAddNewHorizontalGuide();
                    if ("show-guides" == e) this.props.onGuideShow(!this.props.showGuide)
                }
            })
        }
    }
    renderZoomControls() {
        if (!Global.isMobileOrTablet()) {
            var e = [];
            var t = this.props.zoom;
            if (t <= 1) e.push("zoom-out");
            if (t >= 5) e.push("zoom-in");
            var n = 1 != t ? "" : "none";
            return React.createElement("div", {
                style: {
                    display: "flex",
                    alignItems: "baseline"
                }
            },
            React.createElement(FindAndReplaceOptionsComponent, {
                style: zs,
                preventDefault: true,
                stopPropagation: true,
                selectedKeys: [],
                onSelect: this.handleZoom,
                disabledKeys: e,
                items: [{
                    key: "zoom-in",
                    element: React.createElement("i", {
                        style: Gs,
                        className: "fa fa-search-plus"
                    })
                },
                {
                    key: "zoom-out",
                    element: React.createElement("i", {
                        style: Gs,
                        className: "fa fa-search-minus"
                    })
                }]
            }), React.createElement("div", null), React.createElement("span", {
                style: _.assignIn({},
                Ws, {
                    display: n
                })
            },
            this.props.zoom.toFixed(1)), React.createElement("span", {
                style: {
                    paddingRight: 10,
                    color: "#4c4b4b",
                    fontSize: 13,
                    display: n
                }
            },
            "x"))
        }
    }
    render() {
        return React.createElement("zoom-control", {
            style: Ys,
            onDoubleClick: (e) => {
                return e.stopPropagation()
            },
            class: "no-print"
        },
        this.renderZoomControls(), this.renderSelectActions(), this.renderGuidesAdding())
    }
}
var Ws = {
    fontWeight: 300,
    paddingLeft: 10,
    paddingRight: 2,
    color: "#4c4b4b",
    fontSize: 14
};
var Gs = {
    padding: 3
};
var zs = {
    fontSize: 15
};
var Ys = {
    background: "white",
    display: "flex",
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 10,
    border: "1px solid lightgray",
    padding: 2,
    alignItems: "baseline",
    fontFamily: '"Segoe UI",Arial,Verdana,sans-serif'
};
/// var Ks = n(29)/*CompositeBlock*/;  // 2 times
class Vs {
    constructor() {
        this.funcArr = []
    }
    register(e) {
        this.funcArr.push(e)
    }
    unRegister(e) {
        this.funcArr = this.funcArr.filter((t) => {
            return t != e
        })
    }
    notify() {
        this.funcArr.forEach((e) => {
            return e()
        })
    }
}
class js extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.editorUpdateNotifier = new Vs;
        this.state = {
            isEditorEditing: false,
            showingExpanderLine: false,
            zoom: 1,
            showGuide: true
        };
        this.getScale = () => {
            return this.state.zoom
        }
    }
    getChildContext() {
        return {
            getScale: this.getScale
        }
    }
    getClassName() {
        return this.props.selected ? classNames(super.getClassName(), "role-diagram-selected", "role-prevent-selection") : super.getClassName()
    }
    shouldNotMoveOutsideEditor() {
        return true
    }
}
js.contextTypes = _.assignIn({
    selectFromPos: PropTypes.any,
    requestRenderToolBarComponent: PropTypes.any,
    requestRenderItemsBarComponent: PropTypes.any,
    requestDelete: PropTypes.any,
    requestExportDialog: PropTypes.any,
    requestImageSelection: PropTypes.any
},
CompositeBlock.contextTypes);
js.childContextTypes = {
    getScale: PropTypes.any
};
class qs extends React.Component {
    render() {
        var e = this.props.snapPoints;
        if (!e || 0 === e.length) return React.createElement("g", null);
        return React.createElement("g", {
            style: {}
        },
        e.map((e, t) => {
            var n = e ? RotationControlPointHelper.getScaledPoint(e, this.props.scale) : void 0;
            return React.createElement("circle", {
                key: t,
                cx: n.x,
                cy: n.y,
                r: 5,
                fill: "rgba(144,238,144,0.52)",
                stroke: "green",
                strokeWidth: "1"
            })
        }))
    }
}
class Qs extends React.Component {
    constructor() {
        super(...arguments);
        this.didMount = false;
        this.componentInUpdateMode = false;
        this.requestedByEditorNotified = false;
        this.refresh = () => {
            if (this.componentInUpdateMode) this.requestedByEditorNotified = true;
            else if (this.delayPresenterRef) {
                this.delayPresenterRef.refresh(true);
                this.requestedByEditorNotified = false
            }
        };
        this.handleDelayPresenterRef = (e) => {
            this.delayPresenterRef = e
        }
    }
    componentDidMount() {
        this.props.editorUpdateNotifier.register(this.refresh);
        this.didMount = true;
        this.props.fixedContextHandler.getBatchUpdater().requestAfterProcess(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.props.editorUpdateNotifier.unRegister(this.refresh)
    }
    componentWillUpdate() {
        this.componentInUpdateMode = true
    }
    componentDidUpdate() {
        this.componentInUpdateMode = false;
        this.props.fixedContextHandler.getBatchUpdater().requestAfterProcess(() => {
            if (this.delayPresenterRef) {
                this.delayPresenterRef.refresh(this.requestedByEditorNotified);
                this.requestedByEditorNotified = false
            }
        })
    }
    render() {
        return this.didMount ? React.createElement(Zs, {
            ref: this.handleDelayPresenterRef
        },
        this.props.children) : React.createElement("div", null)
    }
}
class Zs extends React.Component {
    constructor() {
        super(...arguments);
        this.editorRandom = Math.random()
    }
    refresh(e) {
        if (e) this.editorRandom = Math.random();
        this.forceUpdate()
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            editorChangedHash: this.editorRandom
        })
    }
}
class Xs extends React.Component {
    constructor() {
        super(...arguments);
        this.handleEntitiesChangedForGroup = (e, t, n) => {
            var r = this.updateRotationSkewX(t, n);
            this.props.onEntitiesChanged(e, r)
        };
        this.handleEntitiesChangingForGroup = (e, t, n) => {
            var r = this.updateRotationSkewX(t, n);
            this.props.onEntitiesChanging(e, r)
        }
    }
    updateRotationSkewX(e, t) {
        return _.assignIn({},
        this.props.groupEntity, {
            data: _.assignIn({},
            this.props.groupEntity.data, {
                rotation: e,
                skewX: t
            })
        })
    }
    render() {
        var e = this.props.groupEntity.data;
        var t = void 0 === e ? {} : e;
        return React.createElement(wn, {
            rotation: t.rotation,
            skewX: t.skewX,
            colorTheme: "green",
            entities: this.props.groupEntity.entities,
            diagram: this.props.diagram,
            editorRef: this.props.editorRef,
            scale: this.props.scale,
            getRootElement: this.props.getRootElement,
            onGroupMouseDown: this.props.onGroupMouseDown,
            onEntitiesChanged: this.handleEntitiesChangedForGroup,
            onEntitiesChanging: this.handleEntitiesChangingForGroup
        })
    }
}
/// var Js = n(712)/*FreeLineCorrector*/;  // 1 times
/// var vv = n.n(Js);
/// var el = n(539)/*PathSimplifier*/;  // 1 times
class tl extends React.Component {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.handleMouseDown = (e) => {
            if (!this.movingHandler.baseElement) this.movingHandler.setBaseElement(this.canvasRef);
            this.movingHandler.mouseDown(e, {
                points: [],
                maxRect: {
                    p1: {
                        x: Number.MAX_SAFE_INTEGER,
                        y: Number.MAX_SAFE_INTEGER
                    },
                    p2: {
                        x: Number.MIN_SAFE_INTEGER,
                        y: Number.MIN_SAFE_INTEGER
                    }
                }
            })
        };
        this.getRef = (e) => {
            this.canvasRef = e
        };
        this.handleKeyDown = (e) => {
            if (27 === e.keyCode) this.props.requestStopDrawing()
        };
        this.movingHandler.onMovingStarted = (e, t, n) => {
            this.canvasContext = this.canvasRef.getContext("2d");
            var r = this.canvasContext;
            r.lineJoin = r.lineCap = "round";
            r.lineWidth = this.props.freeDrawingInfo.thickness;
            r.strokeStyle = ColorTypeConverter.getHtmlColor(this.props.freeDrawingInfo.showingStrokeColor);
            n.customData.points.push(t)
        };
        this.movingHandler.onMoving = (e, t, n) => {
            var r = this.canvasContext;
            var a = n.customData;
            var i = a.points;
            var o = a.maxRect;
            console.log(i.length);
            if (i.length > 0) r.clearRect(o.p1.x - 50, o.p1.y - 50, o.p2.x - o.p1.x + 100, o.p2.y - o.p1.y + 100);
            i.push(t);
            var s = FreeLineCorrector(i, .3);
            var l = s[0];
            var c = s[1];
            r.beginPath();
            r.moveTo(l.x, l.y);
            var d = 0;
            var h = s.length;
            for (; d < h; d++) {
                var u = Geometry.getMiddlePointLine(l, c);
                r.quadraticCurveTo(u.x, u.y, c.x, c.y);
                l = s[d];
                c = s[d + 1]
            }
            r.stroke();
            var p = Geometry.expandByMaxRectangleByPoint(o, t);
            n.customData.maxRect = p;
            n.customData.points = s
        };
        this.movingHandler.onMoved = (e) => {
            var t = e.customData;
            var n = t.maxRect;
            var r = t.points;
            if (! (r.length <= 1)) {
                var a = this.canvasContext;
                if (r.length > 0) a.clearRect(n.p1.x - 50, n.p1.y - 50, n.p2.x - n.p1.x + 100, n.p2.y - n.p1.y + 100);
                var i = Geometry.expandByMaxRectangleAround(n, 5);
                var s = Geometry.rectWidthHeight(i);
                var l = (new PathSimplifier(r)).simplify();
                console.log("total:", l.length);
                var c = {
                    id: DiagramIdHelper.nextDiagramCompositeShapeId(),
                    type: "free-drawing",
                    data: {
                        p1: i.p1,
                        p2: i.p2,
                        paths: l.map((e) => {
                            return {
                                p1: Geometry.absoluteToRelativePoint(i.p1, e.p1, s.width, s.height),
                                p2: Geometry.absoluteToRelativePoint(i.p1, e.p2, s.width, s.height),
                                cp: Geometry.absoluteToRelativePoint(i.p1, e.cp, s.width, s.height),
                                cp2: Geometry.absoluteToRelativePoint(i.p1, e.cp2, s.width, s.height)
                            }
                        })
                    },
                    style: {
                        thickness: this.props.freeDrawingInfo.thickness,
                        strokeColor: this.props.freeDrawingInfo.strokeColor
                    }
                };
                this.props.onCreateEntity(c)
            }
        }
    }
    componentDidMount() {
        jQuery(document).on("keydown", this.handleKeyDown)
    }
    componentWillUnmount() {
        jQuery(document).off("keydown", this.handleKeyDown)
    }
    render() {
        var e = this.props;
        var t = e.width;
        var n = e.height;
        return React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: this.handleMouseDown
        },
        React.createElement("canvas", {
            width: t,
            height: n,
            ref: this.getRef,
            style: _.assignIn({},
            nl, {
                width: t,
                height: n
            })
        }))
    }
}
var nl = {
    display: "block",
    position: "absolute",
    left: 0,
    top: 0,
    cursor: "crosshair"
};
/// var rl = n(245)/*hammer*/;  // 1 times
/// var al = n.n(rl);
var il = new class {
    constructor() {
        this.onRootTouchMoveMayPrevent = (e) => {
            if (e.handledMove) e.preventDefault()
        };
        this.onRootTouchStartMayPrevent = (e) => {
            if (e.handledTouchStart) {
                e.preventDefault();
                e.stopPropagation()
            }
        }
    }
    registerRootTouchEvent(e) {
        if (Global.isMobileOrTablet()) {
            var t = EventHelper.getFalsePassiveObject();
            e.addEventListener("touchstart", this.onRootTouchStartMayPrevent, t);
            e.addEventListener("touchmove", this.onRootTouchMoveMayPrevent, t)
        }
    }
    unregisterRootTouchEvent(e) {
        if (Global.isMobileOrTablet()) {
            e.removeEventListener("touchstart", this.onRootTouchStartMayPrevent);
            e.removeEventListener("touchmove", this.onRootTouchMoveMayPrevent)
        }
    }
    registerDoubleTap(e) {
        if (Global.isMobileOrTablet()) {
            var t = new Hammer(e, {
                touchAction: "auto",
                presets: ["tap"]
            });
            return t.on("tap", (e) => {
                if ("COVER-LAYER" == e.target.tagName) jQuery(e.target).trigger("request-editing", {
                    left: e.center.x,
                    top: e.center.y
                })
            }),
            t.get("tap").set({
                taps: 2
            }),
            t
        }
    }
    unregisterDoubleTap(e) {
        if (Global.isMobileOrTablet() && e) e.off("tap")
    }
};
var ol = {
    zIndex: 20,
    position: "absolute",
    background: "white",
    padding: 2,
    border: "1px solid lightgray",
    top: "100%",
    left: 0
};
var sl = {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "visible",
    width: "100%",
    height: "100%"
};
class ll extends React.Component {
    constructor(e) {
        super(e);
        this.state = {};
        this.movingHandler = new MovingHandler;
        this.didUnmount = false;
        this.handleGuideMoving = (e, t, n, r) => {
            var a = n.customData;
            var i = a.svgWidth;
            var o = a.svgHeight;
            n.customData = _.assignIn({},
            n.customData, {
                removeState: t.x < -10 || t.x > i + 10 || t.y < -10 || t.y > o + 10
            });
            this.props.onLineMoving(_.assignIn({},
            n.customData, {
                delta: e,
                isCtrl: r.ctrlKey
            }));
            this.setState({
                movingGuide: n.customData
            })
        };
        this.handleGuideMoved = () => {
            if (this.state.movingGuide) {
                if (this.state.movingGuide.removeState) return this.props.onLineRemove(),
                void(this.didUnmount || this.setState({
                    movingGuide: null
                }));
                this.props.onLineMoved();
                if (!this.didUnmount) this.setState({
                    movingGuide: null
                })
            }
        };
        this.handleGuideMouseDown = (e, t) => {
            var n = jQuery(ReactDOM.findDOMNode(this)).closest("svg").get(0);
            this.movingHandler.setBaseElement(n);
            var r = n.getBoundingClientRect();
            var a = {
                index: t,
                svgWidth: r.width,
                svgHeight: r.height,
                removeState: false
            };
            this.movingHandler.mouseDown(e, a);
            this.setState({
                movingGuide: a
            })
        };
        this.movingHandler.onMoving = this.handleGuideMoving;
        this.movingHandler.onMoved = this.handleGuideMoved
    }
    componentWillUnmount() {
        this.didUnmount = true
    }
    render() {
        var e = this.props.guides;
        return React.createElement("g", null, e.map((t) => {
            var n = "rgba(0,0,0,0.32)";
            return this.state.movingGuide && this.state.movingGuide.index === t.index && (n = "#4CAF50", this.state.movingGuide.removeState && (n = "red", t = e[t.index])),
            React.createElement(MouseDownEventAddRemove, {
                key: t.index,
                onTouchOrMouseDown: (e) => {
                    return this.handleGuideMouseDown(e, t.index)
                }
            },
            React.createElement("g", {
                style: {
                    cursor: this.props.cursor,
                    pointerEvents: "visiblePainted"
                }
            },
            React.createElement("line", {
                x1: t.p1.x,
                y1: t.p1.y,
                x2: t.p2.x,
                y2: t.p2.y,
                stroke: n,
                strokeWidth: 1
            }), React.createElement("line", {
                x1: t.p1.x,
                y1: t.p1.y,
                x2: t.p2.x,
                y2: t.p2.y,
                stroke: "transparent",
                strokeWidth: ShapeControlDistance.hiddenSelectLineWidth()
            })))
        }), this.renderNotice())
    }
    renderNotice() {
        if (this.state.movingGuide) return this.state.movingGuide.removeState ? React.createElement("text", {
            fontSize: "12",
            y: this.state.movingGuide.svgHeight + 15,
            x: "50%",
            textAnchor: "middle",
            fill: "red",
            stroke: "none"
        },
        "Release to remove") : React.createElement("text", {
            fontSize: "12",
            y: this.state.movingGuide.svgHeight + 15,
            x: "50%",
            textAnchor: "middle",
            fill: "orange",
            stroke: "none"
        },
        "Drag out to remove")
    }
}
class cl extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.didMount = false;
        this.handleGuideMoving = (e) => {
            var t = e.delta;
            var n = e.index;
            var r = e.isCtrl;
            var a = e.svgWidth;
            var i = this.props.guides[n];
            var o = i.x + t.x / this.props.scale;
            var s = _.assignIn({},
            i, {
                x: _.clamp(o, 1, a - 1)
            });
            var l = true;
            if (!r) {
                var c = this.props.model;
                var h = c.shapes.concat(TemporaryShapeCreator.getTemporaryShapes(this.props.getEditorGuideSnapInfo(), _.values(c.elements)));
                var p = GuideDetector.detectVerticalGuides([s], h);
                if (p) {
                    s.x = p.inputPoint.x;
                    this.props.onSnape(p.inputPoint);
                    l = false
                }
            }
            var m = PropUpdateHelper.setIndex(this.props.guides, n, s);
            if (e.removeState) l = true;
            if (l) this.props.onSnape(null);
            this.setState({
                movingGuide: {
                    newGuides: m,
                    index: n,
                    removeState: e.removeState
                }
            })
        };
        this.handleGuideMoved = () => {
            if (this.state.movingGuide) {
                this.props.onGuidesChanged(this.state.movingGuide.newGuides);
                this.props.onSnape(null)
            }
        };
        this.handleGuideRemove = () => {
            var e = PropUpdateHelper.remove(this.props.guides, this.state.movingGuide.index);
            this.props.onGuidesChanged(e)
        }
    }
    componentDidMount() {
        this.didMount = true
    }
    componentWillReceiveProps(e) {
        if (e.guides != this.props.guides && this.state.movingGuide) this.setState({
            movingGuide: null
        })
    }
    getGuides() {
        return this.state.movingGuide && !this.state.movingGuide.removeState ? this.state.movingGuide.newGuides : this.props.guides || []
    }
    getDiagramWidth() {
        if (!this.didMount) return 1E4;
        var e = ReactDOM.findDOMNode(this);
        return jQuery(e).closest("svg").width()
    }
    render() {
        var e = this.getGuides();
        var t = this.props;
        var n = t.scale;
        var r = t.viewportDelta;
        var i = e.map((e, t) => {
            var a = Geometry.round2(r.x + e.x * n);
            return {
                p1: {
                    x: a,
                    y: 0
                },
                p2: {
                    x: a,
                    y: "".concat(100, "%")
                },
                index: t
            }
        });
        return 1 != n && (i = i.filter((e) => {
            return e.p1.x >= 1 && e.p1.x <= this.getDiagramWidth()
        })),
        React.createElement(ll, {
            cursor: "col-resize",
            guides: i,
            onLineMoving: this.handleGuideMoving,
            onLineMoved: this.handleGuideMoved,
            onLineRemove: this.handleGuideRemove
        })
    }
}
class dl extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.didMount = false;
        this.handleGuideMoving = (e) => {
            var t = e.delta;
            var n = e.index;
            var r = e.isCtrl;
            var a = e.svgHeight;
            var i = this.props.guides[n];
            var o = i.y + t.y / this.props.scale;
            var s = _.assignIn({},
            i, {
                y: _.clamp(o, 1, a - 1)
            });
            var l = true;
            if (!r) {
                var c = this.props.model;
                var h = c.shapes.concat(TemporaryShapeCreator.getTemporaryShapes(this.props.getEditorGuideSnapInfo(), _.values(c.elements)));
                var p = GuideDetector.detectHorizontalGuides([s], h);
                if (p) {
                    s.y = p.inputPoint.y;
                    this.props.onSnape(p.inputPoint);
                    l = false
                }
            }
            var m = PropUpdateHelper.setIndex(this.props.guides, n, s);
            if (e.removeState) l = true;
            if (l) this.props.onSnape(null);
            this.setState({
                movingGuide: {
                    newGuides: m,
                    index: n,
                    removeState: e.removeState
                }
            })
        };
        this.handleGuideMoved = () => {
            if (this.state.movingGuide) {
                this.props.onGuidesChanged(this.state.movingGuide.newGuides);
                this.props.onSnape(null)
            }
        };
        this.handleGuideRemove = () => {
            var e = PropUpdateHelper.remove(this.props.guides, this.state.movingGuide.index);
            this.props.onGuidesChanged(e)
        }
    }
    componentDidMount() {
        this.didMount = true
    }
    componentWillReceiveProps(e) {
        if (e.guides != this.props.guides && this.state.movingGuide) this.setState({
            movingGuide: null
        })
    }
    getGuides() {
        return this.state.movingGuide && !this.state.movingGuide.removeState ? this.state.movingGuide.newGuides : this.props.guides || []
    }
    getDiagramHeight() {
        if (!this.didMount) return 1E4;
        var e = ReactDOM.findDOMNode(this);
        return jQuery(e).closest("svg").height()
    }
    render() {
        var e = this.getGuides();
        var t = this.props;
        var n = t.scale;
        var r = t.viewportDelta;
        var i = e.map((e, t) => {
            var a = Geometry.round2(r.y + e.y * n);
            return {
                p1: {
                    x: 0,
                    y: a
                },
                p2: {
                    x: "".concat(100, "%"),
                    y: a
                },
                index: t
            }
        });
        return 1 != n && (i = i.filter((e) => {
            return e.p1.y >= 1 && e.p1.y <= this.getDiagramHeight()
        })),
        React.createElement(ll, {
            cursor: "row-resize",
            guides: i,
            onLineMoving: this.handleGuideMoving,
            onLineMoved: this.handleGuideMoved,
            onLineRemove: this.handleGuideRemove
        })
    }
}
class hl extends React.Component {
    constructor() {
        super(...arguments);
        this.handleHorizontalGuidesChanged = (e) => {
            var t = _.assignIn({},
            this.props.model, {
                horizontalGuides: e
            });
            this.props.onModelChanged(t)
        };
        this.handleVerticalGuidesChanged = (e) => {
            var t = _.assignIn({},
            this.props.model, {
                verticalGuides: e
            });
            this.props.onModelChanged(t)
        }
    }
    render() {
        return React.createElement("svg", {
            style: sl,
            className: "role-guides no-print"
        },
        this.renderVerticalGuides(), this.renderHorizontalGuides())
    }
    renderVerticalGuides() {
        var e = this.props;
        var t = e.showGuide;
        var n = e.scale;
        var r = e.model;
        if (t) return React.createElement(cl, {
            getEditorGuideSnapInfo: this.props.requestEditorGuideSnapInfo,
            scale: n,
            viewportDelta: this.props.viewportDelta,
            onSnape: this.props.onSnapPointChanged,
            model: r,
            guides: r.verticalGuides,
            onGuidesChanged: this.handleVerticalGuidesChanged
        })
    }
    renderHorizontalGuides() {
        var e = this.props;
        var t = e.showGuide;
        var n = e.scale;
        var r = e.viewportDelta;
        var i = e.model;
        if (t) return React.createElement(dl, {
            getEditorGuideSnapInfo: this.props.requestEditorGuideSnapInfo,
            scale: n,
            viewportDelta: r,
            onSnape: this.props.onSnapPointChanged,
            model: i,
            guides: i.horizontalGuides,
            onGuidesChanged: this.handleHorizontalGuidesChanged
        })
    }
}
/// var ul = n(136)/*Serialization*/;  // 2 times
/// var pl = n(76)/*MobileTabletClasses*/;  // 1 times
/// var ml = n(147)/*EntityChanger*/;  // 6 times
/// var fl = n(174)/*SwitchCaseError*/;  // 2 times
var gl = new class {
    diffModelWithState(e, t) {
        return {
            type: "map-diff",
            updates: [{
                key: "shapes",
                value: this.diffEntities(e.shapes, t.shapes, void 0)
            },
            {
                key: "elements",
                value: this.diffElements(e.elements, t.elements)
            },
            {
                key: "verticalGuides",
                value: this.diffEntities(e.verticalGuides, t.verticalGuides, "guide")
            },
            {
                key: "horizontalGuides",
                value: this.diffEntities(e.horizontalGuides, t.horizontalGuides, "guide")
            }].filter((e) => {
                return e.value && e.value.updates && e.value.updates.length > 0
            })
        }
    }
    diffElements(e, t) {
        e = e || {};
        t = t || {};
        var n = _.keys(e);
        var r = [];
        return n.forEach((n) => {
            if (!t[n]) throw this.getError();
            if (e[n] != t[n]) {
                var a = this.diffEntity(e[n], t[n], void 0);
                if (a) r.push({
                    key: n,
                    value: a
                })
            }
        }),
        {
            type: "map-diff",
            updates: r
        }
    }
    diffEntities(e, t, n) {
        if (t = t || [], (e = e || []).length != t.length) throw this.getError();
        var r = {
            type: "entity-list-diff",
            updates: []
        };
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a];
            var o = t[a];
            if ( !! i != !!o) throw this.getError();
            if (i != o) r.updates.push({
                id: i.id,
                value: this.diffEntity(i, o, n)
            })
        }
        return r
    }
    getRawDiffOnObject(e, t, n) {
        e = e || {};
        t = t || {};
        var r = _.uniq(_.keys(e).concat(_.keys(t)));
        var a = [];
        return r.forEach((r) => {
            if (! (n && n.includes(r))) if (e[r] != t[r]) a.push({
                key: r.toString(),
                value: {
                    type: "raw-data",
                    value: t[r]
                }
            })
        }),
        a
    }
    getGeneralEntityDiff(e, t, n) {
        var r = ["id", "realId", "style", "settings", "type"];
        if (n) r = r.concat(n);
        var a = this.getRawDiffOnObject(e, t, r);
        var i = this.getStylesAndSettingsDiff(e, t);
        return {
            type: "map-diff",
            updates: a.concat(i)
        }
    }
    getStylesAndSettingsDiff(e, t) {
        var n = [];
        return ["style", "settings"].forEach((r) => {
            if (e[r] != t[r]) {
                var a = this.getRawDiffOnObject(e[r], t[r]);
                if (a && a.length > 0) n.push({
                    key: r,
                    value: {
                        type: "map-diff",
                        updates: a
                    }
                })
            }
        }),
        n
    }
    diffGroupEntity(e, t) {
        return {
            type: "map-diff",
            updates: this.getGeneralEntityDiff(e, t, ["entities"]).updates.concat({
                key: "entities",
                value: this.diffEntities(e.entities, t.entities, void 0)
            })
        }
    }
    getTextDiff(e, t) {
        return e.shape === t.shape ? {
            type: "map-diff",
            updates: []
        } : {
            type: "map-diff",
            updates: [{
                key: "shape",
                value: this.getGeneralEntityDiff(e.shape, t.shape)
            }]
        }
    }
    diffEntity(e, t, n) {
        if (e.id != t.id) throw this.getError();
        if ("guide" == n) return this.getGeneralEntityDiff(e, t);
        var r = EntityUtils.getEntityType(e);
        if (r != EntityUtils.getEntityType(t)) throw this.getError();
        switch (r) {
        case "connection":
            return this.getGeneralEntityDiff(e, t);
        case "diagram":
            case "temporary":
            throw this.getError();
        case "intersection":
            return this.getGeneralEntityDiff(e, t);
        case "group":
            return this.diffGroupEntity(e, t);
        case "linked":
            return {
                type: "map-diff",
                updates: []
            };
        case "shape-arrow":
            case "shape-composite":
            case "shape-object":
            return this.getGeneralEntityDiff(e, t);
        case "text":
            return this.getTextDiff(e, t);
        default:
            Object(SwitchCaseError)(r)
        }
    }
    getError() {
        return new Error("Unsupported diff from state")
    }
};
var yl = new class {
    mergeStateDiffWithModel(e, t) {
        return this.mergeMapDiff(e, t)
    }
    mergeMapDiff(e, t) {
        if (!t || !t.updates || t.updates.length <= 0) return e;
        e = e || {};
        var n = _.clone(e);
        return t.updates.forEach((t) => {
            n[t.key] = this.mergeOn(e[t.key], t.value)
        }),
        n
    }
    mergeListDiff(e, t) {
        if (!t || !t.updates || t.updates.length <= 0) return e;
        e = e || [];
        var n = _.clone(e);
        return t.updates.forEach((t) => {
            if (t.index >= n.length) console.warn("index out of bound on merging");
            else n[t.index] = this.mergeOn(e[t.index], t.value)
        }),
        n
    }
    mergeEntityListDiff(e, t) {
        if (!t || !t.updates || t.updates.length <= 0) return e;
        e = e || [];
        var n = _.clone(e);
        return t.updates.forEach((t) => {
            var r = e.findIndex((e) => {
                return e.id === t.id
            });
            if (r < 0) console.warn("could not found with id:", t.id);
            else n[r] = this.mergeOn(e[r], t.value)
        }),
        n
    }
    mergeOn(e, t) {
        switch (t.type) {
        case "entity-list-diff":
            return this.mergeEntityListDiff(e, t);
        case "list-diff":
            return this.mergeListDiff(e, t);
        case "map-diff":
            return this.mergeMapDiff(e, t);
        case "raw-data":
            return t.value;
        default:
            Object(SwitchCaseError)(t)
        }
    }
};
var Al = new class {
    merge(e, t, n) {
        try {
            var r = gl.diffModelWithState(t, n);
            return yl.mergeStateDiffWithModel(e, r)
        } catch(t) {
            return console.warn("There is some problem on diffing with state!!!"),
            console.warn(t),
            e
        }
    }
};
/// var El = n(96)/*BatchedUpdates*/;  // 2 times
var vl = new class {
    assignIds(e) {
        if (! (!e || e.length <= 0 || null != e[0].id)) e.forEach((e, t) => {
            e.id = DiagramIdHelper.nextDiagramGuideId(t)
        })
    }
    assignIdsForGuides(e) {
        this.assignIds(e.verticalGuides);
        this.assignIds(e.horizontalGuides)
    }
};
class Sl {
    constructor(e) {
        this.selectedIds = e;
        this.idInEntityGroupSet = new Set;
        this.selectedIds = this.selectedIds || [];
        this.idSet = new Set(this.selectedIds)
    }
    isSingleSelected(e) {
        return 1 === this.selectedIds.length && this.selectedIds[0] == e
    }
    isInGroupSelected(e) {
        return 1 != this.selectedIds.length && this.idSet.has(e)
    }
    isAnySelected(e, t) {
        return this.idSet.has(e) || !!t && this.idInEntityGroupSet.has(e)
    }
    addSelectedIdInEntityGroup(e) {
        this.idInEntityGroupSet.add(e)
    }
}
var Cl = new class {
    process(e, t, n) {
        if (n.isNextCycleLastRendering()) {
            var r = jQuery("<div/>").css("position", "absolute").css("class", "init-diagram-layer-loading").css("background", t).css("z-index", "2").css("width", "100%").css("height", "100%").css("left", "0").css("top", "0");
            jQuery(e).append(r);
            setTimeout(() => {
                jQuery(r).fadeOut(() => {
                    r.remove()
                })
            },
            300)
        }
    }
};
var xl = null;
class Il extends js {
    constructor(e) {
        var t;
        super(e);
        t = this;
        this.handleShapeMoveStarted = (e, t, n) => {
            if (!this.isSelectModeOnly()) this.initDataForMoving(n, e.altKey)
        };
        this.handleShapeMoving = (e, t, n, r) => {
            if (!this.isSelectModeOnly()) if (n.customData) if (n.customData.requestDuplicate) console.log("request duplicated!");
            else this.processShapeMoving(e, n, r.ctrlKey)
        };
        this.handleShapeMoved = () => {
            this.submitDataFromState()
        };
        this.handleRectangelSelect = (e) => {
            if (this.state.showSelectionOverlayFor) this.setState({
                showSelectionOverlayFor: void 0
            });
            var t = SnapToGridSize.getShapeIdsIntersectWithRect(e, this.props.data, this.refMap, this.zoomRef, this.state.zoom);
            if (t && 0 != t.length) if (1 != t.length) this.selectedOf.selectGroup(t);
            else this.selectedOf.select(t[0])
        };
        this.handleFinderAddConnection = (e) => {
            this.raiseDataChanged(ShapeConnectionHelper.addNewConnection(e, this.getCacheableData()))
        };
        this.handleShaprsOrderChanged = (e) => {
            var t = PropUpdateHelper.setProp(this.getCacheableData(), "shapes", e);
            this.raiseDataChanged(t)
        };
        this.handleEntityMoving = (e) => {
            var t = EntityUtils.getEntityType(e);
            if ("text" == t) this.setState({
                data: PropUpdateHelper.setFromProps(this.props.data, ["elements", e.id], e)
            });
            if ("connection" == t) this.setState({
                data: EntityChanger.setConnectionInData(this.getCacheableData(), e)
            });
            if (! ("shape-arrow" != t && "shape-object" != t && "shape-composite" != t)) this.setState({
                data: EntityChanger.setShapeInData(this.getCacheableData(), e)
            })
        };
        this.handleEntityMoved = () => {
            this.submitDataFromState()
        };
        this.onDiagramMouseDown = (e) => {
            if ((this.state.showSelectionOverlayFor || !EventHelper.isTouchEvent(e) || !Global.isMobileOrTablet()) && EventHelper.isLeftButtonOrTouch(e)) {
                var t = EventHelper.getCustomEventInfo(e);
                if (! (t && t.requestCursorSelect)) {
                    EventHelper.setCustomInfo(e, CursorHandler.getBuilder(t).withHandledCursorSelected().build());
                    if (! (e.target != this.mainSvg && "DG-SELECTION-OVERLAY" != e.target.tagName)) {
                        this.selectedOf.selectDiagram();
                        this.selectionLayer.setMouseDown(e);
                        e.stopPropagation();
                        e.preventDefault()
                    }
                }
            }
        };
        this.onConnectionPointMouseDown = (e) => {
            this.connectionFinder.startAt(e.shape.data.p, e)
        };
        this.handleRequestTikzExport = () => {
            var e = _s.convertModel(this.props.data);
            this.context.requestExportDialog(e)
        };
        this.handleEntitiesChanging = (e, t) => {
            this.changeEntities(e, true, t)
        };
        this.handleEntitiesChanged = (e, t) => {
            this.changeEntities(e, false, t)
        };
        this.handleGroupBoxEntitiesChanging = (e) => {
            this.handleEntitiesChanging(e)
        };
        this.handleGroupBoxEntitiesChanged = (e) => {
            this.handleEntitiesChanged(e)
        };
        this.onDiagramModelChanged = (e, t) => {
            if (t) BatchedUpdates. in (() => {
                this.props.onDataChanged(e);
                var n = _.assignIn({},
                this.props.selected, {
                    controlSelectedInfo: {
                        selectedIds: t
                    }
                });
                this.props.onSelectedChanged(n)
            });
            else this.props.onDataChanged(e)
        };
        this.handleRequestChangeImage = (e) => {
            this.context.requestImageSelection(e.data.url, (e, t) => {
                var n = _.assignIn({},
                t, {
                    data: _.assignIn({},
                    t.data, {
                        url: e
                    })
                });
                this.changeEntities([n], false, null)
            },
            e)
        };
        this.handleFreeDrawingChanged = (e) => {
            xl = e;
            this.setState({
                freeDrawingInfo: e
            })
        };
        this.handleEditorDidUpdate = () => {
            this.getBatchUpdater().requestAfterProcess(() => {
                ReactDOM.unstable_batchedUpdates(() => {
                    this.editorUpdateNotifier.notify()
                })
            })
        };
        this.onAddNewItem = (e, t) => {
            if (this.state.freeDrawingInfo && this.setState({
                freeDrawingInfo: null
            }), "text" == e) {
                var n = t;
                var r = PropUpdateHelper.setFromProps(this.props.data, ["elements", t.id], t);
                this.raiseDataChanged(r);
                var a = {
                    key: t.id,
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                };
                var i = {
                    key: t.id,
                    selected: {
                        lineIndex: 0,
                        charIndex: n.lines[0].blocks[0].text.length
                    }
                };
                return this.props.onSelectedChanged(a),
                void TimerHelper.next(() => {
                    this.props.onSelectedChanged(i, {
                        isExtendingSelection: true
                    })
                })
            }
            if ("shape-composite" == e && "image" == t.type) {
                var o = t;
                if (!o.data.url) return void this.context.requestImageSelection("", (e, t) => {
                    t.data.url = e;
                    this.onAddNewItem("shape-composite", t)
                },
                o)
            }
            if (! ("shape-arrow" != e && "shape-object" != e && "shape-composite" != e)) this.addNewShape(t)
        };
        this.onAddIntersections = (e) => {
            var t = this.props.data.intersections;
            e.forEach((e) => {
                return t = IntersectionEntityHelper.addEntity(t, e)
            });
            this.raiseDataChanged(PropUpdateHelper.setProp(this.props.data, "intersections", t))
        };
        this.onRemoveIntersection = (e) => {
            var t = this.props.data.intersections;
            e.forEach((e) => {
                return t = IntersectionEntityHelper.removeEntity(t, e)
            });
            this.raiseDataChanged(PropUpdateHelper.setProp(this.props.data, "intersections", t))
        };
        this.onDeleteEntities = (e) => {
            var t = this.selectedOf.getPropSelectedIdsOrEmpty();
            if (t.length <= 0) {
                if (e) this.context.requestDelete()
            } else {
                var n = EntityHelper.removeEntitiesAndRelating(this.props.data, t);
                if (n != this.props.data) {
                    this.clearAllSelectedState();
                    this.raiseDataChanged(n)
                }
            }
        };
        this.handleRemoveControlPoint = () => {
            this.selectedOf.setSubSelection(null)
        };
        this.handleSubSelectionChanged = (e) => {
            this.selectedOf.setSubSelection(e)
        };
        this.handleEntitySelect = (e, t) => {
            if (EventHelper.isLeftButton(e) || EventHelper.isTouchEvent(e)) {
                this.selectedOf.select(t.id, e);
                this.movingHandler.mouseDown(e, null, this.getDiagramReverseScale())
            }
        };
        this.handleGroupBoxMouseDown = (e) => {
            if (EventHelper.isLeftButton(e) || EventHelper.isTouchEvent(e)) this.movingHandler.mouseDown(e, null, this.getDiagramReverseScale())
        };
        this.handleRequestTouchSelection = () => {
            this.setState({
                showSelectionOverlayFor: "select"
            })
        };
        this.handleRequestFreeDrawing = () => {
            if (1 != this.state.zoom) this.resetZoom();
            this.selectedOf.selectDiagram();
            if (this.state.freeDrawingInfo) this.setState({
                freeDrawingInfo: null
            });
            else if (xl) this.setState({
                freeDrawingInfo: xl
            });
            else this.setState({
                freeDrawingInfo: {
                    thickness: 4,
                    strokeColor: "rgb(0,0,0)",
                    showingStrokeColor: this.context.fixedContextHandler.getDefaultBorderColor()
                }
            })
        };
        this.handleRequestEditorInfo = () => {
            return this.context.getEditorInfo()
        };
        this.handleSnapPointChanged = (e) => {
            var t = this.state.snapPoints;
            if (! (null == t && null == e || t && 1 === t.length && t[0] == e)) if (null != e) this.setState({
                snapPoints: [e]
            });
            else this.setState({
                snapPoints: null
            })
        };
        this.handleExpanderMouseDown = (e) => {
            if (!this.expanderMovingHandler.baseElement) {
                var t = this.context.getEditorInfo();
                this.expanderMovingHandler.setBaseElement(t.mathTypeRef);
                this.expanderMovingHandler.onMoving = (e, t, n, r) => {
                    var a = EventHelper.getLeftTopFromEvent(r);
                    this.expanderLine.setInfo(this.mathDiagram, {
                        x: a.left,
                        y: a.top
                    })
                };
                this.expanderMovingHandler.onMoved = (e) => {
                    if (e.didMove) {
                        var t = ItemDefaultSettings.setSetting(this.getCacheableData(), "diagramHeight", this.expanderLine.getHeight());
                        this.raiseDataChanged(t)
                    }
                    this.setState({
                        showingExpanderLine: false
                    })
                }
            }
            this.expanderMovingHandler.mouseDown(e, null, this.getReverseScale());
            this.setState({
                showingExpanderLine: true
            })
        };
        this.handleAddNewEntity = (e) => {
            this.addNewShape(e, false)
        };
        this.onPlotShapeChanged = (e) => {
            var t = EntityChanger.changeEntitiesInData(this.props.data, [e]);
            this.raiseDataChanged(t, {
                focusAcquired: true
            })
        };
        this.handleRequestSettingMode = () => {
            if (this.props.selected) {
                var e = _.assignIn({},
                this.props.selected, {
                    controlSelectedInfo: _.assignIn({},
                    this.props.selected.controlSelectedInfo, {
                        subSelection: {
                            type: "plot"
                        }
                    })
                });
                this.props.onSelectedChanged(e)
            }
        };
        this.handleCompositeShapeChanged = (e) => {
            var t = EntityChanger.changeEntitiesInData(this.props.data, [e]);
            this.raiseDataChanged(t, {
                focusAcquired: true
            })
        };
        this.handleZoomChanged = (e) => {
            if (! (e < 1 || e > 5)) {
                var t = this.adjustViewPortForNewZoom(this.state.zoom, e, this.state.viewPortDelta);
                this.setState({
                    zoom: e,
                    viewPortDelta: this.clampDelta(t, e)
                })
            }
        };
        this.handleVerticalGuideAdding = () => {
            var e = this.getCacheableData();
            var t = _.assignIn({},
            e, {
                verticalGuides: (e.verticalGuides || []).concat({
                    id: DiagramIdHelper.nextDiagramGuideId(),
                    x: this.getGuideRandom()
                })
            });
            this.raiseDataChanged(t)
        };
        this.handleHorizontalGuideAdding = () => {
            var e = this.getCacheableData();
            var t = _.assignIn({},
            e, {
                horizontalGuides: (e.horizontalGuides || []).concat({
                    id: DiagramIdHelper.nextDiagramGuideId(),
                    y: this.getGuideRandom()
                })
            });
            this.raiseDataChanged(t)
        };
        this.handleGuideShow = (e) => {
            this.setState({
                showGuide: e
            })
        };
        this.handleEntitiesChangingForGroup = function (e, n) {
            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            var a = t.gatherChangedEntitiesForGroup(e, n);
            t.changeEntities(a, true, {
                focusAcquired: r
            })
        };
        this.handleEntitiesChangedForGroup = function (e, n) {
            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            var a = t.gatherChangedEntitiesForGroup(e, n);
            if (r) t.changeEntities(a, false, {
                focusAcquired: true
            });
            else t.changeEntities(a, false, {
                focusAcquired: r
            })
        };
        this.onSelectionLayerMove = (e) => {
            if (this.state.viewPortDelta) this.setState({
                viewPortDelta: this.clampDelta(Geometry.addPoint(this.state.viewPortDelta, e))
            });
            else this.setState({
                viewPortDelta: this.clampDelta(e)
            })
        };
        this.getZoomRef = () => {
            return this.zoomRef
        };
        this.onDiagramFocus = (e) => {
            e.stopPropagation()
        };
        this.getEditorGuideSnapInfo = () => {
            return {
                refMap: this.refMap,
                baseElement: this.zoomRef,
                scale: this.state.zoom
            }
        };
        this.handleMathDiagramDoubleClick = (e) => {
            if (this.isDiagramControledSelected()) e.stopPropagation()
        };
        this.containerClassName = "math-diagram";
        this.selectedOf = new tr(this);
        this.diagramRefs = new nr(this);
        this.movingHandler = new MovingHandler;
        this.expanderMovingHandler = new MovingHandler;
        this.movingHandler.onMoving = this.handleShapeMoving;
        this.movingHandler.onMoved = this.handleShapeMoved;
        this.movingHandler.onMovingStarted = this.handleShapeMoveStarted;
        this.role = "img"
    }
    duplicateSelectedEntities() {
        var e = this.selectedOf.getPropSelectedIdsOrEmpty();
        if (e.length <= 0) return {
            block: this.props.data,
            selected: this.props.selected
        };
        var t = EntityHelper.extractSelectedEntities(this.props.data, e);
        var n = [CreateEditorObject.createLineFromBlock(t)];
        var r = Serialization.stringifyStripId(n);
        var a = Serialization.anyParse(r);
        return EntityHelper.mergeLines(a, this.props.data, this.props.selected, {
            keepPosition: true
        })
    }
    initDataForMoving(e, t) {
        if (t) {
            var n = this.duplicateSelectedEntities();
            var r = n.block;
            var a = n.selected;
            return BatchedUpdates. in (() => {
                this.raiseDataChanged(r);
                this.props.onSelectedChanged(a)
            }),
            void TimerHelper.next(() => {
                return this.initDataForMoving(e, false)
            })
        }
        var i = this.props.data;
        var s = this.selectedOf.singleSelectedEntityId() ? [this.selectedOf.entity()] : this.selectedOf.groupEntities() || [];
        if (! (s.length <= 0)) {
            var l;
            var c = 1 === s.length && (EntityUtils.isGeneralShape(s[0]) || DiagramIdHelper.isDiagramEditorId(s[0].id)) && ItemDefaultSettings.getSettings(i, "snapToOtherShapes");
            var d = SnapToGridSize.getGridSizeIfSnapEnabled(i);
            if (c) {
                var h = s[0];
                l = i.shapes.filter((e) => {
                    return e.id != h.id
                })
            }
            e.customData = {
                movingEntities: s,
                gridSize: d,
                otherShapesToSnap: l,
                isSnapToShapes: c,
                groupBox: EntityFinder.getFromEntities(s, {
                    editors: i.elements,
                    editorRef: this.refMap
                },
                this.getReverseScale())
            }
        }
    }
    processShapeMoving(e, t, n) {
        var r = this.props.data;
        var a = t.customData;
        var i = {
            shapesToSnap: !n && a.isSnapToShapes ? a.otherShapesToSnap : [],
            snapToGridSize: n ? 0 : a.gridSize,
            groupBox: a.groupBox,
            vGuidesToSnap: n ? [] : r.verticalGuides || [],
            hGuidesToSnap: n ? [] : r.horizontalGuides || [],
            editorGuideSnapInfo: {
                refMap: this.refMap,
                baseElement: this.zoomRef,
                scale: this.state.zoom
            },
            scale: this.state.zoom
        };
        if (!this.state.showGuide) {
            i.vGuidesToSnap = [];
            i.hGuidesToSnap = []
        }
        var o = EntityHelper.moveEntities(this.props.data, a.movingEntities, e, i);
        this.setState({
            data: o.diagram,
            snapPoints: o.snapPoints
        })
    }
    shouldNotMoveInNestedEditor() {
        return true
    }
    submitDataFromState() {
        if (this.state.data) {
            console.log("submit data from state");
            var e = this.state.data;
            this.setState({
                data: null,
                snapPoints: null
            },
            () => {
                this.raiseDataChanged(e)
            })
        }
    }
    clearAllSelectedState() {
        this.selectedOf.selectDiagram()
    }
    componentWillReceiveProps(e) {
        if (e.data != this.props.data && this.state.data) {
            var t = Al.merge(e.data, this.props.data, this.state.data);
            this.setState({
                data: t
            })
        }
        if (!e.selected && this.props.selected) {
            if (1 != this.state.zoom || this.state.viewPortDelta) this.resetZoom();
            if (this.state.freeDrawingInfo) this.stopFreeDrawing();
            if (this.state.data) this.submitDataFromState()
        }
    }
    stopFreeDrawing() {
        this.setState({
            freeDrawingInfo: null
        })
    }
    resetZoom() {
        this.setState({
            zoom: 1,
            viewPortDelta: null
        })
    }
    componentDidMount() {
        this.requestDiagramSettings();
        this.diagramRefs.notifyDiagramMounted();
        this.renderEntityBar();
        var e = ReactDOM.findDOMNode(this);
        il.registerRootTouchEvent(e);
        this.doubleTapHammer = il.registerDoubleTap(e);
        Cl.process(e, this.context.fixedContextHandler.getMainThemeColor(), this.context.fixedContextHandler.getRenderingContext())
    }
    componentWillUnmount() {
        il.unregisterRootTouchEvent(ReactDOM.findDOMNode(this));
        il.unregisterDoubleTap(this.doubleTapHammer)
    }
    componentDidUpdate(e) {
        this.requestDiagramSettings();
        this.renderEntityBar()
    }
    requestRenderToolBarComponent(e) {
        this.context.requestRenderToolBarComponent(e)
    }
    requestDiagramSettings() {
        if (this.isDiagramControledSelected() && !this.isNestedSelected()) this.requestRenderToolBarComponent({
            type: "add",
            key: "DiagramSettings",
            component: React.createElement(Kn, {
                editorRefMap: this.refMap,
                scale: this.state.zoom,
                fixedContextHandler: this.context.fixedContextHandler,
                onEntitiesChangedForGroup: this.handleEntitiesChangedForGroup,
                onEntitiesChangingForGroup: this.handleEntitiesChangingForGroup,
                requestTikzExport: this.handleRequestTikzExport,
                freeDrawingInfo: this.state.freeDrawingInfo,
                isDisabled: this.isSelectModeOnly(),
                hidden: false,
                data: this.getCacheableData(),
                groupSelectedIds: this.selectedOf.groupIds(),
                onRemoveIntersections: this.onRemoveIntersection,
                onAddIntersections: this.onAddIntersections,
                onDeleteEntities: this.onDeleteEntities,
                diagramRef: this.mathDiagram,
                onEntitiesChanged: this.handleEntitiesChanged,
                onEntitiesChanging: this.handleEntitiesChanging,
                onShapesOrderChanged: this.handleShaprsOrderChanged,
                subSelection: this.selectedOf.getSubSelection(),
                onRemoveControlPoint: this.handleRemoveControlPoint,
                onDiagramModelChanged: this.onDiagramModelChanged,
                requestChangeImage: this.handleRequestChangeImage,
                onFreeDrawingInfoChanged: this.handleFreeDrawingChanged,
                entity: this.selectedOf.entity()
            })
        })
    }
    getBatchUpdater() {
        return this.context.fixedContextHandler.getBatchUpdater()
    }
    raiseDataChanged(e, t) {
        t = PropUpdateHelper.setProp(t || {},
        "isOneLineChanged", true);
        this.props.onDataChanged(e, t)
    }
    addNewShape(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        var n = this.props.data;
        if (null == n.shapes) n = PropUpdateHelper.setProp(n, "shapes", []);
        var r = n.shapes.concat([e]);
        this.raiseDataChanged(_.assignIn({},
        n, {
            shapes: r
        }));
        if (t) this.selectedOf.select(e.id)
    }
    getCacheableData() {
        return this.state.data || this.props.data
    }
    changeEntities(e, t, n) {
        var r = EntityChanger.changeEntitiesInData(this.getCacheableData(), e);
        if (t) this.setState({
            data: r
        });
        else {
            if (this.state.data) this.setState({
                data: null
            });
            this.raiseDataChanged(r, n)
        }
    }
    getDiagramReverseScale() {
        return 1 / this.state.zoom
    }
    renderEntityBar() {
        if (this.isDirectSelected() && this.isDiagramControledSelected()) this.context.requestRenderItemsBarComponent(React.createElement(Oe, {
            ref: this.diagramRefs.handleDiagramBarRef,
            onRequestEditorInfo: this.handleRequestEditorInfo,
            requestTouchSelection: this.handleRequestTouchSelection,
            onDeleteEntities: this.onDeleteEntities,
            freeDrawingSelected: !!this.state.freeDrawingInfo,
            isDisabled: this.isSelectModeOnly(),
            hidden: !this.isDiagramControledSelected(),
            onRequestFreeDrawing: this.handleRequestFreeDrawing,
            onAddNewItem: this.onAddNewItem
        }))
    }
    isNestedSelected() {
        return this.isDiagramControledSelected() && this.props.selected.selected
    }
    isDiagramControledSelected() {
        return this.props.selected && this.props.selected.controlled
    }
    renderDiagramControls() {
        return React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(hr, {
            isEditorEditing: this.state.isEditorEditing,
            onSnapPoint: this.handleSnapPointChanged,
            scale: this.state.zoom,
            viewPortDelta: this.state.viewPortDelta,
            hidden: !this.isDiagramControledSelected(),
            data: this.getCacheableData(),
            refMap: this.refMap,
            entity: this.selectedOf.entity(),
            onEntityMoving: this.handleEntityMoving,
            onEntityMoved: this.handleEntityMoved,
            subSelection: this.selectedOf.getSubSelection(),
            onSubSelectionChanged: this.handleSubSelectionChanged,
            ref: this.diagramRefs.handleDiagramControlsRef
        }))
    }
    renderExpanderLine() {
        if (this.state.showingExpanderLine) return React.createElement(Cr, {
            ref: (e) => {
                return this.expanderLine = e
            }
        })
    }
    renderDiagramExpander() {
        return this.isDiagramControledSelected() ? React.createElement("diagram-expander", {
            class: "no-print",
            style: (e = Global.isMobileOrTablet() ? 18 : 7, {
                display: "block",
                position: "absolute",
                left: "50%",
                bottom: -e / 2,
                border: "1px solid gray",
                background: "white",
                marginLeft: -e / 2,
                width: e,
                height: e,
                cursor: "ns-resize"
            }),
            onTouchStart: this.handleExpanderMouseDown,
            onMouseDown: this.handleExpanderMouseDown
        }) : null;
        var e
    }
    renderFreeStyleDrawingOverlay() {
        if (this.state.freeDrawingInfo && this.mathDiagram) return React.createElement(tl, {
            requestStopDrawing: () => {
                return this.stopFreeDrawing()
            },
            freeDrawingInfo: this.state.freeDrawingInfo,
            width: this.mathDiagram.clientWidth,
            height: this.mathDiagram.clientHeight,
            onCreateEntity: this.handleAddNewEntity
        })
    }
    renderPreventItemMoveLayer() {
        if (Global.isMobileOrTablet()) return this.props.selected ? void 0 : React.createElement("dg-prevent-item-layer", {
            onMouseDown: (e) => {
                this.selectedOf.selectDiagram();
                this.selectionLayer.setMouseDown(e)
            },
            style: {
                width: "100%",
                height: "100%",
                display: "block",
                position: "absolute",
                left: 0,
                top: 0
            }
        })
    }
    renderFunctionPlotInput() {
        var e = this.selectedOf.shape();
        if (e && "plot" == e.type) return React.createElement(ce, {
            shape: e,
            requestSettingMode: this.handleRequestSettingMode,
            onShapeChanged: this.onPlotShapeChanged
        })
    }
    adjustViewPortForNewZoom(e, t, n) {
        n = n || {
            x: 0,
            y: 0
        };
        var r = DOMHelper.getElementRect(this.mathDiagram);
        var a = r.width * e;
        var i = r.height * e;
        var o = r.width * t;
        var s = r.height * t;
        var l = this.selectedOf.entities(this.getCacheableData(), true);
        if (t > e && l && l.length > 0) {
            var c = EntityFinder.getFromEntities(l, {
                editors: this.getCacheableData().elements,
                editorRef: this.refMap
            },
            this.state.zoom);
            if (c) {
                var d = Geometry.scaleRectangle(c, t);
                var h = Geometry.getCenterPoint(d);
                var p = {
                    x: -(h.x - r.width / 2),
                    y: -(h.y - r.height / 2)
                };
                return {
                    x: _.clamp(p.x, n.x - (o - a), n.x),
                    y: _.clamp(p.y, n.y - (s - i), n.y)
                }
            }
        }
        return {
            x: n.x - (o - a) / 2,
            y: n.y - (s - i) / 2
        }
    }
    renderFreeDrawingControl() {
        if (this.state.freeDrawingInfo) return React.createElement("div", {
            style: ol
        },
        React.createElement(FindAndReplaceOptionsComponent, {
            preventDefault: true,
            stopPropagation: true,
            selectedKeys: [],
            onSelect: () => {
                return this.stopFreeDrawing()
            },
            items: [{
                key: "close-drawing",
                element: React.createElement("span", null, "Close Drawing")
            }]
        }))
    }
    getGuideRandom() {
        return Global.isTestEnv() ? 50 : _.random(30, 60)
    }
    hasAnyGuide() {
        var e = this.getCacheableData();
        return !! (e.horizontalGuides && e.horizontalGuides.length > 0) || !!(e.verticalGuides && e.verticalGuides.length > 0)
    }
    renderZoomControl() {
        if (!this.state.freeDrawingInfo) return this.isDiagramControledSelected() ? React.createElement(Us, {
            hasAnyGuide: this.hasAnyGuide(),
            showGuide: this.state.showGuide,
            onGuideShow: this.handleGuideShow,
            viewPortActionFor: this.state.showSelectionOverlayFor,
            requestViewPortFor: (e) => {
                return this.setState({
                    showSelectionOverlayFor: e
                })
            },
            zoom: this.state.zoom,
            onZoom: this.handleZoomChanged,
            onAddNewVerticalGuide: this.handleVerticalGuideAdding,
            onAddNewHorizontalGuide: this.handleHorizontalGuideAdding
        }) : void 0
    }
    renderGroupBox() {
        var e = this.selectedOf.groupEntities(this.getCacheableData(), true);
        if (e && !(e.length < 2)) return React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(wn, {
            entities: e,
            onGroupMouseDown: this.handleGroupBoxMouseDown,
            onEntitiesChanged: this.handleGroupBoxEntitiesChanged,
            onEntitiesChanging: this.handleGroupBoxEntitiesChanging,
            scale: this.state.zoom,
            diagram: this.getCacheableData(),
            editorRef: this.refMap,
            getRootElement: this.getZoomRef
        }))
    }
    gatherChangedEntitiesForGroup(e, t) {
        var n = DiagramEntityHelper.partitionShapeAndNonShapeEntities(e);
        var r = slicedToArray(n, 2);
        var a = r[0];
        var i = r[1];
        var o = _.assignIn({},
        this.getCacheableData(), {
            shapes: a
        });
        var s = EntityChanger.changeEntitiesInData(o, e);
        return [_.assignIn({},
        t, {
            entities: s.shapes
        }), ...i]
    }
    renderGroupBoxForGroupEntity() {
        var e = this.selectedOf.entity();
        if (e && DiagramIdHelper.isDiagramGroupId(e.id)) return React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(Xs, {
            groupEntity: e,
            onGroupMouseDown: this.handleGroupBoxMouseDown,
            onEntitiesChanged: this.handleEntitiesChangedForGroup,
            onEntitiesChanging: this.handleEntitiesChangingForGroup,
            scale: this.state.zoom,
            diagram: this.getCacheableData(),
            editorRef: this.refMap,
            getRootElement: this.getZoomRef
        }))
    }
    getZoomStyle() {
        if (this.props.selected && 1 != this.state.zoom) {
            var e = new TransformHelper;
            return this.state.viewPortDelta && (e = e.translate(this.state.viewPortDelta.x, this.state.viewPortDelta.y)),
            {
                transform: (e = e.scale(this.state.zoom)).toCssStyle(),
                transformOrigin: "0 0"
            }
        }
    }
    clampDelta(e, t) {
        if (!e) return e;
        var n = ReactDOM.findDOMNode(this);
        var r = DOMHelper.getElementRect(n);
        return t = t || this.state.zoom,
        {
            x: _.clamp(e.x, -(r.width * t - r.width), 0),
            y: _.clamp(e.y, -(r.height * t - r.height), 0)
        }
    }
    renderSnapIndicator() {
        if (this.state.snapPoints) return React.createElement(qs, {
            snapPoints: this.state.snapPoints,
            scale: this.state.zoom
        })
    }
    renderGuides() {
        if (this.hasAnyGuide() && this.isSelected()) return React.createElement(hl, {
            requestEditorGuideSnapInfo: this.getEditorGuideSnapInfo,
            scale: this.state.zoom,
            viewportDelta: this.state.viewPortDelta || {
                x: 0,
                y: 0
            },
            model: this.getCacheableData(),
            onSnapPointChanged: this.handleSnapPointChanged,
            onModelChanged: (e) => {
                return this.raiseDataChanged(e)
            },
            showGuide: this.state.showGuide && this.isSelected()
        })
    }
    alignShapes(e) {
        var t = EntityHelper.alignEntities(this.getCacheableData(), this.selectedOf.entities(), {
            editorRef: this.refMap,
            editors: this.getCacheableData().elements
        },
        this.state.zoom, e);
        this.raiseDataChanged(t)
    }
    getAriaLabel() {
        return (this.props.data.accessibility || {}).description || "Diagram"
    }
    renderComponent() {
        var e = this.getCacheableData();
        var t = new Sl(this.selectedOf.getPropSelectedIdsOrEmpty());
        vl.assignIdsForGuides(e);
        var n = {
            height: ItemDefaultSettings.getSettings(e, "diagramHeight"),
            zIndex: 1
        };
        if (this.isDiagramControledSelected()) {
            n.border = "1px solid lightgray";
            n.borderStyle = "dotted";
            n.zIndex = 2
        }
        var r = MobileTabletClasses.addMobileTabletClssIfRequired();
        var i = this.state.viewPortDelta ? _.assignIn({},
        sl, {
            transform: ColorHelper.buildTranslateStyleTransform(this.state.viewPortDelta.x, this.state.viewPortDelta.y)
        }) : sl;
        return React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: this.onDiagramMouseDown
        },
        React.createElement("math-diagram", {
            "aria-hidden": true,
            "data-amt": "diagram",
            onDoubleClick: this.handleMathDiagramDoubleClick,
            class: r,
            style: n,
            onFocus: this.onDiagramFocus,
            ref: this.diagramRefs.handleDiagramRef
        },
        React.createElement("clip-region", null, React.createElement("zoom-region", {
            ref: this.diagramRefs.getCachedRefMethod("ZoomRegion", (e) => {
                return this.zoomRef = e
            }),
            style: this.getZoomStyle()
        },
        React.createElement(Vn, {
            data: e,
            selected: this.props.selected,
            ref: this.diagramRefs.getCachedRefMethod("Grid", (e) => {
                return this.grid = e
            })
        }), React.createElement("svg", {
            className: "role-diagram-draw-area",
            ref: this.diagramRefs.getCachedRefMethod("MainSvg", (e) => {
                return this.mainSvg = e
            })
        },
        React.createElement(Ar, {
            ref: this.diagramRefs.handleDiagramShapesRef,
            fixedContextHandler: this.context.fixedContextHandler,
            singleSelectedId: this.selectedOf.shapeId() || this.selectedOf.intersectionId(),
            groupSelectedIds: this.selectedOf.groupIds(),
            selectionCarrier: t,
            remoteSelections: void 0,
            subSelection: this.selectedOf.getSubSelection(),
            selectIntersections: (e, t) => {
                return this.selectedOf.selectIntersection(e.id, t)
            },
            onSelect: this.handleEntitySelect,
            intersections: e.intersections || {
                items: []
            },
            onShapeChanged: this.handleCompositeShapeChanged,
            shapes: e.shapes || []
        }), React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(er, {
            refMap: this.refMap,
            fixedContextHandler: this.context.fixedContextHandler,
            getBaseElement: this.getZoomRef,
            isEditorEditing: this.state.isEditorEditing,
            singleSelectedId: this.selectedOf.connectionId(),
            groupSelectedIds: this.selectedOf.groupIds(),
            selectionCarrier: t,
            onMouseDown: this.handleEntitySelect,
            data: e,
            ref: this.diagramRefs.handleConnectionsRef,
            scale: this.state.zoom
        })), React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            updateOnlyByEditor: true,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(Jn, {
            ref: this.diagramRefs.handleEditorFramesRef,
            fixedContextHandler: this.context.fixedContextHandler,
            refMap: this.refMap,
            getBaseElement: this.getZoomRef,
            isEditorEditing: this.state.isEditorEditing,
            onConnectionPointMouseDown: this.onConnectionPointMouseDown,
            singleSelectedId: this.selectedOf.editorId(),
            scale: this.state.zoom,
            data: e
        })), React.createElement(Zn, {
            ref: this.diagramRefs.handleConnectionFinderRef,
            diagramModel: e,
            scale: this.state.zoom,
            refMap: this.refMap,
            addConnection: this.handleFinderAddConnection
        })), React.createElement(Se, {
            ref: this.diagramRefs.handleEditorsRef,
            data: e,
            singleSelectedId: this.selectedOf.editorId(),
            groupSelectedIds: this.selectedOf.groupIds(),
            selectionCarrier: t,
            onSelectItem: this.handleEntitySelect,
            onEditing: (e) => {
                return this.setState({
                    isEditorEditing: e
                })
            },
            editorDidUpdate: this.handleEditorDidUpdate,
            selected: this.props.selected,
            renderEditArea: (e, t) => {
                var n = ItemDefaultSettings.getTextSetting(e, "fontSize");
                var r = TextHelper.fontSizePercentageFromCommand(n);
                return t = _.assignIn({},
                t, {
                    fontSize: StyleHelper.getReactFontSizeStyle(n)
                }),
                React.createElement(EditArea, Object.assign({},
                this.buildMetaDataFromName(e.id, true), {
                    isTextMode: e.isTextMode,
                    insideDiagram: true,
                    style: t,
                    borderIfEmpty: true,
                    noAreaContainer: true,
                    isFirstMathModeLevel: true,
                    fontSize: r,
                    className: "diagram-editor"
                }))
            }
        })), React.createElement(Er, {
            scale: this.state.zoom,
            mode: 1 === this.state.zoom ? void 0 : this.state.showSelectionOverlayFor || "move",
            onMoving: this.onSelectionLayerMove,
            ref: this.diagramRefs.handleRectangleSelectionLayerRef,
            onRectangleSelect: this.handleRectangelSelect
        })), React.createElement("svg", {
            style: i,
            className: "no-print"
        },
        React.createElement(Qs, {
            editorUpdateNotifier: this.editorUpdateNotifier,
            fixedContextHandler: this.context.fixedContextHandler
        },
        React.createElement(ur, {
            isEditorEditing: this.state.isEditorEditing,
            scale: this.state.zoom,
            delta: this.state.viewPortDelta,
            refMap: this.refMap,
            entity: this.selectedOf.entity()
        })), this.renderDiagramControls(), this.renderSnapIndicator(), this.renderGroupBox(), this.renderGroupBoxForGroupEntity()), this.renderGuides(), this.renderDiagramExpander(), this.renderExpanderLine(), this.renderFreeStyleDrawingOverlay(), this.renderPreventItemMoveLayer(), this.renderFunctionPlotInput(), this.renderZoomControl(), this.renderFreeDrawingControl()))
    }
}
/*n.d(t, "DiagramSc", function () {
    return Tl
});*/
/*n.d(t, "Diagram", function () {
    return Il
});*/
class Tl extends CompositeSymbolBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return Il
    }
    getLatextName() {
        return "\\diagram"
    }
    getSymbol() {
        return "diagram"
    }
    getModelMeta() {
        return {
            noInnerRemove: true,
            noInnerInsert: true,
            text: this.getLatextName(),
            elements: {}
        }
    }
    getModel(e) {
        var t = super.getModel(e);
        return t.connections = [],
        t.intersections = {
            id: DiagramIdHelper.nextDiagramIntersectionId(),
            items: [],
            style: {}
        },
        t.shapes = [],
        t.settings = {
            grid: true
        },
        t.elements || (t.elements = {}),
        e && e.restrictedView && (t.settings.diagramHeight = 100),
        t
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 25,
            singleBlockLine: true,
            selectControlled: true,
            insertInTextModeOnly: true,
            renderSymbol: () => {
                return React.createElement("div", null, React.createElement("svg", {
                    style: {
                        width: 20,
                        height: 20,
                        transform: "translate(0px,3px)"
                    }
                },
                React.createElement("path", {
                    d: "M0,12 L15,12 M13,10 L 15,12 L13,14 M8,15 L8,0 M6,2 L8,0 L10,2",
                    stroke: "gray",
                    fill: "none"
                }), React.createElement("path", {
                    d: " M2,2 Q 8.5,20 13,2",
                    stroke: "gray",
                    fill: "none"
                })))
            }
        })
    }
    toModel(e, t, n) {
        return this.getModel()
    }
    toLatex(e, t) {
        return "latex-latex" == t.textType ? _s.convertModel(e) : ""
    }
}
var SymbolDiagram = new Tl

export { Tl as DiagramSc }

export { Il as Diagram }

export default SymbolDiagram