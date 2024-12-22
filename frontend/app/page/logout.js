
console.log('LogoutPage connected!');

class LogoutPage extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        this.innerHTML = `
        <style>
        .logout-popup {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .logout-popup-content {
            background: var(--blue);
            padding: 30px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }
        .btn-home{
            background: var(--red);
        }
        .paratext{
            font-size :90%;
        }
        .confirmtext{
            color :var(--red);   
        }

    </style>

        <!-- Logout Popup -->
        <div id="logoutPopup" class="logout-popup">
            <div class="logout-popup-content">
                <h2 class="confirmtext" >Confirm Logout</h2>
                <p class="paratext">Are you sure you want to log out?</p>
                <button type="" id="" class="btn-home btn btn-secondary " >Logout</button>
            </div>
        </div>
        `;
        // const logoutButton = document.getElementById('logoutButton');
        const logoutPopup = document.getElementById('logoutPopup');
        const logoutConfirm = document.getElementById('logoutConfirm');

    }

    connectedCallback() {
        this.render(); // Correct method name
    }
}

customElements.define('logout-page', LogoutPage);
