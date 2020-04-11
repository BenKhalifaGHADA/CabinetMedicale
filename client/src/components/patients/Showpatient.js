import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Patient from '../patients/Patient';
import { withRouter } from 'react-router-dom';


const Showpatient = ({profile}
) => {
   
  return (
    <div className='page-wrapper'>
      
    <div className='content'>
      <div className='row'>
        <div className='col-sm-4 col-3'>
          <h4 className='page-title'>Patients</h4>
        </div>
        <div className='col-sm-8 col-9 text-right m-b-20'>
          <Link
            to='/dashboard/Addpatient'
            className='btn btn btn-primary btn-rounded float-right'>
            <i className='fa fa-plus'></i> Add Patient
          </Link>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='table-responsive'>
            <table className='table table-border table-striped custom-table datatable mb-0'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of birth</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className='text-right'>Action</th>
                </tr>
              </thead>
              <tbody>
                <Patient patient={profile.patient} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                <button className='btn btn-danger' data-dismiss='modal'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   
  );
};

Showpatient.propTypes = {
    deletePatient: PropTypes.func.isRequired,
};



Showpatient.propTypes = {
    profile: PropTypes.object.isRequired,
  
  };
  
  const mapStateToProps = state => ({
    profile: state.profile.profile,
  }); 
  
  export default connect(mapStateToProps)(withRouter(Showpatient));
