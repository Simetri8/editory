
/// xxx(102) /*GetSymbolLatex*/

var GetSymbolLatex = new class {
    fromEnvironment(e) {
        return "\\begin{".concat(e.name, "}").concat(this.fromOptions(e.options), "\n").concat(this.fromElement(e.element), "\n\\end{").concat(e.name, "}")
    }
    fromElement(e) {
        switch (e.type) {
        case "raw-element":
            return e.rawText;
        case "group":
            return e.elements.map(e => this.fromElement(e)).join(e.delimiter || "");
        case "tabular":
            return e.rows.map(e => this.fromElement(e)).join("\\\\\n");
        case "tabular-row":
            return e.cells.map(e => this.fromElement(e)).join("&");
        case "group-by-lines":
            return e.lines.map(e => this.fromElement(e)).join("\n");
        case "environment":
            return this.fromEnvironment(e);
        case "inline-environment":
            var t = "\\".concat(e.name).concat(this.fromOptions(e.options), "{").concat(this.fromElement(e.element), "}");
            return e.element2 && (t += "{".concat(this.fromElement(e.element2), "}")),
            e.element3 && (t += "{".concat(this.fromElement(e.element3), "}")),
            t
        }
    }
    fromOptions(e) {
        return !e || e.length <= 0 ? "" : e.map(e => this.fromOption(e)).join("")
    }
    fromOption(e) {
        var t = "brace" == e.bracketType ? "{": "[",
        n = "brace" == e.bracketType ? "}": "]";
        return "".concat(t).concat(this.fromElement(e.element)).concat(n)
    }
}

export default GetSymbolLatex