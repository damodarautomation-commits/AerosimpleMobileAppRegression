import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';
import * as nawo from '../../locators/nawo.js'
import { SMS } from '../../testdata/sms.json';
import { NAWO } from '../../testdata/nawo.json';
class safetyHazardcreateworkorder extends BasePage {

    async clickOnApps() {
        const apps = await Locators.getFirstLocator(sms.apps(), 10000);
        await Utils.safeClick(apps);
    }

    async clickOnSafetyHazard() {
        await driver.pause(5000);

        const hazardEntries = await driver.$$(sms.hazardentries());

        if (hazardEntries.length > 0) {
            await hazardEntries[0].waitForDisplayed({ timeout: 10000 });
            logger.info("Existing Safety Hazard found. Clicking it.");
            await Utils.safeClick(hazardEntries[0]);
        } else {
            logger.info("No entry found. Clicking Report Hazard.");
            const report = await Locators.getFirstLocator(sms.reporthazard(), 10000);
            await Utils.safeClick(report);
        }
    }

    async swipeToWorkOrderstab() {
        await Utils.swipeHorizontalInField(sms.horizontalswipe(), 'left');
        await Utils.swipeHorizontalTillElement(
            sms.workordertab(),
            sms.horizontalswipe(),
            'left',
            4
        );
    }

    async clickOnWorkOrders() {
        const workorder = await Locators.getFirstLocator(sms.workordertab(), 10000);
        await Utils.safeClick(workorder);
    }


    async clickOnCreateWorkOrder() {
        const createWO = await Locators.getFirstLocator(sms.createworkorder(), 10000);
        await Utils.waitForElementAndClick(createWO);
    }

    async clickOnNonAirfieldWorkOrder() {
        const nonAirfieldWO = await Locators.getFirstLocator(sms.nonairfield(), 10000);
        await Utils.waitForElementAndClick(nonAirfieldWO);
    }

    async selectPriority() {
        await Utils.clickDropdownAndSelect(nawo.priority(), nawo.priorityOption(NAWO.Priority));
    }

    async selectCategory() {
        await Utils.clickDropdownAndSelect(nawo.category(), nawo.categoryOption(NAWO.Category));
    }

    async selectLocation() {
        await Utils.clickDropdownAndSelect(nawo.location(), nawo.locationOption(NAWO.Property));
    }

    async enterDescription() {
        await Utils.enterInputText(nawo.enterdescription(), NAWO.Description);
    }

    async selectCompanyName() {
        await Utils.swipeTillElement(nawo.companyname());
        await Utils.clickDropdownAndSelect(nawo.companyname(), nawo.companynameOption(NAWO.Tenants));
    }

    async enterName() {
        await Utils.swipeTillElement(nawo.name());
        await Utils.enterInputText(nawo.name(), NAWO.Name);
    }

    async enterNumber() {
        await Utils.enterInputText(nawo.number(), NAWO.Number);
    }

    async clickOnCheckBox() {
        await Utils.swipeTillElement(nawo.checkbox());
        const checkBox = await Locators.getFirstLocator(nawo.checkbox(), 10000);
        await Utils.safeClick(checkBox);
    }

    async selectSelection() {
        await Utils.swipeTillElement(nawo.selection());
        await Utils.clickDropdownAndSelect(nawo.selection(), nawo.selectionOption(NAWO.Selection));
    }

    async selectSystemUser() {
        await Utils.swipeTillElement(nawo.systemuser());
        await Utils.clickDropdownAndSelect(nawo.systemuser(), nawo.systemuserOption(NAWO["System User1"]));
    }

    async selectDateFromPicker(day, month, year) {
        try {
            await Utils.safeClick(await $(nawo.datetime()));
            await Utils.safeClick(await $(nawo.yearHeader()));
            const yearOption = await $(nawo.yearOption(year));
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();
            const dayElement = await $(nawo.dayElement(day, month, year));
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();
            await Utils.safeClick(await $(nawo.okButton()));
            logger.info(`Date selected: ${day}-${month}-${year}`);
        } catch (error) {
            logger.error(`Date selection failed: ${error.message}`);
            throw error;
        }
    }

