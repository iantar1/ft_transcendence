
// import {gamePage} from '/home/chebchoub/Desktop/ping/frontend/app/pong/js/gamePage.js'
import {fetchUserData , getCookie} from './readData.js';

import { navigateTo } from '../routing.js';
class gamePage extends HTMLElement {

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
                width :100vw;
                height :100vh;
                border-radius :0px;
                display :flex;
            }

    }`
    constructor(){
        super();
    }
    rander(){
        // <gamePage></gamePage>
        this.innerHTML = `
            <style>
            ${this.navar}
            #content{
                    display :flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius :5px;
            }
            pongxo-page{
                width :100%;
                height :100%;
                padding :0;
                margin :0;
                display :flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                flex-direction: row;
                gap :10px;
            }
            #game{ 
                    color: #fff; 
                }
        .scroll-item{
            display :flex;
            flex-direction: column-reverse;
            gap :10px;
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
        .track-items{
            width :200px;
            height :200px;
            background:rgb(0 0 0 / 0.5);
            border-radius: 5px;
        }
          @media (min-width: 320px) and (max-width: 1024px) {
            pongxo-page{
                flex-direction: column;
            }
          }
            </style>
            <div class="scroll-item">
                <button id="topong" style="background:var(--red); border :none;" class="btn-home btn btn-secondary " >let's play</button>
                <div class="track-items" >
                    <img  class="w-100 h-100" src="/images/pong.png">
                </div>
            </div>
            <div class="scroll-item">
                <button id="togame" style="background:var(--red); border :none;" class="btn-home btn btn-secondary " >let's play</button>
                <div class="track-items" >
                    <img  class="w-100 h-100" src="/images/xo.png">
                </div>
            </div>
        `;
        this.topong();
    }
    topong(){
        document.getElementById('topong').addEventListener('click' , e => {
            const content = document.getElementById('content')
            content.innerHTML = '<game-page></game-page>';
        });
    }
    connectedCallback(){
        // console.log("token is : " + getCookie('access'));
        if (!getCookie('access')){
            navigateTo('/login');
        }
        this.rander();
    }
}

customElements.define('pongxo-page',gamePage);