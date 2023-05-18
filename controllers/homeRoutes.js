const router = require('express').Router();
const { Usertech, Commenttech, Blogtech } = require('../_models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogtech.findAll({
      include: [
        {
          model: Usertech,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((b) => b.get({ plain: true }));

    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
    });
    let expressVisitorCounter = req.session.counters;
    console.log(expressVisitorCounter);
    let visitorCounterValues = Object.values(expressVisitorCounter);
    let visitorCounterKeys = Object.keys(expressVisitorCounter);

    let numberOfDailyUniqueSessions;
    let numberOfDailyUniqueIpAddresses;
    let numberOfDailyRequests;

    for (let i = 0; i < visitorCounterKeys.length; i++) {
      if (visitorCounterKeys[i].split('-')[1] === 'sessions') {
        numberOfDailyUniqueSessions = visitorCounterValues[i];
      } else if (visitorCounterKeys[i].split('-')[1] === 'ip') {
        numberOfDailyUniqueIpAddresses = visitorCounterValues[i];
      } else if (visitorCounterKeys[i].split('-')[1] === 'requests') {
        numberOfDailyRequests = visitorCounterValues[i];
      }
    }

    console.log(`values:  ${visitorCounterValues}`);
    console.log(`keys:  ${visitorCounterKeys}`);

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
      countVisit: req.session.countVisit,
      numberOfDailyRequests: numberOfDailyRequests,
      numberOfDailyUniqueIpAddresses: numberOfDailyUniqueIpAddresses,
      numberOfDailyUniqueSessions: numberOfDailyUniqueSessions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogtech.findByPk(req.params.id, {
      include: [
        {
          model: Usertech,
        },
        {
          model: Commenttech,
          include: [Usertech],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await Usertech.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogtech }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('addBlog', {
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Blogtech.findByPk(req.params.id);
    if (postData) {
      const blog = postData.get({ plain: true });
      res.render('editBlog', { blog, loggedIn: req.session.loggedIn });
    } else res.status(404).end();
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;