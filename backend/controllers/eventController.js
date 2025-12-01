import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const getEvents = async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category) {
      query.category = category;
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { eventId, transactionId } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    const existingReg = await Registration.findOne({
      user: userId,
      event: eventId,
    });
    if (existingReg) {
      return res
        .status(400)
        .json({ success: false, message: 'Already registered' });
    }

    // Free event: directly register
    if (!event.isPaid) {
      await Registration.create({
        user: userId,
        event: eventId,
        status: 'Registered',
      });

      return res.status(200).json({
        success: true,
        message: 'Successfully registered for free event!',
      });
    }

    // Paid event but no transaction yet: send payment info
    if (event.isPaid && !transactionId) {
      return res.status(200).json({
        success: true,
        requiresPayment: true,
        amount: event.price,
        qrCodeUrl: event.paymentQrCode,
        message: 'Payment required. Please scan QR and submit transaction ID.',
      });
    }

    // Paid event with transaction ID: create pending registration
    if (event.isPaid && transactionId) {
      await Registration.create({
        user: userId,
        event: eventId,
        transactionId,
        status: 'Pending Payment',
      });

      return res.status(200).json({
        success: true,
        message: 'Registration submitted! Payment verification pending.',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.find({ user: userId })
      .populate('event', 'title date category isPaid organizer')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error fetching my events',
    });
  }
};
