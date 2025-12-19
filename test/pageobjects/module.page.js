class Search_Module {


    async waitForLoaderToDisappear() {
        const loader = $('android.widget.ProgressBar');
        if (await loader.isExisting()) {
            await loader.waitForDisplayed({
                reverse: true,
                timeout: 30000
            }).catch(() => { });
        }
    }


    async openModule(moduleName) {
        await this.waitForLoaderToDisappear();


        const searchBar = $('android=new UiSelector().resourceId("search-bar")');
        await searchBar.waitForDisplayed({ timeout: 20000 });
        await searchBar.click();
        await searchBar.clearValue();
        await searchBar.setValue(moduleName);


        try { await driver.hideKeyboard(); } catch (e) { }


        await this.waitForLoaderToDisappear();


        const module = await $(`~${moduleName}`);
        await module.waitForDisplayed({ timeout: 20000 });
        await module.click();
    }


    async openSubModule(subModuleName) {
        await this.waitForLoaderToDisappear();


        const subModule = await $(`~${subModuleName}`);
        await subModule.waitForDisplayed({ timeout: 20000 });
        await subModule.click();
    }
}


export default Search_Module;


