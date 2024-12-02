


import {rander} from '../routing.js';

class loginPage extends HTMLElement {

    register = `
            <form id="form-resiter" class="form-login"  >
                    <div class="group">      
                        <input name="first_name"  class="input" type="text" required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Firstname</label>
                    </div>
                    <div class="group">      
                        <input name="last_name"  class="input" type="text"  required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Lastname</label>
                    </div>
                    <div class="group">      
                        <input name="username" class="input" type="text"   required/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Username</label>
                    </div>
                    <div class="group">      
                        <input name="email"  class="input" type="email" "  required/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Email</label>
                    </div>
                    <div class="group">      
                        <input name="password"  class="input" type="password" id="password"  required/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Password</label>
                    </div>
                    <span class="otp-error" ></span>
                    <br>
                    <br>
                    <button id="register" class="form-btn"  type="click" data-link >Register</button>
                </form>
            `;
    login = `
            <form  id="formLogin" class="form-login" action="" >
                <div class="group">      
                    <input name="username"  type="text" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Username</label>
                </div>
                <div class="group">      
                    <input name="password"  type="password" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>
                <span class="otp-error" ></span>
                <br>
                <br>
                    <input id="formLogin2" class="form-btn" type="submit" value="Log in"  />
                </form>
                `;
                // <button id='loginForm' class="form-btn"  type="submit"  data-link >Log in</button>
    formA = `
                <div id="login-register" >
                        <div class="hover-btn" ></div>
                        <button class="login-register-btn"   type="click"  >Log in</button>
                        <button class="login-register-btn color-btn sub-event"  type="click"  >Register</button>
                </div>
                <br>
                <div class="social-icon" >
                    <button class="redirapi_inta"   type="click"  ><span><img src="/images/icon/icon1.png"></span></button>
                    <button class="redirapi_google"   type="click"  ><span><img src="/images/icon/icon2.png"></span></button>
                </div>
                <br>
                <br>
    `;
    iconStyle = `
        .social-icon{
            gap :30px;
            width :100%;
            display :flex;
            align-items :center;
            justify-content: center;
        }
        .social-icon img{
            width :50px;
            height :50px;
        }
    `;
    opt = `
        <div class="otp-content" >
            <form id="otp-code" action="">
                    <h2>Authenticate Your Account</h2>
                    <h5>Authorization code sent to your email</h5>
                <br>
                    <div class="group">      
                        <input name="otp"  type="text" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Code</label>
                    </div>
                    <span class="otp-error" ></span>
                <br>
                <br>
                <p>It may take a minute to receive your code.</p>
                <br>
                <input id="otp-btn"  class="form-btn" type="submit" value="Submite"  />
            </form>
        </div>
    `;
    optStyle = `
        #otp-code{
            width :100%;
            text-align :center;
        }

    `;
    template = `
    <div class="carte-content">
            <div class="login-img">
                <img src="/images/login.png">
                <div class="loginComment" >
                    
                </div>
            </div>
            <div class="login-content" >
                <div class="login-cart">

                </div>
            </div>
        </div>
                `;
    fomrAstyle = `
        .login-register-btn{
            background: transparent;
            border :none;
            color :#fff;
            font-size :18px;
            z-index :1;
            width :100%;
            height :100%;
            border-radius :25px;

        }
        #login-register{
            width :300px;
            height :40px;
            background: #7E7C7C;
            border-radius :25px;
            display :flex;
            align-items :center;
            justify-content: space-around;
            position :relative;
            z-index :0;
        }
        .color-btn{
            color :#fff ;
            z-index :1;
        }
        .hover-btn{
            position :absolute;
            left :0;
            top :0;
            width :50%;
            height :100%;
            background-color: #384B70;
            border-radius :25px;
        }
        .login-content{
            width :100%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction:column;

        }
        .form-login-siwtch{
            width :100%;
            height :70%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction: row;
            overflow: hidden;
        }
        #form-resiter{
            position :relative;
            left :50%;
            top :0;
        }
        .form-login{
            position :relative;
            left :35%;
            top :0;
        }

    `;
    loginStyle = `
        .form-login{
            width :100%;
        }
        .form-btn{
            border-radius: 8px;
            box-shadow: 0 2px 5px 0 #000;
            background: #384B70;
            font-size: 18px;
            height: 41px;
            padding: 0 11px;
            text-align: center;
            width: 100%;
            min-width: 200px;
            font-weight: 500;
            color: #D9D9D9;
        }
        .form-btn:hover{
            background: #7E7C7C;
            border-color: #000;
            box-shadow: 0 2px 5px 0 #000;
        }
    `;
    registerStyle = `
        #form-resiter{
            width :100%;
        }
    `;
    loginRegisterStyle = `
            .group { 
                position:relative; 
                margin-bottom:25px; 
                }

                input {
                    font-size:18px;
                    display:block;
                    width:300px;
                    border:none;
                    border-bottom:1px solid #757575;
                    padding:10px 10px 10px 5px;
                    color :#D9D9D9;
                    background : transparent;
                }
                input:focus { 
                outline:none; 
                }

                /* LABEL ======================================= */
                label{
                    color:#D9D9D9;
                    font-size:18px;
                    font-weight:normal;
                    position:absolute;
                    pointer-events:none;
                    left:5px;
                    top:10px;
                    transition:0.2s ease all; 
                    -moz-transition:0.2s ease all; 
                    -webkit-transition:0.2s ease all;
                }

                /* active state */
                input:focus ~ label, input:valid ~ label{
                    top:-20px;
                    font-size:14px;
                    color:#D9D9D9; 
                }

                /* BOTTOM BARS ================================= */
                .bar {
                 position:relative; display:block; width:300px; 
                }
                .bar:before, .bar:after{
                    content:'';
                    height:2px; 
                    width:0;
                    bottom:1px; 
                    position:absolute;
                    background:#384B70; 
                    transition:0.2s ease all; 
                    -moz-transition:0.2s ease all; 
                     -webkit-transition:0.2s ease all;
                }
                .bar:before {
                     left:50%;
                }
                .bar:after {
                    right:50%; 
                }

                /* active state */
                input:focus ~ .bar:before, input:focus ~ .bar:after {
                    width:50%;
                }

                /* HIGHLIGHTER ================================== */
                .highlight {
                    position:absolute;
                    height:60%; 
                    width:100px; 
                    top:25%; 
                    left:0;
                    pointer-events:none;
                    opacity:0.5;
                }

                /* active state */
                input:focus ~ .highlight {
                    -webkit-animation:inputHighlighter 0.3s ease;
                    -moz-animation:inputHighlighter 0.3s ease;
                    animation:inputHighlighter 0.3s ease;
                }

                /* ANIMATIONS ================ */
                @-webkit-keyframes inputHighlighter {
                    from { background:#5264AE; }
                to 	{ width:0; background:transparent; }
                }
                @-moz-keyframes inputHighlighter {
                    from { background:#5264AE; }
                to 	{ width:0; background:transparent; }
                }
                @keyframes inputHighlighter {
                    from { background:#5264AE; }
                to 	{ width:0; background:transparent; }
                }
    `
    style =  `
    .carte-content{
        width :100vw;
        height :100vh;
        display :flex;
        align-items :center;
        justify-content: space-evenly;
    }
        .nav-bar{
            display :none;
        }
        .login-cart{
            width :450px;
            height:70%;
            border-radius :25px;
           background:    rgba(0, 0, 0, 0.1);
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction:column;
        }        
        .login-img img{
            width :100%;
            height :100%;
        }
        .login-img{
            height :100%;
            width :50%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-basis: 50%;
        }
        #content{
            width :100vw;
            height :100vh;
        }
        .login-content{
            flex-basis: 50%;
            height :100%;
        }
        .loginComment{
            width :40%;
            font-size :50px;
            position :absolute;
            left :50%;
            top :50%;
            text-align :center;
            text-shadow: 4px 4px 2px black;
        }
        .redirapi_inta , .redirapi_google{
          background:transparent;
          border:none;
        }
        .redirapi_inta:hover , .redirapi_google:hover{
            scale :1.1;
        }
    `;
    constructor() {
        super();
        console.log("inside super");
        // this.shadow = this.attachShadow({mode:'open'});
        }
        subRegister(){
            const clickEvent = document.querySelector("#register");
            clickEvent.addEventListener('click', async (e) =>{
                console.log("ffffffffffffffffff");
                const form = document.querySelector("#form-resiter");
                const fromData = new FormData(form);
                const data = Object.fromEntries(fromData);
                try{
                    const res = await fetch("http://localhost:8000/api/register/", {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    if (res.ok) {
                            
                    } else {
;
                    }
                } catch(error) {
                    console.log("Error verifying OTP:", error);
                }
            })

        }
        veryOtp() {
            // Grab the OTP form element
            const formOtp = document.querySelector('#otp-code');
            
            // Add an event listener for OTP form submission
            console.log(';;;;>><<>>><');
            formOtp.addEventListener('submit', async (e) => {
                e.preventDefault(); // Prevent the default form submission
                
                console.log("---- INSIDE VERIFY OTP ----");
        
                // Collect form data
                const formData = new FormData(formOtp);
                const data = Object.fromEntries(formData);
        
                // Make the fetch call to verify OTP
                try {
                    console.log(data);
                    const res =  await fetch("http://localhost:8000/api/verify_otp/", {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify(data),
                        })
                    if (res.ok) {
                        console.log('--- OTP VERIFIED SUCCESSFULLY ---');
                        // // Add success logic, like redirecting to home page
                        console.log('----home----');
                        const data = await res.json();
                        console.log("----here is res");
                        console.log(data.access);
                        console.log(data["access"]);
                        // document.cookie = data["access"];
                        // window.location.href = '/home'; 
                        // e.target.href = '/home';
                        // rander('/home');

                    } else {
                        console.log('--- OTP VERIFICATION FAILED ---');
                        // Display an error message on the OTP form
                        const errorCode = document.querySelector('.otp-error');
                        errorCode.textContent = "Invalid OTP. Please try again.";
                        errorCode.style.color = "#670505";
                    }
                } catch (error) {
                    console.log("Error verifying OTP:", error);
                }
            });
        }
        subLogin(){
            const loginSub = document.querySelector('.form-login');
            const loginRegiste = document.querySelector('#login-register');
           const socialIcon = document.querySelector('.social-icon');
           const pepe = document.querySelector('.form-login-siwtch');
            loginSub.addEventListener('submit', async (e)  => {
                    const otpSubmitBtn = document.querySelector('#formLogin2');
                    otpSubmitBtn.disabled = true;
                    e.preventDefault();
                    console.log("--- INSIDE EVEN LOG IN ---");
                    let flag = true;
                    const fromData = new FormData(loginSub);
                    const data = Object.fromEntries(fromData);
                    try{
                        const response = await fetch("http://localhost:8000/api/login/", {
                                method: 'POST', 
                                headers: {
                                    
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify(data),
                            })
                            if (response.ok){ 
                                    console.log(response.json());
                                // handle response */ 
                                        loginSub.remove();
                                        loginRegiste.remove();
                                        socialIcon.remove();
                                        // pepe.remove();
                                        // const el = document.querySelector('.login-cart');
                               
                                        pepe.innerHTML = `
                                            ${this.opt}
                                        `;
                                        // el.appendChild(bb);
                                        this.veryOtp();
                                        
                                    }
                                    else{
                                    console.log("THIS IS NOT SECC");
                                    const errorCode = document.querySelector('.otp-error');
                                    errorCode.textContent = "Username or password not corect!!.";
                                    errorCode.style.color = "#D9D9D9";
                                    otpSubmitBtn.disabled = false;
                                }
                    }catch(error){
                        console.log('Error log in : ' , error);
                    }
            });
        }
        intraApi(){
            console.log("inside login page");
            const intra = document.querySelector(".redirapi_inta");
            intra.addEventListener('click', async (e) => {
                window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-68bcaf8c253732f9b6170cbd7f722c4ba37ed186edcfc06864478ef32dede1f9&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fintra%2F&response_type=code';
                // try {
                    // Prevent default button/link behavior
                    // e.preventDefault();
            
                    // Fetch the authentication endpoint from your backend
            //         const response = await fetch("http://localhost:8000/api/intra/", {
            //             method: 'GET',
            //             credentials: 'include', // Important for cookies
            //             headers: {
            //                 'Accept': 'application/json',
            //             }
            //         });
            
            //         if (!response.ok) {
            //             throw new Error('Failed to fetch authentication URL');
            //         }
            
            //         // Parse the response to get the authentication URL
            //         const authData = await response.json();
                    
            //         // Redirect to the authentication URL
            //         if (authData.authorizationUrl) {
            //             // Option 1: Same window redirect
            //             window.location.href = authData.authorizationUrl;
            
            //             // Option 2: If you want to open in a new window
            //             // window.open(authData.authorizationUrl, '_blank');
            //         } else {
            //             throw new Error('No authentication URL provided');
            //         }
            //     } catch (error) {
            //         console.error("Authentication Error:", error);
            //         // Optional: Show user-friendly error message
            //         alert("Authentication failed. Please try again.");
            //     }
            });




            // console.log("inside login page");
            // const intra = document.querySelector(".redirapi_inta");
            // intra.addEventListener('click', async (e) => {
            //     try {
            //         // Prevent default link/button behavior
            //         e.preventDefault();
            
            //         // Redirect directly to the 42 OAuth authorization URL
            //         const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:8000/&response_type=code`;
                    
            //         // Option 1: Window redirect
            //         window.location.href = authUrl;
            
            //         // Option 2: If you prefer opening in a new window
            //         // window.open(authUrl, '_blank');
            //     } catch (error) {
            //         console.error("Authentication error:", error);
            //     }
            // });
            console.log("inside login page");
            const googleApi = document.querySelector(".redirapi_google");
            googleApi.addEventListener('click' , async (e) => {
                console.log(googleApi);
                try {
                    // Prevent default button/link behavior
                    e.preventDefault();
            
                    // Fetch the authentication endpoint from your backend
                    const response = await fetch("http://localhost:8000/api/google/", {
                        method: 'GET',
                        credentials: 'include', // Important for cookies
                        headers: {
                            'Accept': 'application/json',
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to fetch authentication URL');
                    }
            
                    // Parse the response to get the authentication URL
                    const authData = await response.json();
                    
                    // Redirect to the authentication URL
                    if (authData.authorizationUrl) {
                        // Option 1: Same window redirect
                        window.location.href = authData.authorizationUrl;
            
                        // Option 2: If you want to open in a new window
                        // window.open(authData.authorizationUrl, '_blank');
                    } else {
                        throw new Error('No authentication URL provided');
                    }
                } catch (error) {
                    console.error("Authentication Error:", error);
                    // Optional: Show user-friendly error message
                    alert("Authentication failed. Please try again.");
                }
            });
        }
        rand(){
            this.innerHTML = `
            <style>
            ${this.style}
            ${this.fomrAstyle}
            ${this.iconStyle}
            ${this.loginStyle}
            ${this.registerStyle}
            ${this.loginRegisterStyle}
            ${this.optStyle}
            </style>
            ${this.template}
            `;
                
                const loginCart = document.querySelector('.login-cart');
                loginCart.innerHTML = `
                     ${this.formA}
                `;
                const bb = document.createElement('div');
                bb.className = "form-login-siwtch";
                bb.innerHTML = `
                    ${this.login}
                    ${this.register}
                `;
                loginCart.appendChild(bb);
                const titleLogin = document.querySelector('.loginComment');
                console.log(titleLogin);
                titleLogin.style.transition = "5s";
                titleLogin.style.left = "5%";
                titleLogin.style.top = "50%";
                titleLogin.innerHTML =  `<h1>Hello, Astro!</h1>`;
                const loginEven = document.querySelector('.login-register-btn');
                const registerEven = document.querySelector('.sub-event');
                loginEven.addEventListener('click', (e) =>{
                    e.preventDefault();
                    var a = document.querySelector('.hover-btn');
                    var d = document.querySelector('.form-login');
                    var c = document.querySelector('#form-resiter');
                    a.style.left = "0";
                    c.style.left = "100%";
                    d.style.left = "35%";
                    d.style.transition =  "1s";
                    const titleLogin = document.querySelector('.loginComment');
                    console.log(titleLogin);
                    titleLogin.style.transition = "5s";
                    titleLogin.style.left = "5%";
                    titleLogin.style.top = "50%";
                    titleLogin.innerHTML =  `<h1>Hello, Astro!</h1>`;
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
                    c.style.left = "-35%";
                    d.style.left = "-100%";
                    e.preventDefault();
                    const titleLogin = document.querySelector('.loginComment');
                    console.log(titleLogin);
                    titleLogin.style.transition = "1s";
                    titleLogin.style.left = "5%";
                    titleLogin.style.top = "50%";
                    titleLogin.innerHTML =  `<h1>Welcome Back</h1>`;

                });
                this.intraApi();
                this.subRegister();
                this.subLogin();
                this.veryOtp();
                
            }
        connectedCallback(){
        this.rand();
    }
}

customElements.define('login-page',loginPage);
