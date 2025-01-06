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
<<<<<<< HEAD
                display :none;
            }
    .page-1{
        width: 100%;
        height :100%;
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
        width :100%;
        height :50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: "Pong War", "Freeware";
    }
     .titlehome2{
        font-family: "Pong War", "Freeware";
        color : var(--red);
     }  
    .firstpage-para{
        width :60vw;
        text-align :center;
        font-size :2.5vw;
        font-family: "Pong War", "Freeware";
    }
    .btn-home{
        background :var(--red);
        animation: pulse 2s infinite;

    }
    @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 10px var(--red);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 20px var(--red);
            }
        }
                    .team {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            animation: slideUp 1.5s ease-in-out;
        }
        .cartTeam {
            width: 250px;
            height: 332px;
            background: #fafafa;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            box-shadow: 2px 5px 5px black;
            transform: scale(1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .cartTeam:hover {
            transform: scale(1.1);
            box-shadow: 4px 8px 10px black;
        }

        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .img-team {
            width: 100%;
            height: auto;
            border-radius: 5px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .img-team img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover; /* Ensures the image scales properly within its container */
            border-radius: 5px;
        }
         .team {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap; /* Ensures responsiveness */
         }

.cartTeam {
    width: 250px;
    height: 332px;
    background: #fafafa;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 5px 5px black;
    transition: transform 0.3s ease; /* Optional hover effect */
}

.cartTeam:hover {
    transform: scale(1.05); /* Grows the card slightly on hover */
}
    </style>
    `;

    pagetwostyle = `
        <style>
            body{
                overflow: hidden;
            }
            .page-2{
                width :100%;
                height :70vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            .page-2 h1{
                text-shadow: 2px 2px 2px black;
                font-family: "Pong War", "Freeware";

            }
            .page-2 span{
                color :var(--red);
                text-shadow: 2px 2px 2px black;
                font-family: "Pong War", "Freeware";
            }
            .team{
                width :50vw;
                height :332px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                gap :30px;
            }
            .cartTeam{
                width :250px;
                height :332px;
                background:#fafafa;
                border-radius :5px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                box-shadow: 2px 5px 5px black;

            }
            .img-team{
                width:92%;
                height :70%;
                border-radius :5px;
                overflow: hidden;
            }
            .img-team img{
                width:100%;
                height :100%;
            }
            .nameTeam{
                width:75%;
                height :15%;
                position :relative;
                left:0;
                top:-5%;
                background:var(--red);
                border-radius :10px;
                box-shadow: 2px 3px 3px #222834;
                display: flex;
                justify-content: center;
                align-items: center;
                text-shadow: 2px 2px 2px black;

            }
        .iconTeam{
            width :80%;
=======
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
>>>>>>> a3f8d1934a48a8628bc89e85c3ede5465456c02d
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
<<<<<<< HEAD
    // class="progress" style="height: 100vh; width: 100vw;"
    // <img src="/images/back.png" class="progress" style="height: 100vh; width: 100vw;"></img>
    pageone = `

            <div class="content-gsp " >
                <h1 class="titlehome fw-bold "  style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);">Pong to determine</h1>
                <h1 class="fw-bold titlehome2"  style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1); font-size:2rem;">the galaxy's future. </h1>
                <br>
                <p class="firstpage-para fw-bold " style="font-size:1rem;" >In a distant galaxy, peace hinges on the Grand Galactic Tournament of zero-gravity ping pong. The Zephron Empire aims to dominate. </p>
            
                <br>
                <a type="click" href="/login" class="btn-home btn btn-secondary mb-5 " data-link >Get started</a>
            </div>
            `;
    // <img src="/images/ahbajaou.jpg">
    pagetwo = `
        <div class="page-2" >
            <h1 class="fw-bold" ><span>Team</span> Members</h1>
            <br>
            <br>
            <div class="team d-flex flex-column flex-md-row justify-content-between">
=======
>>>>>>> a3f8d1934a48a8628bc89e85c3ede5465456c02d

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

<<<<<<< HEAD

// class getstartedPage extends HTMLElement {
//     pageonestyle = `
//         <style>
//         .nav-bar {
//             display: none;
//         }
//         .page-1 {
//             width: 100%;
//             height: 100%;
//             display: flex;
//             justify-content: start;
//             align-items: center;
//             flex-direction: column;
//             animation: fadeIn 1s ease-in-out;
//         }
//         #content {
//             height: 100%;
//             width: 100%;
//             flex-basis: none;
//             border-radius: 0;
//         }
//         .content-gsp {
//             width: 100%;
//             height: 50vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             flex-direction: column;
//             font-family: "Pong War", "Freeware";
//             animation: slideUp 1.5s ease-in-out;
//         }
//         .titlehome2 {
//             font-family: "Pong War", "Freeware";
//             color: var(--red);
//         }
//         .firstpage-para {
//             width: 60vw;
//             text-align: center;
//             font-size: 2.5vw;
//             font-family: "Pong War", "Freeware";
//         }
//         .btn-home {
//             background: var(--red);
//             animation: pulse 2s infinite;
//         }

//         /* Page 2 Animations */
//         .page-2 {
//             width: 100%;
//             height: 70vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             flex-direction: column;
//             animation: fadeIn 1s ease-in-out;
//         }
//         .team {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 30px;
//             animation: slideUp 1.5s ease-in-out;
//         }
//         .cartTeam {
//             width: 250px;
//             height: 332px;
//             background: #fafafa;
//             border-radius: 5px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             flex-direction: column;
//             box-shadow: 2px 5px 5px black;
//             transform: scale(1);
//             transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
//         }
//         .cartTeam:hover {
//             transform: scale(1.1);
//             box-shadow: 4px 8px 10px black;
//         }

//         /* Animations */
//         @keyframes fadeIn {
//             from {
//                 opacity: 0;
//             }
//             to {
//                 opacity: 1;
//             }
//         }
//         @keyframes slideUp {
//             from {
//                 transform: translateY(50px);
//                 opacity: 0;
//             }
//             to {
//                 transform: translateY(0);
//                 opacity: 1;
//             }
//         }

//         .img-team {
//             width: 100%;
//             height: auto;
//             border-radius: 5px;
//             overflow: hidden;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//         }
//         .img-team img {
//             max-width: 100%;
//             max-height: 100%;
//             object-fit: cover; /* Ensures the image scales properly within its container */
//             border-radius: 5px;
//         }
//          .team {
//             width: 100%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 30px;
//             flex-wrap: wrap; /* Ensures responsiveness */
//          }

// .cartTeam {
//     width: 250px;
//     height: 332px;
//     background: #fafafa;
//     border-radius: 5px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 2px 5px 5px black;
//     transition: transform 0.3s ease; /* Optional hover effect */
// }

// .cartTeam:hover {
//     transform: scale(1.05); /* Grows the card slightly on hover */
// }

//         @media (min-width: 320px) and (max-width: 1024px) {
//             body {
//                 overflow: scroll;
//             }
//             .content-gsp {
//                 height: 80vh;
//             }
//             .titlehome {
//                 font-size: 7vw;
//             }
//             .firstpage-para, .titlehome2 {
//                 width: 90vw;
//                 text-align: center;
//             }
//         }
//         </style>
//     `;

//     pageone = `
//         <div class="content-gsp">
//             <h1 class="titlehome fw-bold" style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);">Pong to determine</h1>
//             <h1 class="fw-bold titlehome2" style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 1); font-size: 2rem;">the galaxy's future.</h1>
//             <br>
//             <p class="firstpage-para fw-bold" style="font-size: 1rem;">In a distant galaxy, peace hinges on the Grand Galactic Tournament of zero-gravity ping pong. The Zephron Empire aims to dominate.</p>
//             <br>
//             <a type="click" href="/login" class="btn-home btn btn-secondary mb-5" data-link>Get started</a>
//         </div>
//     `;

//     pagetwo = `
//         <div class="page-2">
//             <h1 class="fw-bold"><span>Team</span> Members</h1>
//             <br><br>
//             <div class="team"></div>
//         </div>
//     `;

//     constructor() {
//         super();
//         console.log("inside super");
//     }

//     rander() {
//         this.innerHTML = `
//             ${this.pageonestyle}
//             ${this.pageone}
//             ${this.pagetwo}
//         `;
//         const teamData = [
//             { player: "ahbajaou", img: "/images/ah.jpg" },
//             { player: "arahmoun", img: "/images/ara.png" },
//             { player: "himejjad", img: "/images/him.jpeg" },
//             { player: "iantar", img: "/images/iantar.jpeg" }
//         ];
//         // const teamContainer = document.querySelector('.team');
//         // teamData.forEach(member => {
//         //     teamContainer.innerHTML += `
//         //         <div class="cartTeam">
//         //             <div class="img-team">
//         //                 <img src="${member.img}">
//         //             </div>
//         //             <div class="nameTeam">
//         //                 <h4>${member.player}</h4>
//         //             </div>
//         //             <div class="iconTeam">
//         //                 <img src="/images/icon/linkedin.png">
//         //                 <img src="/images/icon/github.png">
//         //             </div>
//         //         </div>
//         //     `;
//         // });
//     }

//     connectedCallback() {
//         console.log("inside callback");
//         this.rander();
//     }
// }

// customElements.define('getstarted-page', getstartedPage);
=======
customElements.define('getstarted-page', getstartedPage);
>>>>>>> a3f8d1934a48a8628bc89e85c3ede5465456c02d
