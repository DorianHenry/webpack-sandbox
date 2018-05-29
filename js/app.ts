import { log } from './log'
import * as styles from '../css/styles.scss'

console.log(styles)

document.querySelector('#button').addEventListener('click', event => {
  import('jquery').then($ => {
    console.log('hello')
  }).catch(error => {
    console.log(error)
  })
})
