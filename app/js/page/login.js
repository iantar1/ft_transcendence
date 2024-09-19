// veryOtp() {
//     // Grab the OTP form element
//     const formOtp = document.querySelector('#otp-code');
    
//     // Add an event listener for OTP form submission
//     formOtp.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent the default form submission
        
//         console.log("---- INSIDE VERIFY OTP ----");

//         // Collect form data
//         const formData = new FormData(formOtp);
//         const data = Object.fromEntries(formData);

//         // Make the fetch call to verify OTP
//         try {
//             const res = await fetch("http://localhost:8000/api/verify_otp/", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (res.ok) {
//                 console.log('--- OTP VERIFIED SUCCESSFULLY ---');
//                 // Add success logic, like redirecting to home page
//                 window.location.href = '/home'; // Redirect after successful OTP verification
//             } else {
//                 console.log('--- OTP VERIFICATION FAILED ---');
//                 // Display an error message on the OTP form
//                 document.querySelector('.otp-error').textContent = "Invalid OTP. Please try again.";
//             }
//         } catch (error) {
//             console.log("Error verifying OTP:", error);
//         }
//     });
// }

// subLogin() {
//     // Grab the login form elements
//     const loginSub = document.querySelector('.form-login');
//     const loginRegister = document.querySelector('#login-register');
//     const socialIcon = document.querySelector('.social-icon');
//     const pepe = document.querySelector('.form-login-switch');

//     // Add an event listener for login form submission
//     loginSub.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         const otpSubmitBtn = document.querySelector('#formLogin2');
//         otpSubmitBtn.disabled = true; // Disable button to prevent multiple submissions

//         console.log("--- INSIDE LOGIN SUBMISSION ---");

//         // Collect login form data
//         const formData = new FormData(loginSub);
//         const data = Object.fromEntries(formData);

//         // Make the fetch call for login
//         try {
//             const response = await fetch("http://localhost:8000/api/login/", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 // Handle successful login
//                 loginSub.remove();
//                 loginRegister.remove();
//                 socialIcon.remove();
//                 pepe.remove();

//                 const el = document.querySelector('.loginRegister');
//                 console.log('Login container:', el);
//                 el.style.width = '100%';

//                 // Display the OTP form
//                 const bb = document.createElement('div');
//                 bb.className = 'otp-content';
//                 bb.style.width = '100%';
//                 bb.innerHTML = `
//                     <form id="otp-code">
//                         <h2>Enter OTP</h2>
//                         <p>We sent an OTP to your email. Please enter it below:</p>
//                         <input type="text" name="otp" id="otp-input" placeholder="Enter OTP" required><br><br>
//                         <button type="submit">Verify OTP</button>
//                         <p class="otp-error" style="color: red;"></p> <!-- Error message placeholder -->
//                     </form>
//                 `;
//                 el.appendChild(bb);

//                 // Call the function to handle OTP verification
//                 this.veryOtp();
//             } else {
//                 // Handle login failure
//                 console.log("Login failed. Invalid email or password.");
//                 document.querySelector('.login-error').textContent = "Login failed. Please try again.";
//                 otpSubmitBtn.disabled = false; // Re-enable submit button
//             }
//         } catch (error) {
//             console.log("Error during login:", error);
//             otpSubmitBtn.disabled = false; // Re-enable submit button on error
//         }
//     });
// }


import {rander} from '../routing.js';

// 'first_name', 'last_name', 'username', 'email', 'password', 

class loginPage extends HTMLElement {

