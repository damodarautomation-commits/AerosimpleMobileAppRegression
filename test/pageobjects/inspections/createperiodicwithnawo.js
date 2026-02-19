import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';

class periodicwithnawo extends BasePage {

    async openCreateNewInspection(action) {
        try {
            const inspectionButton = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${action}"]`);
            await inspectionButton.click();
            logger.info(`Opened inspection action: ${action}`);
        } catch (err) {
            logger.error(`Failed to open inspection action "${action}": ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection(name) {
        try {
            const inspection = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${name}"]/../..`);
            await inspection.click();
            logger.info(`Selected inspection: ${name}`);
        } catch (err) {
            logger.error(`Failed to select inspection "${name}": ${err.message}`);
            throw err;
        }
    }

    async click_on_shift(shift_name) {
        try {
            const shift = await $("//android.view.ViewGroup[contains(@content-desc,'')]");
            await shift.waitForDisplayed({ timeout: 3000 });
            await shift.click();

            const select_shift = await $(`//android.view.ViewGroup[@resource-id="${shift_name}"]`);
            await select_shift.waitForDisplayed({ timeout: 3000 });
            await select_shift.click();

            logger.info(`Successfully selected shift: ${shift_name}`);
        } catch (err) {
            logger.error(`Failed in click_on_shift: ${err.message}`);
            throw err;
        }
    }

