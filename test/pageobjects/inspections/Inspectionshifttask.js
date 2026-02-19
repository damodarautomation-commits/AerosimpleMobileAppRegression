import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';
import { DESKTOP_BROWSERS } from 'appium/build/lib/constants.js';

class InspectionShiftTask extends BasePage {

    async clickondatefilter() {
        const filterbutton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Today "]');
        await filterbutton.click();
        logger.info('Clicked on filter button')
    }
    async clickOnselectDate(date) {
        const selectDate = await common.waitUntilDisplayed(`//android.view.ViewGroup[@content-desc="${date}"]`);
        await selectDate.click();
        logger.info(`selected date :${date}`);
    }

    async selectShift(shiftName) {
        const shift = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${shiftName}"]/..`);
        await shift.click();
        logger.info(`selected shift:${shiftName}`);
    }

    async validateInspectionCompleted() {
        const crossedInspection = await $('android=new UiSelector().descriptionContains("Inspection Shift Task")');
        await crossedInspection.waitForDisplayed({ timeout: 5000 });
        expect(await crossedInspection.isDisplayed()).toBe(true);
    }



    async InspectionTask() {
        /*await this.clickondatefilter();
        await this.swipeUp();
        await this.clickOnselectDate(10);*/
        await browser.pause('100000');
        await this.selectShift('Night Shift')
        await this.validateInspectionCompleted();
        await browser.pause('50000');


    }

}
export default new InspectionShiftTask();
