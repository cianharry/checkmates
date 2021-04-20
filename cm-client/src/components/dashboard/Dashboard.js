import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/profile'
// destructuring props
const Dashboard = ({getCurrentUser, auth, profile}) => {
    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentUser })(Dashboard)
