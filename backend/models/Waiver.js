import mongoose from 'mongoose';

const waiverSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    signed: {
      type: Boolean,
      required: true,
    },
    deletedOn: {
      type: Date,
      default: null,
    }
  }, { timestamps: true });

export default mongoose.model('Waiver', waiverSchema);
