import Search_Module from '../../pageobjects/module.page.js';
import EditFODlog from '../../pageobjects/fodlog/editfodlog.js';
import { logger } from '../../utils/executionLogger.js';
import { FODLog } from '../../testdata/fod.json';

describe('FOD Log', function () {
    this.timeout(800000);

    it('Edit FOD Log Submission', async function () {
        try {
            logger.info('Opening FOD Log module');
            await Search_Module.openModule(FODLog.Module);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new FOD Log submission');
            await EditFODlog.EditFODLogSubmission();

            logger.info('Edit FOD Log Submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});