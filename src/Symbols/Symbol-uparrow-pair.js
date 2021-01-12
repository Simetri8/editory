import React from 'react';
import CommonBigSquareIcon from '../Elements/CommonBigSquareIcon';

/// xxx(1345) /*Symbol-uparrow-pair*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(74)/*CommonBigSquareIcon*/;  // 1 times
var SymbolUparrowPair = new class {
    getSymbolInfo() {
        return {
            searchText:
            "uparrow pair ",
            names: ["\\uparrow-pair"],
            type: "template",
            commandBlocks: ["\\left\\uparrow", "\\right\\uparrow"],
            selected: {
                charIndex: 1
            },
            renderSymbol: () => React.createElement(CommonBigSquareIcon, {
                start: "↑",
                end: "↑"
            }),
            description: "automatically adjust height by its content"
        }
    }
}

export default SymbolUparrowPair