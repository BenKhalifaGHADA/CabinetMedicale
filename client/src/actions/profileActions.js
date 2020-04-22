import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
 
} from './types';

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading())
  try {

    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOT_FOUND,
      
    });
  }
};

// Create Profile
export const createProfile = (profileData, history) => async dispatch => {
  dispatch(setProfileLoading())
  try {
    const res = await axios.post('/api/profile', profileData);
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


//. upload photo
export const uploadPhoto = formData => async dispatch => {
  try {
      await axios.post('/api/profile/upload', formData, {
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