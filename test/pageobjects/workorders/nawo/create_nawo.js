import { NAWO } from '../../../testdata/nawo.json';
import BasePage from '../../../fixtures/base-page.js';
import { logger } from '../../../utils/executionLogger.js';
import Locators from '../../../utils/selfHealing.js';
import Utils from '../../../utils/common.js';
import { submoduleoptions } from '../../../locators/nawo.js';

class createnewnawo extends BasePage {

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(
                submoduleoptions(option),
                10000
            );
            await Utils.safeClick(subModuleoption);
            logger.info(`Clicked on submodule: ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async submitnewnawo() {
        await this.clickOnSubModuleOptions(
            NAWO.SubModuleOptions[1]
        );
    }
}

export default new createnewnawo();
