import Search_Module from '../../pageobjects/module.page.js';
import safetyHazard_stagecompletion from '../../pageobjects/SMS/stagecompletion.js';
import Utils from '../../utils/common.js';
import { SMS } from '../../testdata/sms.json';

describe('Safety Management System (SMS)', function () {
    this.timeout(300000);

    it('Verify submission of all stages for a new safety hazard.', async function () {

        await Search_Module.openModule(SMS.Module);
        await Search_Module.waitForLoaderToDisappear();

        const subModuleLocator = `//android.view.ViewGroup[contains(@content-desc,"${SMS.SubModule[2]}")]`;

        await driver.waitUntil(
            async () => {
                const el = await $(subModuleLocator);

                if (await el.isExisting() && await el.isDisplayed()) {
                    return true;
                }

                console.log("SubModule not visible. Reopening module...");

                await safetyHazard_stagecompletion.clickOnApps();
                await Search_Module.openModule(SMS.Module);
                await Search_Module.waitForLoaderToDisappear();

                return false;
            },
            {
                timeout: 40000,
                interval: 3000,
                timeoutMsg: `SubModule ${SMS.SubModule[2]} not visible after retries`
            }
        );
        await Search_Module.openSubModule(SMS.SubModule[2]);
        await safetyHazard_stagecompletion.stagecompletion();
    });
});