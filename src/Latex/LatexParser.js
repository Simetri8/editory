import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import CheckComponent from '../Editor/CheckComponent';
import CheckObject from '../Editor/CheckObject';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import InitHelper from '../InitHelper';
import LatexParserCore from './LatexParserCore';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(465) /*LatexParser*/

/// var r = n(2)/*lodash*/;  // 11 times
/// var a = n.n(r);
/// var i = n(32)/*InitHelper*/;  // 2 times
/// var o = n(18)/*StyleHelper*/;  // 2 times
/// var s = n(22)/*CheckComponent*/;  // 1 times
/// var l = n(6)/*DiagramIdHelper*/;  // 3 times
/// var c = n(13)/*CreateEditorObject*/;  // 3 times
/// var h = n(12)/*BlockHelper*/;  // 1 times
/// var u = n(708)/*LatexParserCore*/;  // 1 times
/// var p = n.n(u);
/// var m = n(31)/*CheckObject*/;  // 1 times
/*n.d(t, "a", function () {
    return f
});*/
var d = new class {
    constructor() {
        this.processLines = this.processLines.bind(this)
    }
    processLines(e) {
        var t;
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var r = e;
        var i = [];
        var o = false;
        for (; r.length > 0;) {
            var l = r.shift();
            if ("" != l) if (_.isArray(l)) r = l.concat(r);
            else {
                if (_.isString(l)) {
                    if (o = true, l = CreateEditorObject.createPureTextLine(l), i.length <= 0) {
                        i.push(l);
                        continue
                    }
                    t = _.last(i);
                    var d = _.last(t.blocks);
                    if (d && d.type == null) {
                        _.last(t.blocks).text += l.blocks[0].text;
                        continue
                    }
                    t.blocks = t.blocks.concat(l.blocks[0])
                }
                var h = this.processLine(l, n);
                if (o && 0 === l.blocks.length) o = false;
                else if (o && i.length > 0) {
                    (t = _.last(i)).blocks = t.blocks.concat(l.blocks);
                    o = false
                } else {
                    o = false;
                    i.push(h)
                }
            }
        }
        if (n) return i;
        var u = this.handleOneGroup(i);
        return u || i
    }
    processLine(e, t) {
        if (_.isString(e)) return e;
        var n = [];
        var r = e.blocks;
        var i = {
            isChoose: false,
            isOver: false,
            displayStyle: false,
            textStyle: false
        };
        for (; r.length > 0;) {
            var s = r.shift();
            if (s && ("" != s.text || s.type)) if (t) n.push(s);
            else {
                if ("unknown-command" == s.type && "\\choose" == s.text) {
                    if (i.isChoose) continue;
                    i.isChoose = true
                }
                if ("unknown-command" == s.type && "\\over" == s.text) {
                    if (i.isOver) continue;
                    i.isOver = true
                }
                if ("unknown-command" != s.type || "\\displaystyle" != s.text) if ("unknown-command" != s.type || "\\textstyle" != s.text) {
                    var l = this.flattenLines(s);
                    if (l) r = l.concat(r);
                    else {
                        if (i.displayStyle) StyleHelper.addStyleMod(s, "mathModeType", "\\displaystyle");
                        if (i.textStyle) StyleHelper.addStyleMod(s, "mathModeType", "\\textstyle");
                        if (this.isTheSameWithPreviousBlock(n, s)) n = this.mergeTextBlockWithPrevious(n, s);
                        else n.push(s)
                    }
                } else i.textStyle = true;
                else i.displayStyle = true
            }
        }
        return e.blocks = n,
        t || (i.isChoose && (e = this.handleLeftRightEditor(e, "\\choose", "\\binom")), i.isOver && (e = this.handleLeftRightEditor(e, "\\over", "\\frac"))),
        e
    }
    mergeTextBlockWithPrevious(e, t) {
        return e[e.length - 1].text += t.text,
        e
    }
    isTheSameWithPreviousBlock(e, t) {
        return ! (e.length <= 0) && CheckComponent.are2TextBlockSameFormat(e[e.length - 1], t)
    }
    handleLeftRightEditor(e, t, n) {
        var r = e.blocks;
        var o = _.findIndex(r, (e) => {
            return "unknown-command" == e.type && e.text === t
        });
        if (o >= 0) {
            var s = InitHelper.getCustomSymbolComponent(n).toModel(n, null, [{
                id: DiagramIdHelper.nextId(),
                blocks: r.slice(0, o)
            }], [{
                id: DiagramIdHelper.nextId(),
                blocks: r.slice(o + 1)
            }]);
            if (s instanceof Array) e.blocks = s;
            else e.blocks = [s]
        }
        return e
    }
    handleOneGroup(e) {
        if (1 === e.length && 1 === e[0].blocks.length) {
            var t = e[0].blocks[0];
            if ("\\group" == t.text && "composite" == t.type) return t.elements.value.lines;
            if ("\\gathered" == t.text && "composite" == t.type) {
                var n = t;
                if (1 === n.column) {
                    var r = [];
                    var a = 0;
                    for (; a < n.row; a++) {
                        var i = n.elements[a + "_0"].lines;
                        if (i.length > 1) return e;
                        r.push(i[0])
                    }
                    return r
                }
            }
        }
        return e
    }
    flattenLines(e) {
        return _.isArray(e) ? e : null
    }
};
class f {
    parse(e, t) {
        try {
            t = t || "Expression";
            var n = LatexParserCore.parse(e, {
                _: _,
                symbolProvider: InitHelper,
                openBraces: "{",
                closeBraces: "}",
                grammarHelper: d,
                startRule: t,
                generator: DiagramIdHelper,
                modelHelper: BlockHelper,
                modelCreator: CreateEditorObject
            });
            return this.addingLastLineIfNeeded(n)
        } catch(e) {
            return console.log(e),
            []
        }
    }
    addingLastLineIfNeeded(e) {
        if (0 === e.length) return e;
        var t = _.last(e);
        return 1 === t.blocks.length && CheckObject.isSingleBlock(t.blocks[0]) && (e = e.concat([CreateEditorObject.createEmptyLine()])),
        e
    }
}

export default f