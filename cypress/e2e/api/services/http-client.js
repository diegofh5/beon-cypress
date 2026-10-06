function withoutTrailingSlash(url) {
  return url.replace(/\/$/, '');
}

class HttpClient {
  setApiRoot(url) {
    this.apiRoot = withoutTrailingSlash(url);
  }

  // Restful-Booker returns XML unless Accept is application/json.
  request({ method, path, body, token, failOnStatusCode = true }) {
    const headers = { Accept: 'application/json' };

    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers.Cookie = `token=${token}`;
    }

    return cy.request({
      method,
      url: `${this.apiRoot}${path}`,
      headers,
      failOnStatusCode,
      ...(body === undefined ? {} : { body }),
    });
  }
}

module.exports = { HttpClient };
