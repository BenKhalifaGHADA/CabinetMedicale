import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Showpatient= ({
  
      auth: { user },
   
      loading,
    }) => {
        
      if (loading || user === null)
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
          <Fragment>
           <div class="page-wrapper">
            <div class="content">
                <div class="row">
                    <div class="col-sm-4 col-3">
                        <h4 class="page-title">Patients</h4>
                    </div>
                    <div class="col-sm-8 col-9 text-right m-b-20">
                        <Link to="/dashboard/Addpatient" class="btn btn btn-primary btn-rounded float-right"><i class="fa fa-plus"></i> Add Patient</Link>
                    </div>
                </div>
				<div class="row">
					<div class="col-md-12">
						<div class="table-responsive">
							<table class="table table-border table-striped custom-table datatable mb-0">
								<thead>
									<tr>
										<th>Name</th>
										<th>Age</th>
										<th>Address</th>
										<th>Phone</th>
										<th>Email</th>
										<th class="text-right">Action</th>
									</tr>
								</thead>
								<tbody>
								
																	<tr>
										<td><img width="28" height="28" src="../assets/img/user.jpg" class="rounded-circle m-r-5" alt=""/> Sandra Mendez</td>
										<td>24</td>
										<td>2535 Linden Avenue, Orlando, FL, 32789</td>
										<td>(797) 506 1265</td>
										<td>sandramendez@example.com</td>
										<td class="text-right">
											<div class="dropdown dropdown-action">
												<a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
												<div class="dropdown-menu dropdown-menu-right">
													<a class="dropdown-item" href="edit-patient.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
													<a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
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
         
            
            <div id="delete_patient" class="modal fade delete-modal" role="dialog">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body text-center">
						<img src="assets/img/sent.png" alt="" width="50" height="46"/>
						<h3>Are you sure want to delete this Patient?</h3>
						<div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
							<button type="submit" class="btn btn-danger">Delete</button>
						</div>
					</div>
				</div>
			</div>
			
		</div>
        </div>
          </Fragment>
      );

};
const mapState = state => ({
    alerts: state.alert,
    loading: state.auth.loading,
    auth: state.auth,
  });
  export default connect(mapState)(
      Showpatient
  );
  
