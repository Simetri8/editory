import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1344) /*Symbol-Downarrow-pair2*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolDownarrowPair2 = new class {
    getSymbolInfo() {
        return {
            searchText:
            "Downarrow pair ",
            names: ["\\Downarrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\Downarrow", "\\right\\Downarrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⇓",
                end: "⇓"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolDownarrowPair2