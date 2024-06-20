import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
    status: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    deletedOn: {
      type: Date,
      default: null,
    }
  }, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
