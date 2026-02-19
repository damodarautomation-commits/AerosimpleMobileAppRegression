import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    selectwildlifemodules, wildlifeoptions, activityreport, incidentDateAndTime, reportedDate,
    currentMonthAndYear, Done, map, mapOption, save, fullmap, activityDropdown, activityOption, enterDescription, wildlifetype,
    wildlifeSelectionType, wildlifespecies, selectSpecies, killedandspotted, submit
} from '../../locators/Wildlifelog.js';
import { wildLife } from '../../testdata/wildlifelog.json';
import Utils from '../../utils/common.js';
class SubmitWildLifeLogWithActivity extends BasePage {

    /* ========================= Navigation Methods ========================= */

    async clickOnNew() {
        try {
            const addButton = await Locators.getFirstLocator(creatnew(), 10000);
            await Utils.safeClick(addButton);
            logger.info('Clicked on New (+) button successfully');
        } catch (error) {
            logger.error(`clickOnNew failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubModule(option) {
        try {
            const subModule = await Locators.getFirstLocator(selectwildlifemodules(option), 10000);
            await Utils.safeClick(subModule);
            logger.info(`clicked on submodule is ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModule failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(wildlifeoptions(option), 10000);
            await Utils.safeClick(subModuleoption);
            logger.info(`clicked on submodule is ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnIncentDateAndTime() {
        try {
            const incidentDate = await Locators.getFirstLocator(incidentDateAndTime(), 10000);
            await Utils.safeClick(incidentDate);
            logger.info('clicked on IncentDateAndTime');
        } catch (error) {
            logger.error(`clickOnIncentDateAndTime failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnReportDate(day) {
        try {
            const reportdate = await Locators.getFirstLocator(reportedDate(), 10000);
            const current_text = await reportdate.getText();
            logger.info(current_text);
            const dateElement = await Locators.getFirstLocator(currentMonthAndYear(day, current_text), 10000);
            await Utils.safeClick(dateElement);

            await dateElement.waitForDisplayed({ timeout: 10000 });
            await Utils.safeClick(dateElement);
        } catch (error) {
            logger.error(`clickOnReportDate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnDone() {
        try {
            const donebutton = await Locators.getFirstLocator(Done(), 10000);
            await Utils.safeClick(donebutton);
            logger.info('clicked on Done Button');

        } catch (error) {
            logger.error(`clickOnDone failed: ${error.stack || error.message}`);
            throw error;
        }

    }

    async clickOnMap() {
        try {
            const mapfield = await Locators.getFirstLocator(map(), 10000);
            await Utils.safeClick(mapfield);
            logger.info('clicked on map field')
        } catch (error) {
            logger.error(`clickOnMap failed: ${error.stack || error.message}`);
            throw error;
        }

    }

    async clickOnMapOption(index) {
        try {
            const mapoption = await Locators.getFirstLocator(mapOption(index), 10000);
            await Utils.safeClick(mapoption);
            logger.info('clicked on bird');
        } catch (error) {
            logger.error(`clickOnMapOption failed: ${error.stack || error.message}`);
            throw error;
        }

    }

    async placeMarkerAndSave(xOffset = 0.5, yOffset = 0.5) {
        try {
            const mapView = await Locators.getFirstLocator(fullmap(), 10000);
            const location = await mapView.getLocation();
            const size = await mapView.getSize();

            const x = Math.floor(location.x + size.width * xOffset);
            const y = Math.floor(location.y + size.height * yOffset);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 200 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();

            logger.info(`Tapped on map at (${x}, ${y})`);
            const saveButton = await Locators.getFirstLocator(save(), 10000);
            await Utils.safeClick(saveButton);

            logger.info(`Successfully saved map location`);

        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnActivityDropDown() {
        try {
            const dropdown = await Locators.getFirstLocator(activityDropdown(), 10000);
            await Utils.safeClick(dropdown);
            logger.info(`Clicked on Activity dropdowm`);
        } catch (err) {
            logger.error(`Error in clickOnActivityDropDown: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnSelectActivity(option) {
        try {
            const select = await Locators.getFirstLocator(activityOption(option), 10000);
            await Utils.safeClick(select);
            logger.info(`Click and select activity option:${option}`);
        } catch (err) {
            logger.error(`Error in clickOnSelectActivity: ${err.stack || err.message}`);
            throw err;
        }
    }

    async enterInputToDescription() {
        try {
            const description = await Locators.getFirstLocator(enterDescription(), 10000);
            await Utils.enterInputText(description, wildLife.Description);
            logger.info(`enter input to description field is ${wildLife.Description}`);
        } catch (err) {
            logger.error(`Error in enterInputToDescription: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnSubmitButton() {
        try {
            const submitbutton = await Locators.getFirstLocator(submit(), 10000);
            await Utils.safeClick(submitbutton);
            logger.info('clicked on Submit')
        } catch (err) {
            logger.error(`Error in clickOnSubmitButton: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnWildLifeType() {
        try {
            const wildtype = await Locators.getFirstLocator(wildlifetype(), 10000);
            await Utils.safeClick(wildtype);
            logger.info('clicked on wildlifetype dropdown');
        } catch (err) {
            logger.error(`Error in clickOnWildLifeType: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnTypeSelection() {
        try {
            const select = await Locators.getFirstLocator(wildlifeSelectionType(), 10000);
            await Utils.safeClick(select);
            logger.info('click and selected Mammal');
        } catch (err) {
            logger.error(`Error in clickOnTypeSelection: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnspecies() {
        try {
            const speciesDropdowm = await Locators.getFirstLocator(wildlifespecies(), 10000);
            await Utils.safeClick(speciesDropdowm);
            logger.info('clicked on species dropdown')
        } catch (err) {
            logger.error(`Error in clickOnspecies: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnSelectSpecies(option) {
        try {
            const selectspecies = await Locators.getFirstLocator(selectSpecies(option), 10000);
            await Utils.safeClick(selectspecies);
            logger.info('Clicked on selected ')
        } catch (err) {
            logger.error(`Error in clickOnSelectSpecies: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickonkilledandspotted(field, text) {
        try {
            const fieldName = await Locators.getFirstLocator(killedandspotted(field), 10000);
            await Utils.enterInputText(fieldName, text);
            logger.info(`enter input to ${field}`);
        } catch (err) {
            logger.error(`Error in clickonkilledandspotted: ${err.stack || err.message}`);
            throw err;
        }
    }


    async createWildLifeLogWithActivity() {
        await this.clickOnSubModule(wildLife.wildLifeSubModules[0]);
        await this.clickOnSubModuleOptions(wildLife.WildLogOption[1]);
        const confirm = await Locators.getFirstLocator(activityreport(), 20000);
        await confirm.waitForDisplayed({ timeout: 10000 });
        await this.clickOnIncentDateAndTime();
        await this.clickOnReportDate(wildLife.Date);
        await this.clickOnDone();
        await this.clickOnMap();
        await this.clickOnMapOption(2);
        await this.placeMarkerAndSave(0.5, 0.5);
        await this.swipeUp();
        await this.clickOnActivityDropDown();
        await this.clickOnSelectActivity(wildLife.ActivityOption1);
        await this.clickOnDone();
        await this.clickOnWildLifeType();
        await this.clickOnTypeSelection();
        await this.clickOnspecies();
        await this.clickOnSelectSpecies(wildLife.Species);
        await this.clickonkilledandspotted(wildLife['Number Spotted Field'], wildLife.Spotted);
        await this.clickonkilledandspotted(wildLife['Number Killed Field'], wildLife.Killed);
        await this.enterInputToDescription();
        await this.swipeUp();
        await this.clickOnSubmitButton();
        await browser.pause(5000);

    }

}

export default new SubmitWildLifeLogWithActivity();