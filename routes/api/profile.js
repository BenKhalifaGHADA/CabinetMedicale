const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');


const validateProfileInput = require('../../validation/profile');
const validatePatientInput = require('../../validation/patient');
const validateAppointmentInput = require('../../validation/appointment');
const validateConsultationInput=require('../../validation/consultation');
//Load Profile model
const Profile = require('../../models/Profile');
//Load User model
const User = require('../../models/User');
//Load Consultation model
const Consultation = require('../../models/Consultation');


// -----------------Get test profile--------------------//
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

//---------------Get Current User------------------------//
//@route GET api/profile
//@desc GET current users profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const errors = {};

    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('users', ['firstname', 'lastname', 'address', 'phone']);

    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(400).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
//@desc CREATE users profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.firstname) profileFields.firstname = req.body.firstname;
  if (req.body.lastname) profileFields.lastname = req.body.lastname;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.phone) profileFields.phone = req.body.phone;
  if (req.body.birthdate) profileFields.birthdate = req.body.birthdate;

  //Adresse
  profileFields.address = {};
  if (req.body.region) profileFields.address.region = req.body.region;
  if (req.body.Country) profileFields.address.Country = req.body.Country;
  if (req.body.State) profileFields.address.State = req.body.State;
  if (req.body.ZipCode) profileFields.address.ZipCode = req.body.ZipCode;

  if (req.body.bio) profileFields.bio = req.body.bio;
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
});

// -----------------------------Begin CRUD Patient----------------------//
// @access  Public
// @route   GET api/profile/patient/all
// @desc    Get all patient for one profile

router.get(
  '/patient/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const foundPatient = await Profile.findOne({ user: req.user.id });

      // const myPatient = foundPatient.patient.filter(
      //   patient => patient._id.toString() === req.params.patient_id
      // )[0];
      res.json(foundPatient.patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/profile/patient
// @desc    Add patient to profile
// @access  Private
router.post('/patient', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePatientInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newPat = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      adresse: req.body.adresse,
      gender: req.body.gender,
      assurance:req.body.assurance,
      cnam: req.body.cnam,
      profession: req.body.profession,
      phone: req.body.phone,
      zipcode: req.body.zipcode,
      state: req.body.state,
      country: req.body.country,
      Datebirth: req.body.Datebirth,
      avatar: req.body.photo,
    };

    // Add to exp array
    profile.patient.unshift(newPat);

    
  });
});

// @route   DELETE api/profile/patient/:exp_id
// @desc    Delete patient from profile
// @access  Private
router.delete(
  '/patient/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.patient
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.patient.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/patient/:patient_id
// @desc    Get patient from doctor by id
// @access  Private

router.get(
  '/patient/:patient_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const foundPatient = await Profile.findOne({ user: req.user.id });

      const myPatient = foundPatient.patient.filter(
        patient => patient._id.toString() === req.params.patient_id
      )[0];
      res.json(myPatient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   UPDATE api/profile/patient/update/:exp_id
// @desc    Update patient from profile
// @access  Private
router.put(
  '/patient/update/:patient_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // .........................................
    const { errors, isValid } = validatePatientInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const {
      firstname,
      lastname,
      email,
      adresse,
      zipcode,
      state,
      country,
      gender,
      phone,
      Datebirth,
      cnam,
      assurance,
    } = req.body;
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.patient = foundProfile.patient.map(pat => {
        if (pat._id.toString() == req.params.patient_id) {
          pat.firstname = firstname;
          pat.lastname = lastname;
          pat.email = email;
          pat.adresse = adresse;
          pat.zipcode = zipcode;
          pat.state = state;
          pat.country = country;
          pat.gender = gender;
          pat.phone = phone;
          pat.Datebirth = Datebirth;
          pat.cnam=cnam,
          pat.assurance=assurance
        }
        return pat;
      });
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    //..................................................
  }
);

// -----------------------------END CRUD Patient----------------------//

//-----------------------------BEGIN CRUD Appointment----------------//
// @access  Public
// @route   GET api/profile/patient/all
// @desc    Get all patient for one profile

router.get(
  '/appointment/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const foundRendezvous = await Profile.findOne({ user: req.user.id });
      res.json(foundRendezvous.rendezvous);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   POST api/profile/appointment
// @desc    Add appointment to profile
// @access  Private
router.post(
  '/appointment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newRendezvous = {
        date: req.body.date,
        time:req.body.time,
        patient:{
          patientId:req.body.patient.patientId,
          firstname:req.body.patient.firstname,
          lastname:req.body.patient.lastname,
        },
        typeVisite: req.body.typeVisite,
        NbreVisiteEffectuer: req.body.NbreVisiteEffectuer,
      };

      // Add to exp array
      profile.rendezvous.unshift(newRendezvous);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/appointment/:exp_id
// @desc    Delete appointment from profile
// @access  Private
router.delete(
  '/appointment/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.rendezvous
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.rendezvous.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   UPDATE api/profile/appointment/update/:exp_id
// @desc    Update apointment from profile
// @access  Private

router.put(
  '/appointment/update/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    //............................................//
    const { errors, isValid } = validateAppointmentInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    try{
      const profileFields = {};
      profileFields.user = req.user.id;
  
      // Appointment
      profileFields.rendezvous = {};
     
      if (req.body.date) profileFields.rendezvous.date = req.body.date;
      if (req.body.time) profileFields.rendezvous.time = req.body.time;
     
     
      if (req.body.typeVisite) profileFields.rendezvous.typeVisite = req.body.typeVisite;
  
        const rendezvous= await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(rendezvous);
         
      } 
      
    catch(err){
       console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
    
);
// .upload profile photo

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    //my work
    file.name = Date.now() + path.extname(file.name);

    const dir = `./client/public/uploads/${req.user.id}`;

    if (fs.existsSync(dir)) {
      console.log('Directory exists.');
    } else {
      console.log('Directory does not exist.');
      fs.mkdirSync(dir);
    }
    file.mv(`${dir}/` + file.name);
    const foundProfile = await Profile.findOne({
      user: req.user.id,
    });
    foundProfile.profilephoto = `${req.user.id}/` + file.name;
    await foundProfile.save();
    res.json(foundProfile);
    //ends here
  }
);
// .. add patient photo
router.post(
  '/patientphoto',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.files === null) {
      return res.json('default.jpg');
    }

    const file = req.files.file;
    //my work
    file.name = Date.now() + path.extname(file.name);

    const dir = `./client/public/uploads/${req.user.id}`;

    if (fs.existsSync(dir)) {
      console.log('Directory exists.');
    } else {
      console.log('Directory does not exist.');
      fs.mkdirSync(dir);
    }
    file.mv(`${dir}/` + file.name);
    const previewPath = `${req.user.id}/` + file.name;

    res.json(previewPath);
    //ends here
  }
);
//Generate PDF
router.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})

module.exports = router;
