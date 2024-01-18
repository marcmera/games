function iniciarJuego(juego) {
    window.location.href = juego + "/index.html";
    }

document.getElementById("j1").addEventListener("click", function() {
    iniciarJuego("memory-card-game-main");
});

document.getElementById("j2").addEventListener("click", function() {
    iniciarJuego("flappy-bird-main");
});

document.getElementById("j3").addEventListener("click", function() {
    iniciarJuego("TicTacToe-main");
});

document.getElementById("j4").addEventListener("click", function() {
    iniciarJuego("whac-a-mole-main");
});
document.getElementById("j5").addEventListener("click", function() {
    iniciarJuego("chrome-dinosaur-game-main");
});
