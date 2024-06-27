import { browser } from '@wdio/globals'

/**
* Main page object containing all methods, selectors and functionality
* that is shared across all page objects.
*/
export default class Page {
    /**
     * Open the the browser with the page.
     */
    public open () {
        browser.url(`https://demo.prestashop.com/`)
    }
}
