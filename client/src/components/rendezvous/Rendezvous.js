import React from 'react';


import { Link} from 'react-router-dom';
// import spinner from "../common/spinner.gif";

const Rendezvous = ({
	
   
	loading,
  }) => {
	  
	if (loading )
	  return (
		<div className='container'>
		  <div className='d-flex justify-content-center text-primary'>
			<div className='spinner-border' role='status'>
			  <span className='sr-only'>Loading...</span>
			</div>
		  </div>
		</div>
	  );

  return (
    <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Appointments</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <Link to="/dashboard/AddRendezvous" className="btn btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> Add Appointment</Link>
                    </div>
                </div>
				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<table className="table table-striped custom-table">
								<thead>
									<tr>
										<th>Appointment ID</th>
										<th>Patient Name</th>
										<th>Age</th>
										<th>Doctor Name</th>
										<th>Department</th>
										<th>Appointment Date</th>
										<th>Appointment Time</th>
										<th>Status</th>
										<th className="text-right">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>APT0001</td>
										<td><img width="28" height="28" src="assets/img/user.jpg" className="rounded-circle m-r-5" alt=""/> Denise Stevens</td>
										<td>35</td>
										<td>Henry Daniels</td>
										<td>Cardiology</td>
										<td>30 Dec 2018</td>
										<td>10:00am - 11:00am</td>
										<td><span className="custom-badge status-red">Inactive</span></td>
										<td className="text-right">
											<div className="dropdown dropdown-action">
												<a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
												<div className="dropdown-menu dropdown-menu-right">
													<Link className="dropdown-item" to="/dashboard/EditRendezvous"><i className="fa fa-pencil m-r-5"></i> Edit</Link>
													<a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_appointment"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
												</div>
											</div>
										</td>
									</tr>
									
								</tbody>
							</table>
						</div>
					</div>
                </div>
            </div>
          
			<div id="delete_appointment" className="modal fade delete-modal" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body text-center">
							<img src="assets/img/sent.png" alt="" width="50" height="46"/>
							<h3>Are you sure want to delete this Appointment?</h3>
							<div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
								<button type="submit" className="btn btn-danger">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
};

export default Rendezvous;
