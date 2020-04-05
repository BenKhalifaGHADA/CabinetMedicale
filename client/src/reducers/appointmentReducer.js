import {
    GET_APPOINTMENT
  } from '../actions/types';
  
  const initialState = {
    rendezvous: null,
    loadingAppointment:true,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
       
      case GET_APPOINTMENT:{
        return {
          ...state,
          rendezvous:action.payload,
          loadingAppointment:false,
          
          
        };
      }   
      default:
        return state;
    }
  }
  