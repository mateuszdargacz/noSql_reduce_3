#Rozwiązania zadań na egzamin:
#Sprzęt:
    - Procesor Pentium I7    
	- Ram 8GB DDR3 1300    
	- Dysk twardy Samsung 840 PRO   
	- System Arch linux (manjaro)   

Wykorzystanie zasobów komputera (dla obu zadań podobne)
** Dla importu oraz parsowania **

**| ram | dysk |proc.|**  
**|:------|--------|------:|**  
**| 94 % | 100% |22%|**   
** Dla operacji anagramów oraz mapreduce, niewiele się różniły **
**| ram | dysk |proc.|**  
**|:------|--------|------:|**  
**| 94 % | 100% |ok 40%|**   
#Zadanie 3a:
> - Przygotować funkcje map i reduce, które:
> - wyszukają wszystkie anagramy w pliku word_list.txt 

Import pliku csv:

```js
mongoimport -c words -d nosql --type csv --headerline --file words_list.csv
```
Czas importu był znikomy - poniżej kilku sekund.

Znajdywanie anagramów  
kod [Anagrams.js](https://github.com/mateuszdargacz/noSql_reduce_3/blob/master/anagrams.js)

```js
{
    "result" : "anagrams.txt",
    "timeMillis" : 384,
    "counts" : {
        "input" : 8199,
        "emit" : 8199,
        "reduce" : 914,
        "output" : 7011
    },

```

ilość anagramów: 914
Pierwsze 10 anagramów: 

```js
db['anagrams.txt'].find({value:{$type:2}}).sort({id:-1})

```

```js
/* 0 */
{
    "_id" : "a,a,b,d,o,r",
    "value" : "abroad,aboard"
}

/* 1 */
{
    "_id" : "a,a,b,l,s,t",
    "value" : "basalt,tablas"
}

/* 2 */
{
    "_id" : "a,a,b,m,n,t",
    "value" : "bantam,batman"
}

/* 3 */
{
    "_id" : "a,a,c,e,t,v",
    "value" : "caveat,vacate"
}

/* 4 */
{
    "_id" : "a,a,c,i,m,n",
    "value" : "caiman,maniac"
}

/* 5 */
{
    "_id" : "a,a,c,l,r,s",
    "value" : "rascal,scalar"
}

/* 6 */
{
    "_id" : "a,a,c,l,s,u",
    "value" : "casual,causal"
}

/* 7 */
{
    "_id" : "a,b,i,n,r,s",
    "value" : "bairns,brains"
}

/* 8 */
{
    "_id" : "a,b,i,n,r,y",
    "value" : "binary,brainy"
}

/* 9 */
{
    "_id" : "a,b,m,r,s,u",
    "value" : "umbras,rumbas"
}

/* 10 */
{
    "_id" : "a,b,n,o,r,y",
    "value" : "barony,baryon"
}

```



#Zadanie 3b:
Przerobienie pliku wejściowego na odpowiedni format.
kod [toXml.js](https://github.com/mateuszdargacz/noSql_reduce_3/blob/master/toXml.js)
czas wykonania około to około 26min

Import danych
 ```js
	mongoimport -c wiki -d nosql --file --type json  --jsonArray  data.json  
 ```
Czas importu : około 8min

kod  mapreduce [mapReduce.js](https://github.com/mateuszdargacz/noSql_reduce_3/blob/master/mapReduce.js)
czas wykonania to około 74 minuty!



```js
{
    "result" : "reduced.out",
    "timeMillis" : 26472252,
    "counts" : {
        "input" : 1671883,
        "emit" : 520337162,
        "reduce" : 63187424,
        "output" : 5429884
    },
```

```js
db['reduced.out'].find().sort({value:-1}).limit(10);

/* 0 */
{
    "_id" : "urodził",
    "value" : 5382
}
/* 1 */
{
    "_id" : "sześć",
    "value" : 5352
}
/* 2 */
{
    "_id" : "Urodził",
    "value" : 5342
}
/* 3 */
{
    "_id" : "ukończeniu",
    "value" : 5307
}
/* 4 */
{
    "_id" : "Dwa",
    "value" : 5261
}
/* 5 */
{
    "_id" : "rodzinie",
    "value" : 5261
}

```
