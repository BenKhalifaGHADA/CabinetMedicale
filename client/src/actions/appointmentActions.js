import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
  GET_APPOINTMENT,
 
} from './types';
import {getCurrentProfile,setProfileLoading} from './profileActions';
// ------------------------------Begin CRUD For Appointment--------------//
// Add appointment
export const addAppointment = (expData, history) => async dispatch => {
    try{
      await axios
      .post('/api/profile/appointment', expData);
      dispatch(getCurrentProfile());
      history.push('/dashboard/Rendezvous');
    }
     catch(err){
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
     };
  };
  
  // Delete Appointment
  export const deleteAppointment = id => async dispatch => {
    await axios
      .delete(`/api/profile/appointment/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
  
  // get appointment by id
  export const getAppointmentById = appointment_id => async dispatch => {
    dispatch(setProfileLoading());
    try {
      const res = await axios.get(`/api/profile/appointment/${appointment_id}`);
      dispatch({
        type: GET_APPOINTMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
    //update Appointment by id
    export const updateAppointment = (id, appointment, history) => async dispatch => {
      //...........................................
      try {
        const config = { headers: { 'Content-Type': 'application/json' } };
       await axios.put(`/appointment/update/${id}`, appointment, config);
        dispatch(getCurrentProfile());
        history.push('/dashboard/appointment');
      } catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
        console.log(err.response.data);
      }
      //..............................................
    };
  
    
  // get all patients
  export const getallAppointment = () => async dispatch => {
    await axios
      .get('/api/profile/appointment/all')
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {},
        })
      );
  };
  // ------------------------------END CRUD For Appointment--------------//
  