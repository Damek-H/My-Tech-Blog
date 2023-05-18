const database = require('../config/connection');
const { UserTech, CommentTech, BlogTech } = require('../_models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const populateDatabase = async () => {
  await database.sync({ force: true });

  const users = await UserTech.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await BlogTech.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comments = await CommentTech.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

populateDatabase();
