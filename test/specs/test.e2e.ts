import { expect } from '@wdio/globals'
import LoadingPage from '../pageobjects/loading.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import ProductPage from '../pageobjects/product.page.js'
import CartModalPage from '../pageobjects/cartmodal.page.js'
import CartPage from '../pageobjects/cart.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'
import ConfirmationPage from '../pageobjects/confirmation.page.js'

describe('PrestaShop store', () => {
    const productName = 'Hummingbird cushion'
    const fullProductName = 'Hummingbird cushion (Color: White)'
    const price = '€22.68'
    const quantity = '1'

    it('should load the home page', async () => {
        const timeoutToLoadDemoPage: number = 10000
        LoadingPage.open()
        await expect(LoadingPage.loadingIndicator).not.toBeDisplayed({ wait: timeoutToLoadDemoPage })
        await LoadingPage.switchToNewFrame()
    })
    
    it('should allow searching for specific product', async () => {
        // TODO: Significant failure rate at this step - fix it!
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

    it('should allow proceeding with checkout', async () => {
        // TODO: Can we avoid using hardcoded text/translations?
        const expectedPaymentOptions: string[] = [
            'Pay by bank wire',
            'Pay by Cash on Delivery',
            'Pay by Check'
        ]

        await CartModalPage.btnCheckout.click()
        await CartPage.btnCheckout.click()

        await CheckoutPage.fieldFirstName.setValue('John')
        await CheckoutPage.fieldLastName.setValue('White')
        await CheckoutPage.fieldEmail.setValue('mail@mail.com')
        await CheckoutPage.checkboxTermsAndConditions.click()
        await CheckoutPage.checkboxDataPrivacy.click()
        await CheckoutPage.btnContinuePersonalInfo.click()

        // TODO: Use countries enum, with number matching expected value.
        await CheckoutPage.fieldCountry.selectByAttribute('value', '8')
        await CheckoutPage.fieldAddress.setValue('Green Street 42')
        await CheckoutPage.fieldPostcode.setValue('12345')
        await CheckoutPage.fieldCity.setValue('Greenvalley')
        await CheckoutPage.btnContinueAddress.waitForDisplayed()
        await CheckoutPage.btnContinueAddress.click()
        
        await CheckoutPage.btnContinueDelivery.click()

        await expect(CheckoutPage.radioPaymentFirst).toHaveText(
            expect.stringMatching(expectedPaymentOptions[0])
        )
        await expect(CheckoutPage.radioPaymentSecond).toHaveText(
            expect.stringMatching(expectedPaymentOptions[1])
        )
        await expect(CheckoutPage.radioPaymentThird).toHaveText(
            expect.stringMatching(expectedPaymentOptions[2])
        )
    })
    
    it('should allow completing purchase', async () => {
        await CheckoutPage.clickPaymentRadio(0)
        await CheckoutPage.checkboxTermsAndConditionsPayment.click()
        await CheckoutPage.btnPlaceOrder.click()

        await ConfirmationPage.orderItemsSection.waitForDisplayed()
        // TODO: Use defined class object.
        const products = await ConfirmationPage.getOrders()
        // TODO: Check total price.
        // TODO: Represent expected cart state in custom object.

        await expect(products.length).toEqual(1)
        await expect(products[0]['details']).toEqual(fullProductName)
        await expect(products[0]['quantity']).toEqual(quantity)
        await expect(products[0]['totalPrice']).toEqual(price)
    })
})
