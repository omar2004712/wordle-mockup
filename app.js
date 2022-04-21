const dict = [
  'CLEAN',
  'APPLE',
  'WRITE',
  'VAPOR',
  'ACTOR'
]

const correctWord = dict[Math.floor(Math.random()*dict.length)]

function isWordCorrect(correctWord ,word){
  return word===correctWord;
}

function isWordValid(dict, word){
  if(dict.indexOf(word) === -1){
    console.log(word);
    return false;
  }
  return true;
}

function isLetterValid(char){
  return (char >= 'A' && char <= 'Z' && char.length == 1)

}

const words = document.querySelectorAll('.word');
let wordIdx = 0;
let charIdx = 0;
let word = '';

function game(event){
  if(wordIdx !== 6){ 
    if(isLetterValid(event.key.toUpperCase())){
        if(charIdx <= 4){
          words[wordIdx].querySelectorAll('.char')[charIdx].innerText = event.key.toUpperCase();
          words[wordIdx].querySelectorAll('.char')[charIdx].style.borderColor = 'white';
          word+=event.key.toUpperCase();
          charIdx++;
        }
    } 
    else if(event.key.toUpperCase() === 'ENTER'){
      if(isWordCorrect(correctWord, word)){
        console.log("you win");
        document.removeEventListener('keypress', game)
      }
      if(isWordValid(dict, word)){
        for(let char of words[wordIdx].children){
          char.style.backgroundColor = 'rgba(255, 255, 255, 10%)';
          char.style.borderColor = 'rgba(255, 255, 255, 10%)'
          console.log(char)
        }
        wordIdx++;
      }
      charIdx = 0;
      word = '';
    }
  }
}

const evtLis = document.addEventListener('keypress', game)




