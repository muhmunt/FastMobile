function pecahan(price, money){
  let inc = money - price;

  if(money < price){
    return false
  }
  
 var pecahan1= inc /100000;
  var sisa1= inc %100000;
  
  var pecahan2= sisa1/50000;
  var sisa2= sisa1%50000;
  
  var pecahan3= sisa2/20000;
  var sisa3= sisa2%20000;
  
  var pecahan4= sisa3/10000;
  var sisa4= sisa3%10000;
  
  var pecahan5= sisa4/5000;
  var sisa5= sisa4%5000;
  
  var pecahan6= sisa5/2000;
  var sisa6= sisa5%2000;
  
  var pecahan7= sisa6/1000;
  var sisa7= sisa6%1000;
  
  var pecahan8= sisa7/500;
  var sisa8= sisa7%500;
  
  var pecahan9= sisa8/200;
  var sisa9= sisa8%200;
  
  var pecahan10= sisa9/100;
  var sisa10= sisa9%100;
  
  var pecahan11= sisa10/50;
  var sisa11= sisa10%50; 

  return {
    "100000": Math.floor(pecahan1),
    "50000": Math.floor(pecahan2),
    "20000": Math.floor(pecahan3),
    "10000": Math.floor(pecahan4),
    "5000": Math.floor(pecahan5),
    "2000": Math.floor(pecahan6),
    "1000": Math.floor(pecahan7),
    "500": Math.floor(pecahan8),
    "200": Math.floor(pecahan9),
    "100": Math.floor(pecahan10),
    "50": Math.floor(pecahan11),
  }
}

console.log(pecahan(700649, 800000))