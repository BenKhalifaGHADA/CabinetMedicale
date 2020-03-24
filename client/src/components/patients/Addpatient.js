import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPatient } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
class Addpatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            adresse: '',
            zipcode: '',
            city: '',
            country: '',
            gender: '',
            Datebirth: '',
            phone:'',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const patData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone:this.state.phone,
            adresse: this.state.adresse,
            zipcode: this.state.zipcode,
            city: this.state.city,
            country: this.state.country,
            gender: this.state.gender,
            Datebirth: this.state.Datebirth,
            phone:this.state.phone,
        };

        this.props.addPatient(patData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
         // Select options for gender
         const options = [
            { label: '* Your gender', value: 0 },
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' }
        ];
        return (
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h4 className="page-title">Add Patient</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>First Name <span className="text-danger">*</span></label>
                                            {/* <input className="form-control" type="text" /> */}
                                            <InputGroup
                                                placeholder="Your firstname"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.onChange}
                                                error={errors.firstname} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            {/* <input className="form-control" type="text" /> */}
                                            <InputGroup
                                                placeholder="Your lastname"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.onChange}
                                                error={errors.lastname} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Username <span className="text-danger">*</span></label>
                                            <input className="form-control" type="text" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email <span className="text-danger">*</span></label>
                                            {/* <input className="form-control" type="email" /> */}
                                            <InputGroup
                                                        placeholder="Your email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                        error={errors.email} />
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input className="form-control" type="password" />
                                        </div>
                                    </div> */}
                                    {/* <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input className="form-control" type="password" />
                                        </div>
                                    </div> */}
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <div className="cal-icon">
                                                <input type="text" className="form-control datetimepicker" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group gender-select">
                                            <label className="gen-label">Gender:</label>
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                <SelectListGroup
                                                        placeholder="Gender"
                                                        name="gender"
                                                        value={this.state.gender}
                                                        onChange={this.onChange}
                                                        options={options}
                                                        error={errors.gender}

                                                    />
                                                    </label>
                                                    </div>
                                            {/* <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" name="gender" className="form-check-input" />Male
                                  </label>
                                            </div> */}
                                            {/* <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" name="gender" className="form-check-input" />Female
                                  </label>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    {/* <input type="text" className="form-control " /> */}
                                                    <InputGroup
                                                        placeholder="Your adresse"
                                                        name="adresse"
                                                        value={this.state.adresse}
                                                        onChange={this.onChange}
                                                        error={errors.adresse} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>Country</label>
                                                    {/* <select className="form-control select">
                                                        <option>USA</option>
                                                        <option>United Kingdom</option>
                                                    </select> */}
                                                    <InputGroup
                                                        placeholder="Your Country"
                                                        name="country"
                                                        value={this.state.country}
                                                        onChange={this.onChange}
                                                        error={errors.country} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>State</label>
                                                    {/* <input type="text" className="form-control" /> */}
                                                    <InputGroup
                                                        placeholder="Your City"
                                                        name="city"
                                                        value={this.state.city}
                                                        onChange={this.onChange}
                                                        error={errors.city} />
                                                </div>
                                            </div>
                                            {/* <div Name="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>State/Province</label>
                                                    <select className="form-control select">
                                                        <option>California</option>
                                                        <option>Alaska</option>
                                                        <option>Alabama</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            
                                             <div Name="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>postal code</label>
                                                    <InputGroup
                                                        placeholder="Your postal code"
                                                        name="zipcode"
                                                        value={this.state.zipcode}
                                                        onChange={this.onChange}
                                                        error={errors.zipcode} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                <label>Phone </label>
                                            {/* <input className="form-control" type="text" /> */}
                                            <InputGroup
                                                        placeholder="Your phone"
                                                        name="phone"
                                                        value={this.state.phone}
                                                        onChange={this.onChange}
                                                        error={errors.phone} />
                                                </div>
                                            </div>
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Phone </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div> */}
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Avatar</label>
                                            <div className="profile-upload">
                                                <div className="upload-img">
                                                    <img alt="" src="assets/img/user.jpg" />
                                                </div>
                                                <div className="upload-input">
                                                    <input type="file" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="display-block">Status</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="status" id="patient_active" value="option1" checked />
                                        <label className="form-check-label" for="patient_active">
                                            Active
                          </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="status" id="patient_inactive" value="option2" />
                                        <label className="form-check-label" for="patient_inactive">
                                            Inactive
                          </label>
                                    </div>
                                </div>
                                <div className="m-t-20 text-center">
                                    <button className="btn btn-primary submit-btn">Create Patient</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Addpatient.propTypes = {
    addPatient: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addPatient })(
    withRouter(Addpatient)
);
