

import {fetchUserData} from './readData.js';


function serachBar(){
    return `
    <style>
        #search-container {
            margin: 20px auto;
            max-width: 400px;
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        #results {
            margin-top: 10px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
        }
        #results ul {
            list-style-type: none;
            padding: 0;
        }
        #results li {
            color: black;
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
        #popup button {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #popup button:hover {
            background-color: #0056b3;
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
    <div id="search-container">
        <input type="text" id="search-bar" placeholder="Search here..." />
        <div id="results"></div>
    </div>

    <!-- Popup and Overlay -->
    <div id="overlay"></div>
    <div id="popup">
        <p id="popup-text"></p>
        <button onclick="closePopup()">Close</button>
    </div>
    `;
}

function slidFriend(){
    const searchBarr = serachBar();
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

    </style>
        <div id="logoutPopup" class="logout-popup">
            <div class="logout-popup-content">
                ${searchBarr}
                <button type="click" id="backtoprof" class="btn-home btn btn-secondary " >Back</button>
            </div>
        </div>
                `
                
            };

const addFriends = () => {
    const elem = document.getElementsByClassName('.img-profile')
    const popuping = slidFriend();
    const data = [
        {img :"/images/ah.png", status : true ,name :"ahbajaou",}
    ]
    return     elem.innerHTML = `

    <div  class="addfriend d-flex justify-content-center align-items-center" style="gap :10px; background:var(--dark); border-radius :5px;" >
        <button  type="click" class="flag btn-home btn btn-secondary " style="font-size :100%; border-radius :5px;  background:var(--red); display: flex; justify-content: center; align-items: center;" >
            <i style="color: #fff;" class="fa-solid fa-user-plus"></i>
        </button>
        <span class="forAdd" style="" ></span>
        <div class="scrollable-div" style="" >
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
                <div class="profsign d-flex justify-content-center align-items-center flex-column" style="" >
                    <img style="position :static;  width: 50px; height: 50px; border-radius: 50%;" src="${data[0].img}" >
                    <span class="sign" style="" ></span>
                </div>
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
                    <div class="info-profile">
                        <img id="img_intra" src="" >
                        <h3 id='username' ></h3>
                            <button class="btn-home btn btn-secondary " >Edit</button>
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
                flex-direction: column;
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
                left: -45px;
                top: 4px;
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
                background:green;
                width :10px;
                height :10px;
                border-radius :50%;
                z-index :4000;
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
                            overflow: hidden;

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
                        <p>0</p>
                        <h4>0%</h4>
                    </div>
                    <div class="cart" >
                        <h4>Total Lose</h4>
                        <p>0</p>
                        <h4>0%</h4>
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
    <div class="cycle-value">90%</div>
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
    constructor() {
        super();
    }
    statsPlayer(){
        this.statsHistory = [
            { player: "ahbajaou",  img: "/images/ah.png"},
            { player: "arahmoun", img: "/images/ara.png"},
            { player: "iantar", img: "/images/iantar.jpeg"}
          ];

        const onevsone = document.querySelector('.players');
        console.log(onevsone);
        let from = '';
        this.statsHistory.forEach(element => {
                // console.log('hhhhhhhhhh');
                from += `
                    <tr>
                        <td>
                            <div>
                                <img src="${element.img}" alt="Larry" style="width: 50px; height: 50px; border-radius: 50%; display: block;">
                                <span>${element.player}</span>
                            </div>
                        </td>
                        <td>
                            <div>15</div>
                        </td>
                        <td>
                            <div>Win</div>
                        </td>
                        <td>
                            <div>
                                <div>2024-03-17</div>
                                <div>11:15</div>
                            </div>
                        </td>
                        <td>
                            <div>Lose</div>
                        </td>
                        <td>
                            <div>3</div>
                        </td>
                        <td>
                            <div>
                                <img src="${element.img}" alt="Bird" style="width: 50px; height: 50px; border-radius: 50%; display: block;">
                                <span>${element.player}</span>
                            </div>
                        </td>
                    </tr>
                `;
        });
        console.log(from)
        onevsone.innerHTML = from;
    }
    slidFriend(){
        const friendSection = document.querySelector('.flag'); // Access the first element with the class
        friendSection.addEventListener('click' , (e) =>{
                console.log('Hello Friends');
                // friendSection.className = "test"
                document.querySelector('.forAdd').style.display = 'block';
                const serach = document.querySelector('.forAdd').innerHTML = slidFriend();
                const searchBar = document.getElementById('search-bar');
                const resultsDiv = document.getElementById('results');
                const popup = document.getElementById('popup');
                const popupText = document.getElementById('popup-text');
                const overlay = document.getElementById('overlay');
        
                const sampleData = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]; // Sample data to search
        
                // Function to display matching results
                function displayResults(query) {
                    resultsDiv.innerHTML = ''; // Clear previous results
                    if (query) {
                        const filteredData = sampleData.filter(item => item.toLowerCase().includes(query.toLowerCase()));
                        if (filteredData.length) {
                            resultsDiv.innerHTML = `<ul>${filteredData.map(item => `<li onclick="showPopup('${item}')">${item}</li>`).join('')}</ul>`;
                        } else {
                            resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
                        }
                    }
                }
        
                // Function to show the popup
                function showPopup(result) {
                    popupText.textContent = `You clicked: ${result}`;
                    popup.style.display = 'block';
                    overlay.style.display = 'block';
                }
        
                // Function to close the popup
                function closePopup() {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }
        
                // Add event listener to search bar
                searchBar.addEventListener('input', (e) => {
                    const query = e.target.value.trim();
                    displayResults(query); // Show matching results
                });           
                document.querySelector('#backtoprof').addEventListener('click' , (e) => {
                        console.log("BACK TO PROF PAGE");
                        document.querySelector('.forAdd').style.display = 'none';
                });
            });

    };
    render() {
        console.log("RANDER FUNCTION IS HERE AT THE PROFILE PAGE");
        const uuss = async () => {
            this.info = await fetchUserData();
            console.log(this.info.image);
            document.getElementById('username').textContent = this.info.username
            // document.getElementById('username').textContent = this.info.username
            document.getElementById('img_intra').src = this.info.image
            console.log(this.info.image);
            document.getElementById('BIO').textContent = 'ash dal temchi lzine'
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
        // cycleProg();
        // this.cycleRander();
        // losrWin.appendChild(onevsone);
            // });
    }
    connectedCallback() {
        this.render();
        this.statsPlayer();
        this.slidFriend();

    }
}

