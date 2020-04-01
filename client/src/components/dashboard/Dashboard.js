import React, { Component } from 'react';
import MyProfile from './MyProfile';
import EditProfile from '../edit-profile/EditProfile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Showpatient from '../patients/Showpatient';
import Addpatient from '../patients/Addpatient';
import Editpatient from '../patients/Editpatient';
import Rendezvous from '../rendezvous/Rendezvous';
import Addrendezvous from '../rendezvous/Addrendezvous';
import Editrendezvous from '../rendezvous/Editrendezvous';
import NavBar from './NavBar';
import Welcome from './Welcome';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import './Dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onLogoutClick() {
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { user } = this.props.auth;

    const { profile, loading } = this.props.profile;

    if (profile === null || loading)
      return (
        <div className='main-wrapper'>
          <Spinner />
        </div>
      );
    return (
      <div>
        <div className="mynavbar"><NavBar user={user} /></div>
        
        {Object.keys(profile).length === 0 ? (
          <Redirect to='/dashboard/welcome' />
        ) : (
          <Redirect to='/dashboard/profile' />
        )}
        <Switch>
          <Route exact path='/dashboard/welcome' render={() => <Welcome user={user} />} />
          <Route exact path='/dashboard/profile' component={MyProfile} />
          <Route exact path='/dashboard/patients' component={Showpatient} />
          <Route exact path='/dashboard/editprofile' component={EditProfile} />
          <Route exact path='/dashboard/Addpatient' component={Addpatient} />
          <Route exact path='/dashboard/Rendezvous' component={Rendezvous} />
          <Route exact path='/dashboard/AddRendezvous' component={Addrendezvous} />
          <Route exact path='/dashboard/EditRendezvous' component={Editrendezvous} />
          <Route exact path='/dashboard/editpatient/:id' component={Editpatient} />
        </Switch>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
})(Dashboard);