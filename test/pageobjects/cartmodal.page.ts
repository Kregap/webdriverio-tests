import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * Modal with new product added to cart.
 */
class CartModalPage extends Page {
    // TODO: Get better selector!
    public get productName () {
        return $('#blockcart-modal > div > div > div.modal-body > div > div.col-md-5.divide-right > div > div:nth-child(2) > h6')
    }
    // TODO: Get better selector!
    public get addedProductQuantity () {
        return $('#blockcart-modal > div > div > div.modal-body > div > div.col-md-5.divide-right > div > div:nth-child(2) > span.product-quantity > strong')
    }
    // TODO: Get better selector!
    public get productsQuantity () {
        return $('#blockcart-modal > div > div > div.modal-body > div > div.col-md-7 > div > p.cart-products-count')
    }
}

export default new CartModalPage()
