import BasePage from '../fixtures/base-page.js';
class Search_Module extends BasePage {

    async waitForLoaderToDisappear(timeout = 120000) {
        await browser.waitUntil(
            async () => {
                const loaders = await $$('android.widget.ProgressBar');
                if (loaders.length === 0) {
                    return true;
                }
                for (const loader of loaders) {
                    if (await loader.isDisplayed()) {
                        return false;
                    }
                }

                return true;
            },
            {
                timeout,
                interval: 500,
                timeoutMsg: 'Loader still visible after waiting'
            }
        ).catch(() => { });
    }


    async openModule(moduleName) {

        await this.waitForLoaderToDisappear();
        const searchBar = $('android=new UiSelector().resourceId("search-bar")');
        await searchBar.waitForDisplayed({ timeout: 120000 });
        await searchBar.click();
        await searchBar.clearValue();
        await searchBar.setValue(moduleName);
        try {
            await driver.hideKeyboard();
        } catch (e) { }
        await this.waitForLoaderToDisappear();
        const module = await $(`~${moduleName}`);
        await module.waitForDisplayed({ timeout: 120000 });
        await module.click();
        await this.waitForLoaderToDisappear();
    }

    async openSubModule(subModuleName) {
        await this.waitForLoaderToDisappear();
        const subModule = await $(`~${subModuleName}`);
        await subModule.waitForDisplayed({ timeout: 120000 });
        await subModule.click();
        await this.waitForLoaderToDisappear();
    }

    async click_on_module(module_name) {
        const module = await $(`//android.widget.TextView[@text="${module_name}"]`)
        await this.swipe_till_element(module);
        await module.click();
    }
}

export default new Search_Module();
