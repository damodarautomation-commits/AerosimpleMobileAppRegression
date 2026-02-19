import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
class save_as_draft extends BasePage {
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

    async name_field(text) {
        try {
            logger.info(`Attempting to set Name field with: ${text}`);
            const input = await $('//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText');
            await this.setValueWhenVisible(input, text);
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
            logger.info(`Successfully set Number field with: ${value}`);
        } catch (err) {
            logger.error(`Error in number_field: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_checkbox() {
        try {
            logger.info(`Attempting to click on Checkbox`);
            const checkbox = await $('//android.widget.TextView[@text="Checkbox "]/preceding-sibling::android.view.ViewGroup');
            await this.clickWhenVisible(checkbox);
            logger.info(`Successfully clicked on Checkbox`);
        } catch (err) {
            logger.error(`Error in click_on_checkbox: ${err.stack || err.message}`);
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
        try {
            logger.info(`Attempting to select option: ${option}`);
            const field = await $('~Select item');
            await field.waitForDisplayed({ timeout: 10000 });
            await field.click();

            let optionElement = await $(`~${option}`);
            if (!(await optionElement.isExisting())) {
                optionElement = await $(`//android.view.ViewGroup[@content-desc="${option}"]`);
            }
            await optionElement.waitForDisplayed({ timeout: 10000 });
            await optionElement.click();
        } catch (err) {
            logger.error(`Error in selectOption: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_toggle_switch() {
        try {
            logger.info(`Attempting to click Toggle switch`);
            const toggleSwitch = await $('//android.widget.Switch');
            await this.clickWhenVisible(toggleSwitch);
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

    async click_and_search_location(location) {
        try {
            await this.swipeUp();
            logger.info(`Searching location: ${location}`);
            const addressField = await $('android=new UiSelector().className("android.widget.EditText").text("Address")');
            await addressField.click();

            const searchField = await $('android=new UiSelector().text("Search Location")');
            await searchField.waitForDisplayed({ timeout: 10000 });
            await searchField.click();
            await searchField.clearValue();
            await searchField.setValue(location);
            logger.info(`Entered search location: ${location}`);

            await browser.pause(2000);

            const suggestionText = await $('//android.widget.HorizontalScrollView//android.view.ViewGroup//android.widget.TextView[1]');
            await suggestionText.waitForDisplayed({ timeout: 10000 });
            await suggestionText.click();
            await suggestionText.click();

            logger.info('Clicked address suggestion');

        } catch (err) {
            logger.error(`Error in click_and_search_location: ${err.stack || err.message}`);
            throw err;
        }
    }

    async placeMarkerAndSave(xOffset = 0.5, yOffset = 0.5) {
        try {
            const mapView = await $('//android.view.TextureView[@content-desc="Google Map"]');
            await this.scroll_till_element(mapView);
            await mapView.waitForDisplayed({ timeout: 15000 });
            await mapView.click();

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
            logger.info(`Tapped on map at (${x}, ${y})`);

            const mapMarker = await $('~Map Marker');
            await mapMarker.waitForDisplayed({ timeout: 1000 });
            await mapMarker.click();
            logger.info(`Successfully clicked on mapMarker`);

            const newX = Math.floor(location.x + size.width * 0.7);
            const newY = Math.floor(location.y + size.height * 0.7);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: newX, y: newY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 150 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();
            logger.info(`Tapped again on map at (${newX}, ${newY})`);

            const saveButton = await $('~Save selection');
            await saveButton.waitForDisplayed({ timeout: 5000 });
            await saveButton.click();
            logger.info(`Successfully saved map selection`);

        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_save() {
        const save = await $('//android.widget.Button[@content-desc="Save"]');
        await save.waitForDisplayed({ timeout: 3000 });
        await save.click();
    }

    async select_system_user(user) {
        try {
            logger.info("Starting System User selection");

            await this.scrollToText("System User");

            const field = await $('//android.widget.TextView[@text="System User "]/following-sibling::android.view.ViewGroup');
            await field.waitForDisplayed({ timeout: 10000 });
            await field.click();
            logger.info("Clicked System User field");

            const option = await $(`~${user}`);
            await option.waitForDisplayed({ timeout: 10000 });
            await option.click();
            logger.info(`Selected user: ${user}`);

            const done = await $('~Done');
            await done.waitForDisplayed({ timeout: 10000 });
            await done.click();
            logger.info("Clicked Done to confirm selection");

        } catch (err) {
            logger.error(`Error selecting system user: ${err.stack || err.message}`);
            throw err;
        }
    }

    async completeInspectionChecklists() {
        try {
            logger.info("Starting Inspection Checklist");

            const clicked = new Set();

            while (true) {
                const failButtons = await $$('//android.widget.Button[@content-desc="Fail"]');
                logger.info(`Found Fail buttons: ${failButtons.length}`);

                let clickedInThisRound = false;

                for (const failButton of failButtons) {
                    if (!(await failButton.isDisplayed())) continue;

                    const bounds = await failButton.getAttribute("bounds");
                    if (clicked.has(bounds)) continue;

                    await failButton.click();
                    logger.info(`Clicked Fail button at bounds: ${bounds}`);
                    clicked.add(bounds);

                    await driver.pause(500);
                    clickedInThisRound = true;
                }

                if (!clickedInThisRound) {
                    await this.swipeUp();
                    await driver.pause(500);

                    const sign = await $('//android.widget.TextView[@text="Add signature"]');
                    if (await sign.isDisplayed()) {
                        logger.info("Reached Add Signature — stopping checklist");
                        break;
                    }

                    const moreButtons = await $$('//android.widget.Button[@content-desc="Fail"]');
                    if (moreButtons.length === 0) {
                        logger.info("All Fail buttons completed — skipping further actions");
                        break;
                    }
                }
            }

            logger.info("Inspection Checklist completed");

        } catch (err) {
            logger.error(`Error in completeInspectionChecklists: ${err.stack || err.message}`);
            throw err;
        }
    }

    async clickAndDrawSignature() {
        try {
            logger.info("Starting Signature process");

            await this.swipeUp();

            let attempts = 0;
            const maxAttempts = 10;
            let signatureClicked = false;

            while (attempts < maxAttempts) {
                const addSignature = await $('//android.widget.TextView[@text="Add signature"]');

                if (await addSignature.isDisplayed()) {
                    await addSignature.click();
                    logger.info("Clicked Add signature");
                    signatureClicked = true;
                    break;
                }

                attempts % 2 === 0 ? await this.swipeUp() : await this.swipeDown();
                await driver.pause(1000);
                attempts++;
            }

            if (!signatureClicked) {
                throw new Error("Add signature element not found");
            }

            await browser.waitUntil(async () => {
                const el = await $$('//android.view.View[@resource-id="signature-pad"]');
                return el.length > 0;
            }, {
                timeout: 15000,
                timeoutMsg: "Signature pad not visible"
            });

            const signaturePad = await $('//android.view.View[@resource-id="signature-pad"]');
            await signaturePad.waitForDisplayed();
            logger.info("Signature pad is visible");

            const location = await signaturePad.getLocation();
            const size = await signaturePad.getSize();

            const baseX = location.x + 30;
            const baseY = location.y + size.height / 2;

            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: baseX, y: baseY },
                        { type: 'pointerDown', button: 0 },

                        { type: 'pointerMove', duration: 120, x: baseX + 40, y: baseY - 20 },
                        { type: 'pointerMove', duration: 120, x: baseX + 80, y: baseY + 25 },
                        { type: 'pointerMove', duration: 120, x: baseX + 120, y: baseY - 15 },
                        { type: 'pointerMove', duration: 120, x: baseX + 160, y: baseY + 20 },
                        { type: 'pointerMove', duration: 120, x: baseX + 200, y: baseY - 10 },

                        { type: 'pointerUp', button: 0 }
                    ]
                }
            ]);

            await driver.releaseActions();
            await driver.pause(500);

            logger.info("Signature drawn");

            const saveBtn = await $('//android.widget.Button[@text="Save"]');
            await saveBtn.waitForDisplayed({ timeout: 10000 });
            await saveBtn.click();

            logger.info("Signature saved successfully");

        } catch (err) {
            logger.error(`Error in clickAndDrawSignature: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_risk_matrix(level) {
        try {
            logger.info("Starting Risk Matrix selection");
            const submit_risk = await $('//android.view.ViewGroup[@content-desc="Submit risk assessment"]');
            await browser.pause(5000);
            await this.swipe_till_element(submit_risk);
            if (await submit_risk.isDisplayed()) {
                await submit_risk.click();
                logger.info("Clicked Submit Risk Assessment");
            }

            await browser.pause(5000);

            const riskXpath = `//android.view.ViewGroup[@content-desc="${level}"]`;

            let attempts = 0;
            const maxAttempts = 6;

            while (attempts < maxAttempts) {
                const select_risk = await $(riskXpath);

                if (await select_risk.isDisplayed()) {
                    await select_risk.click();
                    logger.info(`Selected Risk Level: ${level}`);

                    await browser.pause(5000);

                    const saveBtn = await $('//android.view.ViewGroup[@content-desc="Save"]');
                    await saveBtn.click();
                    logger.info("Clicked Save button");

                    return;
                }

                await this.swipeHorizontal('left');
                await browser.pause(800);
                attempts++;
            }

            throw new Error(`Risk level ${level} not found after horizontal swipe`);

        } catch (err) {
            logger.error(`Error in select_risk_matrix: ${err.stack || err.message}`);
            throw err;
        }
    }

    async annotation() {
        try {
            logger.info("Starting Annotation");
            await this.swipeUp();

            const annotationImage = await $('(//android.view.ViewGroup[.//android.widget.TextView[@text="Annotation "]]//android.widget.ImageView)[3]');
            await annotationImage.click();
            logger.info("Opened Annotation screen");

            await browser.pause(5000);

            const clearall = await $('//android.widget.TextView[@resource-id="com.aerosimple.hybridapp:id/clear_all_text_tv"]');
            await clearall.click();
            logger.info("Cleared all previous drawings");

            const pencil = await $('id=com.aerosimple.hybridapp:id/add_pencil_tv');
            await pencil.click();
            logger.info("Selected Pencil tool");

            const drawingView = await $('id=com.aerosimple.hybridapp:id/drawing_view');
            await drawingView.waitForDisplayed();
            logger.info("Drawing canvas displayed");

            const location = await drawingView.getLocation();
            const size = await drawingView.getSize();
            const baseX = location.x + 30;
            const baseY = location.y + size.height / 2;

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: baseX, y: baseY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 120, x: baseX + 40, y: baseY - 20 },
                    { type: 'pointerMove', duration: 120, x: baseX + 80, y: baseY + 25 },
                    { type: 'pointerMove', duration: 120, x: baseX + 120, y: baseY - 15 },
                    { type: 'pointerMove', duration: 120, x: baseX + 160, y: baseY + 20 },
                    { type: 'pointerMove', duration: 120, x: baseX + 200, y: baseY - 10 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await driver.releaseActions();
            await browser.pause(500);
            logger.info("Annotation signature drawn");

            const erase = await $('id=com.aerosimple.hybridapp:id/erase_drawing_tv');
            await erase.click();
            logger.info("Erase tool selected");

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: baseX, y: baseY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 120, x: baseX + 60, y: baseY - 30 },
                    { type: 'pointerMove', duration: 120, x: baseX + 120, y: baseY + 40 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await driver.releaseActions();
            await browser.pause(500);
            logger.info("Annotation re-drawn after erase");

            const done = await $('id=com.aerosimple.hybridapp:id/done_drawing_tv');
            await done.click();
            logger.info("Clicked Done on annotation");

            const next = await $('id=com.aerosimple.hybridapp:id/go_to_next_screen_tv');
            await next.click();
            logger.info("Moved to next screen");

            await browser.pause(500);

        } catch (err) {
            logger.error(`Error in annotation: ${err.stack || err.message}`);
            throw err;
        }
    }

    async enter_SSI_Field() {
        try {
            logger.info("Entering SSI Field");

            const ssiField = await $('//android.widget.TextView[@text="SSI Field "]/following-sibling::android.widget.EditText');
            await ssiField.click();
            await ssiField.clearValue();
            await ssiField.setValue("9492358076");
            await browser.hideKeyboard();

            logger.info("Entered SSI Field and hid keyboard");

        } catch (err) {
            logger.error(`Error in enter_SSI_Field: ${err.stack || err.message}`);
            throw err;
        }
    }

    async emailValidation() {
        try {
            logger.info("Starting Email Validation");

            const emailField = await $('//android.widget.TextView[@text="Email Validation "]/following-sibling::android.widget.EditText');
            await emailField.click();
            await emailField.clearValue();
            await emailField.setValue("damodar123");
            await browser.hideKeyboard();
            logger.info("Entered invalid email");

            const submitBtn = await $('//android.widget.Button[@content-desc="Submit form"]');
            await submitBtn.click();
            logger.info("Clicked Submit Form");

            const emailError = await $('//android.widget.TextView[@text="Please enter a valid email"]');
            await emailError.waitForDisplayed({ timeout: 5000 });
            logger.info("Validation error displayed: " + await emailError.getText());

            await emailField.click();
            await emailField.clearValue();
            await emailField.setValue("damodar@aerosimple.in");
            await browser.hideKeyboard();
            logger.info("Entered correct email");

        } catch (err) {
            logger.error(`Error in emailValidation: ${err.stack || err.message}`);
            throw err;
        }
    }

    async phone_number_validation() {
        try {
            logger.info("Starting Phone Number Validation");

            const countriesBtn = await $('//android.view.ViewGroup[@content-desc="Countries button"]');
            await countriesBtn.waitForDisplayed({ timeout: 10000 });
            await countriesBtn.click();
            logger.info("Clicked Countries button");

            //const searchInput = await $('//android.widget.TextView[@content-desc="Country Select Search Input"]');
            //await searchInput.waitForDisplayed({ timeout: 10000 });
            //await searchInput.click();
            //await browser.hideKeyboard();
            const indiaButton = await $('//android.widget.Button[@resource-id="countrySelectItem" and .//android.widget.TextView[@resource-id="countrySelectItemName" and @text="India"]]');

            await this.swipe_till_element(indiaButton);
            await indiaButton.click();
            logger.info("Selected India (+91)");

            const phoneField = await $('//android.widget.EditText[@content-desc="Phone Number input"]');
            await phoneField.waitForDisplayed({ timeout: 10000 });
            await phoneField.click();
            await phoneField.clearValue();
            await phoneField.setValue("94850"); // invalid number

            try {
                await browser.hideKeyboard();
            } catch (e) {
                await driver.pressKeyCode(4);
            }

            logger.info("Entered invalid phone number");

            const submitBtn = await $('//android.widget.Button[@content-desc="Submit form"]');
            await submitBtn.waitForEnabled({ timeout: 10000 });
            await submitBtn.click();
            logger.info("Clicked Submit Form");

            const phoneError = await $('//android.widget.TextView[@text="Please enter a valid phone number"]');
            await phoneError.waitForDisplayed({ timeout: 5000 });

            const errorText = await phoneError.getText();
            logger.info("Phone validation error displayed: " + errorText);

            await phoneField.click();
            await phoneField.clearValue();
            await phoneField.setValue("9492358076"); // valid number

            try {
                await browser.hideKeyboard();
            } catch (e) {
                await driver.pressKeyCode(4);
            }

            logger.info("Entered valid phone number");

        } catch (err) {
            logger.error(`Error in phone_number_validation: ${err.stack || err.message}`);
            throw err;
        }
    }


    async customPatternValidation() {
        try {
            logger.info("Starting Custom Pattern Validation");

            const customField = await $('//android.widget.TextView[@text="Custom Validation "]/following-sibling::android.widget.EditText');
            await customField.click();
            await customField.clearValue();
            await customField.setValue("12-ab-XYZ"); // wrong format
            await browser.hideKeyboard();
            logger.info("Entered invalid custom string");

            const submitBtn = await $('//android.widget.Button[@content-desc="Submit form"]');
            await submitBtn.click();
            logger.info("Clicked Submit Form");

            const patternError = await $('//android.widget.TextView[contains(@text,"Please match the string using a pattern")]');
            await patternError.waitForDisplayed({ timeout: 5000 });
            logger.info("Pattern validation error displayed: " + await patternError.getText());

            await customField.click();
            await customField.clearValue();
            await customField.setValue("9d-8kx-1YLF"); // right format
            await browser.hideKeyboard();
            logger.info("Entered valid custom string");

            await submitBtn.click();
            logger.info("Clicked Submit Form with valid custom string");

        } catch (err) {
            logger.error(`Error in customPatternValidation: ${err.stack || err.message}`);
            throw err;
        }
    }

    async swipe_till_element(element, maxSwipes = 20) {
        let isVisible = false;

        while (!isVisible && maxSwipes > 0) {
            if (await element.isExisting() && await element.isDisplayed()) {
                isVisible = true;
                break;
            }
            await this.swipeUp();
            await driver.pause(500);
            maxSwipes--;
        }

        if (!isVisible) {
            throw new Error('Element not visible after scrolling');
        }
    }



    async click_on_submit_form() {
        const submit = await $('//android.widget.Button[@content-desc="Submit form"]');
        await submit.waitForDisplayed({ timeout: 3000 });
        await submit.click();
    }

    async click_form_options(option) {
        const optionText = await $(`//android.widget.TextView[@text="${option}"]`);
        await optionText.waitForDisplayed({ timeout: 3000 });
        await optionText.click();
    }

    async click_on_draft_form_entry() {
        const draftEntries = await $$('//android.view.ViewGroup[contains(@content-desc,"Draft")]');

        if (draftEntries.length > 0) {
            await draftEntries[0].waitForDisplayed({ timeout: 3000 });
            await draftEntries[0].click();
        } else {
            console.log('No Draft form entries found in form log list page');
        }
    }

    async verify_discard_and_continue_draft_confirmation_modal() {
        const confirmationText = await $(
            '//android.widget.TextView[@text="Would you like to continue editing this draft or discard it?"]'
        );
        await confirmationText.waitForDisplayed({ timeout: 3000 });
    }

    async confirm_discard_continue_editing_draft(option) {
        const actionBtn = await $(
            `//android.view.ViewGroup[@resource-id="modal"]//android.widget.Button[@content-desc="${option}"]`
        );
        await actionBtn.waitForDisplayed({ timeout: 3000 });
        await actionBtn.click();
    }

    async save_as_draft_form_submission(form_name) {
        try {
            await this.waituntilLoaderToDisappear();
            await this.click_on_new();
            await this.click_on_form(form_name);
            await this.click_on_formOptions("Add Form Entry");
            await this.name_field('Prasad');
            await this.number_field('1234');
            await this.click_on_checkbox();
            await this.select_date_by_label("Date and Time ", 30, "January", 2025);
            await this.select_time_by_label("Time ", "10", "30", "PM");
            await this.selectOption("Selection ", "DEF");
            await this.click_toggle_switch();
            await this.addAttachmentFromGallery();
            await this.click_on_save();
            await this.waituntilLoaderToDisappear();
            await this.click_form_options('View Form Log');
            await this.waituntilLoaderToDisappear();
            await this.click_on_draft_form_entry();
            await this.waituntilLoaderToDisappear();
            await this.verify_discard_and_continue_draft_confirmation_modal();
            await this.confirm_discard_continue_editing_draft('Discard');
            await this.waituntilLoaderToDisappear();
            await this.click_on_new();
            await this.click_on_form(form_name);
            await this.click_on_formOptions("Add Form Entry");

            await this.waituntilLoaderToDisappear();
            await this.click_on_save();
            await this.waituntilLoaderToDisappear();
            await this.click_form_options('View Form Log');
            await this.waituntilLoaderToDisappear();
            await this.click_on_draft_form_entry();
            await this.waituntilLoaderToDisappear();
            await this.verify_discard_and_continue_draft_confirmation_modal();
            await this.confirm_discard_continue_editing_draft('Continue');
            await this.waituntilLoaderToDisappear();

            await this.name_field('Prasad');
            await this.number_field('1234');
            await this.click_on_checkbox();
            await this.select_date_by_label("Date and Time ", 30, "January", 2025);
            await this.select_time_by_label("Time ", "10", "30", "PM");
            await this.selectOption("Selection ", "DEF");
            await this.click_toggle_switch();
            await this.addAttachmentFromGallery();
            await this.placeMarkerAndSave(0.5, 0.5);

            await this.click_and_search_location("UnoSimple");
            await this.select_system_user('Sateesh Admin');
            await this.completeInspectionChecklists();
            await this.clickAndDrawSignature();
            await this.select_risk_matrix("B5");
            await this.annotation();
            await this.enter_SSI_Field();
            await this.emailValidation();
            await this.phone_number_validation();
            await this.customPatternValidation();
            await this.click_on_submit_form();

            logger.info(`Completed save as draft form: ${form_name}`);
        } catch (err) {
            logger.error(`Error in Completed save as draft_form: ${err.stack || err.message}`);
            throw err;
        }

    }

}


export default new save_as_draft();