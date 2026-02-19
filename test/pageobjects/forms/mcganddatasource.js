import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    creatnew, ClickOnFormName, FormOption, multicolumngrid, InputTextField, Date, yearbutton, selectyear, fulldate, okButton, mcgSelectionField, selectOption, attachmentField,
    attachment, attachmentOptions, selectPhoto, DoneButton, mcgSystemUserField, selectSystemUser, clickOnSave, clickOnDataSource, selectOptionFromDataSource, notam, submitForm, companyname
} from '../../locators/forms.js';
import { Forms } from '../../testdata/forms.json';
import Utils from '../../utils/common.js';
class McgAndDataSources extends BasePage {

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

    async clickOnForm(formName) {
        try {
            const formElement = await Locators.getFirstLocator(ClickOnFormName(formName), 10000);
            await Utils.safeClick(formElement);
            logger.info(`Clicked on form: ${formName}`);
        } catch (error) {
            logger.error(`clickOnForm failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnFormOptions(option) {
        try {
            const optionElement = await Locators.getFirstLocator(FormOption(option), 10000);
            await Utils.safeClick(optionElement);
            logger.info(`Selected form option: ${option}`);
        } catch (error) {
            logger.error(`clickOnFormOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnMultiColumnGrid() {
        try {
            const mcgElement = await Locators.getFirstLocator(multicolumngrid(), 10000);
            await Utils.safeClick(mcgElement);
            logger.info('Opened Multi Column Grid dropdown');
        } catch (error) {
            logger.error(`clickOnMultiColumnGrid failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    /* ========================= Field Actions ========================= */

    async enterInputToField(field, value) {
        try {
            const inputElement = await Locators.getFirstLocator(InputTextField(field), 10000);
            await Utils.enterInputText(inputElement, value);
            logger.info(`Entered value in ${field} field is : ${value}`);
        } catch (error) {
            logger.error(`enterInputToField failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSelectionField(option) {
        try {
            const selectionField = await Locators.getFirstLocator(mcgSelectionField(), 10000);
            await Utils.safeClick(selectionField);

            const optionElement = await Locators.getFirstLocator(selectOption(option), 10000);
            await Utils.safeClick(optionElement);

            logger.info(`Selected dropdown option: ${option}`);
        } catch (error) {
            logger.error(`clickOnSelectionField failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async selectDateByLabel(label, year, date, month) {
        try {
            const dateField = await Locators.getFirstLocator(Date(label), 10000);
            await Utils.safeClick(dateField);

            const yearHeader = await Locators.getFirstLocator(yearbutton(), 10000);
            await Utils.safeClick(yearHeader);

            const yearOption = await Locators.getFirstLocator(selectyear(year), 10000);
            await Utils.safeClick(yearOption);

            const fullDate = `${date} ${month} ${year}`;
            const dayElement = await Locators.getFirstLocator(fulldate(fullDate), 10000);
            await Utils.safeClick(dayElement);

            const okBtn = await Locators.getFirstLocator(okButton(), 10000);
            await Utils.safeClick(okBtn);

            logger.info(`Selected date: ${fullDate}`);
        } catch (error) {
            logger.error(`selectDateByLabel failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async addAttachmentFromGallery(option) {
        try {
            const attachmentBtn = await Locators.getFirstLocator(attachment(), 10000);
            await Utils.safeClick(attachmentBtn);

            const galleryOption = await Locators.getFirstLocator(attachmentOptions(option), 10000);
            await Utils.safeClick(galleryOption);

            const photo = await Locators.getFirstLocator(selectPhoto(), 10000);
            await Utils.safeClick(photo);

            const doneBtn = await Locators.getFirstLocator(DoneButton(), 10000);
            await Utils.safeClick(doneBtn);

            logger.info('Attachment added successfully from gallery');
        } catch (error) {
            logger.error(`addAttachmentFromGallery failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSystemUserField(option) {
        try {
            const systemUserDropdown = await Locators.getFirstLocator(mcgSystemUserField(), 10000);
            await Utils.safeClick(systemUserDropdown);
            logger.info('clicked on system user dropdown field')

            const user = await Locators.getFirstLocator(selectSystemUser(option), 10000);
            await Utils.safeClick(user);

            const doneBtn = await Locators.getFirstLocator(DoneButton(), 10000);
            await Utils.safeClick(doneBtn);

            logger.info(`clicked and select the system user ${option}`)
        } catch (error) {
            logger.error(`clickOnSystemUserField failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSaveButton() {
        try {
            const save = await Locators.getFirstLocator(clickOnSave(), 10000);
            await Utils.safeClick(save);
            logger.info('Clicked on save button');
        } catch (error) {
            logger.error(`clickOnSaveButton failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnDataSourceDropdown(field, option) {
        try {
            const dropDown = await Locators.getFirstLocator(clickOnDataSource(field), 10000);
            await Utils.safeClick(dropDown);
            logger.info(`clickOnDataSourceDropdown is ${field}`);

            const selectOption = await Locators.getFirstLocator(selectOptionFromDataSource(option), 10000);
            await Utils.safeClick(selectOption);
            logger.info(`clicked and select ${field} value is : ${option}`);

            const doneBtn = await Locators.getFirstLocator(DoneButton(), 20000);
            await Utils.safeClick(doneBtn);


        }
        catch (error) {
            logger.error(`clickOnDataSourceDropdown failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnNotam(field, index) {
        try {
            const dropDown = await Locators.getFirstLocator(clickOnDataSource(field), 10000);
            await Utils.safeClick(dropDown);
            logger.info(`clickOnDataSourceDropdown is ${field}`);

            const selectNotam = await Locators.getFirstLocator(notam(index), 10000);
            await Utils.safeClick(selectNotam);

            const doneBtn = await Locators.getFirstLocator(DoneButton(), 10000);
            await Utils.safeClick(doneBtn);

            logger.info('clickOnNotam and selected notam');
        } catch (error) {
            logger.error(`clickOnNotam failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubmitForm() {
        try {
            const submit = await Locators.getFirstLocator(submitForm(), 10000);
            await safeClick(submit);
            logger.info('clicked on submit form');

        } catch (error) {
            logger.error(`clickOnSubmitForm failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    /* ========================= Business Flow ========================= */

    async submitFormWithDataSources() {
        try {
            await this.waituntilLoaderToDisappear();
            await this.clickOnNew();
            await this.clickOnForm(Forms.FormNames[1]);
            await this.clickOnFormOptions(Forms.FormOptions[0]);
            await this.clickOnMultiColumnGrid();
            await this.enterInputToField(Forms.mcgFieldName, Forms.mcgFieldNameValue);
            await this.enterInputToField(Forms.mcgFieldNumber, Forms.mcgFieldNumberValue);
            await this.selectDateByLabel(Forms.mcgDateField, Forms.Year, Forms.Date, Forms.Month);
            await this.clickOnSelectionField(Forms.SelectOption);
            await this.addAttachmentFromGallery(Forms.AttachmentOption);
            const attachmentElement = await Locators.getFirstLocator(attachmentField(), 10000);
            await attachmentElement.waitForDisplayed({ timeout: 10000 });
            await this.swipeUp();
            await this.clickOnSystemUserField(Forms['System User']);
            await this.clickOnSaveButton();
            await this.clickOnDataSourceDropdown(Forms['DataSource Property'], Forms.PropertyValue);
            await this.clickOnDataSourceDropdown(Forms['DataSource AssetRegistry'], Forms.AssetRegistryValue);
            await this.swipeUp();
            const tenant = await Locators.getFirstLocator(companyname(), 10000);
            await Utils.swipeTillElement(tenant, 3);
            await this.clickOnDataSourceDropdown(Forms['DataSource Tenants'], Forms.TenantName);
            await this.clickOnDataSourceDropdown(Forms['DataSource Form Data'], Forms['Form Data Value']);
            await this.clickOnDataSourceDropdown(Forms['DataSource NOTAMS'], Forms.NotamBasedOnIndex);
            await this.swipeUp();
            await this.clickOnSubmitForm();
            await browser.pause(5000);

            logger.info('MCG form submission flow completed successfully');
        } catch (error) {
            logger.error(`submitFormWithDataSources failed: ${error.stack || error.message}`);
            throw error;
        }
    }
}

export default new McgAndDataSources();
