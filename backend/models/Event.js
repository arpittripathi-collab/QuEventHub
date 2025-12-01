import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  

  registrationDeadline: { type: Date, required: true },

  category: { 
    type: String, 
    enum: ['Cultural', 'Technical', 'Sports', 'Workshop'], 
    required: true 
  },

  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  
  paymentQrCode: { type: String }, 
  
  organizer: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

const eventModel = mongoose.model('Event', eventSchema);

export default eventModel;