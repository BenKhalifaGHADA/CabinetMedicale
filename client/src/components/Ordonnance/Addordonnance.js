import React, { useState} from "react";
import { withRouter,Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import InputGroup from '../common/InputGroup';
import {
    addOrdonnance
} from "../../actions/ordonnanceAction";
// import Spinner from "../common/Spinner";

// //package to generate HTML to PDF
// // import { saveAs } from 'file-saver';
import { createAndDownloadPdf } from "../../actions/printAction";

const Addordonnance = ({
  profile: { profile },
//   getallConsultationsBypatient,
//   consultations,
  history,
  match,
  addOrdonnance,
  errors
  // createAndDownloadPdf
}) => {
 

  

//   useEffect(() => {
//     getallConsultationsBypatient(match.params.id);
//   }, []);
//   if (consultations === null)
//     return (
//       <div className="main-wrapper">
//         <div className="content">
//           <Spinner />
//         </div>
//       </div>
//     );

  //Create a new prescription
  const [formOrd,setState]=useState({
    drug:'',
    dose:'',
    duration:'',
  })
  const {
   drug,
   dose,
   duration,
  } = formOrd;
  const updateFieldPrescription = e => {
    setState({
      ...formOrd,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    let consultationtId = match.params.id;
    console.log('id',consultationtId);
    const consData = {
    drug,
    dose,
    duration
    };
    console.log("ordon", consData);
    addOrdonnance(consultationtId,consData, history);
   
  };
 
  return (
    <div className="page-wrapper">
      {/* {console.log("hi ordonnance",consultations)} */}
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">create prescription</h4>
          </div>
        </div>
        <form >
          {/* Box Basic Information */}
          <div className="card-box">
            {/* <h3 className="card-title">Basic Informations</h3> */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <label>Drug</label>
                  <div className="col-md-6">
                    <InputGroup
                      placeholder="Drug name"
                      name="drug"
                      value={drug}
                      onChange={updateFieldPrescription}
                      error={errors.drug}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <label>Dose</label>
                  <div className="col-md-6">
                    <InputGroup
                      placeholder="Drug name"
                      name="dose"
                      value={dose}
                      onChange={updateFieldPrescription}
                      error={errors.dose}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <label>Duration</label>
                  <div className="col-md-6">
                    <InputGroup
                      placeholder="Drug name"
                      name="duration"
                      value={duration}
                      onChange={updateFieldPrescription}
                      error={errors.duration}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center m-t-20">
            <button className="btn btn-primary submit-btn" data-toggle='modal'
                    data-target='#add_drug' onSubmit={onSubmit}>
              Save
            </button>
            <button
              className="btn btn-secondary submit-btn"
              onClick={createAndDownloadPdf}
            >
              Print fiche patient
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      
      <div id='add_drug' className='modal fade delete-modal' role='dialog'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body text-center'>
              <img src='assets/img/sent.png' alt='' width='50' height='46' />
              <h3>Are you sure want to add drug?</h3>
              <div className='m-t-20'>
                <Link to="#"  className='btn btn-white' data-dismiss='modal'>
                  YES
                </Link>
                <button className='btn btn-danger' data-dismiss='modal'>
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
};

Addordonnance.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
//   getallConsultationsBypatient: PropTypes.func.isRequired,
  addOrdonnance: PropTypes.func.isRequired,
  createAndDownloadPdf: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
  consultations: state.profile.consultations
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  addOrdonnance,
  createAndDownloadPdf
})(withRouter(Addordonnance));
