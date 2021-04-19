import React from 'react'
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
// destructuring props to access alerts created in mapStateToProps
const Alert = ({ alerts }) => 
    // checking that alerts exists and mappig the array
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        // dynamic styling based on the alert type
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            { alert.msg }
        </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}
// mapping the Redux state (alert reducer) to the component props so it can be accessed
const mapStateToProps = state => ({
    alerts: state.alerts
})

export default connect(mapStateToProps)(Alert)
