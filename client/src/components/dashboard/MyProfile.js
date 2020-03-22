
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from "../../actions/profileActions";
import { Route, Link, Switch } from 'react-router-dom';
// import EditProfile from "./EditProfile";
// import spinner from "../common/spinner.gif";
const MyProfile = ({

  
  loading,
}) => {
   if (loading )
    return (
      <div className='container'>
        <div className='d-flex justify-content-center text-primary'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <Fragment>
   
   <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-7 col-6">
                        <h4 className="page-title">My Profile</h4>
                    </div>

                    <div className="col-sm-5 col-6 text-right m-b-30">
                        <Link to="/dashboard/createprofile" className="btn btn-primary btn-rounded"><i className="fa fa-plus"></i> Edit Profile</Link>
                    </div>
                </div>
                <div className="card-box profile-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-view">
                                <div className="profile-img-wrap">
                                    <div className="profile-img">
                                        <a href="#"><img className="avatar" src="../assets/img/doctor-03.jpg" alt=""/></a>
                                    </div>
                                </div>
                                <div className="profile-basic">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="profile-info-left">
                                                <h3 className="user-name m-t-0 mb-0">Cristina Groves</h3>
                                                <small className="text-muted">Gynecologist</small>
                                                <div className="staff-id">Employee ID : DR-0001</div>
                                                <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send Message</a></div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <ul className="personal-info">
                                                <li>
                                                    <span className="title">Phone:</span>
                                                    <span className="text"><a href="#">770-889-6484</a></span>
                                                </li>
                                                <li>
                                                    <span className="title">Email:</span>
                                                    <span className="text"><a href="#">cristinagroves@example.com</a></span>
                                                </li>
                                                <li>
                                                    <span className="title">Birthday:</span>
                                                    <span className="text">3rd March</span>
                                                </li>
                                                <li>
                                                    <span className="title">Address:</span>
                                                    <span className="text">714 Burwell Heights Road, Bridge City, TX, 77611</span>
                                                </li>
                                                <li>
                                                    <span className="title">Gender:</span>
                                                    <span className="text">Female</span>
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
        
    
    </Fragment>

     );
};
MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
  };
  
  const mapState = state => ({
    loading: state.profile.loading,
  });
  
  
  export default connect(mapState, { getCurrentProfile })(MyProfile);



