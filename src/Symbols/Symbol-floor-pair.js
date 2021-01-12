import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1335) /*Symbol-floor-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolFloorPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "floor pair ",
            names: ["\\floor-pair"],
            type: "template",
            commandBlocks: ["\\left\\lfloor", "\\right\\rfloor"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "⌊",
                end: "⌋"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolFloorPair