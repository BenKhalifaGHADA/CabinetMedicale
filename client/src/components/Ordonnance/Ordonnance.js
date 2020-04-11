import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteOrdonnance } from "../../actions/ordonnanceAction";

const Ordonnance = ({
  location: {
    state: { ordon },
  },
  history,
}) => {
  console.log(ordon);
  return (
    <div className='page-wrapper'>
      
    <div className='content'>
      <div className='row'>
        <div className='col-sm-4 col-3'>
          <h4 className='page-title'>Prescription</h4>
        </div>
        <div className='col-sm-8 col-9 text-right m-b-20'>
          
       
       <button onClick={()=>deleteOrdonnance(ordon._id,history)} className='btn btn btn-danger btn-rounded float-right'>
            <i className='fa fa-close'></i> Delete
          </button>
        <Link

        
            to=''
            className='btn btn btn-primary btn-rounded float-right'>
            <i className='fa fa-print'></i> Print
          </Link>
          <Link
            to=''
            className='btn btn btn-primary btn-rounded float-right'>
            <i className='fa fa-plus'></i> Back
          </Link>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
        <div className="table-responsive">
        <table className="table table-border table-striped custom-table datatable mb-0">
          <thead>
            <tr>
              <th>Drug</th>
              <th>Dose</th>
              <th>Duration</th>
              {/* <th className="text-right">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {ordon.ordonnance.map((exp) => (
              <tr key={exp._id}>
                 <td>{exp.drug}</td>
                 <td>{exp.dose}</td>
                 <td>{exp.duration}</td>
                 {/* <td className="text-right">
                  <div className="dropdown dropdown-action">
                    <a
                      href=" "
                      className="action-icon dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to={`/dashboard/Editpatient/${exp._id}`}
                      >
                        <i className="fa fa-pencil m-r-5"></i>Edit
                      </Link>

                      <Link
                        className="dropdown-item"
                        to={`/dashboard/FichePatient/${exp._id}`}
                      >
                        <i className="fa fa-address-card m-r-5"></i>Fiche
                        patient
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="/dashboard/Createconsultation"
                      >
                        <i className="fa fa-address-card m-r-5"></i>Ajouter une
                        consultation
                      </Link>

                      <button
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#delete_patient"
                        onClick={() => deletePatient(exp._id)}
                      >
                        <i className="fa fa-trash-o m-r-5"></i> Delete
                      </button>
                    </div>
                  </div>
                </td> */}
              </tr>
            ))}
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
                <a href=' ' className='btn btn-white' data-dismiss='modal'>
                  Close
                </a>
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

Ordonnance.propTypes = {
  deleteOrdonnance: PropTypes.func.isRequired,
};

export default connect(null, { deleteOrdonnance })(withRouter(Ordonnance));
