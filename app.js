{ //to take access for correct word from the console
  //since the code is not in the window object the user will not be able to access the correct word from the console.
  const wordsEl = document.querySelector('#words');
  wordsEl.onselectstart = new Function ("return false")
  wordsEl.style.cursor = 'default'
  let bColor = 'white';
  let allWords = `ABUSE ADULT AGENT ANGER APPLE AWARD BASIS BEACH BIRTH`
  const dict = allWords.split(' ')
  const chars = [];

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


  function clearWord(wordEl){ //word element
    for(let char of wordEl.children){
      char.querySelector('.letter').innerText = '';
      char.classList.remove('resize')
    }
  }


  function flipLetters(wordEl) //wordEl
  {
    const colors = getBackGroundColor(correctWord, wordEl);
    const borderColors = getBorderColor(correctWord, wordEl);
    for(let i = 0; i < wordEl.children.length; i++){
      setTimeout(()=>{
        let char = wordEl.children[i];
        char.style.transform = 'rotateX(180deg)';
        setTimeout(()=>{char.style.backgroundColor = colors[i];
        char.style.borderColor = borderColors[i];
        char.querySelector('.letter').style.transform = 'scale(1, -1)';
        char.style.color = "white";
        }, 150)
      }, 
        200*i)
    }
    for(let i = 0; i < 5; i++){
      chars.pop();
    }
  }


  function getWord(wordEl){
    let word = '';
    for(const char of wordEl.children){
      word+=char.querySelector('.letter').innerText;
    }
    return word;
  }


  function isWordCorrect(wordEl, correctWord){
    const word = getWord(wordEl);
    return word === correctWord;
  }


  function getBackGroundColor(correctWord, wordEl){
    const colors = [];
    const green = 'rgb(74, 158, 71)';
    const gray = 'rgb(107, 104, 104';
    const yellow = 'rgb(163, 152, 53)';
    const word = getWord(wordEl);
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

  function getBorderColor(correctWord, wordEl){
    const colors = [];
    const green = 'rgb(74, 158, 71)';
    const gray = 'rgba(255, 255, 255, 0.1%)';
    const yellow = 'rgb(163, 152, 53)';
    const word = getWord(wordEl);
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
            words[wordIdx].querySelectorAll('.char')[charIdx].style.borderColor = bColor;
            chars.push(words[wordIdx].querySelectorAll('.char')[charIdx]);
            words[wordIdx].children[charIdx].classList.add('resize');
            charIdx++;
          }
      } 
      else if(event.key.toUpperCase() === 'ENTER'){
        if(isWordValid(dict, getWord(words[wordIdx]))){
          flipLetters(words[wordIdx])
          if(isWordCorrect(words[wordIdx], correctWord)){
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
          charIdx = 0;
          wordIdx++;
        }
        else{
          
          if(getWord(words[wordIdx]).length === 5){
            clearWord(words[wordIdx]);
            result.innerText = 'Word is not in the list';
            charIdx = 0;
            for(let char of words[wordIdx].children){
              char.style.borderColor = 'rgb(107, 104, 104)';
            }
            for(let i = 0; i < 5; i++){
              chars.pop();
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
        words[wordIdx].children[charIdx].style.borderColor = 'rgb(107, 104, 104';
        chars.pop();
      }
    }
  })

  const cb = document.querySelector('input');
  const mode = document.querySelector('.mode');
  const body = document.body;
  const hLine = document.querySelector('.hLine');

  cb.addEventListener('change', (e)=>{
    if(e.target.checked){
      mode.style.color = 'black';
      body.style.background = 'white';
      body.style.color = "black"
      bColor = 'black';
      mode.innerText = "LIGHT MODE";
      hLine.style.borderColor = 'black';
      for(let char of chars){
        char.style.borderColor = 'black';
      }
    }
    else{
      mode.style.color = 'white';
      body.style.backgroundColor = 'rgba(0,0,0, 90%)';
      body.style.color = "white";
      bColor = 'white';
      mode.innerText = "DARK MODE";
      hLine.style.borderColor = 'white';
      for(let char of chars){
        char.style.borderColor = 'white';
      }
    }
  })
}

