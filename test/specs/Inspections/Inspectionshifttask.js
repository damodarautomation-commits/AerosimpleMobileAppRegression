import Search_Module from '../../pageobjects/module.page.js';
import InspectionShiftTask from '../../pageobjects/inspections/Inspectionshifttask.js'
import { logger } from '../../utils/executionLogger.js';


describe('Inspections', function () {
    this.timeout(800000);

    it('Verify Inspection ShiftTask Functionality', async function () {
        try {
            await Search_Module.click_on_module('Operations');
            logger.info('click on Operation Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();
            await Search_Module.openSubModule('Shift Tasks');
            logger.info('Click on Shift Tasks')

            await InspectionShiftTask.InspectionTask();

            logger.info('Inspection ShiftTask Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});