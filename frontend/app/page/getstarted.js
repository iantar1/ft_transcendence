import {rander} from '../routing.js';


class getstartedPage extends HTMLElement {
    pageonestyle = `
        <style>
        .nav-bar{
                display :none;
            }
    .page-1{
        width: 100%;
        height :1820px;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        overflow-x: hidden;
    }
    #content{
        height: 100vh;
        width: 100vw;
        flex-basis: 100%;
        border-radius: 0;
    }
    .content-gsp{
        width :100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;      
    }
    .title-firstpg{
        font-size :5vw;
    }
    .firstpage-para{
        width :90vw;
        text-align :center;
        font-size :1.5vw;
    }
    .btn-firstpg{
        width : 214px;
        height :56px;
        border-radius :10px;
        background-color:#394C71;
        color :#fff;
        border :none;
        font-size :20px;
        box-shadow: 5px 5px black;
    }
    </style>
    `;

    pagetwostyle = `
        <style>
            .page-2{
                width :100%;
                height :600px;
                background:#222834;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            .page-2 h1{
                text-shadow: 2px 2px 2px black;
            }
            .page-2 span{
                color :#394D71;
                text-shadow: 2px 2px 2px black;
            }
            .team{
                width :950px;
                height :332px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                gap :30px;
            }
            .cartTeam{
                width :250px;
                height :332px;
                background:#D9D9D9;
                border-radius :25px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                box-shadow: 2px 5px 5px black;

            }
            .img-team{
                width:92%;
                height :70%;
                border-radius :25px;
                overflow: hidden;
            }
            .img-team img{
                width:100%;
                height :100%;
            }
            .nameTeam{
                width:75%;
                height :15%;
                position :relative;
                left:0;
                top:-5%;
                background:#394C71;
                border-radius :10px;
                box-shadow: 2px 3px 3px #222834;
                display: flex;
                justify-content: center;
                align-items: center;
                text-shadow: 2px 2px 2px black;

            }
        .iconTeam{
            width :80%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap :10px;
        }
        .iconTeam img{
            width :30px;
            height :30px;
        }
        </style>
    `;
    // class="progress" style="height: 100vh; width: 100vw;"
    // <img src="/images/back.png" class="progress" style="height: 100vh; width: 100vw;"></img>
    pageone = `
        <div class="page-1 ">
            <img src="/images/back.png" class="progress" style="height: 95vh; width: 100vw; background-size: cover;"></img>
                <div class="content-gsp" >
                    <h1 class="title-firstpg fw-bold fs-sm-4" > PingPong to determine</h1>
                    <h1 class="title-firstpg fw-bold fs-sm-4" >the galaxy's future. </h1>
                    <br>
                    <br>
                    <p class="firstpage-para fw-bold fs-sm-4" >In a distant galaxy, peace hinges on the Grand Galactic Tournament of zero-gravity ping pong. The Zephron Empire aims to dominate. </p>
                    <br>
                    <br>
                    <button type="click" class="btn-firstpg btn btn-secondary" data-link >Get started</button>
                </div>
            </div>
            `;
    // <img src="/images/ahbajaou.jpg">
    pagetwo = `
        <div class="page-2" >
            <h1 class="fw-bold" ><span>Team</span> Members</h1>
            <br>
            <br>
            <div class="team">

            </div>
        </div>
    `

    constructor() {
        super();
        console.log("inside super");
        // this.shadow = this.attachShadow({mode:'open'});
    }

    rander(){
        this.innerHTML = `
        ${this.pageonestyle}
        ${this.pagetwostyle}
        ${this.pageone}
        ${this.pagetwo}
        `;
        const sub = document.querySelector('.btn-firstpg');
        sub.addEventListener("click" , (e) => {
           e.target.href = '/login';
        });
        const form = [
            { player: "ahbajaou",  img: "/images/ah.jpg"},
            { player: "arahmoun", img: "/images/ara.png"},
            { player: "iantar", img: "/images/iantar.jpeg"}
          ];
          const cartHome = document.querySelector('.table-content');
          let cart = '';
          const teamCart = document.querySelector('.team');
        form.forEach(element => {
            teamCart.innerHTML += `
            <div class="cartTeam">
                <div class="img-team" >
                     <img src=${element.img}>
                </div>
                <div class="nameTeam" >
                        <h4>${element.player}</h4>
                </div>
                <div class="iconTeam" >
                     <img src="/images/icon/linkedin.png">
                     <img src="/images/icon/github.png">
                </div>
            </div>
    `;
            });
    }
    connectedCallback(){
        console.log("inside callback");
        this.rander();
        // this.eventHandler();
    }
    // disconnectedCallback(){
    //     // this.shadow.innerHTML = `<h1>super end</h1>`;
    //     console.log("inside dis");

    // }
}
customElements.define('getstarted-page',getstartedPage);

