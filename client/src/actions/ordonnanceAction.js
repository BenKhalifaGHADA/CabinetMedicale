import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
 
} from './types';

import {getCurrentProfile} from './profileActions';

// Add ordonnance to consultation
export const addOrdonnance = (id,expData, history) => async dispatch => {
  try {
    console.log('id',id);
    const resultat=await axios.post(`/api/consultation/add/${id}`, expData);
    //console.log('id de consultation',resultat.data._id)
    //dispatch(getCurrentProfile());
    //let id=resultat.data._id
    console.log('drog object',resultat);
    
    history.push(`/dashboard/CreateOrdonnance/${id}`);
 } 
 catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
 // Delete ordonnance
 export const deleteOrdonnance = (id,history) => async dispatch => {
    await axios
      .delete(`/api/consultation/deleteOrdonnance/${id}`)
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
    history.push(`/dashboard/FichePatient/${id}`);
  };
  