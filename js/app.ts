import { log } from './log'
import { css } from './style.css'
console.log(css)

log('bonjour')

// function getComponent() {
// return import('jquery').then(_ => {
//   console.log(_)
// })
// }

document.querySelector('#button').addEventListener('click', () => {
  // getComponent()
  // var [a, , b] = [1, 2, 3];
  // console.log(b)
  // import('jquery').then(($) => {
  //   $('body').css({ 'background-color': "#000" })
  // })
});
