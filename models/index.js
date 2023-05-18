const Usertech = require('./Usertech');
const Blogtech = require('./Blogtech');
const Commenttech = require('./Commenttech');

Usertech.hasMany(Blogtech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blogtech.belongsTo(Usertech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blogtech.hasMany(Commenttech, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Commenttech.belongsTo(Usertech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { Usertech, Blogtech, Commenttech };
