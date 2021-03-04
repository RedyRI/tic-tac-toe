let ai = (function() {
    let posibleChoices = [0,1,2,3,4,5,6,7,8];

    function makeChoice(d) {
        while (posibleChoices.length > 0) {
            let i = Math.floor(Math.random() * (posibleChoices.length));
            let choice = +posibleChoices.splice(i,1);
            
            if(d[choice] == '') {
                return choice
            }
        }
    }

    function getPosibleChoices() {
        return posibleChoices
    }

    function restart() {
        posibleChoices = [0,1,2,3,4,5,6,7,8];
    }

    return {
        makeChoice,
        getPosibleChoices,
        restart,
    }

})();