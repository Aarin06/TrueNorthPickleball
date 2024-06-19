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
    session: {
      type: String,
      required: true,
    },
  }, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
