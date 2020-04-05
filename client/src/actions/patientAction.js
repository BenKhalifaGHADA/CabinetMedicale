import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
  GET_PATIENT,
} from './types';

import {getCurrentProfile,setProfileLoading} from './profileActions';
// ------------------------------Begin CRUD For patient--------------//
// Add patient
export const addPatient = (expData, photo, history) => async dispatch => {
    try {
      const response = await axios.post('/api/profile/patientphoto', photo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expData.photo = response.data;
      await axios.post('/api/profile/patient', expData);
      dispatch(getCurrentProfile());
      history.push('/dashboard/patients');
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
  // Delete patient
  export const deletePatient = id => async dispatch => {
    await axios
      .delete(`/api/profile/patient/${id}`)
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
    dispatch(getCurrentProfile());
  };
  
  // get patient by id
  export const getPatientById = patient_id => async dispatch => {
    dispatch(setProfileLoading());
    try {
      const res = await axios.get(`/api/profile/patient/${patient_id}`);
      dispatch({
        type: GET_PATIENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
  
  //update patient bu id
  export const updatePatient = (id, patient, history) => async dispatch => {
    //...........................................
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
     await axios.put(`/api/profile/patient/update/${id}`, patient, config);
      dispatch(getCurrentProfile());
      history.push('/dashboard/patients');
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
  export const getallPatients = () => async dispatch => {
    await axios
      .get('/api/profile/patient/all')
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
  
  // ------------------------------End CRUD For patient--------------//