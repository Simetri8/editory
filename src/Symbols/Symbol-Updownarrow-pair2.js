import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1348) /*Symbol-Updownarrow-pair2*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolUpdownarrowPair2 = new class {
    getSymbolInfo() {
        return {
            searchText:
            "Updownarrow pair ",
            names: ["\\Updownarrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\Updownarrow", "\\right\\Updownarrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⇕",
                end: "⇕"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolUpdownarrowPair2