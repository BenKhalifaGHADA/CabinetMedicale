import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';
import {getAppointmentById,
	updateAppointment} from '../../actions/appointmentActions'
import {
  
  getCurrentProfile
} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
// ------------------For datapicker---------------------
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//-------------------End datapicker--------------------


const Editrendezvous = ({
	
	profile: { loadingAppointment },
	errors,
	match,
	updateAppointment,
	rendezvous,
	getAppointmentById,
	history,
  }) => {
	const [formData, setFormData] = useState({
		Message: '',
        typeVisite: '',
       
	});
	useEffect(() => {
		getAppointmentById(match.params.id);
	}, []);
	useEffect(() => {
	  if (rendezvous)
		setFormData({
		  ...formData,
		  time: rendezvous.time,
		  Message: rendezvous.Message,
		  date: rendezvous.date,
		  typeVisite: rendezvous. typeVisite,
		  
		});
	}, [loadingAppointment]);
  
	const {
		// date,
		// time,
		Message,
        typeVisite,
	} = formData;
  
	const onSubmit = e => {
	  e.preventDefault();
	  const id_appointment = match.params.id;
	  const appointmentData = {
		date,
		time,
		Message,
        typeVisite,
	  };
  
	  updateAppointment(id_appointment, appointmentData, history);
	};
  
	const onChange = e => {
	  setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  
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
	 // Select options for type appointment
	 const options = [
		{ label: '* Type', value: 0 },
		{ label: 'Controle', value: 'Controle' },
		{ label: 'Consultation', value: 'Consultation' },
	  ];
  
	if (loadingAppointment)
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
            <h4 className='page-title'>Edit Appointment</h4>
          </div>
        </div>

        <div className='card-box'>
          {/* <h3 className='card-title'>Basic Informations</h3> */}
        
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
                <button className='btn btn-primary submit-btn'>Update</button>
              </div>
            </form>
          </div>
        </div>




      </div>
    </div>
  )
      };

	 
	  Editrendezvous.propTypes = {
		profile: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		getCurrentProfile: PropTypes.func.isRequired,
		updateAppointment: PropTypes.func.isRequired,
		getAppointmentById: PropTypes.func.isRequired,
		rendezvous: PropTypes.object.isRequired,
	  };
	  
	  const mapStateToProps = state => ({
		rendezvous: state.profile.patient,
		errors: state.errors,
		profile: state.profile,
	  });
	  
	  export default connect(mapStateToProps, {
		getAppointmentById,
	    updateAppointment,
		getCurrentProfile,
	  })(withRouter(Editrendezvous));
	  