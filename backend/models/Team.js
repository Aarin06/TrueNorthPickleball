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
    expirenceLevel: {
      type: String,
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

const Team =  mongoose.model('Team', teamSchema);

export default Team;
