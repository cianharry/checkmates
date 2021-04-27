import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCheckins } from '../../actions/checkin'
import { Spinner } from 'react-bootstrap'
import CheckinItem from './CheckinItem'
import CheckinForm from './CheckinForm'

const Checkins = ({ getCheckins, checkin: { checkins, loading } }) => {
    useEffect(() => {
        getCheckins()
    }, [getCheckins])
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
    getCheckins: PropTypes.func.isRequired,
    checkin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    checkin: state.checkin
})

export default connect(mapStateToProps, { getCheckins })(Checkins)
