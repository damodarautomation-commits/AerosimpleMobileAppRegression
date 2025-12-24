class BasePage {

    async swipeUp() {
        const { width, height } = await driver.getWindowRect();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.75 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerMove', duration: 800, x: width / 2, y: height * 0.25 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.releaseActions();
    }

    async scrollIntoView(element, maxSwipes = 8) {
        for (let i = 0; i < maxSwipes; i++) {
            if (await element.isExisting() && await element.isDisplayed()) return;
            await this.swipeUp();
            await driver.pause(500);
        }
        throw new Error('Element not visible after scrolling');
    }

    async clickWhenVisible(element) {
        await this.scrollIntoView(element);
        await element.waitForEnabled({ timeout: 10000 });
        await element.click();
    }

    async setValueWhenVisible(element, value) {
        await this.scrollIntoView(element);
        await element.click();
        try { await driver.hideKeyboard(); } catch (e) { }
        await element.clearValue();
        await element.setValue(value);
        try { await driver.hideKeyboard(); } catch (e) { }
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

    async clickOkButton() {
        const ok = await $('//android.widget.Button[@text="OK"]');
        await this.clickWhenVisible(ok);
    }
}

export default BasePage;
