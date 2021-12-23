export const auth = function () {

    const modalAuth = document.querySelector('.modal-auth'),
        logIn = document.querySelector('.button-auth'),
        logOut = document.querySelector('.button-out'),
        username = document.querySelector('.user-name'),
        closeAuth = document.querySelector('.close-auth'),
        infoSpan = document.querySelectorAll('.info-span'),
        inLogin = document.querySelector('#login'),
        inPass = document.querySelector('#password'),
        butLogin = document.querySelector('.button-login'),
        cartBut = document.querySelector('#cart-button'),
        modalBody = document.querySelector('.modal-body'),
        pricetag = document.querySelector('.modal-pricetag')

    if (localStorage.getItem('user')) {
        username.textContent = JSON.parse(localStorage.getItem('user')).name
        logIn.style.display = 'none'
        logOut.style.display = 'block'
        cartBut.style.display = 'flex'
    }

    logInForm.addEventListener('submit', e => {
        e.preventDefault()
    })

    function logInAndCloseAuth() {
        if (checkInvalidSymb(inLogin)) {
            infoSpan[0].classList.replace('visible-off', 'visible-on')

            if (checkInvalidSymb(inPass)) {
                infoSpan[1].classList.replace('visible-off', 'visible-on')
            }
        }
        else if (checkInvalidSymb(inPass)) {
            infoSpan[1].classList.replace('visible-off', 'visible-on')
        }
        else loggingIn()
    }

    function checkInvalidSymb(input) { //проверка на наличие текста в input
        return input.value.trim().length <= 0 //true
    }

    butLogin.addEventListener('click', () => {
        logInAndCloseAuth()
    })

    logIn.addEventListener('click', () => {
        showAuth()
    })

    logOut.addEventListener('click', () => {
        loggingOut()
    })

    function loggingIn() {
        modalAuth.classList.replace('active', 'hide')
        logIn.style.display = 'none'
        logOut.style.display = 'block'
        localStorage.setItem('user', JSON.stringify({ name: inLogin.value, password: inPass.value }))
        username.classList.replace('hide', 'acitve')
        username.textContent = JSON.parse(localStorage.getItem('user')).name
        cartBut.style.display = 'flex'

    }

    function loggingOut() {
        logOut.style.display = 'none'
        username.classList.replace('active', 'hide')
        username.textContent = ""
        localStorage.removeItem('user')
        logIn.style.display = 'flex'
        cartBut.style.display = 'none'
        modalBody.innerHTML = ''
        localStorage.removeItem('album')
        pricetag.textContent = 0 + ` ₽`
    }

    function closeModal() { //closing modal window
        modalAuth.classList.replace('active', 'hide')
    }

    closeAuth.addEventListener('click', () => {
        closeModal()
    })

    document.addEventListener('keydown', (e) => { //closing modal window on esc
        if (e.code == 'Escape') {
            closeModal()
        }
    })

    modalAuth.addEventListener('click', (e) => { //closing modal window out of modal
        if (e.target == e.currentTarget) {
            closeModal()
        }
    })

    function showAuth() { //optning of modal window
        modalAuth.classList.replace('hide', 'active')
    }
}