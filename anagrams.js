db.anagrams.out.drop();
var mappingFn = function () {
    var sorted = this.word.split("").sort().toString();
    emit(sorted, this.word);
};
var toString = function (k, v) {
    return results.toString();
};
var finalize = function (k, v) {
    if (v.length > 6) return v;
    else return  null;
};
res = db.words.mapReduce(mappingFn, toString, {out: 'anagrams.txt', finalize: finalize});
db.anagrams.out.find();

