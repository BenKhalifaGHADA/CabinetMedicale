import React from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    deletePatient,
  
} from '../../actions/patientAction';
import { Fragment } from 'react';
const Patient = ({patient}
) => {
  

  console.log(patient)
  return (
    <Fragment>
     
    {patient.map(exp => (
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
                <i className='fa fa-address-card m-r-5'></i>Fiche patient
              </Link>

              <Link
                className='dropdown-item'
                to="/dashboard/Createconsultation">
                <i className='fa fa-address-card m-r-5'></i>Ajouter une consultation
              </Link>

              <button
                    className='dropdown-item'
                    href='#'
                    data-toggle='modal'
                    data-target='#delete_patient'
                    onClick={()=>deletePatient(exp._id)}>
                    <i className='fa fa-trash-o m-r-5'></i> Delete
                  </button>
            </div>
          </div>
        </td>
      </tr>
    ))}
  </Fragment>

   
  );
};

Patient.propTypes = {
    deletePatient: PropTypes.func.isRequired,
};



export default connect(null, { deletePatient })(withRouter(Patient));
