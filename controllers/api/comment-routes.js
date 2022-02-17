const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try{ 
   const commentData = await Comment.findAll({
     include: [User],
   });
   const comments = commentData.map((comment) => comment.get({ plain: true }));
 
   console.log(comments);
   
   res.render('single-post', {comments, loggedIn: req.session.loggedIn});
 } catch(err) {
     res.status(500).json(err);
 }
 });
 
 router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      commentContent: req.body.commentContent,
      recipeID: req.body.recipeID,
      userId: req.session.userId,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

 
 module.exports = router;
 