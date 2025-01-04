
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
    async  init() {
        if (typeof window.ethereum !== 'undefined') {
            // Initialize web3 instance
            web3 = new Web3(window.ethereum);

            // Request account access2
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const btnwallet = document.getElementById('connectwallet');
                const first4 = accounts[0].slice(0, 4); // First 4 characters
                const last4 = accounts[0].slice(-4); // Last 4 characters

                // Combine them into the desired format
                const result = `${first4}...${last4}`;
                btnwallet.textContent = result;
                console.log('Connected account:', accounts[0]);
                // document.getElementById('connectwallet').addEventListener('mouseenter', () => {
                //     console.log("ADD HOVER HERE");

                //   });
                // document.getElementById('connectwallet').addEventListener('mouseleave', () => {
                //     console.log("ADD HOVER HERE");
                // });
                // Initialize contract instance
                // contract = new web3.eth.Contract(abi, contractAddress);
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else {
            console.log('Please install MetaMask!');
        }

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
                flex-direction: column;
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
        .btn-container {
            position: relative;
        }

        .main-btn {
            padding: 15px 30px;
            font-size: 16px;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .popup {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            width: 250px;
            display: none;
            text-align: center;
            z-index: 1000;
        }

        .popup::before {
            content: '';
            position: absolute;
            top: -10px;
            right: 20px;
            border-width: 0 10px 10px 10px;
            border-style: solid;
            border-color: transparent transparent white transparent;
        }
        .popup-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            justify-content: center;
        }

        .popup-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .popup-btn.primary {
            background-color: #3498db;
            color: white;
        }

        .popup-btn.secondary {
            background-color: #e74c3c;
            color: white;
        }

        .popup-btn:hover {
            transform: scale(1.05);
            opacity: 0.9;
        }
        @media (min-width: 320px) and (max-width: 1024px) {
            pongxo-page{
                flex-direction: column;
            }

          }
            </style>
                <div style="width: 90%; height: 5%; display: flex; justify-content: right; align-items: center;">
                    <div class="btn-container">
                    <button 
                        class="main-btn" 
                        type="button" 
                        id="connectwallet" 
                        style="background: var(--red); border: none;">
                        Connect Wallet
                    </button>
                    <div class="popup">
                        <h3 style="margin-top: 0;">Hello!</h3>
                        <p>Would you like to continue?</p>
                        <div class="popup-buttons">
                        <button class="popup-btn primary" >Confirm</button>
                        <button class="popup-btn secondary" >Cancel</button>
                        </div>
                    </div>
                    </div>
                </div>
            <div style="height:93%; display:flex;flex-direction: row; justify-content: center;align-items: center;" >
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
            </div>
        `;
        this.topong();
        const btnwallet = document.getElementById('connectwallet');
        btnwallet.addEventListener('click' , (e) =>{
            console.log("HERE WE ADD WALLET");
            this.init();
        })

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