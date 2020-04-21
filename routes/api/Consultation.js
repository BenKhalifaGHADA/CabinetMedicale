const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs');

const validateConsultationInput = require('../../validation/consultation');
const validateOrdonnanceInput = require('../../validation/ordonnance');

//Load Profile model
const Profile = require('../../models/Profile');

//Load Consultation model
const Consultation = require('../../models/Consultation');
// -----------------------------Begin CRUD consultation----------------------//
//@route GET api/
//@desc GET current consultation
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const errors = {};

    const consultation = await Profile.findOne({
      user: req.user.id,
    }).populate('consultations', 'observation');

    if (!consultation) {
      errors.noprofile = 'There is no consultation for this user';
      return res.status(400).json(errors);
    }
    res.json(consultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route get api/consultation/all
//@desc Get all consultation
//@access Private

router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundConsultation = await Consultation.find({ user: req.user.id });
    res.json(foundConsultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/consultation/:id
// @desc    Get Consultation by id consultation
// @access  Public
router.get('/:id', (req, res) => {
  Consultation.findById(req.params.id)
    .then((consts) => res.json(consts))
    .catch((err) => res.status(404).json({ nopostfound: 'No consultation found' }));
});

// @route   GET api/consultation/:idconsultation
// @desc    Get Consultation by id consulrartio
// @access  Public
// router.get('/:id', (req, res) => {
//   Consultation.find({ _id: req.params.id })
//     .then(consts => res.json(consts))
//     .catch(err =>
//       res.status(404).json({ nopostfound: 'No consultation found' })
//     );
// });

// @route   GET api/consultation/patient/:id
// @desc    Get Consultation by id patient
// @access  Public
router.get('/patient/:id', (req, res) => {
  Consultation.find({ patientId: req.params.id })
    .then((consts) => res.json(consts))
    .catch((err) => res.status(404).json({ nopostfound: 'No consultation found' }));
});

// @route   POST api/consultation/add
// @desc    Add one consultation to doctor
// @access  Private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateConsultationInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  const newConsultation = new Consultation({
    patientId: req.body.patientId,
    observation: req.body.observation,
    // ordonnance:[...req.body.ordonnance],
    user: req.user.id,
  });

  newConsultation.save().then((consultation) => res.json(consultation));
});

// @route   DELETE api/consultation/delete/:id_consultation
// @desc    Delete consultation
// @access  Private
router.delete(
  '/delete/:id_consultation',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Consultation.findOne({ user: req.user.id }).then((consultation) => {
      Consultation.findById(req.params.id_consultation)
        .then((consultation) => {
          // Check for consultation owner
          if (consultation.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' });
          }

          // Delete
          consultation.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ consultationnotfound: 'No consultation found' })
        );
    });
  }
);

// -----------------------------END CRUD consultation----------------------//

//------------------------------Begin CRUD PRESCRIPTION------------------//

// @route   POST api/consultation/add/id_consultation
// @desc    Create ordonnance
// @access  Private
router.post(
  '/add/:id_consultation',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrdonnanceInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Consultation.findById(req.params.id_consultation)
      .then((consultation) => {
        const newOrdonnance = {
          duration: req.body.duration,
          dose: req.body.dose,
          drug: req.body.drug,
        };

        // Add to ordonnance array
        consultation.ordonnance.unshift(newOrdonnance);

        // Save
        consultation.save().then((consultation) => res.json(consultation));
      })
      .catch((err) =>
        res.status(404).json({ consultationnotfound: 'No consultation found' })
      );
  }
);

// @route   DELETE api/consultation/deleteOrdonnance/:ord_id
// @desc    Delete ordonnance from profile
// @access  Private
router.put(
  '/deleteOrdon/:cons_id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Consultation.findById(req.params.cons_id)
      .then((consultation) => {
        // Get remove index

        const updatedConsult = consultation.ordonnance.filter(
          (item) => item._id != req.body.id
        );
        consultation.ordonnance = [...updatedConsult];
        // Save
        consultation.save().then((consultation) => res.json(consultation));
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.put(
  '/deleteOrdonnance', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.id);
    Consultation.findById(req.body.id)
      .then((consultation) => {
        consultation.ordonnance = [];
        console.log('after change', consultation.ordonnance);
        consultation.save().then((consultation) => res.json(consultation));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/consultation/ordonnance/:id
// @desc    Get ordonnance by id consultation
// @access  Public
router.get('/ordonnance/:id', (req, res) => {
  Consultation.findById(req.params.id)
    .then((consts) => res.json(consts.ordonnance))
    .catch((err) => res.status(404).json({ nopostfound: 'No consultation found' }));
});
//-----------------------------End CRUD PRESCRIPTION--------------------//
module.exports = router;
