import { Link, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import plutchik from '../../assets/plutchik-med.png'

const Home = (props) => {
    // redirect if user logged in
    if(props.isAuth) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <div className="home-container bg-light">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <div className="vid-container">
                <h1 className="cover-heading">Why Checkmates?</h1>
                <p className="lead">The number of emotions we can experience as humans is estimated to exceed 34,000..... I know right?</p>
                <p className="lead">At <strong>Checkmates</strong> we apply a methodothology defined by Plutchik, in which he identifies 8 primary emotions that are grouped into polar opposites. Combinations of these emotions are the building blocks of our daily experiences in life and the key to understanding personal emotional wellbeing. </p>
                
            </div>
            <main role="main" className="inner cover p-5 text-center">
                <h2 className="cover-heading primary-col">Plutchik's Wheel of Emotions</h2>
                <img src={plutchik} alt=''/>
                <p className="lead">Join us today and see how regularly logging your emotional experinces in your digital journal can have a positive impact on your life</p>
                <p className="lead">
                <Link className="btn btn-lg btn-secondary" to='/register'>Sign Up</Link>
                <br/>
                <Link className="btn-primary btn-sm mt-2" to='/login'>Login</Link>
                </p>
            </main>
            <div className='vid-container'>
                <div className="container">
                    <p className="lead">Dr. Alan Watkins explains how utilizing such emotional tools helps us establish a plan of action</p>
                    <iframe width="707" height="397" src="https://www.youtube.com/embed/h-rRgpPbR5w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className="container m-auto">
                    <p className="lead">A short video on the importance of emotional intelligence for kids</p>
                    <iframe width="707" height="397" src="https://www.youtube.com/embed/SJOjpprbfeE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            
            <div className='m-auto p-5'>
                <p className="lead text-center">What?</p>
                <ul>
                    <li>Simplify emotions</li>
                    <li>Provides an opportunity for sharing</li>
                    <li>Empowers individuals and others</li>
                </ul>

                <p className="lead text-center"> How?</p>
                <ul>
                    <li>Learn to attend to your emotions regularly</li>
                    <li>Become curious and patient with your emotions</li>
                    <li>Talk about them, be honest with yourself and others</li>
                    <li>Learn to accept different emotions through understanding</li>
                    <li>Alter your emotions with other emotions</li>
                </ul>
            </div>

            <footer className="mastfoot mt-auto text-center">
                <div className="inner">
                <p>For professional medical support, please contact the <a className='primary-col' href="https://www.hse.ie/eng/services/list/4/mental-health-services/">HSE</a>, provided by <a className='primary-col' href="/">Checkmates</a>.</p>
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