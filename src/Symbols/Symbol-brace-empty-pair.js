import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1339) /*Symbol-brace-empty-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolBraceEmptyPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "brace empty pair",
            names: ["\\brace-empty-pair"],
            type: "template",
            commandBlocks: ["{", "\\right."],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "{",
                end: ""
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolBraceEmptyPair