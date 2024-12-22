
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
        this.innerHTML = `
            <iframe class="ifif" id="django-iframe" src="http://10.32.129.124:8000" ></iframe>
            <style>
            ${this.navar}
            #content{
                    display :flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius :5px;
            }
<<<<<<< HEAD
            </style>
            <button type="button" class="btn btn-primary">game</button>
=======
            game-page{
                width :100%;
                height :100%;
                padding :0;
                margin :0;
            }
            iframe{
                width :100%;
                height :100%;
                border :0;
            }
            </style>
        
>>>>>>> iantar
        `;
    }
    connectedCallback(){
        this.rander();
    }
}

customElements.define('game-page',gamePage);