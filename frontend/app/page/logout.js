
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
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .logout-popup-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }

        .logout-popup-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }

        .logout-popup-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        .logout-confirm {
            background-color: #4CAF50;
            color: white;
        }

        .logout-confirm:hover {
            background-color: #45a049;
        }

        .logout-cancel {
            background-color: #f44336;
            color: white;
        }

        .logout-cancel:hover {
            background-color: #d32f2f;
        }


    </style>

        <!-- Logout Popup -->
        <div id="logoutPopup" class="logout-popup">
            <div class="logout-popup-content">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div class="logout-popup-buttons">
                    <button id="logoutConfirm" class="logout-confirm">Logout</button>
                </div>
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
