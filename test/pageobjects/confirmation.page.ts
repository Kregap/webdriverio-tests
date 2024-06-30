import { $ } from '@wdio/globals'
import Page from './page.js'
import { LooseObject } from '../utils/looseobject.js'

class ConfirmationPage extends Page {
    public get orderItemsSection () {
        return $('//div[contains(@class, "order-confirmation-table")]')
    }

    public async getOrders () {
        const elements = await this.orderItemsSection.$$('//div[contains(@class, "order-line")]')
        let productsInCart: LooseObject[] = []
        await elements.forEach( async (line) => {
            let product = new LooseObject()

            product['details'] = await line.$('//div[contains(@class, "details")]').getText()
            product['quantity'] = await line.$('//div[contains(@class, "qty")]/*[1]/*[2]').getText()
            product['totalPrice'] = await line.$('//div[contains(@class, "qty")]/*[1]/*[3]').getText()

            productsInCart.push(product)
        })
        return productsInCart
    }
}

export default new ConfirmationPage()
