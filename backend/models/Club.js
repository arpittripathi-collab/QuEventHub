import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['technical', 'cultural', 'sports', 'arts', 'music', 'general'],
      default: 'technical',
    },
    description: { type: String },
    meeting: { type: String },
    time: { type: String },
    venue: { type: String },
    imageUrl: { type: String },

    // Auth fields for club login
    clubId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);

export default Club;
