import Search_Module from '../../pageobjects/module.page.js';
import SubmitWildLifeLogWithActivity from '../../pageobjects/WildlifeLog/createwithactivity.js';
import { logger } from '../../utils/executionLogger.js';
import { wildLife } from '../../testdata/wildlifelog.json';

describe('WildLife', function () {
    this.timeout(800000);

    it('Create Wildlife Log with Activity Submission', async function () {
        try {
            logger.info('Opening WildLife module');
            await Search_Module.openModule(wildLife.ModuleName);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new WildLife submission');
            await SubmitWildLifeLogWithActivity.createWildLifeLogWithActivity(wildLife.wildLifeSubModules[1]);

            logger.info('WildLife with Activity submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});