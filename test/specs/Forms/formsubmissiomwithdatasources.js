import Search_Module from '../../pageobjects/module.page.js';
import McgAndDataSources from '../../pageobjects/forms/mcganddatasource.js';
import { logger } from '../../utils/executionLogger.js';
import { Forms } from '../../testdata/forms.json';

describe('Forms', function () {
    this.timeout(800000);

    it('New form submission with all data sources and multi column grid', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule(Forms.ModuleName);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new form submission');
            await McgAndDataSources.submitFormWithDataSources(Forms.FormNames[1]);

            logger.info('Form submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});