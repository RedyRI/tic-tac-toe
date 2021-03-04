let gameboard = (function() {
    // init
    let currentState =  [0,0,0,0,0,0,0,0,0];
    let turn;
    let player;
    let computer;
    const x = "url('./images/cancel.png')";
    const o = "url('./images/circle.png')";
    // cacheDom
    let table = document.querySelector('.gameboard');
    let square = table.querySelectorAll('.square');
    let btns = document.querySelectorAll('.btn');
    console.log(btns);
    // bind events
    square.forEach(element => {
        element.addEventListener('click', render);
    });

    btns.forEach(element => {
        element.addEventListener('click', setPlayer);
    }); 

    function setPlayer(e) {
        console.log(e.target.textContent);
        if(e.target.textContent == 'X') {
            player = {
                mark: x,
                chr: 'x',
            };
            computer = {
                mark: o,
                chr: 'o',
            };
        } else {
            player = {
                mark: o,
                chr: 'o',
            };
            computer = {
                mark: x,
                chr: 'x',
            };
        };
        turn = 'player';
    }

    
    function render(e) {
        console.log('i am rendering');
        if(turn == 'player') {
            e.target.style.backgroundImage = player.mark;
            turn = 'computer'
            setPoints(e, player)
        } else if (turn == 'computer'){
            e.target.style.backgroundImage = computer.mark;
            turn = 'player'
            setPoints(e, computer)
        }

    };

    function setPoints(e, cPlayer) {
        e.target.style.pointerEvents = 'none';
        currentState[e.target.getAttribute('data-id')] = cPlayer.chr;
        console.log(currentState);
    }

    return {
        currentState,
    }

})();