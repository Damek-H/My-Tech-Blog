const expressSession = require('express-session');

const ensureAuthenticated = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = ensureAuthenticated;
