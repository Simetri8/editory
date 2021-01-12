import _ from 'lodash';
import React from 'react';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import BaseComponent from '../Elements/BaseComponent';
import CharListEmojiAnimalsPlantsFood from '../Chars/char-list-emoji-animals-plants-food';
import CharListEmojiMarks from '../Chars/char-list-emoji-marks';
import CharListEmojiObjects from '../Chars/char-list-emoji-objects';
import CharListEmojiPeopleEmotions from '../Chars/char-list-emoji-people-emotions';
import CharListEmojiSportsCelebrationsActivities from '../Chars/char-list-emoji-sports-celebrations-activities';
import CharListEmojiSymbols from '../Chars/char-list-emoji-symbols';
import CharListEmojiTransportsMapSignage from '../Chars/char-list-emoji-transports-map-signage';
import CharListEmojiWeatherScenesZodiacSigns from '../Chars/char-list-emoji-weather-scenes-zodiac-signs';
import CharListSymbolArrows from '../Chars/char-list-symbol-arrows';
import CharListSymbolBraille from '../Chars/char-list-symbol-braille';
import CharListSymbolCurrency from '../Chars/char-list-symbol-currency';
import CharListSymbolEmoticons from '../Chars/char-list-symbol-emoticons';
import CharListSymbolGamePieces from '../Chars/char-list-symbol-game-pieces';
import CharListSymbolGenderGenealogical from '../Chars/char-list-symbol-gender-genealogical';
import CharListSymbolGeometricShapes from '../Chars/char-list-symbol-geometric-shapes';
import CharListSymbolHistoric from '../Chars/char-list-symbol-historic';
import CharListSymbolMath from '../Chars/char-list-symbol-math';
import CharListSymbolMathAlphanumeric from '../Chars/char-list-symbol-math-alphanumeric';
import CharListSymbolMiscellaneous from '../Chars/char-list-symbol-miscellaneous';
import CharListSymbolMusical from '../Chars/char-list-symbol-musical';
import CharListSymbolNumberEnclosedDotted from '../Chars/char-list-symbol-number-enclosed-dotted';
import CharListSymbolStartsAsterisks from '../Chars/char-list-symbol-starts-asterisks';
import CharListSymbolSubscript from '../Chars/char-list-symbol-subscript';
import CharListSymbolSuperscript from '../Chars/char-list-symbol-superscript';
import CharListSymbolTechnical from '../Chars/char-list-symbol-technical';
import CharListSymbolTransportMap from '../Chars/char-list-symbol-transport-map';
import CharListSymbolWeatherAstrological from '../Chars/char-list-symbol-weather-astrological';
import CharListSymbolYijingTaiXuanJing from '../Chars/char-list-symbol-yijing-tai-xuan-jing';
import ModalDialogContainer from '../Editor/ModalDialogContainer';
import n463 from '../n463';
import SelectBoxContainer from '../Editor/SelectBoxContainer';

/// xxx(1611) /*SpecialSymbolHandler*/

