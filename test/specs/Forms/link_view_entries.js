import Search_Module from '../../pageobjects/module.page.js';
import link_and_view from '../../pageobjects/forms/link_and_view_entries.js';
import { logger } from '../../utils/executionLogger.js';

describe('Forms', function () {
    this.timeout(600000);

    it('Link, Unlink, and View Linked Entries in Forms', async function () {
        try {
            logger.info('Opening Forms module');
            await Search_Module.openModule('Forms');

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            logger.info('Starting edit form submission');
            await link_and_view.link_and_view_entries('Aerosimple Form');

            logger.info('form entries linked and view submitted successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});

