import { NoiseLog } from '../../testdata/noiselog.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';

import {
    submoduleoptions,
    confirmtext,
    residentname,
    incidentReportDate,
    reportedDate,
    currentMonthAndYear,
    Done,
    map,
    fullmap,
    save,
    selectionDropDown,
    selectOptionDropDown,
    submit
} from '../../locators/noiselog.js';

class SubmitNoiseLog extends BasePage {

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(submoduleoptions(option), 10000);
            await Utils.safeClick(subModuleoption);
            logger.info(`Clicked on submodule: ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async confirmcreatepage() {
        try {
            const createtext = await Locators.getFirstLocator(confirmtext(), 10000);
            await createtext.waitForDisplayed({ timeout: 20000 });
            logger.info('Create Noise Log page loaded');
        } catch (error) {
            logger.error(`confirmcreatepage failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async enterName(text) {
        try {
            const nameField = await Locators.getFirstLocator(residentname(), 10000);
            await nameField.waitForDisplayed({ timeout: 20000 });
            await Utils.enterInputText(nameField, text);
            logger.info(`Entered Resident Name: ${text}`);
        } catch (error) {
            logger.error(`enterName failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnIncidentDate() {
        try {
            const reportDate = await Locators.getFirstLocator(incidentReportDate(), 10000);
            await Utils.safeClick(reportDate);
            logger.info('Clicked on Incident Report Date');
        } catch (error) {
            logger.error(`clickOnIncidentDate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async selectDate(day) {
        try {
            const header = await Locators.getFirstLocator(reportedDate(), 10000);
            const currentText = await header.getText();

            const dateElement = await Locators.getFirstLocator(
                currentMonthAndYear(day, currentText),
                10000
            );

            await Utils.safeClick(dateElement);
            logger.info(`Selected Date: ${day}`);

        } catch (error) {
            logger.error(`selectDate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnDoneOptional() {
        try {
            const doneBtn = await $(Done());
            if (await doneBtn.isDisplayed()) {
                await Utils.safeClick(doneBtn);
                logger.info('Clicked Done Button');
            }
        } catch (error) {
            logger.info('Done button not present, continuing...');
        }
    }

    async clickOnMap() {
        try {
            const mapLocation = await Locators.getFirstLocator(map(), 10000);
            await Utils.safeClick(mapLocation);
            logger.info('Clicked on Map');
        } catch (error) {
            logger.error(`clickOnMap failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async placeMarkerAndSave(xOffset = 0.5, yOffset = 0.5) {
        try {
            const mapView = await Locators.getFirstLocator(fullmap(), 10000);
            await mapView.waitForDisplayed({ timeout: 15000 });

            const location = await mapView.getLocation();
            const size = await mapView.getSize();

            const x1 = Math.floor(location.x + size.width * xOffset);
            const y1 = Math.floor(location.y + size.height * yOffset);

            const x2 = Math.floor(location.x + size.width * 0.7);
            const y2 = Math.floor(location.y + size.height * 0.7);


            await Utils.tapByCoordinates(x1, y1);
            logger.info(`First tap at (${x1}, ${y1})`);

            await browser.pause(800);

            await Utils.tapByCoordinates(x2, y2);
            logger.info(`Second tap at (${x2}, ${y2})`);

            await browser.pause(800);

            const saveButton = await Locators.getFirstLocator(save(), 10000);
            await saveButton.waitForDisplayed({ timeout: 5000 });
            await saveButton.click();

            logger.info(`Successfully saved map selection`);

        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }



    async clickOnDropDown(field, option) {
        try {
            await Utils.clickDropdownAndSelect(
                selectionDropDown(field),
                selectOptionDropDown(option)
            );
            logger.info(`Selected ${option} from ${field}`);
        } catch (error) {
            logger.error(`clickOnDropDown failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubmit() {
        try {
            const submitButton = await Utils.swipeTillElement(submit(), 5);
            await Utils.safeClick(submitButton);
            logger.info('Clicked on Submit button');
        } catch (error) {
            logger.error(`clickOnSubmit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async createNewNoiseLog() {

        await this.clickOnSubModuleOptions(NoiseLog.SubModuleOption[1]);
        await this.confirmcreatepage();

        await this.enterName(NoiseLog.ResidentName);

        await this.clickOnIncidentDate();
        await this.selectDate(NoiseLog.Date);
        await this.clickOnDoneOptional();
        const movetomap = await Utils.swipeTillElement(map(), 3);
        await this.clickOnMap();
        await this.placeMarkerAndSave();

        await this.clickOnDropDown(NoiseLog.TypeOfEvent, NoiseLog.TypeOfEventOption);
        await this.clickOnDropDown(NoiseLog.TypeofAircraft, NoiseLog.TypeofAircraftOption);
        const fieldtype = await Utils.swipeTillElement(selectionDropDown(NoiseLog.OperationType), 3);
        await this.clickOnDropDown(NoiseLog.OperationType, NoiseLog.OperationTypeOption);

        await this.clickOnSubmit();
    }
}

export default new SubmitNoiseLog();