    async selectDateByLabel(label, year, day) {
        try {
            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[1]`);
            await this.clickWhenVisible(field);

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await this.clickWhenVisible(yearHeader);

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dayElement = await $(`//android.view.View[starts-with(@content-desc,"${day} ")]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected date -> ${day}-${year}`);

        } catch (err) {
            logger.error(`Error in selectDateByLabel: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_time_by_label(label, hour, minute, meridian) {
        try {
            logger.info(`Attempting to select time for label: ${label}`);

            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[2]`);
            await this.clickWhenVisible(field);

            const hourPicker = await $('(//android.widget.NumberPicker)[1]//android.widget.EditText');
            await hourPicker.click();
            await hourPicker.clearValue();
            await hourPicker.addValue(hour);

            const minutePicker = await $('(//android.widget.NumberPicker)[2]//android.widget.EditText');
            await minutePicker.click();
            await minutePicker.clearValue();
            await minutePicker.addValue(minute);

            const meridianPicker = await $('(//android.widget.NumberPicker)[3]//android.widget.EditText');
            await meridianPicker.click();
            await meridianPicker.clearValue();
            await meridianPicker.addValue(meridian);

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected ${label}:${hour}-${minute}-${meridian}`);
        } catch (err) {
            logger.error(`Error in select_time_by_label: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_start_inspection() {
        try {
            const button_text = await $("//android.widget.TextView[@resource-id='fab-text']").getText();
            logger.info(`Button text found: ${button_text}`);
            expect(button_text).toEqual("Start Inspection");

            const startBtn = await $("//android.widget.Button[@resource-id='fab']");
            await startBtn.waitForDisplayed({ timeout: 500 });
            await startBtn.click();

            logger.info('Successfully clicked Start Inspection button');
        } catch (err) {
            logger.error(`Failed in click_on_start_inspection: ${err.message}`);
            throw err;
        }
    }


    async click_on_unsatisfactory(targetText) {
        let found = false;

        while (!found) {
            try {
                const targetElement = await $(`//android.widget.TextView[@text="${targetText}"]`);

                if (await targetElement.isDisplayed()) {
                    logger.info(`Found checklist '${targetText}' `);
                    found = true;

                    const failBtn = await $(`//android.widget.TextView[@text="${targetText}"]/../../..//android.widget.Button[@content-desc="Fail"]`);
                    await failBtn.waitForDisplayed({ timeout: 2000 });
                    await failBtn.click();

                    logger.info(`Marked '${targetText}' as FAIL `);
                } else {
                    logger.info(`'${targetText}' not visible yet, swiping...`);
                    await this.swipeDown();
                    await browser.pause(1000);
                }
            } catch (err) {
                logger.warn(`Error while searching for '${targetText}': ${err.message}`);
                await this.swipeDown();
                await browser.pause(1000);
            }
        }
    }


    async clickonaction(targetText) {
        const checkaction = await $(`(//android.widget.TextView[@text="${targetText}"]/../../..//android.view.ViewGroup)[4]`);
        await checkaction.waitForDisplayed(({ timeout: 2000 }));
        await checkaction.click();
        logger.info('clicked on new checklistActionButton');
    }

    async clickonactionItem(actionItem) {
        const item = await $(`//android.widget.TextView[@text="${actionItem}"]/..`);
        await item.waitForDisplayed({ timeout: 2000 });
        await item.click();
        logger.info(`Clicked on :${actionItem} button `)
    }

    async clickonConnect() {
        const workorderlist = await $$('//android.widget.ImageView');
        const max = workorderlist.length;

        for (let i = 0; i < max; i++) {
            try {
                const workorder = workorderlist[i];

                await workorder.waitForDisplayed({ timeout: 2000 });
                await workorder.click();
                logger.info('clicked and Connect workorder')

                await browser.pause(500);
            } catch (err) {
                logger.warn(`Failed to click ImageView ${i + 1}: ${err.message}`);
            }
        }
    }

    async clickOnSave() {
        const save = await $('//android.widget.TextView[@text="Save"]/..');
        await save.waitForDisplayed({ timeout: 2000 });
        await save.click();
        logger.info('Clicked on save and Work order is connected ')
    }

    async clickonconnectedOOpenWorkOrders() {
        const openworkorder = await common.waitUntilDisplayed('(//android.widget.TextView[contains(@text,"Open Work Orders")])[1]');
        await openworkorder.click();
        logger.info('Click on connected work order')
    }

    async unlink() {
        const disconnect = await common.waitUntilDisplayed('(//android.widget.TextView[@text=""])[1]');
        await disconnect.click();
        logger.info('clicked on  ✕ and disconnected the connected work order from inspection checklist ')
    }

    async click_on_complete_inspection() {
        try {
            const completeInspection = await $('//android.widget.TextView[@resource-id="fab-text"]/..');
            await completeInspection.waitForDisplayed({ timeout: 2000 });
            await completeInspection.click();
            logger.info("Clicked Complete Inspection button ");
        } catch (err) {
            logger.error(`Error in complete inspection flow: ${err.message}`);
        }
    }

    async selectDateByLabel(label, year, day) {
        try {

            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[1]`);
            await this.clickWhenVisible(field);

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await this.clickWhenVisible(yearHeader);

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dayElement = await $(`//android.view.View[starts-with(@content-desc,"${day} ")]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected date : ${label} | Year: ${year}, Day: ${day}`);

        } catch (err) {
            logger.error(`Error in selectDateByLabel: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_time_by_label(label, hour, minute, meridian) {
        try {
            logger.info(`Attempting to select time for label: ${label}`);
            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[2]`);
            await this.clickWhenVisible(field);

            const hourPicker = await $('(//android.widget.NumberPicker)[1]//android.widget.EditText');
            await hourPicker.setValue(hour);

            const minutePicker = await $('(//android.widget.NumberPicker)[2]//android.widget.EditText');
            await minutePicker.setValue(minute);

            const meridianPicker = await $('(//android.widget.NumberPicker)[3]//android.widget.EditText');
            await meridianPicker.setValue(meridian);

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected ${label}:${hour}-${minute}-${meridian}`);
        } catch (err) {
            logger.error(`Error in select_time_by_label: ${err.stack || err.message}`);
            throw err;
        }
    }


    async createPeriodicwithnawo() {
        await this.openCreateNewInspection('Create New Inspection');
        logger.info("start Periodic Condition Inspection with connected non airfield workorder ");
        await this.click_on_inspection('PERIODIC CONDITION INSPECTION CHECKLIST- NAWO');
        await browser.pause(2000);
        await this.click_on_shift('Day');
        await browser.pause(2000);
        await this.selectDateByLabel('Report Date & Time', '2026', 15);
        await this.select_time_by_label('Report Date & Time', '9', '38', 'AM');
        await this.click_on_start_inspection();

        await this.click_on_unsatisfactory('Rubber Deposits');

        await this.clickonaction('Rubber Deposits');
        await browser.pause(5000);
        await this.clickonactionItem('Connect Work Order');
        await browser.pause(5000);
        await this.clickonConnect();
        await browser.pause(5000);
        await this.clickOnSave();
        await browser.pause(3000);
        await this.clickonconnectedOOpenWorkOrders();
        await browser.pause(5000);
        await this.unlink();
        await browser.pause(5000);
        await this.click_on_complete_inspection();
        await browser.pause(5000);
        await this.selectDateByLabel('Start Date & Time', '2026', '27');
        await this.select_time_by_label("Start Date & Time", "9", "38", "AM");
        await this.selectDateByLabel('End Date & Time', '2026', '27');
        await this.select_time_by_label("End Date & Time", "10", "30", "AM");
        await browser.pause(2000);
        await this.click_on_complete_inspection();
        await browser.pause(20000);
        logger.info("Periodic Condition Inspection with connected non airfield workorder completed successfully");

    }
}
export default new periodicwithnawo();