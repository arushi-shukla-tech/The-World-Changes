const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 550;

let player = {
    x: 450,
    y: 300,
    size: 22,
    speed: 5
};

let camera = {
    x: 0,
    y: 0
};

let message = "Explore the city...";

const buildings = [
    { x: 100, y: 80, w: 150, h: 100, name: "Old House" },
    { x: 600, y: 70, w: 180, h: 110, name: "School" },
    { x: 90, y: 390, w: 170, h: 100, name: "Hospital" },
    { x: 620, y: 370, w: 170, h: 110, name: "City Tower" }
];

const trees = [
    { x: 330, y: 80 },
    { x: 500, y: 90 },
    { x: 330, y: 450 },
    { x: 500, y: 450 },
    { x: 50, y: 260 },
    { x: 850, y: 260 }
];

const places = [
    { x: 175, y: 210, name: "Old House" },
    { x: 690, y: 210, name: "School" },
    { x: 175, y: 360, name: "Hospital" },
    { x: 690, y: 350, name: "City Tower" }
];

function drawCity() {

    ctx.fillStyle = "#6b9b63";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoads();
    drawBuildings();
    drawTrees();
    drawPlaces();
    drawPlayer();

}

function drawRoads() {

    ctx.fillStyle = "#555b5d";

    ctx.fillRect(0, 245, canvas.width, 90);
    ctx.fillRect(405, 0, 90, canvas.height);

    ctx.strokeStyle = "#d9d9a8";
    ctx.lineWidth = 4;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 290);
        ctx.lineTo(x + 25, 290);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(450, y);
        ctx.lineTo(450, y + 25);
        ctx.stroke();
    }
}

function drawBuildings() {

    buildings.forEach(function(building) {

        ctx.fillStyle = "#9b6b50";
        ctx.fillRect(
            building.x - camera.x,
            building.y - camera.y,
            building.w,
            building.h
        );

        ctx.fillStyle = "#d7c5a3";

        ctx.fillRect(
            building.x + 20 - camera.x,
            building.y + 30 - camera.y,
            35,
            30
        );

        ctx.fillRect(
            building.x + 90 - camera.x,
            building.y + 30 - camera.y,
            35,
            30
        );

        ctx.fillStyle = "#4d3025";

        ctx.fillRect(
            building.x + building.w / 2 - 20 - camera.x,
            building.y + building.h - 45 - camera.y,
            40,
            45
        );

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";

        ctx.fillText(
            building.name,
            building.x + 10 - camera.x,
            building.y + 18 - camera.y
        );
    });
}

function drawTrees() {

    trees.forEach(function(tree) {

        ctx.fillStyle = "#654321";

        ctx.fillRect(
            tree.x - 6 - camera.x,
            tree.y + 15 - camera.y,
            12,
            30
        );

        ctx.beginPath();

        ctx.fillStyle = "#285c35";

        ctx.arc(
            tree.x - camera.x,
            tree.y - camera.y,
            25,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });
}

function drawPlaces() {

    places.forEach(function(place) {

        let distance = Math.sqrt(
            Math.pow(player.x - place.x, 2) +
            Math.pow(player.y - place.y, 2)
        );

        if (distance < 65) {

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px Arial";

            ctx.fillText(
                "Press ● to enter",
                place.x - camera.x - 45,
                place.y - camera.y - 35
            );
        }
    });
}

function drawPlayer() {

    ctx.fillStyle = "#222";

    ctx.beginPath();

    ctx.arc(
        player.x - camera.x,
        player.y - camera.y,
        player.size / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#f2c6a0";

    ctx.beginPath();

    ctx.arc(
        player.x - camera.x,
        player.y - camera.y - 15,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#3f6fa0";

    ctx.fillRect(
        player.x - 10 - camera.x,
        player.y - 8 - camera.y,
        20,
        25
    );
}

function movePlayer(dx, dy) {

    player.x += dx * player.speed * 8;
    player.y += dy * player.speed * 8;

    if (player.x < 25) {
        player.x = 25;
    }

    if (player.x > 875) {
        player.x = 875;
    }

    if (player.y < 25) {
        player.y = 25;
    }

    if (player.y > 525) {
        player.y = 525;
    }

    updateCamera();
    checkLocation();
    drawCity();
}

function updateCamera() {

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    if (camera.x < 0) {
        camera.x = 0;
    }

    if (camera.y < 0) {
        camera.y = 0;
    }

    if (camera.x > 0) {
        camera.x = 0;
    }

    if (camera.y > 0) {
        camera.y = 0;
    }
}

function checkLocation() {

    places.forEach(function(place) {

        let distance = Math.sqrt(
            Math.pow(player.x - place.x, 2) +
            Math.pow(player.y - place.y, 2)
        );

        if (distance < 65) {
            message = "You are near the " + place.name;
        }
    });

    document.getElementById("message").innerText = message;
}

function interact() {

    let nearestPlace = null;
    let nearestDistance = 1000;

    places.forEach(function(place) {

        let distance = Math.sqrt(
            Math.pow(player.x - place.x, 2) +
            Math.pow(player.y - place.y, 2)
        );

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPlace = place;
        }
    });

    if (nearestPlace && nearestDistance < 65) {

        message =
            "You entered the " +
            nearestPlace.name +
            ". Something feels familiar...";

    } else {

        message = "There is nothing to interact with here.";

    }

    document.getElementById("message").innerText = message;
}

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

drawCity();
