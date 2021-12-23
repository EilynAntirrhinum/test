import { cards } from "./albums.js" //import cards

export const gallery = function () {
    const modalWindowGallery = document.querySelector('.modal-gallery'),
        closeGallery = document.querySelector('.close-modal'),
        leftArrow = document.querySelector('.left-arrow'),
        rightArrow = document.querySelector('.right-arrow'),
        cardImg = document.querySelectorAll('.card-image')
    let numItem = 0

    leftArrow.addEventListener('click', (e) => {
        prevImg(e.currentTarget.closest('.img-modal'))
    })

    rightArrow.addEventListener('click', (e) => {
        nextImg(e.currentTarget.closest('.img-modal'))
    })

    function prevImg(e) {
        if (numItem < 1) {
            numItem = 2
            showInfo(cards, e, numItem)
        }
        else {
            numItem--
            showInfo(cards, e, numItem)
        }
    }

    function nextImg(e) {
        if (numItem > 1) {
            numItem = 0
            showInfo(cards, e, numItem)
        }
        else {
            numItem++
            showInfo(cards, e, numItem)
        }
    }

    cardImg.forEach(item => {
        item.addEventListener('click', (e) => {
            numItem = 0
            modalWindowGallery.style.display = 'flex'
            showInfo(cards, e.currentTarget.closest('.card'), numItem)
        })
    })

    function showInfo(array, currentItem, numItem) {
        let { image, name, description, price, id } = array.find(item => item.id == currentItem.id)
        document.querySelector('.img-modal-top > img').setAttribute('src', image[numItem])
        document.querySelector('.img-modal').id = id
        document.querySelector('.img-modal-bottom > .img-title').textContent = name
        document.querySelector('.img-modal-bottom > .img-text').textContent = description
        document.querySelector('.img-modal-bottom > .img-price').textContent = price + ` ₽`
    }

    function closeModal() { //closing modal window
        modalWindowGallery.style.display = 'none'
    }

    closeGallery.addEventListener('click', () => {
        closeModal()
    })

    document.addEventListener('keydown', (e) => { //closing modal window on esc
        if (e.code == 'Escape') {
            closeModal()
        }
    })

    modalWindowGallery.addEventListener('click', (e) => { //closing modal window out of modal
        if (e.target == e.currentTarget) {
            closeModal()
        }
    })
}