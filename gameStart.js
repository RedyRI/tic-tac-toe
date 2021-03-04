var gameStart = (
    function() {
        let player1;
        let player2;
        let player1Choices = [0,0,0,0,0,0,0,0,0];
        let player2Choices = [0,0,0,0,0,0,0,0,0];
        let name;
        let mark;
        let computerMark;
        let markSymbol;
        const x = "url('./images/cancel.png')";
        const o = "url('./images/circle.png')";

        // cacheDom
        let container = document.querySelector('.container');
        let mode = container.querySelector('.game-mode');
        let modeBtns = mode.querySelectorAll('.mode');
        let twoPlayerMode = container.querySelector('.two-players');
        let twoModeNames = twoPlayerMode.querySelectorAll('input');
        let twoPlayerModeStartBtn = twoPlayerMode.querySelector('.start-btn');
        let aiMode = container.querySelector('.one-player');
        let aiModeName = aiMode.querySelector('input');
        let aiModeMarkBtns = aiMode.querySelectorAll('.mark');
        let aiModeStartBtn = aiMode.querySelector('.start-btn');
        
        // bind events
        modeBtns.forEach(element => {
            element.addEventListener('click', setPlayers)
        });

        twoPlayerModeStartBtn.addEventListener('click', twoPlayerModeStart);

        aiModeMarkBtns.forEach(element => {
            element.addEventListener('click', gameWithAiMark)
        })

        aiModeStartBtn.addEventListener('click', aiModeStart);

        function setPlayers(e) {
            if (e.target == modeBtns[0]) {
                console.log('two players mode');
                twoPlayerMode.style.display = 'flex';
                aiMode.style.display = 'none';
            } else {
                console.log('one player mode');
                aiMode.style.display = 'flex';
                twoPlayerMode.style.display = 'none';
            }
            mode.style.display = 'none'
        }

        function twoPlayerModeStart(e) {
            console.log('game starting with two players');
            player1 = personFactory(twoModeNames[0].value, x, 'x', true, player1Choices)
            player2 = personFactory(twoModeNames[1].value, o, 'o', false, player2Choices)
            twoPlayerMode.style.display = 'none';
                        
            pubSub.emit('gameConfigFinished', [player1, player2])
            pubSub.emit('currentTurn', 'player1')
            pubSub.emit('gameStartedTwoPlayers', 2);

        }

        function gameWithAiMark(e) {
            console.log(e.target.textContent);
            if (e.target == aiModeMarkBtns[0]) {
                aiModeMarkBtns[0].style.backgroundColor = 'green';
                aiModeMarkBtns[1].style.backgroundColor = 'rgb(239, 239, 239)';
                mark = x;
                computerMark = o;
            } else {
                aiModeMarkBtns[0].style.backgroundColor = 'rgb(239, 239, 239)';
                aiModeMarkBtns[1].style.backgroundColor = 'green';
                mark = o;
                computerMark = x;
            }
        }

        function aiModeStart(e) {
            console.log(e.target.textContent);
            name = aiModeName.value;
            if(!mark) {mark = x; computerMark = o};
            markSymbol = mark == x ? 'x': 'o';
            computerMarkSymbol = computerMark == o ? 'o' : 'x';
            player1 = personFactory(name, mark, markSymbol, true, player1Choices);
            player2 = personFactory('computer', computerMark, computerMarkSymbol, false, player2Choices);
            twoPlayerMode.style.display = 'none';
            aiMode.style.display = 'none';

            console.log(player1, player2);

            pubSub.emit('gameConfigFinished', [player1, player2])
            pubSub.emit('currentTurn', 'player1')
            pubSub.emit('gameStartedWithAi', 1)

        }

        function restart() {
            mode.style.display = 'flex';
            twoPlayerMode.style.display = 'none';
            aiMode.style.display = 'none';
            player1 = '';
            player2 = '';
            twoModeNames.forEach(item => item.value = '');
            aiModeName.value = '';
            player1Choices = [0,0,0,0,0,0,0,0,0];
            player2Choices = [0,0,0,0,0,0,0,0,0];
        }

        function getPlayers() {
            return [player1, player2]
        }

        function getCurrenturn() {
            let players = getPlayers();
            if (players[0].turn == true) {
                return 'player1'
            } else {    
                return 'player2'
            }
        }

        return {
            restart,
        }
    }
)();