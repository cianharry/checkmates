import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'


const Profiles = props => {
    useEffect(() => {
        props.getProfiles()
    }, [props.getProfiles])
    return (
        <Fragment>
            { props.profile.loading ? (
                <Spinner 
                    animation="border"
                    role="status">
                </Spinner>
                ) : (
                <Fragment>
                    <h1>Checkmates Profiles</h1>
                    <p className="lead"><i className="fas fa-hands-helping"></i> Connect with other Checkmates and build a support network with people who understand what you are going through... </p>
                    <div className="background-col">
                        {/*
                        // Req_Id:      R0 - 
                        // Test_Id:     T045
                        */}
                        {props.profile.profiles.length > 0 ? (
                            props.profile.profiles.map(p => (
                                <ProfileItem key={p._id} profile={p}></ProfileItem>
                            ))
                        ) : 'No profiles exist' }
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
