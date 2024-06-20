import mongoose from 'mongoose';

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
    },
    deletedOn: {
      type: Date,
      default: null,
    }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
