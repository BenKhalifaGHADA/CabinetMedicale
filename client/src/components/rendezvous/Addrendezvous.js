import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectListGroup from '../common/SelectListGroup';
import { getallAppointment,addAppointment } from '../../actions/appointmentActions';
import { getCurrentProfile } from '../../actions/profileActions';
// ------------------For datapicker---------------------
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//-------------------End datapicker--------------------


const Addrendezvous = ({ profile: { profile }, errors,addAppointment, history }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    typeVisite: '',
    


  });
  const [patient,setpatientData]=useState({
    patientId:'',
    firstname:'',
    lastname:''
  })
  const {
    // date,
    // time,
    
    typeVisite,
    
    
  } = formData;

  //   //-------------------For date of appointment------------------//
  const [date, setDate] = useState(new Date());

  const handleChangeDate = d => {
    setDate(d);
  };
  //   //-------------------End date of appointment------------------//

  //---------------------Begin time of appointment-------------------//
  const [time,setStartDate]=useState(new Date());
  const handleChangeTime= T=>{
    setStartDate(T);
  }
  
  //---------------------End time of appointment-------------------//

  const onSubmit = e => {
    e.preventDefault();

    const patData = {
      date,
      time,
      typeVisite,
      patient,
    };

    addAppointment(patData, history);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangePatient = e=>{
  console.log(e.target.value)
  let data=e.target.value.split(',');
  console.log(data)
  setpatientData({patientId:data[0],firstname:data[1],lastname:data[2]})}
  console.log('patient',patient)
  // Select options for type appointment
  const options = [
    { label: '* Type', value: 0 },
    { label: 'Controle', value: 'Controle' },
    { label: 'Consultation', value: 'Consultation' },
  ];

  // Select options for name of patient
  const tabPatients = profile.patient.map(patient => ({
    label: `${patient.firstname} ${patient.lastname}`,
    value: [patient._id,patient.firstname,patient.lastname],
  }));
  
  let optionsPatient;
  if (tabPatients.length > 0) {
    optionsPatient = [{ label: 'choose a patient', value: 0 }, ...tabPatients];
    console.log('tabpatient',optionsPatient);
  } else {
    optionsPatient = [
      { label: '* Patient', value: 0 },
      { label: 'No Patient found', value: 1 },
    ];
  }

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <h4 className='page-title'>Add Appointment</h4>
          </div>
        </div>

        <div className='card-box'>
          {/* <h3 className='card-title'>Basic Informations</h3> */}
          <div className='row'>
            <div className='col-md-6 '>
              <div className='form-group'>
                <label>Patient Name</label>
                <SelectListGroup
                  name='patient'
                  value={patient}
                  onChange={onChangePatient}
                  options={optionsPatient}
                />

                {errors && <div className='invalid-feedback'>{errors.patient}</div>}

              </div>

            </div>
            <div className="col-md-6">
              <div className='form-group'>
                Or <Link to="/dashboard/Addpatient">Create a new patient</Link>
              
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className='form-group'>
                <label> Appointment date </label>
                <DatePicker
                  className='form-control'
                  selected={date}
                  onChange={handleChangeDate}
                  placeholderText='Click to select a date'
                  isClearable
                />
                 {errors && (
                        <div className='invalid-feedback'>{errors.date}</div>
                      )}
                 </div>
            </div>

            <div className="col-md-6">
              <div className='form-group'>
                <label> Appointment time </label>
               
                <DatePicker
                  className='form-control' 
                  selected={time}
                  onChange={handleChangeTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                 {errors && (
                        <div className='invalid-feedback'>{errors.time}</div>
                      )}
              </div>
            </div>

            <div className="col-12">
              <div className='form-group'>
                <label>Type de visite</label>
                <SelectListGroup
                  name='typeVisite'
                  value={typeVisite}
                  onChange={onChange}
                  options={options}
                />
                 {errors && (
                        <div className='invalid-feedback'>{errors.typeVisite}</div>
                      )}
              </div>
            </div>

           
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <form onSubmit={onSubmit}>
              <div className='m-t-20 text-center'>
                <button className='btn btn-primary submit-btn'>Create Appointment</button>
              </div>
            </form>
          </div>
        </div>




      </div>
    </div>


  );
};

Addrendezvous.propTypes = {
  addAppointment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getallAppointment: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getallAppointment,
  getCurrentProfile,
  addAppointment,
})(withRouter(Addrendezvous));
