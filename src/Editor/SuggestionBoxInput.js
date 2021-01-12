import React from 'react';
import { SuggestionBoxB } from './SuggestionBox';
import Global from '../Global';
import InputWrapper from '../Elements/InputWrapper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(137) /*SuggestionBoxInput*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(11)/*Global*/;  // 1 times
/// var a = n(0)/*React*/;  // 3 times
/// var i = n.n(a);
/// var o = n(118)/*InputWrapper*/;  // 1 times
/// var s = n(19)/*TimerHelper*/;  // 1 times
/// var l = n(250)/*SuggestionBox*/;  // 1 times
class c extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            input: "",
            selectedItem: this.props.data[0] || null,
            filteredData: this.props.data
        };
        this.handleInputChange = (e => {
            this.changeSearchText(e.currentTarget.value)
        });
        this.getInputRef = (e => {
            this.inputRef = e;
            this.inputRef && TimerHelper.next(() => {
                this.inputRef && this.inputRef.focus()
            })
        });
        this.handleRenderFilter = (() => this.renderInput())
    }
    componentWillReceiveProps(e) {
        e.data != this.props.data && this.setState({
            input: "",
            selectedItem: this.props.data[0] || null,
            filteredData: e.data
        })
    }
    changeSearchText(e) {
        var t = this.props.data;
        e && (t = this.props.symbolFilter.filter(t, e));
        this.setState({
            input: e,
            filteredData: t
        })
    }
    renderInput() {
        var e = Global.isMobileOrTablet() ? {
            width: "calc(100% - 0px)",
            height: "22px",
            marginBottom: "10px"
        } : {
            width: "calc(100% - 5px)",
            height: "17px",
            marginBottom: "10px"
        };
        return InputWrapper.wrapInput(React.createElement("input", {
            value: this.state.input,
            autoCorrect: "off",
            autoCapitalize: "off",
            ref: this.getInputRef,
            onChange: this.handleInputChange
        }), e)
    }
    render() {
        return React.createElement(SuggestionBoxB, Object.assign({},
        this.props, {
            data: this.state.filteredData,
            renderFilter: this.handleRenderFilter
        }))
    }
}

export default c