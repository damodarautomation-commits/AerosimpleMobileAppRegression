import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';

class inspection_workorder extends BasePage {
    async openCreateNewInspection(action) {
        try {
            logger.info(`Attempting to open inspection action: ${action}`);

            const inspectionButton = await $(`//android.widget.TextView[@text="${action}"]`);
            await inspectionButton.waitForDisplayed({ timeout: 3000 });
            await inspectionButton.click();

            logger.info(`Successfully clicked inspection action: ${action}`);
        } catch (err) {
            logger.error(`Failed in openCreateNewInspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection(Inspection_name) {
        try {
            logger.info(`Attempting to select inspection: ${Inspection_name}`);

            const inspection = await $(`//android.widget.TextView[@text="${Inspection_name}"]`);
            await inspection.waitForDisplayed({ timeout: 3000 });
            await inspection.click();

            logger.info(`Successfully selected inspection: ${Inspection_name}`);
        } catch (err) {
            logger.error(`Failed in click_on_inspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_shift(shift_name) {
        try {
            logger.info(`Attempting to select shift: ${shift_name}`);

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

    async click_on_start_inspection() {
        try {
            logger.info('Attempting to click Start Inspection button');

            const button_text = await $("//android.widget.TextView[@resource-id='fab-text']").getText();
            logger.info(`Button text found: ${button_text}`);
            expect(button_text).toEqual("Start Inspection");

            const startBtn = await $("//android.widget.Button[@resource-id='fab']");
            await startBtn.waitForDisplayed({ timeout: 5000 });
            await startBtn.click();

            logger.info('Successfully clicked Start Inspection button');
        } catch (err) {
            logger.error(`Failed in click_on_start_inspection: ${err.message}`);
            throw err;
        }
    }

    async clickAllChecklists() {

        const clicked = new Set();
        let newButtonsFound = true;

        while (newButtonsFound) {
            newButtonsFound = false;

            const passButtons = await $$("//android.widget.Button[@content-desc='Pass']");

            for (let i = 0; i < passButtons.length; i++) {
                try {
                    const btn = passButtons[i];
                    const id = await btn.elementId;

                    if (clicked.has(id)) continue;

                    await btn.waitForDisplayed({ timeout: 2000 });
                    await btn.click();
                    clicked.add(id);

                    logger.info(`Clicked Pass button ${i + 1}`);
                    await browser.pause(500);

                    newButtonsFound = true;
                } catch (innerErr) {
                    logger.warn(`Failed to click Pass button ${i + 1}: ${innerErr.message}`);
                }
            }

            if (newButtonsFound) {
                logger.info("Swiping up to find more Pass buttons...");
                await this.swipeUp();
                await browser.pause(1000);
            } else {
                logger.info("No new Pass buttons found. All completed ");
            }
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

    async completeInspectionUnsatisfactory() {
        const answeallchecks = await $('//android.view.View[@text=" Please make sure you have answered all of the inspection checklists."]');
        const allChecks_confirmations_message = await answeallchecks.getText();
        logger.info(`Confirmation message: ${allChecks_confirmations_message}`);

        const okButton = await $('(//android.view.ViewGroup[@resource-id="button-container"])[1]');
        await okButton.waitForDisplayed({ timeout: 2000 });
        await okButton.click();
        logger.info("Clicked OK button ");
    }



    async click_on_add_workorder(targetText) {
        try {
            logger.info(`Attempting to open checklist actions for: ${targetText}`);

            const checkaction = await $(`(//android.widget.TextView[@text="${targetText}"]/../../..//android.view.ViewGroup)[4]`);
            await checkaction.waitForDisplayed({ timeout: 5000 });
            await checkaction.click();
            logger.info(`Checklist action menu opened for: ${targetText}`);

            const workorder = await $('//android.widget.TextView[@text="Add Work Order"]/..');
            await workorder.waitForDisplayed({ timeout: 5000 });
            await workorder.click();
            logger.info("Clicked on 'Add Work Order' successfully");

        } catch (err) {
            logger.error(`Failed to click Add Work Order for '${targetText}': ${err.message}`);
            throw err;
        }
    }

    async select_priority(option) {
        try {
            logger.info(`Selecting Priority option: ${option}`);

            const priorityDropdown = await $('//android.view.ViewGroup[@content-desc="Please select the Priority"]');
            await priorityDropdown.waitForDisplayed({ timeout: 20000 });
            logger.info('Priority dropdown displayed');

            await priorityDropdown.click();
            logger.info('Clicked on Priority dropdown');

            const selectOption = await $(`//android.view.ViewGroup[@content-desc="${option}"]`);
            await selectOption.waitForDisplayed({ timeout: 5000 });
            logger.info(`Option "${option}" is visible`);

            await selectOption.click();
            logger.info(`Successfully selected Priority option: ${option}`);

        } catch (error) {
            logger.error(`Failed to select Priority option "${option}" - ${error.message}`);
            throw error;
        }
    }

    async click_and_select_location_on_map(xOffset = 0.5, yOffset = 0.5) {
        try {
            logger.info('attempt to click on map')
            const locationfield = await $('//android.widget.TextView[@text="* Location"]');
            await locationfield.waitForDisplayed({ timeout: 2000 });
            await this.swipeUp();
            await this.scroll_till_element(locationfield);
            await locationfield.waitForDisplayed({ timeout: 2000 });

            const map = await $('//android.widget.TextView[@text="* Location"]/following-sibling::android.view.ViewGroup[1]');
            await map.waitForDisplayed({ timeout: 2000 });
            await map.click();
            logger.info('clicked on map field');


            const mapView = await $('//android.view.TextureView[@content-desc="Google Map"]');
            await mapView.waitForDisplayed({ timeout: 2000 });
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

            const mapMarker = await $('//android.view.ViewGroup[@content-desc=""]');
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

            const doneButton = await $('//android.widget.TextView[@text="Done"]/..');
            await doneButton.waitForDisplayed({ timeout: 5000 });
            await doneButton.click();
            logger.info(`Successfully saved map selection`);

            logger.info(`click on add comment button successfully`);

        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }


    }
    async enter_description(value) {
        try {
            logger.info("Entering Problem Description");

            const description = await $('//android.widget.TextView[contains(@text,"Problem Description")]/following-sibling::android.widget.EditText');

            const isDisplayed = await description.isDisplayed();
            if (!isDisplayed) {
                logger.info("Problem Description field not visible, performing swipe up");
                await this.swipeUp();
            }

            await description.waitForDisplayed({ timeout: 2000 });
            logger.info("Problem Description field is displayed");

            await description.click();
            logger.info("Clicked on Problem Description field");

            await description.clearValue();
            logger.info("Cleared existing text in Problem Description field");

            await description.setValue(value);
            logger.info(`Entered description value: ${value}`);

            await browser.hideKeyboard();
            logger.info("Keyboard hidden successfully");

        } catch (error) {
            logger.error(`Error while entering Problem Description: ${error.message}`);
            throw error;
        }
    }

    async addAttachmentFromGallery() {
        try {
            logger.info("Starting: Add Attachment from Gallery flow");

            const addAttachmentButton = await $('//android.widget.TextView[@text="Add attachment"]');

            const isDisplayed = await addAttachmentButton.isDisplayed();
            if (!isDisplayed) {
                logger.info("Add attachment button not visible, performing swipe up");
                await this.swipeUp();
            }

            await addAttachmentButton.waitForDisplayed({ timeout: 10000 });
            logger.info("Add attachment button is visible");

            await addAttachmentButton.click();
            logger.info("Clicked on Add attachment button");

            const galleryOption = await $('//android.widget.TextView[@text="Select From Gallery"]/..');
            await galleryOption.waitForDisplayed({ timeout: 10000 });
            logger.info("Gallery option displayed");

            await galleryOption.click();
            logger.info("Selected 'Select From Gallery' option");

            const latestPhoto = await $('(//android.view.View[contains(@content-desc,"Photo taken")])[1]');
            await latestPhoto.waitForDisplayed({ timeout: 10000 });
            logger.info("Latest photo thumbnail is visible");

            await latestPhoto.click();
            logger.info("Selected the latest photo");

            const doneButton = await $('//android.widget.TextView[@text="Done"]/..');
            await doneButton.waitForDisplayed({ timeout: 10000 });
            logger.info("Done button is visible");

            await doneButton.click();
            logger.info("Clicked Done — Photo successfully attached from Gallery");

        } catch (err) {
            logger.error(`FAILED: addAttachmentFromGallery | ${err.message}`);
            logger.error(err.stack);
            throw err;
        }
    }

    async name_field(text) {
        try {
            logger.info("Entering value into Name field");

            const name = await $('(//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText)[1]');

            const isDisplayed = await name.isDisplayed();
            if (!isDisplayed) {
                logger.info("Name field not visible, performing swipe up");
                await this.swipeUp();
            }

            await name.waitForDisplayed({ timeout: 2000 });
            logger.info("Name field is displayed");

            await name.click();
            logger.info("Clicked on Name field");

            await name.clearValue();
            logger.info("Cleared existing text in Name field");

            await name.setValue(text);
            logger.info(`Entered Name value: ${text}`);

            await browser.hideKeyboard().catch(async () => {
                logger.warn("hideKeyboard failed, using back action");
                await browser.back();
            });
            logger.info("Keyboard handled after Name entry");

        } catch (error) {
            logger.error(`FAILED: name_field | ${error.message}`);
            logger.error(error.stack);
            throw error;
        }
    }


    async number_field(text) {
        try {
            logger.info("Entering value into Number field");

            const name = await $('(//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText)[2]');

            const isDisplayed = await name.isDisplayed();
            if (!isDisplayed) {
                logger.info("Number field not visible, performing swipe up");
                await this.swipeUp();
            }

            await name.waitForDisplayed({ timeout: 2000 });
            logger.info("Number field is displayed");

            await name.click();
            logger.info("Clicked on Number field");

            await name.clearValue();
            logger.info("Cleared existing text in Number field");

            await name.setValue(text);
            logger.info(`Entered Number value: ${text}`);

            await browser.hideKeyboard().catch(async () => {
                logger.warn("hideKeyboard failed, using back action");
                await browser.back();
            });
            logger.info("Keyboard handled after Number entry");

        } catch (error) {
            logger.error(`FAILED: name_field | ${error.message}`);
            logger.error(error.stack);
            throw error;
        }
    }

    async click_on_checkbox() {
        const checkbox = await $('//android.widget.TextView[@text="Checkbox "]/preceding-sibling::android.view.ViewGroup');
        const isDisplayed = await checkbox.isDisplayed();
        if (!isDisplayed) {
            logger.info("Number field not visible, performing swipe up");
            await this.swipeUp();
        }
        await checkbox.click();
    }


    async click_on_selectDate(year, day) {
        try {
            logger.info('attempt to click on date and time');
            const select_date = await $('(//android.widget.TextView[@text="Date Time "]//following-sibling::android.view.ViewGroup)[1]');

            const isDisplayed = await select_date.isDisplayed();
            if (!isDisplayed) {
                logger.info("date and time field not visible, performing swipe up");
                await this.swipeUp();
            }

            await select_date.waitForDisplayed({ timeout: 2000 });
            await select_date.click();
            logger.info('clicked on date and time');

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await yearHeader.waitForDisplayed({ timeout: 1000 });
            await yearHeader.click();

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dayElement = await $(`//android.view.View[starts-with(@content-desc,"${day} ")]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await okButton.waitForDisplayed({ timeout: 2000 });
            await okButton.click()

            logger.info(`Successfully selected date -> ${day}-${year}`);

        } catch (error) {
            logger.error(`Error while clicking date and time: ${error.message}`);
            throw error;

        }
    }

    async click_on_selection(option) {
        try {
            const selection = await $('(//android.widget.TextView[@text="Date Time "]//following-sibling::android.view.ViewGroup)[2]');

            const isDisplayed = await selection.isDisplayed();
            if (!isDisplayed) {
                logger.info("selection field not visible, performing swipe up");
                await this.swipeUp();
            }
            await selection.waitForDisplayed({ timeout: 1000 });
            await selection.click();

            const selectOption = await $(`//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`);
            await selectOption.waitForDisplayed({ timeout: 1000 });
            await selectOption.click();
        }
        catch (error) {
            logger.error(`Error while clicking section field: ${error.message}`);
            throw error
        }

    }

    async select_system_user(user) {
        try {
            const field = await $('(//android.widget.TextView[@text="System User "]/following-sibling::android.view.ViewGroup)[1]');
            const isDisplayed = await field.isDisplayed();
            if (!isDisplayed) {
                logger.info("system user field not visible, performing swipe up");
                await this.swipeUp();
            }

            await field.waitForDisplayed({ timeout: 10000 });
            await field.click();

            const option = await $(`//android.view.ViewGroup[@content-desc="${user}"]`);
            await option.waitForDisplayed({ timeout: 10000 });
            await option.click()
            const done = await $('//android.widget.TextView[@text="Done"]');
            await done.waitForDisplayed({ timeout: 2000 });
            await done.click();
        }
        catch (error) {
            logger.error(`Error while clicking system user field: ${error.message}`);
            throw error
        }

    }

    async select_time(hour, minute) {
        try {
            logger.info(`Selecting Time → Hour: ${hour}, Minute: ${minute}`);

            const field = await $('(//android.widget.TextView[@text="Time "]/following-sibling::android.view.ViewGroup)[1]');

            const isDisplayed = await field.isDisplayed();
            if (!isDisplayed) {
                logger.info("selet time field not visible, performing swipe up");
                await this.swipeUp();
            }
            await field.waitForDisplayed({ timeout: 3000 });
            logger.info("Time field is displayed");

            await field.click();
            logger.info("Time picker opened");

            // Hour
            const hourButton = await $('(//android.widget.NumberPicker[1]//android.widget.EditText)[1]');
            await hourButton.waitForDisplayed({ timeout: 3000 });
            logger.info("Hour input is visible");

            await hourButton.click();
            await hourButton.clearValue();
            logger.info("Cleared existing hour value");

            await hourButton.setValue(hour);
            logger.info(`Entered hour value: ${hour}`);

            // Minute
            const minuteButton = await $('(//android.widget.NumberPicker[2]//android.widget.EditText)[1]');
            await minuteButton.waitForDisplayed({ timeout: 3000 });
            logger.info("Minute input is visible");

            await minuteButton.click();
            await minuteButton.clearValue();
            logger.info("Cleared existing minute value");

            await minuteButton.setValue(minute);
            logger.info(`Entered minute value: ${minute}`);

            // OK button
            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await okButton.waitForDisplayed({ timeout: 3000 });
            logger.info("OK button is visible in time picker");

            await okButton.click();
            logger.info("Time selected successfully");

        } catch (error) {
            logger.error(`select_time | ${error.message}`);
            logger.error(error.stack);
            throw error;
        }
    }

    async click_on_mcg() {
        try {
            logger.info("STEP: Clicking on Multi Column Grid field");

            const mcg = await $('//android.view.ViewGroup[@content-desc="* Multi Column Grid, "]');
            logger.info("Located Multi Column Grid element");

            const isDisplayed = await mcg.isDisplayed();
            logger.info(`MCG displayed status: ${isDisplayed}`);

            if (!isDisplayed) {
                logger.warn("MCG field not visible, performing swipe up");
                await this.swipeUp();
            }

            await mcg.waitForDisplayed({ timeout: 2000 });
            logger.info("MCG field is visible now");

            await mcg.click();
            logger.info("Clicked on Multi Column Grid field");
        }
        catch (error) {
            logger.error(`Unable to click Multi Column Grid field | ${error.message}`);
            throw error;
        }
    }
    async fill_mcg_name(text) {
        try {
            logger.info(`Entering text in MCG Name field → Value: ${text}`);

            const name = await $('(//android.widget.TextView[@text="MC Name "]/following-sibling::android.widget.EditText)[1]');
            logger.info("Located MCG Name input field");

            await name.waitForDisplayed({ timeout: 1000 });
            logger.info("MCG Name field is visible");

            await name.click();
            logger.info("Clicked on MCG Name field");

            await name.clearValue();
            logger.info("Cleared existing value");

            await name.setValue(text);
            logger.info("Entered value in MCG Name field");
        }
        catch (error) {
            logger.error(`Enter name in MCG Name field | ${error.message}`);
            throw error;
        }
    }

    async fill_mcg_number(text) {
        try {
            logger.info(`Entering text in MCG Number field → Value: ${text}`);

            const name = await $('(//android.widget.TextView[@text="MC Name "]/following-sibling::android.widget.EditText)[2]');
            logger.info("Located MCG Number input field");

            await name.waitForDisplayed({ timeout: 1000 });
            logger.info("MCG Number field is visible");

            await name.click();
            logger.info("Clicked on MCG Number field");

            await name.clearValue();
            logger.info("Cleared existing value");

            await name.setValue(text);
            logger.info("Entered value in MCG Number field");
        }
        catch (error) {
            logger.error(`Enter name in MCG Number field | ${error.message}`);
            throw error;
        }
    }
    //--------------------------------------------------------------------------------------
    async select_date(year, day) {
        try {
            logger.info(" Selecting MC Date Time field");

            const date_field = await $('(//android.widget.TextView[@text="MC Date Time "]/following-sibling::android.view.ViewGroup)[1]');
            logger.info("Located MC Date Time field");

            await date_field.waitForDisplayed({ timeout: 5000 });
            logger.info("MC Date Time field is visible");

            const OkButton = await $('//android.widget.Button[@text="OK"]');

            for (let i = 0; i < 10; i++) {
                await date_field.click(); // Click date & time field
                logger.info(`Clicked date field attempt: ${i + 1}`);

                await browser.pause(500);

                if (await OkButton.isDisplayed()) {
                    logger.info("Date & Time popup is visible");
                    break;
                }
            }

            logger.info(" Clicked on MC Date Time field");

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await yearHeader.waitForDisplayed({ timeout: 1000 });
            await yearHeader.click();

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dayElement = await $(`//android.view.View[starts-with(@content-desc,"${day} ")]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await okButton.waitForDisplayed({ timeout: 2000 });
            await okButton.click()

            logger.info(`Successfully selected date -> ${day}-${year}`);
        }
        catch (error) {
            logger.error(`Click on MC Date Time field | ${error.message}`);
            throw error;
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------
    async click_and_select_mcg(option) {
        try {
            logger.info(`Selecting option from MC Selection → Option: ${option}`);

            const mcg = await $('(//android.widget.TextView[@text="MC Selection "]/following-sibling::android.view.ViewGroup)[1]');
            logger.info("Located MC Selection dropdown field");

            await mcg.waitForDisplayed({ timeout: 20000 });
            logger.info("MC Selection field is visible");

            await mcg.click();
            logger.info("Clicked MC Selection dropdown");

            const selectOption = await $(`//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`);
            logger.info(`Located option element: ${option}`);

            await selectOption.waitForDisplayed({ timeout: 1000 });
            logger.info(`Option "${option}" is visible`);

            await selectOption.click();
            logger.info(`Selected option from MC Selection → ${option}`);
        }
        catch (error) {
            logger.error(`Select option from MC Selection | Option: ${option} | ${error.message}`);
            throw error;
        }
    }

    async click_on_Save() {
        try {
            logger.info("Clicking on Save button");

            const save = await $('//android.widget.Button[@content-desc="Save"]');
            logger.info("Located Save button");

            await save.waitForDisplayed({ timeout: 1000 });
            logger.info("Save button is visible");

            await save.click();
            logger.info("Clicked on Save button");
        }
        catch (error) {
            logger.error(`Click on Save button | ${error.message}`);
            throw error;
        }
    }

    async clickOnWildLifeType(option) {
        try {
            logger.info("click on wildlife type dropdown");
            const wildlifetype = await $('(//android.widget.TextView[@text="Wildlife Type"]/following-sibling::android.view.ViewGroup//android.view.ViewGroup[@content-desc])[1]');

            const isDisplayed = await wildlifetype.isDisplayed();
            logger.info(`wildlitype: ${isDisplayed}`);

            if (!isDisplayed) {
                logger.warn("wildlitype field not visible, performing swipe up");
                await this.swipeUp();
                await this.swipeUp();
            }

            await wildlifetype.waitForDisplayed({ timeout: 1000 });
            logger.info("wildlife type drop down  is visible");

            await wildlifetype.click();
            logger.info("Clicked on wildlife type drop down");

            const wildlifeOption = await $(`//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`);
            await wildlifeOption.waitForDisplayed({ timeout: 1000 });

            await wildlifeOption.click();
            logger.info("selected wildlife type  option in drop down");


        }
        catch (error) {
            logger.error(`Click on wildlife type drop down| ${error.message}`);
            throw error;
        }
    }

    async clickOnWildlifespecies(option) {
        try {
            logger.info('Clicking on Wildlife Species dropdown');

            const species = await $('(//android.widget.TextView[@text="Wildlife Type"]/following-sibling::android.view.ViewGroup//android.view.ViewGroup[@content-desc])[2]');
            await species.waitForDisplayed({ timeout: 5000 });
            await species.click();
            logger.info('Wildlife Species dropdown opened');

            const selectSpecie = await $(`//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`);
            await selectSpecie.waitForDisplayed({ timeout: 5000 });
            await selectSpecie.click();

            logger.info(`Selected Wildlife Species option: ${option}`);
        }
        catch (error) {
            logger.error(`Failed to select Wildlife Species option: ${option}`);
            logger.error(error.message);
            throw error;
        }
    }
    async clickOnproperty(value) {
        const property = await $('(//android.view.ViewGroup[@content-desc="Select"])[2]');
        await property.waitForDisplayed({ timeout: 5000 });

        const isDisplayed = await property.isDisplayed();
        if (!isDisplayed) {
            await this.swipeUp();
        }
        await property.click()

        const option = await $(`//android.view.ViewGroup[@content-desc="${value}"]`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }


    async clickTenants() {
        try {
            logger.info('Selecting tenant from Data Sources - Properties');

            const tenant = await $('(//android.widget.TextView[@text="Data Sources - Properties "]/following-sibling::android.view.ViewGroup[@content-desc="Select"])[2]');

            const isDisplayed = await tenant.isDisplayed();
            if (!isDisplayed) {
                await this.swipeUp();
            }

            await tenant.waitForDisplayed({ timeout: 5000 });
            await tenant.click();
            logger.info('Tenant dropdown opened');

            const option = await $('//android.view.ViewGroup[@content-desc="Aerosimple"]');
            await option.waitForDisplayed({ timeout: 10000 });
            await option.click();

            const done = await $('~Done');
            await done.waitForDisplayed({ timeout: 5000 });
            await done.click();

            logger.info('Tenant selection completed');
        }
        catch (error) {
            logger.error(error.message);
            throw error;
        }
    }


    async clickAssetRegistry() {

        const asset = await $('(//android.widget.TextView[@text="Data Sources - Properties "]/following-sibling::android.view.ViewGroup[@content-desc="Select"])[3]');
        const isDisplayed = await asset.isDisplayed();
        if (!isDisplayed) {
            logger.warn("tenant field not visible, performing swipe up");
            await this.swipeUp();
        }

        await asset.waitForDisplayed({ timeout: 5000 });
        await asset.click()

        const option = await $('//android.widget.TextView[@text="16ft Utility Trailer - (Source: Master)"]');
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await done.waitForDisplayed({ timeout: 10000 });
        await this.clickWhenVisible(done);
    }

    async clickNotams() {
        const notam = await $('(//android.widget.TextView[@text="Data Sources - Properties "]/following-sibling::android.view.ViewGroup[@content-desc="Select"])[4]');
        await notam.waitForDisplayed({ timeout: 5000 });
        await notam.click()

        const option = await $('(//android.view.ViewGroup[contains(@content-desc,"ID:")])[1]');
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);

    }
    async click_create() {
        const create = await $('~Create');
        await this.clickWhenVisible(create);
        await this.waitForLoaderToDisappear();
    }


    //--------------------------------------------------------------------------------------------------
    async inspection_add_workorder() {
        try {
            logger.info('Starting new inspection and add new workorder submission flow');

            await this.openCreateNewInspection('Create New Inspection');
            await this.waituntilLoaderToDisappear();
            await this.click_on_inspection('AIRPORT SAFETY SELF-INSPECTION CHECKLIST');
            await this.waituntilLoaderToDisappear();
            await this.click_on_shift('Day');
            await this.click_on_start_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await this.completeInspectionUnsatisfactory();
            await this.clickAllChecklists();
            await this.click_on_unsatisfactory('Communications/alarms');
            await this.click_on_add_workorder('Communications/alarms');
            await this.waituntilLoaderToDisappear();
            await this.select_priority('High');
            await this.click_and_select_location_on_map();
            await this.enter_description('Birds found near runway');
            await this.addAttachmentFromGallery();
            await this.name_field('Prasad');
            await this.number_field('4596');
            await this.click_on_checkbox();
            await this.click_on_selectDate('2026', '28');
            await this.click_on_selection('GHI');
            await this.select_system_user('Sateesh Admin');
            await this.select_time('03', '15');
            await this.click_on_mcg();
            await this.fill_mcg_name('Damodar');
            await this.fill_mcg_number('8956');
            await this.select_date('2026', '28');
            await this.click_and_select_mcg('20');
            await this.click_on_Save();
            await this.clickOnWildLifeType('Mammal');
            await this.clickOnWildlifespecies('Rabbit');
            await this.clickOnproperty('Property K');
            await this.clickTenants();            // issue 
            await this.clickAssetRegistry();
            await this.clickNotams();
            await this.click_create();
            await browser.pause(50000);

            /*await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            await this.selectDateByLabel('Start Date & Time', '2026', '27');
            await this.select_time_by_label("Start Date & Time", "9", "38", "AM");
            await this.selectDateByLabel('End Date & Time', '2026', '27');
            await this.select_time_by_label("End Date & Time", "10", "30", "AM");
            await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            //await this.verifyInspectionSubmittedMessage();*/



            logger.info('Inspection with add workorder submission flow completed successfully');
        } catch (err) {
            logger.error(`Failed in submitNewInspection: ${err.message}`);
            throw err;
        }
    }




}

export default new inspection_workorder()