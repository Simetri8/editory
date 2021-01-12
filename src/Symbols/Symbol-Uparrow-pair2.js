import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1346) /*Symbol-Uparrow-pair2*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolUparrowPair2 = new class {
    getSymbolInfo() {
        return {
            searchText:
            "Uparrow pair ",
            names: ["\\Uparrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\Uparrow", "\\right\\Uparrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⇑",
                end: "⇑"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolUparrowPair2