var maping = function(){
    var words = this.text.toString().split(" ");
            words.forEach(function(key){
                emit(key, key);
            });
          };

var reducing = function(key, value){
                        return value.length;
             };

var finalize = function(key, value){
                        var notANumber = isNaN(value);
                        return notANumber?1:parseInt(value);
                };
                 
res = db.wiki.mapReduce( maping, reducing,
    {
        out: 'reduced.out',
        finalize: finalize
    });
db.wiki.out.find();