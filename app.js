// =============================
// Recipe Data (Static for Part 1)
// =============================
const recipes = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    time: 20,
    difficulty: "easy",
    description: "Simple pasta tossed in garlic butter sauce with parmesan.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Chicken Stir Fry",
    time: 25,
    difficulty: "easy",
    description: "Quick and healthy chicken stir fry with fresh vegetables.",
    category: "stir-fry"
  },
  {
    id: 3,
    title: "Beef Tacos",
    time: 35,
    difficulty: "medium",
    description: "Seasoned beef served in warm tortillas with toppings.",
    category: "mexican"
  },
  {
    id: 4,
    title: "Vegetable Curry",
    time: 50,
    difficulty: "medium",
    description: "Rich and creamy curry loaded with fresh vegetables.",
    category: "curry"
  },
  {
    id: 5,
    title: "Grilled Salmon",
    time: 30,
    difficulty: "medium",
    description: "Perfectly grilled salmon with lemon and herbs.",
    category: "seafood"
  },
  {
    id: 6,
    title: "Beef Wellington",
    time: 90,
    difficulty: "hard",
    description: "Classic dish with tender beef wrapped in puff pastry.",
    category: "gourmet"
  },
  {
    id: 7,
    title: "Homemade Ramen",
    time: 75,
    difficulty: "hard",
    description: "Traditional ramen with slow-cooked broth and toppings.",
    category: "soup"
  },
  {
    id: 8,
    title: "Chocolate Soufflé",
    time: 65,
    difficulty: "hard",
    description: "Light and airy chocolate dessert baked to perfection.",
    category: "dessert"
  }
];

// =============================
// DOM Selection
// =============================
const recipeContainer = document.querySelector("#recipe-container");

// =============================
// Create Recipe Card
// =============================
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// =============================
// Render Recipes
// =============================
const renderRecipes = (recipesArray) => {
  const recipesHTML = recipesArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipesHTML;
};

// =============================
// Initialize App
// =============================
renderRecipes(recipes);