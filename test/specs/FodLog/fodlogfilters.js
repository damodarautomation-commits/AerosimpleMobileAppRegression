import Search_Module from '../../pageobjects/module.page.js';
import FODLogFilters from '../../pageobjects/fodlog/fodlogfilters.js';
import { logger } from '../../utils/executionLogger.js';
import { FODLog } from '../../testdata/fod.json';

describe('FOD Log', function () {

    this.timeout(800000);

    it('Verify FOD Log Filters', async function () {
        try {
            logger.info('Opening FOD Log module');

            await Search_Module.openModule(FODLog.Module);

            await Search_Module.waitForLoaderToDisappear();

            logger.info('Executing FOD Filters submission');

            await FODLogFilters.FODFiltersSubmission();

            logger.info('FOD Log Filters Test Completed Successfully');

        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });

});
