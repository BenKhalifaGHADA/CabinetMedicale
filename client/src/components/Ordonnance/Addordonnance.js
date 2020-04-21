import React, {useState } from "react";
import { withRouter,Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import InputGroup from "../common/InputGroup";
import OrdonItem from './Ordon-item'
import { addOrdonnance } from "../../actions/ordonnanceAction";
import { getallConsultationsById } from "../../actions/consultationActions";


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
  errors,
  consultation,

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
  const [formOrd, setState] = useState({
    drug: "",
    dose: "",
    duration: "",
  });
  const { drug, dose, duration } = formOrd;

  const updateFieldPrescription = (e) => {
    setState({
      ...formOrd,
      [e.target.name]: e.target.value,
    });
  };
  
 
  const onSubmit = (e) => {
    e.preventDefault();
   
    let consultationtId = match.params.id;
  
    const consData = {
      drug,
      dose,
      duration,
    };
    console.log("ordon", consData);
    addOrdonnance(consultationtId, consData, history);
    setState({...formOrd, drug:'',dose:'',duration:''})
    
    // getallConsultationsById(match.params.id);

    // clearState();
  };
  // if (consultation)
  //   return (
  //     <div className="main-wrapper">
  //       <Spinner />
  //     </div>
  //   );
  //drugs mapping
  const taskList =
    consultation &&
    consultation.ordonnance.length > 0 &&
    consultation.ordonnance.map( (item,i) => {
      return (
        <OrdonItem key={item._id} item={item} index={i} consultId={match.params.id} />

      );
    });

 

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">Create prescription</h4>
          </div>
        </div>

       
        <form onSubmit={onSubmit}>
        <div className="card-box">
          <div className="row">
            <div className="col-md-12">
           
              <div className="table-responsive">
                <table className="table table-border table-striped custom-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Drug</th>
                      <th>Dose</th>
                      <th>Duration</th>
                      <th>Actions</th>
                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td> 
                        <InputGroup
                      placeholder="Drug name"
                      name="drug"
                      value={drug}
                      onChange={updateFieldPrescription}
                      error={errors.drug}
                    /></td>
                      <td>
                      <InputGroup
                      placeholder="Dose name"
                      name="dose"
                      value={dose}
                      onChange={updateFieldPrescription}
                      error={errors.dose}
                    />
                      </td>
                      <td>
                      <InputGroup
                      placeholder="Duration"
                      name="duration"
                      value={duration}
                      onChange={updateFieldPrescription}
                      error={errors.duration}
                    />
                      </td>
                      <td className="text-center">
                      <button className="fa fa-plus add-line" type="submit">
            
            </button>
                      </td>
                    </tr>
                    
                    {taskList}</tbody>
                </table>
              </div>
              {/* <button
                className="btn btn-secondary submit-btn"
                // onClick={createAndDownloadPdf}
                // onClick={() => window.print()}
              >
                Print Prescription
              </button> */}

               
                 <Link className='btn btn btn-primary btn-rounded'
                       to={`/dashboard/FichePatient/${consultation.patientId}`}>
                         Save Prescription
                         
                  </Link>
                
          
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

Addordonnance.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addOrdonnance: PropTypes.func.isRequired,
  getallConsultationsById: PropTypes.func.isRequired,
  createAndDownloadPdf: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
  consultation: state.profile.consultation,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  addOrdonnance,
  getallConsultationsById,
  createAndDownloadPdf,
})(withRouter(Addordonnance));
