class profilePage extends HTMLElement {

    template = `
        <div class="content-profile">
                <div class="cart-profile">
                    <div class="info-profile">
                        <img src="../images/profile.png" >
                        <h3>CHEBCHOUB</h3>
                        <button class="btn-profile" >Edit</button>
                    </div>
                    <div class="lvl-profile">
                        <div class="bio-profile">
                            <h5>Bio</h5>
                            <br>
                            <h5>It has survived not only five centuries..</h5>
                        </div>
                        <div class="lvl">
                            <h5 class="opa" > Lvl 13 <span class="lvl-prof">7 more game hours for level</span></h5>
                            <br>
                            <div class="level"></div>
                        </div>
                        <div class="achev">
                            <h5 > <span class="lvl-prof"> Achievement : </span>4 of 37</h5>
                            <div class="ach"></div>
                            <div class="ach"></div>
                            <div class="ach"></div>
                            <div class="ach"></div>

                        </div>
                    </div>
                    <div class="img-profile">
                        <img src="../images/astro5.png" >
                    </div>
                </div>
        </div>
        <div class="static-profile"></div>
    `;
    constructor() {
        super();
    }
    render() {
        this.innerHTML = `
            <style>
            .nav-bar{
                display :flex;
                }
            .content-profile{
                gap:10px;
            }
            .cart-profile{
                height :21.5vw;
                background: linear-gradient(to left, #7c1c1a56 ,  rgba(255, 255, 255, 0.384));
                border-radius:25px;
                padding :15px;
                display :flex;
                justify-content: center;
                align-items: center;
            }
            .info-profile{
                height :100%;
                flex-basis: 20%;
                display :flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap :20px;

            }
            .lvl-profile{
                height :100%;
                flex-basis: 40%;
                display :flex;
                justify-content: center;
                flex-direction: column;
                gap :75px;
            }
            .level{
                width :70%;
                height :16px;
                background-color: rgba(255, 255, 255, 0.384);
                border-left :180px solid #7c1b1aab;
                border-radius :15px;
            }
            .lvl-profile .lvl-prof{
                  opacity:0.4;
            }
            .achev{
                gap :30px;
                display :flex;
                align-items: center;
            }
            .achev h5 {
                position :relative;
                top: 46px;
                height :60px;
            }
            .ach{
                width :10%;
                height :60px;
                border-radius :10px;
                background-color: rgba(255, 255, 255, 0.384);
            }
            .info-profile img{
                width :52%;
                height :50%;
                border-radius:50%;
            }
            .btn-profile{
                width :52%;
                height :12%;
                background-color: #7c1b1aab ;
                border :none;
                border-radius:15px;
            }
            .img-profile{
                height :100%;
                flex-basis: 40%;
            }
            .img-profile img{
                width :40vw;
                height :22.8vw;
                position :absolute;
                top :0%;
                left :59%;
            }
            .static-profile{
                height :56vh;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius :25px;
            }
            </style>
            ${this.template}
        `;
    }
    connectedCallback() {
        this.render();
    }
}

customElements.define('profile-page', profilePage);