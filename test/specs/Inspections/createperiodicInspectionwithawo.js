import Search_Module from '../../pageobjects/module.page.js';
import periodicwithawo from '../../pageobjects/inspections/createperiodicwithawo.js'
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Submit Periodic Condition Inspection with Connected Airfield Work Order', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();
            await periodicwithawo.createPeriodicwithawo();

            logger.info('Periodic Condition Inspection with connected airfield workorder Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});