import Search_Module from '../../pageobjects/module.page.js';
import SubmitNoiseLog from '../../pageobjects/NoiseLog/createnoise.js';
import { logger } from '../../utils/executionLogger.js';
import { NoiseLog } from '../../testdata/noiselog.json';

describe('Noise Log', function () {
    this.timeout(800000);

    it('Create Noise Log  Submission', async function () {
        try {
            logger.info('Opening Noise Log module');
            await Search_Module.openModule(NoiseLog.ModuleName);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await SubmitNoiseLog.createNewNoiseLog();
            logger.info('New Noise Log submission completed successfully ');

        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});