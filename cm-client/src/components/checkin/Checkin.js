import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { getCheckin } from '../../actions/checkin'



const Checkin = ({ getCheckin, checkin: { checkin, loading }, match }) => {
    useEffect(() => {
        getCheckin(match.params.id)
    }, [getCheckin])

    return (
        <Fragment>
            <Spinner 
                animation="border"
                role="status">
            </Spinner>
        </Fragment>
    )
}

Checkin.propTypes = {
    getCheckin: PropTypes.func.isRequired,
    checkin: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    checkin: state.checkin
})

export default connect(mapStateToProps, { getCheckin })(Checkin)
