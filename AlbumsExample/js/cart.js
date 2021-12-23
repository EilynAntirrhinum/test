export const cart = function () {
    const cartBut = document.querySelector('#cart-button'),
        modalCart = document.querySelector('.modal-cart'),
        closeCart = document.querySelector('.close'),
        modalBody = document.querySelector('.modal-body'),
        pricetag = document.querySelector('.modal-pricetag'),
        clearCart = document.querySelector('.clear-cart'),
        album = JSON.parse(localStorage.getItem('album')) || []

    cartBut.addEventListener('click', () => { //открытие корзины
        createCardInCart(getAlbum(album))
        setPricetag(pricetag)
        showCart()
    })

    function createCardInCart(data) { //создание карточек в корзине
        modalBody.innerHTML = ''
        data.forEach(item => {
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('food-row')
            cardDiv.innerHTML = createCardView(item)
            modalBody.append(cardDiv)

            cardDiv.querySelector('.plus').addEventListener('click', () => {
                plusAmount(item, cardDiv.querySelector('.counter'), pricetag)
            })

            cardDiv.querySelector('.minus').addEventListener('click', () => {
                minusAmount(item, cardDiv.querySelector('.counter'), pricetag)
            })
        })
    }

    clearCart.addEventListener('click', () => { //сброс и очищение localStorage на кнопку 'Отмена'
        modalBody.innerHTML = ''
        localStorage.removeItem('album')
        pricetag.textContent = 0 + ` ₽`
    })

    function getAlbum(array) {
        return array = JSON.parse(localStorage.getItem('album')) || []
    }

    function setPricetag(pricetag) {
        pricetag.textContent = album.reduce((sum, item) => sum + item.price * item.count, 0) + ` ₽`
    }

    function updateAmount(span, cartItem) {
        const index = album.findIndex(item => cartItem.id === item.id)
        span.textContent = album[index].count
    }

    function plusAmount(cartItem, span) { //прибавление и вывод количества
        getAlbum(album)
        const index = album.findIndex(item => cartItem.id === item.id)

        album[index].count++

        localStorage.setItem('album', JSON.stringify(album))

        updateAmount(span, cartItem)
        setPricetag(pricetag)
    }

    function minusAmount(cartItem, span, pricetag) { //уменьшение и вывод количества
        getAlbum(album)
        const index = album.findIndex(item => cartItem.id === item.id)

        if (album[index].count <= 0) {
            album[index].count = 0
        }
        else album[index].count--

        localStorage.setItem('album', JSON.stringify(album))

        updateAmount(span, cartItem)
        setPricetag(pricetag)
    }

    function createCardView(object) {
        const { name, price, count } = object
        return `
					<span class="food-name">${name}</span>
					<strong class="food-price">${price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button minus">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button plus">+</button>
					</div>
        `
    }

    function showCart() { //открытие модального окна корзины
        modalCart.style.display = 'flex'
    }

    function closeModal() { //закрытие модального окна корзины
        modalCart.style.display = 'none'
    }

    closeCart.addEventListener('click', () => { //закрытие на крестик
        closeModal()
    })

    document.addEventListener('keydown', (e) => { //закрытие на кнопку Esc
        if (e.code == 'Escape') {
            closeModal()
        }
    })

    modalCart.addEventListener('click', (e) => { //закрытие по клику вне модального окна
        if (e.target == e.currentTarget) {
            closeModal()
        }
    })
}