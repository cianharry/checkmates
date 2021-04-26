import React from 'react'
import PropTypes from 'prop-types'

const ProfileMain = ({ profile: { experience, age, gender, bio, social, user: { name, avatar } }}) => {
    return (
        <div className="container py-4">
            <div className="p-5 mb-4 bg-light rounded-3">
                <img className='round-img' src={avatar} alt='profile pic'/>
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">{name}</h1>
                    <p className="col-md-8 fs-4">{age}</p>
                    <p className="col-md-8 fs-4">{gender}</p>
                    <p className="col-md-8 fs-4"><strong>Journaling Knowledge: </strong>  {experience}</p>
                    {bio && (
                        <p className="col-md-8 fs-4"><h5>About {name}:</h5> {bio}</p>
                    )}
                    <button className="btn btn-secondary btn-lg" type="button">Connect</button>
                </div>
            </div>

            <div className="row align-items-md-stretch">
                <div className="col-md-6 d-inline text-center">
                    <div className=" p-5 text-white bg-dark rounded-3">
                    <h2>Social</h2>
                    {social && social.facebook && (
                        <a href={social.facebook}><i className="fab fa-facebook mr-2 fa-2x"></i></a>
                    )}
                    {social && social.instagram && (
                        <a href={social.instagram}><i className="fab fa-instagram mr-2 fa-2x"></i></a>
                    )}
                    {social && social.youtube && (
                        <a href={social.youtube} target='_blank'><i className="fab mr-2 fa-youtube fa-2x"></i></a>
                    )}
                    {social && social.twitter && (
                        <a href={social.twitter} target='_blank'><i className="fab fa-twitter fa-2x"></i></a>
                    )}
                    <p className='pt-1'><strong>NOTE:</strong> you should only connect with people you know and trust. This is to help people share advice about mental health through social media platfroms</p>
                </div>
            </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>Checkin Stats</h2>
                        <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
                        <button className="btn btn-secondary" type="button">Example button</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileMain.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileMain
