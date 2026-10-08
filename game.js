let day = 1;
let score = 0;

function startGame() {
    day = 1;
    score = 0;

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    showScene();
}

function showScene() {

    let dayText = document.getElementById("dayText");
    let sceneTitle = document.getElementById("sceneTitle");
    let storyText = document.getElementById("storyText");
    let choices = document.getElementById("choices");

    choices.innerHTML = "";

    if (day == 1) {

        dayText.innerText = "DAY 1";
        sceneTitle.innerText = "The Park";

        storyText.innerText =
        "You are walking through the park. You notice that the ground is full of plastic bottles and paper.";

        addChoice("Clean the park", 2);
        addChoice("Leave it and continue walking", 0);
    }

    else if (day == 2) {

        dayText.innerText = "DAY 2";
        sceneTitle.innerText = "The Street";

        storyText.innerText =
        "The next morning, you see a street light that is not working. People are having difficulty walking there.";

        addChoice("Report the broken light", 2);
        addChoice("Ignore the problem", 0);
    }

    else if (day == 3) {

        dayText.innerText = "DAY 3";
        sceneTitle.innerText = "The Community";

        storyText.innerText =
        "You now have a chance to help other people take care of the area around them.";

        addChoice("Ask others to help", 2);
        addChoice("Do nothing", 0);
    }
}

function addChoice(text, points) {

    let choices = document.getElementById("choices");

    let button = document.createElement("button");

    button.innerText = text;
    button.className = "choice";

    button.onclick = function() {
        choose(points);
    };

    choices.appendChild(button);
}

function choose(points) {

    score = score + points;

    if (day < 3) {
        day = day + 1;
        showScene();
    }
    else {
        showResult();
    }
}

function showResult() {

    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("scoreText").innerText =
        "Your decision score: " + score + " / 6";

    let result = "";

    if (score == 6) {
        result =
        "You chose to help whenever you could. Your small actions made the community better.";
    }
    else if (score >= 3) {
        result =
        "You made some positive choices. The world changed, but there is still more you can do.";
    }
    else {
        result =
        "You ignored most problems. The world stayed almost the same. Small actions can make a difference.";
    }

    document.getElementById("resultText").innerText = result;
}
