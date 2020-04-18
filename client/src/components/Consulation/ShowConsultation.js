import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {deleteConsultation, getallConsultationsById} from '../../actions/consultationActions';
import Moment from 'react-moment';
import Spinner from "../common/Spinner";

const ShowConsultation = ({
    profile,
    consultation,
    match,
    getallConsultationsById,

}

) => {
    useEffect(() => {
        getallConsultationsById(match.params.id);
      },[]);
      console.log('consultation by id',consultation);
    if (consultation === null)
    return (
      <div className="main-wrapper">
        <div className="content">
        <Spinner />
        </div>
      </div>
    );

    
  return (
    <div className='page-wrapper'>
      
    <div className='content'>
      <div className='row'>
        <div className='col-sm-4 col-3'>
          <h4 className='page-title'>Consultation</h4>
        </div>
        {/* <div className='col-sm-8 col-9 text-right m-b-20'>
          <Link
            to='/dashboard/Addpatient'
            className='btn btn btn-primary btn-rounded float-right'>
            <i className='fa fa-plus'></i> Add consultation
          </Link>
        </div> */}
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='table-responsive'>
            <table className='table table-border table-striped custom-table datatable mb-0'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Observation</th>
                  <th>ordonnance</th>
                  {/* <th className='text-right'>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {console.log("nouveau opbject",consultation)}
                <Consultation consultation={consultation} /> */}
                 <tr>
         <td> <Moment format='YYYY/MM/DD'>{consultation.date}</Moment></td>
                                <td>{consultation.observation}</td>
                                <td>
                                  
                             <Link
                                    className='btn btn btn-primary btn-rounded'
                                    to={`/dashboard/CreateOrdonnance/${consultation._id}`}>
                                   
            <i className='fa fa-plus'></i>Add prescription
                                  </Link>
                                  </td>
                                  </tr>
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
              <h3>Are you sure want to delete this consultationt?</h3>
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

ShowConsultation.propTypes = {
    deleteConsultation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getallConsultationsById:PropTypes.func.isRequired,

  
};

const mapStateToProps = state => ({
    profile: state.profile.profile,
    consultation: state.profile.consultation,
    
  }); 
  
  export default connect(mapStateToProps,{deleteConsultation, getallConsultationsById})(withRouter(ShowConsultation));
