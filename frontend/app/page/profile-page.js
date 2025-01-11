

import {fetchUserData , fetchMatchData, getCookie , fetchStatsData} from './readData.js';

// import {fetchMatchData} from './readData.js';

import { navigateTo } from '../routing.js';
// const info = await fetchUserData();
// this.narotu = await fetchMatchData();


function serachBar(){
    return `
    <style>
        #search-container {
            margin: 20px auto;
            width: 100%;
            display :flex;
            justify-content :center;
            align-items :center;
            flex-direction: column;
        }
        input[type="text"] {
            width: 100%;
            pad        page.addEventListener('click' , (e) => {
                betweenPage();
                navigateTo('/game');
        });ding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            color :#000;
        }
        #results {
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
        }
        #results ul {
            list-style-type: none;
            padding: 0;
        }
        #results li {
            font-family: Arial, sans-serif;
            color: #fff;
            font-size: 16px;
            padding: 5px 0;
            cursor: pointer; /* Pointer cursor to indicate clickable items */
            text-decoration: none;
        }
        #results li:hover {
            background-color: #f0f0f0; /* Highlight on hover */
        }
        /* Popup Styles */
        #popup {
            display: none; /* Hidden by default */
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border: 2px solid #ccc;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            border-radius: 8px;
            text-align: center;
        }
        /* Overlay to dim background */
        #overlay {
            display: none; /* Hidden by default */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
    <div id="search-container" style="flex-direction: column; width :100%;" >
        <div style="width :100%; height :100%;" >
            <input type="text" id="search-bar" placeholder="Search here..." />
            <div id="results"></div>
            <button type="click" id="backtoprof" class="btn-home btn btn-secondary " >Back</button>
        </div>
    </div>
    `;
}
function profSection(name, img) {
    return `
    <style>
        /* Add your custom styles here if needed */
    </style>
    <div id="profadd" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; width: 100%; height: 100%;">
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
            <img style="position: static; width: 80px; height: 80px; border-radius: 50%;" src="${img}" alt="${name}'s profile picture">
            <span>${name}</span>
        </div>
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
            <button type="click" id="addfriend" style="background-color: #4CAF50;" class="btn-home btn btn-secondary">Add Friend</button>
            <button type="click" id="backtosearch" class="btn-home btn btn-secondary">Back</button>
        </div>
    </div>
    `;
}

function slidProf(info){
    // const searchBarr = serachBar();
    // const prof = profSection();
    // data = document.querySelector('.forsddProf');

    const name = info.name;
    const img = info.img;
    return `
        <style>
        .logout-popup {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5000;
            justify-content: center;
            align-items: center;
            gap :10px;
            background-color: rgba(0, 0, 0, 0.8);
        }

        .logout-popup-content {
            background: var(--blue);
            padding: 30px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }
        .btn-home{
            background: var(--red);
        }
        .paratext{
            font-size :90%;
        }
        .confirmtext{
            color :var(--red);   
        }
        #forprof{
            display :none;
        }
    </style>
        <div id="logoutPopup" class="logout-popup">
            <div class="logout-popup-content">
            <div id="profadd" style="display :flex; flex-direction: column; align-items :center; justify-content:center; gap :10px; width:100%; height :100%;" >
                <div style="width:100%; height :100%; display :flex; flex-direction: column; align-items :center; justify-content:center; gap :10px;">
                    <img style="position :static;  width: 80px; height: 80px; border-radius: 50%;"  src="${img}" >
                    <span>${name}</span>
                </div>
                <div style="width:100%; height :100%; display :flex; flex-direction: column; align-items :center; justify-content:center; gap :10px;" >
                    <button type="click" id="addfriend" style="background-color: #4CAF50;" class="btn-home btn btn-secondary " >Add Friend</button>
                    <button type="click" id="toprof" class="btn-home btn btn-secondary " >Back</button>
                </div>
            </div>
            </div>
        </div>
                `
                
}
function slidFriend(){
    const searchBarr = serachBar();
    const prof = profSection();
    return `
        <style>
        .logout-popup {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5000;
            justify-content: center;
            align-items: center;
            gap :10px;
            background-color: rgba(0, 0, 0, 0.8);
        }

        .logout-popup-content {
            background: var(--blue);
            padding: 30px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }
        .btn-home{
            background: var(--red);
        }
        .paratext{
            font-size :90%;
        }
        .confirmtext{
            color :var(--red);   
        }
        #forprof{
            display :none;
        }
    </style>
        <div id="logoutPopup" class="logout-popup">
            <div class="logout-popup-content">
                ${searchBarr}
            </div>
        </div>
                `
                
}

