import mongoose from 'mongoose';
const { Decimal128 } = mongoose.Types;


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
    },
    deletedOn: {
      type: Boolean,
      default: null,
    }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
