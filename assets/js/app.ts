import '@css/styles'
import HelloWorld from '@core/myClass'
import log from '@core/log'

let myClass = new HelloWorld()

document.querySelector('#button').addEventListener('click', e => {
  console.log(e)
  import('jquery').then($ => {
    console.log($)
    log(myClass.init('no bitch'))
  })
})
