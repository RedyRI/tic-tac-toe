let winner = (function(){
    let winnerContainer = document.querySelector('.winner-container');
    let restartBtn = winnerContainer.querySelector('.restart-btn');
    let winnerName = winnerContainer.querySelector('p');
    
    pubSub.on('gotWinner', showWinner);
    pubSub.on('draw', showDraw);
    pubSub.on('cleanBoard', restartGame);
    pubSub.on('playAgain', hideWinner);


    // bind events
    restartBtn.addEventListener('click', restartGame);

    function showWinner(winerPlayer) {
        winnerContainer.style.display = 'flex';
        winnerName.textContent = `${winerPlayer.name.toUpperCase()} WINS`;
    }

    function showDraw() {
        winnerContainer.style.display = 'flex';
        winnerName.textContent = `Draw`;
    }

    function restartGame(e) {
        winnerContainer.style.display = 'none';
        pubSub.emit('gameRestarted', 3);
    }

    function hideWinner() {
        winnerContainer.style.display = 'none';
    }

})();