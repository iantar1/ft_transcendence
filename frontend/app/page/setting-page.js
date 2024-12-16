
import {fetchUserData} from './readData.js';


class settingPage extends HTMLElement {
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
    constructor() {
        super();
    }

    settingOne = `
        <div class="settingOne" >
            <br>
            <div class="nav-setting" >
            <br>
                <div class="profSetting hoverSetting"  >
                <div class="iconSett" >
                    <br>
                    <i class="fa-regular fa-user"></i>
                    <h4>Profile Setting</h4>
                    </div>
                </div>
                <div class="passSetting hoverSetting" >
                <div class="iconSett" >
                <br>
                    <i class="fa-solid fa-lock"></i>
                    <h4>Password</h4>
                </div>
                </div>
                <div class="authSetting hoverSetting" >
                <div class="iconSett" >
                <br>
                     <i class="fa-solid fa-shield-halved"></i>
                    <h4>Auth</h4>
                </div>
                </div>
            </div>
        </div>
    `
    settingOneStyle = `
    <style>
    .nav-bar{
            display :flex;
        }
    @media (min-width: 992px) and (max-width: 1024px) {
        .settingOne{
        width :20%;
        height :100%;
        display :flex;
    }
    }
    .settingPage{
        width :100%;
        height :100%;
        display :flex;
        align-items: center;
        justify-content: center;
        gap :30px;
        z-index :2000;
    }
    .settingOne{
        width :20%;
        height :100%;
        display :flex;
    }
    .nav-setting{
        width :100%;
        height :50%;
        background: var(--bluenes);
        border-radius :5px;
        display :flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        gap :10px;
        z-index :2000;
    }
    .hoverSetting{
        width :100%;
        height :20%;
        display :flex;
        align-items: center;
        justify-content: start;
    }
    .hoverSetting:hover{
        background:rgba(56, 75, 112, 0.2);
        border-right :10px solid rgba(56, 75, 112, 1);
    }
    .iconSett{
        display :flex;
        align-items: center;
        justify-content: center;
        gap :10px;
    }
    .iconSett i, .iconSett h4 {
        margin: 0; /* Remove default margin */
        padding: 0; /* Remove default padding */
        font-size :18px;
    }
    .brr{ 
        width :100%;
        height :4%;
    }
    .infoSetting{
        width :100%;
        height :90%;
        background: var(--bluenes);
        border-radius :5px;
        
    }
    .settingTwo{
        width :80%;
        height :100%;
    }
    .btn-home{
            width :200px;
            height:50px;
            background-color: rgba(228, 5, 47, 1);
            border-radius:5px;
            border :none;
            font-size:100%;
            z-index :2000;
            font-weight: ;
        }
    </style>
    `;
    settintransStyle = `
                <style>
            .formProf{
                width :100%;
                height :100%;
                display :flex;
                align-items: center;
                justify-content: center;
                font-weight: 100;
                
            }
            .formProf form{
                width :90%;
                height :90%;
            }
            .formProf input {
                background-color: rgb(0 0 0 / 0.5);
                border :none;
                border-radius :15px;
            }
            .formProf textarea{
                background-color: rgb(0 0 0 / 0.5);
        
            }
            .formProf label{
                font-size :18px;
        
            }
            textarea{
                height :40%;
                width :80%;
                background: rgba(34, 40, 52, 1) ;
                border-radius :15px;
                border :none;
                resize: none;
                padding: 12px 20px;
                font-size :18px;
            }
            .editUser{
                width :50%;
                height :15%;
            }
        </style>
    `;
    // <div class="brr" ></div>
    // <div class="infoSetting" >
    //     <div class="avatar" >
    //         <div class="editAvatar" >
    //             <div class="imgInfo" >
    //                 <img src="../images/profile.png" >
    //             </div>
    //             <div class="btnInfo" >
    //                 <button type="button" class="btn btn-secondary">Upload New</button>
    //                 <button type="button" class="btn btn-light">Delete Avatar</button>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="info" >
    //         <div class="editInfo" >

    //         </div>
    //     </div>
    //     <div class="saveInfo" >
    //         <button type="button" class="btn btn-light">Save</button>
    //     </div>
        
