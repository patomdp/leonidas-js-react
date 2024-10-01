const price = 2700
const macbook = {
  price,
  // getPrice: function() {

  // },
  get finalPrice() {
    return this.price * 1.16
  },
  set offer(offer) {
    this.price -= offer
  },
  getPrice() {
    console.log(this.price)
  },
  *discount(offer) {
    let price = this.finalPrice
    while (true) {
      yield price -= offer
    }
  }
}

window.price.textContent = macbook.price
macbook.offer = 500
window.offer.textContent = macbook.price
window['final-price'].textContent = macbook.finalPrice

const makeAnOffer = macbook.discount(15)
window['make-offer'].addEventListener('click', () => {
  window['final-price'].textContent = makeAnOffer.next().value
})