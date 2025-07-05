class ExpressError extends Error {
  constructor(statsCode, message) {
    super();
    this.statsCode = statsCode;
    this.message = message;
  }
}

module.exports = ExpressError;
