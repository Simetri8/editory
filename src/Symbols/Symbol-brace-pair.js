import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1341) /*Symbol-brace-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolBracePair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "brace pair {}",
            names: ["\\brace-pair"],
            type: "template",
            commandBlocks: ["\\left{", "\\right}"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "{",
                end: "}"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolBracePair