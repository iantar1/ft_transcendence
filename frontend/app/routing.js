// Render function to load the appropriate content

import {checkLogin} from './page/readData.js';

console.log("this is if log or not " + checkLogin());
 
function render(path) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content
    console.log("Navigating to " + path);

    const pageElement = (() => {
        switch (path) {
            case '/': return 'getstarted-page';
            case '/home': return 'home-page';
            case '/prof': return 'profile-page';
            case '/login': return 'login-page';
            case '/game': return 'game-page';
            case '/setting': return 'setting-page';
            case '/logout': return 'logout-page';
            default: 
                content.innerHTML = `<h1>404 - Page Not Found</h1>`;
                return null;
        }
    })();

    if (pageElement) {
        content.appendChild(document.createElement(pageElement));
    }
}

// Router function to determine the current path and render it
const router = () => {
    const path = location.pathname; // Get the current path from the URL
    render(path);
};

// Navigate to a specific URL programmatically
export const navigateTo = (url) => {
    history.pushState(null, null, url); // Add new state to the browser history
    router(); // Update the view
};

// Listen for browser back/forward navigation
window.addEventListener('popstate', () => {
    router(); // Re-render the appropriate page when history changes
});

// Initialize routing and set up event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href); // Intercept clicks on elements with the `data-link` attribute
        }
    });

    router(); // Render the initial view on page load
});
