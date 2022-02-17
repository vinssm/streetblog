const router = require('express').Router();
const { Op } = require('sequelize');
const { Recipe, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  console.log(req.session)
  Recipe.findAll({
      where: {
        id: {
          [Op.between]: [1,8]
        }
      },
      attributes: [
          'id',
          'title',
          'ingredients',
          'description',
          'category',
          'image_url'
      ],
      order: [['created_at', 'DESC']], 
      include: [
          {
            model: User,
            attributes: ['username']
          }
      ]
  })
      .then(dbPostData => {
        const recipes = dbPostData.map(recipe => recipe.get({ plain: true }));
        res.render('homepage', {
          recipes,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// find all recipes
router.get('/recipes', (req, res) => {
console.log(req.session)
Recipe.findAll({
    attributes: [
        'id',
        'title',
        'ingredients',
          'description',
        'category',
        'image_url'
    ],
    order: [['created_at', 'DESC']], 
    include: [
        {
          model: User,
          attributes: ['username']
        }
    ]
})
    .then(dbPostData => {
      const recipes = dbPostData.map(recipe => recipe.get({ plain: true }));
      res.render('category', {
        recipes,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/recipes/:id', (req,res) => {
Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'category',
      'image_url',
      'created_at',
      'description',
      'ingredients'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'commentComment', 'userId', 'recipeId', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
})
.then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    const recipe = dbPostData.get({ plain: true });
    res.render('single-recipe', {
      recipe,
      loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})

router.get('/recipes/category/:category', (req, res) => {
console.log(req.params.category)
Recipe.findAll({
    where: {
      category: req.params.category
    },
    attributes: [
        'id',
        'title',
        'category',
        'image_url'
    ],
    order: [['created_at', 'DESC']], 
    include: [
        {
          model: User,
          attributes: ['username']
        }
    ]
})
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Category Post not found' });
        return;
      }
      const recipes = dbPostData.map(recipe => recipe.get({ plain: true }));
      res.render('category', {
        recipes,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login 
router.get('/login', (req, res) => {
if (req.session.loggedIn) {
  res.redirect('/');
  return;
}
res.render('login');
});

//Signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

//Create Recipe
router.get('/new-post', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('new-post');
});

module.exports = router;
