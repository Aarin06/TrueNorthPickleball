const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
  },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true
    },
    emergContactName: {
      type: String,
      required: true
  },
    emergPhoneNumber: {
      type: String,
      required: true,
  },
    emergContactRelationship: {
      type: String,
      required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)