    async selectTimeByLabel(label, hour, minute, meridian) {
        try {
            const field = await $(nawo.timeField(label));
            await Utils.safeClick(field);

            await (await $(nawo.hourPicker())).setValue(hour);
            await (await $(nawo.minutePicker())).setValue(minute);
            await (await $(nawo.meridianPicker())).setValue(meridian);

            await Utils.safeClick(await $(nawo.okButton()));

            logger.info(`Time selected: ${hour}:${minute} ${meridian}`);

        } catch (err) {
            logger.error(`Time selection failed: ${err.message}`);
            throw err;
        }
    }

    async selectProperty() {
        await Utils.swipeTillElement(nawo.property());
        await Utils.clickDropdownAndSelect(nawo.property(), nawo.propertyOption(NAWO.Property));
    }

    async selectAssetRegistry() {
        await Utils.swipeTillElement(nawo.assetregistry());
        await Utils.clickDropdownAndSelect(nawo.assetregistry(), nawo.assetregistryOption(NAWO["Asset Registry"]));
    }

    async selectTenants() {
        await Utils.swipeTillElement(nawo.tenants());
        await Utils.clickDropdownAndSelect(nawo.tenants(), nawo.tenantsOption(NAWO.Tenants));
    }

    async selectWildlifeType() {
        await Utils.swipeTillElement(nawo.wildlifetype());
        await Utils.clickDropdownAndSelect(nawo.wildlifetype(), nawo.wildlifetypeOption(NAWO["Wildlife Type"]));
    }

    async selectWildlifeSpecies() {
        await Utils.swipeTillElement(nawo.wildlifespecies());
        await Utils.clickDropdownAndSelect(nawo.wildlifespecies(), nawo.wildlifespeciesOption(NAWO["Wildlife Species"]));
    }

    async enterFormData() {
        await Utils.swipeTillElement(nawo.formdata());
        await Utils.clickDropdownAndSelect(nawo.formdata(), nawo.formdataOption(NAWO["Form Data"]));
    }

    async clickOnNotam() {
        await Utils.swipeTillElement(nawo.notam());
        await Utils.clickDropdownAndSelect(nawo.notam(), nawo.notamOption());
    }

    async clickCreate() {
        await Utils.swipeTillElement(nawo.create());
        const createBtn = await Locators.getFirstLocator(nawo.create(), 10000);
        await Utils.safeClick(createBtn);
    }

    async clickOnmcg() {
        const mcg = await Locators.getFirstLocator(nawo.multicolumngrid(), 10000);
        await Utils.safeClick(mcg);
    }

    async clickOnSave() {
        const saveButton = await Locators.getFirstLocator(nawo.save(), 10000);
        await Utils.safeClick(saveButton);

    }


    async createnawoworkorder() {
        await this.clickOnSafetyHazard();
        await this.swipeToWorkOrderstab();
        await this.clickOnWorkOrders();
        await this.clickOnCreateWorkOrder();
        await this.clickOnNonAirfieldWorkOrder();
        await this.selectPriority();
        await this.selectCategory();
        await this.selectLocation();
        await this.enterDescription();
        await this.selectCompanyName();
        await this.enterName();
        await this.enterNumber();
        await this.clickOnCheckBox();
        await this.selectSelection();
        await this.selectSystemUser();
        await this.selectDateFromPicker(NAWO.Date, NAWO.Month, NAWO.Year);
        await this.selectTimeByLabel("Time ", NAWO.Hour, NAWO.Minute, NAWO.Meridian);
        await this.selectProperty();
        await this.selectAssetRegistry();
        await this.selectTenants();
        await this.selectWildlifeType();
        await this.selectWildlifeSpecies();
        await this.clickOnNotam();
        await this.enterFormData();

        await this.clickOnmcg();
        await this.enterName();
        await this.enterNumber();
        await this.selectDateFromPicker(NAWO.Date, NAWO.Month, NAWO.Year);
        await this.selectSelection();
        await this.selectTimeByLabel("Time ", NAWO.Hour, NAWO.Minute, NAWO.Meridian);
        await this.clickOnSave();
        await this.clickCreate();
        await browser.pause(5000);

        await browser.pause(5000);


    }
}

export default new safetyHazardcreateworkorder();