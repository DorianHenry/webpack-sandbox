import '@css/styles.scss'
import HelloWorld from '@core/myClass'
import log from '@core/log'

let myClass = new HelloWorld()

document.querySelector('#button').addEventListener('click', _ => {
  import('jquery').then($ => {
    console.log($)
    log(myClass.init('new js'))
  })
})