const addFriends = () => {
    const elem = document.getElementsByClassName('.img-profile')
    const popuping = slidFriend();
    const data = [
        {img :"/images/ah.png", status : true ,name :"ahbajaou",}
    ]
    return     elem.innerHTML = `

    <div  class="addfriend d-flex justify-content-center align-items-center" style="gap :10px; background:var(--dark); border-radius :5px;" >
        <button  type="click" class="flag btn-home btn btn-secondary " style="font-size :100%; border-radius :5px;  background:var(--red); display: flex; justify-content: center; align-items: center;" >
            <i style="color: #fff;" class="fa fa-user-plus" aria-hidden="true"></i>
        </button>
        <span class="forAdd" style="" ></span>
        <div class="scrollable-div" style="" >

        </div>
    </div>
    `;
}

class profilePage extends HTMLElement {
    statsHistory = [];
    frienSection = addFriends();

    template = `
        <div class="content-profile ">
                <div class="cart-profile ">
                <div class="info-profile" >
                        <div style="width :8%; height :90%;display:flex; align-items: start; justify-content: center;" >
                            <div  style="height :30px; width :30px; border-radius:50%; background:var(--red); display:flex; align-items: center; justify-content: center;" >
                                <i style="color :#fff;margin: 0; padding: 0; position: static; vertical-align: middle;" class="fa-solid fa-bell"></i>
                            </div>
                        </div>
                        <div style="height :100%; width :100%; display:flex; align-items: center; justify-content: center; flex-direction: column;" >
                            <img id="img_intra" src="" >
                            <h3 id='username' ></h3>
                            <button id="tosetting" type="click" class="btn-home btn btn-secondary " >Edit</button>
                        </div>
                    </div>
                    <div class="lvl-profile">
                        <div class="bio-profile">
                            <h5>Bio</h5>
                            <h5 id="BIO" ></h5>
                            <br>
                        </div>
                        <div class="lvl">
                            <div class="progress">
                                <div class="progress-bar progress-bar-info progress-bar-striped active" style="width:10%; box-shadow:none;"></div>
                                <div class="progress-value">10%</div>
                            </div>
                        </div>

                    </div>
                    <div  class="img-profile d-flex justify-content-center align-items-center ">
                        ${this.frienSection}
                    </div>
                </div>
        </div>
    `;
    templatStyle = `
        <style>
            .nav-bar{
                display :flex;

                }
                #prof{
   
                    color: #fff; 
                }
                /* Webkit Browsers (Chrome, Edge, Safari) */
                .scrollable-div::-webkit-scrollbar {
                    width: 6px; /* Narrow scrollbar for a mobile-like feel */
                }
        
                .scrollable-div::-webkit-scrollbar-thumb {
                    background: var(--red); /* Thumb color */
                    border-radius: 10px; /* Rounded thumb for a smooth look */
                }
        
                .scrollable-div::-webkit-scrollbar-thumb:hover {
                    background: #fff; /* Darker color on hover */
                }
        
                .scrollable-div::-webkit-scrollbar-track {
                    background: transparent; /* Transparent track for minimalistic style */
                }
            .flag .fa-solid {
                margin: 0;
                padding: 0;
                position: static; /* Reset any default positioning */
                vertical-align: middle; /* Ensure alignment within the flexbox */
            }
            .content-profile{
                gap:5px;
            }
            .cart-profile{
            height :39vh;
            background: linear-gradient(-80deg, 
            rgb(4, 28,68, 1) 5%, 
            rgba(56, 75, 112, 0.2) 100%
            );
            border-radius:5px;
            overflow :hidden;
            padding :5px;
            z-index :2000;
                display :flex;
                justify-content: center;
                align-items: center;
                gap:15px;
            
            }
            .info-profile{
                height :100%;
                flex-basis: 40%;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                gap :0px;
            }
            .lvl-profile{
                height :80%;
                flex-basis: 50%;
                display :flex;
                justify-content: center;
                flex-direction: column;
                gap :0px;
            }
            .lvl-profile .lvl-prof{
                  opacity:0.4;
            }
            .achev{
                gap :8px;
                display :flex;
                align-items: center;
                margin-top :15px;
            }
            .achev h5 {
                position :relative;
                top: 46px;
                height :60px;
            }
            .btn-secondary{
                width :70%;
            }
            .ach{
                width :60px;
                height :60px;
                border-radius :10px;
                background-color: rgba(255, 255, 255, 0.384);
            }
            .info-profile img{
                max-width: 130px;
                height: 130px;
                object-fit: cover;
                border-radius:50%;
            }
        .btn-home{
            width :200px;
            height:50px;
            background-color: rgba(228, 5, 47, 1);

            border-radius:12px;
            border :none;
            font-size:100%;
            z-index :2000;
        }
            .img-profile{
                height :100%;
                flex-basis: 10%; 
            }
            .img-profile img{
                width :40vw;
                height :41vh;
                position :absolute;
                top :0%;
                left :59%;
            }
            .achevmet-piece{
                display :flex;
                flex-direction: row;
                gap :5px;
            }
            .progress{
                height: 15px;
                width :320px;
                 background:rgb(0 0 0 / 0.5);
                margin: 0;
                overflow: visible;
                border-radius: 10px;
            }
            .progress .progress-bar{
                border-radius: 10px;
                 background:var(--red);
                 box-shadow :none;
                 
            }
            .progress .progress-value{
                position: relative;
                left: 0px;
                top: -15px;
                font-size: 14px;
                font-weight: bold;
                color: #fff;
                letter-spacing: 2px;
            }
            .progress-bar.active{
            animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;
            }
            @-webkit-keyframes animate-positive{
            0% { width: 0%; }
            }
            @keyframes animate-positive {
            0% { width: 0%; }
            }
            .addfriend{
                height :95%;
                width :85%;
                flex-direction: column;
            }
            .flag{
                width :70%;
                height :10%;
            }
            .sign{
                position :relative;
                top:-15%;
                left:15%;
                width :10px;
                height :10px;
                border-radius :50%;
                z-index :3000;
            }
            .profsign{
                height :32%;
            }
            .scrollable-div{
                overflow-x :hidden; 
                overflow-y: auto;
                height :80%;
                width :95%;
            }
            @media (min-width: 320px) and (max-width: 1024px) {
                    .img-profile{
                        display :none;
                    }
                    .cart-profile{
                        flex-direction: column-reverse;
                        height :50%;
                        width :100vw;
                        border-radius:0px;
                    }
                    .info-profile{
                        height :80%;
                    }
                .scrollable-div::-webkit-scrollbar {
                    height :2px;
                }
                    .addfriend{
                        height :65px;
                        width :100%;
                        flex-direction: row;
                    }
                    .flag{
                        width :16%;
                        height :50px;
                    }
                    .profsign{
                        height :50px;
                        
                    }
                    .sign{
                        top:-10px;
                        left:15px;
                    }
                    .scrollable-div{
                        display :flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row;
                        gap :10px;
                        overflow-x :auto; 
                        overflow-y: hidden;
                        height :100%;
                        width :95%;
                    }
                    .img-profile{
                        height :15%;
                        width :100%; 
                    }
            }
        </style>
    `;
    // const form = [
    //     { player: "ahbajaou",  img: "/images/ah.png"},
    //     { player: "arahmoun", img: "/images/ara.png"},
    //     { player: "iantar", img: "/images/iantar.jpeg"}
    //   ];
    winorLose = `
    <div class="winorlose">
        <table class="table editTabel" >
            <thead>
                <tr>
                    <th scope="col">Player</th>
                    <th scope="col">Score</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Score</th>
                    <th scope="col">Player</th>
                </tr>
            </thead>
            <tbody class="players" >

            </tbody>
        </table>
    </div>
    `;
    winorLoseStyle = `
        <style>
            .winorlose{
                overflow-y: auto;
            }
            .userleft{
                width :100%;
                height :75px;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: row;
                gap :5%;
            }
            .userInfo{
                height :100%;
                width :10vw;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: row;
                gap :5%;
            }
            .userPart{
               min-height :50vh;
            }
            .name-user{
                width :100px;
            }
            .name-userright{
                text-align: right;
            }
            .winIcon{
                width :100px;
                height :300px;
                position :relative;
                left :0;
                top :-15px;
                display :flex;
                justify-content: center;
                align-items :center;
                
            }
            .winIcon img{
                width :30%;
                heigth :30%;
               
            }
            .imgIcon{
                width :200px;
                height :100px;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: column;
                
            }
            .img-user{
                width :60px;
                height :550px;
                border-radius :15px;
                border :5px solid rgba(56, 75, 112, 1);
                overflow: hidden;
            }
            .img-user img{
                width :100%;
                height :100%;
            }
            .score-user{
                width :30px;
                height :50px;
                border-radius :10px;
                background :rgba(217, 217, 217, 0.1);
                display :flex;
                justify-content: center;
                align-items :center;
            }
            .time-user{
                width :20%;
                height :100%;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: column;
            }
            .time-user h6{
                text-align :center;
            }
            .noonehere{
                display :none;
            }
            .noonehere{
                display :none;
            }
            .time-user img {
                width :38%;
                height :80%;
            }
             @media (min-width: 320px) and (max-width: 1024px) {
                        .name-user{
                            display :none;
                        }
                        .winorlose{
                            width :100vw;
                            height :50vh;
                            background: none;
                            overflow-y: auto;
                        }
                        .userInfo{
                            flex-basis: 10%;
                            gap :1%;
                        }
                        .imgIcon{
                            width :90px;
                        }
                        .userInfo{
                            height :100%;
                            width :40vw;
                        }
                    .time-user{
                        width :30%;
                    }
                
                .noonehere{
                    display :flex;
                }
                .winIcon{
                    display :flex;
                    flex-direction: column;
                    height :100%;
                }
            .imgIcon{
                height :130px;
            }
             }
        </style>
    `;
    gameRank = `
        <div class="gameRank">
            <div class="cycle-progress" >

            </div>
            <div class="cont-progress" >
                    <div class="cart" >
                        <h4>Total Win</h4>
                        <p id="win" >0</p>
                        <h4 id="winone" >0%</h4>
                    </div>
                    <div class="cart" >
                        <h4>Total Lose</h4>
                        <p id="lose" >0</p>
                        <h4 id="loseone" >0%</h4>
                    </div>
            </div>
        </div>
        <style>
            .cart{
                width :80%;
                height :45%;
                display :flex;
                align-items: left;
                justify-content: space-around;
                flex-direction: column;
                 background:rgb(0 0 0 / 0.5);
                border-radius :10px;
                padding :10px;
            }
        
        </style>
    `;
    gamerankStyle = `
    <style>
        .gameRank{
                width :50%;
                height :50vh;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                background: var(--bluenes);
                border-radius :5px;
                z-index :2000;
            }
        .cycle-progress{
            display :flex;
            align-items: center;
            justify-content: center;
            width :45%;
            height :100%;
            gap :20px;
        }
        .cont-progress{
            width :55%;
            height :90%;
            display :flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap :10px;
            
        }
        @media (min-width: 320px) and (max-width: 1024px) {
                .gameRank{
                    width :100vw;
                    height :70vh;
                    border-radius :0px;
                    flex-direction: column
                }
            .cycle-progress{
                display :flex;
                width :100%;
                height :40%;
             }
            .cont-progress{
                width :100%;
                height :100%;
            }
    }
    </style>
    `;
    cycleProgress = `
    <div class="cycle blue">
    <span class="cycle-left">
        <span class="cycle-bar "></span>
    </span>
    <span class="cycle-right">
        <span class="cycle-bar"></span>
    </span>
    <div id="cycleValue" class="cycle-value"></div>
    </div>

<style>
  .cycle {
    width: 150px;
    height: 150px;
    line-height: 150px;
    background: none;
    margin: 20px;
    position: relative;
    border-radius: 50%;
  }

  .cycle:after {
    display: none;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 12px solid #fff;
    position: absolute;
    top: 0;
    left: 0;
  }

  .cycle>span {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .cycle .cycle-left {
    left: 0;
  }

  .cycle .cycle-bar {
    width: 100%;
    height: 100%;
    background: none;
    border-width: 12px;
    border-style: solid;
    position: absolute;
    top: 0;
  }

  .cycle .cycle-left .cycle-bar {
    left: 100%;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    border-left: 0;
    transform-origin: center left;
  }

  .cycle .cycle-right {
    right: 0;
  }

  .cycle .cycle-right .cycle-bar {
    left: -100%;
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
    border-right: 0;
    transform-origin: center right;
    animation: loading-1 1s ease-out forwards ;
  }

  .cycle .cycle-value {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background:rgb(0 0 0 / 0.5);
    font-size: 24px;
    color: #fff;
    line-height: 135px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  .cycle.blue .cycle-bar {
    border-color: var(--red);
  }

  @keyframes loading-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  }
</style>

    `
    templatTwo = `
        <div class="static-profile">
            ${this.winorLose}
            ${this.gameRank}
        </div>
    `;
    templatwoStyle = `
        <style>
            .static-profile{
                height :56vh;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius :25px;
                gap :20px;
            }
            .winorlose{
                width :50%;
                height :50vh;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background:var(--bluenes);
                border-radius :5px;
                gap :30px;
            }
             @media (min-width: 320px) and (max-width: 1024px) {
                .static-profile{
                    flex-direction: column;
                    height :130vh;
                    border-radius :0px;
                }
             }
        </style>
    `;
    navar = `
    @media (min-width: 320px) and (max-width: 1024px) {
            .nav-bar{
                width: 100%;
                display: flex;
                height :8%;
                background-color: rgb(0 0 0 / 0.5);
                color: #293247;
                justify-content: space-evenly;
                align-items: center;
                flex-direction: row;
                border-radius :0px;
                position: fixed;
                padding-bottom: 5%;
                bottom :0;
                z-index :2001;
            }
            .nav-02{
                margin-top:30px;
            }
            .nav-02 .fa-right-from-bracket{
                display :none;
            }
            nav a{
                text-decoration: none;
            }
            .fafa{
                display :none;
            }
            .img-home{
                display :none;
            }
            body{
                flex-direction: column-reverse;
            }
            #content{
                width :100vw;
                height :100vh;
                border-radius :0px;
                display :flex;
            }
    }`
    narotu = [];
    constructor() {
        super();
    }
    async statsPlayer() {
        // Fetch match data
        this.narotu = (await fetchMatchData()).matchHistory;
    
        if (!this.narotu || this.narotu.length === 0) {
            console.log('No match history data found.');
            return;
        }
    
        const onevsone = document.querySelector('.players');
        let from = '';
    
        // Process each match and construct the table rows
        this.narotu.forEach(match => {
            const player1 = match.user1;
            const player2 = match.user2;
            const winner = match.winner.username;
            const loser = winner === player1.username ? player2.username : player1.username;
    
            from += `
                <tr>
                    <td>
                        <div>
                            <img src="${player1.image}" alt="${player1.username}" style="object-fit: cover; display:block;  width:55px; height: 55px;  border-radius: 50%; ">
                            <span>${player1.username}</span>
                        </div>
                    </td>
                    <td>
                        <div>${match.user1_score}</div>
                    </td>
                    <td>
                        <div>${winner === player1.username ? 'Win' : 'Lose'}</div>
                    </td>
                    <td>
                        <div>
                            <div>2024-03-17</div>
                            <div>11:15</div>
                        </div>
                    </td>
                    <td>
                        <div>${winner === player2.username ? 'Win' : 'Lose'}</div>
                    </td>
                    <td>
                        <div>${match.user2_score}</div>
                    </td>
                    <td>
                        <div style="" >
                            <img  src="${player2.image}" alt="${player2.username}" style="object-fit: cover; display:block;  width:55px; height: 55px; border-radius: 50%; ">
                            <span>${player2.username}</span>
                        </div>
                    </td>
                </tr>
            `;
        });
    
        // Render the table rows in the DOM
        onevsone.innerHTML = from;
    }
    slidFriend() {
        const friendSection = document.querySelector('.flag'); // Access the first element with the class
        friendSection.addEventListener('click', (e) => {
            // Reset or manipulate DOM content here as needed
            const searchBarContainer = document.querySelector('.forAdd');
            searchBarContainer.innerHTML = slidFriend(); // Update content inside forAdd
    
            // Rebind the events after updating the content inside .forAdd
            this.bindSearchBarEvents();  // Call function to rebind events
        });
    }
    
