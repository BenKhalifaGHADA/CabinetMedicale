import React, { useState,useEffect } from "react";
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  getCurrentProfile } from '../../actions/profileActions';
import { getallConsultationsBypatient,addConsultation } from "../../actions/consultationActions";
import Spinner from "../common/Spinner";

// //package to generate HTML to PDF
// // import { saveAs } from 'file-saver';
 import {createAndDownloadPdf} from '../../actions/printAction';

const AddConsultation = ({
  profile: { profile },
  getallConsultationsBypatient,
  consultations,
  history,
  match,
  addConsultation,
  // createAndDownloadPdf
  }) =>
 {
  //Create a new consultation
  const [formConsultation, setformConsultation] = useState({
    observation: '',
    
    // ordonnance:[{
    //   duration: '',
    //   dose: '',
    //   drug: ''
    // }],
    
  });
  const {
   observation,
   } = formConsultation;
  const onChange = e => {
    setformConsultation({ ...formConsultation, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    let patientId=match.params.id;
    const consData = {
     observation,
     patientId,
    };
    console.log('cons',consData);
    addConsultation(consData, history);
  };

  useEffect(() => {
    getallConsultationsBypatient(match.params.id);
  }, []);
  if (consultations === null)
    return (
      <div className="main-wrapper">
        <div className="content">
        <Spinner />
        </div>
      </div>
    );

    // //Create a new prescription
    // const [formOrd,setState]=useState({
    //   drug:'',
    //   dose:'',
    //   duration:'',
    // })
    // // const {
    // //  drug,
    // //  dose,
    // //  duration,
    // // } = formOrd;
    // const updateFieldPrescription = e => {
    //   setState({
    //     ...formOrd,
    //     [e.target.name]: e.target.value
    //   });
    // };
    // const printValues=e=>{
    //   e.preventDefault();
    //   console.log('hello',formOrd)
    // }
  return (
   
    <div className="page-wrapper">
       {console.log(consultations)}
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">create consultation</h4>
          </div>
        </div>
        <form onSubmit={onSubmit}>

          {/* Box Basic Information */}
          <div className="card-box">
            <h3 className="card-title">Basic Informations</h3>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group form-focus">
                  <label>Observation</label>
                  <div className="col-md-12">
                    <textarea cols="113" placeholder="Enter your comment here" value={observation} name="observation"
                      onChange={onChange}></textarea>
                  </div>
                </div>
              </div>

            </div>
          </div>

            <div className="card-box">
            <div className="row">

              <div className="col-md-12">
                <div className="card-box">
                  <h3 className="card-title">Liste des consulations</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="accordion" id="accordionE">
                        <div id="headingOne1">
                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                           Consultation
                        </button>
                          {/* </h2> */}
                        </div>
                        <div id="collapseOne1" className="collapse  " aria-labelledby="headingOne1" data-parent="#accordionE">
                          <div className="card-body">
                            <table className="table table-striped mb-0">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Observation</th>
                                  <th>Ordonnance</th>
                                </tr>
                              </thead>
                              <tbody>
                              {consultations.map((exp) => (
                                <tr key={exp._id}>
                                <td>{exp.date}</td>
                                <td>{exp.observation}</td>
                                <td><Link
                                    to={{
                                      pathname: "/dashboard/ShowAllOrdonnance",
                                      state: { ordon:exp },
                                    }}
                                  >
                                    <button className='btn btn-secondary'>Show prescription </button>
                                  </Link></td>
                              </tr>
 
                            ))}
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            
              {/* <div className="col-md-6">
                <div className="card-box">
                  <ListMedicament formOrd={formOrd} />
                
                  <div className="row">
                    <div className="col-md-3">
                    
                      <button className="btn btn-success" type="submit" >Sauvegarder</button>
                     
                       </div>
                    <div className="col-md-5">
                      <Link to="#" className="btn btn-primary" >
                        <i className="fa fa-print"></i> Print ordonnance
                           </Link>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* End box of fiche patient and drug */}
          
          {/* <div className="card-box">
            <div className="row">

              <div className="col-md-12">
                <div className="card-box">
                  <h3 className="card-title">Add an prescription </h3>
                  <div className="row">
                  <div className="col-md-12">
                  <button className="btn btn-primary fa fa-plus "></button>
                  </div>  
                  </div> */}
                 
                  {/* <div className="row">
                    <div className="col-md-12">
                    <table className="table table-striped mb-0">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>12/02/2020</td>
                                  <td> 

                                  <Link to="#" className="btn btn-info" >
                                   <i className="fa fa-eye"></i> 
                                   </Link>

                                   <Link to="#" className="btn btn-primary" >
                                   <i className="fa fa-print"></i> 
                                   </Link>

                                   <Link to="#" className="btn btn-warning" >
                                   <i className="fa fa-edit"></i> 
                                   </Link>

                                   <Link to="#" className="btn btn-danger" >
                                   <i className="fa fa-close"></i> 
                                   </Link>
                                   
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                    </div>

                  </div> */}
                {/* </div>
              </div>

            
             
            </div>
          </div> */}


          <div className="text-center m-t-20">
            <button className="btn btn-primary submit-btn" type="submit">Save</button>
            <button className="btn btn-secondary submit-btn" onClick={createAndDownloadPdf}>Print fiche patient</button>

          </div>
        </form>
      </div>

    </div>
  );
};

AddConsultation.propTypes = {
 
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getallConsultationsBypatient: PropTypes.func.isRequired,
  addConsultation:PropTypes.func.isRequired,
  createAndDownloadPdf:PropTypes.func.isRequired,


};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
  consultations: state.profile.consultations,
  
});

export default connect(mapStateToProps, {
 getCurrentProfile,
 getallConsultationsBypatient,
 addConsultation,
 createAndDownloadPdf
})(withRouter(AddConsultation));
