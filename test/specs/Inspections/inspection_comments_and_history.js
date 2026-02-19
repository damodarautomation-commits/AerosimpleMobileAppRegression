import Search_Module from '../../pageobjects/module.page.js';
import inspection_comments_and_history from '../../pageobjects/inspections/comments_and_history.js';
import { logger } from '../../utils/executionLogger.js';

describe('Inspections', function () {
    this.timeout(800000);

    it('Verfiy Airport Safety Self-Inspection Inspection Comments, History & Print', async function () {
        try {
            await Search_Module.click_on_module('Inspections');
            logger.info('click on Inspection Module')

            logger.info('Waiting for loader to disappear');
            await Search_Module.waitForLoaderToDisappear();

            await inspection_comments_and_history.comments_and_history()

            logger.info('enter comments and view history verified successfully ');
        } catch (err) {
            logger.error(`Test failed: ${err.stack || err.message}`);
            throw err;
        }
    });
});