import React from 'react'
import PropTypes from 'prop-types'

const ProfileMain = ({ profile: { experience, age, gender, bio, social, user: { name, avatar } }}) => {
    return (
        <div className="container pt-4">
            <div className="profile-main-container p-3 m-auto mb-4 bg-light text-center rounded-3">
                <img className='round-img' src={avatar} alt='profile pic'/>
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold check-font">{name}</h1>
                    <p className=" fs-4">{gender}{', '}{age}</p>
                    <p className="fs-4"></p>
                    <p className="fs-4"><strong>Journaling Knowledge: </strong>  {experience}</p>
                    {bio && (
                        <div>
                            <h5 className='primary-col'>Background</h5>
                            <p className="fs-4 lead check-font"> {bio}</p>
                        </div>
                        
                    )}
                    <button className="mt-4 btn btn-primary btn-lg" type="button">Connect</button>
                </div>
            </div>

            <div className="row align-items-md-stretch ">
                <div className=" d-inline text-center m-auto">
                    <div className=" p-5 text-white  rounded-3 ">
                    <h2>Social</h2>
                    {social && social.facebook && (
                        <a href={social.facebook} rel="noreferrer" target='_blank'><i className="fab fa-facebook mr-2 fa-2x primary-col"></i></a>
                    )}
                    {social && social.instagram && (
                        <a href={social.instagram} rel="noreferrer" target='_blank'><i className="fab fa-instagram mr-2 fa-2x primary-col"></i></a>
                    )}
                    {social && social.youtube && (
                        <a href={social.youtube} rel="noreferrer" target='_blank'><i className="fab mr-2 fa-youtube fa-2x primary-col"></i></a>
                    )}
                    {social && social.twitter && (
                        <a href={social.twitter} rel="noreferrer" target='_blank'><i className="fab fa-twitter fa-2x primary-col"></i></a>
                    )}
                    <p className='pt-1'><strong className='primary-col'>NOTE:</strong> you should only connect with people you know and trust.</p>
                    <p>This is to help people share advice about mental health through social media platfroms</p>
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
