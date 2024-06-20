import mongoose from 'mongoose';

const waiverSchema = new mongoose.Schema({
  waiverData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Waiver', waiverSchema);
