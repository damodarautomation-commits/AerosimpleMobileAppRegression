import Search_Module from '../../pageobjects/module.page.js';
import SubmitInspection from '../../pageobjects/inspections/create.js';
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('Create New Airport Safety Self-Inspection with comment,attachment and location', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await SubmitInspection.submitNewInspection()

            logger.info('New Inspection submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});