class CreateAirfield {
    get searchBar() {
        return $('android=new UiSelector().resourceId("search-bar")');
    }

    get priorityField() {
        return $('~Please select the Priority');
    }

    get categoryDropdown() {
        return $('~Please select the Category');
    }

    get subCategoryDropdown() {
        return $('~Please select the Sub-Category');
    }

    priorityOption(value) {
        return $(`//android.widget.TextView[@text="${value}"]`);
    }

    categoryOption(name) {
        return $(`~${name}`);
    }

    async waitForLoaderToDisappear() {
        await browser.waitUntil(async () => {
            const loaders = await $$('android.widget.ProgressBar');
            return loaders.length === 0;
        }, {
            timeout: 30000,
            interval: 500
        }).catch(() => { });
    }

    async swipeUp() {
        const { width, height } = await driver.getWindowSize();
        await driver.execute('mobile: swipeGesture', {
            left: Math.floor(width * 0.1),
            top: Math.floor(height * 0.7),
            width: Math.floor(width * 0.8),
            height: Math.floor(height * 0.2),
            direction: 'up',
            percent: 0.8
        });
    }

    async scrollUntilVisible(element, maxSwipes = 8) {
        for (let i = 0; i < maxSwipes; i++) {
            if (await element.isExisting() && await element.isDisplayed()) {
                return true;
            }
            await this.swipeUp();
            await driver.pause(800);
        }
        throw new Error('Element not visible after scrolling');
    }

    async safeClick(element) {
        if (!(await element.isExisting()) || !(await element.isDisplayed())) {
            await this.scrollUntilVisible(element);
        }
        await element.click();
    }

    async openWorkOrder(type) {
        await this.waitForLoaderToDisappear();
        const mapping = { view: 'View Airfield Work Orders', create: 'Create Work Order' };
        const button = await $(`~${mapping[type.toLowerCase()]}`);
        await this.safeClick(button);
    }

    async selectPriority(value) {
        await this.safeClick(this.priorityField);
        const option = await this.priorityOption(value);
        await this.safeClick(option);
    }

    async click_on_category(categoryName) {
        await this.safeClick(this.categoryDropdown);
        await driver.pause(1000);
        const category = await this.categoryOption(categoryName);
        await this.safeClick(category);
    }

    async fill_description(text) {
        const field = await $('android=new UiSelector().className("android.widget.EditText")');
        await this.scrollUntilVisible(field);
        await field.clearValue();
        await field.setValue(text);
    }

    async click_on_sub_category(subCategoryName) {
        const field = await $('~Please select the Sub-Category');
        await this.scrollUntilVisible(field);
        await this.safeClick(field);
        await driver.pause(1000);
        const subCategory = await this.categoryOption(subCategoryName);
        await this.safeClick(subCategory);
    }

    async click_on_location_pointer() {
        const field = await $('android=new UiSelector().text("* Location")');
        await this.scrollUntilVisible(field);

        const pointer = await $('~');
        if (await pointer.isDisplayed()) {
            await pointer.click();
            await pointer.catch();
        }

        const { width, height } = await driver.getWindowRect();
        const tapX = Math.floor(width / 2);
        const tapY = Math.floor(height / 2);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: tapX, y: tapY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.releaseActions();
    }

    async click_on_Done() {
        const done = await $('~Done');
        await this.safeClick(done);
    }

    async click_on_Create() {
        const create = await $('~Create');
        await this.safeClick(create);
    }

    async fill_work_done_description(text) {
        const field = await $('android=new UiSelector().text("Enter description here")');
        await this.safeClick(field);
        await field.setValue(text);
    }

    async click_on_Save() {
        const save = await $('~Save');
        await this.safeClick(save);
    }

    async createWorkOrder(priority, category, subCategory, description, workDone) {
        await this.openWorkOrder('create');
        await this.waitForLoaderToDisappear();

        await this.selectPriority(priority);
        await this.click_on_category(category);
        await this.click_on_sub_category(subCategory);
        await this.fill_description(description);
        await this.click_on_location_pointer();
        await this.click_on_Done();
        await this.click_on_Create();
        await this.waitForLoaderToDisappear();
        await this.fill_work_done_description(workDone);
        await this.click_on_Save();
    }
}

export default new CreateAirfield();
