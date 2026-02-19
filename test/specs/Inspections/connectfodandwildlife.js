import Search_Module from '../../pageobjects/module.page.js';
import InspectionConnectwildlifefodlog from '../../pageobjects/inspections/connectwildlifefod.js';
import { InspectionFODandWildlife } from '../../testdata/inspections.json';
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Submit Periodic Condition Inspection with Connected FOD Log and WildLife Log', async function () {
        try {
            await Search_Module.click_on_module(InspectionFODandWildlife.ModuleName);
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();
            await InspectionConnectwildlifefodlog.connectwildlifeandfodlog();

            logger.info('Periodic Condition Inspection with Connected FOD Log and WildLife Log Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});