import { render } from "../pong/js/render.js";

// function beforGame(){
//     const newContent = document.createElement('div')
//     newContent.innerHTML = `
//         <div style="width :100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction: column; gap:10px;" >
//             <button id="tolocal" type="button" class="btn-home btn-secondary">Local</button>
//             <button id="toremote" type="button" class="btn-home btn-secondary">Remote</button>
//             <button id="toback" type="click" class="btn-home btn-secondary">Back</button>
//         </div>    
//     `;
//     return newContent;
// }

class GameTictac extends HTMLElement {

    constructor() {
        super();
    }
    togameHome(){
        document.getElementById('toback').addEventListener('click' , () => {
            console.log('TO GAME PAGE')
            const content = document.getElementById('content')
            content.innerHTML = '<pongxo-page></pongxo-page>';
        });
    }
    togameLocal(){
        document.getElementById('tolocal').addEventListener('click' , () => {
            console.log('TO GAME PAGE')
            const content = document.getElementById('content')
            content.innerHTML = '<h1>Add Your Local Game Here</h1>';
        });
    }
    togameRemote(){
        document.getElementById('toremote').addEventListener('click' , () => {
            console.log('TO GAME PAGE')
            const content = document.getElementById('content')
            content.innerHTML = '<h1>Add Your Remote Game Here</h1>';
        });
    }
    styleing = `
                <style>
                    :host {
                display: flex;
                height: 100%;
                width: 100%;
            }
            .game-tictac {
                display: flex;
                position :relative;
                font-family: "Pong War", sans-serif;
                color: var(--white);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            }
        .btn-home {
            width: 200px;
            height: 50px;
            background-color: rgba(228, 5, 47, 1);
            border-radius: 12px;
            border: none;
            font-size: 100%;
            z-index: 2000;
            color: #fff;
            cursor: pointer;
            transition: transform 0.3s ease;
            border :1px solid;
        }

        /* Scale effect on hover */
        .btn-home:hover {
            transform: scale(1.1);
        }
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
                    z-index :1000;
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
                    position :relative;
                    width :100%;
                    height :80%;
                    border-radius :0px;
                    display :flex;
                }
                }
                #game{
                    color :#fff;
                }
            </style>
    `;
    beforGame = `
    <div style="width :100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction: column; gap:10px;" >
        <button id="tolocal" type="button" class="btn-home btn-secondary">Local</button>
        <button id="toremote" type="button" class="btn-home btn-secondary">Remote</button>
        <button style="background:#787878;" id="toback" type="click" class="btn-home btn-secondary">Back</button>
    </div>    
    
    `
    rander(){
        // const menu = beforGame();
        this.innerHTML = `
            ${this.styleing}
            ${this.beforGame}
        `
    }
    connectedCallback(){
        this.rander();
        this.togameHome();
        this.togameLocal();
        this.togameRemote();
    }
}

customElements.define('game-tictac', GameTictac);
