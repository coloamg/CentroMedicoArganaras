const mongoose = require('mongoose')

const { Schema } = mongoose

const specialitySchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
})

const Speciality = mongoose.model('Speciality', specialitySchema)

module.exports = Speciality
