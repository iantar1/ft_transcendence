
import { navigateTo } from "../routing.js";

// navigateTo('/login');

export function getCookie(name) {
    const cookies = document.cookie.split('; '); // Split by '; ' to get individual key-value pairs
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('='); // Split each pair by '='
        if (key === name) {
            return decodeURIComponent(value); // Decode in case the value is URL-encoded
        }
    }
    return null; // Return null if not found
}

// console.log("token : " + getCookie('access'));

export const readData = (function() {
    let data = [];

    return {
        getData: function() {
            // console.log(data);
            return data;
        },
        setData: function(newData) {
        console.log('inside fetchuserdata');
            console.log(data);
        data = newData;
        // console.log(data);
        },
        addData: function(item) {
            data.push(item);
        }
    };
})();

export async function fetchUserData() {
    try {

        const res = await fetch("https://localhost:3000/user/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies along with the request
        });

        // Check if the response is successfuurl
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        // Parse the response JSON to an array
        const data = await res.json();

        // Return the fetched data (which will be an array)
        return data;
    } catch (error) {
        // navigateTo('/login');
        console.error("Error in fetchUserData:", error);
        return []; // Return an empty array in case of an error
    }
}
// console.log(kdkdkdk);
export async function fetchMatchData() {
    try {

        const res = await fetch("https://localhost:3000/match_history/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies along with the request
        });

        // Check if the response is successfuurl
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        // Parse the response JSON to an array
        const data = await res.json();

        // Return the fetched data (which will be an array)
        return data;
    } catch (error) {
        console.error("Error in fetchUserData:", error);
        return []; // Return an empty array in case of an error
    }
}

export async function fetchRankData() {
    try {

        const res = await fetch("https://localhost:3000/users_ranking/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies along with the request
        });

        // Check if the response is successfuurl
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        // Parse the response JSON to an array
        const data = await res.json();

        // Return the fetched data (which will be an array)
        return data;
    } catch (error) {
        console.error("Error in fetchUserData:", error);
        return []; // Return an empty array in case of an error
    }
}

export async function fetchStatsData() {
    try {

        const res = await fetch("https://localhost:3000/stats/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies along with the request
        });

        // Check if the response is successfuurl
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        // Parse the response JSON to an array
        const data = await res.json();

        // Return the fetched data (which will be an array)
        return data;
    } catch (error) {
        console.error("Error in fetchUserData:", error);
        return []; // Return an empty array in case of an error
    }
}

export async function logoutUser(user) {
    
    const data = { username: user };
    try{
        const res = await fetch("https://localhost:3000/logout/", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            // body: JSON.stringify(data),
        })
        if (res.ok) {
                console.log('POST METHOD HAS BEEN SUCCESS')
        } else {
            console.log('POST METHOD HAS BEEN NOT SUCCESS')
        }
    } catch(error) {
        console.log("POST ERROR :", error);
    }
}
export async function postImage(alias,redir){
    // console.log("post function " + redir);
    // const form = document.querySelector(alias);
    // const fromData = new FormData(form);
    // const data = alias;
    // for (let [key, value] of alias.entries()) {
    //     console.log(key, value);
    // }
    console.log(JSON.stringify(alias))
    try{
        const res = await fetch("https://localhost:3000/" + redir + "/", {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: alias,
            
        })
        if (res.ok) {
                console.log('POST METHOD HAS BEEN SUCCESS')
        } else {
            console.log('POST METHOD HAS BEEN NOT SUCCESS')
        }
    } catch(error) {
        console.log("POST ERROR :", error);
    }

}

export async function postMethode(alias,redir, method){
    try{
        const res = await fetch("https://localhost:3000/" + redir + "/", {
            method: method, 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(alias),
            
        })
        if (res.ok) {
                console.log('POST METHOD HAS BEEN SUCCESS')
        } else {
            console.log('POST METHOD HAS BEEN NOT SUCCESS')
        }
    } catch(error) {
        console.log("POST ERROR :", error);
    }

}


export async function postInfo(alias,redir){

    console.log("post function");
    const form = document.querySelector(alias);
    const fromData = new FormData(form);
    const data = Object.fromEntries(fromData);
    try{
        const res = await fetch(`https://localhost:3000/api/${redir}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.ok) {
                console.log('POST METHOD HAS BEEN SUCCESS')
        } else {
            console.log('POST METHOD HAS BEEN NOT SUCCESS')
        }
    } catch(error) {
        console.log("POST ERROR :", error);
    }

}


export function checkLogin(flag){

    return flag;
}