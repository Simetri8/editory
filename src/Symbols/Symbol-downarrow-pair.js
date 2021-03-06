import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1343) /*Symbol-downarrow-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolDownarrowPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "downarrow pair ",
            names: ["\\downarrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\downarrow", "\\right\\downarrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "↓",
                end: "↓"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolDownarrowPair