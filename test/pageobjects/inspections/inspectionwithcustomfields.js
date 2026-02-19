import BasePage from '../../fixtures/base-page.js';

import BasePage from '../../fixtures/base-page.js';
import Locators from '../../utils/selfHealing.js';
import { logger } from '../../utils/executionLogger.js';
import { InspectionFODandWildlife } from '../../testdata/inspections.json'
import {
    inspectionLocators, inspectionActionLocators, ShiftLocators, SelectShift,
    StartInspection, ChecklistFail, CompleteInspection, validation_message, OKbutton,
    ChecklistActionButton
} from '../../locators/inspections.js';

class InspectionCustomFields extends BasePage {

    async openCreateNewInspection(action) {
        try {
            const inspectionButton = await Locators.getFirstLocator(inspectionActionLocators(action), 10000);
            await inspectionButton.click();
            logger.info(`Successfully clicked inspection action: ${action}`);
        } catch (err) {
            logger.error(`Failed in openCreateNewInspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection(name) {
        try {
            const inspection = await Locators.getFirstLocator(inspectionLocators(name), 10000);
            await inspection.click();
            logger.info(`Successfully selected inspection: ${name}`);
        } catch (err) {
            logger.error(`Failed in click_on_inspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_shift(shift_name) {
        try {
            const shift = await Locators.getFirstLocator(ShiftLocators(), 10000);
            await shift.click();
            const select_shift = await Locators.getFirstLocator(SelectShift(shift_name), 10000);
            await select_shift.click();
            logger.info(`Successfully selected shift: ${shift_name}`);
        } catch (err) {
            logger.error(`Failed in click_on_shift: ${err.message}`);
            throw err;
        }
    }

    async click_on_start_inspection() {
        try {
            const startBtn = await Locators.getFirstLocator(StartInspection(), 10000);
            await startBtn.click();
            logger.info('Successfully clicked Start Inspection button');
        } catch (err) {
            logger.error(`Failed in click_on_start_inspection: ${err.message}`);
            throw err;
        }
    }

    async enterName(text) {
        const name = await $('(//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText)[1]');
        await name.click();
        await name.clearValue();
        await name.setValue(text);
        await browser.hideKeyboard();
        logger.info(`enter input to Name Field:${text}`)
    }

    async enterNumber(text) {
        const number = await $('(//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText)[2]');
        await number.click();
        await number.clearValue();
        await number.setValue(text);
        await browser.hideKeyboard();
        logger.info(`enter input to Number Field:${text}`)
    }

    async clickOnCheckBox() {
        const checkBox = $('//android.widget.TextView[@text="Checkbox "]/preceding-sibling::android.view.ViewGroup');
        await checkBox.click();
        logger.info('selected checkbox');
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

    async selectionfield(option) {
        const selection = await $('(//android.widget.TextView[@text="Selection "]/following-sibling::android.view.ViewGroup)[1]');
        await this.swipe_till_element(selection);
        await selection.click();
        logger.info('click on selection drop down')
        const selectoption = await $(`//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`);
        await selectoption.click();
        logger.info(`click on select :${option}`);
    }

    async systemuser(user) {
        const seystemUser = await $('(//android.widget.TextView[@text="Selection "]/following-sibling::android.view.ViewGroup)[2]');
        await this.swipe_till_element(seystemUser);
        await seystemUser.click();
        logger.info('click on selection drop down')
        const selectoUser = await $(`//android.view.ViewGroup[@content-desc="${user}"]`);
        await selectoUser.click();
        logger.info(`click on selected user :${user}`);

    }

    async clickOnDone() {
        const done = await $('//android.widget.TextView[@text="Done"]');
        await done.click();
        logger.info('click on Done button');
    }

    async inspectioncustomfields() {
        await this.openCreateNewInspection('Create New Inspection');
        await browser.pause('5000');
        logger.info('Start Inspection with All Custom Fields inspection');
        await this.click_on_inspection('Inspection with All Custom Fields');
        await browser.pause('6000');
        await this.click_on_shift('Afternoon');
        await this.enterName('Prasad');
        await this.enterNumber('4512')
        await this.clickOnCheckBox();
        await this.selectDateByLabel('Date Time ', '2026', '27');
        await this.selectionfield('DEF');
        await this.systemuser('Sateesh Admin');
        await this.clickOnDone();
        await browser.pause('2000');
        await this.click_on_start_inspection();
        await browser.pause('6000');
        logger.info('Inspection with All Custom Fields inspection submitted ');

    }

}
export default new InspectionCustomFields();
