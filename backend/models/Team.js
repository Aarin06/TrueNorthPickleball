const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: String,
        required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    playerCount: {
      type: Number,
      required: true,
    },
    locked: {
      type: Boolean,
      required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