/// var i = n(0)/*React*/;  // 32 times
/// var o = n.n(i);
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var Ei = n(35)/*slicedToArray*/;  // 1 times
/// var vi = n.n(Ei);
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var bn = n(51)/*SelectBoxContainer*/;  // 2 times
/// var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 1 times
var Si = CharListSymbolArrows/*char-list-symbol-arrows*/;
var Ci = CharListSymbolBraille/*char-list-symbol-braille*/;
var xi = CharListSymbolCurrency/*char-list-symbol-currency*/;
var Ii = CharListSymbolEmoticons/*char-list-symbol-emoticons*/;
var Ti = CharListSymbolGamePieces/*char-list-symbol-game-pieces*/;
var bi = CharListSymbolGenderGenealogical/*char-list-symbol-gender-genealogical*/;
var Li = CharListSymbolGeometricShapes/*char-list-symbol-geometric-shapes*/;
var Ri = CharListSymbolHistoric/*char-list-symbol-historic*/;
var Mi = CharListSymbolMathAlphanumeric/*char-list-symbol-math-alphanumeric*/;
var wi = CharListSymbolMath/*char-list-symbol-math*/;
var Oi = CharListSymbolMiscellaneous/*char-list-symbol-miscellaneous*/;
var Di = CharListSymbolMusical/*char-list-symbol-musical*/;
var Ni = CharListSymbolStartsAsterisks/*char-list-symbol-starts-asterisks*/;
var ki = CharListSymbolSubscript/*char-list-symbol-subscript*/;
var Bi = CharListSymbolSuperscript/*char-list-symbol-superscript*/;
var Pi = CharListSymbolTechnical/*char-list-symbol-technical*/;
var Fi = CharListSymbolTransportMap/*char-list-symbol-transport-map*/;
var Hi = CharListSymbolWeatherAstrological/*char-list-symbol-weather-astrological*/;
var yty = CharListSymbolYijingTaiXuanJing/*char-list-symbol-yijing-tai-xuan-jing*/;
var Wi = CharListEmojiAnimalsPlantsFood/*char-list-emoji-animals-plants-food*/;
var Gi = CharListEmojiMarks/*char-list-emoji-marks*/;
var zi = CharListEmojiObjects/*char-list-emoji-objects*/;
var Yi = CharListEmojiPeopleEmotions/*char-list-emoji-people-emotions*/;
var Ki = CharListEmojiSportsCelebrationsActivities/*char-list-emoji-sports-celebrations-activities*/;
var Vi = CharListEmojiSymbols/*char-list-emoji-symbols*/;
var ji = CharListEmojiTransportsMapSignage/*char-list-emoji-transports-map-signage*/;
var qi = CharListEmojiWeatherScenesZodiacSigns/*char-list-emoji-weather-scenes-zodiac-signs*/;
var cc = CharListSymbolNumberEnclosedDotted/*char-list-symbol-number-enclosed-dotted*/;
/// var zz = n(463)/*n463*/;  // 1 times
var SpecialSymbolsCategories = {
    arrows: Si,
    braille: Ci,
    currency: xi,
    "number-enclosed-dotted": cc,
    emoticons: Ii,
    "game-pieces": Ti,
    "gender-genealogical": bi,
    "geometric-shapes": Li,
    historic: Ri,
    "math-alphanumeric": Mi,
    math: wi,
    miscellaneous: Oi,
    musical: Di,
    "starts-asterisks": Ni,
    subscript: ki,
    superscript: Bi,
    technical: Pi,
    "transport-map": Fi,
    "weather-astrological": Hi,
    "yijing-tai-xuan-jing": yty
};
var SpecialSymbolsRootCategories = [{
    key: "symbols",
    value: "Symbols"
},
{
    key: "emoji",
    value: "Emoji"
}];
var SpecialSymbolsRoot = {
    symbols: {
        data: SpecialSymbolsCategories,
        selectboxItems: [{
            key: "arrows",
            value: "Arrows"
        },
        {
            key: "braille",
            value: "Braille"
        },
        {
            key: "currency",
            value: "Currency"
        },
        {
            key: "number-enclosed-dotted",
            value: "Number Enclosed/Dotted"
        },
        {
            key: "emoticons",
            value: "Emoticons"
        },
        {
            key: "game-pieces",
            value: "Game Pieces"
        },
        {
            key: "gender-genealogical",
            value: "Gender and Genealogical"
        },
        {
            key: "geometric-shapes",
            value: "Geometric Shapes"
        },
        {
            key: "historic",
            value: "Historic"
        },
        {
            key: "math-alphanumeric",
            value: "Math Alphanumeric"
        },
        {
            key: "math",
            value: "Math"
        },
        {
            key: "miscellaneous",
            value: "Miscellaneous"
        },
        {
            key: "musical",
            value: "Musical"
        },
        {
            key: "starts-asterisks",
            value: "Stars/Asterisks"
        },
        {
            key: "subscript",
            value: "Subscript"
        },
        {
            key: "superscript",
            value: "Superscript"
        },
        {
            key: "technical",
            value: "Technical"
        },
        {
            key: "transport-map",
            value: "Transport and Map"
        },
        {
            key: "weather-astrological",
            value: "Weather and Astrological"
        },
        {
            key: "yijing-tai-xuan-jing",
            value: "Yijing/Tai Xuan Jing"
        }],
        defaultSubCategory: "arrows"
    },
    emoji: {
        data: {
            "people-emotions": Yi,
            "animals-plants-food": Wi,
            marks: Gi,
            objects: zi,
            "sports-celebrations-activities": Ki,
            symbols: Vi,
            "transports-map-signage": ji,
            "weather-scenes-zodiac-signs": qi
        },
        selectboxItems: [{
            key: "people-emotions",
            value: "People and Emotions"
        },
        {
            key: "animals-plants-food",
            value: "Animals,Plants and Food"
        },
        {
            key: "marks",
            value: "Marks"
        },
        {
            key: "objects",
            value: "Objects"
        },
        {
            key: "sports-celebrations-activities",
            value: "Sports,Celebrations and Activities"
        },
        {
            key: "symbols",
            value: "Symbols"
        },
        {
            key: "transports-map-signage",
            value: "Transports,Map and Signage"
        },
        {
            key: "weather-scenes-zodiac-signs",
            value: "Weather,Scenes and Zodiac signs"
        }],
        defaultSubCategory: "people-emotions"
    }
};
class CharListComponent extends React.Component {
    shouldComponentUpdate(e) {
        return e.chars != this.props.chars;
    }
    renderChars() {
        return this.props.chars.map((e) => {
            return React.createElement("span", {
                key: e.value,
                onMouseEnter: () => {
                    return this.props.onHover(e);
                },
                onMouseDown: () => {
                    if (this.props.onSelect) {
                        this.props.onSelect(e);
                    }
                },
                className: "special-symbol-dialog__special-char"
            },
            e.char);
        });
    }
    render() {
        return React.createElement("div", null, this.renderChars());
    }
}
class CharListContainer extends React.Component {
    shouldComponentUpdate(e) {
        return e.selectedCategory != this.props.selectedCategory || e.selectedSubCategory != this.props.selectedSubCategory;
    }
    render() {
        var e = SpecialSymbolsRoot[this.props.selectedCategory];
        var t = _.toPairs(e.data[this.props.selectedSubCategory]).map((e) => {
            var t = slicedToArray(e, 2);
            var n = t[0];
            var r = t[1];
            return {
                value: Number.parseInt(n, 16),
                char: String.fromCodePoint(Number.parseInt(n, 16)),
                description: r.name,
                unicode: n
            };
        }).sort((e, t) => {
            return e.value - t.value;
        });
        return React.createElement("div", {
            role: "char-list-container",
            style: {
                height: 300,
                border: "1px solid lightgray",
                overflowY: "scroll",
                marginLeft: 5,
                marginRight: 5
            }
        },
        React.createElement(CharListComponent, {
            chars: t,
            onSelect: this.props.onSelect,
            onHover: this.props.onHover
        }));
    }
}
var to = {
    display: "flex",
    height: "100%",
    alignItems: "center",
    position: "relative",
    flexDirection: "column"
};
var no = {
    fontSize: "4em"
};
var ro = {
    textAlign: "center",
    fontSize: "0.9em"
};
var ao = {
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    color: "#a09f9f",
    width: "100%",
    paddingBottom: 2
};
class SpecialSymbolDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            charInfoSelected: null,
            selectedCategory: "symbols",
            selectedSubCategory: "arrows",
            recentlySelectedChars: n463.createOnInstance("recentlySelectedSpecialChars", []),
            selectedText: ""
        };
        this.handleCharSelect = (e) => {
            if ("multiple" == this.props.selectMode) {
                this.setState({
                    selectedText: this.state.selectedText + e.char
                });
            } else {
                this.setState({
                    selectedText: e.char
                });
            }
            if (!this.state.recentlySelectedChars.get().some((t) => {
                return t.value === e.value;
            })) {
                this.setState({
                    recentlySelectedChars: this.state.recentlySelectedChars.set([e].concat(this.state.recentlySelectedChars.get()))
                });
            }
        };
    }
    renderSelectedArea() {
        return "multiple" == this.props.selectMode ? React.createElement("div", null, React.createElement("div", {
            style: {
                paddingLeft: 5
            }
        },
        "Selected Text to insert:"), React.createElement("div", {
            style: {
                display: "flex",
                padding: 5
            }
        },
        React.createElement("textarea", {
            style: {
                height: 40,
                width: "100%",
                resize: "none",
                fontSize: "1.2em"
            },
            onChange: (e) => {
                return this.setState({
                    selectedText: e.currentTarget.value
                });
            },
            value: this.state.selectedText
        }))) : React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 95
            }
        },
        React.createElement("span", {
            style: {
                marginBottom: 10,
                fontWeight: "bold",
                marginTop: 5
            }
        },
        "Selected Symbol:"), React.createElement("span", {
            style: {
                fontSize: "3em",
                border: "1px solid lightgray",
                textAlign: "center",
                padding: "0 5px",
                display: "inline-block",
                minWidth: 30,
                minHeight: 40
            }
        },
        this.state.selectedText));
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: 500,
                maxWidth: "95vw"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Ok",
            message: "",
            isProgressing: false,
            onOk: () => {
                this.props.onOk(this.state.selectedText);
            },
            onCancel: this.props.onClose,
            onNo: this.props.onClose,
            isOkDisabled: !this.state.selectedText,
            show: true,
            className: "confirm-dialog"
        },
        React.createElement("div", null, React.createElement("div", {
            style: {
                width: "100%",
                display: "flex",
                flexDirection: "row",
                marginBottom: 5
            }
        },
        React.createElement("div", null, React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement(SelectBoxContainer, {
            width: 130,
            style: {
                margin: 5
            },
            itemsStyle: {
                maxHeight: 300,
                overflowY: "auto"
            },
            data: SpecialSymbolsRootCategories,
            value: "symbols",
            onChange: (e) => {
                this.setState({
                    selectedCategory: e,
                    selectedSubCategory: SpecialSymbolsRoot[e].defaultSubCategory
                });
            }
        }), React.createElement(SelectBoxContainer, {
            width: 200,
            expansionWidth: 200,
            style: {
                margin: 5
            },
            itemsStyle: {
                maxHeight: 300,
                overflowY: "auto"
            },
            data: SpecialSymbolsRoot[this.state.selectedCategory].selectboxItems,
            value: this.getSubcategory(),
            onChange: (e) => {
                this.setState({
                    selectedSubCategory: e
                });
            }
        })), React.createElement(CharListContainer, {
            selectedCategory: this.state.selectedCategory,
            selectedSubCategory: this.getSubcategory(),
            onSelect: this.handleCharSelect,
            onHover: (e) => {
                return this.setState({
                    charInfoSelected: e
                });
            }
        })), React.createElement("div", {
            style: {
                width: 150,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            style: {
                border: "1px solid lightgray",
                margin: 5,
                marginTop: 29,
                height: 140
            }
        },
        this.renderPreview()), React.createElement("div", {
            style: {
                paddingLeft: 5
            }
        },
        "Recently Selected:"), React.createElement("div", {
            role: "recent-selected-container",
            style: {
                border: "1px solid lightgray",
                margin: 5,
                marginBottom: 0,
                height: 134,
                overflowY: "auto"
            }
        },
        React.createElement(CharListComponent, {
            chars: this.state.recentlySelectedChars.get(),
            onSelect: this.handleCharSelect,
            onHover: (e) => {
                return this.setState({
                    charInfoSelected: e
                });
            }
        })))), this.renderSelectedArea()));
    }
    getSubcategory() {
        return this.state.selectedSubCategory;
    }
    renderPreview() {
        if (this.state.charInfoSelected) {
            return React.createElement("div", {
                style: to
            },
            React.createElement("span", {
                style: no
            },
            this.state.charInfoSelected.char), React.createElement("span", {
                style: ro
            },
            this.state.charInfoSelected.description), React.createElement("span", {
                style: ao
            },
            "U+", this.state.charInfoSelected.unicode.toUpperCase()));
        }
    }
}
class SpecialSymbolHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.handleClose = () => {
            this.specialSymbolDialogInfo = null;
            this.getTarget().closeRender(this);
        };
        this.handleOk = (e) => {
            if (e) {
                var t = this.specialSymbolDialogInfo;
                this.specialSymbolDialogInfo = null;
                if (t.callback) {
                    t.callback(e);
                } else {
                    this.getTarget().insertText(e);
                    this.getTarget().closeRender(this);
                }
            }
        };
    }
    render() {
        if (this.specialSymbolDialogInfo) {
            return React.createElement(SpecialSymbolDialog, {
                selectMode: this.specialSymbolDialogInfo.mode,
                onOk: this.handleOk,
                onClose: this.handleClose
            });
        }
    }
    showSpecialSymbolDialog() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "multiple";
        var t = arguments.length > 1 ? arguments[1] : void 0;
        this.specialSymbolDialogInfo = {
            mode: e,
            callback: t
        };
        this.getTarget().requestRender(this);
    }
}
/*n.d(t, "a", function () {
    return SpecialSymbolHandler;
})*/

export default SpecialSymbolHandler