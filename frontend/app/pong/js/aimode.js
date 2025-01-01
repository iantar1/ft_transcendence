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
    let ball_config, ball, plane, paddle, score, animationId, table_config, leftWall, rightWall, player1_config, player2_config;
    let playerDirection = 0;
    let player1ScoreMesh, player2ScoreMesh;
    let player1 , player2;
    let renderer, controls;
    
    
    const TableG = new THREE.Group();
    const FontLoader = new THREE.FontLoader();
    
    let tableWidth, tableHeight;
    // Enhanced scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x00ff00, 0.0025);
    scene.background = new THREE.Color(0x000011);


    const spotLight = new THREE.SpotLight(0xffffff, 0.2);
    spotLight.position.set(0, 100, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);


    render(pongCanvas, gamePage.shadowRoot.querySelector('.game-page'));

    let width = canvas.clientWidth ;
    let height = canvas.clientHeight ;

    console.log("sizes : ", canvas.clientWidth, canvas.clientHeight);
    
    

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.set(0, 15, 35);
    scene.add(camera);



    renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    pongCanvas.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    resizeCanvas();

    // Particle system for background
    function createStarfield() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true
        });
        
        return new THREE.Points(geometry, material);
    }
    
    const starfield = createStarfield();
    scene.add(starfield);
    
    
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
            gameOver(data.winner, data.score);
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


    // function tableWalls(tableWidth, tableHeight) {

    //     const WallL = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, tableHeight / 2),
    //         new THREE.MeshToonMaterial({
    //             color: "cyan",
    //             emissive: "cyan", // Emissive color (glow effect)
    //             emissiveIntensity: 0.8 // Intensity of the emissive effect
    //         })
    //     );
    //     WallL.position.set(-(tableWidth / 2) + 0.5, 0, tableHeight / 4);
    //     TableG.add(WallL);
        
    //     const rectLight1 = new THREE.RectAreaLight( "cyan", 2, tableHeight / 2, 3 );
    //     rectLight1.position.set( WallL.position.x + 0.5, WallL.position.y , WallL.position.z);
    //     rectLight1.rotation.y = -Math.PI / 2;
    //     TableG.add( rectLight1 );
        
    //     const WallL1 = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, tableHeight / 2),
    //         new THREE.MeshToonMaterial({
    //             color: new THREE.Color("#e3052e"),
    //             emissive: new THREE.Color("#e3052e"), // Emissive color (glow effect)
    //             emissiveIntensity: 0.8 // Intensity of the emissive effect
    //             })
    //     );
    //     WallL1.position.set(-(tableWidth / 2) + 0.5, 0, -(tableHeight / 4));
    //     TableG.add(WallL1);

    //     const rectLight2 = new THREE.RectAreaLight( new THREE.Color("#e3052e"), 2, tableHeight / 2, 3 );
    //     rectLight2.position.set( WallL1.position.x + 0.5, WallL1.position.y, WallL1.position.z);
    //     rectLight2.rotation.y = -Math.PI / 2;
    //     TableG.add( rectLight2 );
        
    //     const WallR = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, tableHeight / 2),
    //         new THREE.MeshToonMaterial({
    //             color: new THREE.Color("#e3052e"),
    //             emissive: new THREE.Color("#e3052e"), // Emissive color (glow effect)
    //             emissiveIntensity: 0.8 // Intensity of the emissive effect
    //         })
    //     );
    //     WallR.position.set(tableWidth / 2 - 0.5, 0, tableHeight / 4);
    //     TableG.add(WallR);

    //     const rectLight3 = new THREE.RectAreaLight( new THREE.Color("#e3052e"), 2, tableHeight / 2, 3 );
    //     rectLight3.position.set( WallR.position.x - 0.5, WallR.position.y, WallR.position.z);
    //     rectLight3.rotation.y = Math.PI / 2;
    //     TableG.add( rectLight3 );
        
    //     const WallR1 = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, tableHeight / 2),
    //         new THREE.MeshToonMaterial({
    //             color: "cyan",
    //             emissive: "cyan", // Emissive color (glow effect)
    //             emissiveIntensity: 0.8 // Intensity of the emissive effect
    //         })
    //     );
    //     WallR1.position.set(tableWidth / 2 - 0.5, 0, -(tableHeight / 4));
    //     TableG.add(WallR1);

    //     const rectLight4 = new THREE.RectAreaLight( "cyan", 2, tableHeight / 2, 3 );
    //     rectLight4.position.set( WallR1.position.x - 0.5, WallR1.position.y, WallR1.position.z);
    //     rectLight4.rotation.y = Math.PI / 2;
    //     TableG.add( rectLight4 );
    // //////////////////////////////////////////////////////
    //     scene.add(TableG);
    // }

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

    function animate (time)
    {
        animationId = requestAnimationFrame(animate);

        // Update starfield
        starfield.rotation.y += 0.0001;

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

    // Enhanced game over effect
    function gameOver(winner, score) {
        // Create multiple explosion layers
        function createExplosionLayer(radius, particleCount, speed) {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const velocities = [];
            
            // Create random particles in a sphere
            for(let i = 0; i < particleCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                const r = radius * Math.random();
                
                vertices.push(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                );
                
                // Add random velocity for each particle
                velocities.push(
                    (Math.random() - 0.5) * speed,
                    (Math.random() - 0.5) * speed,
                    (Math.random() - 0.5) * speed
                );
            }
            
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            
            const explosion = new THREE.Points(
                geometry,
                new THREE.PointsMaterial({
                    color: winner === 'player1' ? 0x00ff00 : 0xff0000,
                    size: 0.5,
                    transparent: true,
                    opacity: 1
                })
            );
            
            explosion.userData.velocities = velocities;
            return explosion;
        }
        
        // Create multiple layers of explosion
        const explosionLayers = [
            createExplosionLayer(20, 1000, 2),  // Core explosion
            createExplosionLayer(15, 500, 1.5), // Middle layer
            createExplosionLayer(10, 250, 1)    // Outer layer
        ];
        
        explosionLayers.forEach(layer => scene.add(layer));
        
        // Animate explosion
        let time = 0;
        function animateExplosion() {
            time += 0.016; // Approximately 60 FPS
            
            explosionLayers.forEach(layer => {
                const positions = layer.geometry.attributes.position.array;
                
                // Update each particle position based on velocity
                for(let i = 0; i < positions.length; i += 3) {
                    positions[i] += layer.userData.velocities[i] * time;
                    positions[i+1] += layer.userData.velocities[i+1] * time;
                    positions[i+2] += layer.userData.velocities[i+2] * time;
                }
                
                layer.geometry.attributes.position.needsUpdate = true;
                layer.material.opacity = Math.max(0, 1 - time);
            });
            
            if(time < 1) {
                requestAnimationFrame(animateExplosion);
            } else {
                // Clean up and show game over screen
                explosionLayers.forEach(layer => scene.remove(layer));
                wsOpen = false;
                cancelAnimationFrame(animationId);
                socket.close();
                render(GameOver(winner, score), 
                    gamePage.shadowRoot.querySelector('.game-page'));
            }
        }
        
        animateExplosion();
    }
}
