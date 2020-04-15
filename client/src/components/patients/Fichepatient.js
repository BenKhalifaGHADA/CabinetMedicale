import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getPatientById } from "../../actions/patientAction";
import { getCurrentProfile } from "../../actions/profileActions";
import { getallConsultations } from "../../actions/consultationActions";
import InputGroup from "../common/InputGroup";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import Pagination from '../common/Pagination';

const Fichepatient = ({
  profile: { loadingPatient },
  patient,
  match,
  getPatientById,
  errors,
  getallConsultations,
  consultations,
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone: "",
    profession: "",
    assurance: "",
    CNAM: "",
    Datebirth: "",
  });

  useEffect(() => {
    getPatientById(match.params.id);
    if (patient)
      setFormData({
        ...formData,
        firstname: patient.firstname,
        lastname: patient.lastname,
        gender: patient.gender,
        phone: patient.phone,
        profession: patient.profession,
        assurance: patient.assurance,
        CNAM: patient.CNAM,
        Datebirth: patient.Datebirth,
      });
  }, [loadingPatient]);

  const {
    firstname,
    lastname,
    gender,
    phone,
    profession,
    assurance,
    CNAM,
    Datebirth,
  } = formData;
  useEffect(() => {
    getallConsultations();
  }, []);

  if (loadingPatient || consultations === null)
    return (
      <div className="main-wrapper">
        <div className="content">
        <Spinner />
        </div>
      </div>
    );

    //-----------Begin pagination------------
  // const [currentPage,setCurrentPage]=useState(1);
  // const [postPerpage,setPostPerPage]=useState(5);
  // const indexOfLastPost=currentPage*postPerpage;
  // const indexOfFirstPost=indexOfLastPost-postPerpage;
  // const currentConsultation=consultations.slice(indexOfFirstPost,indexOfLastPost);
  // const paginate=(pagenumber)=> setCurrentPage(pagenumber); 
  
  //-----------End Pagination-----------------

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">Fiche Patient</h4>
          </div>
        </div>
        <form>
          <div className="card-box">
            <h3 className="card-title">Personal Informations</h3>
            <div className="row">
              <div className="col-md-12">
                <div className="profile-basic">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Firstname</label>
                        {/* <input type="text" className="form-control floating" value="John"/> */}
                        <InputGroup
                          placeholder="Firstname"
                          name="firstname"
                          value={firstname}
                          // onChange={onChange}
                          //error={errors.firstname}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Lastname</label>
                        {/* <input type="text" className="form-control floating" value="Doe" /> */}
                        <InputGroup
                          placeholder="Lastname"
                          name="lastname"
                          value={lastname}
                          // onChange={onChange}
                          //error={errors.lastname}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">BirthDate</label>
                        <div className="cal-icon">
                          {/* <input className="form-control floating datetimepicker" type="text" value="05/06/1985" /> */}
                          <InputGroup
                            name="Datebirth"
                            value={Datebirth}
                            // onChange={onChange}
                           // error={errors.birthdate}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus select-focus">
                        <label className="focus-label">Gendar</label>
                        {/* <select className="select form-control floating">
                                                    <option value="male selected">Male</option>
                                                    <option value="female">Female</option>
                                                </select> */}
                        <InputGroup
                          name="gender"
                          value={gender}
                          // onChange={gender}
                          //error={errors.gender}
                          disabled
                        />
                        {/* <SelectListGroup
                                                    placeholder='Gender'
                                                    name='gender'
                                                    value={gender}
                                                    onChange={onChange}
                                                    options={options}
                                                    disabled
                                                /> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Phone</label>
                        {/* <input type="text" className="form-control floating" value="123456" /> */}
                        <InputGroup
                          name="phone"
                          value={phone}
                          // onChange={onChange}
                          //error={errors.phone}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Profession</label>
                        {/* <input type="text" className="form-control floating" value="enseignant" /> */}
                        <InputGroup
                          name="profession"
                          value={profession}
                          // onChange={onChange}
                          //error={errors.profession}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Assurance</label>
                        {/* <input type="text" className="form-control floating" value="assurance" /> */}
                        <InputGroup
                          name="assurance"
                          value={assurance}
                          // onChange={onChange}
                          //error={errors.assurance}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">CNAM</label>
                        {/* <input type="text" className="form-control floating" value="CNAM" /> */}
                        <InputGroup
                          name="CNAM"
                          value={CNAM}
                          // onChange={onChange}
                          //error={errors.CNAM}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-box">
            <h3 className="card-title">Liste des consulations</h3>
            <div className='table-responsive'>
            <table className='table table-border table-striped custom-table datatable mb-0'>
              <thead>
                <tr>
                <th>Date</th>
                <th>Observation</th>
                <th>Ordonnance</th>
                {/* <th className='text-right'>Action</th> */}
                </tr>
              </thead>
              <tbody>
              {consultations.map((exp) => (
                 <tr>
                 <td> <Moment format='YYYY/MM/DD'>{exp.date}</Moment></td>
                 <td>{exp.observation}</td>
                 <td>
                   <Link
                     to={{
                       pathname: "/dashboard/ShowAllOrdonnance",
                       state: { ordon:exp },
                     }}
                   >
                     <button className='btn btn-secondary'>Show prescription </button>
                   </Link>
                   {/* {exp.ordonnance.map((item) => {
                     item.date;
                   })} */}
                   ;
                 </td>
               </tr>
                ))}
              </tbody>
            </table>
           
          </div>
          
          {/* <Pagination postPerpage={postPerpage} totalPost={consultations.length} paginate={paginate}/> */}
            {console.log(consultations)}
            {/* {consultations.map((exp) => ( */}
              {/* // <div className="row">
              //   <div className="col-md-12">
              //     <div className="accordion" id="accordionExample">
              //       <div className="card">
              //         <div className="card-header" id="headingOne">
              //           <h2 className="mb-0">
              //             <button */}
              {/* //               className="btn btn-primary"
              //               type="button"
              //               data-toggle="collapse"
              //               data-target="#collapseOne"
              //               aria-expanded="true"
              //               aria-controls="collapseOne"
              //             > */}
              {/* //               {exp.date}
              //             </button>
              //           </h2>
              //         </div>
              //         <div */}
              {/* //           id="collapseOne"
              //           className="collapse show"
              //           aria-labelledby="headingOne"
              //           data-parent="#accordionExample"
              //         >
              //           <div className="card-body">
              //             <table className="table table-striped mb-0">
              //               <thead>
              //                 <tr>
              //                   <th>Date</th>
              //                   <th>Observation</th>
              //                   <th>Ordonnance</th>
              //                 </tr>
              //               </thead>
              //               <tbody>
              //                 <tr>
              //                   <td> <Moment format='YYYY/MM/DD'>{exp.date}</Moment></td>
              //                   <td>{exp.observation}</td>
              //                   <td>
              ///                     <Link */}
              {/* //                       to={{ */}
              {/* //                         pathname: "/dashboard/ShowAllOrdonnance",
              //                         state: { ordon:exp },
              //                       }}
              //                     >
              //                       <button className='btn btn-secondary'>Show prescription </button>
              //                     </Link>
              //                     {/* {exp.ordonnance.map((item) => {
              //                       item.date;
              //                     })} */}
              {/* //                     ;
              //                   </td>
              //                 </tr>
              //               </tbody>
              //             </table> */}
              {/* //           </div>
              //         </div>
              //       </div>
              //     </div> */}
              {/* //   </div>
              // </div>
            ))} */}
          </div>
          
          <div className="m-t-20 text-center">
            <button className="btn btn-primary submit-btn">Print</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Fichepatient.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getPatientById: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  getallConsultations: PropTypes.func.isRequired,
  // consultation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.profile.patient,
  errors: state.errors,
  profile: state.profile,
  consultations: state.profile.consultations,
});

export default connect(mapStateToProps, {
  getPatientById,
  getCurrentProfile,
  getallConsultations,
})(withRouter(Fichepatient));
