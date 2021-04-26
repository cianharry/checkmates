import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { getProfileById } from '../../actions/profile'
import ProfileMain from './ProfileMain'
import ProfileMilestones from './ProfileMilestones'

const Profile = ({ getProfileById, profile: {profile, loading, milestones }, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner 
                    animation="border"
                    role="status">
                </Spinner>
                ) : (
                    <Fragment>
                        <Link className="btn btn-light my-1" to="/profiles">Go Back</Link>
                        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                        (<Link className="btn btn-secondary ml-1 my-1" to="/edit-profile">Edit</Link>) }
                        <div className="container">
                            <ProfileMain profile={profile} />
                            
                            <h1 className='text-center'>User Milestones</h1>
                            {profile.milestones.length > 0 ? 
                            ( 
                                <Fragment>
                                    {profile.milestones.map(pms => (
                                        <ProfileMilestones key={pms._id} milestones={pms}/>
                                    ))
                                    }
                                </Fragment>
                            ) : (
                                <h4>No public milestones to display</h4>
                            )}
                        </div>
                    </Fragment>
                )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
