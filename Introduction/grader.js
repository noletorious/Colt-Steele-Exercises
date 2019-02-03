function average (scores){
    //add all scores together, use the accumulator pattern as we iterate through array
    var total = 0;
    scores.forEach(function(score){
        total += score;
    });
    //divide all scores by number of scores
    var avg = total/scores.length;
    // round average
    return Math.round(avg);
}

var scores = [90, 98, 89, 100, 100, 86, 95];
console.log(average(scores));