const { Recipe } = require('../models');

const recipedata =
[
  {
    "title": "Chicken Recipe",
    "image_url": "http://google.us",
    "ingredients": "1 tablespoon extra-virgin olive oil, cup white wine, garlic, 1pound chicken",
    "description": "Heat the oil in a pan in medium heat. cut chicken and fry in hot oil",
    "category": "Appetizer",
    "userId": 1
  },
  {
    "title": "Ginger Chicken Recipe",
    "image_url": "http://google.com",
    "ingredients": "1 tablespoon extra-virgin olive oil, cup white wine, garlic, 1pound chicken",
    "description": "Heat the oil in a pan in medium heat. cut chicken and fry in hot oil",
    "category": "Entree",
    "userId": 2
  },
  {
    "title": "Omlette",
    "image_url": "http://google.in",
    "ingredients": "1 tablespoon extra-virgin olive oil, add eggs, garlic",
    "description": "Heat the oil in a pan in medium heat. cut chicken and fry",
    "category": "Breakfast",
    "userId": 3
  },
  {
    "title": "Icecream",
    "image_url": "http://google.uk",
    "ingredients": "Icecream",
    "description": "Icecream",
    "category": "Dessert",
    "userId": 4
  }
];

const seedRecipe = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipe;