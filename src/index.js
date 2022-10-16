import { fromEvent, Subject } from 'rxjs'
import WORDS_LIST from './wordList.json'

const letterRows = document.getElementsByClassName('letters-row')
const onKeyDown$ = fromEvent(document, 'keydown')
let letterIndex = 0
let letterRowIndex = 0
let userAnswer = []
const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]
let rightWord = getRandomWord()
console.log(rightWord)
const userWinOrLoser$ = new Subject
const message = document.getElementById('message')


const insertLetter = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase()
    if( pressedKey.length === 1 && pressedKey.match(/[a-z]/i )) {
      let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
      letterBox.textContent = pressedKey
      letterBox.classList.add('filled-letter')
      userAnswer.push(pressedKey)
      letterIndex++
    }
  }
}

const checkWord = {
  next: (event) => {
    if( event.key === 'Enter') {
      const rightWordArray = Array.from(rightWord)

      if( userAnswer.length !== 5){
        message.textContent = 'Te faltan algunas letras!'
        return
      } else {
        message.textContent = ''
      }

      for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let letterBox = Array.from(letterRows)[letterRowIndex].children[i]
        console.log(letterBox)
        let letterPosition = Array.from(rightWord).indexOf(userAnswer[i])
        console.log(letterPosition)

        if(letterPosition === -1) {
          letterColor = 'letter-grey'
        } else {
          if(rightWordArray[i] === userAnswer[i]) {
            letterColor = 'letter-green'
          } else {
            letterColor = 'letter-yellow'
          }
        }
        letterBox.classList.add(letterColor)
      }
      
      // if(userAnswer.length === 5) {
      //   letterIndex = 0
      //   userAnswer = []
      //   letterRowIndex ++
      // } else {
      //   message.textContent = 'Te faltan algunas letras!'
      // }


      if( userAnswer.join('') === rightWord ) {
        userWinOrLoser$.next()
      }
    }
  }
}

const removeLetter = {
  next: (event) => {
    const pressedKey = event.key
    if(pressedKey === 'Backspace' && letterIndex !== 0) {
      let letterBox = letterRows[letterRowIndex].children[userAnswer.length - 1]
      letterBox.textContent = ''
      letterBox.classList = 'letters'
      letterIndex --
      userAnswer.pop()
    }
  }
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(checkWord)
onKeyDown$.subscribe(removeLetter)
userWinOrLoser$.subscribe(() => {
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex]
  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add('letter-green')   
  }
})


