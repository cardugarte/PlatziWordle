import { fromEvent } from "rxjs"

const lettersRow = document.getElementsByClassName('letters-row')
const onKeyDown$ = fromEvent(document, 'keydown')
let letterIndex = 0
let letterRowIndex = 0


const insertLetter = {
  next: (event) => {
    const pressedKey = event.key
    console.log(event.key)
    if( pressedKey.length === 1 && pressedKey.match(/[a-z]/i )) {
      let letterBox = Array.from(lettersRow)[letterRowIndex].children[letterIndex]
      letterBox.textContent = pressedKey
      letterBox.classList.add('filled-letter')
      letterIndex++
      console.log(letterBox)
    } else if ( pressedKey === 'Backspace') {
      letterIndex--
        let letterBox = Array.from(lettersRow)[letterRowIndex].children[letterIndex]
        letterBox.textContent = ''
        letterBox.classList.remove('filled-letter')
    }
  }
}

onKeyDown$.subscribe(insertLetter)


