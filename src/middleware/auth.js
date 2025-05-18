const authCheck = (req, res, next) => {
  const token = "xyz";
  const authenticated = token === "xopopopyz";
  if (!authenticated) {
    res.status(401).send("unauthenticated created admin");
  } else {
    next();
  }
};

const authUserCheck = (req, res, next) => {
  const token = "xyz";
  const authenticated = token === "xopopopyz";
  if (!authenticated) {
    res.status(401).send("unauthenticated created user");
  } else {
    next();
  }
};

module.exports = { authCheck, authUserCheck };
