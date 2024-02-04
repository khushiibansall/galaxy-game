
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");

        var paddleWidth = 75;
        var paddleHeight = 10;
        var paddleX = (canvas.width - paddleWidth) / 2;

        var ballRadius = 10;
        var ballX = canvas.width / 2;
        var ballY = canvas.height - 30;
        var ballSpeedX = 2;
        var ballSpeedY = -2;

        var rightPressed = false;
        var leftPressed = false;

        var gameStarted = false;
        var gameEnded = false;
        var score = 0;

        var startButton = document.getElementById("startButton");
        var endScreen = document.getElementById("endScreen");
        var restartButton = document.getElementById("restartButton");
        var scoreDisplay = document.getElementById("score");

        startButton.addEventListener("click", startGame);
        restartButton.addEventListener("click", restartGame);

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawRocket() {
            // Use Font Awesome icon instead of an image
            ctx.font = "30px FontAwesome";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("\uf135", ballX - 15, ballY + 10); // Adjust the position as needed
        }

        function drawStartMessage() {
            // Display the message inside the canvas
            ctx.font = "24px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("LET'S PLAY Galactic Explorer 🚀", canvas.width / 2 - 190, canvas.height / 2);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawRocket();
            drawPaddle();

            if (!gameStarted) {
                // Draw the start message before the game starts
                drawStartMessage();
            } else {
                if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    paddleX += 7;
                } else if (leftPressed && paddleX > 0) {
                    paddleX -= 7;
                }

                ballX += ballSpeedX;
                ballY += ballSpeedY;

                if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
                    ballSpeedX = -ballSpeedX;
                }
                if (ballY - ballRadius < 0) {
                    ballSpeedY = -ballSpeedY;
                } else if (ballY + ballRadius > canvas.height) {
                    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                        ballSpeedY = -ballSpeedY;
                        score++;
                    } else {
                        gameEnded = true;
                    }
                }
            }

            if (!gameEnded) {
                requestAnimationFrame(draw);
            } else {
                endGame();
            }
        }

        function startGame() {
            gameStarted = true;
            startButton.style.display = "none";
            draw();
        }

        function endGame() {
            endScreen.style.display = "block";
            scoreDisplay.textContent = score;
        }

        function restartGame() {
            gameStarted = false;
            gameEnded = false;
            score = 0;
            paddleX = (canvas.width - paddleWidth) / 2;
            ballX = canvas.width / 2;
            ballY = canvas.height - 30;
            ballSpeedX = 2;
            ballSpeedY = -2;
            startButton.style.display = "block";
            endScreen.style.display = "none";
            draw();
        }
