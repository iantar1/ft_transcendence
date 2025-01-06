import { render } from "./render.js";
import { menu } from "./loby.js";

import { fetchUserData } from "../../page/readData.js";





export function waitingPage() {

    let usr_data, opp_data = null;
    async function getData() {
        usr_data = await fetchUserData();
        opp_data = null ;
    } 
    // Fetch initial data
    getData().then(() => updateUserCards());

    console.table("user : "+usr_data)
    console.table("opponent : "+opp_data)



    const waiting = document.createElement('div');
    const left_user = document.createElement('div');
    const right_user = document.createElement('div');
    const midel_info = document.createElement('div');
    const loader = document.createElement('div');
    const cancel = document.createElement('button');
    const style = document.createElement('style');

    waiting.classList = 'waiting';
    left_user.classList = 'left_user';
    right_user.classList = 'right_user';
    midel_info.classList = 'midel_info';
    loader.classList = 'loader';


    midel_info.textContent = 'Waiting for opponent...';
    cancel.textContent = 'Cancel';
    style.textContent = `
        .waiting {
            font-family: "Pong War" ,'Press Start 2P';
            display: flex;
            flex-direction: row;
            position: absolute;
            width: 100%;
            height: 100%;
            justify-content: space-around;
            transition: 0.5s ease;
            z-index: 10;
        }
        .left_user, .right_user {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20%;
            height: 80%; 
        }
        .midel_info {
            gap: 10px;
            display: flex;
            width: 20%;
            height: 100%; 
            text-align: center;
            place-items: center;
            place-content: center;
            flex-direction: column;
            color: white;
            text-shadow: #FC0 1px 0 10px;
            font-size: 16px;
        }
        .user_info {
            gap: 20px;
            display: flex;
            flex-direction: column;
            place-items: center;
            place-content: center;
            color: white;
            text-shadow: #FC0 1px 0 10px;
            font-size: 16px;
            transition: 0.5s ease;
        }
        .user_image {
            width: 100px;
            height: 100px;
            background-color: rgba(255,255,255, 0.3);
            border: 1px solid white;
            border-radius: 50%;
            object-fit: cover;
            transition: 0.5s ease;
        }
        .loader {
            border: 10px solid #f3f3f3;
            border-top: 10px solid var(--red);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 2s linear infinite;
        }
        button {
            position: absolute;
            bottom: 10%;
            font-family: "Pong War";
            padding: 10px 10px;
            width: 20%;
            margin-bottom: 10px;
            letter-spacing: 2px;
            color: white;
            background-color: var(--red);
            border: 1px solid white;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.5s ease;
        }
        button:hover {
            background-color: gray;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    function createUserCard(data) {
        const userInfo = document.createElement('div');
        const userImage = document.createElement('img');
        const userName = document.createElement('p');

        userInfo.classList.add('user_info');
        userImage.classList.add('user_image');

        if (!data) {
            userName.textContent = "username";
            userName.style.color = 'gray';
        } else {
            userImage.src = data.image;
            userImage.style.width = "100px";
            userImage.style.height = "100px";
            userName.textContent = data.username;
        }

        userInfo.appendChild(userImage);
        userInfo.appendChild(userName);
        return userInfo;
    }

    function updateUserCards() {
        left_user.innerHTML = '';  // Clear previous content
        right_user.innerHTML = ''; // Clear previous content

        left_user.appendChild(createUserCard(usr_data));
        right_user.appendChild(createUserCard(opp_data));
    }

    midel_info.appendChild(loader);
    left_user.appendChild(createUserCard(null)); // Initial placeholder
    right_user.appendChild(createUserCard(null)); // Initial placeholder

    waiting.appendChild(style);
    waiting.appendChild(left_user);
    waiting.appendChild(midel_info);
    waiting.appendChild(right_user);
    waiting.appendChild(cancel);


    // Periodically update user data
    const intervalId = setInterval(async () => {
        console.log("Updates matchmaking    ...");
        
        await getData();
        updateUserCards();
        if (usr_data && opp_data){
            midel_info.textContent = 'fight for your life';
            if (intervalId) {
                clearInterval(intervalId);
                console.log("Updates stopped.");
            }
        }
    }, 5000); // Update every 5 seconds

    return waiting;
}