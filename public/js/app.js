const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const resultMessage = document.querySelector('#result-message')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    resultMessage.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''

    const location = search.value
    const fetchAddress = 'http://localhost:3000/weather?address=' + location

    fetch(fetchAddress)
        .then((response) => {
        response.json().then((data) => {         
            if(data.error){
                resultMessage.textContent = 'Error:'
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                resultMessage.textContent = 'Information found:'
                messageOne.textContent = data.addressReturned
                messageTwo.textContent = data.forecast
            }
        })
    })
})