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
        <div className="home-container">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <div className="vid-container">
                <h1 className="cover-heading large check-font">Why check-mate?</h1>
                <p className="lead">The number of emotions we can experience as humans is estimated to exceed 34,000..... I know right?</p>
                <p className="lead">At <strong>check-mate</strong> we apply a methodothology defined by Plutchik, in which he identifies 8 primary emotions that are grouped into polar opposites. Combinations of these emotions are the building blocks of our daily experiences in life and the key to understanding personal emotional wellbeing. </p>
                
            </div>
            <main role="main" className="inner cover mt-2 p-5 text-center bg-light">
                <h2 className="cover-heading primary-col">Plutchik's Wheel of Emotions</h2>
                <img className='home-logo' src={plutchik} alt=''/>
                <p className="lead">Join us today and see how constructive journaling can have a positive impact on your life</p>
                <p className="lead">
                <Link className="btn btn-lg btn-secondary" to='/register'>Sign Up</Link>
                <br/>
                <Link className="btn btn-primary mt-2" to='/login'>Login</Link>
                </p>
            </main>
            <div className='vid-container mt-2'>
                <div className="container">
                    <p className="lead">Dr. Alan Watkins explains how utilizing such emotional tools helps us establish a plan of action</p>
                    <iframe width="707" height="397" src="https://www.youtube.com/embed/h-rRgpPbR5w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="container m-auto">
                    <p className="lead">A short video on the importance of developing emotional intelligence for kids</p>
                    <iframe width="707" height="397" src="https://www.youtube.com/embed/SJOjpprbfeE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            
            <div className='text-container mt-2 d-flex p-5 bg-light'>
                <div className='w-50 text-center'>
                    <p className="lead primary-col">What we do?</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Simplify emotions</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Provide an opportunity for sharing</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Empower individuals and others</p>
                </div>
                <div className='w-50 text-center'>
                    <p className="lead primary-col"> What you do?</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Learn to attend to your emotions regularly</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Become curious and patient with your emotions</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Talk about them, be honest with yourself and others</p>
                    <p><i className="fas primary-col fa-angle-right"></i> Learn to accept different emotions through understanding</p>
                </div>

                </div>
                <footer className="mastfoot  text-center">
                    <div className="inner mt-2">
                        <p>For professional medical support, please contact the <a className='primary-col' href="https://www.hse.ie/eng/services/list/4/mental-health-services/">HSE</a>, provided by <a className='primary-col' href="/">Checkmates</a>.</p>
                        <p className=" mb-3">Checkmates © 2020-2021</p>
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