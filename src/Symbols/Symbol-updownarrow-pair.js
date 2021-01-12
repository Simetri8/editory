import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1347) /*Symbol-updownarrow-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolUpdownarrowPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "updownarow pair",
            names: ["\\updownarrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\updownarrow", "\\right\\updownarrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "↕",
                end: "↕"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolUpdownarrowPair