const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const validateProfileInput=require('../../validation/profile');
//Load Profile model
const Profile=require('../../models/Profile');
//Load User model
const User=require('../../models/User');

// -----------------Get test profile--------------------//
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


//---------------Get Current User------------------------//
//@route GET api/profile
//@desc GET current users profile
//@access Private
router.get('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try {
        const errors={};
        
        const profile = await Profile.findOne({
          user: req.user.id,
        }).populate('users', ['firstname', 'lastname', 'address', 'phone']);
    
        if (!profile) {
          errors.noprofile='There is no profile for this user';
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
router.post('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
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
    if (req.body.firstname) profileFields.firstname=req.body.firstname;
    if (req.body.lastname) profileFields.lastname=req.body.lastname;
    if (req.body.gender) profileFields.gender=req.body.gender;
    if (req.body.birthdate) profileFields.birthdate=req.body.birthdate;
    if (req.body.phone) profileFields.phone=req.body.phone;
    
    //Adresse
    profileFields.address = {};
    if (req.body.region) profileFields.address.region = req.body.region
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
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports=router;