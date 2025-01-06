import { render } from "./render.js";
import { menu } from "./loby.js";
import { tournamentBracket } from "./bracket.js";
import { GameOver } from "./gameOver.js";


export function manageLocalTournament(participants, tournamentName) {

    const style = document.createElement('style');
    style.textContent = `
        .pongCanvas canvas {
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
    const canvas = gameCanvas();

    const pongCanvas = document.createElement('div');
    pongCanvas.classList.add('pongCanvas');

    pongCanvas.appendChild(style);
    pongCanvas.appendChild(canvas);
    pongCanvas.appendChild(countdownElement);

    let wsOpen = false;
    let ball_config, ball;
    let scoreManager, plane, leftWall, rightWall, table_config, paddle, score, animationId;
    let player2Direction = 0, player1Direction = 0;
    let player1ScoreMesh, player2ScoreMesh;
    let player1 , player2;
    let renderer, controls;
    
    const TableG = new THREE.Group();
    const FontLoader = new THREE.FontLoader();
    
    let tableWidth, tableHeight;
    // Enhanced scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000011, 0.0025);
    scene.background = new THREE.Color(0x000011);


    const spotLight = new THREE.SpotLight(0xffffff, 0.2);
    spotLight.position.set(0, 100, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);

    // render(pongCanvas, gamePage.shadowRoot.querySelector('.game-page'));

    let width = canvas.clientWidth ;
    let height = canvas.clientHeight ;

    console.log("sizes : ", width, height);

    
    const camera1 = new THREE.PerspectiveCamera(75, (width / 2) / height, 0.1, 2000);
    const camera2 = new THREE.PerspectiveCamera(75, (width / 2) / height, 0.1, 2000);
    
    camera1.position.set(0, 15, 35);
    camera2.position.set(0, 15, -35);
    camera2.lookAt(0, 0, 0);
    scene.add(camera1, camera2);
    
    
 
    renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    pongCanvas.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera1, renderer.domElement );

    resizeCanvas();



    // Particle system for background
    function createStarfield() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 500 - 250,
                Math.random() * 500 - 250,
                Math.random() * 500 - 250
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true,
            depthWrite: false,
            alphaMap : new THREE.TextureLoader().load('/app/pong/assets/kenney_particle-pack/PNG (Transparent)/star_06.png'),
        });

        return new THREE.Points(geometry, material);
    }
    
    const starfield = createStarfield();
    scene.add(starfield);





    URL = 'wss://'+window.location.host+'/ws/tournament/local/';
    let ws = new WebSocket(URL);
    
    ws.onopen = function(event) {
        console.log('Connected to websocket');
        ws.send(JSON.stringify({
            type: 'join',
            participants: participants,
            name: tournamentName
        }));
    }

    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.table(data);
        if (data.type === 'joined') {
            table_config = data.table;
            paddle = data.paddle;
            ball_config = data.ball;
            score = data.score;

            console.log('Joined tournament');
            table();
            ballCreation();
            playerCreation();
            scoreManager = new ScoreManager(scene);

            render(
                tournamentBracket(
                    data.matches,
                    data.round,
                    ws,
                ),
                gamePage.shadowRoot.querySelector('.game-page'));
        }


        if (data.type === "start") {
            render(pongCanvas, gamePage.shadowRoot.querySelector('.game-page'));
            resizeCanvas();
            table_config = data.table;
            paddle = data.paddle;
            ball_config = data.ball;
            score = data.score;
            wsOpen = true;



            startCountdown(3, () => {
                animate();
                ws.send(JSON.stringify({ 
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
            shakeCamera(camera1);
            shakeCamera(camera2);
            scoreManager.addPoint(score);
        }
        if (data.type === "game_over") {
            cancelAnimationFrame(animationId);
            wsOpen = false;
            resetGame();
            scoreManager.reset();
            render(
                tournamentBracket(
                    data.matches,
                    data.round,
                    ws,
                    data.round > 3 ? data.ranked : null,
                    tournamentName
                ),
                gamePage.shadowRoot.querySelector('.game-page'));
        }
    }

    ws.onerror = function(event) {
        console.log('Error with websocket');
    }

    ws.onclose = function(event) {
        console.log('Disconnected from websocket');
    }




    
    document.addEventListener("keydown", movePaddle);
    document.addEventListener("keyup", stopPaddle);

    function movePaddle(e)
    {
        console.log("event : ", e.key);
        if(e.key === 'ArrowLeft') player2Direction = -1;
        if(e.key === 'ArrowRight') player2Direction = 1;
        if(e.key === 'a') player1Direction = -1;
        if(e.key === 'd') player1Direction = 1;
    }

    function stopPaddle(e)
    {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight")
            player2Direction = 0;
        if (e.key === "a" || e.key === "d")
            player1Direction = 0;
    }


    function resizeCanvas() {
        width = pongCanvas.clientWidth ;
        height = pongCanvas.clientHeight ;

        console.log("sizes : ", pongCanvas.clientWidth / pongCanvas.clientHeight);
        // camera1.fov = Math.min(95, Math.max(75, 60 * (height / width)));
        camera1.aspect = width / height;
        camera1.updateProjectionMatrix();

        // camera2.fov = Math.min(95, Math.max(75, 60 * (height / width)));
        camera2.aspect = width / height;
        camera2.updateProjectionMatrix();
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
        createWalls(tableWidth, tableHeight);
        scene.add(TableG);
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

    function createWalls(tableWidth, tableHeight) {
        const walls = new THREE.Group();
    
        const wallGeometry = new THREE.BoxGeometry(1, 2, tableHeight);
        const glowShader = {
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec2 vUv;
                
                void main() {
                    float pulse = sin(time * 2.0) * 0.5 + 0.5;
                    float pattern = sin(vUv.y * 20.0 + time * 3.0) * 0.5 + 0.5;
                    gl_FragColor = vec4(color, (pattern + pulse) * 0.5);
                }
            `
        };
    
        function createWall(position, color) {
            const wall = new THREE.Group();
            
            // Main wall
            const wallMaterial = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.5,
                shininess: 100
            });
            const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
            wallMesh.castShadow = true;
            
            // Energy field
            const energyMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color: { value: new THREE.Color(color) }
                },
                vertexShader: glowShader.vertexShader,
                fragmentShader: glowShader.fragmentShader,
                transparent: true,
                side: THREE.DoubleSide
            });
    
            const energyField = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 2.2, tableHeight + 1),
                energyMaterial
            );
    
            wall.add(wallMesh, energyField);
            wall.position.copy(position);
    
            // Add light
            const wallLight = new THREE.RectAreaLight(color, 2, tableHeight + 1, 2);
            wallLight.position.copy(position);
            wallLight.position.x = position.x < 0 ? 0.5 : -0.5;
            wallLight.rotation.y = (position.x < 0 ? -Math.PI / 2 : Math.PI / 2);
            // wall.rotation.y = Math.PI / 2;
            wall.add(wallLight);

            
            return wall;
        }
    
        // Create walls with different colors
        leftWall = createWall(
            new THREE.Vector3(-tableWidth / 2 + 0.5, 0, 0),
            0xff0044
        );
        rightWall = createWall(
            new THREE.Vector3(tableWidth / 2 - 0.5, 0, 0),
            0xff0044
        );
    
        walls.add(leftWall, rightWall);
    
        TableG.add(walls);
    }

    function createBallWithTrail(config) {
        const ballGroup = new THREE.Group();
        
        const sphereGeometry = new THREE.SphereGeometry(config.radius, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0xff8800,
            emissive: 0xff4400,
            shininess: 100
        });
        
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.castShadow = true;
        
        ballGroup.add(sphereMesh);
        
        // Add glow effect
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                c: { value: 0.5 },
                p: { value: 4.5 },
                glowColor: { value: new THREE.Color(0xff4400) },
                time: { value: 0 },
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                uniform float c;
                uniform float p;
                uniform float time;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
                    intensity *= abs(sin(time * 0.01));
                    gl_FragColor = vec4(glowColor, intensity);
                }
            `,
            transparent: true,
            side: THREE.BackSide
        });
        
        const glowMesh = new THREE.Mesh(
            new THREE.SphereGeometry(config.radius * 1.2, 32, 32),
            glowMaterial
        );
        
        ballGroup.add(glowMesh);
        return ballGroup;
    }


    function ballCreation() {

        ball = createBallWithTrail(ball_config);
        ball.position.set(ball_config.x, ball_config.y + 0.1, ball_config.z);
        scene.add(ball);
    } 

    // Enhanced paddle creation with effects
    function createPaddle(color, emissiveColor) {
        const paddleGroup = new THREE.Group();
        
        const paddleGeometry = new THREE.BoxGeometry(paddle.width, paddle.height, paddle.deep);
        const paddleMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: emissiveColor,
            emissiveIntensity: 0.5,
            shininess: 100
        });
        
        const paddleMesh = new THREE.Mesh(paddleGeometry, paddleMaterial);
        paddleMesh.castShadow = true;
        paddleGroup.add(paddleMesh);
        
        // Add energy field effect
        const energyGeometry = new THREE.BoxGeometry(paddle.width + 0.5, paddle.height + 0.5, paddle.deep + 0.5);
        const energyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(color) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec2 vUv;
                void main() {
                    float pattern = sin(vUv.y * 20.0 + time) * 0.5 + 0.5;
                    gl_FragColor = vec4(color, pattern * 0.3);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        const energyField = new THREE.Mesh(energyGeometry, energyMaterial);
        energyField.rotation.x = Math.PI / 2;
        paddleGroup.add(energyField);
        
        return paddleGroup;
    }

    function playerCreation() {
        player1 = createPaddle("cyan", "cyan");
        player1.position.set(0, 0, (tableHeight / 2) - (paddle.deep / 2));
        scene.add(player1);

        player2 = createPaddle(new THREE.Color("#e3052e"), new THREE.Color("#e3052e"));
        player2.position.set(0, 0, -(tableHeight / 2) + (paddle.deep / 2));
        scene.add(player2);
    }



    class ScoreManager {
        constructor(scene) {
            this.scene = scene;
            this.scores = {
                player1: 0,
                player2: 0,
                maxScore: 5
            };
            this.scoreMeshes = {
                player1: null,
                player2: null
            };

            // Initialize score displays
            this.loadFont();
        }
    
        loadFont() {
            FontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                this.font = font;
                this.createScoreDisplays();
            });
        }
    
        createScoreDisplays() {
            // Player 1 Score
            const player1Score = new THREE.TextGeometry(`${this.scores.player1}`, {
                font: this.font,
                size: 10,
                height: 0.1,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelSegments: 3
            });
    
            this.scoreMeshes.player1 = new THREE.Mesh(
                player1Score,
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    metalness: 0.5,
                    roughness: 0.5,
                    emissive: 0x444444
                })
            );
            this.scoreMeshes.player1.position.set(-3.5, -0.2, 14);
            this.scoreMeshes.player1.rotation.x = -Math.PI / 2;
            this.scene.add(this.scoreMeshes.player1);
    
            // Player 2 Score
            const player2Score = new THREE.TextGeometry(`${this.scores.player2}`, {
                font: this.font,
                size: 10,
                height: 0.1,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelSegments: 3
            });
    
            this.scoreMeshes.player2 = new THREE.Mesh(
                player2Score,
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    metalness: 0.5,
                    roughness: 0.5,
                    emissive: 0x444444
                })
            );
            this.scoreMeshes.player2.position.set(3.5, -0.2, -14);
            this.scoreMeshes.player2.rotation.y = Math.PI;
            this.scoreMeshes.player2.rotation.x = Math.PI / 2;
            this.scene.add(this.scoreMeshes.player2);
        }
    
        addPoint(score) {
            this.scores = score;
            for (const player in this.scoreMeshes) {
                if (this.scoreMeshes[player]) {
                    this.scene.remove(this.scoreMeshes[player]);
                }
            }
            this.createScoreDisplays();
        }
        reset() {
            this.scores.player1 = 0;
            this.scores.player2 = 0;
            this.updateScore();
        }
    
        updateScore() {
            for (const player in this.scoreMeshes) {
                if (this.scoreMeshes[player]) {
                    this.scene.remove(this.scoreMeshes[player]);
                }
            }
            this.createScoreDisplays();
        }
    }

    function animate (time)
    {
        animationId = requestAnimationFrame(animate);



        // Update starfield
        starfield.rotation.y += 0.0009;

        // Update paddle energy fields
        player1.children[1].material.uniforms.time.value = time * 0.001;
        player2.children[1].material.uniforms.time.value = time * 0.001

        // Update ball trail
        if (ball) {
            const trailMaterial = ball.children[1].material;
            trailMaterial.uniforms.time.value = time * 0.001;
        }

        // walls animation
        leftWall.children[1].material.uniforms.time.value = time * 0.001;
        rightWall.children[1].material.uniforms.time.value = time * 0.001;





        controls.update();
        drawing();
        if (wsOpen)
            sendPaddlePosition();

    }

    function sendPaddlePosition() {

        ws.send(JSON.stringify({
            type: "update_paddle",
            player1_Direction : player1Direction,
            player2_Direction : player2Direction
        }));
    }

    // function shakeCamera(camera, intensity = 0.3, duration = 0.5) {
    //     const originalPosition = camera.position.clone(); // Store the original position
    
    //     // Animate shaking
    //     gsap.to(camera.position, {
    //         x: `+=${intensity}`,
    //         y: `+=${intensity}`,
    //         z: `+=${intensity}`,
    //         duration: duration / 4,
    //         yoyo: true,
    //         repeat: 5,
    //         onComplete: () => {
    //             // Reset camera position after shaking
    //             camera.position.copy(originalPosition);
    //         }
    //     });
    // }
    
    function shakeCamera(camera) {
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
            drawing();

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


    function drawing(){
        // Render for the first view (Player 1)  blue player in the left side 
        renderer.setViewport(0, 0, width / 2, height);
        renderer.setScissor(0, 0, width / 2, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera1);
        
        // Render for the first view (Player 2) red player in the right side 
        renderer.setViewport(width / 2, 0, width / 2, height);
        renderer.setScissor(width / 2, 0, width / 2, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera2);
    }

    function resetGame() {
        player1.position.set(0, 0, (tableHeight / 2) - (paddle.deep / 2));
        player2.position.set(0, 0, -(tableHeight / 2) + (paddle.deep / 2));
        ball.position.set(0, 0, 0);
        score = { player1: 0, player2: 0 };
    }
}


function gameCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'flex';
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    
    return canvas;
}

function createcountdown() {
    const countdown = document.createElement('div');
    countdown.classList.add('countdown');
    countdown.style.display = 'none';

    return countdown;
}
