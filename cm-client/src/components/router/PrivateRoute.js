import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


// private router component thta redirects unauthenticated user when they visit protected routes
// otherewise the target component is rendered with any relative state props
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render={props => 
            !auth.isAuthenticated && !auth.loading ? (
                <Redirect to='/login'/>
            ) : (
                <Component {...props} />
            ) 
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
