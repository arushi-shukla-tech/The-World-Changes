const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 450,
    y: 275,
    size: 20,
    speed: 6
};

let message = document.getElementById("message");

function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = "#6b9b63";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Roads
    ctx.fillStyle = "#555555";
    ctx.fillRect(0, 220, canvas.width, 100);
    ctx.fillRect(400, 0, 100, canvas.height);

    // Road lines
    ctx.fillStyle = "#e5df9a";

    for (let x = 0; x < canvas.width; x += 60) {
        ctx.fillRect(x, 268, 30, 4);
    }

    for (let y = 0; y < canvas.height; y += 60) {
        ctx.fillRect(448, y, 4, 30);
    }

    // Buildings
    drawBuilding(70, 60, 150, 110, "OLD HOUSE");
    drawBuilding(680, 60, 150, 110, "SCHOOL");
    drawBuilding(70, 380, 150, 100, "HOSPITAL");
    drawBuilding(680, 380, 150, 100, "TOWER");

    // Trees
    drawTree(300, 100);
    drawTree(570, 100);
    drawTree(300, 440);
    drawTree(570, 440);

    // Player
    drawPlayer();
}

function drawBuilding(x, y, width, height, name) {

    ctx.fillStyle = "#9b684d";
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "#d9c7a5";

    ctx.fillRect(x + 20, y + 35, 30, 30);
    ctx.fillRect(x + 100, y + 35, 30, 30);

    ctx.fillStyle = "#493027";
    ctx.fillRect(x + 60, y + 65, 30, 45);

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(name, x + 10, y + 20);
}

function drawTree(x, y) {

    ctx.fillStyle = "#654321";
    ctx.fillRect(x - 5, y + 15, 10, 30);

    ctx.fillStyle = "#28633a";

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}

function drawPlayer() {

    // Body
    ctx.fillStyle = "#3674a8";
    ctx.fillRect(
        player.x - 10,
        player.y - 5,
        20,
        25
    );

    // Head
    ctx.fillStyle = "#f2c6a0";

    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y - 15,
        10,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Hair
    ctx.fillStyle = "#222222";

    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y - 20,
        9,
        Math.PI,
        Math.PI * 2
    );
    ctx.fill();
}

function movePlayer(x, y) {

    player.x += x * player.speed;
    player.y += y * player.speed;

    // Keep player inside map
    if (player.x < 20) {
        player.x = 20;
    }

    if (player.x > canvas.width - 20) {
        player.x = canvas.width - 20;
    }

    if (player.y < 30) {
        player.y = 30;
    }

    if (player.y > canvas.height - 20) {
        player.y = canvas.height - 20;
    }

    message.innerText = "You are exploring the city...";

    drawGame();
}

function interact() {

    let buildings = [
        { x: 145, y: 115, name: "Old House" },
        { x: 755, y: 115, name: "School" },
        { x: 145, y: 430, name: "Hospital" },
        { x: 755, y: 430, name: "City Tower" }
    ];

    let found = false;

    buildings.forEach(function(building) {

        let distance = Math.sqrt(
            Math.pow(player.x - building.x, 2) +
            Math.pow(player.y - building.y, 2)
        );

        if (distance < 100) {

            message.innerText =
                "You found the " +
                building.name +
                ". Something is waiting inside...";

            found = true;
        }
    });

    if (!found) {
        message.innerText =
            "Nothing interesting here.";
    }
}

// Keyboard controls
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp" || event.key === "w") {
        movePlayer(0, -1);
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        movePlayer(0, 1);
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        movePlayer(-1, 0);
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        movePlayer(1, 0);
    }

    if (event.key === "e") {
        interact();
    }
});

// Start game
drawGame();
