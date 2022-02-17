const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');


router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  User.findOne({
      where: {
          id: req.params.id
      },
      attributes: { exclude: ['password'] },
      include: [
          {
              model: Recipe,
              attributes: ['id', 'title', 'ingredients', 'howto_recipe', 'category', 'created_at']
          },
          {
              model: Comment, 
              attributes: ['id', 'commentContent', 'created_at'],
              include: {
                  model: Recipe,
                  attributes: ['title']
              }
          }
      ]
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'User not found'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err);
  })
});

router.post('/login', (req, res) => {
User.findOne({
  where: {
    username: req.body.username
  }
}).then(dbUserData => {
  if (!dbUserData) {
    res.status(400).json({ message: 'User not found with that username' });
    return;
  }

  const validPassword = dbUserData.checkPassword(req.body.password);

  if (!validPassword) {
    res.status(400).json({ message: 'You entered a wrong password!' });
    return;
  }

  req.session.save(() => {
    req.session.userId = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    res.json({ user: dbUserData, message: 'Awesome! Login Success...' });
  });
});
});

router.post('/logout', (req, res) => {
if(req.session.loggedIn) {
  req.session.destroy(() => {
    res.status(204).end();
  });
}
else {
  res.status(404).end();
}
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
