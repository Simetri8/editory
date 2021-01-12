import React from 'react';
import Api from './Api';
import ModalDialogContainer from './Editor/ModalDialogContainer';

/// xxx(1565) /*AboutDialog*/

/// var k = n(0)/*React*/;  // 19 times
/// var B = n.n(k);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 1 times
class AboutDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isProgressing: true
        };
        this.onOk = () => {
            this.props.onClose();
        };
        this.close = () => {
            this.setState({
                isProgressing: false
            });
            this.props.onClose();
        };
        this.onCancel = () => {
            this.close();
        };
    }
    componentDidMount() {
        Api.Get("/api/commands/about-info").then((e) => {
            return e.json();
        }).then((x) => {
            var e = x.JSON || x;
            this.setState({
                info: e
            });
        }).
        finally(() => {
            this.setState({
                isProgressing: false
            });
        });
    }
    getContent() {
        return React.createElement("div", {
            style: {
                display: "block",
                textAlign: "center",
                fontSize: 13,
                padding: "20px 10px 20px 10px"
            }
        },
        React.createElement("div", null, " Mathcha Notebook"), React.createElement("div", {
            style: {
                paddingTop: 5
            }
        },
        " Version:", this.state.info && this.state.info.version), React.createElement("div", {
            style: {
                height: 50,
                display: "flex",
                justifyContent: "center",
                paddingTop: 10
            }
        },
        React.createElement("img", {
            src: "/icon.svg"
        })), React.createElement("div", {
            style: {
                marginTop: 20,
                textAlign: "left"
            }
        },
        React.createElement("div", null, "Note*:"), React.createElement("trained-data-info", {
            style: {}
        },
        "- The data is used for symbol classifier which was provided by the", React.createElement("a", {
            href: "https://zenodo.org/record/50022",
            style: {
                color: "#1b95e0"
            }
        },
        " HWRT database of handwritten symbols.")), React.createElement("br", null), React.createElement("training-method", null, "- Method to train data is followed by ", React.createElement("a", {
            href: "http://www.martin-thoma.de/about/",
            style: {
                color: "#1b95e0"
            }
        },
        " Martin Thoma"), " in his paper."), React.createElement("br", null), React.createElement("training-method", null, "- Spell check using hunspell and dictionaries can be found at  ", React.createElement("a", {
            href: "https://github.com/nhabuiduc/hunspell",
            style: {
                color: "#1b95e0"
            }
        },
        "Github project"))));
    }
    render() {
        return React.createElement("div", null, React.createElement(ModalDialogContainer, {
            style: {
                width: 700,
                maxWidth: "95vw"
            },
            okStyle: {
                display: "none"
            },
            centerButtons: true,
            dialogType: "YesNo",
            noLabel: "Cancel",
            message: null,
            isProgressing: this.state.isProgressing,
            onOk: this.onOk,
            onCancel: this.onCancel,
            onNo: this.onCancel,
            show: true
        },
        React.createElement("div", {
            style: {
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }
        },
        this.getContent())));
    }
}
/*n.d(t, "a", function () {
    return AboutDialog;
});*/

export default AboutDialog