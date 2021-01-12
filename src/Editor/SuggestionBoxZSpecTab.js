import React from 'react';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import FontList from '../Font/FontList';
import SortHelper from '../Mathcha/SortHelper';
import SuggestionBoxInput from './SuggestionBoxInput';

/// xxx(227) /*SuggestionBoxZSpecTab*/

/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(137)/*SuggestionBoxInput*/;  // 1 times
/// var o = n(6)/*DiagramIdHelper*/;  // 4 times
/// var s = n(292)/*SortHelper*/;  // 1 times
/// var l = n(48)/*FontList*/;  // 1 times
/// var c = n(13)/*CreateEditorObject*/;  // 2 times
class d extends React.Component {
    render() {
        var e = this.props,
        t = e.symbolFilter,
        n = e.tabItems,
        r = e.onTabSelect;
        return React.createElement(SuggestionBoxInput, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: h.get(),
            symbolFilter: t,
            onItemCommit: this.props.onItemCommit,
            tabItems: n,
            onTabSelect: r,
            tabSelectedKey: "z-spec"
        })
    }
}
var h = new class {
    sort(e) {
        this.sortableProvider.sort(e)
    }
    get() {
        return this.sortableProvider || (this.sortableProvider = new SortHelper([{
            names: ["\\Delta"],
            symbol: "∆",
            category: "Z_Letter",
            zcategory: "greek"
        },
        {
            names: ["\\Xi"],
            symbol: "Ξ",
            category: "Z_Letter",
            zcategory: "greek"
        },
        {
            names: ["\\theta"],
            symbol: "θ",
            category: "Z_Letter",
            zcategory: "greek"
        },
        {
            names: ["\\lambda"],
            symbol: "λ",
            category: "Z_Letter",
            zcategory: "greek"
        },
        {
            names: ["\\mu"],
            symbol: "µ",
            category: "Z_Letter",
            zcategory: "greek"
        },
        {
            names: ["\\arithmos"],
            symbol: "A",
            mathxxType: "\\mathbb",
            renderSymbol: this.renderSymbol.bind(this, "A"),
            category: "Z_Letter",
            type: "mathxx",
            zcategory: "others"
        },
        {
            names: ["\\nat"],
            symbol: "N",
            mathxxType: "\\mathbb",
            zcategory: "others",
            renderSymbol: this.renderSymbol.bind(this, "N"),
            category: "Z_Letter",
            type: "mathxx",
            description: "Set of natural numbers"
        },
        {
            names: ["\\power"],
            symbol: "P",
            mathxxType: "\\mathbb",
            zcategory: "others",
            renderSymbol: this.renderSymbol.bind(this, "P"),
            category: "Z_Letter",
            type: "mathxx",
            description: "Power set"
        },
        {
            names: ["\\_"],
            symbol: "_",
            category: "Z_Special",
            forceCreateModel: !0,
            zcategory: "others"
        },
        {
            names: ["\\ldata"],
            symbol: "《",
            category: "Z_Special",
            description: "Left Bracket Data",
            zcategory: "bracket"
        },
        {
            names: ["\\rdata"],
            symbol: "》",
            category: "Z_Special",
            description: "Right Bracket Data",
            zcategory: "bracket"
        },
        {
            names: ["\\lblot"],
            symbol: "⦉",
            category: "Z_Special",
            description: "Left Bracket Binding",
            zcategory: "bracket"
        },
        {
            names: ["\\rblot"],
            symbol: "⦊",
            category: "Z_Special",
            description: "Right Bracket Binding",
            zcategory: "bracket"
        },
        {
            names: ["\\vdash"],
            symbol: "⊢",
            category: "Z_Character",
            zcategory: "others"
        },
        {
            names: ["\\land"],
            symbol: "∧",
            category: "Z_Character",
            description: "Logical/Schema conjunction",
            zcategory: "logic"
        },
        {
            names: ["\\lor"],
            symbol: "∨",
            category: "Z_Character",
            description: "Logical/Schema disjunction",
            zcategory: "logic"
        },
        {
            names: ["\\implies"],
            symbol: "⇒",
            category: "Z_Character",
            description: "Logical/Schema implication",
            zcategory: "logic"
        },
        {
            names: ["\\iff"],
            symbol: "⇔",
            category: "Z_Character",
            description: "Logical/Schema equivalence",
            zcategory: "logic"
        },
        {
            names: ["\\lnot"],
            symbol: "¬",
            category: "Z_Character",
            description: "Logical/Schema Negation",
            zcategory: "logic"
        },
        {
            names: ["\\forall"],
            symbol: "∀",
            category: "Z_Character",
            description: "For all",
            zcategory: "logic"
        },
        {
            names: ["\\exists"],
            symbol: "∃",
            category: "Z_Character",
            description: "Exists",
            zcategory: "logic"
        },
        {
            names: ["\\cross"],
            symbol: "×",
            category: "Z_Character",
            zcategory: "expression"
        },
        {
            names: ["\\times"],
            symbol: "×",
            category: "Z_Character",
            zcategory: "duplicate"
        },
        {
            names: ["\\in"],
            symbol: "∈",
            category: "Z_Character",
            description: "Set membership",
            zcategory: "set"
        },
        {
            names: ["@"],
            symbol: "•",
            category: "Z_Character",
            description: "Quantification",
            zcategory: "logic"
        },
        {
            names: ["\\#"],
            symbol: "#",
            category: "Z_Character",
            description: "Size of a finite set",
            zcategory: "set"
        },
        {
            names: ["\\hide"],
            symbol: "⧹",
            category: "Z_Character",
            description: "Hiding of component(s)",
            zcategory: "schema"
        },
        {
            names: ["\\project"],
            symbol: "⨡",
            category: "Z_Character",
            description: "Projection of components",
            zcategory: "schema"
        },
        {
            names: ["\\semi"],
            symbol: "⨟",
            category: "Z_Character",
            zcategory: "others"
        },
        {
            names: ["\\pipe"],
            symbol: "⨠",
            category: "Z_Character",
            description: "Schema piping",
            zcategory: "schema"
        },
        {
            names: ["\\typecolon"],
            symbol: "⦂",
            category: "Z_Character",
            zcategory: "others"
        },
        {
            names: ["\\rel"],
            symbol: "↔",
            category: "Z_Character",
            description: "Relation",
            zcategory: "relation"
        },
        {
            names: ["\\fun"],
            symbol: "→",
            category: "Z_Character",
            description: " Total functions",
            zcategory: "function"
        },
        {
            names: ["\\neq"],
            symbol: "≠",
            category: "Z_Character",
            description: "Inequality",
            zcategory: "expression"
        },
        {
            names: ["\\notin"],
            symbol: "∉",
            category: "Z_Character",
            description: "Non-membership",
            zcategory: "set"
        },
        {
            names: ["\\emptyset"],
            symbol: "∅",
            category: "Z_Character",
            description: "Empty set",
            zcategory: "set"
        },
        {
            names: ["\\subseteq"],
            symbol: "⊆",
            category: "Z_Character",
            description: "Set inclusion",
            zcategory: "set"
        },
        {
            names: ["\\subset"],
            symbol: "⊂",
            category: "Z_Character",
            description: "Strict set inclusion",
            zcategory: "set"
        },
        {
            names: ["\\cup"],
            symbol: "∪",
            category: "Z_Character",
            description: "Set union",
            zcategory: "set"
        },
        {
            names: ["\\cap"],
            symbol: "∩",
            category: "Z_Character",
            description: "Set intersection",
            zcategory: "set"
        },
        {
            names: ["\\setminus"],
            symbol: "⧵",
            category: "Z_Character",
            description: "Set difference",
            zcategory: "set"
        },
        {
            names: ["\\symdiff"],
            symbol: "⊖",
            category: "Z_Character",
            zcategory: "relation"
        },
        {
            names: ["\\bigcup"],
            symbol: "⋃",
            category: "Z_Character",
            description: "Generalized union of a set of sets",
            zcategory: "set"
        },
        {
            names: ["\\bigcap"],
            symbol: "⋂",
            category: "Z_Character",
            description: "Generalized intersection of a set of sets",
            zcategory: "set"
        },
        {
            names: ["\\finset"],
            symbol: "F",
            mathxxType: "\\mathbb",
            renderSymbol: this.renderSymbol.bind(this, "F"),
            category: "Z_Letter",
            type: "mathxx",
            description: "Set of finite subsets",
            zcategory: "set"
        },
        {
            names: ["\\mapsto"],
            symbol: "↦",
            category: "Z_Character",
            description: "Maplet",
            zcategory: "relation"
        },
        {
            names: ["\\comp"],
            symbol: "⨾",
            category: "Z_Character",
            description: "Forward relational composition,Schema composition",
            zcategory: "relation"
        },
        {
            names: ["\\circ"],
            symbol: "∘",
            category: "Z_Character",
            description: "Backward relational composition",
            zcategory: "relation"
        },
        {
            names: ["\\dres"],
            symbol: "◁",
            category: "Z_Character",
            description: "Domain restriction",
            zcategory: "relation"
        },
        {
            names: ["\\rres"],
            symbol: "▷",
            category: "Z_Character",
            description: "Range restriction",
            zcategory: "relation"
        },
        {
            names: ["\\ndres"],
            symbol: "⩤",
            category: "Z_Character",
            description: "Domain anti-restriction",
            zcategory: "relation"
        },
        {
            names: ["\\nrres"],
            symbol: "⩥",
            category: "Z_Character",
            description: "Range anti-restriction",
            zcategory: "relation"
        },
        {
            names: ["\\inv"],
            symbol: "~",
            category: "Z_Character",
            description: "Inverse of relation",
            zcategory: "relation"
        },
        {
            names: ["\\limg"],
            symbol: "⦇",
            category: "Z_Character",
            description: "Left Relational image",
            zcategory: ["relation", "bracket"]
        },
        {
            names: ["\\rimg"],
            symbol: "⦈",
            category: "Z_Character",
            description: "Right Relational image",
            zcategory: ["relation", "bracket"]
        },
        {
            names: ["\\oplus"],
            symbol: "⊕",
            category: "Z_Character",
            description: "Relational overriding",
            zcategory: "relation"
        },
        {
            names: ["\\plus"],
            symbol: "+",
            category: "Z_Keyword",
            type: "template",
            templateDynamic: !0,
            insertedLines: [{
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "\\power",
                    type: "composite",
                    elements: {
                        powerValue: CreateEditorObject.createEditorWith("+")
                    }
                }]
            }],
            description: "Transitive closure",
            zcategory: "relation"
        },
        {
            names: ["\\star"],
            symbol: "*",
            category: "Z_Keyword",
            type: "template",
            templateDynamic: !0,
            insertedLines: [{
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "\\power",
                    type: "composite",
                    elements: {
                        powerValue: CreateEditorObject.createEditorWith("*")
                    }
                }]
            }],
            description: "Reflexive-transitive closure",
            zcategory: "relation"
        },
        {
            names: ["\\pfun"],
            symbol: "⇸",
            category: "Z_Character",
            description: "Partial functions",
            zcategory: "function"
        },
        {
            names: ["\\pinj"],
            symbol: "⤔",
            category: "Z_Character",
            description: "Partial injections",
            zcategory: "function"
        },
        {
            names: ["\\inj"],
            symbol: "↣",
            category: "Z_Character",
            description: "Total injections",
            zcategory: "function"
        },
        {
            names: ["\\psurj"],
            symbol: "⤀",
            category: "Z_Character",
            description: "Partial surjections",
            zcategory: "function"
        },
        {
            names: ["\\surj"],
            symbol: "↠",
            category: "Z_Character",
            description: "Total surjections",
            zcategory: "function"
        },
        {
            names: ["\\bij"],
            symbol: "⤖",
            category: "Z_Character",
            description: "Bijective functions",
            zcategory: "function"
        },
        {
            names: ["\\ffun"],
            symbol: "⇻",
            category: "Z_Character",
            description: "Finite partial functions",
            zcategory: "function"
        },
        {
            names: ["\\finj"],
            symbol: "⤕",
            category: "Z_Character",
            description: "Finite partial injections",
            zcategory: "function"
        },
        {
            names: ["\\num"],
            symbol: "N",
            mathxxType: "\\mathbb",
            renderSymbol: this.renderSymbol.bind(this, "N"),
            category: "Z_Letter",
            type: "mathxx",
            description: "Set of natural numbers",
            zcategory: "number"
        },
        {
            names: ["\\integer"],
            symbol: "Z",
            mathxxType: "\\mathbb",
            renderSymbol: this.renderSymbol.bind(this, "Z"),
            category: "Z_Letter",
            type: "mathxx",
            description: "Set of integers",
            zcategory: "number"
        },
        {
            names: ["\\leq"],
            symbol: "≤",
            category: "Z_Character",
            description: "Less than or equal",
            zcategory: "number"
        },
        {
            names: ["\\geq"],
            symbol: "≥",
            category: "Z_Character",
            description: "Greater than or equal",
            zcategory: "number"
        },
        {
            names: ["\\langle"],
            symbol: "⟨",
            category: "Z_Character",
            description: "Left Sequence Bracket",
            zcategory: ["sequence", "bracket"]
        },
        {
            names: ["\\rangle"],
            symbol: "⟩",
            category: "Z_Character",
            description: "Right Sequence Bracket",
            zcategory: ["sequence", "bracket"]
        },
        {
            names: ["\\cat"],
            symbol: "⁀",
            category: "Z_Character",
            description: "Sequence concatenation",
            zcategory: "sequence"
        },
        {
            names: ["\\extract"],
            symbol: "↿",
            category: "Z_Character",
            description: "Sequence extraction",
            zcategory: "sequence"
        },
        {
            names: ["\\filter"],
            symbol: "↾",
            category: "Z_Character",
            description: "Sequence filtering",
            zcategory: "sequence"
        },
        {
            names: ["\\lbag"],
            symbol: "⟦",
            category: "Z_Character",
            description: "Left Bag",
            zcategory: ["bag", "bracket"]
        },
        {
            names: ["\\rbag"],
            symbol: "⟧",
            category: "Z_Character",
            description: "Right Bag",
            zcategory: ["bag", "bracket"]
        },
        {
            names: ["\\baguni"],
            symbol: "⨄",
            category: "Z_Character",
            description: "Bag union",
            zcategory: "bag"
        },
        {
            names: ["\\bagmember"],
            symbol: "⋿",
            category: "Z_Character",
            description: "Bag membership",
            zcategory: "bag"
        },
        {
            names: ["\\sharp"],
            symbol: "♯",
            category: "Z_Character",
            description: "Bag Count",
            zcategory: "bag"
        },
        {
            names: ["\\otimes"],
            symbol: "⊗",
            category: "Z_Character",
            description: "Bag scaling of multiplicity",
            zcategory: "bag"
        },
        {
            names: ["\\sqsubseteq"],
            symbol: "⊑",
            category: "Z_Character",
            description: "Sub-bag relation",
            zcategory: "bag"
        }])),
        this.sortableProvider.getdata()
    }
    renderSymbol(e, t, n) {
        return React.createElement("span", {
            style: {
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathbb", n)
            }
        },
        e)
    }
}

export { h as SuggestionBoxZSpecTabB }

export default d