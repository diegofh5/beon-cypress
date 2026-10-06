const { createBookingLifecycle } = require('./services/booking-service');

describe('Booking lifecycle', () => {
  const booking = createBookingLifecycle();

  it('creates, reads, updates, and deletes a booking', () => {
    booking
      .createBooking()
      .then(() => booking.readBooking(booking.createdBooking))
      .then(() => booking.updateBooking())
      .then(() => booking.readBooking(booking.updatedBooking))
      .then(() => booking.deleteBooking())
      .then(() => booking.confirmBookingIsGone());
  });
});
