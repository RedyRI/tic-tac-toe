let helper = (function() {
    function convertArray(d) {
        let arr = d.slice(0,)
        let newArray = [arr.slice(0,3),arr.slice(3,6),arr.slice(6,9)]
        return newArray;
    }

    function convertToIndex(arr) {
        return arr[0] * 3 + arr[1]
    }

    return {
        convertArray,
        convertToIndex,
    }

})();

let bchoice = {i:2, j:2};
console.log(helper.convertArray(["o", "x", "x", "o", "o", "x", "", "", "x"]))
console.log(helper.convertToIndex([bchoice.i,bchoice.j]))