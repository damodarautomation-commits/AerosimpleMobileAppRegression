import Search_Module from '../../pageobjects/module.page.js';
import save_as_draft from '../../pageobjects/forms/save_as_draft.js';
import { logger } from '../../utils/executionLogger.js';


describe('Forms', function () {
    this.timeout(1000000);

    it('Save New Form as Draft, Submit the Draft, and Discard the Draft', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule('Forms');

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new form submission');
            await save_as_draft.save_as_draft_form_submission('Aerosimple Form');

            logger.info('Save New Form as Draft, Complete the Draft, and Discard the Draft Form submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});