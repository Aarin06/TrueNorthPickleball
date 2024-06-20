import mongoose from 'mongoose';

const userWaiverSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    signed: {
      type: Boolean,
      required: true,
    },
    signature: {
      type: String,
      default: null,
    },
    waiverId: {
      type: String,
      required: true
    },
    checks: [{
      label: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      }
    }],
    deletedOn: {
      type: Date,
      default: null,
    }
  }, { timestamps: true });

export default mongoose.model('UserWaiver', userWaiverSchema);
