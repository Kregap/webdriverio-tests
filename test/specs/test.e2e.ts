import { expect } from '@wdio/globals'
import LoadingPage from '../pageobjects/loading.page.js'
import HeaderPage from '../pageobjects/header.page.js'

describe('Prestashop store', () => {
    it('should load the home page', async () => {
        LoadingPage.open()
        await expect(LoadingPage.loadingIndicator).not.toBeDisplayed()
        await LoadingPage.switchToNewFrame()
    })
    
    it('should find expected product via search field', async () => {
        const searchPhrase = 'HUMMINGBIRD PRINTED T-SHIRT'
        
        await HeaderPage.inputSearch.click()
        await HeaderPage.inputSearch.setValue(searchPhrase)
    })
})
