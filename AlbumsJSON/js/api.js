export async function getCards() {
    let response = await fetch ('./js/goose-swan.json')
    console.log(response)
    let res = await response.json()
    console.log(res)
}