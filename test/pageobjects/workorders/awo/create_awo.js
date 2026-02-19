import BasePage from '../../../fixtures/base-page.js';

class CreateAirfield extends BasePage {

    /* ---------------- LOCATORS ---------------- */
    get priorityField() { return $('~Please select the Priority'); }
    get categoryDropdown() { return $('~Please select the Category'); }
    get subCategoryDropdown() { return $('~Please select the Sub-Category'); }
    get wildlifeTypeField() {
        return $('//android.widget.TextView[@text="Wildlife Type"]/following-sibling::android.view.ViewGroup');
    }

    wildlifeTypeOption(value) {
        return $(`//android.widget.TextView[@text="${value}"]`);
    }

    get wildlifeSpeciesField() {
        return $('//android.widget.TextView[@text="Wildlife Species"]/following-sibling::android.view.ViewGroup');
    }

    wildlifeSpeciesOption(value) {
        return $(`//android.widget.TextView[@text="${value}"]`);
    }

    priorityOption(value) {
        return $(`//android.widget.TextView[@text="${value}"]`);
    }

    categoryOption(name) {
        return $(`~${name}`);
    }

    /* ---------------- BASIC ACTIONS ---------------- */
    async openWorkOrder() {
        await this.waitForLoaderToDisappear();
        const createBtn = await $('~Create Work Order');
        await this.clickWhenVisible(createBtn);
        await this.waitForLoaderToDisappear();
    }

    async selectPriority(value) {
        await this.clickWhenVisible(this.priorityField);
        const option = await this.priorityOption(value);
        await this.clickWhenVisible(option);
        await this.waitForLoaderToDisappear();
    }

    async click_on_category(category) {
        await this.clickWhenVisible(this.categoryDropdown);
        const option = await this.categoryOption(category);
        await this.clickWhenVisible(option);
        await this.waitForLoaderToDisappear();
    }

    async click_on_sub_category(subCategory) {
        await this.clickWhenVisible(this.subCategoryDropdown);
        const option = await this.categoryOption(subCategory);
        await this.clickWhenVisible(option);
        await this.waitForLoaderToDisappear();
    }

    async fill_description(text) {
        const field = await $('//android.widget.TextView[contains(@text,"Problem Description")]/following-sibling::android.widget.EditText');
        await this.setValueWhenVisible(field, text);
    }

    async name_field(text) {
        const input = await $('//android.widget.TextView[@text="Name "]/following-sibling::android.widget.EditText');
        await this.setValueWhenVisible(input, text);
    }

    async number_field(value) {
        const input = await $('//android.widget.TextView[@text="Number "]/following-sibling::android.widget.EditText');
        await this.setValueWhenVisible(input, value);
    }

    async click_on_checkbox() {
        const checkbox = await $('//android.widget.TextView[@text="Checkbox "]/preceding-sibling::android.view.ViewGroup');
        await this.clickWhenVisible(checkbox);
    }


    async click_on_location_pointer() {
        const clickMap = await $('android=new UiSelector().textContains("Click on the Map")');
        await this.clickWhenVisible(clickMap);

        const pointer = await $('//android.widget.TextView[@text=""]/parent::*');
        await pointer.waitForDisplayed({ timeout: 10000 });
        await pointer.click();
    }

    async click_done() {
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }


    async select_date_by_label(label, day, month, year) {
        const field = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup`);
        await this.clickWhenVisible(field);

        const dateDesc = `${day} ${month} ${year}`;
        const date = await $(`//android.view.View[@content-desc="${dateDesc}"]`);
        await date.waitForDisplayed({ timeout: 10000 });
        await date.click();

        await this.clickOkButton();
    }

    async select_time(hour, minute) {
        const field = await $('//android.widget.TextView[@text="Time "]/following-sibling::android.view.ViewGroup');
        await this.clickWhenVisible(field);

        await (await $('//android.widget.NumberPicker[1]//android.widget.EditText')).setValue(hour);
        await (await $('//android.widget.NumberPicker[2]//android.widget.EditText')).setValue(minute);

        await this.clickOkButton();
    }


    async selection_field(value) {
        const field = await $('//android.widget.TextView[@text="Selection "]/following-sibling::android.view.ViewGroup');
        await this.clickWhenVisible(field);

        const option = await $(`~${value}`);
        await this.clickWhenVisible(option);
    }

    async select_system_user(user) {
        const field = await $('//android.widget.TextView[@text="System User "]/following-sibling::android.view.ViewGroup');
        await this.clickWhenVisible(field);

        const option = await $(`~${user}`);
        await this.clickWhenVisible(option);
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }

    async click_on_mc_grid() {
        const grid = await $('//android.view.ViewGroup[contains(@content-desc,"Multi Column Grid")]');
        const mcName = await $('//android.widget.TextView[@text="MC Name "]/following-sibling::android.widget.EditText');
        if (await mcName.isDisplayed().catch(() => false)) {
            return;
        }
        await this.scrollIntoView(grid);
        await grid.waitForEnabled({ timeout: 10000 });
        await grid.click();
        await mcName.waitForDisplayed({ timeout: 10000 });
    }




    async fill_mc_name(text) {
        const input = await $('//android.widget.TextView[@text="MC Name "]/following-sibling::android.widget.EditText');
        await this.setValueWhenVisible(input, text);
    }

    async fill_mc_number(text) {
        const input = await $('//android.widget.TextView[@text="MC Number "]/following-sibling::android.widget.EditText');
        await this.setValueWhenVisible(input, text);
    }

    async select_mc_date(day, month, year) {
        await this.select_date_by_label("MC Date Time ", day, month, year);
    }

    async select_mc_selection(value) {
        const field = await $('//android.widget.TextView[@text="MC Selection "]/following-sibling::android.view.ViewGroup');
        await this.clickWhenVisible(field);

        const option = await $(`~${value}`);
        await this.clickWhenVisible(option);
    }


    async click_mc_save() {
        const save = await $('//android.widget.Button[@content-desc="Save"]');
        await this.clickWhenVisible(save);
        await this.waitForLoaderToDisappear();
    }


    async selectWildlifeType(value) {
        await this.clickWhenVisible(this.wildlifeTypeField);
        const option = await this.wildlifeTypeOption(value);
        await this.clickWhenVisible(option);

    }

    async selectWildlifeSpecies(value) {
        await this.clickWhenVisible(this.wildlifeSpeciesField);
        const option = await this.wildlifeSpeciesOption(value);
        await this.clickWhenVisible(option);
    }


    async selectProperty(value) {
        const selectBtn = await $('//android.widget.TextView[@text="Data Sources - Properties "]/following-sibling::android.view.ViewGroup[@content-desc="Select"]');
        await this.clickWhenVisible(selectBtn);

        const option = await $(`//android.view.ViewGroup[@content-desc="${value}"]`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }

    async selectTenant(value) {
        const selectBtn = await $('//android.widget.TextView[@text="Data Sources - Tenants "]/following-sibling::android.view.ViewGroup[@content-desc="Select"]');
        await this.clickWhenVisible(selectBtn);

        const option = await $(`//android.view.ViewGroup[@content-desc="${value}"]`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }

    async selectAssetRegistry(value) {
        const selectBtn = await $('//android.widget.TextView[@text="Data Sources - Asset Registry "]/following-sibling::android.view.ViewGroup[@content-desc="Select"]');
        await this.clickWhenVisible(selectBtn);

        const option = await $(`//android.view.ViewGroup[@content-desc="${value}"]`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }

    async selectNotam(index = 0) {
        const selectBtn = await $('//android.widget.TextView[@text="Data Sources - NOTAMS "]/following-sibling::android.view.ViewGroup[@content-desc="Select"]');
        await this.clickWhenVisible(selectBtn);
        const options = await $$('//android.view.ViewGroup[.//android.widget.TextView]'); // adjust XPath to match all items

        if (options.length === 0) {
            throw new Error('No NOTAM options found');
        }

        const option = options[index];
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
        const done = await $('~Done');
        await this.clickWhenVisible(done);
    }



    async click_create() {
        const create = await $('~Create');
        await this.clickWhenVisible(create);
        await this.waitForLoaderToDisappear();
    }

    async createWorkOrder() {
        await this.openWorkOrder();
        await this.selectPriority('High');
        await this.click_on_category('Wildlife Hazards');
        await this.click_on_sub_category('Dead birds');

        await this.click_on_location_pointer();
        await this.click_done();

        await this.fill_description('Birds found near runway');
        await this.name_field('Damodar');
        await this.number_field('1234');
        await this.click_on_checkbox();

        await this.select_date_by_label("Date Time ", "30", "January", "2025");
        await this.select_time('04', '06');

        await this.selection_field('GHI');
        await this.select_system_user('Damodar Uno');

        await this.click_on_mc_grid();
        await this.fill_mc_name('Prasad');
        await this.fill_mc_number('4523');
        await this.select_mc_date('26', 'December', '2025');
        await this.select_mc_selection('20');
        await this.click_mc_save();
        await this.selectWildlifeType('Mammal');
        await this.selectWildlifeSpecies('Rabbit');
        await this.selectProperty('Property K');
        await this.selectTenant('Aerosimple');
        await this.selectAssetRegistry('Aerosimple L1');
        await this.selectNotam('0');
        await this.click_create();
    }
}

export default new CreateAirfield();
