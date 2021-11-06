const getFirstIndex = (arr) => {
  const save = {};
  var results = [];
  for (const [index, value] of arr.entries()) {
    if (save.hasOwnProperty(value)) {
      return save[value]
    }
  
    save[value] = value;
    
  }
  return -1;
};

function indexed(n, words){
  var arr = words.split(",");
  var data = getFirstIndex(arr)
  var results = []
  for ( i=0; i < arr.length; i++ ){
        if ( arr[i] == data ){
          results.push( i+1 );
        }
       };
  return results
}
console.log(indexed(4, "sate,satu,sate,sato"))
