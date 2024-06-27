import { expect } from '@wdio/globals'
import LoadingPage from '../pageobjects/loading.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import ProductPage from '../pageobjects/product.page.js'
import CartModalPage from '../pageobjects/cartmodal.page.js'

describe('PrestaShop store', () => {
    const productName = 'Hummingbird cushion'

    it('should load the home page', async () => {
        const timeoutToLoadDemoPage: number = 10000
        LoadingPage.open()
        await expect(LoadingPage.loadingIndicator).not.toBeDisplayed({ wait: timeoutToLoadDemoPage })
        await LoadingPage.switchToNewFrame()
    })
    
    it('should allow searching for specific product', async () => {
        await HeaderPage.search(productName)
        const results = await HeaderPage.getSearchResults()
        await results.forEach ( async (result) => {
            await expect(result).toHaveText(
                expect.stringMatching(productName)
            )
        })

        await results[0].click()
        await expect(ProductPage.productName).toHaveText(
            expect.stringMatching(productName.toUpperCase())
        )
    })

    it('should allow adding specific product', async () => {
        const expectedProductsCount = '1'

        await ProductPage.btnAddToCart.click()

        await expect(CartModalPage.productName).toHaveText(
            expect.stringMatching(productName)
        )
        await expect(CartModalPage.addedProductQuantity).toHaveText(
            expect.stringMatching(expectedProductsCount))
        await expect(CartModalPage.productsQuantity).toHaveText(
            expect.stringContaining(expectedProductsCount)
        )
    })
})
