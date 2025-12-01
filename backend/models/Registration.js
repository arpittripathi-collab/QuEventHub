import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },

  status: { 
    type: String, 
    enum: ['Registered', 'Pending Payment', 'Verified'], 
    default: 'Registered' 
  },
  transactionId: { type: String }, 
  registeredAt: { type: Date, default: Date.now }
});

const registrationModel = mongoose.model('Registration', registrationSchema);

export default registrationModel;