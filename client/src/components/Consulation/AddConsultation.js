import React,{useEffect} from 'react';
import { withRouter,Link } from 'react-router-dom';
import './Consultation.css';
import ListMedicament from "./ListMedicament";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getallPatients} from '../../actions/patientAction';
import {  getCurrentProfile } from '../../actions/profileActions';

//package to generate HTML to PDF
// import { saveAs } from 'file-saver';
import {createAndDownloadPdf} from '../../actions/printAction';

const AddConsultation = ({ profile: { profile }, addAppointment, history }) => {
  // const [typevisite, setType] = useState('Adrian');
  
 
  // const [receiptId, setReceiptId] = useState(0);
  // const [price1, setPrice1] = useState(0);
  // const [price2, setPrice2] = useState(0);
  // const onChange = e => {
  //   setType({ ...typevisite, [e.target.name]: e.target.value });
  // };
 
  
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">create consultation</h4>
          </div>
        </div>
        <form>

          {/* Box Basic Information */}
          <div className="card-box">
            <h3 className="card-title">Basic Informations</h3>
            <div className="row">

              <div className="col-md-6">
                <div className="form-group form-focus">
                  <label className="focus-label">Motif</label>
                  <input type="text" className="form-control floating" name="typevisite" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <label className="focus-label"> Date de consultation</label>
                  <div className="cal-icon">
                    <input className="form-control floating datetimepicker" type="text" value="05/06/1985" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group form-focus">
                  <label>Observation</label>
                  <div className="col-md-12">
                    <textarea cols="113" placeholder="Enter your comment here"></textarea>
                  </div>
                </div>
              </div>

            </div>
          </div>

            <div className="card-box">
            <div className="row">

              <div className="col-md-6">
                <div className="card-box">
                  <h3 className="card-title">Liste des consulations</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="accordion" id="accordionE">
                        <div id="headingOne1">
                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                            01/04/2020
                        </button>
                          {/* </h2> */}
                        </div>
                        <div id="collapseOne1" className="collapse  " aria-labelledby="headingOne1" data-parent="#accordionE">
                          <div className="card-body">
                            <table className="table table-striped mb-0">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Motif</th>
                                  <th>Observation</th>
                                  <th>Ordonnance</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>12-02-2020</td>
                                  <td>lorem lorem lorem</td>
                                  <td>Motif</td>
                                  <td>Ordonnance</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            
              <div className="col-md-6">
                <div className="card-box">
                  <ListMedicament />
                  <div className="row">
                    <div className="col-md-3">
                      <button className="btn btn-success">Sauvegarder</button>
                    </div>
                    <div className="col-md-5">
                      <Link to="#" className="btn btn-primary" >
                        <i className="fa fa-print"></i> Print ordonnance
                           </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* End box of fiche patient and drug */}
          
          <div className="card-box">
            <div className="row">

              <div className="col-md-12">
                <div className="card-box">
                  <h3 className="card-title">Liste des ordonnances</h3>
                  <div className="row">
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

                  </div>
                </div>
              </div>

            
             
            </div>
          </div>


          <div className="text-center m-t-20">
            <button className="btn btn-primary submit-btn" type="button">Save</button>
            <button className="btn btn-secondary submit-btn" type="button" onClick={createAndDownloadPdf}>Print fiche patient</button>

          </div>
        </form>
      </div>

    </div>
  );
};

AddConsultation.propTypes = {
  // addAppointment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getallPatients: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getallPatients,
  getCurrentProfile,
  // addAppointment,
})(withRouter(AddConsultation));
