import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    submoduleoptions, header, reportDateAndTime, reportedDate, currentMonthAndYear, Done, locationArea, locationAreaDropdown, locationareaOption, map, mapOption, save, fullmap,
    NextStop, detect, selectdetectOption, category, categoryOption, submit, enterDescription
} from '../../locators/Fodlog.js';
import { FODLog } from '../../testdata/fod.json';
import Utils from '../../utils/common.js';
class SubmitFODlog extends BasePage {

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

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(submoduleoptions(option), 10000);
            await Utils.safeClick(subModuleoption);
            logger.info(`clicked on submodule is ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnReportDate() {
        try {
            const reportDate = await Locators.getFirstLocator(reportDateAndTime(), 10000);
            await Utils.safeClick(reportDate);
            logger.info('Clicked on report date and time');
        } catch (error) {
            logger.error(`clickOnReportDate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnDate(day) {
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

    async SwipeToLocationArea() {
        try {
            const field = await Utils.swipeTillElement(locationArea(), 5);
            logger.info('swipe to location area field');
        } catch (error) {
            logger.error(`SwipeToLocationArea failed: ${error.stack || error.message}`);
            throw error;
        }
    }



    async clickOnlocationAreaDropdown() {
        try {
            const field = await Utils.swipeTillElement(locationAreaDropdown(), 5);
            const dropdown = await Locators.getFirstLocator(locationAreaDropdown(), 10000);
            await Utils.safeClick(dropdown);
            logger.info('Clicked on location Area drop down')

        } catch (error) {
            logger.error(`clickOnlocationAreaDropdown failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async selectlocationareaoption(option) {
        try {
            const selectOption = await Locators.getFirstLocator(locationareaOption(option), 10000);
            await Utils.safeClick(selectOption);
            logger.info(`select location area option is :${option}`);

        } catch (error) {
            logger.error(`selectlocationareaoption failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnMap() {
        try {
            const maplocation = await Locators.getFirstLocator(map(), 10000);
            await Utils.safeClick(maplocation);
            logger.info('clicked on maplocation ');

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
            //const saveButton = await Locators.getFirstLocator(save(), 10000);
            //await Utils.safeClick(saveButton);

            logger.info(`Successfully saved map location`);

        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnSave() {
        try {
            const savebutton = await Locators.getFirstLocator(save(), 10000);
            await Utils.safeClick(savebutton);
            logger.info('clicked on Save Button')
        } catch (err) {
            logger.error(`Error in clickOnSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnNextStep() {
        try {
            const next = await Locators.getFirstLocator(NextStop(), 10000);
            await Utils.safeClick(next);
            logger.info('Clicked on Next Step');
        } catch (err) {
            logger.error(`Error in clickOnNextStep: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnDetect() {
        try {
            const detectdropdown = await Locators.getFirstLocator(detect(), 10000);
            await Utils.safeClick(detectdropdown);
            logger.info('Clicked on detect dropdown');
        } catch (err) {
            logger.error(`Error in clickOnDetect: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickonDetectOption(option) {
        try {
            const detectoption = await Locators.getFirstLocator(selectdetectOption(option), 10000);
            await Utils.safeClick(detectoption);
            logger.info(`Clicked on detect option is ${option}`);
        } catch (err) {
            logger.error(`Error in clickonDetectOption: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnCategory() {
        try {
            const categorydropdown = await Locators.getFirstLocator(category(), 10000);
            await Utils.safeClick(categorydropdown);
            logger.info('clicked on category drop down')
        } catch (err) {
            logger.error(`Error in clickOnCategory: ${err.stack || err.message}`);
            throw err;
        }
    }
    async clickOnselectCategory(option) {
        try {
            const selectoption = await Locators.getFirstLocator(categoryOption(option), 10000);
            await Utils.safeClick(selectoption);
            logger.info(`clicked on category option ${option}`)
        } catch (err) {
            logger.error(`Error in clickOnselectCategory: ${err.stack || err.message}`);
            throw err;
        }
    }

    async description(text) {
        try {
            const des = await Locators.getFirstLocator(enterDescription(), 10000);
            await Utils.enterInputText(des, text);
            logger.info(`click and enter description :${text}`)
        } catch (err) {
            logger.error(`Error in clickOnselectCategory: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickOnSubmit() {
        try {
            const submiteButton = await Utils.swipeTillElement(submit(), 5);
            await Utils.safeClick(submiteButton);
            logger.info('Clicked on Submit button');
        } catch (error) {
            logger.error(`clickOnSubmit failed: ${error.stack || error.message}`);
            throw error;
        }
    }


    async createFodLog() {
        await this.clickOnSubModuleOptions(FODLog.SubModuleOption[1]);
        const headermessage = await Locators.getFirstLocator(header(), 10000);
        await headermessage.waitForDisplayed({ timeout: 30000 });
        await this.clickOnReportDate();
        await this.clickOnDate(FODLog.Date);
        await this.clickOnDone();
        await this.SwipeToLocationArea();
        await this.clickOnlocationAreaDropdown();
        await this.selectlocationareaoption(FODLog.LocationAreaOption);
        await this.clickOnMap();
        await this.clickOnMapOption(1);
        await this.placeMarkerAndSave(0.5, 0.5);
        await this.placeMarkerAndSave(0.2, 0.6);
        await this.placeMarkerAndSave(0.4, 0.2);
        await this.clickOnSave();
        await this.clickOnNextStep();
        await this.clickOnDetect();
        await this.clickonDetectOption(FODLog.Detectoption);
        await this.clickOnCategory();
        await this.clickOnselectCategory(FODLog.Category);
        await this.description(FODLog.Description);
        await this.clickOnSubmit();

    }

}
export default new SubmitFODlog();