function getRandomFloat (min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hash(s){
    if(typeof s.toString != "string") {
        s = JSON.stringify(s);
    }

    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function pushUnique(array, value) {
    var valueHash = hash(value);

    for(var i = 0; i < array.length; i++) {
        var item = array[i];
        if(hash(item) == valueHash) {
            return array;
        }
    }

    array.push(value);

    return array;
}