import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1550) /*LoginActions*/

/// var n19 = n(19)/*TimerHelper*/;  // 1 times
var ri = new class {
    post(e, t, n) {
        n = n || "post";
        var r = document.createElement("form");
        var a;
        for (a in r.setAttribute("method", n), r.setAttribute("action", e), t) {
            if (t.hasOwnProperty(a)) {
                var i = document.createElement("input");
                i.setAttribute("type", "hidden");
                i.setAttribute("name", a);
                i.setAttribute("value", t[a]);
                r.appendChild(i);
            }
        }
        document.body.appendChild(r);
        r.submit();
    }
    login(e, userName, password) {
        var apiHost = "https://localhost:44302";
        TimerHelper.waitABit(() => {
            switch (e) {
                case "":
                    this.post(apiHost + "/api/auth/login", {
                        userName: userName,
                        password: password
                    });
                    break;
                case "gg":
                    this.post("/signin/google", {
                        scope: "email profile"
                    });
                    break;
                case "fce":
                    this.post("/signin/facebook", {
                        scope: "email,public_profile"
                    });
                    break;
                case "twr":
                    this.post("/signin/twitter", {
                        include_email: "true"
                    });
                    break;
                case "gh":
                    this.post("/signin/github", {
                        scope: "user:email"
                    });
            }
        });
    }
};
/*n.d(t, "a", function () {
    return ri;
});*/

export default ri