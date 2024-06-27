import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * Page with product details.
 */
class ProductPage extends Page {
    // TODO: Get better selector!
    public get productName() {
        return $('#main > div.row.product-container.js-product-container > div:nth-child(2) > h1')
    } 
}

export default new ProductPage()
