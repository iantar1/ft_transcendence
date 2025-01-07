class TypingAnimation {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.charIndex = 0;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            cursor: options.cursor || true,
            cursorChar: options.cursorChar || '|',
            cursorBlinkSpeed: options.cursorBlinkSpeed || 0.7,
            onComplete: options.onComplete || null
        };
        
        this.init();
    }

    init() {
        // Add cursor style if enabled
        if (this.options.cursor) {
            const style = document.createElement('style');
            style.textContent = `
                .typing-cursor::after {
                    content: '${this.options.cursorChar}';
                    animation: cursorBlink ${this.options.cursorBlinkSpeed}s infinite;
                }
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            this.element.classList.add('typing-cursor');
        }
    }

    start() {
        this.type();
    }

    type() {
        if (this.charIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.type(), this.options.typeSpeed);
        } else if (this.options.onComplete) {
            this.options.onComplete();
        }
    }

    reset() {
        this.charIndex = 0;
        this.element.textContent = '';
    }

    updateText(newText) {
        this.reset();
        this.text = newText;
        this.start();
    }
}

// Modify your existing getstartedPage class
class getstartedPage extends HTMLElement {
    pageonestyle = `
        <style>
        .nav-bar{
            display: none;
        }
        .page-1{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            flex-direction: column;
        }
        #content{
            height: 100%;
            width: 100%;
            flex-basis: none;
            border-radius: 0;
        }
        .content-gsp{
            width: 100%;
            height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: "Pong War", "Freeware";
        }
        .titlehome2{
            font-family: "Pong War", "Freeware";
            color: var(--red);
        }  
        .firstpage-para{
            width: 60vw;
            text-align: center;
            font-size: 2.5vw;
            font-family: "Pong War", "Freeware";
        }
        .btn-home{
            background: var(--red);
        }
        @media (min-width: 320px) and (max-width: 1024px) {
            .content-gsp{
                height: 80vh;
            }     
            .titlehome{
                font-size: 7vw;
            }
            .firstpage-para, .titlehome2{
                width: 90vw;
                text-align: center;
            }
        }
        </style>
    `;

    pageone = `
        <div class="content-gsp">
            <h1 class="titlehome fw-bold" style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);"></h1>
            <h1 class="fw-bold titlehome2" style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1); font-size:2rem;">the galaxy's future. </h1>
            <br>
            <p class="firstpage-para fw-bold" style="font-size:1rem;">In a distant galaxy, peace hinges on the Grand Galactic Tournament of zero-gravity ping pong. The Zephron Empire aims to dominate. </p>
            <br>
            <a type="click" href="/login" class="btn-home btn btn-secondary mb-5" data-link>Get started</a>
        </div>
    `;

    constructor() {
        super();
        this.typingAnimation = null;
    }

    initializeTypingAnimation() {
        const titleElement = this.querySelector('.titlehome');
        if (titleElement) {
            this.typingAnimation = new TypingAnimation(titleElement, "Pong to determine", {
                typeSpeed: 100,
                cursor: true,
                cursorChar: '|',
                cursorBlinkSpeed: 0.7,
                onComplete: () => {
                    console.log('Typing animation completed');
                }
            });
            this.typingAnimation.start();
        }
    }

    rander() {
        this.innerHTML = `
            ${this.pageonestyle}
            ${this.pagetwostyle}
            ${this.pageone}
            ${this.pagetwo}
        `;

        // Initialize typing animation
        this.initializeTypingAnimation();

        // Your existing team rendering code
        const form = [
            { player: "ahbajaou",  img: "/images/ah.jpg"},
            { player: "arahmoun", img: "/images/ara.png"},
            { player: "himejjad", img: "/images/him.jpeg"},
            { player: "iantar", img: "/images/iantar.jpeg"}
        ];
        
        const teamCart = this.querySelector('.team');
        form.forEach(element => {
            teamCart.innerHTML += `
                <div class="cartTeam">
                    <div class="img-team">
                        <img src=${element.img}>
                    </div>
                    <div class="nameTeam">
                        <h4>${element.player}</h4>
                    </div>
                    <div class="iconTeam">
                        <img src="/images/icon/linkedin.png">
                        <img src="/images/icon/github.png">
                    </div>
                </div>
            `;
        });
    }

    connectedCallback() {
        console.log("inside callback");
        this.rander();
    }

    disconnectedCallback() {
        // Clean up if needed
        this.typingAnimation = null;
    }
}

customElements.define('getstarted-page', getstartedPage);