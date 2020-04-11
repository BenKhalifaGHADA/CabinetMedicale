import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
 
} from './types';

import {getCurrentProfile} from './profileActions';
 // Delete patient
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
  