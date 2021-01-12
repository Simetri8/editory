import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import { DocumentYa } from './DocumentActions_v2';
import PageStates from './PageStates';
import RemoteCursorColor from './Document/RemoteCursorColor';

/// xxx(1557) /*CollaborativeArea*/

/// var k = n(0)/*React*/;  // 23 times
/// var B = n.n(k);
var is15 = React.version.startsWith("15");
/// var redux = n(1544)/*Rdx*/;  // 2 times
/// var states = n(1549)/*PageStates*/;  // 2 times
/// var El = n(256)/*RemoteCursorColor*/;  // 3 times
/// var documentActions = n(1553)/*DocumentActions*/;  // 1 times
/// var Pe = n(3);  // 2 times
/// var Fe = n.n(Pe);
class vl extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.handleEditIconClick = () => {
            this.setState({
                editInfo: {
                    name: this.props.self.displayName
                }
            });
        };
        this.handleKeyDown = (e) => {
            if (13 === e.keyCode) {
                e.preventDefault();
                e.stopPropagation();
                this.props.onNameChange(this.state.editInfo.name);
                return void this.setState({
                    editInfo: null
                });
            }
            if (27 === e.keyCode) {
                this.setState({
                    editInfo: null
                });
            }
        };
    }
    renderEditIcon() {
        if (this.props.self && this.props.self.anonymous) {
            return React.createElement("span", {
                onClick: this.handleEditIconClick,
                style: {
                    position: "absolute",
                    right: 5,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer"
                }
            },
                React.createElement("i", {
                    className: "fa fa-edit"
                }))
        } else {
            return null;
        }
    }
    changeName(e) {
        e = e.replace(/\r?\n|\r/g, "");
        this.setState({
            editInfo: _.assignIn({},
                this.state.editInfo, {
                name: e
            })
        });
    }
    renderNameEditMode() {
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
            React.createElement("input", {
                ref: (e) => {
                    if (e) {
                        e.focus();
                    }
                },
                style: {
                    flexGrow: 1
                },
                value: this.state.editInfo.name,
                onChange: (e) => {
                    return this.changeName(e.currentTarget.value);
                },
                onKeyDown: this.handleKeyDown
            }));
    }
    renderDisplayMode() {
        return React.createElement("div", null, React.createElement("span", null, "Me:", this.props.self && this.props.self.displayName), this.renderEditIcon());
    }
    render() {
        return React.createElement("div", {
            style: {
                padding: 5,
                borderBottom: "1px solid lightgray",
                background: "#e6e6e6",
                position: "relative"
            }
        },
            this.state.editInfo ? this.renderNameEditMode() : this.renderDisplayMode());
    }
}
class CollaborativeAreaComponent extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            parties: [],
            self: null,
            collapsed: false
        };
        this.handlePartiesChange = (e, t) => {
            this.setState({
                parties: e,
                self: t
            });
        };
        this.handleNameChange = (e) => {
            if (this.subscriber.raiseNameChange) {
                this.subscriber.raiseNameChange(e);
            }
            this.setState({
                self: _.assignIn({},
                    this.state.self, {
                    displayName: e
                })
            });
        };
        this.handleToggleCollapseExpand = () => {
            this.setState({
                collapsed: !this.state.collapsed
            });
        };
        this.subscriber = {
            handlePartiesChange: this.handlePartiesChange,
            raiseNameChange: null
        };
    }
    componentDidMount() {
        DocumentYa.registerPartyChangeSubscriber(this.subscriber);
    }
    getSideBarWidth() {
        return this.props.isSidebarShown ? this.props.sideBarWidth + 4 : 0;
    }
    renderOtherPartyNames() {
        return React.createElement("div", {
            style: {
                padding: 5,
                maxHeight: 100,
                overflowY: "auto"
            }
        },
            this.state.parties.map((e) => {
                return React.createElement("div", {
                    key: e.siteId,
                    style: {
                        color: RemoteCursorColor.generate(e.siteId),
                        marginBottom: 5
                    }
                },
                    React.createElement("span", null, e.displayName), React.createElement("div", {
                        style: {
                            float: "right",
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            background: RemoteCursorColor.generate(e.siteId),
                            marginRight: 5
                        }
                    }));
            }));
    }
    renderSelf() {
        return React.createElement(vl, {
            self: this.state.self || {
                displayName: "",
                anonymous: false,
                siteId: 0
            },
            onNameChange: this.handleNameChange
        });
    }
    renderExpandedMode() {
        return React.createElement("div", null, this.renderSelf(), this.renderOtherPartyNames(), this.renderCollapseIcon());
    }
    renderCollapseIcon() {
        return React.createElement("div", {
            onClick: this.handleToggleCollapseExpand,
            style: {
                fontSize: 12,
                top: -16,
                position: "absolute",
                width: 30,
                border: "1px solid lightgray",
                textAlign: "center",
                left: -1,
                color: "gray",
                cursor: "pointer",
                background: "rgb(230,230,230)"
            }
        },
            React.createElement("i", {
                className: "fa fa-angle-double-down"
            }));
    }
    renderCollapsedMode() {
        return React.createElement("div", {
            onClick: this.handleToggleCollapseExpand,
            style: {
                padding: 5,
                background: "rgb(230,230,230)",
                cursor: "pointer"
            }
        },
            React.createElement("div", {
                style: {
                    overflowX: "hidden",
                    whiteSpace: "nowrap"
                }
            },
                this.state.parties.map((e) => {
                    return React.createElement("div", {
                        key: e.siteId,
                        style: {
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            background: RemoteCursorColor.generate(e.siteId),
                            marginRight: 5
                        }
                    });
                })));
    }
    render() {
        return this.state.parties.length <= 0 ? React.createElement("div", null) : React.createElement("div", {
            style: {
                position: "fixed",
                bottom: 13,
                left: 2 + this.getSideBarWidth(),
                width: 150,
                border: "1px solid lightgray",
                background: "white",
                display: "flex",
                flexDirection: "column",
                zIndex: 999E3,
                backgroundColor: "white",
                fontSize: 13
            }
        },
            this.state.collapsed ? this.renderCollapsedMode() : this.renderExpandedMode());
    }
}
var mapStatesToProps = (e) => {
    return {
        isSidebarShown: PageStates.isSideBarShown(e),
        sideBarWidth: PageStates.sidebarWidth(e)
    };
}
var CollaborativeArea = connect(mapStatesToProps, null, null, {
    forwardRef: true
})(CollaborativeAreaComponent);
/*n.d(t, "a", function () {
    return CollaborativeArea;
});*/

export default CollaborativeArea