

import {fetchUserData} from './readData.js';


class profilePage extends HTMLElement {
    statsHistory = [];
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
            }
            .info-profile{
                height :100%;
                flex-basis: 20%;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap :0px;
            }
            .lvl-profile{
                height :80%;
                flex-basis: 40%;
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
                flex-basis: 40%;
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
            @media (min-width: 320px) and (max-width: 1024px) {
                    .img-profile{
                        display :none;
                    }
                    .cart-profile{
                        flex-direction: column;
                        height :50%;
                        width :100vw;
                        border-radius:0px;
                    }
                    .info-profile{
                        height :80%;
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
    }
}

customElements.define('profile-page', profilePage);

