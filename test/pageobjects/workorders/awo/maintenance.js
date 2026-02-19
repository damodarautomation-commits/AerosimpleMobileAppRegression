import BasePage from '../../../fixtures/base-page.js';

class Maintenance extends BasePage {

    async clickViewWorkOrder() {

        await this.waitForLoaderToDisappear();
        const viewAirfieldWO = await $('~View Airfield Work Orders');
        await this.clickWhenVisible(viewAirfieldWO);
        await this.waitForLoaderToDisappear();
    }

    async clickStatus(statusName) {
        const selector = `//android.widget.TextView[@text="${statusName}"]/parent::*`;
        let el = await $(selector);
        const maxSwipes = 6;
        let swipes = 0;
        while (!(await el.isDisplayed()) && swipes < maxSwipes) {
            await this.swipeLeft();
            await driver.pause(500);
            el = await $(selector);
            swipes++;
        }

        if (!(await el.isDisplayed())) {
            throw new Error(`${statusName} not found after horizontal swipes`);
        }
        await this.waitForLoaderToDisappear();
        await el.click();
        await this.waitForLoaderToDisappear();
    }


    async completeMaintenanceReview() {
        await this.clickViewWorkOrder();
        await this.clickStatus("Maintenance Review");
    }
}

export default new Maintenance();
