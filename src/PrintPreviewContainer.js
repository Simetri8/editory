import jQuery from 'jquery';
import React from 'react';
import { PrintPlaceHolderRegisterer } from './PrintSettingsDialog';
import KeyDownEventRegisterer from './Mathcha/KeyDownEventRegisterer';
import PrintHelper from './PrintHelper';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1571) /*PrintPreviewContainer*/

/// var k = n(0)/*React*/;  // 7 times
/// var B = n.n(k);
/// var n19 = n(19)/*TimerHelper*/;  // 2 times
/// var gi = n(5)/*sizzle*/;  // 2 times
/// var yi = n.n(gi);
/// var Os = n(131)/*KeyDownEventRegisterer*/;  // 2 times
/// var printSettingsDialog = n(1572)/*PrintSettingsDialog*/;  // 1 times
/// var printHelper = n(1575)/*PrintHelper*/;  // 1 times
class PrintPreviewContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            printElement: null,
            hidden: false,
            renderInfo: null
        };
        this.handleGlobalKeyDown = (e) => {
            if (27 === e.keyCode) {
                this.requestPrintClose();
                e.stopOther = true;
            }
        };
    }
    requestPrint(e, t, n) {
        return new Promise((r) => {
            this.setState({
                printElement: e,
                hidden: t,
                renderInfo: n
            });
            setTimeout(() => {
                r();
            },
            1E3);
        });
    }
    requestPrintClose() {
        this.setState({
            printElement: null
        });
    }
    componentDidUpdate() {
        if (this.state.printElement) {
            var e = document.getElementById("print-container");
            jQuery(this.state.printElement).addClass("math-type-for-print");
            jQuery(this.state.printElement).removeClass("math-type-no-print");
            TimerHelper.waitABit(() => {
                e.appendChild(this.state.printElement);
                TimerHelper.next(() => {
                    this.state.renderInfo.afterRenderCallback();
                });
            });
            KeyDownEventRegisterer.stack(this.handleGlobalKeyDown);
        } else {
            KeyDownEventRegisterer.remove(this.handleGlobalKeyDown);
        }
    }
    componentDidMount() {
        PrintPlaceHolderRegisterer.registerPlaceHolderComponent(this);
    }
    render() {
        if (!this.state.printElement) {
            return React.createElement("div", null);
        }
        var e = {};
        return this.state.hidden && (e = {
            top: "50%",
            left: "50%",
            width: 50,
            height: 50,
            zIndex: 0
        }),
        React.createElement("div", {
            className: "print-preview-container",
            style: e
        },
        React.createElement("div", {
            id: "print-container",
            className: "print-container"
        }), React.createElement("div", {
            className: "print-preview-controls-container"
        },
        React.createElement("button", {
            className: "btn-normal btn-large",
            style: {
                width: 60,
                marginRight: 10
            },
            onClick: () => {
                return this.setState({
                    printElement: null
                });
            }
        },
        "Close"), React.createElement("button", {
            className: "btn-normal btn-large",
            style: {
                width: 60
            },
            onClick: () => {
                return PrintHelper.print(this.state.renderInfo.width, this.state.renderInfo.height, this.state.renderInfo.orientation);
            }
        },
        "Print")));
    }
}
/*n.d(t, "a", function () {
    return PrintPreviewContainer;
});*/

export default PrintPreviewContainer