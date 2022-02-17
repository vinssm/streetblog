const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const commentRoutes = require('./comment-routes.js');


router.use('/user', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;