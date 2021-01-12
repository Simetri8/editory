import _ from 'lodash';
import Global from '../Global';

/// xxx(67) /*TooltipData*/

/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
/// var i = n(11)/*Global*/;  // 1 times
var TooltipData = new class {
    constructor() {
        this.tooltips = [{
            key: "copy",
            value: "⌘+C"
        },
        {
            key: "cut",
            value: "⌘+X"
        },
        {
            key: "paste",
            value: "⌘+V"
        },
        {
            key: "undo",
            value: "⌘+Z"
        },
        {
            key: "redo",
            value: "⌘+⇧+Z"
        },
        {
            key: "bold",
            value: "Bold (⌘+B)"
        },
        {
            key: "italic",
            value: "Italic (⌘ + I)"
        },
        {
            key: "underline",
            value: "Underline (⌘+U)"
        },
        {
            key: "strike-through",
            value: "StrikeThrough"
        },
        {
            key: "font-size",
            value: "Font Sizes"
        },
        {
            key: "font-name",
            value: "Font Names"
        },
        {
            key: "mathnormal",
            value: "Font \\mathnormal"
        },
        {
            key: "mathrm",
            value: "Font \\mathrm"
        },
        {
            key: "mathbf",
            value: "Font \\mathbf (Cmd+B)"
        },
        {
            key: "mathit",
            value: "Font \\mathit"
        },
        {
            key: "mathbb",
            value: "Font \\mathbb (Cmd+Shift+B)"
        },
        {
            key: "math-boldsymbol",
            value: "Font \\boldsymbol"
        },
        {
            key: "mathcal",
            value: "Font \\mathcal (Cmd+Shift+C)"
        },
        {
            key: "mathscr",
            value: "Font \\mathscr"
        },
        {
            key: "mathfrak",
            value: "Font \\mathfrak"
        },
        {
            key: "mathsf",
            value: "Font \\mathsf"
        },
        {
            key: "mathtt",
            value: "Font \\mathtt"
        },
        {
            key: "align-left",
            value: "Align Left"
        },
        {
            key: "align-right",
            value: "Align Right"
        },
        {
            key: "align-center",
            value: "Align Center"
        },
        {
            key: "align-justify",
            value: "Align Justify"
        },
        {
            key: "layout",
            value: "Layout"
        },
        {
            key: "export",
            value: "Export To Latex"
        },
        {
            key: "section",
            value: "Section"
        },
        {
            key: "ordered-list",
            value: "Ordered List"
        },
        {
            key: "unordered-list",
            value: "UnOrdered List"
        },
        {
            key: "decrease-indent",
            value: "Outdent"
        },
        {
            key: "increase-indent",
            value: "Indent"
        },
        {
            key: "displayStyle",
            value: "\\displaystyle mode"
        },
        {
            key: "textStyle",
            value: "\\textstyle mode"
        },
        {
            key: "math-font",
            value: "Math Font"
        },
        {
            key: "open-autocomplete",
            value: "Open Suggestion Box (Shortcut: \\ )"
        },
        {
            key: "insert-diagram",
            value: "Add Diagram/Graph"
        }];
        Global.isMac() || (this.tooltips = this.overwrite(this.tooltips, [{
            key: "copy",
            value: "Ctrl+C"
        },
        {
            key: "cut",
            value: "Ctrl+X"
        },
        {
            key: "paste",
            value: "Ctrl+V"
        },
        {
            key: "undo",
            value: "Ctrl+Z"
        },
        {
            key: "redo",
            value: "Ctrl+Y"
        },
        {
            key: "bold",
            value: "Bold (Ctrl + B)"
        },
        {
            key: "italic",
            value: "Italic (Ctrl + I)"
        },
        {
            key: "underline",
            value: "Underline (Ctrl + U)"
        },
        {
            key: "mathbf",
            value: "Font \\mathbf (Ctrl+B)"
        },
        {
            key: "mathbb",
            value: "Font \\mathbb (Ctrl+Shift+B)"
        },
        {
            key: "mathcal",
            value: "Font \\mathcal (Ctrl+Shift+C)"
        }]))
    }
    overwrite(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
            i = _.find(e, e => e.key === r.key);
            i ? i.value = r.value : e.push(r)
        }
        return e
    }
    getToolTipByKey(e) {
        return _.filter(this.tooltips, t => t.key === e)[0]
    }
}

export default TooltipData