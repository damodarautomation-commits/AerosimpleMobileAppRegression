import { logger } from './executionLogger.js';
import Locators from './selfHealing.js';
import { Done } from '../locators/noiselog.js';
class Utils {
    //Wait until element is visible
    async waitUntilDisplayed(locator, timeout = 7000) {
        try {
            const element = await $(locator);

            await element.waitForDisplayed({ timeout });

            logger.info(`Element visible: ${locator}`);
            return element;

        } catch (error) {
            logger.error(`waitUntilDisplayed failed for: ${locator}`);
            logger.error(error.message);
            throw error;
        }
    }


    // Wait for specific screen to load
    async waitForScreen(locator, timeout = 40000) {
        try {
            const element = await $(locator);
            await element.waitForDisplayed({ timeout });

            logger.info(`Screen loaded: ${locator}`);

        } catch (error) {
            logger.error(`waitForScreen failed: ${locator}`);
            logger.error(error.message);
            throw error;
        }
    }


    //Wait until clickable and click
    async waitAndClick(locator, timeout = 5000) {
        try {
            const element = await $(locator);

            await element.waitForClickable({ timeout });
            await element.click();

            logger.info(`Clicked on: ${locator}`);
            return element;

        } catch (error) {
            logger.error(`waitAndClick failed: ${locator}`);
            logger.error(error.message);
            throw error;
        }
    }

    // Wait and get text
    async waitAndGetText(locator, timeout = 5000) {
        try {
            const element = await $(locator);

            await element.waitForDisplayed({ timeout });
            const text = await element.getText();

            logger.info(`Text fetched from: ${locator} → ${text}`);
            return text;

        } catch (error) {
            logger.error(`waitAndGetText failed: ${locator}`);
            logger.error(error.message);
            throw error;
        }
    }

    // Swipe up until element becomes visible
    async swipeTillElement(locator, maxSwipes = 20) {
        try {
            let swipeCount = 0;

            while (swipeCount < maxSwipes) {

                const element = await $(locator);

                if (await element.isDisplayed()) {
                    logger.info(`Element found after ${swipeCount} swipes → ${locator}`);
                    return element;
                }

                await this.swipeUp();
                swipeCount++;

                logger.info(`Swipe attempt: ${swipeCount}`);
                await browser.pause(300);
            }

            throw new Error(`Element not visible after ${maxSwipes} swipes → ${locator}`);

        } catch (error) {
            logger.error(`swipeTillElement failed → ${locator}`);
            logger.error(error.message);
            throw error;
        }
    }

    /*async safeClick(locator, timeout = 10000) {
        try {
            const element = await $(locator);
            await element.waitForDisplayed({ timeout });
            await element.click();
            console.log("Safe click executed successfully.");
        } catch (error) {
            console.error("Error in safeClick:", error);
            throw error;
        }
    }*/

    async safeClick(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            await element.click();
            logger.info("Safe click executed successfully.");
        } catch (error) {
            logger.error("Error in safeClick:");
            throw error;
        }
    }


    // enter text to Input Field
    async enterInputText(locator, text, timeout = 10000) {
        try {
            const element = await $(locator);
            await element.waitForDisplayed({ timeout });
            await element.clearValue();
            await element.setValue(text);
            console.log(`Entered text: ${text}`);
            const isKeyboardShown = await driver.isKeyboardShown();
            if (isKeyboardShown) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.error(`Failed to enter text: ${text}`, error);
            throw error;
        }
    }

    async swipeUp() {
        const { width, height } = await driver.getWindowRect();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.75 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerMove', duration: 800, x: width / 2, y: height * 0.25 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.releaseActions();
    }


    async swipeDown() {
        const { width, height } = await driver.getWindowRect();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.25 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerMove', duration: 800, x: width / 2, y: height * 0.75 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.releaseActions();
    }

    async clickDropdownAndSelect(dropdownLocator, optionLocator) {
        try {
            const dropdown = await Locators.getFirstLocator(dropdownLocator, 10000);
            await dropdown.waitForDisplayed({ timeout: 5000 });
            await dropdown.click();
            logger.info('Dropdown clicked');

            const option = await Locators.getFirstLocator(optionLocator, 10000);
            await option.waitForDisplayed({ timeout: 5000 });
            await option.click();
            logger.info('Option selected');

            try {
                const doneBtn = await $(Done());
                if (await doneBtn.isDisplayed()) {
                    await doneBtn.click();
                    logger.info('Done button clicked');
                }
            } catch (e) {
                logger.info('Done button not present, continuing...');
            }

        } catch (error) {
            logger.error(`Dropdown selection failed: ${error.message}`);
            throw error;
        }
    }

    async tapByCoordinates(x, y) {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 120 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.releaseActions();
    }




}

export default new Utils();
