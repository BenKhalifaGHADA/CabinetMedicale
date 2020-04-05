import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: true,
  patient: null,
  // loadingPatient:true,

  ///////////////////^
  rendezvous:null,
 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    
    // case GET_PATIENT:{
    //   return {
    //     ...state,
    //     patient:action.payload,
    //     loadingPatient:false,
        
        
    //   };
    // }   
    default:
      return state;
  }
}
