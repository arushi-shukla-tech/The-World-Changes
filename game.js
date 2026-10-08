const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 550;

let player = {
    x: 450,
    y: 275,
    speed: 6
};

let message = document.getElementById("message");

const buildings = [
    {
        x: 60,
        y: 50,
        width: 170,
        height: 120,
        name: "OLD HOUSE"
    },
    {
        x: 670,
        y: 50,
        width: 170,
        height: 120,
        name: "SCHOOL"
    },
    {
        x: 60,
        y: 380,
        width: 170,
        height: 110,
        name: "HOSPITAL"
    },
    {
        x: 670,
        y: 380,
        width: 170,
        height: 110,
        name: "CITY TOWER"
    }
];

const trees = [
    { x: 300, y: 80 },
    { x: 570, y: 80 },
    { x: 300, y: 460 },
    { x: 570, y: 460 },
    { x: 30, y: 270 },
    { x: 870, y: 270 }
];

function drawGame() {

    // Green ground
    ctx.fillStyle = "#6b9b63";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoads();
    drawBuildings();
    drawTrees();
    drawPlayer();
}

function drawRoads() {

    // Horizontal road
    ctx.fillStyle = "#555555";
    ctx.fillRect(0, 220, canvas.width, 100);

    // Vertical road
    ctx.fillRect(400, 0, 100, canvas.height);

    // Road markings
    ctx.fillStyle = "#e6df91";

    for (let x = 0; x < canvas.width; x += 60) {
        ctx.fillRect(x, 268, 30, 4);
    }

    for (let y = 0; y < canvas.height; y += 60) {
        ctx.fillRect(448, y, 4, 30);
    }
}

function drawBuildings() {

    buildings.forEach(function(building) {

        // Building
        ctx.fillStyle = "#9b684d";

        ctx.fillRect(
            building.x,
            building.y,
            building.width,
            building.height
        );

        // Roof
        ctx.fillStyle = "#693f32";

        ctx.beginPath();

        ctx.moveTo(building.x - 5, building.y);
        ctx.lineTo(
            building.x + building.width / 2,
            building.y - 30
        );
        ctx.lineTo(
            building.x + building.width + 5,
            building.y
        );

        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = "#d9c99e";

        ctx.fillRect(
            building.x + 20,
            building.y + 35,
            35,
            30
        );

        ctx.fillRect(
            building.x + building.width - 55,
            building.y + 35,
            35,
            30
        );

        // Door
        ctx.fillStyle = "#4b3027";

        ctx.fillRect(
            building.x + building.width / 2 - 18,
            building.y + building.height - 50,
            36,
            50
        );

        // Name
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";

        ctx.fillText(
            building.name,
            building.x + 10,
            building.y + 20
        );
    });
}

function drawTrees() {

    trees.forEach(function(tree) {

        // Tree trunk
        ctx.fillStyle = "#654321";

        ctx.fillRect(
            tree.x - 6,
            tree.y + 15,
            12,
            30
        );

        // Tree leaves
        ctx.fillStyle = "#28633a";

        ctx.beginPath();

        ctx.arc(
            tree.x,
            tree.y,
            27,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });
}

function drawPlayer() {

    // Body
    ctx.fillStyle = "#3674a8";

    ctx.fillRect(
        player.x - 11,
        player.y - 5,
        22,
        27
    );

    // Head
    ctx.fillStyle = "#f2c6a0";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y - 16,
        11,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Hair
    ctx.fillStyle = "#222222";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y - 21,
        10,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();

    // Eyes
    ctx.fillStyle = "#222222";

    ctx.fillRect(
        player.x - 5,
        player.y - 17,
        2,
        2
    );

    ctx.fillRect(
        player.x + 3,
        player.y - 17,
        2,
        2
    );
}

function movePlayer(x, y) {

    player.x += x * player.speed;
    player.y += y * player.speed;

    // Keep player inside the city
    if (player.x < 20) {
        player.x = 20;
    }

    if (player.x > canvas.width - 20) {
        player.x = canvas.width - 20;
    }

    if (player.y < 40) {
        player.y = 40;
    }

    if (player.y > canvas.height - 20) {
        player.y = canvas.height - 20;
    }

    message.innerText = "You are exploring the city...";

    drawGame();
}

function interact() {

    let foundBuilding = false;

    buildings.forEach(function(building) {

        let centerX = building.x + building.width / 2;
        let centerY = building.y + building.height / 2;

        let distance = Math.sqrt(
            Math.pow(player.x - centerX, 2) +
            Math.pow(player.y - centerY, 2)
        );

        if (distance < 130) {

            message.innerText =
                "You found the " +
                building.name +
                ". Something is waiting inside...";

            foundBuilding = true;
        }
    });

    if (!foundBuilding) {

        message.innerText =
            "There is nothing interesting here.";
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

// Start the game
drawGame();
