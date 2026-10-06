const { HttpClient } = require('./http-client');

class BookingService {
  constructor() {
    this.http = new HttpClient();
    this.token = undefined;
    this.bookingId = undefined;
    this.createdBooking = undefined;
    this.updatedBooking = undefined;
  }

  loadBookings() {
    cy.fixture('api/fixtures/booking.json').then((fixture) => {
      this.createdBooking = fixture.create;
      this.updatedBooking = fixture.update;
    });
  }

  authenticate() {
    cy.env(['apiUrl', 'apiUsername', 'apiPassword']).then(
      ({ apiUrl, apiUsername, apiPassword }) => {
        this.http.setApiRoot(apiUrl);

        return this.http.request({
          method: 'POST',
          path: '/auth',
          body: { username: apiUsername, password: apiPassword },
        });
      },
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a('string');
      expect(response.body.token.length).to.be.greaterThan(0);
      this.token = response.body.token;
    });
  }

  createBooking() {
    return this.http
      .request({ method: 'POST', path: '/booking', body: this.createdBooking })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingid).to.be.a('number');
        expect(response.body.booking).to.deep.equal(this.createdBooking);
        this.bookingId = response.body.bookingid;
      });
  }

  readBooking(expectedBooking) {
    return this.http.request({ method: 'GET', path: `/booking/${this.bookingId}` }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(expectedBooking);
    });
  }

  updateBooking() {
    return this.http
      .request({
        method: 'PUT',
        path: `/booking/${this.bookingId}`,
        token: this.token,
        body: this.updatedBooking,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(this.updatedBooking);
      });
  }

  deleteBooking() {
    return this.http
      .request({
        method: 'DELETE',
        path: `/booking/${this.bookingId}`,
        token: this.token,
      })
      .then((response) => {
        expect(response.status).to.eq(201);
      });
  }

  confirmBookingIsGone() {
    return this.http
      .request({
        method: 'GET',
        path: `/booking/${this.bookingId}`,
        failOnStatusCode: false,
      })
      .then((response) => {
        expect(response.status).to.eq(404);
        this.bookingId = undefined;
      });
  }

  cleanup() {
    if (this.bookingId === undefined || !this.token) {
      return;
    }

    this.http.request({
      method: 'DELETE',
      path: `/booking/${this.bookingId}`,
      token: this.token,
      failOnStatusCode: false,
    });
  }
}

function createBookingLifecycle() {
  const booking = new BookingService();

  before(() => {
    booking.loadBookings();
    booking.authenticate();
  });

  after(() => {
    booking.cleanup();
  });

  return booking;
}

module.exports = { createBookingLifecycle };
