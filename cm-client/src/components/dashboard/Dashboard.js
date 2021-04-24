import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/profile'
// REFERENCE https://www.educative.io/edpresso/how-to-create-a-loading-spinner-in-react
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  Actions  from './Actions';
import Milestone from './Milestone';
import { deleteUser } from '../../actions/profile';

// destructuring props
const Dashboard = ({getCurrentUser, deleteUser, auth, profile}) => {
    useEffect(() => {
        // Req_Id: R0 
        // Test_Id: T034
        getCurrentUser();
    }, [getCurrentUser])
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
                <Fragment>
                    <Actions/>
                    <Milestone milestones={profile.profile.milestones} />
                    <div className="my-2">
                        <button onClick={() => deleteUser() } className="btn btn-danger">Delete Account</button>
                    </div>
                </Fragment>
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
    deleteUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentUser, deleteUser })(Dashboard)
