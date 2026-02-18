// ============================================
// Recipe App - Full Corrected Version
// ============================================

const RecipeApp = (() => {
  'use strict';

  // ============================================
  // PRIVATE: DATA
  // ============================================
  const recipes = [
    {
      id: 1,
      title: "Garlic Butter Pasta",
      time: 20,
      difficulty: "easy",
      description: "Simple pasta tossed in garlic butter sauce with parmesan.",
      category: "pasta",
      ingredients: [
        "200g pasta",
        "3 cloves garlic",
        "3 tbsp butter",
        "50g parmesan",
        "Salt",
        "Black pepper"
      ],
      steps: [
        "Boil salted water in a large pot",
        "Cook pasta until al dente",
        {
          text: "Prepare garlic butter",
          substeps: [
            "Melt butter in pan",
            "Add minced garlic",
            "Cook until fragrant (1-2 minutes)"
          ]
        },
        "Drain pasta and reserve 1/4 cup pasta water",
        "Toss pasta with garlic butter",
        "Add parmesan and mix well",
        "Season and serve"
      ]
    },
    {
      id: 2,
      title: "Chicken Stir Fry",
      time: 25,
      difficulty: "easy",
      description: "Quick and healthy chicken stir fry with fresh vegetables.",
      category: "stir-fry",
      ingredients: [
        "2 chicken breasts",
        "1 bell pepper",
        "1 carrot",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Garlic"
      ],
      steps: [
        "Slice chicken and vegetables",
        "Heat oil in wok",
        "Cook chicken until browned",
        "Add vegetables and stir fry",
        "Add soy sauce and cook 2 more minutes",
        "Serve hot"
      ]
    },
    {
      id: 3,
      title: "Beef Tacos",
      time: 35,
      difficulty: "medium",
      description: "Seasoned beef served in warm tortillas with toppings.",
      category: "mexican",
      ingredients: [
        "500g ground beef",
        "Taco seasoning",
        "Tortillas",
        "Lettuce",
        "Cheese",
        "Salsa"
      ],
      steps: [
        "Cook ground beef in skillet",
        {
          text: "Season the beef",
          substeps: [
            "Add taco seasoning",
            "Add 1/4 cup water",
            "Simmer 5 minutes"
          ]
        },
        "Warm tortillas",
        "Assemble tacos with toppings",
        "Serve immediately"
      ]
    },
    {
      id: 4,
      title: "Vegetable Curry",
      time: 50,
      difficulty: "medium",
      description: "Rich and creamy curry loaded with fresh vegetables.",
      category: "curry",
      ingredients: [
        "Mixed vegetables",
        "1 onion",
        "2 tbsp curry paste",
        "400ml coconut milk",
        "Oil",
        "Salt"
      ],
      steps: [
        "Heat oil in pot",
        "Cook onions until soft",
        {
          text: "Build the curry base",
          substeps: [
            "Add curry paste",
            "Cook for 1 minute",
            {
              text: "Add vegetables",
              substeps: [
                "Stir well",
                "Cook 5 minutes"
              ]
            }
          ]
        },
        "Add coconut milk",
        "Simmer 20 minutes",
        "Serve with rice"
      ]
    },
    {
      id: 5,
      title: "Grilled Salmon",
      time: 30,
      difficulty: "medium",
      description: "Perfectly grilled salmon with lemon and herbs.",
      category: "seafood",
      ingredients: [
        "2 salmon fillets",
        "1 lemon",
        "Olive oil",
        "Salt",
        "Pepper",
        "Fresh herbs"
      ],
      steps: [
        "Preheat grill",
        "Brush salmon with oil",
        "Season with salt and pepper",
        "Grill 4-5 minutes each side",
        "Squeeze lemon and garnish",
        "Serve warm"
      ]
    },
    {
      id: 6,
      title: "Beef Wellington",
      time: 90,
      difficulty: "hard",
      description: "Classic dish with tender beef wrapped in puff pastry.",
      category: "gourmet",
      ingredients: [
        "Beef tenderloin",
        "Mushrooms",
        "Puff pastry",
        "Eggs",
        "Mustard",
        "Salt & pepper"
      ],
      steps: [
        "Sear beef on all sides",
        {
          text: "Prepare mushroom duxelles",
          substeps: [
            "Finely chop mushrooms",
            "Cook until moisture evaporates",
            "Season and cool"
          ]
        },
        "Wrap beef with duxelles",
        "Cover with puff pastry",
        "Brush with egg wash",
        "Bake at 200°C for 40 minutes",
        "Rest before slicing"
      ]
    },
    {
      id: 7,
      title: "Homemade Ramen",
      time: 75,
      difficulty: "hard",
      description: "Traditional ramen with slow-cooked broth and toppings.",
      category: "soup",
      ingredients: [
        "Ramen noodles",
        "Chicken broth",
        "Soy sauce",
        "Eggs",
        "Green onions",
        "Pork slices"
      ],
      steps: [
        "Prepare broth",
        {
          text: "Cook toppings",
          substeps: [
            "Soft boil eggs",
            "Slice pork",
            "Chop green onions"
          ]
        },
        "Cook noodles separately",
        "Assemble bowl with broth and noodles",
        "Add toppings and serve"
      ]
    },
    {
      id: 8,
      title: "Chocolate Soufflé",
      time: 65,
      difficulty: "hard",
      description: "Light and airy chocolate dessert baked to perfection.",
      category: "dessert",
      ingredients: [
        "Dark chocolate",
        "Butter",
        "Eggs",
        "Sugar",
        "Flour",
        "Vanilla"
      ],
      steps: [
        "Preheat oven to 180°C",
        "Melt chocolate and butter",
        {
          text: "Prepare batter",
          substeps: [
            "Separate eggs",
            "Beat egg whites until stiff",
            "Fold whites into chocolate mixture"
          ]
        },
        "Pour into ramekins",
        "Bake 12-15 minutes",
        "Serve immediately"
      ]
    }
  ];

  // ============================================
  // PRIVATE: STATE
  // ============================================
  let currentFilter = 'all';
  let currentSort = 'none';
  let searchQuery = '';
  let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
  let debounceTimer;

  // ============================================
  // PRIVATE: DOM REFERENCES
  // ============================================
  const recipeContainer = document.querySelector('#recipe-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortButtons = document.querySelectorAll('.sort-btn');
  const searchInput = document.querySelector('#search-input');
  const clearSearchBtn = document.querySelector('#clear-search');
  const recipeCountDisplay = document.querySelector('#recipe-count');

  // ============================================
  // PRIVATE: RENDER & STEPS
  // ============================================
  const renderSteps = (steps, level = 0) => {
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    let html = `<ol class="${listClass}">`;
    steps.forEach(step => {
      if (typeof step === 'string') {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.text}`;
        if (step.substeps) html += renderSteps(step.substeps, level + 1);
        html += `</li>`;
      }
    });
    html += `</ol>`;
    return html;
  };

  const createStepsHTML = steps => steps?.length ? renderSteps(steps) : '<p>No steps available</p>';

  const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>

      <div class="card-actions">
        <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">📋 Show Steps</button>
        <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">🥗 Show Ingredients</button>
        <button class="favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}" data-recipe-id="${recipe.id}">
          ${favorites.includes(recipe.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="ingredients-container" data-recipe-id="${recipe.id}">
        <h4>Ingredients:</h4>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="steps-container" data-recipe-id="${recipe.id}">
        <h4>Cooking Steps:</h4>
        ${createStepsHTML(recipe.steps)}
      </div>
    </div>
  `;

  const renderRecipes = arr => {
    if (recipeContainer) recipeContainer.innerHTML = arr.map(createRecipeCard).join('');
  };

  // ============================================
  // PRIVATE: FILTERS & SORTS
  // ============================================
  const filterByDifficulty = (arr, level) => arr.filter(r => r.difficulty === level);
  const filterByTime = (arr, maxTime) => arr.filter(r => r.time <= maxTime);
  const filterBySearch = (arr, query) => {
    if (!query.trim()) return arr;
    const q = query.toLowerCase();
    return arr.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );
  };
  const filterFavorites = arr => arr.filter(r => favorites.includes(r.id));

  const applyFilter = (arr, type) => {
    switch(type) {
      case 'easy': return filterByDifficulty(arr, 'easy');
      case 'medium': return filterByDifficulty(arr, 'medium');
      case 'hard': return filterByDifficulty(arr, 'hard');
      case 'quick': return filterByTime(arr, 30);
      case 'favorites': return filterFavorites(arr);
      default: return arr;
    }
  };

  const sortByName = arr => [...arr].sort((a,b) => a.title.localeCompare(b.title));
  const sortByTime = arr => [...arr].sort((a,b) => a.time - b.time);
  const applySort = (arr, type) => {
    if (type === 'name') return sortByName(arr);
    if (type === 'time') return sortByTime(arr);
    return arr;
  };

  // ============================================
  // PRIVATE: DISPLAY & COUNTER
  // ============================================
  const updateRecipeCounter = (showing, total) => {
    if (recipeCountDisplay) recipeCountDisplay.textContent = `Showing ${showing} of ${total} recipes`;
  };

  const updateDisplay = () => {
    let arr = recipes;
    arr = filterBySearch(arr, searchQuery);
    arr = applyFilter(arr, currentFilter);
    arr = applySort(arr, currentSort);
    updateRecipeCounter(arr.length, recipes.length);
    renderRecipes(arr);
    updateActiveButtons();
  };

  // ============================================
  // PRIVATE: FAVORITES
  // ============================================
  const saveFavorites = () => localStorage.setItem('recipeFavorites', JSON.stringify(favorites));

  const toggleFavorite = id => {
    id = parseInt(id);
    favorites.includes(id)
      ? favorites = favorites.filter(f => f !== id)
      : favorites.push(id);
    saveFavorites();
    updateDisplay();
  };

  // ============================================
  // PRIVATE: EVENT HANDLERS
  // ============================================
  const handleToggleClick = e => {
    if (!e.target.classList.contains('toggle-btn')) return;
    const btn = e.target;
    const rid = btn.dataset.recipeId;
    const type = btn.dataset.toggle;
    const containerClass = type === 'steps' ? 'steps-container' : 'ingredients-container';
    const container = document.querySelector(`.${containerClass}[data-recipe-id="${rid}"]`);
    if (container) {
      container.classList.toggle('visible');
      const visible = container.classList.contains('visible');
      btn.textContent = type === 'steps'
        ? (visible ? '📋 Hide Steps' : '📋 Show Steps')
        : (visible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients');
    }
  };

  const handleFilterClick = e => {
    currentFilter = e.target.dataset.filter;
    updateDisplay();
  };

  const handleSortClick = e => {
    currentSort = e.target.dataset.sort;
    updateDisplay();
  };

  const handleSearchInput = e => {
    const query = e.target.value;
    if (clearSearchBtn) clearSearchBtn.style.display = query ? 'block' : 'none';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = query;
      updateDisplay();
    }, 300);
  };

  const handleClearSearch = () => {
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    updateDisplay();
  };

  const handleFavoriteClick = e => {
    if (e.target.classList.contains('favorite-btn')) toggleFavorite(e.target.dataset.recipeId);
  };

  // ============================================
  // PRIVATE: EVENT LISTENERS
  // ============================================
  const setupEventListeners = () => {
    filterButtons.forEach(b => b.addEventListener('click', handleFilterClick));
    sortButtons.forEach(b => b.addEventListener('click', handleSortClick));
    recipeContainer.addEventListener('click', handleToggleClick);
    recipeContainer.addEventListener('click', handleFavoriteClick);
    if (searchInput) searchInput.addEventListener('input', handleSearchInput);
    if (clearSearchBtn) clearSearchBtn.addEventListener('click', handleClearSearch);
    console.log('Event listeners attached!');
  };

  // ============================================
  // INIT
  // ============================================
  const init = () => {
    console.log('RecipeApp initializing...');
    setupEventListeners();
    updateDisplay();
    console.log('RecipeApp ready!');
  };

  return { init };
})();

// Start the app
RecipeApp.init();
