import React from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    deleteAppointment,
  
} from '../../actions/appointmentActions';
import { Fragment } from 'react';
const Rendezvous = ({rendezvous}
) => {
    console.log(rendezvous)
  return (
    <Fragment>
     
    {rendezvous.map(exp => (
      <tr key={exp._id}>
                                    
      <td><img width="28" height="28" src="assets/img/user.jpg" className="rounded-circle m-r-5" alt=""/> </td>
      <td>35</td>
      <td>Henry Daniels</td>
      <td>{exp.date}</td>
      <td>{exp.time}</td>
      {/* <td><span className="custom-badge status-red">Inactive</span></td> */}
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
href='#'
data-toggle='modal'
data-target='#delete_patient'
onClick={()=>deleteAppointment(exp._id)}
>
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
