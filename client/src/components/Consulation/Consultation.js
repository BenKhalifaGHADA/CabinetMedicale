import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {deleteConsultation} from '../../actions/consultationActions';
import { Fragment } from 'react';
import Moment from 'react-moment';
import Spinner from "../common/Spinner";


const Consultation = ({
  consultation,
   deleteConsultation},
  // 
) => {
  console.log(consultation)
  
  if (consultation === null)
  return (
    <div className="main-wrapper">
      <div className="content">
        <Spinner />
      </div>
    </div>
  );
  return (
    <Fragment>
     {console.log('test',consultation._id)}
     <tr>
         <td> <Moment format='YYYY/MM/DD'>{consultation.date}</Moment></td>
                                <td>{consultation.observation}</td>
                                <td>
                                {/* <Link
                                    to={{
                                      pathname: "/dashboard/ShowAllOrdonnance",
                                      state: { ordon:exp },
                                    }}
                                  > */}
                                    <button className='btn btn-secondary'>Add prescription </button>
                                  {/* </Link> */}
                                  </td>
        {/* <td className='text-right'>
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
                className='dropdown-item'
                to={`/dashboard/Createconsultation/${exp._id}`}>
                <i className='fa fa-address-card m-r-5'></i>Ajouter une consultation
              </Link>

              <button
                    className='dropdown-item'
                    // href='#'
                    data-toggle='modal'
                    data-target='#delete_patient'
                    onClick={()=>deleteConsultation(exp._id)}>
                    <i className='fa fa-trash-o m-r-5'></i> Delete
                  </button>
            </div>
          </div>
        </td> */}
      </tr>
   
  </Fragment>

   
  );
};

Consultation.propTypes = {
    deleteConsultation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  consultation: state.profile.consultation,
  
}); 


export default connect(mapStateToProps, { deleteConsultation })(withRouter(Consultation));
