
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class MyProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
            handle: '',
            firstname: '',
            lastname: '',
            gender: '',
            phone: '',
            region: '',
            State: '',
            Country: '',
            ZipCode: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
                       
        };
        this.onChange = this.onChange.bind(this);
    }
       
        componentDidMount() {
            this.props.getCurrentProfile();
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.errors) {
                this.setState({ errors: nextProps.errors });
            }
            if (nextProps.profile.profile) {
                const profile = nextProps.profile.profile;
    
                //if profile fiels doesn't exit, make emty string
                
                profile.firstname = !isEmpty(profile.firstname) ? profile.firstname : '';
                profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : '';
                profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
                profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
    
                profile.address = !isEmpty(profile.address) ? profile.address : {};
                profile.region = !isEmpty(profile.address.region)
                    ? profile.address.region
                    : '';
                profile.State = !isEmpty(profile.address.State)
                    ? profile.address.State
                    : '';
    
                profile.Country = !isEmpty(profile.address.Country)
                    ? profile.address.Country
                    : '';
                profile.ZipCode = !isEmpty(profile.address.ZipCode)
                    ? profile.address.ZipCode
                    : '';
    
                profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
                profile.social = !isEmpty(profile.social) ? profile.social : {};
                profile.twitter = !isEmpty(profile.social.twitter)
                    ? profile.social.twitter
                    : '';
                profile.facebook = !isEmpty(profile.social.facebook)
                    ? profile.social.facebook
                    : '';
                profile.linkedin = !isEmpty(profile.social.linkedin)
                    ? profile.social.linkedin
                    : '';
                profile.youtube = !isEmpty(profile.social.youtube)
                    ? profile.social.youtube
                    : '';
                profile.instagram = !isEmpty(profile.social.instagram)
                    ? profile.social.instagram
                    : '';
    
                //Set component fields state
                this.setState({
                    handle: profile.handle,
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    gender: profile.gender,
                    phone: profile.phone,
                    region: profile.region,
                    Country: profile.Country,
                    State: profile.State,
                    ZipCode: profile.ZipCode,
                    bio: profile.bio,
                    twitter: profile.twitter,
                    facebook: profile.facebook,
                    linkedin: profile.linkedin,
                    youtube: profile.youtube,
                });
            }
        }
        onChange(e) {
            this.setState({ [e.target.name]: e.target.value });
        }
    
    
        render(){
            
            return(
                <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-sm-7 col-6">
                            <h4 className="page-title">My Profile</h4>
                        </div>
    
                        <div className="col-sm-5 col-6 text-right m-b-30">
                            <Link to="/dashboard/editprofile" className="btn btn-primary btn-rounded"><i className="fa fa-plus"></i> Edit Profile</Link>
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
                                                    <h3 className="user-name m-t-0 mb-0">{this.state.firstname} {this.state.lastname}</h3>
                                                    <small className="text-muted">Médecin</small>
                                                    {/* <div className="staff-id">Employee ID : DR-0001</div> */}
                                                    {/* <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send Message</a></div> */}
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="personal-info">
                                                    <li>
                                                        <span className="title">Phone:</span>
                                                        <span className="text"><a href="#">{this.state.phone}</a></span>
                                                    </li>
                                                    <li>
                                                        <span className="title">Email:</span>
                                                        <span className="text"><a href="#">ghada@gmail.com</a></span>
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
                                                        <span className="text">{this.state.gender}</span>
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
        }
    }
// const MyProfile = ({

  
//   loading,
// }) => {
//    if (loading )
//     return (
//       <div className='container'>
//         <div className='d-flex justify-content-center text-primary'>
//           <div className='spinner-border' role='status'>
//             <span className='sr-only'>Loading...</span>
//           </div>
//         </div>
//       </div>
//     );

//   return (
//     <Fragment>
   
   {/* <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-7 col-6">
                        <h4 className="page-title">My Profile</h4>
                    </div>

                    <div className="col-sm-5 col-6 text-right m-b-30">
                        <Link to="/dashboard/editprofile" className="btn btn-primary btn-rounded"><i className="fa fa-plus"></i> Edit Profile</Link>
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
                                                <small className="text-muted">Médecin</small>
                                                {/* <div className="staff-id">Employee ID : DR-0001</div> */}
                                                {/* <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send Message</a></div> */}
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-7">
        //                                     <ul className="personal-info">
        //                                         <li>
        //                                             <span className="title">Phone:</span>
        //                                             <span className="text"><a href="#">770-889-6484</a></span>
        //                                         </li>
        //                                         <li>
        //                                             <span className="title">Email:</span>
        //                                             <span className="text"><a href="#">cristinagroves@example.com</a></span>
        //                                         </li>
        //                                         <li>
        //                                             <span className="title">Birthday:</span>
        //                                             <span className="text">3rd March</span>
        //                                         </li>
        //                                         <li>
        //                                             <span className="title">Address:</span>
        //                                             <span className="text">714 Burwell Heights Road, Bridge City, TX, 77611</span>
        //                                         </li>
        //                                         <li>
        //                                             <span className="title">Gender:</span>
        //                                             <span className="text">Female</span>
        //                                         </li>
        //                                     </ul>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>                        
        //                 </div>
        //             </div>
        //         </div>
			
        //     </div>
            
        // </div> */}
        
    
//     </Fragment>

//      );
// };

MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
  
  export default connect(mapStateToProps, { getCurrentProfile })(MyProfile);



