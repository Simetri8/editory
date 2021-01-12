import _ from 'lodash';
import Api from './Api';
import ConsoleLog from './ConsoleLog';

/// xxx(1574) /*GeneralSettingsSender*/

/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var Rt = n(65)/*ConsoleLog*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 1 times
var GeneralSettingsSender = new class {
    updateGeneralSettings(e) {
        var t = _.assignIn({},
        e, {
            complexObject: JSON.stringify(e.complexObject)
        });
        console.log(t);
        return Api.Put("/api/user-settings/general", t).then(() => {
            return ConsoleLog.info("General Setting saved!");
        });
    }
};
/*n.d(t, "a", function () {
    return GeneralSettingsSender;
});*/

export default GeneralSettingsSender