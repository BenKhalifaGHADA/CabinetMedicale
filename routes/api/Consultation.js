const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs');



const validateConsultationInput=require('../../validation/consultation');
//Load Profile model
const Profile = require('../../models/Profile');
//Load User model
const User = require('../../models/User');
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
      }).populate('consultations','observation');
  
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
  
  router.get('/all', (req, res) => {
    Consultation.find()
      .then(consts => res.json(consts))
      .catch(err => res.status(404).json({ nopostsfound: 'No consultation found' }));
  });
  
  // @route   GET api/consultation/:id
  // @desc    Get Consultation by id
  // @access  Public
  router.get('/:id', (req, res) => {
    Consultation.findById(req.params.id)
      .then(consts => res.json(consts))
      .catch(err =>
        res.status(404).json({ nopostfound: 'No consultation found' })
      );
  });
  
   // @route   POST api/consultation/add
  // @desc    Add one consultation to doctor
  // @access  Private
  router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const medicament=req.body.ordonnance;
        const ordonnance=medicament.map(item => {
          const newOrdonnance = {
            duration:item.ordonnance.duration,
            dose:item.ordonnance.dose,
            drug:item.ordonnance.drug,
           
          };
            // Add to ordonnance array
            item.ordonnance.unshift(newOrdonnance);
            // Save
           item.save().then(item => res.json(item));
        })
     
      const newConsultation = new Consultation({
        observation: req.body.observation,
        ordonnance,
        user: req.user.id
      });
  
      newConsultation.save().then(consultation => res.json(consultation));
    }
  );



  // @route   POST api/consultation/add/id_consultation
  // @desc    Add one ordonnace to consultation
  // @access  Private
  router.post(
    '/add/:id_consultation',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateConsultationInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
    Consultation.findById(req.params.id_consultation)
        .then(consultation => {
          const newOrdonnance = {
            duration:req.body.duration,
            dose:req.body.dose,
            drug:req.body.drug,
            user: req.user.id,
          };
            // Add to ordonnance array
          consultation.ordonnance.unshift(newOrdonnance);
            // Save
          consultation.save().then(consultation => res.json(consultation));
        })
        .catch(err => res.status(404).json({ consultationnotfound: 'No consultation found' }));
    }
  );

  
// @route   DELETE api/consultation/delete/:id_consultation
// @desc    Delete consultation
// @access  Private
router.delete(
  '/delete/:id_consultation',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Consultation.findOne({ user: req.user.id }).then(consultation => {
      Consultation.findById(req.params.id_consultation)
        .then(consultation => {
          // Check for consultation owner
          if (consultation.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          consultation.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ consultationnotfound: 'No consultation found' }));
    });
  }
);
  
  // -----------------------------END CRUD consultation----------------------//
  module.exports = router;