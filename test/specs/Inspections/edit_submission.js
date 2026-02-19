import Search_Module from '../../pageobjects/module.page.js';
import EditInspection from '../../pageobjects/inspections/edit.js';
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Edit Airport Safety Self-Inspection', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await EditInspection.edit_inspection_submission()

            logger.info('New edit Inspection submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});