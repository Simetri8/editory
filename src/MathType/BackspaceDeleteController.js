import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import ClipboardJS from 'clipboard';
import equal from 'fast-deep-equal';
import Fuse from 'fuse.js';
import Hammer from 'hammerjs';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
// Not found 'var' for: import  from '../ConsoleLog';
// Not found 'var' for: import  from '../Document/DocumentCorruption';
// Not found 'var' for: import  from '../Document/ExportHandlerForTest';
// Not found 'var' for: import  from '../Document/PromiseRunner';
// Not found 'var' for: import  from '../Document/RemoteCursorColor';
// Not found 'var' for: import  from '../Editor/CheckComponent';
// Not found 'var' for: import  from '../Editor/CheckObject';
// Not found 'var' for: import  from '../Editor/ColorPicker';
// Not found 'var' for: import  from '../Editor/CursorHelper';
// Not found 'var' for: import  from '../Editor/CursorPositionHelper';
// Not found 'var' for: import  from '../Editor/DiagramExportDialog';
// Not found 'var' for: import  from '../Editor/EditArea';
// Not found 'var' for: import  from '../Editor/EntityChanger';
// Not found 'var' for: import  from '../Editor/EntityHelper';
// Not found 'var' for: import  from '../Editor/EntityUtils';
// Not found 'var' for: import  from '../Editor/FontSelectBox';
// Not found 'var' for: import  from '../Editor/FontSizeSelectBox';
// Not found 'var' for: import  from '../Editor/ImageManagerMain';
// Not found 'var' for: import  from '../Editor/ImageViewer2';
// Not found 'var' for: import  from '../Editor/LineHelper';
// Not found 'var' for: import  from '../Editor/ModalDialog';
// Not found 'var' for: import  from '../Editor/ModalDialogContainer';
// Not found 'var' for: import  from '../Editor/ModalDialogHelper';
// Not found 'var' for: import  from '../Editor/SectionPrefixHelper';
// Not found 'var' for: import  from '../Editor/SelectBoxContainer';
// Not found 'var' for: import  from '../Editor/SuggestionBox';
// Not found 'var' for: import  from '../Editor/SuggestionBoxInput';
// Not found 'var' for: import  from '../Editor/SuggestionBoxTab';
// Not found 'var' for: import  from '../Editor/SuggestionBoxZSpecTab';
// Not found 'var' for: import  from '../Editor/TextUtils';
// Not found 'var' for: import  from '../Editor/Toolbar/LinePointItemGroup';
// Not found 'var' for: import  from '../Editor/Toolbar/ToolbarIcons';
// Not found 'var' for: import  from '../Editor/TransformHelper';
// Not found 'var' for: import  from '../Elements/BaseComponent';
// Not found 'var' for: import  from '../Elements/BlockHelper';
// Not found 'var' for: import  from '../Elements/BlockUtils';
// Not found 'var' for: import  from '../Elements/CommonBigSquare';
// Not found 'var' for: import  from '../Elements/CreateEditorObject';
// Not found 'var' for: import  from '../Elements/DescriptionContainer';
// Not found 'var' for: import  from '../Elements/DiagramIdHelper';
// Not found 'var' for: import  from '../Elements/DOMHelper';
// Not found 'var' for: import  from '../Elements/ElementTypes';
// Not found 'var' for: import  from '../Elements/ExpandableComponent';
// Not found 'var' for: import  from '../Elements/InputWrapper';
// Not found 'var' for: import  from '../Elements/IntersectStyleChecker';
// Not found 'var' for: import  from '../Elements/LabelItemContainer';
// Not found 'var' for: import  from '../Elements/Line';
// Not found 'var' for: import  from '../Font/FontList';
// Not found 'var' for: import  from '../Geometry/RectangleHelper';
// Not found 'var' for: import  from '../Global';
// Not found 'var' for: import  from '../InitHelper';
// Not found 'var' for: import  from '../Latex/LatexConverter';
// Not found 'var' for: import  from '../Latex/LatexParser';
// Not found 'var' for: import  from '../Latex/LatexSamples';
// Not found 'var' for: import  from '../Mathcha/ArrayHelper';
// Not found 'var' for: import  from '../Mathcha/ArrayHelper2';
// Not found 'var' for: import  from '../Mathcha/CheckBoxWrapper';
// Not found 'var' for: import  from '../Mathcha/ColorTypeConverter';
// Not found 'var' for: import  from '../Mathcha/EventHelper';
// Not found 'var' for: import  from '../Mathcha/HotkeyInfo';
// Not found 'var' for: import  from '../Mathcha/ImageServiceProp';
// Not found 'var' for: import  from '../Mathcha/KeyCodes';
// Not found 'var' for: import  from '../Mathcha/KeyDownEventRegisterer';
// Not found 'var' for: import  from '../Mathcha/MathmlElementGenerator';
// Not found 'var' for: import  from '../Mathcha/MathmlGenerator';
// Not found 'var' for: import  from '../Mathcha/MessageProvider';
// Not found 'var' for: import  from '../Mathcha/MobileTabletClasses';
// Not found 'var' for: import  from '../Mathcha/NumberUtils';
// Not found 'var' for: import  from '../Mathcha/PropUpdateHelper';
// Not found 'var' for: import  from '../Mathcha/Remainder';
// Not found 'var' for: import  from '../Mathcha/ScrollTo';
// Not found 'var' for: import  from '../Mathcha/SortHelper';
// Not found 'var' for: import  from '../Mathcha/SpellCheckRunner';
// Not found 'var' for: import  from '../Mathcha/StyleHelper';
// Not found 'var' for: import  from '../Mathcha/TheoremHelper';
// Not found 'var' for: import  from '../Mathcha/TimerHelper';
// Not found 'var' for: import  from '../Mathcha/TooltipData';
// Not found 'var' for: import  from '../n463';
// Not found 'var' for: import  from '../Searching';
// Not found 'var' for: import  from '../Serialization';
// Not found 'var' for: import  from '../Shapes/ShapeMatrixElement';
// Not found 'var' for: import  from '../Symbols/RoleGridItemSelect';
// Not found 'var' for: import  from '../Symbols/SymbolElementNames';
// Not found 'var' for: import  from '../Symbols/SymbolWrapper';
// Not found 'var' for: import  from '../Tabular/TabularBehaviors';
// Not found 'var' for: import  from '../Tabular/TabularHelper';
// Not found 'var' for: import  from '../Tabular/TabularUtils';
// Not found 'var' for: import  from './';
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

