import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../common/Spinner';
const MyProfile = ({ profile:{ profile, loading }, auth: { user } }) => {
 

  if (profile !== null && Object.keys(profile) === 0) {
    return <Redirect to='/dashboard/welcome' />;
  }

  if (profile==null || loading)
  return (
  <div className="main-wrapper">
      <div className="content">
      <Spinner />
      </div>
    </div>
  );
  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-7 col-6'>
            <h4 className='page-title'>My Profile</h4>
          </div>

          <div className='col-sm-5 col-6 text-right m-b-30'>
            <Link to={'/dashboard/editprofile'} className='btn btn-primary btn-rounded'>
              <i className='fa fa-plus'></i> Edit Profile
            </Link>
          </div>
        </div>
        <div className='card-box profile-header'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile-view'>
                <div className='profile-img-wrap'>
                  <div className='profile-img'>
                     <img className='avatar' src={`/${profile.profilephoto}`} alt='' />
                  </div>
                </div>
                <div className='profile-basic'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='profile-info-left'>
                        <h3 className='user-name m-t-0 mb-0'>
                          {profile.firstname} {profile.lastname}
                        </h3>
                        <small className='text-muted'>Médecin</small>
                      </div>
                    </div>
                    <div className='col-md-7'>
                      <ul className='personal-info'>
                        <li>
                          <span className='title'>Phone:</span>
                          <span className='text'>
                            <a href=' '>{profile.phone}</a>
                          </span>
                        </li>
                        <li>
                          <span className='title'>Email:</span>
                          <span className='text'>
                            <a href=' '>{user.email}</a>
                          </span>
                        </li>
                        <li>
                          <span className='title'>Birthday:</span>
                          <span className='text'>
                            <Moment format='YYYY/MM/DD'>{profile.birthdate}</Moment>
                          </span>
                        </li>
                        <li>
                          <span className='title'>Address:</span>
                          <span className='text'>
                            {profile.address.region} {profile.address.Country} {profile.address.State}{' '}
                            {profile.address.ZipCode}{' '}
                          </span>
                        </li>
                        <li>
                          <span className='title'>Gender:</span>
                          <span className='text'>{profile.gender}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(MyProfile);
