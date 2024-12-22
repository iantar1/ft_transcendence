

import {fetchUserData} from './readData.js';

import { navigateTo } from '../routing.js';

function serachBar(){
    return `
    <style>
        #search-container {
            margin: 20px auto;
            width: 100%;
            display :none;
            justify-content :center;
            align-items :center;
            flex-direction: column;
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
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
        <div id="overlay"></div>
        <div id="popup">
            <p id="popup-text"></p>
            <button onclick="closePopup()">Close</button>
        </div>
    </div>
    `;
}
function profSection(){
    return `
    <style>
        #profadd{
            display :none;
        }
    </style>
            <div id="profadd" style=" flex-direction: column; align-items :center; justify-content:center; gap :10px; width:100%; height :100%;" >
                <div style="width:100%; height :100%; display :flex; flex-direction: column; align-items :center; justify-content:center; gap :10px;">
                    <img style="position :static;  width: 80px; height: 80px; border-radius: 50%;"  src="/images/ah.png" >
                    <span>chebchoub</span>
                </div>
                <div style="width:100%; height :100%; display :flex; flex-direction: column; align-items :center; justify-content:center; gap :10px;" >
                    <button type="click" id="addfriend" style="background-color: #4CAF50;" class="btn-home btn btn-secondary " >Add Friend</button>
                    <button type="click" id="backtosearch" class="btn-home btn btn-secondary " >Back</button>
                </div>
            </div>
    `;
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
                    ${prof}
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

        </div>

    </div>
    `;
}

class profilePage extends HTMLElement {
    statsHistory = [];
    frienSection = addFriends();

    template = `
<<<<<<< HEAD
        <div class="content-profile .container">
=======
        <div class="content-profile ">
>>>>>>> iantar
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
<<<<<<< HEAD
                            <h5 class="opa" > Lvl 13 <span class="lvl-prof">7 more game hours for level</span></h5>
                            <br>
                            <div class="level"></div><br>
                        </div>
                        <div class="achev">
                            <h5 > <span class="lvl-prof"> Achievement : </span>4 of 37</h5>
                                <div class="ach"></div>
                                <div class="ach"></div>
                                <div class="ach"></div>
                                <div class="ach"></div>
                            
=======
                            <div class="progress">
                                <div class="progress-bar progress-bar-info progress-bar-striped active" style="width:10%; box-shadow:none;"></div>
                                <div class="progress-value">10%</div>
                            </div>
                        </div>
>>>>>>> iantar

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
<<<<<<< HEAD
            }
            .level{
                width :70%;
                height :16px;
                background-color: rgba(255, 255, 255, 0.384);
                border-left :180px solid rgba(56, 75, 112, 1);
                border-radius :15px;
=======
>>>>>>> iantar
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
<<<<<<< HEAD
=======
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
                width :10px;
                height :10px;
                border-radius :50%;
                z-index :4000;
                border :1px solid; 
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
>>>>>>> iantar
            @media (min-width: 320px) and (max-width: 1024px) {
                    .img-profile{
                        display :none;
                    }
                    .cart-profile{
<<<<<<< HEAD
                        flex-direction: column;
                        height :50vh;
                        width :100vw;
                        border-radius:0px;
                    }
                    .achev{
                        
                    }
=======
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
>>>>>>> iantar
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
<<<<<<< HEAD

=======
>>>>>>> iantar
            }
            .userInfo{
                height :100%;
                width :10vw;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: row;
                gap :5%;
<<<<<<< HEAD
=======
            }
            .userPart{
               min-height :50vh;
>>>>>>> iantar
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
<<<<<<< HEAD
                            width :100%;
                            background: none;
=======
                            width :100vw;
                            height :50vh;
                            background: none;
                            overflow: hidden;

>>>>>>> iantar
                        }
                        .userInfo{
                            flex-basis: 10%;
                            gap :1%;
                        }
                        .imgIcon{
                            width :90px;
                        }
<<<<<<< HEAD
=======
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
>>>>>>> iantar
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
<<<<<<< HEAD
        .cylcle-content{
            display :flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap :10px;
            height :100%;
            width :100%;
        }
=======
>>>>>>> iantar
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
<<<<<<< HEAD
            height :100%;
            display :none;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap :20px;
        }
        .small-cycle{
            width :8px;
            height:8px;
            border-radius :100%;
            background: rgba(34, 236, 90, 1);
            box-shadow: -2px -2px 7px rgba(34, 236, 90, 1),  
                  1px 1px 7px rgba(34, 236, 90, 1); 
        }
        .cycleAndprofit{
            width :100%;
            display :flex;
            align-items: center;
            flex-direction: row;
            gap :5px;
        }
        .cycle-base{
            width :100%;
            height :70%;
            border-radius :100%;
            background :rgba(26, 34, 50, 1);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .btn-average{
            width :60%;
            height :12%;
            border-radius :15px;
            background :rgba(34, 40, 52, 1);
            display :flex;
            align-items: center;
            justify-content: center;
            font-size :20px;
        }
        .progress-container {
            position: relative;
            width: 250px;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        /* Define the custom properties for win and lose progress */
        @property --win-progress-value {
          syntax: "<integer>";
          initial-value: 0;
          inherits: false;
        }
        
        @property --lose-progress-value {
          syntax: "<integer>";
          initial-value: 0;
          inherits: false;
        }
        
        @keyframes progress {
          to {
            --win-progress-value: 50;
            --lose-progress-value: 50;
          }
        }
        
        /* Styling for the combined progress bar */
        .progress-bar {
          display: flex;
          justify-content: center;
          align-items: center;
        
          width: 85%;
          height: 85%;
          border-radius: 50%;
          background: 
            radial-gradient(closest-side, rgba(26, 34, 50, 1) 79%, transparent 80% 100%),
            conic-gradient(
              from 0deg,
              rgba(113, 217, 182, 1) calc(var(--win-progress-value) * 0.33%),
              rgba(98, 182, 193, 1) calc(var(--win-progress-value) * 0.66%),
              rgba(82, 131, 197, 1) calc(var(--win-progress-value) * 1%),
              rgba(251, 135, 44, 1) 0 calc((var(--win-progress-value) + var(--lose-progress-value)) * 0.33%),
              rgba(164, 92, 205, 1) 0 calc((var(--win-progress-value) + var(--lose-progress-value)) * 0.66%),
              rgba(113, 64, 208, 1) 0 calc((var(--win-progress-value) + var(--lose-progress-value)) * 1%),
              rgba(36, 48, 72, 1) 0
            );
          animation: progress 2s 1 forwards;
        }
        
        /* Center text for the progress */
        .progress-bar::before {
          content: 'Win: ' var(--win-progress-value) '% | Lose: ' var(--lose-progress-value) '%';
          font-size: 16px;
        }
        
        #progress-text {
            position: relative;
            font-size: 34px;
            color: white;
            font-weight: bold;
        }
        
        .prog{
            width :426px;
            height :237px;
            border-radius :25px;
            backgdround:rgba(26, 34, 50, 1);
            position :absolute;
            top :45%;
        }
        .maskoff{
            width :100px;
            height :100px;
            border-radius :70px;
            background:rgba(26, 34, 50, 1);
            position :relative;
            left :0;
            top :-16%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .maskoff img{
            width :100%;
            height :100%;
        }
        .btn-prg{
            width :85%;
            height :15%;
            border-radius :25px;
            background :rgba(251, 135, 44, 1);
            position :relative;
            top :25%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .progwinlos{
            width :100%;
            height :45%;
            position :relative;
            left :0;
            top :200px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            
        }
        .prog2{
            border-right :1px solid #fff;
            border-left :1px solid #fff;
        }
        .itempr{
            width :100%;
            height :100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
=======
            height :90%;
            display :flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
>>>>>>> iantar
            gap :10px;
            
        }
        @media (min-width: 320px) and (max-width: 1024px) {
                .gameRank{
<<<<<<< HEAD
                    width :100%;
                    border-radius :0px;
                    height :100vh;

                }
             }
=======
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
>>>>>>> iantar
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
<<<<<<< HEAD
                    height :100vh;
                }

=======
                    height :130vh;
                    border-radius :0px;
                }
>>>>>>> iantar
             }
        </style>
    `;
    navar = `
    @media (min-width: 320px) and (max-width: 1024px) {
            .nav-bar{
                width: 100%;
                display: flex;
                height :8%;
<<<<<<< HEAD
                background:#666f80;
=======
                background-color: rgb(0 0 0 / 0.5);
                color: #293247;
>>>>>>> iantar
                justify-content: space-evenly;
                align-items: center;
                flex-direction: row;
                border-radius :0px;
                position: fixed;
                padding-bottom: 5%;
                bottom :0;
<<<<<<< HEAD
                z-index :1000;
            }
            .nav-02{
                display :none;
            }
=======
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
>>>>>>> iantar
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
<<<<<<< HEAD
    }
        `
=======
    }`
>>>>>>> iantar
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
        onevsone.innerHTML = from;
    }

    slidFriend(){
        const friendSection = document.querySelector('.flag'); // Access the first element with the class
        friendSection.addEventListener('click' , (e) =>{
                // friendSection.className = "test"
                document.querySelector('.forAdd').style.display = 'block';
                const serach = document.querySelector('.forAdd').innerHTML = slidFriend();
                document.querySelector('#search-container').style.display = "flex";
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
                            resultsDiv.innerHTML = `<ul>${filteredData.map(item => `<li class="resdiv" type="click" >${item}</li>`).join('')}</ul>`;
                        } else {
                            resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
                        }
                    }
                }
                if (document.querySelector('.resdiv')){
                    document.querySelector('.resdiv').addEventListener('click' , (e) => {
                        document.querySelector('#search-container').style.display = "none";
                        document.querySelector('#profadd').style.display = "flex";
                        document.querySelector('#backtosearch').addEventListener('click' , (e) => {
                            document.querySelector('#profadd').style.display = "none";
                            document.querySelector('#search-container').style.display = "flex";
                        });
                        document.querySelector('#addfriend').addEventListener('click' , (e) => {
                            console.log('HERE WE ADD THE FETCH FUNCTION');
                        });
                    });
                    
                }
  
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
    openProfile() {
        const openProfileElements = document.querySelectorAll('#openprof'); // Select all with the class 'profsign'
    
        openProfileElements.forEach(field => {
            field.addEventListener('click', (e) => {
                // const currentElement = e.currentTarget;
                // const index = currentElement.dataset.index; // Get the index from the data attribute
                // document.querySelector('.foradd').style.display = "flex";
                document.querySelector('.forsddProf').innerHTML = slidFriend();
                    document.querySelector('#profadd').style.display = "flex";
    
                // Dynamically handle the back button
                const backToSearch = document.querySelector('#backtosearch');

                backToSearch.addEventListener('click' , (e) => {
                    console.log("THERE IS THE BACK BUTTON");
                    document.querySelector('#profadd').style.display = "none";
                    document.querySelector('.logout-popup').style.display = 'none';
                });
    
                console.log(`Profile clicked`);
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
        this.statsHistory.forEach((element) => {
            // index++;
            prof += `
                <span class="profsign d-flex justify-content-center align-items-center flex-column" data-index="${index}">
                    <img id="openprof" type="click" style="position: static; width: 50px; height: 50px; border-radius: 50%; border: 1px solid;" src="${element.img}">
                    <span class="sign" style="background: ${element.status};"></span>
                    <span id="" class="forsddProf" style=""></span>
                </span>
            `;
            console.log('openprof-' + index)
        });
        main.innerHTML = prof;
    }
    
    render() {
        console.log("RANDER FUNCTION IS HERE AT THE PROFILE PAGE");
        const uuss = async () => {
            this.info = await fetchUserData();
<<<<<<< HEAD
            console.log(this.info.image);
            document.getElementById('username').textContent = "CHEBCHOUB"
            // document.getElementById('username').textContent = this.info.username
            document.getElementById('img_intra').src = this.info.image
            console.log(this.info.image);
            document.getElementById('BIO').textContent = 'ash dal temchi lzine'
=======
            if (this.info){
                console.log(this.info.image);
                if (!this.info.username){
                    this.info.username = "ASTRO"
                }
                if (!this.info.image){
                    this.info.image = "/images/default.jpeg"
                }
                document.getElementById('username').textContent = this.info.username
                // document.getElementById('username').textContent = this.info.username
                document.getElementById('img_intra').src = this.info.image
                console.log(this.info.image);
                document.getElementById('BIO').textContent = 'ash dak temchi lzine'
            }
            else{
                navigateTo('/login');
            }
>>>>>>> iantar
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
<<<<<<< HEAD
=======
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
>>>>>>> iantar
            </style>
        `;

        this.querySelector('.cycle-progress').innerHTML = this.cycleProgress;   
        // cycleProg();
        // this.cycleRander();
<<<<<<< HEAD
        const form = [
            { player: "ahbajaou",  img: "/images/ah.png"},
            { player: "arahmoun", img: "/images/ara.png"},
            { player: "iantar", img: "/images/iantar.jpeg"}
          ];
        const losrWin = document.querySelector('.winorlose');
        form.forEach(element => {
            losrWin.innerHTML += `
            <div class="userleft" >
                <div class="userInfo" >
                        <div class="imgIcon" >
                            <div class="img-user" >
                                <img src="${element.img}" >
                            </div>
                            <div class="winIcon" >
                                <img src="/images/icon/badge.png" >
                                <p class="noonehere" >ahbajaou</p>
                            </div>
                        </div>
                        <div class="name-user" >
                            <h5>${element.player}</h5>
                        </div>
                        <div class="score-user" >
                                <h2>0</h2>
                        </div>
                </div>
                <div class="time-user">
                    <img src="/images/icon/ping.png" >
                    <h6>24-10-2030;20:23</h6>
                </div>
                <div class="userInfo" >
                    <div class="score-user" >
                            <h2>0</h2>
                    </div>
                    <div class="name-user name-userright" >
                        <h5>${element.player}</h5>
                    </div>
                    <div class="imgIcon" >
                        <div class="img-user" >
                            <img src="${element.img}" >
                        </div>
                        <div class="winIcon" >
                            <img src="/images/icon/lose.png" >
                            <p class="noonehere" >ahbajaou</p>
                        </div>
                    </div>
                </div>
            </div>
        `;;
            });
=======
        // losrWin.appendChild(onevsone);
            // });
>>>>>>> iantar
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

