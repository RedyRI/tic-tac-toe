let minimax = (function(){

    let points = {
        x: 10,
        o: -10,
        tie: 0,
    }
    
    function aiMove(b) {
        
        let boardAi = [[b[0],b[1],b[2]],[b[3],b[4],b[5]],[b[6],b[7],b[8]]]
        
        let p1 = board.returnPlayers()[0].markSymbol;
        let p2 = board.returnPlayers()[1].markSymbol;
        
        console.log(boardAi);
        console.log(p1);
        console.log(p2);

        if (p2 == 'o') {
            points.x = -10;
            points.o = 10;
        }

        if(checkWiner()) {
            console.log('got a winner');
            return '';
        } else {
            
            let bestScore = -Infinity;
            let bestMove;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(boardAi[i][j] == '') {
                        boardAi[i][j] = p2;
                        console.log(boardAi);
                        let score = minimax(boardAi, 0, false);
                        console.log(score);
                        boardAi[i][j] = '';
                        if(score > bestScore) {
                            bestMove = {i,j}
                            bestScore = score;
                        }
                    }
                }
            }
            // boardAi[bestMove.i][bestMove.j] = ai;
            console.log(bestMove);
            console.log(boardAi);
            return bestMove.i * 3 + bestMove.j
        }
    
        
        function equals3(a,b,c) {
            return (a == b && b == c && a != '');
        }
        
        function checkWiner() {
            
            let winner = null;
            
            //horizontal
            for (let i = 0; i < 3; i++) {
                if(equals3(boardAi[i][0],boardAi[i][1],boardAi[i][2])) {
                    winner = boardAi[i][0]
                }
            }
            
            //vertical
            for (let i = 0; i < 3; i++) {
                if(equals3(boardAi[0][i],boardAi[1][i],boardAi[2][i])) {
                    winner = boardAi[0][i]
                }
            }
            
            //diagonal
            if(equals3(boardAi[0][0],boardAi[1][1],boardAi[2][2])) {
                winner = boardAi[0][0]
            }
            if(equals3(boardAi[0][2],boardAi[1][1],boardAi[2][0])) {
                winner = boardAi[0][2]
            }
            
            
            let availableSpots = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if(!boardAi[i][j]) {
                        availableSpots++;
                    }
                }
            }
            
            if(availableSpots == 0 && winner == null) {
                return 'tie'
            } else {
                return winner;
            }
        }
        

        function minimax(board, deep, isMaximazing) {

            // let points = {
            //     x: 10,
            //     o: -10,
            //     tie: 0,
            // }
            let result = checkWiner();
            if( result !== null) {
                return points[result];
            }
            
            if(isMaximazing) {
                let bestScore = -Infinity;
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                        if(board[i][j] == '') {
                            board[i][j] = p2;
                            let score = minimax(board, deep + 1, false);
                            board[i][j] = '';
                            bestScore = Math.max(score, bestScore);
                        }
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                        if(board[i][j] == '') {
                            board[i][j] = p1;
                            let score = minimax(board, deep + 1, true);
                            board[i][j] = '';
                            bestScore = Math.min(score, bestScore)
                        }
                    }
                }
                return bestScore;
            }
        }

    }


    return {
        aiMove,
    }
})();