import Search_Module from '../../../pageobjects/module.page.js';
import createnewnawo from '../../../pageobjects/workorders/nawo/create_nawo.js';
import { NAWO } from '../../../testdata/nawo.json';

describe('Non-Airfield Work Orders', function () {
    this.timeout(300000);

    it('Create Non-Airfield Work Orders', async function () {
        await Search_Module.openModule(NAWO.Module);
        await Search_Module.waitForLoaderToDisappear();

        await Search_Module.openSubModule(NAWO.SubModule);
        await createnewnawo.submitnewnawo();
    });
});