import BaseComponent from '../Elements/BaseComponent';

/// xxx(1626) /*HandlerRenderSelect*/

/// var an = n(62)/*BaseComponent*/;  // 1 times
class HandlerRenderSelect extends BaseComponent {
    requestRender(e) {
        if (this.getState().requestRenderer != e) {
            this.setState({
                requestRenderer: e
            });
        }
    }
    closeRender(e) {
        if (this.getState().requestRenderer === e) {
            this.setState({
                requestRenderer: null
            });
        }
    }
    render() {
        if (this.getState().requestRenderer) {
            return this.getState().requestRenderer.render();
        }
    }
}
/*n.d(t, "a", function () {
    return HandlerRenderSelect;
})*/

export default HandlerRenderSelect