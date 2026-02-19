import Search_Module from '../../pageobjects/module.page.js';
import periodicwithnawo from '../../pageobjects/inspections/createperiodicwithnawo.js'
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('Submit Periodic Condition Inspection with connected non airfield workorder ', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();
            await periodicwithnawo.createPeriodicwithnawo();

            logger.info('Periodic Condition Inspection with connected non airfield workorder Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});