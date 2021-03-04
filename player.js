function playerFactory(mark, name) {

    function getMark() {
        return this.mark;
    }

    function getName() {
        return this.name;
    }

    return {
        mark,
        name,
        getMark,
        getName,
    }
};