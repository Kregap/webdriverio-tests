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
        return $('#ui-id-1')
    }
}

export default new HeaderPage()
