import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import symbol from '../../assets/EnsoThumb.png'

const Navbar = (props) => {
    // setting the links for authenticated users
    // Req_Id:      R0 - 
    // Test_Id:     T032

    // Req_Id:      R03 - User experience
    // Test_Id:     T033 - LOGOUT
    const userLinks = (
        <nav className="nav nav-masthead justify-content-center">
            <Link
                className="nav-link"
                to='/checkins/all'>
                    <i className="fas fa-hands-helping primary-col"></i> <span className='hide-sm'>  check-mates</span>
            </Link>
            <Link
                className="nav-link"
                to='/profiles'>
                    <i className="fas fa-users primary-col"></i> <span className='hide-sm'>  circle</span>
            </Link>
            <Link
                className="nav-link"
                to='/dashboard'>
                    <i className='far fa-user-circle primary-col'/> <span className='hide-sm'> dashboard</span>
            </Link>
            <Link
                className="nav-link"
                to='/checkins'><i className='fas fa-calendar-check primary-col'/><span className='hide-sm'> check-in</span>
            </Link>
            
            <Link
                className="nav-link"
                onClick={props.logout}
                to='/'>
                    <i className='fas fa-power-off primary-col'/><span className='hide-sm'> logout</span> 
            </Link>
        </nav>
    );
    // setting the links for guest users
    // Req_Id:      R0 - 
    // Test_Id:     T031
    const guestLinks = (
        
        <nav className="nav nav-masthead ">    
            <Link className="nav-link" to='/'><i className="fas fa-home primary-col"></i><span className='hide-sm ml-2'>Home</span> </Link>
            <Link className="nav-link" to='/register'>Register</Link>
            <Link className="nav-link" to='/login'>Login</Link>
        </nav>
    );
    // ternary expression used to display links depending on the user auth state recieved from props
    return (
        <header className="masthead">
            <div className="inner">
                <img className="hide-sm" src={symbol} alt='logo'/>
                <Link className="h2 hide-sm pl-3" to='/'>check-mate</Link>
                { !props.auth.loading && (<Fragment>{ props.auth.isAuthenticated ? userLinks : guestLinks }</Fragment>)}
            </div>
        </header>
        
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

// mapping the auth state to props
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);