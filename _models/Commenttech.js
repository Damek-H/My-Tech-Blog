const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blogtech = require('./Blogtech');

class Commenttech extends Model {}

Commenttech.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usertech',
        key: 'id',
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    comment_description: {
      type: DataTypes.STRING,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Blogtech',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'commenttech',
  }
);

module.exports = Commenttech;
