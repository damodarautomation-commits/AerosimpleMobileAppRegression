import Search_Module from '../../pageobjects/module.page.js';
import ToleranceInspection from '../../pageobjects/inspections/tolerance.js';
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('New Tolarance Inspection Submission', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await ToleranceInspection.toleranceInspectionSubmission();

            logger.info('New Tolarance Inspection Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});