const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    payment: {
      type: String,
      required: true,
    },
    expirenceLevel: {
      type: String,
      required: true,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
