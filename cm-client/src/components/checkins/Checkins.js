import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCheckins, getPersonalCheckins } from '../../actions/checkin'
import { getCurrentUser } from '../../actions/profile'
import { Spinner } from 'react-bootstrap'
import CheckinItem from './CheckinItem'
import CheckinForm from './CheckinForm'

const Checkins = ({ getCurrentUser, getPersonalCheckins, checkin: { checkins, loading }, profile: { user } }) => {
    useEffect(() => {
        getCurrentUser()
        getPersonalCheckins(user._id)
    }, [getCurrentUser, getPersonalCheckins])
    return loading ? 
        <Spinner 
            animation="border"
            role="status">
        </Spinner> : (
        <Fragment>
            <CheckinForm/>
            <h1>Checkins</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the checkmates community
            </p>
            <div className="checkins">
                {checkins.map(checkin => (
                    <CheckinItem key={checkin._id} checkin={checkin}/>
                ))}
            </div>
        </Fragment>
    )
}

Checkins.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    getPersonalCheckins: PropTypes.func.isRequired,
    checkin: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    checkin: state.checkin,
    profile: state.auth
})

export default connect(mapStateToProps, { getPersonalCheckins, getCurrentUser })(Checkins)
