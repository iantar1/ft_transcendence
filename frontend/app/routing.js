// Render function to load the appropriate content

<<<<<<< HEAD
export function rander(path) {
    // navigateTo(path);
    history.pushState(null,null,path);
    const content  = document.getElementById('content');
    content.innerHTML = ``;
    console.log("this is " + path);
    switch(path){
    case '/':
       content.appendChild(document.createElement('getstarted-page'));
         break;
    case '/home':
        content.appendChild(document.createElement('home-page'));
             break;
    case '/prof':
        content.appendChild(document.createElement('profile-page'));
      break;
    case '/login':
        content.appendChild(document.createElement('login-page'));
        break;
    case '/game':
        content.appendChild(document.createElement('game-page'));
        break;
    case '/setting':
        content.appendChild(document.createElement('setting-page'));
        break;
        case '/logout':
        content.appendChild(document.createElement('logout-page'));
          break;
    default:
      content.innerHTML = `<h1>404 page not found.</h1>`;
    }
}

// const bnt = document.querySelector('.btn');
// bnt.addEventListener('click', (e) => {
//     alert('logout here');
// })

const router  = async () => {

    const routes = [
        {path : "/", view: () => console.log("dashboard")},
        {path : "/prof", view: () => console.log("prof")},
        {path : "/login", view: () => console.log("login")},
        {path : "/game", view: () => console.log("game")},
        {path : "/home", view: () => console.log("get")},
        {path : "/setting", view: () => console.log("get")},
        {path : "/logout", view: () => console.log("logout")},

    ]

    const isMatches = routes.map( route => {
        return {
            route : route,
            isMatch : location.pathname == route.path
        };
    });

    let match = isMatches.find(isMatches => isMatches.isMatch)
    if (!match){
        match = {
            route : router[0],
            isMatch : true
        };
    }
    for (let i = 0; i < routes.length ; i++){
        if (location.pathname === isMatches[i].route.path){
            rander(isMatches[i].route.path);
=======
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
>>>>>>> iantar
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
