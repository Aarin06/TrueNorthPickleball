const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    paymentId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    }
});

export default mongoose.model('Payment', paymentSchema);
