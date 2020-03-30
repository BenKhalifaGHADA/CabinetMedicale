import React, { Component } from 'react';
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
    const patient = this.props.patient.map(exp => (
      <tr key={exp._id}>
        <td><img width="28" height="28" src="../assets/img/user.jpg" className="rounded-circle m-r-5" alt="" /> {exp.firstname} {exp.lastname}</td>
        <td>{exp.Datebirth}</td>
        <td>{exp.adresse}</td>
        <td>{exp.phone}</td>
        <td>{exp.email}</td>
        <td className="text-right">
          <div className="dropdown dropdown-action">
            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to={`/dashboard/Editpatient/${exp._id}`}><i className="fa fa-pencil m-r-5"></i>Edit</Link>
              
              <button className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient" onClick={this.onDeleteClick.bind(this, exp._id)}
                ><i className="fa fa-trash-o m-r-5"></i> Delete</button>
            </div>
          </div>
        </td>
      </tr>

      //  <tr >
      //     <td> </td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      /* <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td> */
      //   <td>
      //     <button
      //       onClick={this.onDeleteClick.bind(this, exp._id)}
      //       className="btn btn-danger"
      //     >
      //       Delete
      //     </button>
      //   </td>
      // </tr>
    ))
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Patients</h4>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
              <Link to="/dashboard/Addpatient" className="btn btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> Add Patient</Link>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-border table-striped custom-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of birth</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="delete_patient" className="modal fade delete-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src="assets/img/sent.png" alt="" width="50" height="46" />
                  <h3>Are you sure want to delete this Patient?</h3>
                  <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                    <button className="btn btn-danger" data-dismiss="modal">Delete</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

     </div>

    );
  }
}

Patient.propTypes = {
  deletePatient: PropTypes.func.isRequired
};

export default connect(null, { deletePatient })(withRouter(Patient));
