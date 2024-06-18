const mongoose = require('mongoose')


const waiverSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    signed: {
      type: Boolean,
      required: true,
    }
});

export default mongoose.model('Waiver', waiverSchema);
