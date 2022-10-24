
exports.calc = (num, total) => { 
    let result;
    if(total == 0) result = 0
    else result = Math.round((num / total) * 100);
    return result;
}