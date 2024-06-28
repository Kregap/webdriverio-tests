import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * Store webpage header.
 */
class HeaderPage extends Page {
    public get inputSearch () {
        return $('aria/Search')
    }
    public get searchResultList () {
        // TODO: Ask devs for Aria label or better selector in general.
        return $('#ui-id-1')
    }
    public get searchResults () {
        return this.searchResultList.$$('//*[@class="product"]')
    }

    public async search(text: string) {
        await this.inputSearch.waitForDisplayed()
        this.inputSearch.click()
        this.inputSearch.setValue('')
        this.inputSearch.setValue(text)
    }
    
    /**
     * Wait for search results to populate completely and return the results.
     * 
     * @param resultsTimeout how long to wait for list to completely populate
     * @returns names of found products
     */
    public async getSearchResults (resultsTimeout: number = 2000): Promise<WebdriverIO.ElementArray> {
        await this.searchResultList.waitForDisplayed()
        // Wait for results to populate.
        let resultsCount: number = 0
        await browser.waitUntil( async () => {
            const list = await this.searchResults
            // Check if anything was found, and there are no new results after last check.
            if (resultsCount > 0 && list.length == resultsCount) {
                return true
            } else {
                resultsCount = list.length
                return false
            }
        }, { timeout: resultsTimeout, interval: 200 })
        await browser.pause(200)
        return this.searchResults
    }
}

export default new HeaderPage()
