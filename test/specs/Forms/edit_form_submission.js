import Search_Module from '../../pageobjects/module.page.js';
import edit_form_submission from '../../pageobjects/forms/edit.js';
import { logger } from '../../utils/executionLogger.js';

describe('Forms', function () {
    this.timeout(600000);

    it('Edit form submission', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule('Forms');

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting edit form submission');
            await edit_form_submission.edit_new_form_submission('Aerosimple Form');

            logger.info('Edit form submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});

