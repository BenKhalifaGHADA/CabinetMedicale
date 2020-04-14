import React, { useEffect } from 'react';
import MyProfile from './MyProfile';
import EditProfile from '../edit-profile/EditProfile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Showpatient from '../patients/Showpatient';
import Addpatient from '../patients/Addpatient';
import Editpatient from '../patients/Editpatient';
import Rendezvous from '../rendezvous/Showrendezvous';
import Addrendezvous from '../rendezvous/Addrendezvous';
import Editrendezvous from '../rendezvous/Editrendezvous';
import Createconsultation from '../Consulation/AddConsultation';
import Fichepatient from '../patients/Fichepatient';
import NavBar from './NavBar';
import Welcome from './Welcome';
import ShowAllOrdonnance from '../Ordonnance/Ordonnance';
import CreateOrdonnance from '../Ordonnance/Addordonnance';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import './Dashboard.css';
import ShowConsultation from '../Consulation/ShowConsultation';


const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  // clearErrors,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  // useEffect(() => {
  //   clearErrors();
  // });

  if (profile === null || loading)
    return (
      <div className="main-wrapper">
      <div className="content">
      <Spinner />
      </div>
    </div>
    );
  return (
    <div>
      <NavBar user={user} />
      <Switch>
        <Route
          exact
          path='/dashboard/welcome'
          render={() => <Welcome user={user} profile={profile} />}
        />
        <Route
          exact
          path='/dashboard/profile'
          render={() => <MyProfile profile={profile} />}
        />
        <Route exact path='/dashboard/patients' component={Showpatient} />
        <Route exact path='/dashboard/editprofile' component={EditProfile} />
        <Route exact path='/dashboard/Addpatient' component={Addpatient} />
        <Route exact path='/dashboard/Rendezvous' component={Rendezvous} />
        <Route exact path='/dashboard/AddRendezvous' component={Addrendezvous} />
        <Route exact path='/dashboard/EditRendezvous/:id' component={Editrendezvous} />
        <Route exact path='/dashboard/editpatient/:id' component={Editpatient} />
		    <Route exact path='/dashboard/Createconsultation/:id' component={Createconsultation} />
        <Route exact path='/dashboard/FichePatient/:id' component={Fichepatient} />
        <Route exact path='/dashboard/ShowAllOrdonnance' component={ShowAllOrdonnance} />
        <Route exact path='/dashboard/showconsultation/:id' component={ShowConsultation}/>
        <Route exact path='/dashboard/CreateOrdonnance/:id' component={CreateOrdonnance}/>
        <Redirect to='/dashboard/welcome' />
      </Switch>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  // clearErrors,
})(Dashboard);
