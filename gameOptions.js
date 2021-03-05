let gameOptions = (function() {
    // init
    // cacheDom
    let container = document.querySelector('.container');
    let marksContainer = container.querySelector('.btns');
    let markOptions = marksContainer.querySelectorAll('.btn');
    let optionsConainer = container.querySelector('.options');
    let gameOptions = optionsConainer.querySelectorAll('.btn');
    let mode;

    pubSub.on('gameStartedWithAi', getMode)
    pubSub.on('boardStarted', disableBtns);
    pubSub.on('gameStartedTwoPlayers', getMode);
    pubSub.on('gameRestarted', enableBtns);
    pubSub.on('gameConfigFinished', paintBtn);
    pubSub.on('cleanBoard', enableBtns);

    //bind events
    markOptions.forEach(item => {
        item.addEventListener('click', changePlayerMark);
    })

    gameOptions[0].addEventListener('click', changeTurn);
    gameOptions[1].addEventListener('click', restartGame);
    gameOptions[2].addEventListener('click', cleanBoard);

    // logic

    function cleanBoard() {
        pubSub.emit('cleanBoard', 1);
    }

    function paintBtn(data) {

        let mark = typeof data == 'string' ? data : data[0].markSymbol;

        if(mark == 'x') {
            markOptions[0].style.backgroundColor = 'black'
            markOptions[1].style.backgroundColor = 'rgba(0,0,0,0.4)'
        } else {
            markOptions[0].style.backgroundColor = 'rgba(0,0,0,0.4)'
            markOptions[1].style.backgroundColor = 'black'
        }
    }

    function restartGame() {
        pubSub.emit('gameRestarted', 3);
        gameStart.restart();
        pubSub.emit('playAgain', 3);

    }

    function changePlayerMark(e) {
        console.log('you have choosen ' + e.target.textContent);
        pubSub.emit('changePlayerMark', e.target.textContent)
        paintBtn(e.target.textContent.toLowerCase());
    }

    function changeTurn() {
        pubSub.emit('changeTurn', 'change');
    }

    function getMode(i) {
        mode = i;

        if(mode == 2) {
            markOptions.forEach(item => {
                item.disabled = true;
            })
            gameOptions[0].disabled = false;
            marksContainer.style.display = 'none'
        } else {
            gameOptions[0].disabled = false;
            markOptions.forEach(item => {
                item.disabled = false;
            })
            marksContainer.style.display = 'block'

        }

        

    }

    function disableBtns(i) {
        markOptions.forEach(item => {
            item.disabled = true;
        })

        gameOptions[0].disabled = true;
    }
    
    function enableBtns(i) {
        console.log('mode ' + mode);
        if (mode == 1) {
            markOptions.forEach(item => {
                item.disabled = false;
            })
            gameOptions[0].disabled = false;
        } else if(mode == 2) {
            gameOptions[0].disabled = false;
        }
    }

})();