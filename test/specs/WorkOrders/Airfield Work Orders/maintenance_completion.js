import Search_Module from '../../../pageobjects/module.page.js';
import Maintenance from '../../../pageobjects/workorders/awo/maintenance.js';

describe('Airfield Work Orders', function () {
    this.timeout(300000);

    it('Complete Maintenance Review Work Order', async function () {

        await Search_Module.openModule('Work Orders');
        await Search_Module.waitForLoaderToDisappear();

        await Search_Module.openSubModule('Airfield Work Orders');
        await Maintenance.completeMaintenanceReview();

    });
});
