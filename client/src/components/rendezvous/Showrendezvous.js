import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rendezvous from '../rendezvous/Rendezvous';
import { withRouter } from 'react-router-dom';
import Pagination from '../common/Pagination';

const Showrendezvous = ({ profile }) => {
    //-----------Begin pagination------------
  const [currentPage,setCurrentPage]=useState(1);
  const [postPerpage,setPostPerPage]=useState(5);
  const indexOfLastPost=currentPage*postPerpage;
  const indexOfFirstPost=indexOfLastPost-postPerpage;
  const currentRendezvous=(profile.rendezvous).slice(indexOfFirstPost,indexOfLastPost);
  const paginate=(pagenumber)=> setCurrentPage(pagenumber); 
  
  //-----------End Pagination-----------------

    console.log('hello',profile)
    return (
        <div className='page-wrapper'>
            {console.log(profile)}
            <div className='content'>
                <div className='row'>
                    <div className='col-sm-4 col-3'>
                        <h4 className='page-title'>Appointments</h4>
                    </div>
                    <div className='col-sm-8 col-9 text-right m-b-20'>
                        <Link
                            to='/dashboard/AddRendezvous'
                            className='btn btn btn-primary btn-rounded float-right'>
                            <i className='fa fa-plus'></i> Add appointments
          </Link>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='table-responsive'>
                            <table className='table table-border table-striped custom-table datatable mb-0'>
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                        {/* <th>Status</th> */}
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Rendezvous rendezvous={currentRendezvous} />

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="delete_appointment" className="modal fade delete-modal" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                                <h3>Are you sure want to delete this Appointment?</h3>
                                <div className="m-t-20"> <Link to="#" className="btn btn-white" data-dismiss="modal">Close</Link>
                                    <button type="submit" className="btn btn-danger" data-dismiss='modal'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination postPerpage={postPerpage} totalPost={(profile.rendezvous).length} paginate={paginate}/>
            </div>
        </div>


    );
};

Showrendezvous.propTypes = {
    deleteAppointment: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile.profile,
});

export default connect(mapStateToProps)(withRouter(Showrendezvous));
