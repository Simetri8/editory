import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1334) /*Symbol-ceil-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolCeilPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "ceil pair ",
            names: ["\\ceil-pair"],
            type: "template",
            commandBlocks: ["\\left\\lceil", "\\right\\rceil"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⌈",
                end: "⌉"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolCeilPair