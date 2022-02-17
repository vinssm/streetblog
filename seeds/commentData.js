const { Comment } = require('../models');

const commentdata =
[
  {
    "commentContent": "Very nice",
    "userId": "1",
    "recipeId": "2"
  },
  {
    "commentContent": "Cool",
    "userId": "3",
    "recipeId": "5"
  },
  {
    "commentContent": "Delicious",
    "userId": "2",
    "recipeId": "4"
  }
];

const seedComments = () => Comment.bulkCreate(commentdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedComments;

