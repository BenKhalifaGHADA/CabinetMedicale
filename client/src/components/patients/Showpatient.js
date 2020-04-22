import React ,{useState}from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Patient from '../patients/Patient';
import Pagination from '../common/Pagination';
import { withRouter } from 'react-router-dom';


const Showpatient = ({profile}
) => {
  //-----------Begin pagination------------
  const [currentPage,setCurrentPage]=useState(1);
  const [postPerpage,setPostPerPage]=useState(5);
  const indexOfLastPost=currentPage*postPerpage;
  const indexOfFirstPost=indexOfLastPost-postPerpage;
  const currentPatient=(profile.patient).slice(indexOfFirstPost,indexOfLastPost);
  const paginate=(pagenumber)=> setCurrentPage(pagenumber); 
  
  //-----------End Pagination-----------------

   {console.log(profile.patient)}
  return (
    <div className='page-wrapper'>
      
    <div className='content'>
      <div className='row'>
        <div className='col-sm-4 col-3'>
          <h4 className='page-title'>Patients</h4>
        </div>
        <div className='col-sm-8 col-9 text-right m-b-20'>
          <Link
            to='/dashboard/Addpatient'
            className='btn btn btn-primary btn-rounded float-right'>
            <i className='fa fa-plus'></i> Add Patient
          </Link>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='table-responsive'>
            <table className='table table-border table-striped custom-table datatable mb-0'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of birth</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className='text-right'>Action</th>
                </tr>
              </thead>
              <tbody>
                <Patient patient={currentPatient} />
                
              </tbody>
            </table>
           
          </div>
         
        </div>
      </div>
      
     
      <Pagination postPerpage={postPerpage} totalPost={(profile.patient).length} paginate={paginate}/>
    </div>
    
  </div>

   
  );
};

Showpatient.propTypes = {
    deletePatient: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile.profile,
  }); 
  
export default connect(mapStateToProps)(withRouter(Showpatient));
