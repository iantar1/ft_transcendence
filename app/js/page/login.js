import {rander} from '../routing.js';

class loginPage extends HTMLElement {

    register = `
        <form id="form-resiter" class="form-login" action="" >
                <div class="input-btn" >
                <input name="Firstname" placeholder="Firstname" class="input" type="text" id="username" required />
                </div>
                <div class="input-btn" >
                <input name="Lastname" placeholder="Lastname" class="input" type="text" id="username"  required/>
                </div>
                <div class="input-btn" >
                    <input name="Username" placeholder="Username" class="input" type="text" id="username"  required/>
                </div>
                <div class="input-btn" >
                    <input name="Email" placeholder="Email" class="input" type="text" id="username"  required/>
                </div>
                <div class="input-btn" >
                    <input name="Password" placeholder="Password" class="input" type="text" id="username"  required/>
                </div>
                <br>
                <button id="register" class="form-btn"  type="click" data-link >Register</button>
            </form>
    `;
    login = `
            <form id="form" class="form-login" action="" >
                <div class="input-btn" >
                    <input placeholder="Email" class="input" type="text" id="username"  required/>
                </div>
                <div class="input-btn" >
                    <input placeholder="Password" class="input" type="text" id="username"  required/>
                </div>
                <br>
                <button class="form-btn"  type="button"  >Log in</button>
            </form>
    `;
    formA = `
                <div id="login-register" >
                        <div class="hover-btn" ></div>
                        <button class="login-register-btn"   type="click"  >Log in</button>
                        <button class="login-register-btn color-btn sub-event"  type="click"  >Register</button>
                </div>
                <br>
                <br>
                <div class="social-icon" >
                    <img src="/images/icon/icon1.png">
                    <img src="/images/icon/icon2.png">
                </div>
                <br>
                <br>
                <div class="loginRegister" >
               
                </div>
    `;
    template = `
    <div class="carte-content">
            <div class="login-img layout">
                <img src="/images/astro3.png">
                <div class="cycle-cart"></div>
            </div>
            <div class="login-cart layout">
            </div>
        </div>
                `;
    // <button class="login-btn-42 login" ><a  href='/home' type="click" data-link id="btn-log">login</a></button>
    style =  `
    .carte-content{
        width :100vw;
        height :100vh;
        display :flex;
        align-items :center;
        justify-content: space-around;
    }
    .layout{
            display :flex;
            align-items :center;
            justify-content: center;
            width :50%;
            height :100vh;
        }
    .tit{
        opacity: 0.6;
    }
    .cycle-cart{
            position: absolute;
            height: 20%;
            width: 10%;
            border-radius: 400px;
            background: white;
            filter: blur(60px);
            z-index: -1;
        }
        .nav-bar{
            display :none;
        }
        .login-content{
            width :70%;
            height:80%;
            border-radius :25px;
            background: linear-gradient(to right, #7c1c1a56 ,  rgba(255, 255, 255, 0.384));
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction:column;
        }
        .login-img img{
            width :100%;
            height :100%;
        }
        #content{
            width :100vw;
            height :100vh;
        }
        .login-register-btn{
            background: transparent;
            border :none;
            color :#fff;
            font-size :1vw;
            z-index :1;
            width :100%;
            height :100%;
            border-radius :25px;

        }
        #login-register{
            width :60%;
            height :6%;
            background: #D9D9D9;
            border-radius :25px;
            display :flex;
            align-items :center;
            justify-content: space-around;
            position :relative;
            z-index :0;
        }
        .color-btn{
            color :#670505 ;
            z-index :1;
        }
        .hover-btn{
            position :absolute;
            left :0;
            top :0;
            width :50%;
            height :100%;
            background-color: #670505;
            border-radius :25px;
        }
        .social-icon{
            gap :30px;
            width :60%;
            display :flex;
            align-items :center;
            justify-content: center;
        }
        .form-login{
            gap :30px;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction: column;
            width :100%;
            height :100%;
            
        }
        .input-btn{
            width :100%;
            height :10%;
        }
        .input {
            width :100%;
            height :100%;
            background :transparent;
            border :none;
            border-bottom: 1px solid #fff;
        }
        .form-btn{
            width :100%;
            height :10%;
            background: #670505;
            border-radius :25px;
            border :none;
            font-size :1vw;
        }
        .loginRegister{
            width :60%;
            height :60%;
             overflow: hidden;
        }
        .form-login-siwtch{
            width :200%;
            height :100%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction: row;
        }
        #form-resiter{
            position :relative;
            left :50%;
            top :0;
        }
        .form-login{
            position :relative;
            left :0;
            top :0;
        }
  
    `;
    constructor() {
        super();
        console.log("inside super");
        // this.shadow = this.attachShadow({mode:'open'});
        }
        subRegister(){
            const clickEvent = document.querySelector("#register");
            clickEvent.addEventListener('click',(e) =>{
                const form = document.querySelector("#form-resiter");
                console.log('---REGISTER FORM----');
                const fromData = new FormData(form);
                const data = Object.fromEntries(fromData);
                console.log(data);
            })

        }
        rand(){
            this.innerHTML = `
            <style>
            ${this.style}
            </style>
            ${this.template}
            `;
                const loginCart = document.querySelector('.login-cart');
                const contentCart = document.createElement('div');
                contentCart.className = 'login-content';
                contentCart.innerHTML = `
                     ${this.formA}
                `;
                loginCart.appendChild(contentCart);
                const aa = document.querySelector('.loginRegister');
                const bb = document.createElement('div');
                bb.className = "form-login-siwtch";
                bb.innerHTML = `
                    ${this.login}
                    ${this.register}
                `;
                aa.appendChild(bb);
                const loginEven = document.querySelector('.login-register-btn');
                const registerEven = document.querySelector('.sub-event');
                loginEven.addEventListener('click', (e) =>{
                    e.preventDefault();
                    var a = document.querySelector('.hover-btn');
                    var d = document.querySelector('.form-login');
                    var c = document.querySelector('#form-resiter');
                    c.style.left = "100%";
                    a.style.left = "0";
                    d.style.left = "0";
                    d.style.transition =  "1s";
                });
                registerEven.addEventListener('click', (e) =>{
                    console.log("----INSIDE REGISTER HERE----");
                    var a = document.querySelector('.hover-btn');
                    var b = document.querySelector('.sub-event');
                    var c = document.querySelector('#form-resiter');
                    var d = document.querySelector('.form-login');
                    a.style.left = "50%"
                    a.style.transition =  "1s";
                    c.style.transition =  "1s";
                    b.style.color = "#FFF";
                    c.style.left = "-50%";
                    d.style.left = "-80%";
                    e.preventDefault();

                });
                this.subRegister();
                
            }
        connectedCallback(){
        this.rand();
    }
}

customElements.define('login-page',loginPage);
