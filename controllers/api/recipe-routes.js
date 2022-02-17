const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all recipes
router.get('/', (req, res) => {
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
            model: Comment,
            attributes: ['id', 'commentContent', 'userId', 'recipeId'],
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
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get all recipes by category
router.get('/:category', (req, res) => {
Recipe.findAll({
    where: {
      category: req.params.category
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
          model: Comment,
          attributes: ['id', 'commentContent', 'userId', 'recipeId'],
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
.then(dbPostData => res.json(dbPostData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

//get one recipe
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'ingredients',
      'description',
      'category',
      'image_url'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', withAuth, (req, res) => {
  Recipe.create({
    title: req.body.title,
    ingredients: req.body.ingredients,
    description: req.body.description,
    category: req.body.category,
    image_url: req.body.image_url,
    userId: req.session.userId
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update by userId
router.put('/:id', withAuth, (req, res) => {
  Recipe.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete by userId
router.delete('/:id', withAuth, (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;