    bindSearchBarEvents() {
        const searchBar = document.getElementById('search-bar');
        const resultsDiv = document.getElementById('results');
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');
        const overlay = document.getElementById('overlay');
    
        const sampleData = this.statsHistory.map(item => ({
            name: item.player,
            img: item.img
        }));
    
        // Function to display matching results
        function displayResults(query) {
            resultsDiv.innerHTML = ''; // Clear previous results
            if (query) {
                const filteredData = sampleData.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                if (filteredData.length) {
                    resultsDiv.innerHTML = `
                        <ul>
                            ${filteredData
                                .map(
                                    item =>
                                        `<li data-name="${item.name}" data-img="${item.img}" class="search-result">${item.name}</li>`
                                )
                                .join('')}
                        </ul>`;
                } else {
                    resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
                }
            }
        }
    
        // Event delegation for dynamically generated search result items
        if (resultsDiv) {
            resultsDiv.addEventListener('click', (e) => {
                const clickedElement = e.target.closest('.search-result');
                if (clickedElement) {
                    const name = clickedElement.getAttribute('data-name');
                    const img = clickedElement.getAttribute('data-img');
    
                    // Replace the container with the dynamic profile section
                    document.querySelector('#search-container').style.display = "none";
                    const content = document.querySelector('.logout-popup-content');
                    if (content) {
                        content.innerHTML = '';
                        content.innerHTML = profSection(name, img);
                    }
    
                    // Add functionality to buttons
                    document.querySelector('#backtosearch').addEventListener('click', () => {
                        document.querySelector('.forAdd').innerHTML = slidFriend();
                        this.bindSearchBarEvents();
                    });
                }
            });
        }
    
        // Add event listener to search bar
        if (searchBar) {
            searchBar.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                displayResults(query); // Show matching results
            });
        }
    
        // Add click listener for the 'back to profile' button
        document.querySelector('#backtoprof').addEventListener('click', () => {
            document.querySelector('.logout-popup').style.display = 'none';
        });
    }
    
    
    openProfile() {
        const openProfileElements = document.querySelectorAll('.profsign'); // Select all span elements with the class 'profsign'
    
        openProfileElements.forEach(field => {
            field.addEventListener('click', (e) => {
                // Get data attributes from the clicked element
                const name = field.querySelector('.forsddProf').dataset.name;
                const img = field.querySelector('.forsddProf').dataset.img;
    
                // Pass the data dynamically to slidProf and display the popup
                const profilePopup = slidProf({ name, img });
                document.body.insertAdjacentHTML('beforeend', profilePopup);
    
                // Add functionality to the back button
                const backToSearch = document.querySelector('#toprof');
                backToSearch.addEventListener('click', () => {
                    document.querySelector('#logoutPopup').remove(); // Close the popup
                });
            });
        });
    }
    
    stockFriends() {

        this.statsHistory = [
            { player: "ahbajaou", img: "/images/ah.png", status: "green" },
            { player: "arahmoun", img: "/images/ara.png", status: "red" },
            { player: "iantar", img: "/images/iantar.jpeg", status: "green" },
            { player: "ahbajaou", img: "/images/ah.png", status: "green" },
            { player: "arahmoun", img: "/images/ara.png", status: "red" },
            { player: "iantar", img: "/images/iantar.jpeg", status: "green" }
        ];
        const main = document.querySelector('.scrollable-div');
        let prof = '';
       let  index = 0;
        this.statsHistory.forEach((info) => {
            // index++;
            prof += `
                <span class="profsign d-flex justify-content-center align-items-center flex-column" data-index="${index}">
                    <img id="openprof" type="click" style="position: static; width: 50px; height: 50px; border-radius: 50%; border: 1px solid;" src="${info.img}">
                    <span class="sign" style="background: ${info.status};"></span>
                    <span id="" data-name="${info.player}" data-img="${info.img}" class="forsddProf" style=""></span>
                </span>
            `;
            console.log('openprof-' + index)
        });
        main.innerHTML = prof;
    }
    
    render() {
        console.log("RANDER FUNCTION IS HERE AT THE PROFILE PAGE");
        const uuss = async () => {
            if (!getCookie('access')){
                navigateTo('/login');
            }
            this.info = await fetchUserData();
            if (this.info){
                // console.log(this.info.image);
                if (!this.info.username){
                    this.info.username = "ASTRO"
                }
                if (!this.info.image){
                    this.info.image = "/images/default.jpeg"
                }
                document.getElementById('username').textContent = this.info.username
                document.getElementById('img_intra').src = this.info.image
                document.getElementById('BIO').textContent = 'ash dak temchi lzine'
                const stats = await fetchStatsData(); // Fetch the stats data

       
                // Optional: If you need to update duplicate or additional elements, create aliases
                console.log("stats win : " +  stats.wins);
                if (stats){
                    document.getElementById('win').textContent = stats.wins;
                    document.getElementById('winone').textContent = "";
                    document.getElementById('lose').textContent = stats.losses;
                    document.getElementById('loseone').textContent = "";
                    document.getElementById('cycleValue').textContent = stats.total;
                }else{
                    document.getElementById('win').textContent = "0";
                    document.getElementById('winone').textContent = "";
                    document.getElementById('lose').textContent = "0";
                    document.getElementById('loseone').textContent = "";
                    document.getElementById('cycleValue').textContent = "0";
                }

            }
            else{
                navigateTo('/login');
            }
        }
        uuss();
        // this.slidFriend();
        this.innerHTML = `
            ${this.template}
            ${this.templatTwo}
            ${this.templatStyle}
            ${this.templatwoStyle}
            ${this.winorLoseStyle}
            ${this.gamerankStyle}
            <style>
            ${this.navar}
                .editTabel{
                    height :95%;
                }
                table.table tbody tr:nth-child(odd) { 
                    background-color: var(--dark); 
                }

                table.table tbody tr:nth-child(even) {
                    background-color: var(--blue); 
                }

            
                table.table td, table.table th {
                    padding: 2%;
                    text-align: center;
                }

            
                table.table {
                    border-collapse: collapse;
                    width: 100%;
                    font-size :75%;
                }

                table.table tbody tr {
                    border-bottom: 1px solid var(--dark);
                }
                table.table td div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            </style>
        `;

        this.querySelector('.cycle-progress').innerHTML = this.cycleProgress;   
 
            const backToSearch = document.querySelector('#tosetting');
            backToSearch.addEventListener('click', () => {
                navigateTo('/setting')
            });
    }
    connectedCallback() {
        this.render();
        this.statsPlayer();
        this.slidFriend();
        this.stockFriends();
        this.openProfile();

    }
}

customElements.define('profile-page', profilePage);

