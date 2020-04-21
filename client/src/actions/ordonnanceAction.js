import axios from 'axios';
import { getallConsultationsById, getallConsultations } from './consultationActions';
import { GET_ERRORS, UPDATE_CONSULTATION } from './types';

// Add ordonnance to consultation
export const addOrdonnance = (id, expData, history) => async (dispatch) => {
  try {
    console.log('id', id);
    const resultat = await axios.post(`/api/consultation/add/${id}`, expData);
    //console.log('id de consultation',resultat.data._id)
    //dispatch(getCurrentProfile());
    //let id=resultat.data._id
    console.log('drog object', resultat);
    dispatch(getallConsultationsById(id));
    history.push(`/dashboard/CreateOrdonnance/${id}`);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
// Delete ordonnance
export const deleteOrdon= (id, formData) => async (dispatch) => {
  await axios
    .put(`/api/consultation/deleteOrdon/${id}`, formData)
    .then((res) =>
      dispatch({
        type: UPDATE_CONSULTATION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
  dispatch(getallConsultationsById(id));
  //dispatch(getCurrentProfile());
  // history.push(`/dashboard/FichePatient/${id}`);
};

export const deleteOrdonnance  = (data) => async (dispatch) => {
  try {
    console.log('delete action', data);
    await axios.put('/api/consultation/deleteOrdonnance', data);
    dispatch(getallConsultations());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
