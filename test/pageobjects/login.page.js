class LoginPage {

    get emailInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get nextButton() {
        return $('~Next');
    }

    get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get loginWithPasswordBtn() {
        return $('android=new UiSelector().text("Login with Password")');
    }

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

    async waitForHomeToLoad(timeout = 120000) {
        const appsLabel = $('android=new UiSelector().text("Apps")');

        await browser.waitUntil(
            async () => await appsLabel.isDisplayed(),
            {
                timeout,
                interval: 500,
                timeoutMsg: '"Apps" did not appear on Home screen'
            }
        );

        console.log('Home page loaded: Apps is visible');
    }

    async login(email, password) {
        await this.waitForLoaderToDisappear();

        await this.emailInput.waitForDisplayed({ timeout: 120000 });
        await this.emailInput.click();
        await this.emailInput.clearValue();
        await this.emailInput.setValue(email);

        await this.nextButton.waitForDisplayed({ timeout: 120000 });
        await this.nextButton.click();

        await this.waitForLoaderToDisappear();

        await this.passwordInput.waitForDisplayed({ timeout: 120000 });
        await this.passwordInput.click();
        await this.passwordInput.clearValue();
        await this.passwordInput.setValue(password);

        try {
            await driver.hideKeyboard();
        } catch (e) { }

        await this.loginWithPasswordBtn.waitForDisplayed({ timeout: 150000 });
        await this.loginWithPasswordBtn.click();
        await this.waitForLoaderToDisappear();
        await this.waitForHomeToLoad();
    }
}

export default new LoginPage();
