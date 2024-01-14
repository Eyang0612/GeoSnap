const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
const storeId = (req, res, next) => {
    if (req.session) {
        res.locals.userId= req.session.userId
    }
    next();
}

  module.exports = { isAuthenticated, storeId}
