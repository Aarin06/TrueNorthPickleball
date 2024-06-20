import mongoose from 'mongoose';

const teamMember = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    deletedOn: {
      type: Date,
      default: null,
    }
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMember);
