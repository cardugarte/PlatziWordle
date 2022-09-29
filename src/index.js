import { fromEvent, Subject } from 'rxjs'
import WORDS_LIST from './wordList.json'

const lettersRow = document.getElementsByClassName('letters-row')
const onKeyDown$ = fromEvent(document, 'keydown')
let letterIndex = 0
let letterRowIndex = 0
let userAnswer = []
const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]
let rightWord = getRandomWord()
const userWinOrLoser$ = new Subject


const insertLetter = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase()
    if( pressedKey.length === 1 && pressedKey.match(/[a-z]/i )) {
      let letterBox = Array.from(lettersRow)[letterRowIndex].children[letterIndex]
      letterBox.textContent = pressedKey
      letterBox.classList.add('filled-letter')
      userAnswer.push(pressedKey)
      letterIndex++
    } else if ( event.key === 'Backspace') {
      letterIndex--
        let letterBox = Array.from(lettersRow)[letterRowIndex].children[letterIndex]
        letterBox.textContent = ''
        letterBox.classList.remove('filled-letter')
    }
  }
}

const checkWord = {
  next: (event) => {
    if( event.key === 'Enter') {
      if( userAnswer.join('') === rightWord ) {
        userWinOrLoser$.next('win')
      }
    }
  }
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(checkWord)
userWinOrLoser$.subscribe((value) => {
  let letterRowsWinner = Array.from(lettersRow)[letterRowIndex]
  console.log(letterRowsWinner)
})


