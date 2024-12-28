import { render } from './render.js';
import { menu } from './loby.js';
import { waitingPage } from './waiting.js';
import { GameOver } from './gameOver.js'
import { tournamentPage } from './tournament.js'
import { matchmakingPage } from './tournament_matchmaking.js';
import { tournamentlocal } from './localTournament.js';
import { manageLocalTournament } from './manage_local_tour.js';
// import { matchmakingPage } from './localmatchmaking.js';

import { createWinnerCard } from './winnerCard.js';


class GamePage extends HTMLElement {

    constructor() {
        super();
        const gameIcon = document.getElementById('game');
        // gameIcon.setAttribute('part','my0')
        // Create Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });


        // Create container div
        const main = document.createElement('div');
        main.classList.add('game-page');

        // create style

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                height: 100%;
                width: 100%;
            }
            .game-page {
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
 
        `;
        shadow.appendChild(style);
        shadow.appendChild(main);
        render(menu(), main);
    }

    connectedCallback(){
        this.innerHTML = `
            <style>
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
                    position: relative;
                    width :100vw;
                    height :100vh;
                    border-radius :0px;
                    display :flex;
                }
                }
                #game{
                    color :#fff;
                }
            </style>
        `
    }
}

customElements.define('game-page', GamePage);