    register = `
        <form id="form-resiter" class="form-login"  >
                <div class="input-btn" >
                <input name="first_name" placeholder="Firstname" class="input" type="text" id="firstName" required />
                </div>
                <div class="input-btn" >
                <input name="last_name" placeholder="Lastname" class="input" type="text" id="lastName"  required/>
                </div>
                <div class="input-btn" >
                    <input name="username" placeholder="username" class="input" type="text" id="username"  required/>
                </div>
                <div class="input-btn" >
                    <input name="email" placeholder="email" class="input" type="email" id="email"  required/>
                </div>
                <div class="input-btn" >
                    <input name="password" placeholder="Password" class="input" type="password" id="password"  required/>
                </div>
                <br>
                <button id="register" class="form-btn"  type="click" data-link >Register</button>
            </form>
    `;
    login = `
            <form  id="formLogin" class="form-login" action="" >
                <div class="input-btn" >
                    <input name="username" placeholder="username" class="input" type="text" id="usernamelogin"  required />
                </div>
                <div class="input-btn" >
                    <input name="password" placeholder="password" class="input" type="password" id="passwordlogin"  required />
                </div>
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
    opt = `
        <form class="otp" id="otp-code" action="">
            <h2>Authenticate Your Account</h2>
            <h5>Authorization code sent to your email</h5>
            <br><br>
            <div class="otp-vir">
                <!-- Unique id for input field -->
                <input name='otp' placeholder="CODE" type="text" id="otp-input" required />
            </div>
                <span class="otp-error" ></span>
            <br>
            <p>It may take a minute to receive your code.</p>
            <br>
            <input id="otp-submit" type="submit" value="Submit" />
      </form>

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
            width :450px;
            height:65%;
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
        .otp{
            width :90%;
            height :50%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction:column;
        }
        .otp form{
            width :100%;
            height :100%;
            display :flex;
            align-items :center;
            justify-content: center;
            flex-direction:column;
        }
        .otp-vir{
            width :100%;
            height :20%;
        }
        .otp-vir{
            display :flex;
            align-items :center;
            justify-content: center;
            gap :20px;
        }
        .otp-vir input{
            width :80%;
            height :100%;
            color :black;
            background :rgba(255,255,255,0.5);
            border :none;
            border-bottom: 4px solid #670505;
        }
        input::placeholder {
            font-weight: bold;
            opacity: 0.5;
            color: #FFF;
        }
        #otp-submit{
            width :80%;
            height :20%;
            background :#670505;
            border :none;
            font-size :16px;
            border-radius :15px;
        }
        .fa-solid{
            font-size :50px;
            color :#670505; 
        }
        .otp{
         width :100%;
         height :100%;
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
                const fromData = new FormData(form);
                const data = Object.fromEntries(fromData);
                fetch("http://localhost:8000/api/register/", {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), 
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error:', error);
                });
                let result = response.json();
                console.log(result.message);
                console.log(data);
            })

        }
        veryOtp() {
            // Grab the OTP form element
            const formOtp = document.querySelector('#otp-code');
            
            // Add an event listener for OTP form submission
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
                            body: JSON.stringify(data), 
                        })
                    if (res.ok) {
                        console.log('--- OTP VERIFIED SUCCESSFULLY ---');
                        // Add success logic, like redirecting to home page
                        window.location.href = '/home'; // Redirect after successful OTP verification
                    } else {
                        console.log('--- OTP VERIFICATION FAILED ---');
                        // Display an error message on the OTP form
                        const errorCode = document.querySelector('.otp-error');
                        errorCode.textContent = "Invalid OTP. Please try again.";
                        errorCode.style.color = "red";
                    }
                } catch (error) {
                    console.log("Error verifying OTP:", error);
                }
            });
        }
        // veryOtp(){
        //     // const formOtp = document.querySelector('#otp-code');
        //     // rander('/home');
        //     const formOtp = document.querySelector('#otp-code');
        //     formOtp.addEventListener('submit', async (e) => {
        //             console.log('>>>>>>>' + formOtp);
        //             console.log("---- INSIDE VERY OTP ----");
        //             // const fromData = new FormData(formOtp);
        //             // const data = Object.fromEntries(fromData);
        //             // const res =  await fetch("http://localhost:8000/api/verify_otp/", {
        //             //         method: 'POST', 
        //             //         headers: {
        //             //             'Content-Type': 'application/json',
        //             //         },
        //             //         body: JSON.stringify(data), 
        //             //     })
        //             // if (res.ok){
        //             //     console.log('--- WAS SECC ---');
        //             // }
        //             // else{
        //             //     console.log('--- WAS not SECC ---');
        //             // }
        //     });
        // }
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
                                body: JSON.stringify(data), 
                            })
                            if (response.ok){ 
                                // handle response */ 
                                        loginSub.remove();
                                        loginRegiste.remove();
                                        socialIcon.remove();
                                        pepe.remove();
                                        const el = document.querySelector('.loginRegister');
                                        console.log('this ttt' + el);
                                        el.style.width = '100%'
                                        // console.log(response);
                                        // el.remove();
                                        // const aa = document.querySelector('.login-cart');
                                        const bb = document.createElement('div');
                                        bb.className = 'otp-content';
                                        bb.style.width = '100%';
                                        // console.log("---> : " + aa);
                                        bb.innerHTML = `
                                            ${this.opt}
                                        `;
                                        el.appendChild(bb);
                                        this.veryOtp();
                                        
                                    }
                                    else{
                                    console.log("THIS IS NOT SECC");
                                    otpSubmitBtn.disabled = false;
                                }
                    }catch(error){
                        console.log('Error log in : ' , error);
                    }
            });
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
                this.subLogin();
                // this.veryOtp();
                
            }
        connectedCallback(){
        this.rand();
    }
}

customElements.define('login-page',loginPage);
