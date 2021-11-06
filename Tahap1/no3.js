valid = s => {
  let map = {
    ")": "(",
    "}": "{",
    "]": "[",
    ">": "<",
  }

  let data = [];
  for(let i=0; i<s.length; i++){
    if(s[i] === "(" || s[i] === "[" || s[i] === "{" || s[i] === "<"){
      data.push(s[i]);
    }else if(data[data.length -1] === map[s[i]]){
      data.pop()
    }else{
      return false;
    }
  }
  return data.length ? false : true
}

console.log(valid("[<{<{[{[{}[[<[<{{[<[<[[[<{{[<<<[[[<[<{{[<<{{<{<{<[<{[{{[{{{{[<<{{{<{[{[[[{<<<[{[<{<<<>>>}>]}]>>>}]]]}]}>}}}>>]}}}}]}}]}>]>}>}>}}>>]}}>]>]]]>>>]}}>]]]>]>]}}>]>]]]}]}>}>]"))
console.log(valid("<>("))