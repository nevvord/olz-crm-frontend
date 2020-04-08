// Fotm Group
function FormGroupInput(event) {
  event.cancelBubble = true
  const label = event.target.closest(`.form-group`).querySelector(`label`)
  if (label) {
    label.style.top = '-.9rem'
    label.style.left = '0rem'
    label.style.fontSize = '.8rem'
  }
}

document.addEventListener('focus', () => {
  const inputs = document.getElementsByClassName('nevvi-fg-input')
  for (let index = 0; index < inputs.length; index++) {
    if (!inputs[index].value) {
      const label = inputs[index].closest(`.form-group`).querySelector(`label`)
      label.style.top = '.3rem'
      label.style.left = '.3rem'
      label.style.fontSize = '.9rem'
    }

  }
})

const allInputsCheck = () => {
  const inputs = document.getElementsByClassName('nevvi-fg-input')
  if (inputs) {
    for (let index = 0; index < inputs.length; index++) {
      if (inputs[index].value) {
        const label = inputs[index].closest(`.form-group`).querySelector(`label`)
        label.style.top = '-.9rem'
        label.style.left = '.0rem'
        label.style.fontSize = '.8rem'
      }
    }
  }
}



console.log('nevvi work');
