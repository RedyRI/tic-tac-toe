let gameInfo = (function(){
    //init 
    let gameInfo = document.querySelector('.game-info');
    let playersInfo = gameInfo.querySelectorAll('.player');
    let turnInfo = gameInfo.querySelector('.turn');
    let p1Name;
    let p2Name;
    let gameEnded = false;
    let gameDraw = false;

    pubSub.on('gameConfigFinished', showInfo);
    pubSub.on('currentTurn', showTurn)
    pubSub.on('markChnaged', changeInfo);
    pubSub.on('turnChanged', showTurn);
    pubSub.on('playAgain', deleteInfo);
    pubSub.on('gotWinner', endGame);
    pubSub.on('draw', draw);


    function draw() {
        gameDraw = true;
    }

    function endGame() {
        gameEnded = true;
    }

    function deleteInfo() {
        playersInfo.forEach(item => {
            item.removeChild(item.firstElementChild)
        })
    }
    
    function showInfo(players){
        p1Name = players[0].name
        p2Name = players[1].name
        p1Info = getTemplate(players[0].name, players[0].markSymbol, 1)
        playersInfo[0].appendChild(p1Info);
        p2Info = getTemplate(players[1].name, players[1].markSymbol, 2)
        playersInfo[1].appendChild(p2Info);
    }

    function changeInfo(players) {
        p1Name = players[0].name
        p2Name = players[1].name
        p1Info = getTemplate(players[0].name, players[0].markSymbol, 1)
        playersInfo[0].replaceChild(p1Info, playersInfo[0].firstElementChild);
        p2Info = getTemplate(players[1].name, players[1].markSymbol, 2)
        playersInfo[1].replaceChild(p2Info, playersInfo[1].firstElementChild);
    }

    function showTurn(turn) {
        if (gameEnded) {
            turnInfo.textContent = `we got a winner`;
            gameEnded = false;
        } else if(gameDraw){
            turnInfo.textContent = `It is a Draw`;
            gameDraw = false;
        }else{
            console.log('current turn ' + turn);
            let pName = turn == 'player1' ? p1Name : p2Name;
            turnInfo.textContent = `current turn >>> ${pName}`;
        }
    }

    function getTemplate(name, mark, playerNum) {
        let playerInfo = document.createElement('div');
        playerInfo.classList.add('player-info')

        let nameContainer = document.createElement('div');
        nameContainer.classList.add('name-container');
        let pNameSpan = document.createElement('span');
        pNameSpan.classList.add('pname-spam')
        pNameSpan.textContent = 'Name: '
        let pName = document.createElement('span');
        pName.classList.add('player-name');
        pName.textContent = `${name}`;
        nameContainer.appendChild(pNameSpan)
        nameContainer.appendChild(pName)

        let playerNumber = document.createElement('span');
        playerNumber.classList.add('player-number');
        playerNumber.textContent = playerNum == 1 ? 'Player 1:' : 'Player 2:';
        
        let markContainer = document.createElement('div');
        markContainer.classList.add('mark-container');
        let pMarkSpan = document.createElement('span');
        pMarkSpan.classList.add('pmark-spam');
        pMarkSpan.textContent = 'Mark: '
        let pMark = document.createElement('span');
        pMark.classList.add('player-mark');
        pMark.textContent = `${mark}`;
        markContainer.appendChild(pMarkSpan)
        markContainer.appendChild(pMark)
        
        playerInfo.appendChild(playerNumber)
        playerInfo.appendChild(nameContainer)
        playerInfo.appendChild(markContainer)
        return playerInfo;
    }
})();