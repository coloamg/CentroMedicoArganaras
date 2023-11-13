const express = require('express')
const bcrypt = require('bcrypt')
const Speciality = require('../schemas/speciality')

const router = express.Router()

router.get('/', getAllSpecialities)
router.post('/', createSpeciality)
router.put('/', updateSpeciality)

async function getAllSpecialities(req, res, next) {
    try {
      const specialities = await Speciality.find();
      res.send(specialities)
    } catch (err) {
      next(err)
    }
  }
  async function createSpeciality(req, res, next) {
    console.log('CreateSpeciality: ', req.body)
  
    const speciality = req.body
  
    try {
      const speciality = await Speciality.create({ ...speciality, name: speciality.name })
  
      res.send(speciality)
    } catch (err) {
      next(err)
    }
  }
  async function updateSpeciality(req, res, next) {
    console.log(req.body)
    try {
      const specialityToUpdate = await Speciality.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true });
      console.log("se realizo update de la especialidad: ", req.body._id);
      res.send(specialityToUpdate);
    }
    catch (ex) {
      console.log("Error", ex);
    }
  }
  
  module.exports = router