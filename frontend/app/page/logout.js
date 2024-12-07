class logoutPage extends HTMLElement {

    constructor(){
        super();
    }
    rander(){
        this.innerHTML = `
            <style>
            .nav-bar{
                display :flex;
            }
            </style>
            <button type="button" class="btn btn-primary">logout</button>
        `;
    }
    connectedCallback(){
        this.rander();
    }
}

customElements.define('logout-page',logoutPage);