import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deletePatient } from '../../actions/patientAction';
import { Fragment } from 'react';
import Moment from 'react-moment';
const Patient = (
  { patient, deletePatient },
  // 
) => {
  console.log(patient)
  return (
    <Fragment>

      {patient.map(exp => (
        <Fragment>
        <tr key={exp._id}>
          <td>
            <img
              width='28'
              height='28'
              src={`/${exp.avatar}`}
              className='rounded-circle m-r-5'
              alt=''
            />{' '}
            {exp.firstname} {exp.lastname}
          </td>
          <td><Moment format='YYYY/MM/DD'>{exp.Datebirth}</Moment></td>
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
                  to={`/dashboard/FichePatient/${exp._id}`}>
                  <i className='fa fa-address-card m-r-5'></i>Fiche patient
              </Link>
                <Link
                  to='/dashboard/AddRendezvous'
                  className='dropdown-item'>
                  <i className='fa fa-address-card m-r-5'></i> Add appointments
              </Link>
                {/* <Link
                className='dropdown-item'
                to={`/dashboard/Createconsultation/${exp._id}`}>
                <i className='fa fa-address-card m-r-5'></i>Ajouter une consultation
              </Link> */}

                <button
                  className='dropdown-item'
                  // href='#'
                  data-toggle='modal'
                  data-target='#delete_patient'
                  >
                  <i className='fa fa-trash-o m-r-5'></i> Delete
                  </button>
              </div>
            </div>
          </td>
        </tr>

<div id='delete_patient' className='modal fade delete-modal' role='dialog'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body text-center'>
              <img src='assets/img/sent.png' alt='' width='50' height='46' />
              <h3>Are you sure want to delete this Patient?</h3>
              <div className='m-t-20'>
                <Link to="#"  className='btn btn-white' data-dismiss='modal'>
                  Close
                </Link>
                <button className='btn btn-danger' data-dismiss='modal' onClick={() => deletePatient(exp._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</Fragment>
      ))}

    </Fragment>


  );
};

Patient.propTypes = {
  deletePatient: PropTypes.func.isRequired,
};



export default connect(null, { deletePatient })(withRouter(Patient));
