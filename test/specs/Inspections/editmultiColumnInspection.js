import Search_Module from '../../pageobjects/module.page.js';
import MultiColumnEditInspection from '../../pageobjects/inspections/editmulticolumn.js';
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Edit Multi column inspection Submission', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await MultiColumnEditInspection.editMultiColumnEditInspection();

            logger.info('Edit Multi column Inspection submission verified successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});