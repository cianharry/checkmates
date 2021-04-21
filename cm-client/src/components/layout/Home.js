import { Link, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Home = (props) => {
    // redirect if user logged in
    if(props.isAuth) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <div className="text-center">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner cover">
                <h1 className="cover-heading">Checkmates</h1>
                <p className="lead">Join us today and see how regularly logging your experiences in your digital journal has an positive impact on your feelinsg and the productivity in your life</p>
                <p className="lead">
                <Link className="btn btn-lg btn-secondary" to='/register'>Sign Up</Link>
                <br/>
                <Link className="btn btn-sm btn-outline-light mt-2" to='/login'>Login</Link>
                </p>
            </main>

            

            <footer className="mastfoot mt-auto">
                <div className="inner">
                <p>For professional medical support, please contact the <a href="https://www.hse.ie/eng/services/list/4/mental-health-services/">HSE</a>, provided by <a href="/">Checkmates</a>.</p>
                </div>
            </footer>
            </div>
        </div>
    )
}

Home.propTypes = {
    isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home)