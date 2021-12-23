import { menu } from "./one-card.js"

import { auth } from "./auth.js"

import { cart } from "./cart.js"

import { gallery } from "./gallery.js"

import { getCards } from "./api.js"

menu()
auth()
cart()
gallery()

getCards()
    .then(data => createManyCards(data.cards))