const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');

User.hasMany(Recipe, {
	foreignKey : 'userId'
});

Recipe.belongsTo(User, {
	foreignKey : 'userId'
});

Comment.belongsTo(User, {
	foreignKey : 'userId'
});

Comment.belongsTo(Recipe, {
	foreignKey : 'recipeId'
});

User.hasMany(Comment, {
	foreignKey : 'userId'
});

Recipe.hasMany(Comment, {
	foreignKey : 'recipeId'
});

module.exports = { User, Recipe, Comment };