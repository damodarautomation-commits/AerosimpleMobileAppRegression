import Search_Module from '../../../pageobjects/module.page.js';
import CreateAirfield from '../../../pageobjects/workorders/awo/create_awo.js';

describe('Airfield Work Orders', function () {
    this.timeout(300000);

    it('Create New Airfield Work Order', async function () {
        await Search_Module.openModule('Work Orders');
        await Search_Module.waitForLoaderToDisappear();

        await Search_Module.openSubModule('Airfield Work Orders');
        await CreateAirfield.createWorkOrder();
    });
});
