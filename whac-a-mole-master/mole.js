let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let time = 120; // tiempo en segundos

window.onload = function () {
    setGame();
};

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // Mostrar tiempo inicial
    document.getElementById("timer").innerText = "Time: " + time.toString() + "s";

    // Iniciar temporizador
    setInterval(updateTimer, 1000);

    // Llamar a setMole y setPlant cada segundo y dos segundos, respectivamente
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function updateTimer() {
    if (gameOver) {
        return;
    }

    time--;

    // Mostrar tiempo actualizado
    document.getElementById("timer").innerText = "Time: " + time.toString() + "s";

    if (time <= 0) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    document.getElementById("timer").innerText = "GAME OVER";

    // Limpiar intervalos para detener la generación de nuevos moles y plantas
    clearInterval(moleInterval);
    clearInterval(plantInterval);
}

let moleInterval, plantInterval;

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "../images/Sergi3.jpg";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "../images/vodka.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        endGame();
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}
