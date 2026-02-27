import Search_Module from '../../pageobjects/module.page.js';
import safetyHazard from '../../pageobjects/SMS/createhazard.js';
import { SMS } from '../../testdata/sms.json'

describe('Safety Management System (SMS)', function () {
    this.timeout(300000);

    it('Create New Safety Hazard as Anonymous User', async function () {

        await Search_Module.openModule(SMS.Module);
        await Search_Module.waitForLoaderToDisappear();

        let subModuleElement = await $(`//android.view.ViewGroup[contains(@content-desc,"${SMS.SubModule[2]}")]`);

        if (!(await subModuleElement.isDisplayed())) {

            console.log("SubModule not displayed. Reopening module...");
            await safetyHazard.clickOnApps();
            await Search_Module.openModule(SMS.Module);
            await Search_Module.waitForLoaderToDisappear();
        }

        await Search_Module.openSubModule(SMS.SubModule[2]);
        await safetyHazard.createnewsubhazard();
    });
});