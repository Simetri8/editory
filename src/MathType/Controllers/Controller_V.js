import _ from 'lodash';
import BlockHelper from '../../Elements/BlockHelper';
import CheckComponent from '../../Editor/CheckComponent';
import CheckObject from '../../Editor/CheckObject';
import Controller_z from './Controller_z';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import InitHelper from '../../InitHelper';
import Serialization from '../../Serialization';

/// xxx(1645) /*Controller_V*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 3 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var M = n(22)/*CheckComponent*/;  // 9 times
/// var O = n(13)/*CreateEditorObject*/;  // 5 times
/// var W = n(31)/*CheckObject*/;  // 1 times
/// var Y = n(32)/*InitHelper*/;  // 1 times
/// var K = n(136)/*Serialization*/;  // 1 times
/// var Controller_G = n(1643)/*Controller_G*/;  // 1 times
var V = new class {
    process(e, t, n) {
        return this.processLinesTo({
            isInsideInlineMath: e.insideInlineMath,
            isPureText: e.isPureText,
            isTextMode: e.isTextMode,
            inlineMathDisplayStyle: e.inlineMathDisplayStyle,
            lines: e.lines
        },
        {
            isTextMode: t.isTextModeSelected(),
            isTextSymbol: t.isInsideTextSymbol(),
            isTheorem: t.isInsideTheorem(),
            isTable: t.isTableSelected(),
            rootSymbolSupports: n.rootSymbolSupports
        });
    }
    processLinesTo(e, t) {
        if (e.isPureText) {
            return this.okResult(e.lines);
        }
        if (t.isTextSymbol) {
            var n = this.stripNonTextBlocksForLines(e.lines);
            return this.resultFromStripInfo(n);
        }
        return t.isTextMode ? this.processInTextMode(e, t) : this.processInMathMode(e);
    }
    filterRootSupportedBlocks(e, t) {
        return e.map((e) => {
            return _.assignIn({},
            e, {
                blocks: e.blocks.filter((e) => {
                    return !e.type || t.includes(e.text);
                })
            });
        });
    }
    processInTextMode(e, t) {
        if (e.isTextMode) {
            if (t.isTheorem || t.isTable) {
                var n = this.stripForLines(e.lines, (e, t) => {
                    return CheckObject.isTheorem(e) ? {
                        anyStrip: true,
                        result: t = t.concat(e.elements.theorem.lines[0].blocks)
                    } : (t.push(e), {
                        anyStrip: false,
                        result: t
                    });
                },
                false);
                return this.resultFromStripInfo(n);
            }
            return t.rootSymbolSupports ? this.okResult(this.filterRootSupportedBlocks(e.lines, t.rootSymbolSupports)) : this.okResult(e.lines);
        }
        var r = e.lines;
        if (1 === r.length && 1 === r[0].blocks.length) {
            var a = r[0].blocks[0];
            if (CheckComponent.isGather(a) || CheckComponent.isAlign(a) || CheckComponent.isMathContainer(a) || CheckComponent.isMultiline(a)) {
                return this.okResult(e.lines);
            }
        }
        return this.okResult(this.wrapLinesWithMathContainer(e));
    }
    processInMathMode(e) {
        if (!e.isTextMode) {
            var t = e.lines;
            if (1 === t.length && 1 === t[0].blocks.length) {
                var n = t[0].blocks[0];
                if (CheckComponent.isGather(n) || CheckComponent.isAlign(n)) {
                    var r = this.stripNonTextBlocksForMath(e.lines);
                    return this.resultFromStripInfo(r);
                }
            }
            return this.okResult(e.lines);
        }
        var a = this.stripNonTextBlocksForMath(e.lines);
        return this.resultFromStripInfo(a);
    }
    resultFromStripInfo(e) {
        return e.anyStrip ? {
            status: "info",
            lines: e.lines,
            message: "Some contents have been strip while pasting to this area"
        } : {
            status: "ok",
            lines: e.lines
        };
    }
    okResult(e) {
        return {
            status: "ok",
            lines: e
        };
    }
    stripForLines(e, t, n) {
        var r = false;
        return e = _.map(e, (e) => {
            var a = this.stripCompositeBlocks(e.blocks, t, n);
            var i = CreateEditorObject.createLineFromBlocks(a.blocks);
            return i = Controller_z.joinBlocksAndNormalizeStyleForLine(i),
            r = r || a.anyStrip,
            i;
        }),
        {
            anyStrip: r,
            lines: e
        };
    }
    stripNonTextBlocksForLines(e) {
        return this.stripForLines(e, (e, t) => {
            return {
                anyStrip: true,
                result: t
            };
        },
        false);
    }
    stripNonTextBlocksForMath(e) {
        return this.stripForLines(e, (e, t) => {
            var n = false;
            if (CheckComponent.isMathContainer(e)) {
                var r = e.elements.mathValue.lines;
                t = t.concat(r[0].blocks);
                n = n || r.length > 1;
            } else {
                if (CheckComponent.isGather(e)) {
                    var a = BlockHelper.cloneCompositeWithoutStyle(e);
                    a.text = "\\gathered";
                    t.push(a);
                } else {
                    if (CheckComponent.isAlign(e)) {
                        var i = BlockHelper.cloneCompositeWithoutStyle(e);
                        i.text = "\\aligned";
                        t.push(i);
                    }
                }
            }
            return {
                anyStrip: n,
                result: t
            };
        },
        true);
    }
    replaceCharWithCompositeBlock(e) {
        var t = e.text;
        var n = [];
        var r = CreateEditorObject.createTextBlock("");
        var a = 0;
        var i = t.length;
        for (; a < i; a++) {
            var o = t[a];
            var s = Serialization.handleComposite(o);
            if (s) {
                if (r.text) {
                    n.push(r);
                }
                n.push(s);
                r = CreateEditorObject.createTextBlock("");
            } else {
                r.text += o;
            }
        }
        return r.text && n.push(r),
        n.length <= 1 ? null : n;
    }
    stripCompositeBlocks(e, t, n) {
        var r = false;
        var a = _.reduce(e, (e, a) => {
            if (a.type == null) {
                var i = CreateEditorObject.createTextBlock(a.text);
                if (n) {
                    var o = this.replaceCharWithCompositeBlock(i);
                    if (o) {
                        e = e.concat(o);
                    } else {
                        e.push(i);
                    }
                } else {
                    e.push(i);
                }
                return e;
            }
            var s = t(a, e);
            return r = s.anyStrip,
            s.result || e;
        },
        []);
        return {
            anyStrip: r,
            blocks: a
        };
    }
    wrapLinesWithMathContainer(e) {
        var t = _.cloneDeep(InitHelper.getModelByName("\\math-container"));
        return t.elements.mathValue.lines = e.lines,
        t.displayMode = !e.isInsideInlineMath,
        e.isInsideInlineMath && e.inlineMathDisplayStyle && (t.style = _.assignIn({},
        t.style, {
            mathModeType: "\\displaystyle"
        })),
        [CreateEditorObject.createLineFromBlock(t)];
    }
};
/*n.d(t, "a", function () {
    return V;
})*/

export default V