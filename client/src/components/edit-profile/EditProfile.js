import React, { useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  createProfile,
  getCurrentProfile,
  uploadPhoto,
} from '../../actions/profileActions';

// import Moment from 'react-moment';

const EditProfile = ({
  auth: { user },
  profile: { profile },
  errors,
  history,
  createProfile,
  uploadPhoto,
}) => {
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: profile ? profile.handle : '',
    firstname: profile ? profile.firstname : '',
    lastname: profile ? profile.lastname : '',
    gender: profile ? profile.gender : '',
    birthdate: profile ? profile.birthdate : '',
    phone: profile ? profile.phone : '',
    region: profile ? profile.region : '',
    State: profile ? profile.State : '',
    Country: profile ? profile.Country : '',
    ZipCode: profile ? profile.ZipCode : '',
    bio: profile ? profile.bio : '',
    twitter: profile ? profile.twitter : '',
    facebook: profile ? profile.facebook : '',
    linkedin: profile ? profile.linkedin : '',
    youtube: profile ? profile.youtube : '',
    instagram: profile ? profile.instagram : '',
    email: '',
    // errors: {},
  });

  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('/default.jpg');

  const {
    handle,
    firstname,
    lastname,
    gender,
    birthdate,
    phone,
    region,
    State,
    Country,
    ZipCode,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    email,
    displaySocialInputs,
    // errors,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeFile = e => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const onSubmit = async e => {
    e.preventDefault();

    const profileData = {
      handle,
      firstname,
      lastname,
      birthdate,
      gender,
      phone,
      region,
      Country,
      State,
      ZipCode,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      email,
    };

    await createProfile(profileData, history);
    const formData = new FormData();
    formData.append('file', file);
    uploadPhoto(formData);
  };

  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder='Twitter Profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={twitter}
          onChange={onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder='Facebook Page URL'
          name='facebook'
          icon='fab fa-facebook'
          value={facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder='Linkedin Profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder='YouTube Channel URL'
          name='youtube'
          icon='fab fa-youtube'
          value={youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder='Instagram Page URL'
          name='instagram'
          icon='fab fa-instagram'
          value={instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }

  // Select options for gender
  const options = [
    { label: '* Your gender', value: '' },
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
  ];

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <h4 className='page-title'>Edit Profile</h4>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='card-box'>
            <h3 className='card-title'>Basic Informations</h3>
            <div className='row'>
              <div className='col-md-12'>
                <div className='profile-img-wrap'>
                  <img
                    className='inline-block'
                    src={
                      profile && preview === '/default.jpg'
                        ? `/${profile.profilephoto}`
                        : preview
                    }
                    alt={user.name}
                  />
                  <div className='fileupload btn'>
                    <span className='btn-text'>edit</span>
                    <input className='upload' type='file' onChange={onChangeFile} />
                  </div>
                </div>
                <div className='profile-basic'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>Firstname</label>
                        <InputGroup
                          placeholder='Your firstname'
                          name='firstname'
                          value={firstname}
                          onChange={onChange}
                          error={errors.firstname}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>Lastname</label>
                        <InputGroup
                          placeholder='Your lastname'
                          name='lastname'
                          value={lastname}
                          onChange={onChange}
                          error={errors.lastname}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group form-focus'>
                        <label className='focus-label'>Birth Date</label>
                        <div className='cal-icon'>
                          <InputGroup
                            placeholder='Your birth Date'
                            name='birthdate'
                            value={birthdate}
                            onChange={onChange}
                            error={errors.birthdate}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group form-focus select-focus'>
                        <label className='focus-label'>Gendar</label>
                        <SelectListGroup
                          placeholder='Gender'
                          name='gender'
                          value={gender}
                          onChange={onChange}
                          options={options}
                          error={errors.gender}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-box'>
            <h3 className='card-title'>Account Informations</h3>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Username</label>
                  <InputGroup
                    placeholder='Your username'
                    name='handle'
                    value={handle}
                    onChange={onChange}
                    error={errors.handle}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Email</label>
                  <InputGroup
                    placeholder='Your username'
                    name='email'
                    value={user.email}
                    onChange={onChange}
                    error={errors.email}
                    disabled='disabled'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='card-box'>
            <h3 className='card-title'>Contact Informations</h3>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Address</label>
                  {/* <input type="text" className="form-control floating" value="New York"/> */}
                  <InputGroup
                    placeholder='Your state'
                    name='region'
                    value={region}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>State</label>
                  {/* <input type="text" className="form-control floating" value="New York"/> */}
                  <InputGroup
                    placeholder='Your state'
                    name='State'
                    value={State}
                    onChange={onChange}
                    error={errors.State}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Country</label>
                  {/* <input type="text" className="form-control floating" value="United States"/> */}
                  <InputGroup
                    placeholder='Your Country'
                    name='Country'
                    value={Country}
                    onChange={onChange}
                    error={errors.Country}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Pin Code</label>
                  {/* <input type="text" className="form-control floating" value="10523"/> */}
                  <InputGroup
                    placeholder='Your Zip code'
                    name='ZipCode'
                    value={ZipCode}
                    onChange={onChange}
                    error={errors.ZipCode}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group form-focus'>
                  <label className='focus-label'>Phone Number</label>
                  {/* <input type="text" className="form-control floating" value="631-889-3206"/> */}
                  <InputGroup
                    placeholder='Your Number Phone'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='card-box'>
            <h3 className='card-title'>Social Network</h3>
            <div className='row'>
              <div className='col-md-12'>
                <div className='mb-3'>
                  <button
                    type='button'
                    onClick={() => {
                      setFormData({
                        ...formData,
                        displaySocialInputs: !displaySocialInputs,
                      });
                    }}
                    className='btn btn-light'>
                    Add Social Network Links
                  </button>
                  <span className='text-muted'>Optional</span>
                </div>
                {socialInputs}
              </div>
            </div>
          </div>

          <div className='card-box'>
            <h3 className='card-title'>Description</h3>
            <div className='row'>
              <div className='col-md-12'>
                <TextAreaFieldGroup
                  placeholder='Short Bio'
                  name='bio'
                  value={bio}
                  onChange={onChange}
                  error={errors.bio}
                  info='Tell us a little about yourself'
                />
              </div>
            </div>
          </div>

          <div className='text-center m-t-20'>
            <button className='btn btn-primary submit-btn' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadPhoto,
})(withRouter(EditProfile));
