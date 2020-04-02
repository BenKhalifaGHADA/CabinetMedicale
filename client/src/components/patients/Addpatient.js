import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPatient } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
// ------------------For datapicker---------------------
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//-------------------End datapicker--------------------
const Addpatient = ({ errors, history, addPatient }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    adresse: '',
    zipcode: '',
    city: '',
    country: '',
    gender: '',
    phone: '',
    Datebirth: new Date(),
  });
  const [file, setFile] = useState('');
  const {
    firstname,
    lastname,
    email,
    adresse,
    zipcode,
    city,
    country,
    gender,
    phone,
  } = formData;

  //   //-------------------For date of birth------------------//
  const [Datebirth, setDatebirth] = useState(new Date());

  const handleChangeDate = date => {
    setDatebirth(date);
  };
  //   //-------------------End date of birth------------------//
  const onChangeFile = e => {
    setFile(e.target.files[0]);
  };
  const onSubmit = e => {
    e.preventDefault();
    const photo = new FormData();
    photo.append('file', file);
    const patData = {
      firstname,
      lastname,
      email,
      adresse,
      zipcode,
      city,
      country,
      gender,
      Datebirth,
      phone,
    };

    addPatient(patData, photo, history);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const options = [
    { label: '* Gender', value: 0 },
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
  ];
  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <h4 className='page-title'>Add Patient</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <form onSubmit={onSubmit}>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Firstname <span className='text-danger'>*</span>
                    </label>
                    {/* <input className="form-control" type="text" /> */}
                    <InputGroup
                      placeholder='Your firstname'
                      name='firstname'
                      value={firstname}
                      onChange={onChange}
                      error={errors.firstname}
                    />
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Lastname <span className='text-danger'>*</span>
                    </label>
                    {/* <input className="form-control" type="text" /> */}
                    <InputGroup
                      placeholder='Your lastname'
                      name='lastname'
                      value={lastname}
                      onChange={onChange}
                      error={errors.lastname}
                    />
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Email <span className='text-danger'>*</span>
                    </label>
                    <InputGroup
                      placeholder='Your email'
                      name='email'
                      value={email}
                      onChange={onChange}
                      error={errors.email}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label>Date of Birth</label>
                    <div className='cal-icon'>
                      <DatePicker
                        className='form-control'
                        selected={Datebirth}
                        onChange={handleChangeDate}
                        placeholderText='Click to select a date'
                        isClearable
                      />
                      {errors && (
                        <div className='invalid-feedback'>{errors.Datebirth}</div>
                      )}
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
                      error={errors.gender}
                    />
                    {errors && <div className='invalid-feedback'>{errors.gender}</div>}
                  </div>
                </div>

                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label>Address</label>
                        {/* <input type="text" className="form-control " /> */}
                        <InputGroup
                          placeholder='Your adresse'
                          name='adresse'
                          value={adresse}
                          onChange={onChange}
                          error={errors.adresse}
                        />
                      </div>
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-4'>
                      <div className='form-group'>
                        <label>Country</label>
                        <InputGroup
                          placeholder='Your Country'
                          name='country'
                          value={country}
                          onChange={onChange}
                          error={errors.country}
                        />
                      </div>
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-4'>
                      <div className='form-group'>
                        <label>State</label>
                        <InputGroup
                          placeholder='Your City'
                          name='city'
                          value={city}
                          onChange={onChange}
                          error={errors.city}
                        />
                      </div>
                    </div>

                    <div className='col-sm-6 col-md-6 col-lg-4'>
                      <div className='form-group'>
                        <label>postal code</label>
                        <InputGroup
                          placeholder='Your postal code'
                          name='zipcode'
                          value={zipcode}
                          onChange={onChange}
                          error={errors.zipcode}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label>Phone </label>
                        <InputGroup
                          placeholder='Your phone'
                          name='phone'
                          value={phone}
                          onChange={onChange}
                          error={errors.phone}
                        />
                        {errors && <div className='invalid-feedback'>{errors.phone}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-sm-12'>
                  <div className='form-group'>
                    <label>Avatar</label>
                    <div className='profile-upload'>
                      <div className='upload-img'>
                        <img alt='' src='assets/img/user.jpg' />
                      </div>
                      <div className='upload-input'>
                        <input
                          type='file'
                          id='customFile'
                          className='form-control'
                          onChange={onChangeFile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='m-t-20 text-center'>
                <button className='btn btn-primary submit-btn'>Create Patient</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Addpatient.propTypes = {
  addPatient: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { addPatient })(withRouter(Addpatient));
