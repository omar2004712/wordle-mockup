const wordsEl = document.querySelector('#words');
wordsEl.onselectstart = new Function ("return false")
wordsEl.style.cursor = 'default'
let allWords = `ABUSE
ADULT
AGENT
ANGER
APPLE
AWARD
BASIS
BEACH
BIRTH`
const dict = allWords.split('\n')

const correctWord = dict[Math.floor(Math.random()*dict.length)];


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
    char.querySelector('.letter').innerText = '';
    char.classList.remove('resize')
  }
}


function flipLetters(wordEl) //wordEl
{
  const colors = getBackGroundColor(correctWord, word);
  const borderColors = getBorderColor(correctWord, word);
  for(let i = 0; i < wordEl.children.length; i++){
    setTimeout(()=>{
      let char = wordEl.children[i];
      char.style.transform = 'rotateX(180deg)';
      setTimeout(()=>{char.style.backgroundColor = colors[i];
      char.style.borderColor = borderColors[i];
      char.querySelector('.letter').style.transform = 'scale(1, -1)';
      }, 150)
    }, 
      200*i)
  }
}


function getBackGroundColor(correctWord, word){
  const colors = [];
  const green = 'rgb(74, 158, 71)';
  const gray = 'rgba(255, 255, 255, 10%)';
  const yellow = 'rgb(163, 152, 53)';
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
  const green = 'rgb(74, 158, 71)';
  const gray = 'rgba(255, 255, 255, 0.1%)';
  const yellow = 'rgb(163, 152, 53)';
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

const result = document.createElement('div');
result.classList.add('result');

function game(event){
  if(wordIdx !== 6){
    if(isLetterValid(event.key.toUpperCase())){
        if(charIdx <= 4){
          words[wordIdx].querySelectorAll('.char')[charIdx].querySelector('.letter').innerText = event.key.toUpperCase();
          words[wordIdx].querySelectorAll('.char')[charIdx].style.borderColor = 'white';
          words[wordIdx].children[charIdx].classList.add('resize');
          charIdx++;
          word+=event.key.toUpperCase();
        }
    } 
    else if(event.key.toUpperCase() === 'ENTER'){
      if(isWordValid(dict, word)){
        flipLetters(words[wordIdx])
        if(correctWord == word){
          result.innerText = 'You Win';
          document.removeEventListener('keypress', game)
          setTimeout(wordsEl.append(result), 1500);
        }
        else if(wordIdx == 5){
          result.innerText = correctWord;
          setTimeout(()=>{wordsEl.append(result)}, 1500);
          document.removeEventListener('keypress', game)
        }
        else {
          result.remove();
        }
        word=''
        charIdx = 0;
        wordIdx++;
      }
      else{
        
        if(word.length === 5){
          clearWord(words[wordIdx]);
          result.innerText = 'Word is not in the list';
          charIdx = 0;
          word = '';
          for(let char of words[wordIdx].children){
            char.style.borderColor = 'rgba(255, 255, 255, 10%)';
          }
        }
        else{
          result.innerText = 'Not enough letters';
        }
        wordsEl.append(result);
        
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
      words[wordIdx].children[charIdx].querySelector('.letter').innerText = '';
      words[wordIdx].children[charIdx].classList.remove('resize');
      words[wordIdx].children[charIdx].style.borderColor = 'rgba(255, 255, 255, 10%)';
      const arr = word.split('');
      arr.pop();
      word = arr.join('');
    }
  }
})
