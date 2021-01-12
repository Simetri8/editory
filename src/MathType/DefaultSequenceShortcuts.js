import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import InitHelper from '../InitHelper';

/// xxx(1653) /*DefaultSequenceShortcuts*/

/// var O = n(13)/*CreateEditorObject*/;  // 64 times
/// var k = n(6)/*DiagramIdHelper*/;  // 23 times
/// var Y = n(32)/*InitHelper*/;  // 3 times
var DefaultSequenceShortcuts = new class {
    getForZSpec() {
        return [{
            id: "id1",
            shortcut: {
                type: "char-sequence",
                sequence: "->"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2192"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2192")
        },
        {
            id: "id4",
            shortcut: {
                type: "char-sequence",
                sequence: "=>"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u21d2"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u21d2")
        },
        {
            id: "id5",
            shortcut: {
                type: "char-sequence",
                sequence: ">="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2265"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2265")
        },
        {
            id: "id6",
            shortcut: {
                type: "char-sequence",
                sequence: "<="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2264"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2264")
        },
        {
            id: "id7",
            shortcut: {
                type: "char-sequence",
                sequence: "=/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2260"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2260")
        },
        {
            id: "id7",
            shortcut: {
                type: "char-sequence",
                sequence: "@"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2022"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2022")
        },
        {
            id: "id8",
            shortcut: {
                type: "char-sequence",
                sequence: "if ",
                startAtLineOrWhiteSpace: true
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "if",
                    style: {
                        mathType: "\\mathbf"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        },
        {
            id: "id9",
            shortcut: {
                type: "char-sequence",
                sequence: "else ",
                startAtLineOrWhiteSpace: true
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "else",
                    style: {
                        mathType: "\\mathbf"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        },
        {
            id: "id10",
            shortcut: {
                type: "char-sequence",
                sequence: "then ",
                startAtLineOrWhiteSpace: true
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "then",
                    style: {
                        mathType: "\\mathbf"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        },
        {
            id: "id11",
            shortcut: {
                type: "char-sequence",
                sequence: "let ",
                startAtLineOrWhiteSpace: true
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: "let",
                    style: {
                        mathType: "\\mathbf"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        },
        {
            id: "id12",
            shortcut: {
                type: "char-sequence",
                sequence: " mod "
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: " "
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: "mod",
                    style: {
                        mathType: "\\mathrm"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        },
        {
            id: "id13",
            shortcut: {
                type: "char-sequence",
                sequence: " div "
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: " "
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: "div",
                    style: {
                        mathType: "\\mathrm"
                    }
                },
                {
                    id: DiagramIdHelper.nextId(),
                    text: " "
                }]
            }
        }];
    }
    get() {
        return [{
            id: "id1",
            shortcut: {
                type: "char-sequence",
                sequence: "->"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2192"),
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [InitHelper.getModelByName("\\rightarrow")]
            }
        },
        {
            id: "id2",
            shortcut: {
                type: "char-sequence",
                sequence: "<-"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2190"),
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [InitHelper.getModelByName("\\leftarrow")]
            }
        },
        {
            id: "id3",
            shortcut: {
                type: "char-sequence",
                sequence: "<="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2a7d"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2a7d")
        },
        {
            id: "id4",
            shortcut: {
                type: "char-sequence",
                sequence: "=>"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u27f9"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u27f9")
        },
        {
            id: "id5",
            shortcut: {
                type: "char-sequence",
                sequence: ">="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2a7e"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2a7e")
        },
        {
            id: "id6",
            shortcut: {
                type: "char-sequence",
                sequence: "+-"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u00b1"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u00b1")
        },
        {
            id: "id7",
            shortcut: {
                type: "char-sequence",
                sequence: "-+"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2213"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2213")
        },
        {
            id: "id8",
            shortcut: {
                type: "char-sequence",
                sequence: "<<"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u226a"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u226a")
        },
        {
            id: "id9",
            shortcut: {
                type: "char-sequence",
                sequence: "\u226a<"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u22d8"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u22d8")
        },
        {
            id: "id10",
            shortcut: {
                type: "char-sequence",
                sequence: ">>"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u226b"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u226b")
        },
        {
            id: "id11",
            shortcut: {
                type: "char-sequence",
                sequence: "\u226b>"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u22d9"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u22d9")
        },
        {
            id: "id12",
            shortcut: {
                type: "char-sequence",
                sequence: "~~"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2248"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2248")
        },
        {
            id: "id13",
            shortcut: {
                type: "char-sequence",
                sequence: "\u2248/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2249"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2249")
        },
        {
            id: "id14",
            shortcut: {
                type: "char-sequence",
                sequence: "\u2248="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2243"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2243")
        },
        {
            id: "id15",
            shortcut: {
                type: "char-sequence",
                sequence: "=~"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2242"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2242")
        },
        {
            id: "id16",
            shortcut: {
                type: "char-sequence",
                sequence: "~/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2241"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2241")
        },
        {
            id: "id17",
            shortcut: {
                type: "char-sequence",
                sequence: "\u2243="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2245"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2245")
        },
        {
            id: "id18",
            shortcut: {
                type: "char-sequence",
                sequence: ":-"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u00f7"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u00f7")
        },
        {
            id: "id19",
            shortcut: {
                type: "char-sequence",
                sequence: "-:"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u00f7"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u00f7")
        },
        {
            id: "id20",
            shortcut: {
                type: "char-sequence",
                sequence: "=="
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2261"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2261")
        },
        {
            id: "id21",
            shortcut: {
                type: "char-sequence",
                sequence: "=/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2260"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2260")
        },
        {
            id: "id22",
            shortcut: {
                type: "char-sequence",
                sequence: "><"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2277"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2277")
        },
        {
            id: "id22",
            shortcut: {
                type: "char-sequence",
                sequence: "\u2261/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2262"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2262")
        },
        {
            id: "id23",
            shortcut: {
                type: "char-sequence",
                sequence: ">~"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2273"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2273")
        },
        {
            id: "id24",
            shortcut: {
                type: "char-sequence",
                sequence: "<~"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u2272"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u2272")
        },
        {
            id: "id25",
            shortcut: {
                type: "char-sequence",
                sequence: "</"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u226e"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u226e")
        },
        {
            id: "id26",
            shortcut: {
                type: "char-sequence",
                sequence: ">/"
            },
            textModeLine: CreateEditorObject.createPureTextLine("\u226f"),
            mathModeLine: CreateEditorObject.createPureTextLine("\u226f")
        },
        {
            id: "id27",
            shortcut: {
                type: "char-sequence",
                sequence: " mod "
            },
            textModeLine: null,
            mathModeLine: {
                id: DiagramIdHelper.nextId(),
                blocks: [InitHelper.getModelByName("\\mod")]
            }
        }];
    }
};
/*n.d(t, "a", function () {
    return DefaultSequenceShortcuts;
})*/

export default DefaultSequenceShortcuts