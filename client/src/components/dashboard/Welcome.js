import React from 'react';
import { Link, Redirect } from 'react-router-dom';
const Welcome = ({ user, profile }) => {
  if (profile !== null && Object.keys(profile).length > 0) {
    return <Redirect to='/dashboard/profile' />;
  }
  return (
    <div className='page-wrapper'>
      <div className='content'>
        <h4 className='page-title'>Welcome {user.name}</h4>
        <p>You have not yet setup a profile, please add some info</p>
        <Link
          to='/dashboard/editprofile'
          className='btn text-white btn-primary dashboardbtn'>
          Create Profile
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
