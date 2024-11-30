

class gamePage extends HTMLElement {

    constructor(){
        super();
    }
    rander(){
        this.innerHTML = `
            <style>
            .nav-bar{
                display :flex;
            }
            header {
                background-color: #4CAF50;
                color: white;
                padding: 1em;
                text-align: center;
            }
            main {
            padding: 2em;
            }

            footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em;
            position: fixed;
            width: 100%;
            bottom: 0;
            }
            
            </style>
            <header>
                <h1>game page</h1>
            </header>
            <main>
                <p>This is a basic template with HTML and CSS.</p>
            </main>
            <footer>
                <p>&copy; 2024 My App</p>
            </footer>
        `;
    }
    connectedCallback(){
        this.rander();
    }
}

customElements.define('game-page',gamePage);