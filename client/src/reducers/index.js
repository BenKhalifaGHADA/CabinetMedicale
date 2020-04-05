import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import patientReducer from "./patientReducer";
import appointmentReducer from './appointmentReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  patient: patientReducer,
  appointment: appointmentReducer,
 
});
