const { User } = require('../models');

const userdata =
[
  {
    "username": "Vinss",
    "password": "Vinss123"
  },
  {
    "username": "vallab",
    "password": "Vallab123"
  },
  {
    "username": "Anu",
    "password": "Anu12345"
  }
];

const seedUsers = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;

