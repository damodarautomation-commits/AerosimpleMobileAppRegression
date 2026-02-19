import { logger } from '../utils/executionLogger.js';
class Locators {
    async getFirstLocator(locatorList, timeout = 50000) {
        try {
            if (typeof locatorList === 'string') {
                locatorList = [locatorList];
            }

            if (!Array.isArray(locatorList)) {
                throw new Error(`Invalid locator type: ${typeof locatorList}`);
            }

            for (const locator of locatorList) {
                try {

                    const el = await $(locator);
                    await el.waitForExist({ timeout });

                    logger.info(`Self-healing locator worked: ${locator}`);
                    return el;

                } catch (e) {
                    logger.warn(`Locator failed: ${locator} | Reason: ${e.message}`);
                }
            }

            logger.error('All locators failed');
            throw new Error(`All locators failed → ${locatorList.join(' | ')}`);

        } catch (error) {
            logger.error(`Error in getFirstLocator: ${error.message}`);
            throw error;
        }
    }

}
export default new Locators();

