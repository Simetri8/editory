import _ from 'lodash';
import * as Promise from "bluebird";
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AboutDialog from './AboutDialog';
import Api from './Api';
import ArrayHelper from './Mathcha/ArrayHelper';
import ConsoleLog from './ConsoleLog';
import DocumentActions from './DocumentActions_v2';
import DocumentCorruption from './Document/DocumentCorruption';
import DocumentDownloader from './DocumentDownloader';
import DocumentInfo from './DocumentInfo_v2';
import DocumentProvider from './DocumentProvider';
import DocumentRenameDialog from './DocumentRenameDialog';
import DocumentSidebar from './DocumentSidebar';
import ExportHandlerForTest from './Document/ExportHandlerForTest';
import FindAndReplace from './FindAndReplace';
import FontsLoader from './FontsLoader';
import GeneralSettingsSender from './GeneralSettingsSender';
import HtmlExporter from './HtmlExporter';
import ImageService from './Mathcha/ImageService';
import ImageServiceProp from './Mathcha/ImageServiceProp';
import InMemoryMathTemplateProvider from './InMemoryMathTemplateProvider';
import InstructionPopup from './InstructionPopup';
import KeyDownHandler from './KeyDownHandler';
import LicenseCheck from './LicenseCheck';
import MathGlobal from './MathGlobal';
import MathType from './MathType_v2';
import MathTypeBridge from './MathTypeBridge';
import MathTypeErrorReporter from './MathTypeErrorReporter';
import MessageProvider from './Mathcha/MessageProvider';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';
import PrintPreviewContainer from './PrintPreviewContainer';
import PrintSettingsDialog from './PrintSettingsDialog';
import QuickStart from './QuickStart';
import ResizeBar from './ResizeBar';
import SaveHtmlDialog from './SaveHtmlDialog';
import SessionExpiredDialog from './SessionExpiredDialog';
import SettingsManager from './SettingsManager';
import TimerHelper from './Mathcha/TimerHelper';
import UserSettingsDialog from './UserSettingsDialog';
import WarningErrorRegion from './WarningErrorRegion';

import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar, Box, Grid, Paper, IconButton, Avatar, Icon, Toolbar, Typography,
	Menu, MenuItem, Divider, ListItemSecondaryAction, ListItemText, ListSubheader, ListItemIcon,
	LinearProgress
} from "@material-ui/core";

/// xxx(1506) /*MathTypeContainer*/

ImageServiceProp.setService(ImageService);


