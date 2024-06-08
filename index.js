// recipes "DB"
const recipes = [
    { name: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic'], image: 'spaghetti-bolognese.jpeg' },
    { name: 'Chicken Curry', ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onion', 'Garlic', 'Ginger'], image: 'Chicken-Curry.jpg' },
    { name: 'Vegetable Stir Fry', ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Sesame oil'], image: 'vegetarian-stir-fry-.jpg' },
    { name: 'filet and mushrooms', ingredients: ['beef', ' shallots', 'red wine', 'Butter', 'Mushrooms', 'thyme leaves'], image: 'beef-bowl.jpg' }
];

// sign-up management
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('sign-up-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userName = document.getElementById('user-name-su').value;
            const email = document.getElementById('email-su').value;
            const password = document.getElementById('password-su').value;
            const confirmPassword = document.getElementById('confirm-password-su').value;
            const phone = document.getElementById('phone-su').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            localStorage.setItem('username', userName);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('phone', phone);

            alert('Sign-up successful! Welcome' + userName);
            window.location.href = 'signIn.html';
        });
    }
});

// sign-in management
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('sign-in-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const siUserName = document.getElementById('user-name-si').value;
            const siEmail = document.getElementById('email-si').value;
            const siPassword = document.getElementById('password-si').value;

            const storedUserName = localStorage.getItem('username');
            const storedEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');

            console.log(siUserName, siEmail, siPassword, storedUserName, storedEmail, storedPassword)
            if (siEmail === storedEmail && siPassword === storedPassword && siUserName === storedUserName) {
                localStorage.setItem('isSignedIn', 'true');

                alert('Sign-in successful! Welcome ' + storedUserName);
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password!');
            }
        });
    }
});


// recipes gallery build
document.addEventListener('DOMContentLoaded', () => {
    const recipeGallery = document.getElementById('recipe-gallery');
    if (recipeGallery) {
        recipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
          <button class="save-recipe-button" data-index="${index}">Save Recipe</button>
        `;
            recipeGallery.appendChild(card);
        });
    }

    // Search bar imp.
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));

            recipeGallery.innerHTML = '';
            filteredRecipes.forEach((recipe, index) => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <button class="save-recipe-button" data-index="${index}">Save Recipe</button>
          `;
                recipeGallery.appendChild(card);
            });
        });
    }

    // Save recipe functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-recipe-button') && checkSignInStatus()) {

            const index = e.target.getAttribute('data-index');
            const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
            savedRecipes.push(recipes[index]);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            alert(`${recipes[index].name} has been saved to your list.`);
        }
    });
});

//delete save recipe

// saved recipes and generate shopping list
document.addEventListener('DOMContentLoaded', () => {
    const savedRecipesList = document.getElementById('saved-recipes-list');
    const generateShoppingListButton = document.getElementById('generate-shopping-list');

    if (savedRecipesList) {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        savedRecipes.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.textContent = recipe.name;
            savedRecipesList.appendChild(listItem);
        });
    }

    if (generateShoppingListButton) {
        generateShoppingListButton.addEventListener('click', () => {
            const shoppingListItems = document.getElementById('shopping-list-items');
            shoppingListItems.innerHTML = '';

            const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
            const ingredients = savedRecipes.flatMap(recipe => recipe.ingredients);
            const uniqueIngredients = [...new Set(ingredients)];

            uniqueIngredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                shoppingListItems.appendChild(listItem);
            });

            alert('Shopping list generated.');
        });
    }
});
