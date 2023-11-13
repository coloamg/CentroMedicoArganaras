const express = require('express')
const bcrypt = require('bcrypt')
const Role = require('../schemas/role')

const router = express.Router()

router.get('/', getAllRols)
router.post('/', createRol)
router.put('/', updateRol)

async function getAllRols(req, res, next) {
  //console.log('getAllUsers by user ', req.user._id)
  try {
    const rols = await Role.find();
    res.send(rols)
  } catch (err) {
    next(err)
  }
}
async function createRol(req, res, next) {
  console.log('CreateRol: ', req.body)

  const rol = req.body

  try {
    const rplCreated = await Role.create({ ...rol, name: rol.name })

    res.send(rplCreated)
  } catch (err) {
    next(err)
  }
}
async function updateRol(req, res, next) {
  console.log(req.body)
  try {
    const userToUpdate = await Role.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true });
    console.log("se realizo update del rol: ", req.body._id);
    res.send(userToUpdate);
  }
  catch (ex) {
    console.log("Error", ex);
  }
}

module.exports = router
