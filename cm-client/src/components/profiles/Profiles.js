import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
import './Profile.css'


const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
            { loading ? (
                <Spinner 
                    animation="border"
                    role="status">
                </Spinner>
                ) : (
                <Fragment>
                    <div className="profile-form">
                        <h1 className='check-font text-center large'>Check-mate Profiles</h1>
                        <p className="lead text-center"><i className="fas fa-hands-helping"></i> Connect with other Checkmates and build a support network with people who understand what you are going through... </p>
                        <div className="profiles-holder">
                            {/*
                            // Req_Id:      R0 - 
                            // Test_Id:     T045
                            */}
                            {profiles.length > 0 ? (
                                profiles.map(p => (
                                    <ProfileItem key={p._id} profile={p}></ProfileItem>
                                ))
                            ) : 'No profiles exist' }
                        </div>
                    </div>
                    
                </Fragment>)
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)
