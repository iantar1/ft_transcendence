
// console.log("--somthing is cooking");

import {readData} from './readData.js';

import {fetchUserData} from './readData.js';
import {fetchUserMatchHistory} from './readData.js';



// console.log(${img_1});
// readData.getData();
// const attt = [1 , 3 , 3 , 7 ];
// console.log(attt)
// readData.setData(attt);
// const dd = await fetchUserData();
// console.log(dd);
// readData.getData();
// const att = readData.getData()
// console.log(att);

console.log("inside home page");
// console.log("------" + readData.getData());

class homePage extends HTMLElement {
    info = [];
    match = [];
    template = `
    <div class="content-home " >
    <div class="cart-home" >
            <img  class="img-home" src="/images/astro4.png">
            <h3 class="title-home" >Good evening, <span id="username" >CHEBCHOUB</span></h3>
            <h1>Stars of War</h1>
            <p>Zero-gravity PingPong tournament decides the galaxy's fate.
                Outplay opponents, uncover secrets, win peace.</p>
            <button class="btn-home btn btn-secondary " >let's play</button>
        </div>
    </div>
    `;
    style = `
        .nav-bar{
                display :flex;
            }
        .cart-home p{
            font-size:100%;
            font-family: "Pong War", "Freeware";
            width:70%;
        }
        .content-home{
            gap :10px;
        }
        .cart-home{
            height :39vh;
            background: linear-gradient(-80deg, 
            rgb(4, 28,68, 1) 5%, 
            rgba(56, 75, 112, 0.2) 100%
            );
            border-radius:5px;
            overflow :hidden;
            padding :5px;
            z-index :2000;
            padding-left:15px;
        }
        .img-home{
            position :absolute;
            left:65%;
            top :1%;
            width :35%;
            height :40.5%;
        }
        .cart-home span{
            color : rgba(228, 5, 47, 1);
            text-shadow :2px 2px 2px black;
            font-size :100%;
        }
        .cart-home h1{
            font-family: "Pong War", "Freeware";
            font-size:5vw;
            letter-spacing: 2px;
            color: var(--red);
            font-shadow: 2px 2px 5px rgba(255, 255, 255, 1);
            z-index :2000;
            height :25%;
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
@media (min-width: 320px) and (max-width: 1024px) {
                .cart-home{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align :center;
                        width:100vw;
                        border-radius:5px;
                }
                .cart-home p{
                    font-size:80%;
                    width:100%;
                }
                .cart-home h1{
                    font-size:7vw;
                }
                .slide-cart{
                        width :100%;
                }
            }
        `;
        // mask-image: linear-gradient(to right, transparent, #000, transparent);
    styleSlide = `
        .slide-static-Home{
                height :56vh;
                flex-basis: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap :10px;
            }
        .slide-home{
                height:52vh;
                width :100%;
                flex-basis: 50%;
                mask-image: linear-gradient(to right, transparent, #000, transparent);
                display :flex;
                flex-direction: row;
                flex-wrap: wrap;
                overflow :hidden;
                align-items :center;
                justify-content: center;
                white-space: nowrap;
                position: relative;
            } 
        .scroll-container {
            position: relative;
            overflow: hidden;
            width :50vw;
        }
        .scroll-wrapper {
            display: flex;
            width: fit-content;
            will-change: transform;
            animation: scrollAnimation 10s linear infinite;
        }

        @keyframes scrollAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
        .scroll-item{
            display :flex;
            flex-direction: column-reverse;
            gap :10px;
        }
        .track-items{
            width :200px;
            height :200px;
            background:rgb(0 0 0 / 0.5);
            border-radius: 5px;
        }
        .scroll-track {
            display: flex;
            will-change: transform;
        }

        .scroll-item {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 250px;
            height: 300px;
            margin: 0 15px;
            background:  linear-gradient(0deg, 
            rgb(4, 28,68, 1) 100%, 
            rgba(56, 75, 112, 0.2) 100%
             );
            color: white;
            font-size: 24px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .scroll-wrapper:hover {
            animation-play-state: paused;
        }
        .img-slid img{
            height :150px;
            width :95%;
            filter: drop-shadow(0px 40px 20px  #1E1E1E );
        }
        .text-cart{
            position :relative;
            top:50px;
            text-align :center;
        }
        `;
    styleStatic = `
        .static-home{
            height:90%;
            width:48%;
            border-radius :5px;
            overflow: hidden;
            background:var(--blue);
        }
        .Player-img{
            height :44px;
            width :45px;
            border-radius :100px;
            vertical-align: middle;
            
        }
        .nav-static{
            width :100%;
            border-collapse: collapse;
            margin-top :10px;
        }
        th {
            text-align:left;
            padding-left :10px;
            height :5vh;
            border-bottom :1px solid #FFF4;
        }
        td {
            height :6vh;
            text-align:left;
            padding-left :10px;
            border-bottom :1px solid #FFF4;

        }
        @media (min-width: 320px) and (max-width: 1024px) {
                .slide-static-Home{
                    flex-direction: column;
                    height :100vh;
                }
        .slide-home{
                display :flex;
                align-items :center;
                justify-content: center;
                flex-direction: row;
                height:100vh;
                width :100vw;
                gap :5%;
            }
        .slide-cart{
            display :flex;
            align-items :center;
            justify-content: center;
        }
        .static-home{
                height:50vh;
                width:100%;
            }
            .scroll-container{
                width :100vw;
            }
        }   
        `;
    templateHome = `
        <div class="slide-static-Home">
            <div class="slide-home gap-4 ">
    <div class="scroll-container">
        <div class="scroll-wrapper">
            <div class="scroll-track">
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/champion.png">
                    </div>
                </div>
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/game-controller.png">
                    </div>
                </div>
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/onevsone.png">
                    </div>
                </div>
            </div>
            <div class="scroll-track">
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/champion.png">
                    </div>
                </div>
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/game-controller.png">
                    </div>
                </div>
                <div class="scroll-item">
                    <button class="btn-home btn btn-secondary " >let's play</button>
                    <div class="track-items" >
                        <img  class="w-100 h-100" src="/images/onevsone.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
            </div>
            <div class="static-home">
            <table class="nav-static">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Level</th>
                        <th>Game</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody class="table-content" ></tbody>
             </table>
            </div>
            </div>
            `;
        navBar = `
        @media (min-width: 320px) and (max-width: 1024px) {
                .nav-bar{
                    width: 100vw;
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
                }
                .nav-02{
                    margin-top:30px;
                }
                .nav-02 .fa-right-from-bracket{
                    display :none;
                }
            nav a{
                text-decoration: none;
                background: none;
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
        }
            `
    constructor(){
        super();

    }
    // <style>
    // ${this.style}
    // ${this.styleSlide}
    // ${this.styleStatic}
    // </style>
    // ${this.template}
    // ${this.templateHome}
    rander(){
        console.log("RANDER FUNCTION IS HERE");
        const uuss = async () => {
            this.info = await fetchUserData();
            this.match =  await fetchUserMatchHistory();
            console.log(this.info);
            console.log(this.match);
            document.getElementById('username').textContent = this.info.username
        }
        uuss();
        this.innerHTML = `
            <style>
            ${this.style}
            ${this.styleSlide}
            ${this.styleStatic}
            ${this.navBar}
            </style>
                ${this.template}
                ${this.templateHome}
            `;
    }
    staticHome(){
        const form = [
            { player: "Jam Josh", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Justina Kap", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Chris Colt", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Jane Doe", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Jane Doe", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Jane Doe", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"},
            { player: "Jane Doe", lvl: "1337", img: "../images/prof.jpeg", Exp: "1337",score: "25"}
          ];
          const cartHome = document.querySelector('.table-content');
          let cart = '';
        form.forEach(element => {
            cart += `
                <tr>
                    <td>
                        <img class="Player-img" src=${element.img}>
                        ${element.player}
                    </td>
                    <td>${element.lvl}</td>
                    <td>${element.Exp}</td>
                    <td>${element.score}</td>
                </tr>
            `;
            });
        cartHome.innerHTML = cart;
    }
    getData(){
        const data = [
            { name: "Jam Josh", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Justina Kap", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Chris Colt", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Jane Doe", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Jam Josh", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Justina Kap", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Chris Colt", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", },
            { name: "Jane Doe", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", }
          ];
          return data
        // var i = 0;
        // data.forEach(element => {
            // const test = '';
        //     const cartHome = document.querySelector('.slide-home');
        //     // i++;
        //     cartHome.innerHTML = `
        //     <div class="slide-cart ${'ictems' + 1}" >
        //             <div class="img-slid">
        //                 <img  src=${data[0].img}>
        //             </div>
        //             <div class="text-content">
        //                 <p class="text-cart" >${data[0].name}</p>
        //                 <h5 class="text-cart" >${data[0].title}</h5>
        //             </div>
        //     </div>
        //     <div class="slide-cart ${'itcems' + 1}" >
        //             <div class="img-slid">
        //                 <img  src=${data[0].img}>
        //             </div>
        //             <div class="text-content">
        //                 <p class="text-cart" >${data[0].name}</p>
        //                 <h5 class="text-cart" >${data[0].title}</h5>
        //             </div>
        //     </div>
        //     <div class="slide-cart ${'itcems' + 1}" >
        //             <div class="img-slid">
        //                 <img  src=${data[0].img}>
        //             </div>
        //             <div class="text-content">
        //                 <p class="text-cart" >${data[0].name}</p>
        //                 <h5 class="text-cart" >${data[0].title}</h5>
        //             </div>
        //     </div>
        //     <div class="slide-cart ${'itcems' + 1}" >
        //             <div class="img-slid">
        //                 <img  src=${data[0].img}>
        //             </div>
        //             <div class="text-content">
        //                 <p class="text-cart" >${data[0].name}</p>
        //                 <h5 class="text-cart" >${data[0].title}</h5>
        //             </div>
        //     </div>
        // `;
     
        // });
    }
    connectedCallback(){
        this.rander();
        // this.getData();
        this.staticHome();
    }
}

customElements.define('home-page',homePage);

    // const urlParams = new urlSearchParams(Window.location.search);
    // const urlParams = new URLSearchParams(window.location.search);
    // console.log(`here: ${window.location.search}`);


// async function getUserData()
// {
//     const accessToken = urlParams.get('access_token');
    

//     console.log(`first : ${accessToken}`);

//     const res =  await fetch("http://localhost:8000/user/", {
//         method: 'GET', 
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//     })
//     const data = await res.json();
//     console.log(data);
//     const h3Element = document.querySelector('h3');

//     h3Element.innerHTML = h3Element.innerHTML.replace('CHEBCHOUB', data.username);
//     console.log(`title home : ${ele}`);
//     return data;
// }

// const data = getUserData();