import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * Checkout page with added products.
 */
class CheckoutPage extends Page {
    public get fieldFirstName () {
        return $('#field-firstname')
    }
    public get fieldLastName () {
        return $('#field-lastname')
    }
    public get fieldEmail () {
        return $('#field-email')
    }
    // TODO: Get better selector!
    public get checkboxTermsAndConditions () {
        return $('#customer-form > div > div:nth-child(9) > div.col-md-6.js-input-column > span')
    }
    // TODO: Get better selector!
    public get checkboxDataPrivacy () {
        return $('#customer-form > div > div:nth-child(11) > div.col-md-6.js-input-column > span')
    }
    // TODO: Get better selector!
    public get btnContinuePersonalInfo () {
        return $('#customer-form > footer > button')
    }

    public get fieldAddress () {
        return $('#field-address1')
    }
    public get fieldPostcode () {
        return $('#field-postcode')
    }
    public get fieldCountry () {
        return $('#field-id_country')
    }
    public get fieldCity () {
        return $('#field-city')
    }
    // TODO: Get better selector!
    public get btnContinueAddress () {
        return $('button[name="confirm-addresses"]')
    }

    public get btnContinueDelivery () {
        return $('#js-delivery > button')
    }

    public get radioPaymentFirst () {
        return $('#payment-option-1-container')
    }
    public get radioPaymentSecond () {
        return $('#payment-option-2-container')
    }
    public get radioPaymentThird () {
        return $('#payment-option-3-container')
    }
    public get checkboxTermsAndConditionsPayment () {
        return $('#conditions-to-approve')
    }
    // TODO: Get better selector!
    public get btnPlaceOrder () {
        return $('#payment-confirmation > div.ps-shown-by-js > button')
    }

    // TODO: This should be related to radio buttons selectors directly.
    public async clickPaymentRadio (id: number) {
        await $('#payment-option-' + ((id + 1) as unknown as string)).click()
    }
}

export default new CheckoutPage()
