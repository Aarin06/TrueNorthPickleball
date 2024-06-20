import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
  },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emergContactName: {
      type: String,
      required: true,
    },
    emergContactPhoneNumber: {
      type: String,
      required: true,
    },
    emergContactRelationship: {
      type: String,
      required: true,
    },
    deletedOn: {
      type: Date,
      default: null,
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
