import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MathTypeContainer from './MathTypeContainer_v2'

export default class ExampleComponent extends Component {
	static propTypes = {
		text: PropTypes.string
	}

	render() {
		return <MathTypeContainer
			requestSaveStatus={(args) => console.log("editory.requestSaveStatus", args)}
			requestSaveDocument={(args) => console.log("editory.requestSaveDocument", args)}
			setDocumentWidth={(args) => console.log("editory.setDocumentWidth", args)}
			customUser={(args) => console.log("editory.customUser", args)}
			customDocuments={(args) => console.log("editory.customDocuments", args)}
		/>
	}

	// var mapStateToProps = (state) => {
	// return {
	// isSidebarShown: PageStates.isSideBarShown(state),
	// sideBarWidth: PageStates.sidebarWidth(state),
	//isDocumentLoading: PageStates.isDocumentLoading(state),
	// //activeLoadedDocumentData: PageStates.activeLoadedDocumentData(state),
	// isSaving: PageStates.isSaving(state),
	// saveStatus: PageStates.saveStatus(state),
	// activeDocumentError: PageStates.activeDocumentError(state),
	// netWorkStatus: PageStates.netWorkStatus(state),
	// //activeDocumentOverview: PageStates.activeDocumentOverview(state),
	// itemsBarHide: PageStates.itemsBarHide(state),
	// isAnonymousUser: PageStates.isAnonymousUser(state),
	// userGeneralSettings: PageStates.user(state).settings.generalSettings,
	// isQuickStartReadFromServer: PageStates.isQuickStartReadFromServer(state),
	// mathTemplates: PageStates.user(state).settings.mathTemplates
	// 	};
	// };
	// var mapDispatchToProps = {
	//     requestSaveStatus: PageDispatches.requestSaveStatus,
	//     requestSaveDocument: PageDispatches.requestSaveDocument,
	//     setDocumentWidth: PageDispatches.setDocumentWidth,
	//     customUser: PageDispatches.customUser,
	//     customDocuments: PageDispatches.customDocuments
	// };
}
