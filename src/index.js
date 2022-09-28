import { fromEvent } from "rxjs";

const onKeyDown$ = fromEvent(document, 'keydown')
const observableKey = {
  next: (event) => {
    console.log(event.key)
  }
}

onKeyDown$.subscribe(observableKey)





//Ejemplo de clase

// import { Observable } from "rxjs";

// // agregar $ al final
// const observableAlfa$ = new Observable(suscriber => {
//   suscriber.next(10);
//   suscriber.next(2);
//   suscriber.next(3);
//   suscriber.next(1);
//   suscriber.complete() //observable finished
//   //suscriber.error('Error en el flujo') //observable finished
// })

// const observador = {
//   next: (value) => {
//     console.log('Value', value);
//   },
//   complete: () => {
//     console.info('Finished');
//   },
//   error: (error) => {
//     console.error(error)
//   }
// }

// observableAlfa$.subscribe(observador);