import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/profile'
// REFERENCE https://www.educative.io/edpresso/how-to-create-a-loading-spinner-in-react
import { Spinner } from 'react-bootstrap';
import  Actions  from './Actions';
import { Link } from 'react-router-dom';

// destructuring props
const Dashboard = ({getCurrentUser, auth, profile}) => {
    useEffect(() => {
        // Req_Id: R0 
        // Test_Id: T034
        getCurrentUser();
    }, [])
    return profile.loading && profile.profile === null ? (
        <Spinner 
            animation="border"
            role="status">
        </Spinner>
    ) : (
        <Fragment>
            <h1 className="mainheading">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user pr-2"></i> 
                Welcome back { auth.user && auth.user.name }
            </p>
            {/*
            // Req_Id: R0 
            // Test_Id: T035
            */}
            { profile.profile !== null ? (
                <Fragment><Actions/></Fragment>
            ) : (
                <Fragment>
                    <p>You need to add your profile information before accessing the checkmates dashboard </p>
                    <Link to='/create-profile' className='btn btn-secondary'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
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