class MathTypeContainerComponent extends React.Component {
	constructor(e) {
		super(e);
		console.log("MathTypeContainer", e);
		this.colMathTypeBridge = new MathTypeBridge();
		this.handleTemplateChanged = (e) => {
			this.raiseSetting("mathTemplates", e);
		};
		this.print = (e) => {
			if (!MathGlobal.isMobileOrTablet()) {
				this.setState({
					pringSettingsShown: false
				});
				this.containerLayer.focus();
				this.mathType.clearSelect();
				TimerHelper.waitALitteWhile(() => {
					window.print();
				});
			}
		};
		this.handleContainerLayerMouseDown = () => {
			console.log("handleContainerLayerMouseDown");
			this.props.handleContainerLayerMouseDown(this.mathType);
			if (this.mathType) {
				this.mathType.clearSelect();
			}
		};
		this.mathTypeSaveRequest = () => { };
		this.save = () => {
			if (this.mathType) {
				if (!this.props.isSaving) {
					if ("saved" != this.props.saveStatus) {
						this.props.requestSaveDocument();
					}
				}
			}
		};
		this.onMathTypeModelChanged = (e, t) => {
			if (!this.isSuppressRequestModalChanged) {
				if (this.documentInfoBarRef) {
					this.documentInfoBarRef.setDocumentModel(e, t);
				}
				if ("unsave" != this.props.saveStatus) {
					this.props.requestSaveStatus("unsave");
				}
				if (this.props.onMathTypeModelChange) {
					this.props.onMathTypeModelChange(e, t);
				}
			}
		};
		this.onIncrementalFindInfoChanged = (e) => {
			if (this.findAndReplace) {
				this.findAndReplace.updateIncrementalFindInfoChanged(e);
			}
		};
		this.handleMathTypeError = () => {
			try {
				MathTypeErrorReporter.report({
					documentId: this.props.activeLoadedDocumentData && this.props.activeLoadedDocumentData.id || "unknown",
					documentData: JSON.stringify(this.state.currentModel),
					userAgent: window.navigator.userAgent
				});
			} catch (e) {
				ConsoleLog.error(e);
			}
		};
		this.handlePageWidthChanged = (e) => {
			this.props.setDocumentWidth(this.props.activeLoadedDocumentData.id, e);
			TimerHelper.next(() => {
				this.mathType.notifyLayoutChanged();
			});
		};
		this.handleMathTypeRef = (e) => {
			this.props.activeLoadedDocumentData.mathType = e;
			this.mathType = e;
			this.colMathTypeBridge.setMathType(e);
		};
		this.handleExternalUndo = () => {
			var e = DocumentActions.getCurrentColDocumentSession();
			if (e) {
				e.requestUndo();
			}
		};
		this.handleExternalRedo = () => {
			var e = DocumentActions.getCurrentColDocumentSession();
			if (e) {
				e.requestRedo();
			}
		};
		this.handleMaintainInfoClose = () => {
			this.setState({
				maintainInfo: null
			});
		};
		this.handleBackupInfoClose = () => {
			this.setState({
				dataBackupInfo: null
			});
		};
		this.onSidebarInitCompleted = () => {
			if (!MathGlobal.isForceQuickStart()) {
				if (MathGlobal.isOfflineMode() && !this.props.isQuickStartReadFromServer) {
					setTimeout(() => {
						Api.Post("/api/user/quick-start-read", null);
					},
						2E3);
					return void this.setState({
						quickStartShow: true
					})
				} else {
					return void (SettingsManager.isReadQuickStart() || MathGlobal.isMobileOrTablet() || MathGlobal.isTestEnv() || !this.props.isAnonymousUser || this.setState({
						quickStartShow: true
					}));
				}
			}
			this.setState({
				quickStartShow: true
			});
		};
		this.closeFindAndReplace = () => {
			this.setState({
				showFindAndReplace: false
			});
			if (this.mathType) {
				this.mathType.closeFindSession();
			}
		};
		this.showFindAndReplace = (e) => {
			if (this.mathType) {
				if (this.state.showFindAndReplace) {
					this.findAndReplace.focus();
					return void (e != this.state.showReplaceOption && this.setState({
						showReplaceOption: e
					}));
				}
				TimerHelper.next(() => {
					var e = ReactDOM.findDOMNode(this.findAndReplace);
					this.mathType.setFindAndReplaceElementArea(e);
				});
				this.setState({
					showFindAndReplace: true,
					showReplaceOption: e
				});
			}
		};
		this.handleDocumentInfoBarRef = (e) => {
			this.documentInfoBarRef = e;
		};
		this.handleRequestPageSettings = () => {
			this.mathType.showPageSetting();
		};
		this.handleUserSettingsRef = (e) => {
			this.userSettingsDialog = e;
		};
		this.handleRequestShortcutConfigure = () => {
			if (this.mathType) {
				this.mathType.showShortcutManager();
			}
		};
		this.handleSessionExpiredIgnore = () => {
			this.setState({
				forceShowSessionExpiredDialog: false,
				shownSessionExpired: true
			});
		};
		this.handleLicenseRef = (e) => {
			this.licenseRef = e;
		};
		this.handleItemsBarHide = () => {
			if (MathGlobal.isMenuHandledByService()) {
				Api.Post("/api/commands/hide-toolbar", null);
			}
			this.raiseSetting("hideQuickToolBar", true);
		};
		this.handleRequestSaveAsHtml = (e) => {
			var t = {
				mathTypeElement: this.mathType.getMathTypeHtmlElement(),
				documentName: this.props.activeDocumentOverview && this.props.activeDocumentOverview.name,
				styles: jQuery("html>head>style").toArray().map((e) => {
					return e.innerHTML;
				}),
				documentWidth: e.keepDocumentWidth ? this.getCurrentPageWidth() : void 0,
				model: this.mathType.getModel()
			};
			if (MathGlobal.isElectronEnv()) {
				return Promise.map(this.findStyleLink(), (e) => {
					return DocumentDownloader.downloadAsStr(e);
				}).then((e) => {
					t.styles = t.styles.concat(e);
					return HtmlExporter.run(t);
				})
			} else {
				if (MathGlobal.isTestEnv()) {
					t.forTest = true;
					return HtmlExporter.run(t).then((e) => {
						console.log(e.clonedMathType);
						var t = ExportHandlerForTest.requestTestContainer({
							height: 400
						});
						t.style.overflow = "auto";
						t.innerHTML = e.clonedMathType;
						TimerHelper.next(() => {
							this.setState({
								saveAsHtmlSettingsShown: false
							});
						});
						return e;
					});
				} else {
					return HtmlExporter.run(t);
				}
			}
		};
		this.showPrintSettings = () => {
			this.setState({
				pringSettingsShown: true
			});
		};
		this.handleShortcutsChange = (e) => {
			var t = _.assignIn({},
				this.props.userGeneralSettings, {
				complexObject: _.assignIn({},
					this.props.userGeneralSettings.complexObject, {
					inputShortcuts: e
				})
			});
			this.updateGeneralSettings(t);
		};
		this.handlePageInfoChange = (e) => {
			var t = _.assignIn({},
				this.props.userGeneralSettings, {
				complexObject: _.assignIn({},
					this.props.userGeneralSettings.complexObject, {
					defaultPageInformation: e
				})
			});
			this.updateGeneralSettings(t);
		};
		this.handleMaintainInfo = (e) => {
			this.setState({
				maintainInfo: e
			});
		};
		this.state = {
			resizingBarShow: false,
			resizingBarLeft: 0,
			resizingEditorContainerWidth: this.getCurrentPageWidth(),
			quickStartShow: false,
			showInstructionPopup: false,
			//isDocumentLoading: true,
			showFindAndReplace: false,
			showReplaceOption: false,
			currentModel: this.props.activeLoadedDocumentData
				? this.props.activeLoadedDocumentData.data
				: this.getInitModel(),
			currentModelHistory: this.props.activeLoadedDocumentData
				? this.props.activeLoadedDocumentData.historyContents
				: null,
			showAboutDialog: false,
			mathTypeKey: this.generateMathTypeKey()
		};
		this.headerElement = null;
		this.inMemoryMathTemplateProvider = new InMemoryMathTemplateProvider(this.handleTemplateChanged);
		this.registerSaveInterval();
		this.startCheckBakupInfo();

	}
	generateMathTypeKey() {
		return "mtkey" + Math.random();
	}
	getColMathType() {
		return this.colMathTypeBridge;
	}
	startCheckBakupInfo() {
		if (MathGlobal.isElectronEnv()) {
			setTimeout(() => {
				Api.Get("/api/commands/backup-info").then((e) => {
					return e.json();
				}).then((x) => {
					var e = x.JSON || x;
					if (e.backupFileCount > 500) {
						this.setState({
							dataBackupInfo: {
								message: "Backup Warning:\n There are more than 500 backup files,you may need to remove some of them to save space. Please go to to User Settings to find Backup Folder"
							}
						});
					} else {
						if (e.backupFileSizeSumInMb > 2E3) {
							this.setState({
								dataBackupInfo: {
									message: "Backup Warning:\n There are ".concat(e.backupFileCount, " backup files,total size more than 2GB,you may need to remove some of them to save space. Please go to to User Settings to find Backup Folder")
								}
							});
						}
					}
				});
			},
				1E4);
		}
	}
	registerSaveInterval() {
		if (!MathGlobal.isSaveDisabled()) {
			setInterval(() => {
				this.save();
			},
				17E3);
		}
	}
	raiseSetting(e, t) {
		this.props.customUser((n) => {
			return _.assignIn({},
				n, {
				settings: _.assignIn({},
					n.settings, {
					[e]: t
				})
			});
		});
	}
	shouldComponentUpdate(e, t) {
		return !ArrayHelper.areEqualShallow(t, this.state)
			|| !ArrayHelper.areEqualShallow(e, this.props);
	}
	getCurrentPageWidth(e) {
		return (e = e || this.props).activeLoadedDocumentData && e.activeLoadedDocumentData.settings && e.activeLoadedDocumentData.settings.width ? e.activeLoadedDocumentData.settings.width : 700;
	}
	suppressModalChanged() {
		this.isSuppressRequestModalChanged = true;
	}
	restoreModalChanged() {
		this.isSuppressRequestModalChanged = false;
	}
	isDocumentChanged(e) {
		return this.props.activeLoadedDocumentData && e.activeLoadedDocumentData ? this.props.activeLoadedDocumentData.data != e.activeLoadedDocumentData.data || this.props.activeLoadedDocumentData.id != e.activeLoadedDocumentData.id : this.props.activeLoadedDocumentData != e.activeLoadedDocumentData;
	}
	isDocumentWriteable() {
		var e = this.props.activeDocumentOverview;
		return e && (!e.notOwner || !!e.writeable);
	}
	isDocumentReadonly() {
		return !this.isDocumentWriteable();
	}

