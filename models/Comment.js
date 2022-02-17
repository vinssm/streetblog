const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

  Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,     
      primaryKey: true,
      autoIncrement: true
    },
    commentContent: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      len: [1]
    },    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    }, 
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'id'
      },
    }, 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;