    // </div>
    settingTwo = `
    <div class="settingTwo" >
    <div class="humbergr-bar" type="click">
        <input type="checkbox"  role="button" aria-label="Display the menu" class="menu">
    </div>
    <div class="infoSetting" >
                <div class="avatar" >
                    <div class="editAvatar" >
                        <div class="imgInfo" >
                            <img id="imgSetting" src="" >
                        </div>
                        <div class="btnInfo" >
                            <button class="btn-home btn btn-secondary " >Upload New</button>
                            <button class="btn-home btn btn-secondary " >Delete Avatar</button>
                        </div>
                    </div>
                </div>
                <div class="info" >
                    <div class="editInfo" >

                    </div>
                </div>

    </div>
        </div>
    `   
    hiddeHover(name){
        const hoverProf = document.querySelector(name);
        hoverProf.style.background = 'none';
        hoverProf.style.borderRight = 'none';
    }
    profEdit(){
        return `
        <div class="formProf d-flex flex-column" >
            <form>
                <label for="fname">Username</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
                <label for="lname">Bio</label><br><br>
                <textarea rows="10" 
                name="blog">
        Share your knowledge by writing your own blog! 
      </textarea>
            </form>
            </div>
            <br>
            <div class="saveInfo" >
                    <button class="btn-home btn btn-secondary " >Save</button>
            </div>
            <br>
            <br>
            <br>
        `;
    }
    passEdit(){
        return `
        <div class="formProf d-flex flex-column" >
            <form>
                <label for="fname">Old Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
                <label for="fname">New Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
                <label for="fname">New Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
            </form>
            </div>
            <div class="saveInfo" >
                    <button class="btn-home btn btn-secondary " >Save</button>

            </div>
        
        `;
    }
    authEdit(){
        return `
        <style>
            .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
                }

                /* Hide default HTML checkbox */
                .switch input {
                opacity: 0;
                width: 0;
                height: 0;
                }

                /* The slider */
                .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                }

                .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                }

                input:checked + .slider {
                background-color: #2196F3;
                }

                input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
                }

                input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
                }

                /* Rounded sliders */
                .slider.round {
                border-radius: 34px;
                }

                .slider.round:before {
                border-radius: 50%;
                }
        </style>
            <div class="formProf" >
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
            </div>
            <div class="saveInfo" >
                <button class="btn-home btn btn-secondary " >Save</button>
            </div>
        `;
    }
    displayNav(){
        console.log('inside navigation')
        const checkbox = document.querySelector('.menu').getAttribute('name');
            const navnav = document.querySelector(".menu");
            navnav.addEventListener('change' , (e) =>{
                if (navnav.checked){
                    document.querySelector('.menu').setAttribute("name", "noflag")
                    document.querySelector('.settingOne').style.display = "flex";
                }
                else{                    
                    document.querySelector('.settingOne').style.display = "none";
                }
            });
    }
    render() {
        this.innerHTML = `
            <style>
                .avatar{
                    width :100%;
                    height :30%;
                }
                .info{
                    width :100%;
                    height :55%;
                }
                .saveInfo{
                    width :95%;
                    height :15%;
                    display: flex;
                    justify-content: right;
                    align-items: center;
                    margin-top :8px;
                    gap :0px;
                    z-index :-1;
                }
                .savebtn{
                    width :18%;
                    height :55%; 
                    background: rgba(56, 75, 112, 1);
                    font-size :23px;
                    border :none;
                    border-radius :15px;
                }
                .editAvatar{
                    width :50%;
                    height :100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap:10px;
                }
                .btnInfo{
                    width :60%;
                    height :80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap :5px;
                }
                .btnInfo button{
                    font-size :18px;
                    width :58%;
                }
                .imgInfo img{
               max-width: 130px;
                height: 130px;
                object-fit: cover;
                border-radius:50%;
                }
                .imgInfo{
                    width :40%;
                    height :80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .editImg{
                    width :50%;
                    height :30%; 
                    background: rgba(56, 75, 112, 1);
                    font-size :23px;
                    border :none;
                    border-radius :15px;
                }
                .deleteImg{
                    width :50%;
                    height :30%; 
                    background: rgba(34, 40, 52, 1);
                    font-size :23px;
                    border :none;
                    border-radius :15px;
                }
                .editInfo{
                    width :50%;
                    height :100%;
                }
                .formProf textarea{
                     width :100%;
                }
                .formProf input{
                     width :100%;
                     height :12%;
                        background:rgb(0 0 0 / 0.5);               
                }
                .humbergr-bar{
                    display :none;
                }
            </style>
            <div class="settingPage" >
                ${this.settingOne}
                ${this.settingTwo}
                ${this.settingOneStyle}
                ${this.settintransStyle}
                <style>
                ${this.navar}
                @media (min-width: 320px) and (max-width: 1024px){
                  .settingPage{
                        gap :0;
                        border-radius :0px;
                  }    
                .settingOne{
                        Display :none;
                        width :100%;
                        height :100%;
                        z-index :1000;
                        gap :0;
                        position :absolute;
                        left :0;
                    }
                    .nav-setting{
                        border-radius :0px;
                        background-color: #000;
                        color: #293247;
                        z-index :3000;
                    }
                    .settingTwo{
                        width :100vw;
                    }
                    .NotKnow{
                        display :none;
                    }
                    .infoSetting{
                        border-radius :0px;
                        height :100vh;    
                    }
                .editAvatar{
                    width :100%;
                    height :80%;
                }
                .btnInfo{
                    width :100%;
                    height :60%;
                    flex-direction: column;
                    z-index :0;
                }
                .editInfo {
                    width :100%;                
                }
                .formProf textarea{
                     width :100%;
                }
                .formProf input{
                     width :100%;
                     height :12%;               
                }
                .imgInfo{
                    width :60%;
                }
                .saveInfo{
                    margin-top :0px;

                }
                .humbergr-bar{
                    display :flex;
                    position :absolute;
                    top :1%;
                    right :0;
                }
                    .hoverSetting:hover{
        background:rgba(56, 75, 112, 0.2);
        border-right :10px solid rgba(56, 75, 112, 1);
    }
                .menu {
                    --s: 20px; /* control the size */
                    --c: #fafafa; /* the color */
                    z-index :1001;
                    height: var(--s);
                    aspect-ratio: 1;
                    border: none;
                    padding: 0;
                    border-inline: calc(var(--s)/1.2) solid #0000; 
                    box-sizing: content-box;
                    --_g1: linear-gradient(var(--c) 20%,#0000 0 80%,var(--c) 0) 
                            no-repeat content-box border-box;
                    --_g2: radial-gradient(circle closest-side at 50% 12.5%,var(--c) 95%,#0000) 
                            repeat-y content-box border-box;
                    background: 
                    var(--_g2) left  var(--_p,0px) top,
                    var(--_g1) left  calc(var(--s)/10 + var(--_p,0px)) top,
                    var(--_g2) right var(--_p,0px) top,
                    var(--_g1) right calc(var(--s)/10 + var(--_p,0px)) top;
                    background-size: 
                    20% 80%,
                    40% 100%;
                    position: relative;
                    clip-path: inset(0 25%);
                    -webkit-mask: linear-gradient(90deg,#0000,#000 25% 75%,#0000);
                    cursor: pointer;
                    transition: 
                    background-position .3s var(--_s,.3s), 
                    clip-path 0s var(--_s,.6s);
                    -webkit-appearance:none;
                    -moz-appearance:none;
                    appearance:none;
                    }
                    .menu:before,
                    .menu:after {
                    content:"";
                    position: absolute;
                    border-radius: var(--s);
                    inset: 40% 0;
                    background: var(--c);
                    transition: transform .3s calc(.3s - var(--_s,.3s));
                    }

                    .menu:checked {
                    clip-path: inset(0);
                    --_p: calc(-1*var(--s));
                    --_s: 0s;
                    }
                    .menu:checked:before {
                    transform: rotate(45deg);
                    }
                    .menu:checked:after {
                    transform: rotate(-45deg);
                    }
                    .menu:focus-visible {
                    clip-path: none;
                    -webkit-mask: none;
                    border: none;
                    outline: 2px solid var(--c);
                    outline-offset: 5px;
                    }

            }
                </style>
            </div>
            

            `;
            const hoverProf = document.querySelector('.profSetting');
            hoverProf.style.background = "rgba(56, 75, 112, 0.2)";
            hoverProf.style.borderRight = ' 10px solid rgba(56, 75, 112, 1)';
            const editInfo = document.querySelector('.editInfo');
            editInfo.innerHTML = this.profEdit();
            // const hoverProf = document.querySelector('.profSetting');
            hoverProf.addEventListener('click' , (e) => {
                const hoverProf = document.querySelector('.profSetting');
                hoverProf.style.background = "rgba(56, 75, 112, 0.2)";
                hoverProf.style.borderRight = ' 10px solid rgba(56, 75, 112, 1)';
                this.hiddeHover('.passSetting');
                this.hiddeHover('.authSetting');
                const editInfo = document.querySelector('.editInfo');
                editInfo.innerHTML = this.profEdit();

            });
            const passEdit = document.querySelector('.passSetting');
            passEdit.addEventListener('click' , (e) => {
                passEdit.style.background = "rgba(56, 75, 112, 0.2)";
                passEdit.style.borderRight = ' 10px solid rgba(56, 75, 112, 1)';
                this.hiddeHover('.profSetting');
                this.hiddeHover('.authSetting');
                const editInfo = document.querySelector('.editInfo');
                editInfo.innerHTML = this.passEdit();
            });
            const authEdit = document.querySelector('.authSetting');
            authEdit.addEventListener('click' , (e) => {
                authEdit.style.background = "rgba(56, 75, 112, 0.2)";
                authEdit.style.borderRight = ' 10px solid rgba(56, 75, 112, 1)';
                this.hiddeHover('.profSetting');
                this.hiddeHover('.passSetting');
                const editInfo = document.querySelector('.editInfo');
                editInfo.innerHTML = this.authEdit();
            });
            this.displayNav();
            const uuss = async () => {
                this.info = await fetchUserData();
                document.getElementById('imgSetting').src = this.info.image
            
            }
            uuss();
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('setting-page', settingPage);