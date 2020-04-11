import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../common/Spinner';

import {
  deleteAppointment,

} from '../../actions/appointmentActions';
import { Fragment } from 'react';
const Rendezvous = ({ rendezvous,deleteAppointment }

) => {
  console.log(rendezvous)
 if (rendezvous === null)
    return (
      <div className="main-wrapper">
        <div className="content">
          <Spinner />
        </div>
      </div>
    );
  return (
    <Fragment>

      {rendezvous.map(exp => (
        <tr key={exp._id}>
          <td>{`${exp.patient.firstname} ${exp.patient.lastname}`}</td>
          <td><Moment format='YYYY/MM/DD'>{exp.date}</Moment></td>
          <td><Moment format='HH:mm'>{exp.time}</Moment></td>
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
                  to={`/dashboard/EditRendezvous/${exp._id}`}>
                  <i className='fa fa-pencil m-r-5'></i>Edit
                  </Link>

                <button
                  className='dropdown-item'
                  // href='#'
                  data-toggle='modal'
                  data-target='#delete_appointment'
                  onClick={() => deleteAppointment(exp._id)} >
                                                         
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

Rendezvous.propTypes = {
  deleteAppointment: PropTypes.func.isRequired,
};



export default connect(null, { deleteAppointment })(withRouter(Rendezvous));
