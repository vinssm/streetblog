const sequelize = require('../config/connection');
const seedComments = require('./commentData');
const seedUsers = require('./userData');
const seedRecipe = require('./recipeData');


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');

  await seedUsers();
  console.log('--------------');

  await seedRecipe();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  process.exit(0);
};

seedAll();