	componentDidMount() {
		console.log("componentDidMount");
		this.fixIosHeaderDisappearOnKeyBoardOn();
		if (!this.headerElement) {
			this.headerElement = document.getElementsByTagName("header")[0];
		}
		DocumentProvider.setDocumentProvider(this);
		if (this.mathType) {
			this.mathType.setScrollElement(this.containerLayer);
		}
	}
	fixIosHeaderDisappearOnKeyBoardOn() {
		if (MathGlobal.isIos()) {
			var body = document.body;
			setInterval(() => {
				if (body.scrollTop > 50) {
					this.containerLayer.scrollTop += body.scrollTop;
					body.scrollTop = 0;
				}
			},
				500);
		}
	}
	componentDidUpdate(e) {

		if (this.mathType) {
			this.mathType.setScrollElement(this.containerLayer);
		}

		this.inMemoryMathTemplateProvider.setTemplatesFromString(e.mathTemplates);
		if (e.activeLoadedDocumentData != this.props.activeLoadedDocumentData) {
			this.suppressModalChanged();
		}
		if (this.isDocumentChanged(e)) {
			console.warn("%c Document model changed,reload whole page !!!!!!!!!", "color:violet");
			DocumentCorruption.clearDocumentCorruptionState();
			if (this.state.showFindAndReplace) {
				this.closeFindAndReplace();
			}
			if (e.activeLoadedDocumentData) {
				if (e.activeLoadedDocumentData.data && this.documentInfoBarRef) {
					this.documentInfoBarRef.setDocumentModel(e.activeLoadedDocumentData.data);
				}
				this.setState({
					currentModel: e.activeLoadedDocumentData.data,
					currentModelHistory: e.activeLoadedDocumentData.historyContents,
					mathTypeKey: this.generateMathTypeKey()
				});
				if (!this.props.activeLoadedDocumentData) {
					this.setState({
						resizingEditorContainerWidth: this.getCurrentPageWidth(e)
					});
				}
			}
		}

		// if (e.isDocumentLoading != this.props.isDocumentLoading) {
		//     if (e.isDocumentLoading) {
		//         this.setState({
		//             isDocumentLoading: true
		//         });
		//     } else {
		//         TimerHelper.waitALitteWhile(() => {
		//             this.setState({
		//                 isDocumentLoading: false
		//             });
		//         });
		//     }
		// }
		if (!this.state.shownSessionExpired && this.isSessionExpiredError(e.activeDocumentError)) {
			this.setState({
				forceShowSessionExpiredDialog: true
			});
		}
		if (this.isSuppressRequestModalChanged) {
			TimerHelper.next(() => {
				this.restoreModalChanged();
			});
		}
	}
	getDocumentInfo() {
		if (!this.mathType || !this.props.activeDocumentOverview || !this.props.activeLoadedDocumentData) {
			throw new Error("current document not open");
		}
		var e = this.props.activeLoadedDocumentData;
		var t = this.props.activeDocumentOverview;
		return {
			id: e.id,
			model: this.mathType.getModel(),
			settings: e.settings,
			notOwner: !!t.notOwner
		};
	}
	getHistoryContents() {
		if (!this.mathType) {
			throw new Error("current document not open");
		}
		return this.mathType.getHistoryContents();
	}
	getInitModel() {
		return null;
	}
	isViewOnly() {
		var ok = this.isDocumentReadonly();
		return ok;
	}
	calculateMathTypeKey() {
		var e = this.props.activeLoadedDocumentData && this.props.activeLoadedDocumentData.id || "";
		var t = this.state.currentModel && this.state.currentModel.id || "";
		return "".concat(e, "-").concat(t, "-").concat(this.state.mathTypeKey);
	}
	inColMode() {
		return !!MathGlobal.isCollaboratingTesting() && this.props.activeLoadedDocumentData && !!this.props.activeLoadedDocumentData.colInfo;
	}
	renderMathType() {
		if (this.props.activeLoadedDocumentData)
			return <MathType
				fontsLoader={FontsLoader}
				spellCheck={false}
				externalUndoRedo={this.inColMode()}
				onUndoRequest={this.handleExternalUndo}
				onRedoRequest={this.handleExternalRedo}
				mathTemplateProvider={this.inMemoryMathTemplateProvider}
				key={this.calculateMathTypeKey()}
				onShortcutsChange={this.handleShortcutsChange}
				onPageInformationChange={this.handlePageInfoChange}
				onError={this.handleMathTypeError}
				onItemsBarHide={this.handleItemsBarHide}
				itemsBarHide={this.props.itemsBarHide}
				preventFocusOnCreated={!SettingsManager.isReadQuickStart()}
				model={this.state.currentModel}
				historyContents={this.state.currentModelHistory}
				selectOnly={this.isViewOnly()}
				isSidebarShown={this.props.isSidebarShown}
				sideBarWidth={this.props.sideBarWidth}
				onSaveRequest={this.mathTypeSaveRequest}
				onModelChanged={this.onMathTypeModelChanged}
				onIncrementalFindInfoChanged={this.onIncrementalFindInfoChanged}
				settings={this.props.userGeneralSettings}
				ref={this.handleMathTypeRef}
				readOnly={this.props.readOnly} //!question.editing
				isPlainTextOnly={false}
				onBlur={this.props.onBlur}
				onFocus={this.props.onFocus}
			/>
	}
	getTopPosition() {
		return this.props.activeLoadedDocumentData ? MathGlobal.isMobileOrTablet() ? 160 : 110 : 60;
	}
	getSideBarWidth() {
		return this.props.isSidebarShown ? this.props.sideBarWidth : 0;
	}
	renderWarningErrors() {
		return React.createElement(WarningErrorRegion, {
			dataBackupInfo: this.state.dataBackupInfo,
			onDataBackupInfoClose: this.handleBackupInfoClose,
			maintainInfo: this.state.maintainInfo,
			onMaintainClose: this.handleMaintainInfoClose,
			sideBarWidth: this.getSideBarWidth(),
			topPosition: this.getTopPosition(),
			activeDocumentError: this.props.activeDocumentError,
			forceShowSessionExpiredDialog: this.state.forceShowSessionExpiredDialog,
			netWorkStatus: this.props.netWorkStatus
		});
	}
	renderFindAndReplace() {
		return this.state.showFindAndReplace
			? <FindAndReplace
				ref={(e) => {
					return this.findAndReplace = e;
				}}
				selectOnly={this.isViewOnly()}
				onClose={() => {
					return this.closeFindAndReplace();
				}}
				showReplace={this.state.showReplaceOption}
				requestReplace={(e, t) => {
					return this.mathType.requestReplace(e, t);
				}}
				requestReplaceAll={(e, t) => {
					return this.mathType.requestReplaceAll(e, t);
				}}
				onNext={() => {
					return this.mathType.findNext();
				}}
				onPrevious={() => {
					return this.mathType.findPrevious();
				}}
				onFind={(e, t) => {
					return console.log("find request:", e),
						this.mathType.find(e, t);
				}} />
			: null;
	}
	renderDocumentInfoBar() {
		if (!MathGlobal.isMobileOrTablet()) {
			return React.createElement(DocumentInfo, {
				requestPageSettings: this.handleRequestPageSettings,
				ref: this.handleDocumentInfoBarRef,
				show: !!this.props.activeLoadedDocumentData
			});
		}
	}
	renderPaddingElement() {
		if (MathGlobal.isMobileOrTablet()) {
			return React.createElement("padding-element", {
				style: {
					width: "100%",
					height: "700px",
					display: "block",
					background: "transparent"
				}
			});
		}
	}
	renderUserSettings() {
		if (this.state.showUserSettings) {
			return React.createElement(UserSettingsDialog, {
				requestShortcutConfigure: this.handleRequestShortcutConfigure,
				ref: this.handleUserSettingsRef,
				onClose: () => {
					return this.setState({
						showUserSettings: false
					});
				}
			});
		}
	}
	showUserSettings() {
		this.setState({
			showUserSettings: true
		});
	}
	isSessionExpiredError(e) {
		return e && e.notLoggedIn;
	}
	renderSessionExpired() {
		if (this.state.forceShowSessionExpiredDialog) {
			return React.createElement(SessionExpiredDialog, {
				onIgnore: this.handleSessionExpiredIgnore
			});
		}
	}
	showLicenseDialog() {
		if (this.licenseRef) {
			this.licenseRef.showDialog();
		}
	}
	renderLicense() {
		var licenseManagement = MathGlobal.licenseManagement();
		if (licenseManagement) {
			return React.createElement(LicenseCheck, {
				ref: this.handleLicenseRef
			});
		}
	}
	importFromZipFile() {
		Api.Post("/api/request-import-from-zip", null).then((e) => {
			return e.json();
		}).then((x) => {
			var e = x.JSON || x;
			var t = e.tree;
			this.props.customDocuments((e) => {
				return _.assignIn({},
					e, {
					tree: t
				});
			});
		}).
			catch(() => {
				MessageProvider.showError("File is invalid,could not import to Application");
			});
	}
	exportToHtml() {
		this.setState({
			saveAsHtmlSettingsShown: true
		});
	}
	findStyleLink() {
		return _.uniq(jQuery("head>link[rel='stylesheet']").toArray().map((e) => {
			return jQuery(e).attr("href");
		})).filter((e) => {
			return !e.endsWith("fonts.css");
		});
	}
	showToolbar() {
		if (MathGlobal.isMenuHandledByService()) {
			Api.Post("/api/commands/show-toolbar", null);
		}
		this.raiseSetting("hideQuickToolBar", false);
	}
	showAboutDialog() {
		this.setState({
			showAboutDialog: true
		});
	}
	renderAboutDialog() {
		if (this.state.showAboutDialog) {
			return React.createElement(AboutDialog, {
				onClose: () => {
					return this.setState({
						showAboutDialog: false
					});
				}
			});
		}
	}
	renderPrintSettings() {
		if (this.state.pringSettingsShown && this.mathType) {
			return React.createElement(PrintSettingsDialog, {
				fixedContextHandler: this.mathType.getFixedContextHandler(),
				mathTypeHtml: this.mathType.getMathTypeHtmlElement(),
				onPrint: this.print,
				onClose: () => {
					return this.setState({
						pringSettingsShown: false
					});
				}
			});
		}
	}
	onZoomLevelChanged(e) {
		if (this.userSettingsDialog) {
			this.userSettingsDialog.onZoomLevelChanged(e);
		}
	}
	updateGeneralSettings(e) {
		this.props.customUser((t) => {
			return _.assignIn({},
				t, {
				settings: _.assignIn({},
					t.settings, {
					generalSettings: e
				})
			});
		});
		GeneralSettingsSender.updateGeneralSettings(e);
	}
	renderSaveAsHtmlSettings() {
		if (this.state.saveAsHtmlSettingsShown && this.mathType) {
			return <SaveHtmlDialog
				onRequestSave={this.handleRequestSaveAsHtml}
				onClose={() => {
					this.setState({
						saveAsHtmlSettingsShown: false
					})
				}} />
		}
	}
	render() {

		var styles = {
			root: {
				flexGrow: 1,
				backgroundColor: "#cccccc"
			},
			paper: {
				padding: "4px",
				backgroundColor: "#f7f7f7",
				margin: "0px 8px 0 8px"
			}
		};

		return <React.Fragment>

			{/* {this.renderWarningErrors()} */}

			<KeyDownHandler
				//onCloseFindAndReplace={this.closeFindAndReplace}
				//onShowFindAndReplace={this.showFindAndReplace}
				onPrint={this.showPrintSettings}
				onSave={this.save}
			//showFindAndReplace={this.state.showFindAndReplace} 
			/>

			{this.renderUserSettings()}

			{this.props.activeLoadedDocumentData
				? <Grid item xs={12} sm={10} md={8} lg={6} ref={(e) => {
					console.log("Panel.containerLayer", e);
					this.containerLayer = e;
				}}>
					<Paper style={styles.paper}>
						{this.renderMathType()}
						{/* {this.renderDocumentInfoBar()} */}
					</Paper>
				</Grid>
				: null}


		</React.Fragment>
	}
}

//var MathTypeContainer = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(MathTypeContainerComponent);

export default MathTypeContainerComponent