customElements.define('profile-page', profilePage);


// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         .profile-card {
//             max-width: 320px;
//             padding: 1.5rem;
//             background: white;
//             border-radius: 8px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             margin: 20px auto;
//         }

//         .profile-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 1rem;
//         }

//         .profile-image-container {
//             position: relative;
//         }

//         .profile-image {
//             width: 96px;
//             height: 96px;
//             border-radius: 50%;
//             object-fit: cover;
//             border: 2px solid #e5e7eb;
//         }

//         .profile-image-fallback {
//             width: 96px;
//             height: 96px;
//             border-radius: 50%;
//             background: #f3f4f6;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid #e5e7eb;
//         }

//         .status-badge {
//             position: absolute;
//             bottom: -8px;
//             right: 0;
//             padding: 4px 8px;
//             border-radius: 9999px;
//             font-size: 12px;
//             font-weight: bold;
//             color: white;
//         }

//         .english {
//             background-color: #22c55e;
//         }

//         .not-english {
//             background-color: #ef4444;
//         }

//         .profile-name {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: #1f2937;
//             margin: 0;
//         }

//         .profile-subtitle {
//             font-size: 0.875rem;
//             color: #6b7280;
//             margin: 0;
//         }

//         .stats-container {
//             width: 100%;
//             padding-top: 1rem;
//             border-top: 1px solid #e5e7eb;
//             margin-top: 1rem;
//         }

//         .stats-grid {
//             display: flex;
//             justify-content: space-around;
//             text-align: center;
//         }

//         .stat-label {
//             font-size: 0.875rem;
//             color: #6b7280;
//             margin: 0;
//         }

//         .stat-value {
//             font-weight: 600;
//             color: #1f2937;
//             margin: 0;
//         }

//         .toggle-button {
//             margin-top: 1rem;
//             padding: 8px 16px;
//             background: #3b82f6;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//         }

//         .toggle-button:hover {
//             background: #2563eb;
//         }
//     </style>
// </head>
// <body>
//     <div id="app"></div>

//     <script>
//         function createProfileCard(container, {
//             name = "John Doe",
//             isEnglish = true,
//             imageUrl = null
//         } = {}) {
//             function getProfileHTML() {
//                 return `
//                     <div class="profile-card">
//                         <div class="profile-container">
//                             <div class="profile-image-container">
//                                 ${imageUrl 
//                                     ? `<img src="/api/placeholder/96/96" alt="Profile" class="profile-image">`
//                                     : `<div class="profile-image-fallback">
//                                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af">
//                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                             <circle cx="12" cy="7" r="4"></circle>
//                                         </svg>
//                                        </div>`
//                                 }
//                                 <span class="status-badge ${isEnglish ? 'english' : 'not-english'}">
//                                     ${isEnglish ? 'English' : 'Not English'}
//                                 </span>
//                             </div>
                            
//                             <div style="text-align: center">
//                                 <h3 class="profile-name">${name}</h3>
//                                 <p class="profile-subtitle">User Profile</p>
//                             </div>

//                             <div class="stats-container">
//                                 <div class="stats-grid">
//                                     <div>
//                                         <p class="stat-label">Status</p>
//                                         <p class="stat-value">${isEnglish ? 'Active' : 'Inactive'}</p>
//                                     </div>
//                                     <div>
//                                         <p class="stat-label">Member Since</p>
//                                         <p class="stat-value">2024</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <button class="toggle-button" id="toggleStatus">
//                                 Toggle English Status
//                             </button>
//                         </div>
//                     </div>
//                 `;
//             }

//             // Initial render
//             container.innerHTML = getProfileHTML();

//             // Add event listener for toggle button
//             const toggleButton = container.querySelector('#toggleStatus');
//             toggleButton.addEventListener('click', () => {
//                 isEnglish = !isEnglish;
//                 container.innerHTML = getProfileHTML();
                
//                 // Reattach event listener after re-render
//                 container.querySelector('#toggleStatus')
//                     .addEventListener('click', toggleButton.onclick);
//             });
//         }

//         // Initialize the profile card
//         const appContainer = document.getElementById('app');
//         createProfileCard(appContainer, {
//             name: "John Doe",
//             isEnglish: true,
//             imageUrl: null
//         });
//     </script>
// </body>
// </html>