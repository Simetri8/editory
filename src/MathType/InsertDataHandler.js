import _ from 'lodash';
import BaseComponent from '../Elements/BaseComponent';

/// xxx(1612) /*InsertDataHandler*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var an = n(62)/*BaseComponent*/;  // 1 times
class InsertDataHandler extends BaseComponent {
    insertBySymbolInfo(e) {
        if (e) {
            if (e.names && e.names[0]) {
                switch (e.names[0]) {
                case "\\mathnormal":
                    case "\\mathrm":
                    case "\\mathbf":
                    case "\\boldsymbol":
                    case "\\mathit":
                    case "\\mathbb":
                    case "\\mathcal":
                    case "\\mathscr":
                    case "\\mathfrak":
                    case "\\mathsf":
                    case "\\mathtt":
                    return void this.getTarget().setMathFontName(e.names[0]);
                }
            }
            if (e.names && "\\tag-select" == e.names[0]) {
                this.getTarget().buildTagSelection();
            } else {
                if (e.names && "\\from-latex" == e.names[0]) {
                    this.getTarget().showImportLatex();
                } else {
                    if (e.names && "\\theorem-options" == e.names[0]) {
                        this.getTarget().showTheoremManagement();
                    } else {
                        if (e.names && "Manage Custom Math" == e.names[0]) {
                            this.getTarget().showMathTemplate();
                        } else {
                            if (e.names && "\\special-char" == e.names[0]) {
                                this.getTarget().showSpecialSymbolDialog();
                            } else {
                                if ("action" == e.type && e.names && "\\latex-table" == e.names[0]) {
                                    this.getTarget().showLatexTemplateDialog();
                                } else {
                                    if (e.names && "\\table-of-content" == e.names[0]) {
                                        e = _.assignIn({},
                                        e, {
                                            editor: this.getTarget().getEditorHtmlElement(),
                                            editorModel: this.getState().mainModel
                                        });
                                    }
                                    var t = this.getTarget();
                                    e = _.assignIn({},
                                    e, {
                                        restrictedView: t.isRestrictedView()
                                    });
                                    var n = t.getController().handleBySymbolInfo(e, t.getContainerModel());
                                    t.handleResult(n);
                                    t.hidenInputFocus(true);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    insertText(e) {
        if (e) {
            var t = this.getTarget().getController().insertText(e, this.getTarget().getContainerModel());
            this.getTarget().handleResult(t);
        }
    }
}
/*n.d(t, "a", function () {
    return InsertDataHandler;
})*/

export default InsertDataHandler