import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCheckins } from '../../actions/checkin'
import { Spinner } from 'react-bootstrap'
import CheckinItem from './CheckinItem'

const CheckinsAll = ({ getCheckins, checkin: { checkins, loading }}) => {
    useEffect(() => {
        getCheckins()
    }, [getCheckins])
    return loading ? 
        <Spinner 
            animation="border"
            role="status">
        </Spinner> : (
        <Fragment>
            <div className="profile-form">
                <h1 className='check-font text-center'>Community</h1>
                <p className="lead text-center">
                    <i className="fas fa-user primary-col"></i> check-up on freinds and other check-mate users
                </p>
                <div className="checkins pt-5">
                    {checkins.map(checkin => (
                        <CheckinItem personalCheckins={false} key={checkin._id} checkin={checkin}/>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

CheckinsAll.propTypes = {
    getCheckins: PropTypes.func.isRequired,
    checkin: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    checkin: state.checkin
})

export default connect(mapStateToProps, { getCheckins })(CheckinsAll)
