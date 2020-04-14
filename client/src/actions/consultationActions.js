import axios from 'axios';

import {
  GET_CONSULTATIONS,
  GET_ERRORS,
  GET_CONSULTATION
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
 //Get all consultation by id patient
 export const getallConsultationsBypatient = (id) => dispatch => {
  // dispatch(getCurrentProfile());
  axios
    .get(`/api/consultation/patient/${id}`)
    .then(res =>
      dispatch({
        type: GET_CONSULTATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONSULTATIONS,
        payload: null,
      })
    );
};


  //Get all consultation by id consulation
  export const getallConsultationsById = (id) => dispatch => {
    // dispatch(getCurrentProfile());
    axios
      .get(`/api/consultation/${id}`)
      .then(res =>
        dispatch({
          type: GET_CONSULTATION,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_CONSULTATION,
          payload: null,
        })
      );
  };

  // Add consultation
export const addConsultation = (expData, history) => async dispatch => {
  try {
    const resultat=await axios.post('/api/consultation/add', expData);
    console.log('id de consultation',resultat.data._id)
    // dispatch(getCurrentProfile());
    let id=resultat.data._id
    history.push(`/dashboard/showconsultation/${id}`);
 } 
 catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

 // Delete Consultation
 export const deleteConsultation = id => async dispatch => {
  await axios
    .delete(`/api/consultation/delete/${id}`)
    .then(res =>
      dispatch({
       // type: UPDATE_APPOINTMENT,(attentionà corriger)
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
