import Search_Module from '../../pageobjects/module.page.js';
import InspectionCustomFields from '../../pageobjects/inspections/inspectionwithcustomfields.js'
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('Verify Inspection with All Custom Fields Functionality', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await InspectionCustomFields.inspectioncustomfields();

            logger.info('Inspection with All Custom Fields Submission completed successfully');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});