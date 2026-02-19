import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
class edit_form_submission extends BasePage {
    async click_on_new() {
        try {
            logger.info('Attempting to click on button +');
            const addBtn = await $('//android.view.ViewGroup[@resource-id="animated-fab-container"]');
            await addBtn.waitForDisplayed({ timeout: 10000 });
            await addBtn.click();
            logger.info('Successfully clicked on button +');
        } catch (err) {
            logger.error(`Error in click_on_new: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_form(form_name) {
        try {
            logger.info(`Attempting to click on form: ${form_name}`);
            let form = await $(`~${form_name}`);
            if (!(await form.isExisting())) {
                logger.warn(`Form not found by accessibility id, trying XPath...`);
                form = await $(`//android.view.ViewGroup[contains(@content-desc, "${form_name}")]`);
            }
            await form.waitForDisplayed({ timeout: 10000 });
            await form.click();
            logger.info(`Successfully clicked on form: ${form_name}`);
        } catch (err) {
            logger.error(`Error in click_on_form: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_formOptions(option) {
        try {
            logger.info(`Attempting to click on form option: ${option}`);
            let opt = await $(`~${option}`);
            if (!(await opt.isExisting())) {
                logger.warn(`Option not found by accessibility id, trying XPath...`);
                opt = await $(`//android.widget.TextView[@text="${option}"]`);
            }
            await opt.waitForDisplayed({ timeout: 10000 });
            await opt.click();
            logger.info(`Successfully clicked on form option: ${option}`);
        } catch (err) {
            logger.error(`Error in click_on_formOptions: ${err.stack || err.message}`);
            throw err;
        }
    }

    async gotofilters_and_select_dateRange(filter_range) {
        try {
            logger.info("Attempting to open filters");
            /*let clicked = false;

            for (let i = 1; i <= 4; i++) {
                const filter_icon = await $(`(//android.widget.TextView[@text="Forms"]/following-sibling::android.view.ViewGroup)[${i}]`);
                if (await filter_icon.isExisting()) {
                    await filter_icon.waitForDisplayed({ timeout: 10000 });
                    await filter_icon.waitForEnabled({ timeout: 10000 });
                    await filter_icon.scrollIntoView();
                    await filter_icon.click();
                    logger.info(`Successfully clicked filter icon at index ${i}`);
                    await browser.pause(500);
                    clicked = true;
                    break;
                } else {
                    logger.warn(`Filter icon not found at index ${i}`);
                }
            }

            if (!clicked) {
                throw new Error("No filter icon found in indices 1 to 4");
            }*/
            const filter_icon = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[3]');
            await filter_icon.click();
            await browser.pause(2000);
            logger.info("Clicking default filter 'Yesterday - Today'");
            const filter = await $("//android.widget.TextView[normalize-space(@text)='Yesterday - Today']");
            await filter.waitForDisplayed({ timeout: 5000 });
            await filter.click();

            logger.info(`Selecting custom filter range: ${filter_range}`);
            const select_filter = await $(`//android.widget.TextView[@text="${filter_range}"]`);
            await select_filter.waitForDisplayed({ timeout: 5000 });
            await select_filter.click();

            logger.info("Clicking on Update button");
            const click_on_update = await $('//android.widget.TextView[@text="Update"]');
            await click_on_update.waitForDisplayed({ timeout: 5000 });
            await click_on_update.click();

            logger.info("Waiting for entries to be displayed");
            const entries = await $$('//android.view.ViewGroup[contains(@content-desc, "Aerosimple Mobile")]');
            if (entries.length > 0) {
                await entries[0].waitForDisplayed({ timeout: 5000 });
                logger.info("Entries are visible");
            } else {
                logger.warn("No entries found after applying filter");
            }
            await browser.pause(500);
        } catch (err) {
            logger.error(`Error in gotofilters_and_select_dateRange: ${err.stack || err.message}`);
            throw err;
        }
    }

    async view_form_and_create_from() {
        const entries = await $$('//android.view.ViewGroup[contains(@content-desc, "Aerosimple Mobile")]');
        if (entries.length > 0) {
            await entries[0].waitForDisplayed({ timeout: 5000 });
            logger.info("Entries are visible");
            await entries[0].click();
            logger.info('clicked on form entry');
        } else {
            console.log('No form entries so need to create new form ');
            logger.info('Form entries are empty and need to create new form');

        }
    }

