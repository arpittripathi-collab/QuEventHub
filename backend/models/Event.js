import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, default: 'To be announced' },
    venue: { type: String, default: 'Campus' },
    registrationDeadline: { type: Date, required: true },
    category: {
      type: String,
      enum: ['Cultural', 'Technical', 'Sports', 'Workshop'],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    paymentQrCode: { type: String },
    imageUrl: { type: String },
    capacity: { type: Number, default: 0 },
    organizer: { type: String, required: true },

    // Owning club (optional for legacy events)
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  },
  { timestamps: true }
);

const eventModel = mongoose.model('Event', eventSchema);

export default eventModel;