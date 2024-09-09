
console.log("inside home page");
class homePage extends HTMLElement {

    template = `
    <div class="content-home" >
    <div class="cart-home" >
            <img  class="img-home" src="/images/astro4.png">
            <h3> <span class="title-home">Good evening,</span> CHEBCHOUB</h3>
            <h1>Stars of War</h1>
            <p>Zero-gravity PingPong tournament decides the galaxy's fate.
                Outplay opponents, uncover secrets, win peace.</p>
            <button class="btn-home" >let's play</button>
        </div>
    </div>
    `;
    style = `
        .nav-bar{
                display :flex;
            }
        .content-home{
            gap :10px;
        }
        .cart-home{
            height :39vh;
            background: linear-gradient(to left, #7c1c1a56 ,  rgba(255, 255, 255, 0.384));
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
            color : #7c1b1aab;
            font-size :100%;
            margin-bottom :20px;
        }
        .cart-home h3{
            margin-bottom :20px;
        }
        .cart-home p{
            margin-bottom :20px;
            font-size:180%;
            width:49vw;
        }
        .cart-home h1{
            // -webkit-text-stroke-width: 1px;
            // -webkit-text-stroke-color: rgb(248, 248, 248);
            color : #7c1b1aab;
            font-size:5vw;
            margin-bottom :20px;

        }
        .btn-home{
            width :10%;
            height:5vh;
            background-color: #7c1b1aab;
            border-radius:15px;
            border :none;
            font-size:100%;
            margin-top :20px;
        }
        `;
        // mask-image: linear-gradient(to right, transparent, #000, transparent);
    styleSlide = `
            .slide-static-Home{
                height :56vh;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius :25px;
                filters :blur(100px);
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
                gap :20%;
            }
        .slide-cart{
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction: column;
            height :280px;
            width :250%;
            border-radius: 18px;
            border :1px solid #FFF4;
            background: linear-gradient(to left, #7c1c1a56 ,  rgba(255, 255, 255, 0.1));
            border-bottom: 80px solid #7c1c1a56;
            position :relative;
            left :-100%;
            animation: autoRun 2s linear infinite;
            transition: 1s;
        }
        @keyframes autoRun{
            from {
                left -100%;
            }to{
                left :0%;
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
            background: linear-gradient(to left, #7c1c1a56 ,  rgba(255, 255, 255, 0.1));
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
        `;
        // tr:nth-child(even){
        //     background-color: #FFF4;
        //     text-align:left;
        // }
    templateHome = `
        <div class="slide-static-Home">
            <div class="slide-home"></div>
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
    constructor(){
        super();

    }
    rander(){
        this.innerHTML = `
            <style>
            ${this.style}
            ${this.styleSlide}
            ${this.styleStatic}
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
            { name: "Jane Doe", title: "KOLCHY KAMIHA", img: "../images/kawakib/kawkab1.png", }
          ];
        data.forEach(element => {
            const cartHome = document.querySelector('.slide-home');
            const cart = document.createElement('div');
            const cart1 = document.createElement('div');
            cart.innerHTML = `
            <div class="slide-cart" >
                    <div class="img-slid">
                        <img  src=${element.img}>
                    </div>
                    <div class="text-content">
                        <p class="text-cart" >${element.name}</p>
                        <h5 class="text-cart" >${element.title}</h5>
                    </div>
            </div>
            `;
            cart1.innerHTML = `
            <div class="slide-cart" >
                <div class="img-slid">
                    <img  src=${element.img}>
                </div>
            <p class="text-cart" >${element.name}</p>
            <h5 class="text-cart" >${element.title}</h5>
        </div>
        `;
            cartHome.appendChild(cart);
            // cartHome.appendChild(cart1);
        });
    }
    connectedCallback(){
        this.rander();
        this.getData();
        this.staticHome();
    }
}

customElements.define('home-page',homePage);