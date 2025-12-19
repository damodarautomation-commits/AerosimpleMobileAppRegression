import Search_Module from '../../../pageobjects/module.page.js';
import CreateAirfield from '../../../pageobjects/workorders/awo/create_awo.js';

describe('Create Airfield Work Order', () => {
    it('Create New Airfield Work Order', async () => {
        const module = new Search_Module();

        await module.waitForLoaderToDisappear();
        await module.openModule('Work Orders');
        await module.openSubModule('Airfield Work Orders');
        await CreateAirfield.createWorkOrder('High', 'Wildlife Hazards', 'Dead birds', 'Birds found near runway', 'Cleaned runway area and removed dead birds');
    });
});