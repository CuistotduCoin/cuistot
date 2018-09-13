export default `mutation recreateBooking($booking: BookingInput!) {
  recreateBooking(booking: $booking) {
    message
    errors {
      message
    }
  }
}`;
