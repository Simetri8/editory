import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1337) /*Symbol-Vert-pair2*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolVertPair2 = new class {
    getSymbolInfo() {
        return {
            searchText:
            "Vert pair |",
            names: ["\\Vert-pair"],
            type: "template",
            commandBlocks: ["\\left\\Vert", "\\right\\Vert"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "‖",
                end: "‖"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolVertPair2