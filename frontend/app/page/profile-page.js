

import {fetchUserData} from './readData.js';


class profilePage extends HTMLElement {

    template = `
        <div class="content-profile">
                <div class="cart-profile">
                    <div class="info-profile">
                        <img id="img_intra" src="../images/profile.png" >
                        <h3 id='username' >CHEBCHOUB</h3>
                        <button class="btn-profile" >Edit</button>
                    </div>
                    <div class="lvl-profile">
                        <div class="bio-profile">
                            <h5>Bio</h5>
                            <br>
                            <h5 id="BIO" ></h5>
                        </div>
                        <div class="lvl">
                            <h5 class="opa" > Lvl 13 <span class="lvl-prof">7 more game hours for level</span></h5>
                            <br>
                            <div class="level"></div>
                        </div>
                        <div class="achev">
                            <h5 > <span class="lvl-prof"> Achievement : </span>4 of 37</h5>
                            <div class="ach"></div>
                            <div class="ach"></div>
                            <div class="ach"></div>
                            <div class="ach"></div>

                        </div>
                    </div>
                    <div class="img-profile">
                        <img src="../images/astro5.png" >
                    </div>
                </div>
        </div>
    `;
    templatStyle = `
        <style>
            .nav-bar{
                display :flex;
                }
            .content-profile{
                gap:10px;
            }
            .cart-profile{
                height :39vh;
                background: #293247;
                border-radius:25px;
                padding :15px;
                display :flex;
                justify-content: center;
                align-items: center;
            }
            .info-profile{
                height :100%;
                flex-basis: 20%;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap :20px;

            }
            .lvl-profile{
                height :100%;
                flex-basis: 40%;
                display :flex;
                justify-content: center;
                flex-direction: column;
                gap :75px;
            }
            .level{
                width :70%;
                height :16px;
                background-color: rgba(255, 255, 255, 0.384);
                border-left :180px solid rgba(56, 75, 112, 1);
                border-radius :15px;
            }
            .lvl-profile .lvl-prof{
                  opacity:0.4;
            }
            .achev{
                gap :30px;
                display :flex;
                align-items: center;
            }
            .achev h5 {
                position :relative;
                top: 46px;
                height :60px;
            }
            .ach{
                width :10%;
                height :60px;
                border-radius :10px;
                background-color: rgba(255, 255, 255, 0.384);
            }
            .info-profile img{
                width :52%;
                height :50%;
                border-radius:50%;
            }
            .btn-profile{
                width :52%;
                height :12%;
                background-color: rgba(56, 75, 112, 1);
                border :none;
                border-radius:15px;
            }
            .img-profile{
                height :100%;
                flex-basis: 40%;
            }
            .img-profile img{
                width :40vw;
                height :42.5%;
                position :absolute;
                top :-1%;
                left :59%;
            }
        </style>
    `;
    winorLose = `
    <div class="winorlose">
            <h3>Match History</h3>
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
                gap :35px;

            }
            .userInfo{
                flex-basis: 30%;
                height :100%;
                display :flex;
                justify-content: center;
                align-items :center;
                flex-direction: row;
                gap :10px;
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
                backdsground: url(/images/ah.png)  no-repeat center center;
            }
            .img-user img{
                width :100%;
                height :100%;
            }
            .score-user{
                width :15%;
                height :60%;
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
            .time-user img {
                width :38%;
                height :80%;
            }

        </style>
    `;
    gameRank = `
        <div class="gameRank">
            <div class="cycle-progress" >
                <div class="cylcle-content" >
                    <div class="cycleAndprofit" >
                        <div class="small-cycle" ></div>
                        <h5>Total Profit</h5>
                    </div>
                    <div class="cycle-base" >
                    <div class="progress-bar">
                    <span id="progress-text">0%</span>
                    </div>
                    </div>
                    <div class="btn-average" >
                        <h5>Average Profit</h5>
                    </div>
                </div>
            </div>
            <div class="cont-progress" >
                    <div class="maskoff">
                        <img src="/images/do.png" >
                    </div>
                    <div class="prog">
                        <div class="progwinlos" >
                                <div class="prog1 itempr">
                                    <h5>50% Lose</h5>
                                    <div class="lose prls" ></div>
                                </div>
                                <div class="prog2 itempr">
                                    <h5>50% Lose</h5>
                                    <div class="av prls" ></div>
                                </div>
                                <div class="prog3 itempr">
                                    <h5>50% Lose</h5>
                                    <div class="win prls" ></div>
                                </div>
                        </div>
                        <img src="/images/sub.png" >
                    </div>
                    <div class="btn-prg" >
                            <h3>Game Profit</h3>
                    </div>
            </div>
        </div>
    `;
    gamerankStyle = `
    <style>
        .gameRank{
                width :50%;
                height :52vh;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                background: #293247;
                border-radius :25px;
            }
        .cylcle-content{
            display :flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap :10px;
            height :100%;
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
            height :100%;
            display :flex;
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
            width :350px;
            height :350px;
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
            top :120px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .progwinlos{
            width :100%;
            height :120px;
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
            gap :10px;
            font-size :18px;
        }
        .prls{
            width :75%;
            height :18%;
            border-radius:15px;
        }
        .lose{
                background: linear-gradient(
            to right, 
            rgba(113, 217, 182, 1), 
            rgba(98, 182, 193, 1), 
            rgba(82, 131, 197, 1)
            );
            box-shadow: 
                    3px 3px 15px  rgba(113, 217, 182, 1), 
                    -3px -3px 15px rgba(82, 131, 197, 1);
        }
        .av{
            background:rgba(251, 135, 44, 1);
            box-shadow: 
                    3px 3px 15px  rgba(251, 135, 44, 1), 
                    -3px -3px 15px rgba(251, 135, 44, 1);
        }
        .win{
                background: linear-gradient(
            to right, 
            rgba(251, 135, 44, 1), 
           rgba(164, 92, 205, 1), 
            rgba(113, 64, 208, 1)
            );
            box-shadow: 
                    3px 3px 15px  rgba(251, 135, 44, 1), 
                    -3px -3px 15px rgba(113, 64, 208, 1);
        }
    </style>
    `;
    // background: radial-gradient(closest-side, rgba(34, 40, 52, 1) 80%, transparent 80% 100%),
    // conic-gradient(rgba(113, 217, 182, 1) calc(var(--progress-value) * 1%),rgba(36, 48, 72, 1) 0);
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
                height :52vh;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #293247;
                border-radius :25px;
                gap :30px;
            }
        </style>
    `;
    constructor() {
        super();
    }
    cycleRander(){
        // let progress = 87;  // Example progress value
        const progressText = document.getElementById('progress-text');
        
        function updateProgress(percentage) {
          progressText.textContent = `${percentage}%`;
        }
    }
    render() {
        console.log("RANDER FUNCTION IS HERE AT THE PROFILE PAGE");
        const uuss = async () => {
            this.info = await fetchUserData();
            console.log(this.info.image);
            document.getElementById('username').textContent = this.info.username
            document.getElementById('img_intra').src = this.info.image
            document.getElementById('BIO').textContent = 'ash dal temchi lzine'
        }
        uuss();
        this.innerHTML = `
            ${this.template}
            ${this.templatTwo}
            ${this.templatStyle}
            ${this.templatwoStyle}
            ${this.winorLoseStyle}
            ${this.gamerankStyle}
        `;
        // this.cycleRander();
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
                        </div>
                    </div>
                </div>
            </div>
        `;;
            });
    }
    connectedCallback() {
        this.render();
    }
}

customElements.define('profile-page', profilePage);