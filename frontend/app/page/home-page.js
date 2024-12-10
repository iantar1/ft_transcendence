
// console.log("--somthing is cooking");

import {readData} from './readData.js';

import {fetchUserData} from './readData.js';
import {fetchUserMatchHistory} from './readData.js';


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
            <button class="btn-home btn btn-secondary" >let's play</button>
        </div>
    </div>
    `;
    style = `
        .nav-bar{
                display :flex;
            }
        .cart-home p{
            font-size:180%;
            width:50%;
        }
        .content-home{
            gap :10px;
            
        }
        .cart-home{
            height :39vh;
            background: #293247;
            border-radius:25px;
            overflow :hidden;
            padding :15px;
        }
        .img-home{
            position :absolute;
            left:65%;
            top :1%;
            width :35%;
            height :40.5%;
        }
        .cart-home span{
            color : #384B70;
            text-shadow :2px 2px 2px black;
            font-size :100%;
        }
        .cart-home h1{
            color : #384B70;
            font-size:5vw;
            text-shadow :2px 2px 2px black;
        }
        .btn-home{
            width :200px;
            height:50px;
            background-color: #384B70;
            border-radius:12px;
            border :none;
            font-size:100%;
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
                    font-size:100%;
                    width:100%;
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
                display: flex;
                justify-content: center;
                align-items: center;
                gap :10px;
            }
        .slide-home{
                height:52vh;
                width :50%;
                overflow :hidden;
                mask-image: linear-gradient(to right, transparent, #000, transparent);
                display :flex;
                align-items :center;
                justify-content: center;
                flex-direction: row;
                position :relative;
            }     
        .slide-cart{
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction: column;
            height :280px;
            width :22%;
            border-radius: 18px;
            border :1px solid #FFF4;
            background: #7E7C7C;
            border-bottom: 80px solid #293247;
            position :absolute;
            left :100%;
            animation: newRun 5s linear infinite;
            animation-duration :30s;
            transition: 1s;
        }
        @keyframes newRun{
            from {
                left 100%;
            }to{
                left :-100%;
            }
        }
        .slide-home:hover .slide-cart{
            animation-play-state: paused!important;
            filter: blur(3px);
            transform: scale(0.9);
        }
        .slide-home .slide-cart:hover{
            filter: blur(0);
            transform: scale(1.1);
            z-index: 1;
        }
        .items1{
            animation-delay :calc(30s / 8 * (8 - 1) * -1);
        }
        .items2{
            animation-delay :calc(30s / 8 * (8 - 2) * -1);
        }
        .items3{
            animation-delay :calc(30s / 8 * (8 - 3) * -1);
        }
        .items4{
            animation-delay :calc(30s / 8 * (8 - 4) * -1);
        }
        .items5{
            animation-delay :calc(30s / 8 * (8 - 5) * -1);
        }
        .items6{
            animation-delay :calc(30s / 8 * (8 - 6) * -1);
        }
        .items7{
            animation-delay :calc(30s / 8 * (8 - 7) * -1);
        }
        .items8{
            animation-delay :calc(30s / 8 * (8 - 8) * -1);
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
            border-radius :25px;
            border :1px solid #FFF4;
            overflow: hidden;
            background: #293247;

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
                height:100vh;
                width :100%;
                gap :100%;
            }
        .static-home{
                height:100vh;
                width:100%;
            }
        .slide-cart{
                   
                }
        }   
        `;
    templateHome = `
        <div class="slide-static-Home">
            <div class="slide-home">

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
                    background:#666f80;
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
    async getData(){
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
        var i = 0;
        data.forEach(element => {
            const cartHome = document.querySelector('.slide-home');
            i++;
            cartHome.innerHTML += `
            <div class="slide-cart ${'items' + i}" >
                    <div class="img-slid">
                        <img  src=${element.img}>
                    </div>
                    <div class="text-content">
                        <p class="text-cart" >${element.name}</p>
                        <h5 class="text-cart" >${element.title}</h5>
                    </div>
            </div>
        `;
        });
    }
    connectedCallback(){
        this.rander();
        this.getData();
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