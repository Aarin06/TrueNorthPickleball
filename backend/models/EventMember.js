import mongoose from 'mongoose';

const eventParticipantSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  registered: {
    type: Boolean,
    default: false
  },
  deletedOn: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

export default mongoose.model('EventMember', eventParticipantSchema);
