import { expect } from '@wdio/globals'
import LoadingPage from '../pageobjects/loading.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import ProductPage from '../pageobjects/product.page.js'

describe('PrestaShop store', () => {
    it('should load the home page', async () => {
        const timeoutToLoadDemoPage: number = 10000
        LoadingPage.open()
        await expect(LoadingPage.loadingIndicator).not.toBeDisplayed({ wait: timeoutToLoadDemoPage })
        await LoadingPage.switchToNewFrame()
    })
    
    it('should find expected product', async () => {
        const searchPhrase = 'Hummingbird cushion'
        
        await HeaderPage.search(searchPhrase)
        const results = await HeaderPage.getSearchResults()
        await results.forEach ( async (result) => {
            await expect(result).toHaveText(
                expect.stringContaining(searchPhrase)
            )
        })

        await results[0].click()
        await expect(ProductPage.productName).toHaveText(
            expect.stringContaining(searchPhrase.toUpperCase())
        )
    })
})
