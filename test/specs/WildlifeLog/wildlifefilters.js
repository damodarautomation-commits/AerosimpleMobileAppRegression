import Search_Module from '../../pageobjects/module.page.js';
import wildLifeFilters from '../../pageobjects/WildlifeLog/filters.js';
import { logger } from '../../utils/executionLogger.js';
import { wildLife } from '../../testdata/wildlifelog.json';

describe('WildLife', function () {
    this.timeout(800000);

    it('Verify Wildlife Log Filters', async function () {
        try {
            logger.info('Opening WildLife module');
            await Search_Module.openModule(wildLife.ModuleName);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new WildLife submission');
            await wildLifeFilters.wildLifeFiltersSubmission(wildLife.wildLifeSubModules[1]);

            logger.info('Edit WildLife submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});