    async click_on_edit() {
        try {
            await browser.pause(2000);
            const actions = await $('//android.widget.TextView[@text=""]');
            await actions.waitForDisplayed({ timeout: 5000 });
            await actions.waitForEnabled({ timeout: 10000 });
            await actions.click();

            const edit = await $('//android.view.ViewGroup[@content-desc="󰏫, Edit"]');
            await edit.waitForDisplayed({ timeout: 5000 });
            await edit.waitForEnabled({ timeout: 10000 });
            await edit.click();

        }
        catch (err) {
            logger.error(`Error in edit_form_submission: ${err.stack || err.message}`);
            throw err;
        }
    }

    async setValueWhenVisible(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });

        await element.click();
        await element.clearValue();
        await browser.pause(300);
        await element.setValue(value);
    }

    async name_field(text) {
        try {
            logger.info(`Attempting to set Name field with: ${text}`);

            const input = await $('(//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText)[1]');
            await this.setValueWhenVisible(input, text);
            await browser.hideKeyboard();

            logger.info(`Successfully set Name field with: ${text}`);
        } catch (err) {
            logger.error(`Error in name_field: ${err.stack || err.message}`);
            throw err;
        }
    }

    async number_field(value) {
        try {
            logger.info(`Attempting to set Number field with: ${value}`);

            const input = await $('//android.widget.TextView[@text="Number "]/following-sibling::android.widget.EditText');
            await this.setValueWhenVisible(input, value);
            await browser.hideKeyboard();

            logger.info(`Successfully set Number field with: ${value}`);
        } catch (err) {
            logger.error(`Error in number_field: ${err.stack || err.message}`);
            throw err;
        }
    }

    async checkbox() {
        try {
            const checkboxContainer = await $('//android.widget.TextView[@text="Checkbox "]/preceding-sibling::android.view.ViewGroup');
            const isChecked = await checkboxContainer.getAttribute("checked");
            logger.info(`Initial checkbox state: ${isChecked}`);

            if (isChecked === "true") {
                await checkboxContainer.click();
                logger.info('Previously it was checked, now we made it unchecked');
            } else {
                await checkboxContainer.click();
                logger.info('Previously it was unchecked, now we made it checked');
            }

            const newState = await checkboxContainer.getAttribute("checked");
            logger.info(`Final checkbox state: ${newState}`);

            await checkboxContainer.click();

        } catch (err) {
            logger.error(`Error in checkbox: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_date_by_label(label, day, month, year) {
        try {
            logger.info(`Attempting to select date for label: ${label}`);
            const field = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup`);
            await this.clickWhenVisible(field);

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await this.clickWhenVisible(yearHeader);

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dateDesc = `${day} ${month} ${year}`;
            const dayElement = await $(`//android.view.View[@content-desc="${dateDesc}"]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected date: ${dateDesc}`);
        } catch (err) {
            logger.error(`Error in select_date_by_label: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_time_by_label(label, hour, minute, meridian) {
        try {
            logger.info(`Attempting to select time for label: ${label}`);
            const field = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup`);
            await this.clickWhenVisible(field);

            const hourPicker = await $('(//android.widget.NumberPicker)[1]//android.widget.EditText');
            await hourPicker.setValue(hour);

            const minutePicker = await $('(//android.widget.NumberPicker)[2]//android.widget.EditText');
            await minutePicker.setValue(minute);

            const meridianPicker = await $('(//android.widget.NumberPicker)[3]//android.widget.EditText');
            await meridianPicker.setValue(meridian);

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected time`);
        } catch (err) {
            logger.error(`Error in select_time_by_label: ${err.stack || err.message}`);
            throw err;
        }
    }

    async selectOption(label, option) {
        await this.swipeUp();
        const dropdown = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup[1]`);
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.click();

        const optionText = await $(`//android.view.ViewGroup[@content-desc="${option}"]`);
        await optionText.waitForDisplayed({ timeout: 10000 });
        await optionText.click();

    }

    async nested_dropdown(label, option) {
        await this.swipeUp();
        const dropdown = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup[1]`);
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.click();

        const optionText = await $(`//android.view.ViewGroup[@content-desc="${option}"]`);
        await optionText.waitForDisplayed({ timeout: 10000 });
        await optionText.click();
    }

    async click_toggle_switch() {
        try {
            logger.info('Attempting to toggle switch if it is OFF');

            const toggleSwitch = await $('//android.widget.Switch');
            await toggleSwitch.waitForDisplayed({ timeout: 10000 });

            const isChecked = await toggleSwitch.getAttribute('checked');

            if (isChecked === 'false') {
                await toggleSwitch.click();
                logger.info('Toggle switch was OFF → turned ON');
            } else {
                logger.info('Toggle switch already ON → no action taken');
            }

        } catch (err) {
            logger.error(`Error in click_toggle_switch: ${err.stack || err.message}`);
            throw err;
        }
    }


    async addAttachmentFromGallery() {
        try {
            logger.info(`Attempting to add attachment from Gallery`);
            const addAttachmentButton = await $('~, Add attachment');
            await addAttachmentButton.waitForDisplayed({ timeout: 10000 });
            await addAttachmentButton.click();

            const galleryOption = await $('~, Select From Gallery');
            await galleryOption.waitForDisplayed({ timeout: 10000 });
            await galleryOption.click();

            const latestPhoto = await $('//android.view.View[contains(@content-desc,"Photo taken")]');
            await latestPhoto.waitForDisplayed({ timeout: 10000 });
            await latestPhoto.click();

            const doneButton = await $('//android.widget.TextView[@text="Done"]/..');
            await doneButton.waitForDisplayed({ timeout: 10000 });
            await doneButton.click();

            logger.info(`Successfully attached photo from Gallery`);
        } catch (err) {
            logger.error(`Error in addAttachmentFromGallery: ${err.stack || err.message}`);
            throw err;
        }
    }

    async placeMarkerAndSave(xOffset = 0.5, yOffset = 0.5) {
        try {
            logger.info(`Attempting to place marker on map at offsets (${xOffset}, ${yOffset})`);
            const mapView = await $('//*[@content-desc="Google Map" or @text="Google Map"]');
            await this.scrollIntoView(mapView);
            await mapView.waitForDisplayed({ timeout: 15000 });
            await driver.pause(2000);

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
                    { type: 'pause', duration: 150 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await driver.releaseActions();

            logger.info(`Marker placed on map at (${x}, ${y})`);
            const saveButton = await $('~Save selection');
            await saveButton.waitForDisplayed({ timeout: 10000 });
            await saveButton.click();

            logger.info(`Successfully saved map selection`);
        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_update() {
        const update = await $('//android.widget.Button[@content-desc="Update"]');
        await update.click();

    }

    async verifyFormSubmissionSuccess() {
        const title = await $('//android.widget.TextView[@text="Aerosimple Form"]');
        const message = await $(
            '//android.widget.TextView[@text="Your form was successfully submitted"]'
        );

        await title.waitForDisplayed({ timeout: 10000 });
        await message.waitForDisplayed({ timeout: 10000 });
    }

    async click_on_log_or_detail(option) {
        const optionText = await $(`//android.widget.TextView[@text="${option}"]/parent::android.view.ViewGroup`);
        await optionText.click();
    }

    async edit_new_form_submission(form_name) {
        try {
            await this.waituntilLoaderToDisappear();
            await this.click_on_new();
            await browser.pause(20000);
            await this.click_on_form(form_name);
            await this.click_on_formOptions("View Form Data");
            await browser.pause(20000);
            await this.gotofilters_and_select_dateRange('Last 30 Days');
            await browser.pause(2000);
            await this.view_form_and_create_from();
            await browser.pause(20000);
            await this.click_on_edit();
            await this.name_field("Bhagya");
            await this.number_field("8956");
            await this.checkbox();
            await this.select_date_by_label("Date and Time ", 30, "January", 2025);
            await this.selectOption("Selection ", "GHI");
            await this.select_time_by_label("Time ", "10", "30", "PM");
            await this.addAttachmentFromGallery(0.50, 0.50);
            await this.placeMarkerAndSave();
            await this.click_toggle_switch();
            await this.nested_dropdown('Level 1', 'Electronics');
            await this.click_on_update();
            await browser.pause(20000);
            await this.verifyFormSubmissionSuccess();
            await this.click_on_log_or_detail('View Form Detail');
            await browser.pause(20000);

        }
        catch (err) {
            logger.error(`Error in edit_form_submission: ${err.stack || err.message}`);
            throw err;
        }

    }
}

export default new edit_form_submission();