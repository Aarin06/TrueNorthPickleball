const mongoose = require('mongoose')

const teamMember = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMember);
