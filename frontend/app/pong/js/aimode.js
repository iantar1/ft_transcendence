import { render  } from "./render.js";
import { GameOver } from "./gameOver.js";



function gameCanvas() {
    const canvas = document.createElement('canvas');
    
    return canvas;
}

function createcountdown() {
    const countdown = document.createElement('div');
    countdown.classList.add('countdown');
    countdown.style.display = 'none';

    return countdown;
}

export function ai_mode()
{

    const style = document.createElement('style');
    style.textContent = `
        .pongCanvas canvas {
            background-color: transparent;
            display: block;
            width: 100%;
            height: 100%;
        }
        .pongCanvas .countdown {
            color: var(--red);
            text-shadow: 2px 0 white, -2px 0 white, 0 2px white, 0 -2px white,
                1px 1px white, -1px -1px white, 1px -1px white, -1px 1px white;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            place-content: center;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 0, 0, 0);
        }
        .pongCanvas {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
        }
    `;

    const gamePage = document.body.querySelector('game-page');

    const countdownElement = createcountdown();

    const pongCanvas = document.createElement('div');
    const canvas = gameCanvas();

    pongCanvas.classList.add('pongCanvas');
    pongCanvas.appendChild(style);
    pongCanvas.appendChild(canvas);
    pongCanvas.appendChild(countdownElement);
    
    const ai_URL = 'wss://'+window.location.host+'/ws/ai/';
    let wsOpen = false;
    const selectedMode = "AI MODE";
    let ball_config, ball, plane, paddle, score, animationId, table_config, player1_config, player2_config;
    let playerDirection = 0;
    let player1ScoreMesh, player2ScoreMesh;
    let player1 , player2;
    let renderer, controls;
    
    
    const TableG = new THREE.Group();
    const FontLoader = new THREE.FontLoader();
    
    let tableWidth, tableHeight;
    const scene = new THREE.Scene();
    scene.background = null;

    render(pongCanvas, gamePage.shadowRoot.querySelector('.game-page'));

    let width = canvas.clientWidth ;
    let height = canvas.clientHeight ;

    console.log("sizes : ", canvas.clientWidth, canvas.clientHeight);
    
    

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.set(0, 45, 30);
    scene.add(camera);


    renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    pongCanvas.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    resizeCanvas();
    
    const socket = new WebSocket(ai_URL);
    // Handle WebSocket events
    socket.onopen = () => {
        wsOpen = true;
        console.log("Connected to the WebSocket!");
        socket.send(JSON.stringify({
            type: "countdown",
			width: width,
			height: height
        }));
    };
    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        // console.table('data', data)
        if (data.type === "start") {

            table_config = data.table;
            paddle = data.paddle;
            player1_config = data.player1;
            player2_config = data.player2;
            ball_config = data.ball;
            score = data.score;

            table();
            ballCreation();
            playerCreation();
            createScore();

            startCountdown(3, () => {
                animate();
                socket.send(JSON.stringify({ 
                    type: "start_game",
                }));
                console.log("sending start_game");
            });
        }
        if (data.type === "update") {

            player1.position.x = data.player1.x;
            player2.position.x = data.player2.x;
            ball.position.x = data.ball.x;
            ball.position.z = data.ball.z;
            score = data.score;
        }
        if (data.type === "goal") {
            player1.position.x = data.player1.x;
            player2.position.x = data.player2.x;
            ball.position.x = data.ball.x;
            ball.position.z = data.ball.z;
            score = data.score;
            shakeCamera();
            updateScore();
        }
        if (data.type === "game_over") {
            score = data.score;
            wsOpen = false;
            cancelAnimationFrame(animationId);
            socket.close();
            render(GameOver(data.winner, score), gamePage.shadowRoot.querySelector('.game-page'));
        }
    };
    socket.onclose = () => {
        wsOpen = false;
        console.log("WebSocket closed!");
    };
    socket.onerror = () => {
        wsOpen = false;
        console.log("Connection Error for WebSocket!");
    }

    document.addEventListener("keydown", movePaddle);
    document.addEventListener("keyup", stopPaddle);
    function movePaddle(e)
    {
        console.log("move paddle", e.key);
        if(e.key === 'ArrowLeft') playerDirection = -1;
        if(e.key === 'ArrowRight') playerDirection = 1;
    }
    function stopPaddle(e)
    {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight")
            playerDirection = 0;
    }

    function resizeCanvas() {
        width = pongCanvas.clientWidth ;
        height = pongCanvas.clientHeight ;

        console.log("sizes : ", pongCanvas.clientWidth / pongCanvas.clientHeight);
        camera.fov = Math.min(95, Math.max(75, 60 * (height / width)));
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width , height);
    }

    window.addEventListener("resize", resizeCanvas);

    function table() {
        tableHeight = table_config.tableHeight;
        tableWidth = table_config.tableWidth;
        plane = new THREE.Mesh(
            new THREE.PlaneGeometry(tableWidth, tableHeight),
            new THREE.MeshPhysicalMaterial( {
                side: THREE.DoubleSide,
                reflectivity: 0,
                transmission: 1.0,
                roughness: 0.2,
                metalness: 0,
                clearcoat: 0.3,
                clearcoatRoughness: 0.25,
                color: new THREE.Color(0xffffff),
                ior: 1.2,
                thickness: 10.0
            } )
        );
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(0, -0.49, 0);
        TableG.add(plane);
        tableBound(tableWidth, tableHeight);
        tableWalls(tableWidth, tableHeight);
    }

    function tableBound(tableWidth, tableHeight){

    //////////////////////////////////////////////////
        const tableCenter = new THREE.Mesh(
            new THREE.PlaneGeometry(tableWidth, 0.2),
            new THREE.MeshBasicMaterial({color: "white"})
        );
        tableCenter.receiveShadow = true;
        tableCenter.rotation.x = -Math.PI / 2;
        tableCenter.position.set(0, plane.position.y + 0.01, 0);
        TableG.add(tableCenter);
    /////////////////////////////////////////////////
        const boundM = new THREE.Mesh(
            new THREE.PlaneGeometry(tableWidth, 0.1),
            new THREE.MeshBasicMaterial({color: "white"})
        );
        boundM.receiveShadow = true;
        boundM.rotation.x = -Math.PI / 2;
        boundM.position.set(0, plane.position.y + 0.01, tableHeight / 2);
        TableG.add(boundM);
    ///////////////////////////////////////////////////////
        const boundY = new THREE.Mesh(
            new THREE.PlaneGeometry(tableWidth, 0.1),
            new THREE.MeshBasicMaterial({color: "white"})
        );
        boundY.receiveShadow = true;
        boundY.rotation.x = -Math.PI / 2;
        boundY.position.set(0, plane.position.y + 0.01, -(tableHeight / 2));
        TableG.add(boundY);
    }


    function tableWalls(tableWidth, tableHeight) {

        const WallL = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, tableHeight / 2),
            new THREE.MeshToonMaterial({
                color: "cyan",
                emissive: "cyan", // Emissive color (glow effect)
                emissiveIntensity: 0.8 // Intensity of the emissive effect
            })
        );
        WallL.position.set(-(tableWidth / 2) + 0.5, 0, tableHeight / 4);
        TableG.add(WallL);
        
        const rectLight1 = new THREE.RectAreaLight( "cyan", 2, tableHeight / 2, 3 );
        rectLight1.position.set( WallL.position.x + 0.5, WallL.position.y , WallL.position.z);
        rectLight1.rotation.y = -Math.PI / 2;
        TableG.add( rectLight1 );
        
        const WallL1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, tableHeight / 2),
            new THREE.MeshToonMaterial({
                color: new THREE.Color("#e3052e"),
                emissive: new THREE.Color("#e3052e"), // Emissive color (glow effect)
                emissiveIntensity: 0.8 // Intensity of the emissive effect
                })
        );
        WallL1.position.set(-(tableWidth / 2) + 0.5, 0, -(tableHeight / 4));
        TableG.add(WallL1);

        const rectLight2 = new THREE.RectAreaLight( new THREE.Color("#e3052e"), 2, tableHeight / 2, 3 );
        rectLight2.position.set( WallL1.position.x + 0.5, WallL1.position.y, WallL1.position.z);
        rectLight2.rotation.y = -Math.PI / 2;
        TableG.add( rectLight2 );
        
        const WallR = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, tableHeight / 2),
            new THREE.MeshToonMaterial({
                color: new THREE.Color("#e3052e"),
                emissive: new THREE.Color("#e3052e"), // Emissive color (glow effect)
                emissiveIntensity: 0.8 // Intensity of the emissive effect
            })
        );
        WallR.position.set(tableWidth / 2 - 0.5, 0, tableHeight / 4);
        TableG.add(WallR);

        const rectLight3 = new THREE.RectAreaLight( new THREE.Color("#e3052e"), 2, tableHeight / 2, 3 );
        rectLight3.position.set( WallR.position.x - 0.5, WallR.position.y, WallR.position.z);
        rectLight3.rotation.y = Math.PI / 2;
        TableG.add( rectLight3 );
        
        const WallR1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, tableHeight / 2),
            new THREE.MeshToonMaterial({
                color: "cyan",
                emissive: "cyan", // Emissive color (glow effect)
                emissiveIntensity: 0.8 // Intensity of the emissive effect
            })
        );
        WallR1.position.set(tableWidth / 2 - 0.5, 0, -(tableHeight / 4));
        TableG.add(WallR1);

        const rectLight4 = new THREE.RectAreaLight( "cyan", 2, tableHeight / 2, 3 );
        rectLight4.position.set( WallR1.position.x - 0.5, WallR1.position.y, WallR1.position.z);
        rectLight4.rotation.y = Math.PI / 2;
        TableG.add( rectLight4 );
    //////////////////////////////////////////////////////
        scene.add(TableG);
    }

    function ballCreation() {

        ball = new THREE.Mesh(
            new THREE.SphereGeometry(ball_config.radius, 32, 32),
            new THREE.MeshToonMaterial( { 
                color: "orange",
                emissive: "orange", // Emissive color (glow effect)
                emissiveIntensity: 0.8 // Intensity of the emissive effect
            })
        );
        ball.position.set(ball_config.x, ball_config.y, ball_config.z);
        scene.add(ball);
    }

    function playerCreation() {
        player1 = new THREE.Mesh(
            new THREE.BoxGeometry(paddle.width, paddle.height, paddle.deep),
            new THREE.MeshToonMaterial({
                color: "cyan",
                emissive: "cyan",
                emissiveIntensity: 1.0
            })
        );
        player1.position.set(0, 0, (tableHeight / 2) - (paddle.deep / 2));
        scene.add(player1);

        player2 = new THREE.Mesh(
            new THREE.BoxGeometry(paddle.width, paddle.height, paddle.deep),
            new THREE.MeshToonMaterial({
                color: new THREE.Color("#e3052e"),
                emissive: new THREE.Color("#e3052e"),
                emissiveIntensity: 1.0
            })
        );
        player2.position.set(0, 0, -(tableHeight / 2) + (paddle.deep / 2));
        scene.add(player2);
    }


    function createScore() {
        FontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
            const player1Score = new THREE.TextGeometry(`${score.player1}`, {
                font: font,
                size: 10,
                height: 0.01
            });
            player1ScoreMesh = new THREE.Mesh(player1Score, new THREE.MeshBasicMaterial({color: "white"}));
            player1ScoreMesh.position.set(-3.5, -0.4, 14);
            player1ScoreMesh.rotation.x = -Math.PI / 2;
            scene.add(player1ScoreMesh);

            const player2Score = new THREE.TextGeometry(`${score.player2}`, {
                font: font,
                size: 10,
                height: 0.01
            });
            player2ScoreMesh = new THREE.Mesh(player2Score, new THREE.MeshBasicMaterial({color: "white"}));
            player2ScoreMesh.position.set(3.5, -0.4, -14);
            player2ScoreMesh.rotation.y = Math.PI;
            player2ScoreMesh.rotation.x = Math.PI / 2;
            scene.add(player2ScoreMesh);
        });
    }

    function updateScore() {
        scene.remove(player1ScoreMesh);
        scene.remove(player2ScoreMesh);
        createScore();
    }

    function animate ()
    {
        animationId = requestAnimationFrame(animate);
        controls.update();
        renderer.render( scene, camera );
        if (wsOpen)
            sendPaddlePosition();

    }

    function sendPaddlePosition() {
        console.log("sending  data ...");
        socket.send(JSON.stringify({
            type: "update_paddle",
            direction : playerDirection,
            mode: selectedMode,
        }));
    }

    function shakeCamera() {
        const originalPosition = camera.position.clone();
        const shakeStrength = 0.3;
        const shakeDuration = 200; // in milliseconds
    
        const startTime = Date.now();
        function shake() {
            const elapsed = Date.now() - startTime;
            if (elapsed < shakeDuration) {
                camera.position.x = originalPosition.x + ((Math.random() - 1) * 2) * shakeStrength;
                camera.position.y = originalPosition.y + ((Math.random() - 1) * 2) * shakeStrength;
                camera.position.z = originalPosition.z + ((Math.random() - 1) * 2) * shakeStrength;
                requestAnimationFrame(shake);
            } else {
                camera.position.copy(originalPosition); // Reset camera position
            }
        }
        shake();
    }


    function startCountdown(duration, onComplete) {
        countdownElement.style.display = 'flex'; // Hide the countdown element

        let timeLeft = duration;
        let opacity = 1; // Initial opacity for fading effect
        let scale = 1; // Initial scale for size animation
    
    
        // Update the countdown every second
        const interval = setInterval(() => {
            renderer.render( scene, camera );

            countdownElement.style.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Fading effect
            countdownElement.style.font = `${100 * scale}px "Pong War", "Freeware"`; // Dynamic scaling
            countdownElement.textContent = timeLeft > 0 ? timeLeft : "GO!"; // Display the time
            scale += 0.1; // Gradually increase size
            opacity -= 0.1; // Gradually fade out
    
            if (opacity <= 0) {
                scale = 1; // Reset size
                opacity = 1; // Reset opacity
                timeLeft-- ; // Move to the next countdown value
            }


            if (timeLeft < 0) {
                clearInterval(interval); // Stop the countdown
                countdownElement.style.display = 'none'; // Hide the countdown element
                onComplete(); // Trigger the game start
            }
        }, 60);
    }
}
