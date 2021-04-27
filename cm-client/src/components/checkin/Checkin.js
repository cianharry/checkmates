import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { getCheckin } from '../../actions/checkin'
import CheckinItem from '../checkins/CheckinItem'
import CheckinComment from './CheckinComment'



const Checkin = ({ getCheckin, checkin: { checkin, loading }, match }) => {
    useEffect(() => {
        getCheckin(match.params.id)
    }, [getCheckin])

    return loading || checkin === null ? ( 
        <Fragment>
            <Spinner 
                animation="border"
                role="status">
            </Spinner>
        </Fragment>
    ) : (
        <Fragment>
            <Link to={'/checkins'} className='btn btn-light mb-2'>Go Back</Link>
            <CheckinItem checkin={checkin} showButtons={false}/>
            <CheckinComment checkinId={checkin._id} />
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
