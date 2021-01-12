import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1336) /*Symbol-vert-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolVertPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "vert pair |",
            names: ["\\vert-pair"],
            type: "template",
            commandBlocks: ["\\left|", "\\right|"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "|",
                end: "|"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolVertPair