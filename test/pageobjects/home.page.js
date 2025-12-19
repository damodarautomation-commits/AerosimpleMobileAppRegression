class HomePage {
    get aeroLogo() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    get airportStaffLoginBtn() {
        return $('~Airport Staff - App Login');
    }

    async wait(ms = 1000) {
        await browser.pause(ms);
    }

    async performTouch(actions) {
        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions
            }
        ]);
        await browser.releaseActions();
    }

    async allow_notification() {
        const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');

        if (await allowBtn.isExisting()) {
            await allowBtn.click();
            console.log('Notification permission allowed');
        } else {
            console.log('Notification popup not shown, skipping');
        }
    }


    async longTapOnLogo() {
        const logo = await this.aeroLogo;
        await logo.waitForDisplayed({ timeout: 10000 });

        await this.wait(1000);

        await this.performTouch([
            { type: 'pointerMove', duration: 0, origin: logo },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 3000 },
            { type: 'pointerUp', button: 0 }
        ]);

        await this.wait(2000);
    }

    async selectEnvironment(envName) {
        const env = $(`android=new UiSelector().text("${envName}")`);
        await env.waitForDisplayed({ timeout: 5000 });
        await env.click();
        await this.wait(1000);
    }

    async tapDone() {
        await this.performTouch([
            { type: 'pointerMove', duration: 0, x: 950, y: 180 },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 500 },
            { type: 'pointerUp', button: 0 }
        ]);
        await this.wait(1500);
    }

    async clickAirportStaffLogin() {
        await this.airportStaffLoginBtn.waitForDisplayed({ timeout: 5000 });
        await this.airportStaffLoginBtn.click();
        await this.wait(2000);
    }
}

export default new HomePage();