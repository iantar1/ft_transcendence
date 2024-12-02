

class settingPage extends HTMLElement {

    constructor() {
        super();
    }

    settingOne = `
        <div class="settingOne" >
            <h3>Account setting</h3>
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
    .settingPage{
        width :100%;
        height :100%;
        display :flex;
        align-items: center;
        justify-content: center;
        gap :30px;
    }
    .settingOne{
        width :20%;
        height :100%;
    }
    .nav-setting{
        width :100%;
        height :50%;
        background: #293247;
        border-radius :25px;
        display :flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        gap :10px;
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
        height :96%;
        background: #293247;
        border-radius :25px;
        
    }
    .settingTwo{
        width :80%;
        height :100%;
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
            }
            .formProf form{
                width :90%;
                height :90%;
            }
            .formProf input {
                background: rgba(34, 40, 52, 1) ;
                border :none;
                border-radius :15px;
            }
            .formProf label{
                font-size :18px;

            }
            textarea{
                height :70%;
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
    settingTwo = `
    <div class="settingTwo" >
        <div class="brr" ></div>
        <div class="infoSetting" >
            <div class="avatar" >
                <div class="editAvatar" >
                    <div class="imgInfo" >
                        <img src="../images/profile.png" >
                    </div>
                    <div class="btnInfo" >
                        <button class="editImg" type="button">Upload New</button>
                        <button class="deleteImg" type="button">Delete Avatar</button>
                    </div>
                </div>
            </div>
            <div class="info" >
                <div class="editInfo" >

                </div>
            </div>
            <div class="saveInfo" >
                <button class="savebtn" type="button">Save</button>
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
        <div class="formProf" >
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
        `;
    }
    passEdit(){
        return `
        <div class="formProf" >
            <form>
                <label for="fname">Old Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
                <label for="fname">New Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
                <label for="fname">New Password</label><br><br>
                <input type="text"  class="editUser" name="username"><br><br>
            </form>
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
        `;
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
                    width :88%;
                    height :15%;
                    display: flex;
                    justify-content: right;
                    align-items: center;
                    gap :10px;
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
                    gap :20px;
                }
                .imgInfo img{
                    width :80%;
                    height :100%;
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
            </style>
            <div class="settingPage" >
                ${this.settingOne}
                ${this.settingTwo}
                ${this.settingOneStyle}
                ${this.settintransStyle}
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
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('setting-page', settingPage);