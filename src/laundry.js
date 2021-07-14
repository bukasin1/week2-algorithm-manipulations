/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
    let maxPair = 0
    cleanPile.sort()
    dirtyPile.sort()
    let unmatchedCleanSocks = []

    //Handling the clean pile. Finding matching pairs and pushing unmatched socks into an array for further processing.
    while(cleanPile.length){
        if(cleanPile.includes(cleanPile[0],1)){
            maxPair++
            cleanPile.splice(0,2)
        }else{
            unmatchedCleanSocks.push(...cleanPile.slice(0,1))
            cleanPile = cleanPile.slice(1)
        }
    }

    //Handling the remaining sorted unmatched socks, checking in the dirty pile with the available no of washes if there are any matching pairs.
    for(sock of unmatchedCleanSocks){
        if(dirtyPile.includes(sock) && noOfWashes > 0){
            maxPair++
            let index = dirtyPile.indexOf(sock)
            dirtyPile.splice(index,1)
            noOfWashes--
        }
    }

    //Handling the remaining dirty socks, checking together with the no of washes if there are matching pairs that can be watched and added up.
    while(dirtyPile.length && noOfWashes >= 2){
        if(dirtyPile.includes(dirtyPile[0],1)){
            maxPair++
            dirtyPile.splice(0,2)
            noOfWashes-=2
        }else{
            dirtyPile = dirtyPile.slice(1)
        }
    }

    return maxPair
}


console.log(getMaxPairs(20,[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]))
module.exports = getMaxPairs;
