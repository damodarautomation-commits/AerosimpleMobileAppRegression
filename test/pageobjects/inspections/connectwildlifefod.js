import BasePage from '../../fixtures/base-page.js';
import Locators from '../../utils/selfHealing.js';
import { logger } from '../../utils/executionLogger.js';
import { InspectionFODandWildlife } from '../../testdata/inspections.json'
import {
    inspectionLocators, inspectionActionLocators, ShiftLocators, SelectShift,
    StartInspection, ChecklistFail, CompleteInspection, validation_message, OKbutton,
    ChecklistActionButton, ChecklistActionItem, Create
} from '../../locators/inspections.js';

class InspectionConnectwildlifefodlog extends BasePage {

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

    async clickonChecklist(index) {
        try {
            const checklist = await Locators.getFirstLocator(ChecklistFail(index), 10000);
            await checklist.click();
            logger.info(`Clicked on checklist ${index}`);
        } catch (err) {
            logger.error(`Failed in clickonChecklist ${index}: ${err.message}`);
            throw err;
        }
    }

    async click_on_complete_inspection() {
        try {
            const completeInspection = await Locators.getFirstLocator(CompleteInspection(), 10000);
            await completeInspection.click();
            logger.info("Clicked Complete Inspection button");
        } catch (err) {
            logger.error(`Error in click_on_complete_inspection: ${err.message}`);
            throw err;
        }
    }

    async verifyerrormessage() {
        try {
            const errormessage = await Locators.getFirstLocator(validation_message(), 10000);
            const validationText = await errormessage.getText();
            console.log(validationText);
            logger.info(`Validation message for unsatisfactory: ${validationText}`);
        } catch (err) {
            logger.error(`Failed in verifyerrormessage: ${err.message}`);
            throw err;
        }
    }

    async clickonOK() {
        try {
            const OK = await Locators.getFirstLocator(OKbutton(), 10000);
            await OK.click();
            logger.info('Clicked on OK button');
        } catch (err) {
            logger.error(`Failed in clickonOK: ${err.message}`);
            throw err;
        }
    }

    async clickonchecklistAction(index) {
        try {
            const action = await Locators.getFirstLocator(ChecklistActionButton(index), 10000);
            await action.click();
            logger.info(`Clicked on checklist action button ${index}`);
        } catch (err) {
            logger.error(`Failed in clickonchecklistAction ${index}: ${err.message}`);
            throw err;
        }
    }

    async clickOnChecklistActionItem(action_name) {
        try {
            const action = await Locators.getFirstLocator(ChecklistActionItem(action_name), 10000);
            await action.click();
            logger.info(`Clicked on checklist action Item :  ${action_name}`);
        }
        catch (err) {
            logger.error(`Failed in clickOnChecklistActionItem ${action_name}: ${err.message}`);
            throw err;
        }
    }

    async clickoncreatebutton() {
        try {
            const createButton = await Locators.getFirstLocator(Create(), 10000)
            await createButton.click();
            logger.info('Clicked on Create Button');
        }
        catch (err) {
            logger.error(`Failed on Clicking Create Button: ${err.message}`);
        }
    }

    async connectwildlifeandfodlog() {
        try {
            await this.openCreateNewInspection(InspectionFODandWildlife.inspectionAction);
            const inspectionElement = await Locators.getFirstLocator(inspectionLocators(InspectionFODandWildlife.inspectionName), 15000);
            await inspectionElement.waitForDisplayed({ timeout: 15000 });
            await this.click_on_inspection(InspectionFODandWildlife.inspectionName);
            await this.click_on_shift(InspectionFODandWildlife.shiftName);
            await this.click_on_start_inspection();
            await this.clickonChecklist(1);
            await this.clickonChecklist(2);
            await this.click_on_complete_inspection();
            await this.verifyerrormessage();
            await this.clickonOK();
            await this.clickonchecklistAction(1);
            await this.clickOnChecklistActionItem(InspectionFODandWildlife.ChecklistActionItemName);
            await this.clickoncreatebutton();
            logger.info("Completed connectwildlifeandfodlog workflow successfully");
        } catch (err) {
            logger.error(`Error in connectwildlifeandfodlog workflow: ${err.message}`);
            throw err;
        }
    }
}

export default new InspectionConnectwildlifefodlog();
