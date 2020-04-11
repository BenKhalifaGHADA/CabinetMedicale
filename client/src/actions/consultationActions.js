import axios from 'axios';

import {
  GET_CONSULTATIONS,
  GET_ERRORS,
} from './types';

import {getCurrentProfile} from './profileActions';
//Get all consultation
  export const getallConsultations = () => dispatch => {
    // dispatch(setProfileLoading());
    axios
      .get('/api/consultation/all')
      .then(res =>
        dispatch({
          type: GET_CONSULTATIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_CONSULTATIONS,
          payload: null
        })
      );
  };

  // Add consultation
export const addConsultation = (expData, history) => async dispatch => {
  try {
    
    await axios.post('api/consultation/add', expData);
    dispatch(getCurrentProfile());
    history.push('/dashboard/patients');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};