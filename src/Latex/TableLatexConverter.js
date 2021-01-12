import _ from 'lodash';

/// xxx(346) /*TableLatexConverter*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 7 times
/// var o = n.n(i);
var TableLatexConverter = new class {
    toLatex(e, t, n) {
        var r = this.fromColumnsOptions(e.columnsOptions),
        a = e.rows.map(e => {
            var r = this.fromHLines(e.leadings),
            a = this.fromHLines(e.trailings),
            i = e.cells.map(e => {
                switch (e.type) {
                case "empty":
                    return " ";
                case "normal":
                    return this.handleCellData(e.data, t, n);
                case "multirow":
                    return this.fromMultiRow(e, t, n);
                case "multicolumn":
                    return this.fromMultiColumn(e, t, n);
                case "multicolumnrow":
                    return this.fromMultiColumnRow(e, t, n);
                case "hidden":
                    return null
                }
            }).filter(e => null !== e).join(" & ");
            return _.isEmpty(r) || _.isEmpty(a) ? _.isEmpty(r) ? _.isEmpty(a) ? "".concat(i, " \\\\\n") : "".concat(i, " \\\\\n ").concat(a) : "".concat(r, " \n ").concat(i, " \\\\\n") : "".concat(r, " \n ").concat(i, " \\\\\n ").concat(a)
        }).join(""),
        i = "tabularx" == e.environmentName ? "{\\textwidth}" : "";
        return "".concat(this.convertDefinitions(e.definitions), "\n\\begin{").concat(e.environmentName, "}").concat(i, "{").concat(r, "}\n").concat(a, "\n\\end{").concat(e.environmentName, "}")
    }
    convertDefinitions(e) {
        return e.map(e => {
            switch (e.type) {
            case "fixed-column-definition":
                switch (e.align) {
                case "center":
                    return "\\newcolumntype{C}[1]{>{\\centering\\arraybackslash}p{#1}}";
                case "right":
                    return "\\newcolumntype{R}[1]{>{\\raggedright\\arraybackslash}p{#1}}"
                }
                break;
            case "grow-column-definition":
                switch (e.align) {
                case "center":
                    return "\\newcolumntype{K}{>{\\centering\\arraybackslash}X}";
                case "right":
                    return "\\newcolumntype{T}{>{\\raggedright\\arraybackslash}X}"
                }
            }
        }).join("\n")
    }
    handleCellData(e, t, n) {
        switch (e.type) {
        case "model":
            return t.toLatexFromEditor(e.model, n);
        case "makecell":
            return "\\makecell[".concat(this.alignToLatex(e.align), "]{").concat(t.toLatexFromEditor(e.model, _.assignIn({},
            n, {
                newLineUsingBackSlash: !0
            })), "}")
        }
    }
    fromMultiRow(e, t, n) {
        return "\\multirow{".concat(e.rowSpan, "}{*}{").concat(this.handleCellData(e.data, t, n), "}")
    }
    fromMultiColumn(e, t, n) {
        var r = this.from3ValuesColumnsOptions(e.columnsOptions),
        a = e.data ? this.handleCellData(e.data, t, n) : "";
        return "\\multicolumn{".concat(e.colSpan, "}{").concat(r, "}{").concat(a, "}")
    }
    fromMultiColumnRow(e, t, n) {
        var r = this.from3ValuesColumnsOptions(e.columnsOptions);
        return "\\multicolumn{".concat(e.colSpan, "}{").concat(r, "}{").concat(this.fromMultiRow(e.cell, t, n), "}")
    }
    fromHLines(e) {
        return e.map(e => {
            switch (e.type) {
            case "full-line":
                return _.repeat("\\hline", e.numberOfLines);
            case "column-line":
                return "\\cline{".concat(e.from + 1, "-").concat(e.to + 1, "}");
            case "booktab-full-line":
                return _.repeat(this.booktabRuleToToLatex(e.ruleType), e.numberOfLines);
            case "booktab-column-line":
                return "\\cmidrule{".concat(e.from + 1, "-").concat(e.to + 1, "}")
            }
        }).join(" ")
    }
    booktabRuleToToLatex(e) {
        switch (e) {
        case "top":
            return "\\toprule";
        case "middle":
            return "\\midrule";
        default:
            return "\\bottomrule"
        }
    }
    fromColumnsOptions(e) {
        return e.map(e => {
            switch (e.type) {
            case "line":
                return _.repeat("|", e.numberOfLines);
            case "align":
                return this.alignToLatex(e.align);
            case "fixed":
                return this.fixedToLatex(e);
            case "grow":
                return this.growToLatex(e);
            case "paragraph":
                return "p{".concat(e.width, "}")
            }
        }).join("")
    }
    alignToLatex(e) {
        switch (e) {
        case "left":
            return "l";
        case "center":
            return "c";
        default:
            return "r"
        }
    }
    fixedToLatex(e) {
        switch (e.align) {
        case "left":
            return "p{".concat(e.width, "}");
        case "center":
            return "C{".concat(e.width, "}");
        default:
            return "R{".concat(e.width, "}")
        }
    }
    growToLatex(e) {
        switch (e.align) {
        case "left":
            return "X";
        case "center":
            return "K";
        default:
            return "T"
        }
    }
    from3ValuesColumnsOptions(e) {
        var t = e.left,
        n = e.align,
        r = e.right;
        return this.fromColumnsOptions([t, n, r].filter(e => e))
    }
}

export default TableLatexConverter