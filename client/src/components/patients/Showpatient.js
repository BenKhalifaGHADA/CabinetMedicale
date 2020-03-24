import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import Patient from "../patients/Patient";
class Showpatient extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	  }
	render() {
		const { profile } = this.props.profile;
		return (
			<Patient patient={profile.patient} />
		);
	}
}



PropTypes.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	profile: state.profile,
	

});

export default connect(mapStateToProps,{getCurrentProfile})(Showpatient);

