import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {getPatientById,updatePatient} from '../../actions/patientAction'
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';


const Editpatient = ({
  profile: { loadingPatient },
  errors,
  patient,
  match,
  getPatientById,
  updatePatient,
  history,
}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    adresse: '',
    zipcode: '',
    state: '',
    country: '',
    gender: '',
    phone: '',
    Datebirth: '',
    avatar: '',
    cnam:'',
    assurance:'',
  });
  useEffect(() => {
    getPatientById(match.params.id);
   
  }, []);
  useEffect(() => {
    if (!loadingPatient)
      setFormData({
        ...formData,
        firstname: patient.firstname,
        lastname: patient.lastname,
        email: patient.email,
        adresse: patient.adresse,
        zipcode: patient.zipcode,
        state: patient.state,
        country: patient.country,
        gender: patient.gender,
        phone: patient.phone,
        Datebirth: patient.Datebirth,
        avatar: patient.avatar,
        cnam:patient.cnam,
        assurance:patient.assurance,
      });
  }, [loadingPatient]);

  const {
    firstname,
    lastname,
    email,
    adresse,
    zipcode,
    state,
    country,
    gender,
    phone,
    Datebirth,
    avatar,
    cnam,
    assurance,
  } = formData;

  const onSubmit = e => {
    e.preventDefault();
    const id_patient = match.params.id;
    const patientData = {
      firstname,
      lastname,
      email,
      adresse,
      zipcode,
      state,
      country,
      gender,
      phone,
      Datebirth,
      cnam,
      assurance,
    };

    updatePatient(id_patient, patientData, history);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Select options for gender
  const options = [
    { label: '* Your gender', value: 0 },
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
  ];

  if (loadingPatient)
    return (
      <div className='main-wrapper'>
        <Spinner />
      </div>
    );

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <h4 className='page-title'>Edit Patient</h4>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='card-box'>
            <h3 className='card-title'>Basic Informations</h3>
            <div className='row'>
              <div className='col-md-12'>
                <div className='profile-img-wrap'>
                  <img className='inline-block' src={`/${avatar}`} alt={avatar} />
                  <div className='fileupload btn'>
                    <span className='btn-text'>edit</span>
                    <input className='upload' type='file' />
                  </div>
                </div>
                <div className='profile-basic'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>First Name</label>
                        <InputGroup
                          placeholder='Firstname'
                          name='firstname'
                          value={firstname}
                          onChange={onChange}
                          error={errors.firstname}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>Last Name</label>
                        <InputGroup
                          placeholder='Lastname'
                          name='lastname'
                          value={lastname}
                          onChange={onChange}
                          error={errors.lastname}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>Birth Date</label>
                        <div className='cal-icon'>
                          <InputGroup
                            placeholder='birth Date'
                            name='Datebirth'
                            value={Datebirth}
                            onChange={onChange}
                            error={errors.birthdate}
                          />
                        
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group form-focus select-focus'>
                        <label className='focus-label'>Gendar</label>
                        <SelectListGroup
                          placeholder='Gender'
                          name='gender'
                          value={gender}
                          onChange={onChange}
                          options={options}
                        />
                        {errors && (
                          <div className='invalid-feedback'>{errors.gender}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='card-box'>
            <h3 class='card-title'>Contact Informations</h3>
            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group form-focus'>
                  <label class='focus-label'>Address</label>
                  {/* <input type="text" class="form-control floating" value="New York"/> */}
                  <InputGroup
                    placeholder='Address'
                    name='adresse'
                    value={adresse}
                    onChange={onChange}
                    error={errors.State}
                  />
                </div>
              </div>

              <div class='col-md-6'>
                <div class='form-group form-focus'>
                  <label class='focus-label'>State</label>
                  {/* <input type="text" class="form-control floating" value="New York"/> */}
                  <InputGroup
                    placeholder='State'
                    name='state'
                    value={state}
                    onChange={onChange}
                    error={errors.state}
                  />
                </div>
              </div>
              <div class='col-md-6'>
                <div class='form-group form-focus'>
                  <label class='focus-label'>Country</label>
                  {/* <input type="text" class="form-control floating" value="United States"/> */}
                  <InputGroup
                    placeholder='Country'
                    name='country'
                    value={country}
                    onChange={onChange}
                    error={errors.country}
                  />
                </div>
              </div>

              <div class='col-md-6'>
                <div class='form-group form-focus'>
                  <label class='focus-label'>Pin Code</label>
                  {/* <input type="text" class="form-control floating" value="10523"/> */}
                  <InputGroup
                    placeholder='Zip code'
                    name='zipcode'
                    value={zipcode}
                    onChange={onChange}
                    error={errors.zipcode}
                  />
                </div>
              </div>

              <div class='col-md-6'>
                <div class='form-group form-focus'>
                  <label class='focus-label'>Phone Number</label>
                  {/* <input type="text" class="form-control floating" value="631-889-3206"/> */}
                  <InputGroup
                    placeholder='Number Phone'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='card-box'>
        <h3 className='card-title'>Social number Informations</h3>
        <div className='row'>
              <div className='col-md-6'>
              <div className='form-group'>
                    <label>
                     Assurance 
                    </label>
                    {/* <input className="form-control" type="text" /> */}
                   

                      <InputGroup
                          placeholder='Assurance'
                          name='assurance'
                          value={assurance}
                          onChange={onChange}
                          error={errors.assurance}
                        />
                  </div>

              </div>

              <div className="col-md-6">
              <div className='form-group'>
                    <label>
                      CNAM 
                    </label>
                    {/* <input className="form-control" type="text" /> */}
                    <InputGroup
                      placeholder='cnam'
                      name='cnam'
                      value={cnam}
                      onChange={onChange}
                      error={errors.cnam}
                    />
                  </div>
              </div>
        </div>      
        </div>

          <div class='text-center m-t-20'>
            <button class='btn btn-primary submit-btn' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Editpatient.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  getPatientById: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  patient: state.profile.patient,
  errors: state.errors,
  profile: state.profile,
  
});

export default connect(mapStateToProps, {
  getPatientById,
  updatePatient,
  getCurrentProfile,
})(withRouter(Editpatient));
