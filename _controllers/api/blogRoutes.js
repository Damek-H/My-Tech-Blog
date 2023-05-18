const express = require('express');
const router = express.Router();
const models = require('../../_models');
const withAuth = require('../../utils/auth');

// Create a blog-post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await models.Blogtech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog-post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await models.Blogtech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a blog-post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await models.Blogtech.update(
      {
        title: req.body.title,
        description: req.body.blogContent,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!blogData) {
      res.status(404).json({
        message: 'No post found with this id',
      });
      return;
    }

    res.json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
