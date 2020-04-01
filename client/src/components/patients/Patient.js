import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { deletePatient } from '../../actions/profileActions';

class Patient extends Component {
  onDeleteClick(id) {
    this.props.deletePatient(id);
  }

  render() {
    return (
      <Fragment>
        {this.props.patient.map(exp => (
          <tr key={exp._id}>
            <td>
              <img
                width='28'
                height='28'
                src='../assets/img/user.jpg'
                className='rounded-circle m-r-5'
                alt=''
              />{' '}
              {exp.firstname} {exp.lastname}
            </td>
            <td>{exp.Datebirth}</td>
            <td>{exp.adresse}</td>
            <td>{exp.phone}</td>
            <td>{exp.email}</td>
            <td className='text-right'>
              <div className='dropdown dropdown-action'>
                <a
                  href=' '
                  className='action-icon dropdown-toggle'
                  data-toggle='dropdown'
                  aria-expanded='false'>
                  <i className='fa fa-ellipsis-v'></i>
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                  <Link
                    className='dropdown-item'
                    to={`/dashboard/Editpatient/${exp._id}`}>
                    <i className='fa fa-pencil m-r-5'></i>Edit
                  </Link>

                  <Link
                    className='dropdown-item'
                    to="">
                    <i className='fa fa-pencil m-r-5'></i>Fiche patient
                  </Link>

                  <button
                    className='dropdown-item'
                    href='#'
                    data-toggle='modal'
                    data-target='#delete_patient'
                    onClick={this.onDeleteClick.bind(this, exp._id)}>
                    <i className='fa fa-trash-o m-r-5'></i> Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </Fragment>
    );
  }
}

Patient.propTypes = {
  deletePatient: PropTypes.func.isRequired,
};

export default connect(null, { deletePatient })(withRouter(Patient));
                           