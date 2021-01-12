import _ from 'lodash';
import CheckObject from './Editor/CheckObject';
import CreateEditorObject from './Elements/CreateEditorObject';
import DiagramIdHelper from './Elements/DiagramIdHelper';
import FindEntityHelper from './Editor/FindEntityHelper';
import InitHelper from './InitHelper';
import TheoremHelper from './Mathcha/TheoremHelper';

/// xxx(136) /*Serialization*/

/// var r = n(6)/*DiagramIdHelper*/;  // 19 times
/// var a = n(2)/*lodash*/;  // 6 times
/// var i = n.n(a);
/// var o = n(32)/*InitHelper*/;  // 1 times
/// var s = n(122)/*TheoremHelper*/;  // 1 times
/// var l = n(86)/*FindEntityHelper*/;  // 1 times
/// var c = n(31)/*CheckObject*/;  // 1 times
/// var d = n(13)/*CreateEditorObject*/;  // 5 times
var Serialization = new class {
    constructor() {
        this.magicText = "/*!)-*&~n/";
        this.map = {};
        this.map["\u222b"] = "\\int";
        this.map["\u222c"] = "\\iint";
        this.map["\u222d"] = "\\iiint";
        this.map["\u222e"] = "\\oint";
        this.map["\u222f"] = "\\oiint";
        this.map["\u2230"] = "\\oiiint";
        this.map["\u2230"] = "\\oiiint";
        this.map["\u2192"] = "\\rightarrow";
        this.map["\u2190"] = "\\leftarrow";
        this.map["\u2211"] = "\\sum";
        this.map["\u220f"] = "\\prod";
        this.map["\u2210"] = "\\coprod";
        this.map["["] = "[";
        this.map["{"] = "{";
        this.map["("] = "(";
        this.map["}"] = "}";
        this.map["]"] = "]";
        this.map[")"] = ")"
    }
    cloneBlocks(e, t) {
        var n = {
            id: DiagramIdHelper.nextId(),
            lines: [{
                id: DiagramIdHelper.nextId(),
                blocks: e
            }]
        };
        var a = this.stringifyStripId(n);
        return this.anyParse(a, t).lines[0].blocks
    }
    stringifyForSave(e) {
        return e ? "string" == typeof e ? e : JSON.stringify(e, function (e, t) {
            if (! (e.length > 3 && "_" == e[0] && "_" == e[1] && "_" == e[2])) return t
        }) : null
    }
    stringifyStripId(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        return JSON.stringify(e, function (e, r) {
            if ("id" != e || "n" != r[0]) {
                if (t) return r;
                if (! (e.length > 3 && "_" == e[0] && "_" == e[1] && "_" == e[2])) return n && "theoremKey" == e && n.theoremKeys.push(r),
                r
            }
        })
    }
    parseFromSavedModel(e) {
        return JSON.parse(e)
    }
    parse(e, t) {
        return this.anyParse(e, t)
    }
    anyParse(e, t) {
        var n = {};
        var a = [];
        var o = JSON.parse(e, (e, o) => {
            return "lines" != e && "blocks" != e || o.forEach((e) => {
                return e.id = DiagramIdHelper.nextId()
            }),
            "elements" == e && _.values(o).forEach((e) => {
                if (!e.id) e.id = DiagramIdHelper.nextId()
            }),
            t ? o : (CheckObject.isDiagramBlock(o) && (o = this.regenerateNewIdForDiagram(o)), "tagInfo" == e && (n[o.tagId] = o), o && o.refTagId && (a[o.refTagId] ? a[o.refTagId].push(o) : a[o.refTagId] = [o]), o)
        });
        return this.handleTagRefMap(n, a),
        o
    }
    handleTagRefMap(e, t) {
        _.keys(e).forEach((n) => {
            var r = "tid" + Math.random();
            e[n].tagId = r;
            var a = t[n];
            if (a) a.forEach((e) => {
                e.refTagId = r
            })
        })
    }
    generateFunctionIdForPlot(e) {
        e.functions.forEach((e) => {
            return e.model.id = DiagramIdHelper.nextId()
        })
    }
    reasignShapesId(e, t) {
        e.forEach((e) => {
            var n = null;
            if (DiagramIdHelper.isDiagramCompositeShapeId(e.id)) {
                n = DiagramIdHelper.nextDiagramCompositeShapeId();
                if ("plot" == e.type) this.generateFunctionIdForPlot(e)
            } else if (DiagramIdHelper.isDiagramArrowId(e.id)) n = DiagramIdHelper.nextDiagramArrowId();
            else if (DiagramIdHelper.isDiagramShapeId(e.id)) n = DiagramIdHelper.nextDiagramShapeId();
            else if (DiagramIdHelper.isDiagramGroupId(e.id)) {
                n = DiagramIdHelper.nextDiagramGroupEntityId();
                this.reasignShapesId(e.entities, t)
            } else if (DiagramIdHelper.isDiagramLinkedId(e.id)) n = DiagramIdHelper.nextDiagramLinkedEntityId();
            t.intersections.items.forEach((t) => {
                if (t.entities.length > 1) throw new Error("not supported multiple intersections");
                if (t.entities[0] == e.id) t.entities[0] = n
            });
            e.id = n
        })
    }
    regenerateNewIdForDiagram(e) {
        var t = {};
        return _.keys(e.elements).forEach((n) => {
            var a = DiagramIdHelper.nextDiagramEditorId();
            e.connections.forEach((e) => {
                if (e.fromEditorId === n) e.fromEditorId = a;
                if (e.toEditorId === n) e.toEditorId = a
            });
            var i = e.elements[n];
            i.id = a;
            t[a] = i;
            var o = FindEntityHelper.findLinkWithLinkToEditor(n, e.shapes);
            if (o) o.linkedId = a
        }),
        e.connections.forEach((e) => {
            return e.id = DiagramIdHelper.nextDiagramConnectionId()
        }),
        this.reasignShapesId(e.shapes, e),
        e.intersections.items.forEach((e) => {
            return e.id = DiagramIdHelper.nextDiagramIntersectionId()
        }),
        e.elements = t,
        e
    }
    fromPasteText(e, t) {
        return _.startsWith(e, this.magicText) ? this.handleStructuredText(e.substr(this.magicText.length)) : this.handlePureText(e, t)
    }
    handlePureText(e, t) {
        if (t) {
            var n = e.replace(/\t/g, "  ").split(/[\r\n]/);
            return {
                isRoot: false,
                isTextMode: false,
                isTabularCellsSelected: false,
                isPureText: true,
                lines: _.map(n, (e) => {
                    return CreateEditorObject.createPureTextLine(e)
                })
            }
        }
        var r = e.length;
        var a = [];
        var o = CreateEditorObject.createEmptyLine();
        var s = CreateEditorObject.createTextBlock("");
        var l = (r = 0, e.length);
        for (; r < l; r++) {
            var c = e[r];
            if ("\t" != c) if ("\n" != c) {
                if ("\r" != c) {
                    var h = this.handleComposite(c);
                    if (h) {
                        if (s.text) o.blocks.push(s);
                        o.blocks.push(h);
                        s = CreateEditorObject.createTextBlock("")
                    } else s.text += c
                }
            } else {
                a.push(o);
                o = CreateEditorObject.createEmptyLine()
            } else s.text += "  "
        }
        return s.text && o.blocks.push(s),
        o.blocks.length > 0 && a.push(o),
        {
            isRoot: false,
            isTextMode: false,
            isTabularCellsSelected: false,
            isPureText: true,
            lines: a
        }
    }
    handleComposite(e) {
        var t = this.map[e];
        return t ? InitHelper.getModelByName(t) : null
    }
    handleStructuredText(e) {
        return this.parse(e)
    }
    toCopyText(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var r = {
            theoremKeys: []
        };
        var a = t.findInlineMathScope();
        var o = this.stringifyStripId(e, n, r);
        r.theoremKeys = _.uniq(r.theoremKeys);
        var l = {
            isRoot: t.isRootLineSelected(),
            isTextMode: t.isTextModeSelected(),
            isTabularCellsSelected: t.isTabularCellsSelected(),
            isPureText: false,
            insideInlineMath: !!a,
            lines: "********to-be-replace***********",
            rootEditorId: t.model.id,
            inlineMathDisplayStyle: a && a.style && "\\displaystyle" == a.style.mathModeType
        };
        return r.theoremKeys.length > 0 && (l.theoremInfo = {
            theorems: TheoremHelper.getTheoremsByKeys(r.theoremKeys, t.model.theoremInfo)
        }),
        this.magicText + this.stringifyStripId(l, n).replace('"********to-be-replace***********"', o)
    }
    asignIdForLines(e) {
        return e.forEach((e) => {
            return e.id = DiagramIdHelper.nextId()
        }),
        e
    }
}

export default Serialization