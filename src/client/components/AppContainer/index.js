// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../../actions'
import MainContainer from '../MainContainer'
import { withRouter } from 'react-router-dom'
import type { State, Dispatch } from '../../types'

const mapStateToProps = (state: State) => {
  return {
    notification: state.notification,
    store_setting: state.store_setting,
    app_nav: state.app_nav,
    metafields: state.metafields,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
