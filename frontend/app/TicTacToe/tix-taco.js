import { render } from "../pong/js/render.js";
import { localTicTacToe } from "./local.js";
import { RemoteTicTacToe } from "./remote.js";

class GameTictac extends HTMLElement {

    constructor() {
        super();
        
    }

    // Observe the attributes 'width' and 'height'
    static get observedAttributes() {
        return ['width', 'height'];
    }

    // Update styles when attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'width') {
            this.style.setProperty('width', newValue);
        } else if (name === 'height') {
            this.style.setProperty('height', newValue);
        }
    }
    togameHome(){
        document.getElementById('toback').addEventListener('click' , () => {
            const content = document.getElementById('content')
            content.innerHTML = '<pongxo-page></pongxo-page>';
        });
    }
    togameLocal(){
        document.getElementById('tolocal').addEventListener('click' , () => {
            const content = document.getElementById('tictactoe_id')
            render(localTicTacToe(), content);
        });
    }
    togameRemote(){
        document.getElementById('toremote').addEventListener('click' , () => {
            const content = document.getElementById('tictactoe_id')
            render(RemoteTicTacToe(), content);
        });
    }
    styleing = `
    <style>
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: var(--custom-height, 100%);
            width: var(--custom-width, 100%);
        }

        .menu {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width : 100%;
        }
        .game-title {
            position: absolute;
            top: 50px;
            display: flex;
            font-family: "Pong War", "Freeware";
            font-weight: bold;
            font-size: 8vw;
            margin-bottom: 20px;
            text-align: center;
            color: var(--red);
            text-shadow: 2px 0 white, -2px 0 white, 0 2px white, 0 -2px white,
                    1px 1px white, -1px -1px white, 1px -1px white, -1px 1px white;

        }
        .game-tictac {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position :relative;
            font-family: "Pong War", sans-serif;
            color: var(--white);
            height: 100%;
            width: 100%;
        }
        
        .btn-secondary {
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
        .btn-secondary:hover {
            background-color: rgba(255, 15, 47, 0.5);
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
                justify-content: center;
                align-items: center;
            }
        }
        #game{
            color :#fff;
        }
    </style>
    `;
    beforGame = `
    <div class="menu" id="tictactoe_id">
        <div class="game-title" >Tic Tac Toe</div>
        <div style="width :100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction: column; gap:10px;" >
            <button id="tolocal" type="button" class="btn-home btn-secondary">Local</button>
            <button id="toremote" type="button" class="btn-home btn-secondary">Remote</button>
            <button style="background:#000;" id="toback" type="click" class="btn-home btn-secondary">Back</button>
        </div>
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
