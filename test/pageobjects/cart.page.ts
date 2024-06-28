import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * Cart with added products.
 */
class CartPage extends Page {
    // TODO: Get better selector!
    public get btnCheckout () {
        return $('#main > div > div.cart-grid-right.col-lg-4 > div.card.cart-summary > div.checkout.cart-detailed-actions.js-cart-detailed-actions.card-block > div > a')
    }
}

export default new CartPage()