/// xxx(1634) /*BackspaceDeleteController*/

{
///     var r = n(3)/*_.assignIn*/;  // 0 times
    /// var a = n.n(r);
///     var i = n(0)/*React*/;  // 0 times
    /// var o = n.n(i);
///     var s = n(16)/*ReactDOM*/;  // 0 times
    /// var l = n.n(s);
///     var c = n(14)/*classnames*/;  // 0 times
    /// var d = n.n(c);
///     var h = n(23)/*PropTypesExporter*/;  // 0 times
    /// var u = n.n(h);
///     var p = n(21)/*EditArea*/;  // 0 times
///     var m = n(4)/*DOMHelper*/;  // 0 times
///     var f = n(248)/*Line*/;  // 0 times
///     var g = n(95)/*DocumentCorruption*/;  // 0 times
///     var A = n(714)/*fast-deep-equal*/;  // 0 times
    /// var E = n.n(A);
///     var C = n(2)/*lodash*/;  // 0 times
    /// var x = n.n(C);
    /// var hn = n.n(dn);
///     var mn = n(30)/*blubirdjs*/;  // 0 times
    /// var fn = n.n(mn);
///     var yr = n(716)/*clipboard*/;  // 0 times
    /// var Ar = n.n(yr);
///     var wr = n(717)/*fuse*/;  // 0 times
    /// var Or = n.n(wr);
///     var Ei = n(35)/*slicedToArray*/;  // 0 times
    /// var vi = n.n(Ei);
///     var ye = n(5)/*sizzle*/;  // 0 times
    /// var Ae = n.n(ye);
///     var st = n(61);  // 0 times
    /// var lt = n.n(st);
///     var kt = n(455)/*react-copy-to-clipboard-exp*/;  // 0 times
    /// var Bt = n.n(kt);
///     var jt = n(715)/*LatexSamples*/;  // 0 times
    /// var qt = n.n(jt);
///     var I = n(12)/*BlockHelper*/;  // 0 times
///     var T = n(7)/*PropUpdateHelper*/;  // 0 times
///     var b = n(45)/*TabularUtils*/;  // 0 times
///     var L = n(15)/*TabularHelper*/;  // 0 times
///     var M = n(22)/*CheckComponent*/;  // 0 times
///     var w = n(36)/*TextUtils*/;  // 0 times
///     var O = n(13)/*CreateEditorObject*/;  // 0 times
///     var N = n(18)/*StyleHelper*/;  // 0 times
///     var k = n(6)/*DiagramIdHelper*/;  // 0 times
///     var P = n(80)/*LineHelper*/;  // 0 times
///     var tb = n(123)/*TabularBehaviors*/;  // 0 times
///     var W = n(31)/*CheckObject*/;  // 0 times
///     var Y = n(32)/*InitHelper*/;  // 0 times
///     var K = n(136)/*Serialization*/;  // 0 times
///     var j = n(63)/*EntityHelper*/;  // 0 times
///     var q = n(65)/*ConsoleLog*/;  // 0 times
///     var ee = n(11)/*Global*/;  // 0 times
///     var X = n(143)/*HotkeyInfo*/;  // 0 times
///     var J = n(207)/*KeyCodes*/;  // 0 times
///     var ne = n(43)/*ArrayHelper*/;  // 0 times
///     var ae = n(50)/*Remainder*/;  // 0 times
///     var ce = n(46)/*RectangleHelper*/;  // 0 times
///     var de = n(55)/*ArrayHelper2*/;  // 0 times
///     var he = n(49)/*CursorPositionHelper*/;  // 0 times
///     var pe = n(58)/*BlockUtils*/;  // 0 times
///     var me = n(75)/*CursorHelper*/;  // 0 times
///     var ge = n(144)/*Searching*/;  // 0 times
///     var Ee = n(52)/*NumberUtils*/;  // 0 times
///     var je = n(122)/*TheoremHelper*/;  // 0 times
///     var nt = n(147)/*EntityChanger*/;  // 0 times
///     var rt = n(450)/*LinePointItemGroup*/;  // 0 times
///     var at = n(20)/*EntityUtils*/;  // 0 times
///     var pt = n(191)/*ImageViewer2*/;  // 0 times
///     var mt = n(252)/*IntersectStyleChecker*/;  // 0 times
///     var gt = n(97)/*SymbolElementNames*/;  // 0 times
///     var St = n(124)/*ModalDialog*/;  // 0 times
///     var Ct = n(453)/*MessageProvider*/;  // 0 times
///     var Lt = n(19)/*TimerHelper*/;  // 0 times
///     var Dt = n(193)/*LatexConverter*/;  // 0 times
///     var Pt = n(88)/*ModalDialogHelper*/;  // 0 times
///     var Vt = n(465)/*LatexParser*/;  // 0 times
///     var an = n(62)/*BaseComponent*/;  // 0 times
///     var cn = n(24)/*EventHelper*/;  // 0 times
///     var dn = n(245)/*hammer*/;  // 0 times
///     var yn = n(38)/*ElementTypes*/;  // 0 times
///     var En = n(173)/*ColorPicker*/;  // 0 times
///     var vn = n(37)/*ToolbarIcons*/;  // 0 times
///     var Sn = n(42)/*ColorTypeConverter*/;  // 0 times
///     var In = n(67)/*TooltipData*/;  // 0 times
///     var Tn = n(291)/*FontSizeSelectBox*/;  // 0 times
///     var bn = n(51)/*SelectBoxContainer*/;  // 0 times
///     var Ln = n(48)/*FontList*/;  // 0 times
///     var Dn = n(467)/*DiagramExportDialog*/;  // 0 times
///     var Nn = n(293)/*MathmlElementGenerator*/;  // 0 times
///     var kn = n(294)/*MathmlGenerator*/;  // 0 times
///     var Bn = n(155)/*ReactDOM-server-exp*/;  // 0 times
///     var Pn = n(244)/*ExportHandlerForTest*/;  // 0 times
///     var Fn = n(454)/*FontSelectBox*/;  // 0 times
///     var Wn = n(69)/*ExpandableComponent*/;  // 0 times
///     var Yn = n(126)/*LabelItemContainer*/;  // 0 times
///     var rr = n(76)/*MobileTabletClasses*/;  // 0 times
///     var fr = n(107)/*ScrollTo*/;  // 0 times
///     var Lr = n(292)/*SortHelper*/;  // 0 times
///     var kr = n(131)/*KeyDownEventRegisterer*/;  // 0 times
///     var Br = n(137)/*SuggestionBoxInput*/;  // 0 times
///     var sb = n(250)/*SuggestionBox*/;  // 0 times
///     var zr = n(348)/*SymbolWrapper*/;  // 0 times
///     var Yr = n(165)/*ShapeMatrixElement*/;  // 0 times
///     var Kr = n(230)/*CommonBigSquare*/;  // 0 times
///     var Qr = n(227)/*SuggestionBoxZSpecTab*/;  // 0 times
///     var Zr = n(452)/*SuggestionBoxTab*/;  // 0 times
///     var Xr = n(451)/*DescriptionContainer*/;  // 0 times
///     var Jr = n(334)/*RoleGridItemSelect*/;  // 0 times
///     var ia = n(118)/*InputWrapper*/;  // 0 times
///     var oa = n(101)/*CheckBoxWrapper*/;  // 0 times
///     var ba = n(70)/*TransformHelper*/;  // 0 times
///     var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 0 times
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
///     var zz = n(463)/*n463*/;  // 0 times
///     var po = n(228)/*SpellCheckRunner*/;  // 0 times
///     var Mo = n(208)/*SectionPrefixHelper*/;  // 0 times
///     var Oo = n(256)/*RemoteCursorColor*/;  // 0 times
///     var Ho = n(460)/*ImageManagerMain*/;  // 0 times
///     var isp = n(204)/*ImageServiceProp*/;  // 0 times
///     var Qo = n(176)/*PromiseRunner*/;  // 0 times
}
/// var BackspaceDeleteController = n(1634)/*BackspaceDeleteController*/;  // 0 times
/*n.d(t, "a", function () {
    return BackspaceDeleteController;
})*/

export default BackspaceDeleteController