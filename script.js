let txtEncrypt = document.getElementById('txtEncrypt');
let btnEncr = document.getElementById('btnEncr')
let resultEncr = document.getElementById('resultEncr')

let txtDecrypt = document.getElementById('txtDecrypt');
let btnDecr = document.getElementById('btnDecr')
let resultDecr = document.getElementById('resultDecr')

let resultTable = document.getElementById('resultTable')

let egyptAarr = ['𓂀','𓀀','𓀇','𓀖','𓀙','𓀨','𓀬'
,'𓀺','𓀾','𓁋','𓁙','𓁟','𓁴','𓁼','𓂊','𓀎','𓁶','𓂼','𓃃',
'𓃒','𓃟','𓃠','𓃥','𓄿','𓅔','𓆈']

let unicodeArr = egyptAarr.map(symbol => {
    return symbol.codePointAt(0)
});

btnEncr.addEventListener('click', () =>{
    let txtToBeEncr = txtEncrypt.value; 
    if(txtToBeEncr.match(/^[a-zA-Z]+$/g))
        resultEncr.innerText = encryptText( txtEncrypt.value);
    else
        alert("You must only introduce letters from the alphabet")
})


const encryptText = (string) => {
    string = string.toLowerCase();
    let result = [];
    for (const i in string) {
        let ascii = string.charCodeAt(i);
        ascii += 2;
        if(ascii > 122){
            ascii -= 26
        }
        
        let egyptIndex = ascii - 97
        let egyptLetter = egyptAarr[egyptIndex]

        result.push(egyptLetter)

    }

    generateTable(result)

    return result.join('');
}

const generateTable = (symbols) => {
  
    for(let i = 0; i < symbols.length;i++){
       
        var trElement = document.createElement("tr");
        
        for(let j = 0; j <  symbols.length;j++){
            var tdElement = document.createElement("td");
            if(j == i){
                tdElement.innerText = symbols[j]
            }
            else{
                tdElement.innerText = egyptAarr[Math.floor(Math.random()*egyptAarr.length)];
            }
            trElement.appendChild(tdElement);
        }

        resultTable.appendChild(trElement);
        
    }
}

const decryptText = (string) => {
    
    let result = [];
    
    for (const i in string) {
        let ascii = unicodeArr.findIndex(unicode =>
            unicode == string.codePointAt(i)
        ) + 97
        if(ascii != 96){
            ascii -= 2;
            if(ascii < 97 ){
                ascii +=26
            }
            
            let letter = String.fromCharCode(ascii);
            result.push(letter)
        }   

    }
   
    return result.join('');
}



btnDecr.addEventListener('click', () =>{
    resultDecr.innerText = decryptText(txtDecrypt.value);
})