import { $ } from '@wdio/globals'
import Page from './page.js';

class LoadingPage extends Page {
    public get loadingIndicator () {
        return $('#loadingMessage')
    }
    public get newFrame () {
        return $('#framelive')
    }

    /**
     * Switch WebDriverIO browser context to new iframe in which actual page is loaded
     * after loading indicator disappears.
     */
    public async switchToNewFrame () {
        await this.newFrame.waitForExist({ timeout: 2000 })
        await browser.switchToFrame(0)
    }
}

export default new LoadingPage()
