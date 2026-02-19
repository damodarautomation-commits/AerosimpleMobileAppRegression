import Search_Module from '../../pageobjects/module.page.js';
import InspectionSaveasDraft from '../../pageobjects/inspections/saveasdraft.js';
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('Inspection Save Draft & Discard', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await InspectionSaveasDraft.InspectionDraft()

            logger.info('New Inspection Save as Draft submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});