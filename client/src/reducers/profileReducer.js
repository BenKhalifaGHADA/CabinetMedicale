import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,

  GET_PATIENT,
  UPDATE_PATIENT,

  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,

  GET_CONSULTATIONS,
  GET_CONSULTATION,
  UPDATE_CONSULTATION

} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: true,
  patient: null,
  consultations: null,
  consultation:null,
  rendezvous: null,
  // loadingAppointment:true,
  // loadingPatient:true,

  ///////////////////^
  // rendezvous:null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        // loadingPatient:true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,

      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        loadingPatient: false,

      };
    case UPDATE_PATIENT:
      return{
        ...state,
        patient: action.payload,
        loadingPatient: false,
      };
    case GET_APPOINTMENT: {
      return {
        ...state,
        rendezvous: action.payload,
        loadingAppointment: false,


      };
    }
      case UPDATE_APPOINTMENT:
        return{
          ...state,
        rendezvous: action.payload,
        loadingAppointment: false,
        };  
    

    case GET_CONSULTATIONS:
      return {
        ...state,
        consultations: action.payload,
        // loadingConsultation:false,
      };

      case GET_CONSULTATION:
        return {
          ...state,
          consultation: action.payload,
          // loadingConsultation:false,
        };

    //   };
    // }   
    case UPDATE_CONSULTATION:
      return {
        ...state,
        consultation: action.payload,
        // loadingConsultation:false,
      };

    default:
      return state;
  }
}
