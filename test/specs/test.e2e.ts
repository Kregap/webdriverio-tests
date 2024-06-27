import { expect } from '@wdio/globals'
import LoadingPage from '../pageobjects/loading.page.js'
import HeaderPage from '../pageobjects/header.page.js'

describe('Prestashop store', () => {
    it('should load the home page', async () => {
        LoadingPage.open()
        await expect(LoadingPage.loadingIndicator).not.toBeDisplayed()
        await LoadingPage.switchToNewFrame()
    })
    
    it('should find expected product using search field', async () => {
        const searchPhrase = 'hummingbird'
        
        await HeaderPage.search(searchPhrase)
        const results = await HeaderPage.getSearchResults()
        results.forEach ( async (result) => {
            await expect(result).toHaveText(
                await expect.stringContaining('test')
            )
        })
    })
})
