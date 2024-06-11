//check if the user is signed in
function checkSignInStatus() {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn !== 'true') {
        window.location.href = 'signIn.html';
        return false
    }
    return true
}

// check if the user is signed in and update the navigation bar accordingly
document.addEventListener('DOMContentLoaded', () => {
    const isSignedIn = localStorage.getItem('isSignedIn');

    const signInLink = document.getElementById('sign-in-link');
    const signUpLink = document.getElementById('sign-up-link');
    const userNameLink = document.getElementById('user-name-link');
    const logoutLink = document.getElementById('logout-link');

    if (isSignedIn === 'true') {

        const storedUserName = localStorage.getItem('username');

        if (storedUserName) {
            userNameLink.textContent = storedUserName;

            signInLink.style.display = 'none';
            signUpLink.style.display = 'none';
            userNameLink.style.display = 'inline';
            logoutLink.style.display = 'inline';
        }
        else {
            signInLink.style.display = 'inline';
            signUpLink.style.display = 'inline';
            userNameLink.style.display = 'none';
            logoutLink.style.display = 'none';
        }
    }
});

// logout and remove items
function logout() {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('savedRecipes')
    // localStorage.removeItem('username');
    // localStorage.removeItem('password');
    // localStorage.removeItem('phone');
    // localStorage.removeItem('email');
    alert('you have successfully logged out! ' + localStorage.getItem('username')
    );
    window.location.href = 'index.html';
}

