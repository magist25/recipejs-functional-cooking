// =============================
// Recipe Data
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

// ============================================
// STATE MANAGEMENT
// ============================================
let currentFilter = 'all';
let currentSort = 'none';

// ============================================
// DOM REFERENCES (ONLY DECLARED ONCE)
// ============================================
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');

// ============================================
// Create Recipe Card
// ============================================
const createRecipeCard = (recipe) => `
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

// ============================================
// Render Recipes
// ============================================
const renderRecipes = (recipesArray) => {
  recipeContainer.innerHTML = recipesArray
    .map(createRecipeCard)
    .join("");
};

// ============================================
// FILTER FUNCTIONS (Pure)
// ============================================
const filterByDifficulty = (recipes, difficulty) =>
  recipes.filter(recipe => recipe.difficulty === difficulty);

const filterByTime = (recipes, maxTime) =>
  recipes.filter(recipe => recipe.time <= maxTime);

const applyFilter = (recipes, filterType) => {
  switch(filterType) {
    case 'easy':
    case 'medium':
    case 'hard':
      return filterByDifficulty(recipes, filterType);
    case 'quick':
      return filterByTime(recipes, 30);
    case 'all':
    default:
      return recipes;
  }
};

// ============================================
// SORT FUNCTIONS (Pure)
// ============================================
const sortByName = (recipes) =>
  [...recipes].sort((a, b) => a.title.localeCompare(b.title));

const sortByTime = (recipes) =>
  [...recipes].sort((a, b) => a.time - b.time);

const applySort = (recipes, sortType) => {
  switch(sortType) {
    case 'name':
      return sortByName(recipes);
    case 'time':
      return sortByTime(recipes);
    case 'none':
    default:
      return recipes;
  }
};

// ============================================
// MAIN UPDATE FUNCTION
// ============================================
const updateDisplay = () => {
  let recipesToDisplay = recipes;

  recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
  recipesToDisplay = applySort(recipesToDisplay, currentSort);

  renderRecipes(recipesToDisplay);

  console.log(
    `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
  );
};

// ============================================
// UI HELPER
// ============================================
const updateActiveButtons = () => {
  filterButtons.forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.filter === currentFilter
    );
  });

  sortButtons.forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.sort === currentSort
    );
  });
};

// ============================================
// EVENT LISTENERS
// ============================================
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    updateActiveButtons();
    updateDisplay();
  });
});

sortButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSort = btn.dataset.sort;
    updateActiveButtons();
    updateDisplay();
  });
});

// ============================================
// INITIALIZE APP
// ============================================
updateDisplay();
