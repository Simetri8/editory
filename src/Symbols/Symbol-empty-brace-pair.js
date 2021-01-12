import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1338) /*Symbol-empty-brace-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolEmptyBracePair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "empty brace pair",
            names: ["\\empty-brace-pair"],
            type: "template",
            commandBlocks: ["\\left.", "}"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⌊",
                end: "⌋"
            })
        }
    }
}

export default SymbolEmptyBracePair