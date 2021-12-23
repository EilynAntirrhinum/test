import { cards } from "./albums.js" //import cards

const menu = function () { //creating cards on page

    const cardsMenu = document.querySelector('.cards-menu'),
    album = JSON.parse(localStorage.getItem('album'))

    function createManyCards(data) {
        data.forEach(item => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.id = item.id
            card.innerHTML = createCard(item)
            cardsMenu.append(card)

            card.querySelector('.button-add-cart').addEventListener('click', () => {
                getAlbum(album)
                addToCart(item)
            })
        })
    }

    function getAlbum(array) {
        return array = JSON.parse(localStorage.getItem('album')) || []
    }

    function addToCart(cartItem) {
        const cart = JSON.parse(localStorage.getItem('album')) || []

        const index = cart.findIndex(item => cartItem.id === item.id)

        if (index >= 0) {
            cart[index].count++
        } else {
            cartItem.count = 1
            cart.push(cartItem)
        }

        localStorage.setItem('album', JSON.stringify(cart))
    }

    function createCard(item) {
        const { image, name, description, price } = item
        return `
            <img src="${image[0]}" alt="image" class="card-image">
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
                                <strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
            `
    }

    createManyCards(cards)
}

export { menu }