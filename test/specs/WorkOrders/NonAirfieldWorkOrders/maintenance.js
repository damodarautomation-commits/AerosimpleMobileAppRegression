import Search_Module from '../../../pageobjects/module.page.js';
import EditNAWO from '../../../pageobjects/workorders/nawo/edit_nawo.js';
import { NAWO } from '../../../testdata/nawo.json';

describe('Non-Airfield Work Orders', function () {
    this.timeout(300000);

    before(function () {
        global.userRole = 'maintenanceUser';
    });

    after(function () {
        global.userRole = undefined;
    });

    it('Verify Maintenance Review Completion for Non-Airfield Work Order', async function () {
        await Search_Module.openModule(NAWO.Module);
        await Search_Module.waitForLoaderToDisappear();

        await Search_Module.openSubModule(NAWO.SubModule);
        await EditNAWO.editNonAirfieldWorkOrder();
    });
});