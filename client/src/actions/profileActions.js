import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PATIENT,
} from './types';

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

// Create Profile
export const createProfile = (profileData, history) => async dispatch => {
  try {
    const res = axios.post('/api/profile', profileData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    history.push('/dashboard/profile');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    await axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

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
    const res = await axios.put(`/api/profile/patient/update/${id}`, patient, config);
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

// ------------------------------Begin CRUD For Appointment--------------//
// Add appointment
export const addAppointment = (expData, history) => async dispatch => {
  await axios
    .post('/api/profile/appointment', expData)
    .then(res => history.push('/dashboard/Rendezvous'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
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

//update Appointment by id

export const updateAppointment = (id, appointment) => async dispatch => {
  await axios
    .put(`/appointment/update/${id}`, appointment)
    .then(res => dispatch(getCurrentProfile()));
};

// ------------------------------END CRUD For Appointment--------------//

//. upload photo
export const uploadPhoto = formData => async dispatch => {
  try {
    const res = await axios.post('/api/profile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(getCurrentProfile());
  } catch (err) {
    if (err.response.status === 500) {
      console.log('There was a problem with the server');
    } else {
      console.log(err.response.data.msg);
    }
  }
};
