import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCheckins } from '../../actions/checkin'
import { Spinner } from 'react-bootstrap'

const Checkins = ({ getCheckins, checkin: { checkins, loading } }) => {
    useEffect(() => {
        getCheckins()
    }, [getCheckins])
    return (
        <div>
            Get checkins test
            <br/>
            <Spinner 
                animation="border"
                role="status">
            </Spinner>
        </div>
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
