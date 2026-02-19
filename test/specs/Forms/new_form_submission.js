import Search_Module from '../../pageobjects/module.page.js';
import New_Form_Submission from '../../pageobjects/forms/create.js';
import { logger } from '../../utils/executionLogger.js';
import { Forms } from '../../testdata/forms.json';


describe('Forms', function () {
    this.timeout(800000);

    it('New form submission', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule(Forms.ModuleName);

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting new form submission');
            await New_Form_Submission.form_submission(Forms.FormNames[0]);

            logger.info('Form submission completed successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});