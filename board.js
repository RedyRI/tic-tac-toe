let board = (function(){
    //init
    //cacheDom
    let currentTurn;
    let board = document.querySelector('.gameboard');
    let squares = board.querySelectorAll('.square');
    let players;
    let iteration = 0;
    let gameboard = ['','','','','','','','',''];
    let actual;
    let mode;
    const x = "url('./images/cancel.png')";
    const o = "url('./images/circle.png')";

    //bind events
    squares.forEach(item => {
        item.addEventListener('click', render);
    })

    pubSub.on('gameConfigFinished', startBoard)
    pubSub.on('gameRestarted', restartBoard);
    pubSub.on('changePlayerMark', changePlayerMark);
    pubSub.on('changeTurn', changeTurn);
    pubSub.on('gameStartedWithAi', setMode)
    pubSub.on('gameStartedTwoPlayers', setMode);
    pubSub.on('cleanBoard', restartBoard);


    function setMode(m) {
        mode = m;
        console.log(`the mode of the board is ${mode}`);
    }

    function startBoard(data) {
        players = data;
        currentTurn =  players[0].turn == true ? 'player1' : 'player2';
        board.style.pointerEvents = 'all';
        console.log('current turn ' + currentTurn);
    }

    function changePlayerMark(m) {
        m = m.toLowerCase()
        if(players[0].markSymbol != m) {
            players[0].markSymbol = m;
            if (m == 'x') {
                players[0].mark = x;
                players[1].mark = o;
                players[1].markSymbol = 'o';
            } else {
                players[0].mark = o;
                players[1].mark = x;
                players[1].markSymbol = 'x';
            }
            
            pubSub.emit('markChnaged', players);
        } 
    }

    function changeTurn() {
        if (mode == 2) {   
            if (currentTurn == 'player1') {
                currentTurn = 'player2'
            } else {
                currentTurn = 'player1'
            }
        } else if (mode == 1 && currentTurn == 'player1') {
            currentTurn = 'player2'
            render();
        }
        pubSub.emit('turnChanged', currentTurn);
    }

        function restartBoard() {
            console.log('restart fired');
            squares.forEach(item => {
                item.style.backgroundImage = 'none';
                item.style.pointerEvents = 'all';
            });
            let p1Choices = players[0].playerChoices.map(item => item = 0);
            let p2Choices = players[1].playerChoices.map(item => item = 0);
            players[0].playerChoices = p1Choices;
            players[1].playerChoices = p2Choices;
            iteration = 0;
            gameboard = ['','','','','','','','',''];
            currentTurn = 'player1';
            pubSub.emit('turnChanged', currentTurn);
            console.log(p1Choices, p2Choices);
            ai.restart();
            console.log(ai.getPosibleChoices());
        }

    function render(e) {
        if(mode==2) {
            iteration += 1;

            if(currentTurn == 'player1') {
                e.target.style.backgroundImage = players[0].mark;
                currentTurn = 'player2';
                gameboard[e.target.getAttribute('data-id')] = players[0].markSymbol;
                players[0].playerChoices[e.target.getAttribute('data-id')] = 1;
            } else {
                e.target.style.backgroundImage = players[1].mark;
                currentTurn = 'player1'
                gameboard[e.target.getAttribute('data-id')] = players[1].markSymbol;
                players[1].playerChoices[e.target.getAttribute('data-id')] = 1;
            }
            
            e.target.style.pointerEvents = 'none';
            
            if (iteration > 4) {
                actual =  currentTurn == 'player2' ? players[0] : players[1];
                if(checkBoard(actual)) {
                    console.log(`the winner is ${actual.markSymbol}`);
                    pubSub.emit('gotWinner', actual);
                } else {
                    if(iteration == 9) {
                        pubSub.emit('draw', 3);
                    }
                    console.log(`${actual.markSymbol} doesnt win`);
                };
            }
            pubSub.emit('currentTurn', currentTurn);
            
            if(iteration == 1) {
                pubSub.emit('boardStarted', 1);
            }
            console.log('current iteration ' + iteration);
        } else if(mode == 1) {
            if(currentTurn == 'player1') {
                iteration += 1;
                e.target.style.backgroundImage = players[0].mark;
                gameboard[e.target.getAttribute('data-id')] = players[0].markSymbol;
                players[0].playerChoices[e.target.getAttribute('data-id')] = 1;
                e.target.style.pointerEvents = 'none';
                
                console.log('player choice ' + e.target.getAttribute('data-id'));
                
                if(iteration == 1) {
                    pubSub.emit('boardStarted', 1);
                }

                if(checkBoard(players[0])) {
                    console.log(`the winner is ${players[0].markSymbol}`);
                    pubSub.emit('gotWinner', players[0]);
                    iteration = 0;
                    ai.restart();
                }else {
                    iteration += 1;
                    let choice = ai.makeChoice(gameboard);
                    if (choice || choice == 0) {   
                        squares[choice].style.backgroundImage = players[1].mark;
                        squares[choice].style.pointerEvents = 'none';
                        gameboard[choice] = players[1].markSymbol;
                        players[1].playerChoices[choice] = 1;                    
                    }
                   console.log('ai choice ' + choice + ' and ' + ai.getPosibleChoices());

                    if(checkBoard(players[1])) {
                        console.log(`the winner is ${players[1].markSymbol}`);
                        pubSub.emit('gotWinner', players[1]);
                        ai.restart();
                        iteration = 0;
                    } else {
                        if(iteration >= 9) {
                            pubSub.emit('draw', 3);
                            ai.restart();
                            iteration = 0;
                        }
                    };
                };
                pubSub.emit('currentTurn', currentTurn);

            } else {
                iteration += 1;
                pubSub.emit('boardStarted', 1); 
                let choice = ai.makeChoice(gameboard);
                squares[choice].style.backgroundImage = players[1].mark;
                squares[choice].style.pointerEvents = 'none';
                gameboard[choice] = players[1].markSymbol;
                players[1].playerChoices[choice] = 1;                    
                
                currentTurn = 'player1';
                pubSub.emit('currentTurn', currentTurn);

                console.log('ai choice ' + choice + ' and ' + ai.getPosibleChoices());
                
            }
        }
    }

    function checkBoard(actual) {
        let count = 0;
        let choices = actual.playerChoices;
        for(let i = 0, j = 0; i < choices.length; i++, j++) {
            count += choices[i];
            if (count == 3) {
                return true; 
            }
            if (j == 2) {
                j = -1;
                count = 0;
            }
        };

        for(let i = 0; i < 3; i++) {
            count = choices[i] + choices[i+3] + choices[i+6];
            if (count == 3) {
                return true;
            } else {
                count = 0;
            }
        };

        if(choices[0]+ choices[4]+ choices[8] == 3) {
            return true;
        } else if(choices[2]+ choices[4]+ choices[6] == 3) {
            return true;
        } else {
            return false;
        };
    }

})()