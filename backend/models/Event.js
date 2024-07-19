import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    locked: {
      type: Boolean,
      required: true,      
    },
    cost: {
      type: Number,
      required: false
    },
    eventData: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    deletedOn: {
      type: Boolean,
      default: null,
    },
    spotsAvailable: {
      type: Number,
      required: false,
    },
    spotsTaken: {
      type: Number,
      required: false,
    },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
