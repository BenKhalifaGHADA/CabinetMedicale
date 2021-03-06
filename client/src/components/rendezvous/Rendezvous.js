import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Spinner from "../common/Spinner";

import { deleteAppointment } from "../../actions/appointmentActions";
import { Fragment } from "react";
const Rendezvous = ({ rendezvous, deleteAppointment }) => {
  console.log(rendezvous);
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
      {rendezvous.map((exp) => (
        <Fragment>
          <tr key={exp._id}>
            <td>
              {exp.patient != null
                ? `${exp.patient.firstname} ${exp.patient.lastname}`
                : ``}
            </td>
            <td>
              <Moment format="YYYY/MM/DD">{exp.date}</Moment>
            </td>
            <td>
              <Moment format="HH:mm">{exp.time}</Moment>
            </td>
            <td className="text-right">
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
                    to={`/dashboard/EditRendezvous/${exp._id}`}
                  >
                    <i className="fa fa-pencil m-r-5"></i>Edit
                  </Link>

                  <button
                    className="dropdown-item"
                    // href='#'
                    data-toggle="modal"
                    data-target="#delete_appointment"
                  >
                    <i className="fa fa-trash-o m-r-5"></i> Delete
                  </button>

                  <Link
                    className="dropdown-item"
                    to={`/dashboard/Createconsultation/${exp.patient.patientId}`}
                  >
                    <i className="fa fa-address-card m-r-5"></i>Ajouter une
                    consultation
                  </Link>
                  {console.log("ghada", exp)}
                </div>
              </div>
            </td>
          </tr>
          <div
            id="delete_appointment"
            className="modal fade delete-modal"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img
                    src="assets/img/sent.png"
                    alt=""
                    width="50"
                    height="46"
                  />
                  <h3>Are you sure want to delete this Appointment?</h3>
                  <div className="m-t-20">
                    {" "}
                    <Link to="#" className="btn btn-white" data-dismiss="modal">
                      Close
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => deleteAppointment(exp._id)}
                    >
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

Rendezvous.propTypes = {
  deleteAppointment: PropTypes.func.isRequired,
};

export default connect(null, { deleteAppointment })(withRouter(Rendezvous));
