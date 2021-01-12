import Api from './Api';

/// xxx(1583) /*InMemoryMathTemplateProvider*/

/// var api = n(1542)/*Api*/;  // 1 times
class InMemoryMathTemplateProvider {
    constructor(e) {
        this.templateChanged = e;
        this.data = [];
    }
    setTemplatesFromString(e) {
        if (e && this.cachedTemplate != e) {
            this.cachedTemplate = e;
            try {
                this.data = JSON.parse(e);
            } catch(e) {
                console.log(e);
            }
        }
    }
    getTemplates() {
        return this.data;
    }
    saveTemplates(e) {
        return Api.Put("/api/user-settings/math-templates", JSON.stringify(e)).then(() => {
            this.data = e;
        }).then(() => {
            this.templateChanged(JSON.stringify(this.data));
        });
    }
}
/*n.d(t, "a", function () {
    return InMemoryMathTemplateProvider;
});*/

export default InMemoryMathTemplateProvider