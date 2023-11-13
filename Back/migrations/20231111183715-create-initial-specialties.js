/* eslint-disable no-unused-vars */
const mongodb = require('mongodb')

const { ObjectId } = mongodb

const initialSpecialities = [
  {
    _id: new ObjectId('000000000000000000000000'),
    name: 'Clinico'
  },
  {
    _id: new ObjectId('000000000000000000000001'),
    name: 'Cardiologia'
  },
  {
    _id: new ObjectId('000000000000000000000002'),
    name: 'Cirugia'
  },
  {
    _id: new ObjectId('000000000000000000000003'),
    name: 'Ginecologia',
  },
]

module.exports = {
  async up(db, client) {
    await db.collection('specialities').insertMany(initialSpecialities)
  },

  async down(db, client) {
    await db.collection('specialities').deleteMany({
      _id: {
        $in: initialSpecialities.map((speciality) => speciality._id),
      },
    })
  },
}
