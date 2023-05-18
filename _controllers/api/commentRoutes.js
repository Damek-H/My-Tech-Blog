const express = require('express');
const router = express.Router();
const models = require('../../_models');
const withAuth = require('../../utils/auth');

// Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newCom = await models.Commenttech.create({
      ...req.body,
      user_id: req.session.user_id,
      include: [
        {
          model: models.Usertech,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(newCom);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
