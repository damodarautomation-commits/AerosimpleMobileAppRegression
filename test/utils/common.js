import { logger } from './executionLogger.js';
import Locators from './selfHealing.js';
import { Done } from '../locators/noiselog.js';

class Utils {

    async waitUntilDisplayed(locator, timeout = 7000) {
        const element = await $(locator);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async waitForScreen(locator, timeout = 40000) {
        const element = await $(locator);
        await element.waitForDisplayed({ timeout });
    }

    async safeClick(element, timeout = 10000) {
        await element.waitForExist({ timeout });
        await element.waitForDisplayed({ timeout });
        await element.waitForEnabled({ timeout });
        await element.click();
    }

    async waitForElementAndClick(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            await element.waitForEnabled({ timeout });
            await element.click();
        } catch (error) {
            console.error(`waitForElementAndClick failed: ${error.message}`);
            throw error;
        }
    }

    async enterInputText(locator, text, timeout = 10000) {
        const element = await $(locator);
        await element.waitForDisplayed({ timeout });
        await element.clearValue();
        await element.setValue(text);

        const isKeyboardShown = await driver.isKeyboardShown();
        if (isKeyboardShown) {
            await driver.hideKeyboard();
        }
    }

    async swipeHorizontalInField(containerLocator, direction = 'left', duration = 500) {

        const container = await Locators.getFirstLocator(containerLocator, 10000);
        const rect = await driver.getElementRect(container.elementId);

        const startX = direction === 'left'
            ? rect.x + rect.width * 0.85
            : rect.x + rect.width * 0.15;

        const endX = direction === 'left'
            ? rect.x + rect.width * 0.15
            : rect.x + rect.width * 0.85;

        const y = rect.y + rect.height / 2;

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: Math.floor(startX), y: Math.floor(y) },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerMove', duration: duration, x: Math.floor(endX), y: Math.floor(y) },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.releaseActions();
    }

    async swipeHorizontalTillElement(elementLocator, containerLocator, direction = 'left', maxSwipes = 5) {

        for (let i = 0; i < maxSwipes; i++) {

            const elements = await $$(elementLocator);

            if (elements.length > 0 && await elements[0].isDisplayed()) {
                return elements[0];
            }

            await this.swipeHorizontalInField(containerLocator, direction);
        }

        throw new Error("Element not found after swiping horizontally");
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






}

export default new Utils();