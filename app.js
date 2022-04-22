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


function clearWord(word){ //word element
  for(let char of word.children){
    char.innerText = '';
  }
}

function getBackGroundColor(correctWord, word){
  const colors = [];
  const green = 'rgb(84, 177, 84)';
  const gray = 'rgba(255, 255, 255, 10%)';
  const yellow = 'rgb(175, 184, 58)';
  for(let char of word){
    if(correctWord.indexOf(char) == word.indexOf(char)){
      colors.push(green);
    }
    else if (correctWord.indexOf(char) !== -1){
      colors.push(yellow);
    }
    else{
      colors.push(gray);
    }
  }
  return colors;
}

function getBorderColor(correctWord, word){
  const colors = [];
  const green = 'rgb(84, 177, 84)';
  const gray = 'rgba(255, 255, 255, 0.1%)';
  const yellow = 'rgb(175, 184, 58)';
  for(let char of word){
    if(correctWord.indexOf(char) == word.indexOf(char)){
      colors.push(green);
    }
    else if (correctWord.indexOf(char) !== -1){
      colors.push(yellow);
    }
    else{
      colors.push(gray);
    }
  }
  return colors;
}

function game(event){
  if(wordIdx !== 6){ 
    if(isLetterValid(event.key.toUpperCase())){
        if(charIdx <= 4){
          words[wordIdx].querySelectorAll('.char')[charIdx].innerText = event.key.toUpperCase();
          words[wordIdx].querySelectorAll('.char')[charIdx].style.borderColor = 'white';
          words[wordIdx].children[charIdx].classList.add('resize');
          words[wordIdx].children[charIdx].addEventListener('animationend', ()=>{
          words[wordIdx].children[charIdx].classList.remove('resize');
          })
          word+=event.key.toUpperCase();
          charIdx++;
        }
    } 
    else if(event.key.toUpperCase() === 'ENTER'){
      if(isWordCorrect(correctWord, word)){
        console.log("you win");
        const result = document.createElement('div');
        result.innerText = 'You Win';
        result.classList.add('result');
        const words = document.querySelector('#words');
        words.append(result);
        document.removeEventListener('keypress', game)
      }
      if(isWordValid(dict, word)){
        const colors = getBackGroundColor(correctWord, word);
        const borderColors = getBorderColor(correctWord, word);
        for(let i=0; i < 5; i++){
          let color = colors[i];
          let borderColor = borderColors[i];
          words[wordIdx].children[i].style.backgroundColor = color;
          words[wordIdx].children[i].style.borderColor = borderColor;
          words[wordIdx].children[i].style.transform = 'rotateX(180deg);'
        }
        console.log('ss')
        wordIdx++;
        if(wordIdx == 6){
          const result = document.createElement('div');
          result.innerText = correctWord;
          result.classList.add('result');
          const words = document.querySelector('#words');
          words.append(result);
        }
        word=''
        charIdx = 0;
      }
      else{
        if(word.length === 5){
          clearWord(words[wordIdx]);
          charIdx = 0;
          word = '';
          for(let char of words[wordIdx].children){
            char.style.borderColor = 'rgba(255, 255, 255, 10%)';
          }
        }
        words[wordIdx].classList.add('shake')
        words[wordIdx].addEventListener('animationend', ()=>{
          words[wordIdx].classList.remove('shake');
        })
      }
      
    }
  }
}

document.addEventListener('keypress', game)
document.addEventListener('keyup', (event)=>{
  if (event.key == 'Backspace'){
    if(charIdx != 0){
      charIdx--;
      words[wordIdx].children[charIdx].innerText = '';
      words[wordIdx].children[charIdx].style.borderColor = 'rgba(255, 255, 255, 10%)';
      const arr = word.split('');
      arr.pop();
      word = arr.join('');
    }
  }
})
