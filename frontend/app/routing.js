


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
        }
    }
}

const navigateTo = url => {

    history.pushState(null,null,url);
    router();
};

window.addEventListener('popstate',router);
document.addEventListener("DOMContentLoaded", () => {

    document.body.addEventListener('click', (e) => {
       if (e.target.matches("[data-link]")){
        e.preventDefault();
        navigateTo(e.target.href);
       }
    });
    router();
});








// function rander(route){
//   const content = document.getElementById("content");
//   content.innerHTML = '';
//   content.className = 'content';
//   switch(route){
//     case '/':
//       // content.appendChild(document.createElement('getstarted-page'));
//       content.innerHTML = `<h1>this is home page</h1>`;
//       break;
//     case '/prof':
//       content.innerHTML = `<h1>this is prof page</h1>`;
//       break;
//     case '/game':
//         content.innerHTML = `<h1>this is game page</h1>`;
//         break;
//     case '/setting':
//           content.innerHTML = `<h1>this is setting page</h1>`;
//           break;
//     default:
//       content.innerHTML = `<h1>404 page not found.</h1>`;

//   }
// }

// function navigate(event) {
//   event.preventDefault();
//   const path = event.target.getAttribute('href');
//   window.history.pushState({}, '', path);
//   handleRoute();
// }

// function handleRoute(){
//   const route  = window.location.pathname;
//   console.log(route);
//   rander(route);
// }
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('a[data-link]').forEach(link => {
//       link.addEventListener('click', navigate);
//   });
// });

// window.addEventListener('popstate',handleRoute);

// window.addEventListener('load', () => {
//   if (!window.location.pathname){
//     window.history.replaceState({},'','/');
//   }
//   handleRoute();
// });