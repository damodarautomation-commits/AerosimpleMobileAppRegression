import Search_Module from '../../pageobjects/module.page.js';
import comments_submission from '../../pageobjects/forms/comments.js';
import { logger } from '../../utils/executionLogger.js';

describe('Forms', function () {
    this.timeout(600000);

    it('Add and submit comments in Forms', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule('Forms');

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting edit form submission');
            await comments_submission.comments_on_form('Aerosimple Form');

            logger.info('form comments submitted successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});

