// ============================================
// Recipe App - Part 3 (IIFE + Recursion + Toggle)
// ============================================

const RecipeApp = (() => {

    // ============================================
    // PRIVATE: DATA (Updated with ingredients + steps)
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

    // ============================================
    // PRIVATE: DOM REFERENCES
    // ============================================

    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // ============================================
    // PRIVATE: RECURSIVE STEPS RENDERING
    // ============================================

    const renderSteps = (steps, level = 0) => {
        const listClass = level === 0 ? 'steps-list' : 'substeps-list';
        let html = `<ol class="${listClass}">`;

        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                if (step.substeps && step.substeps.length > 0) {
                    html += renderSteps(step.substeps, level + 1);
                }
                html += `</li>`;
            }
        });

        html += `</ol>`;
        return html;
    };

    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) {
            return '<p>No steps available</p>';
        }
        return renderSteps(steps);
    };

    // ============================================
    // PRIVATE: CARD TEMPLATE
    // ============================================

    const createRecipeCard = (recipe) => `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>

            <div class="card-actions">
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                    📋 Show Steps
                </button>
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                    🥗 Show Ingredients
                </button>
            </div>

            <div class="ingredients-container" data-recipe-id="${recipe.id}">
                <h4>Ingredients:</h4>
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>

            <div class="steps-container" data-recipe-id="${recipe.id}">
                <h4>Cooking Steps:</h4>
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>
    `;

    // ============================================
    // PRIVATE: FILTER & SORT (UNCHANGED)
    // ============================================

    const filterByDifficulty = (recipes, difficulty) =>
        recipes.filter(r => r.difficulty === difficulty);

    const filterByTime = (recipes, maxTime) =>
        recipes.filter(r => r.time <= maxTime);

    const applyFilter = (recipes, type) => {
        if (type === 'easy' || type === 'medium' || type === 'hard')
            return filterByDifficulty(recipes, type);
        if (type === 'quick')
            return filterByTime(recipes, 30);
        return recipes;
    };

    const sortByName = (recipes) =>
        [...recipes].sort((a, b) => a.title.localeCompare(b.title));

    const sortByTime = (recipes) =>
        [...recipes].sort((a, b) => a.time - b.time);

    const applySort = (recipes, type) => {
        if (type === 'name') return sortByName(recipes);
        if (type === 'time') return sortByTime(recipes);
        return recipes;
    };

    // ============================================
    // PRIVATE: RENDER
    // ============================================

    const renderRecipes = (recipesArray) => {
        recipeContainer.innerHTML = recipesArray
            .map(createRecipeCard)
            .join('');
    };

    const updateDisplay = () => {
        let result = applyFilter(recipes, currentFilter);
        result = applySort(result, currentSort);
        renderRecipes(result);
    };

    // ============================================
    // PRIVATE: EVENT HANDLERS
    // ============================================

    const handleToggleClick = (event) => {
        if (!event.target.classList.contains('toggle-btn')) return;

        const button = event.target;
        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        const containerClass = toggleType === 'steps'
            ? 'steps-container'
            : 'ingredients-container';

        const container = document.querySelector(
            `.${containerClass}[data-recipe-id="${recipeId}"]`
        );

        if (container) {
            container.classList.toggle('visible');
            const isVisible = container.classList.contains('visible');

            button.textContent =
                toggleType === 'steps'
                    ? (isVisible ? '📋 Hide Steps' : '📋 Show Steps')
                    : (isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients');
        }
    };

    const handleFilterClick = (e) => {
        currentFilter = e.target.dataset.filter;
        updateDisplay();
    };

    const handleSortClick = (e) => {
        currentSort = e.target.dataset.sort;
        updateDisplay();
    };

    const setupEventListeners = () => {
        filterButtons.forEach(btn =>
            btn.addEventListener('click', handleFilterClick)
        );

        sortButtons.forEach(btn =>
            btn.addEventListener('click', handleSortClick)
        );

        recipeContainer.addEventListener('click', handleToggleClick);

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

    return {
        init,
        updateDisplay
    };

})();

// Start App
RecipeApp.init();
