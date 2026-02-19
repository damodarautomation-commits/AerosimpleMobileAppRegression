import Search_Module from '../../pageobjects/module.page.js';
import inspection_workorder from '../../pageobjects/inspections/inspection_with_workorder.js';
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Verify Airport Safety Self-Inspection with Work Order Creation', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await inspection_workorder.inspection_add_workorder()

            logger.info('inspection with workorder creation verified successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});