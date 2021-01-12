import React from 'react';

/// xxx(118) /*InputWrapper*/

/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
var InputWrapper = new class {
    wrapInput(e, t, n) {
        return t || n ? React.cloneElement(e, {
            style: t,
            className: n
        }) : e
    }
}

export default InputWrapper