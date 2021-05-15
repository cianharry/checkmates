import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPersonalCheckins } from '../../actions/checkin'
import { Spinner } from 'react-bootstrap'
import CheckinItem from './CheckinItem'
import CheckinForm from './CheckinForm'
import plutchik from '../../assets/plutchik.png'
import './Checkins.css';



const Checkins = ({ getPersonalCheckins, checkin: { checkins, loading } }) => {
    useEffect(() => {
        getPersonalCheckins()
    }, [getPersonalCheckins])
    return loading ? 
        <Spinner 
            animation="border"
            role="status">
        </Spinner> : (
        <Fragment>
            <div className="container-checkins text-center">
                <div className="text-center">
                    <img src={plutchik} alt=''/>
                </div>
                
                <CheckinForm/>
                <h1 className='mt-4 large check-font'>Check-ins</h1>
                <p className="lead">
                    <i className="fas fa-user primary-col"></i> Welcome to the checkmates community
                </p>
                <div className="checkins">
                    {checkins.map(checkin => (
                        <CheckinItem key={checkin._id} checkin={checkin}/>
                    ))}
                </div>
            </div>  
        </Fragment>
    )
}

Checkins.propTypes = {
    getPersonalCheckins: PropTypes.func.isRequired,
    checkin: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    checkin: state.checkin,
})

export default connect(mapStateToProps, { getPersonalCheckins })(Checkins)
