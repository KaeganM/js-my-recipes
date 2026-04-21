const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const recipes = require('../../../data/recipes.json')

router.get('/', (_, response) => {
  const filtered = recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    prepTime: recipe.prepTime,
    difficulty: recipe.difficulty
  }))
  response.json(filtered)
})

router.get('/recipe/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const recipe = recipes.find(recipe => recipe.id === id)
  response.json(recipe)
  
})

router.post('/recipe/add', (request, response) => {
  const { title, image, description, ingredients, instructions, prepTime, difficulty } = request.body
  
  const newRecipe = {
    id: Math.max(...recipes.map(recipe => recipe.id)) + 1,
    title,
    image,
    description,
    ingredients,
    instructions,
    prepTime,
    difficulty
  }
  
  recipes.push(newRecipe)
  
 
  const recipesPath = path.join(__dirname, '../../../data/recipes.json')
  fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2))
  
  response.status(201).json(newRecipe)
})

module.exports = router