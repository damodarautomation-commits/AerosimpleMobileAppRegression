// test/fixtures/aerosimple.setup.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
const loginData = require('../testdata/login.json');

export const mochaHooks = {
    async beforeEach() {
        const appsLabel = $('android=new UiSelector().text("Apps")');
        try {
            await appsLabel.waitForDisplayed({ timeout: 5000 });
            console.log('Apps page already loaded, skipping environment switch and login');
            return;
        } catch (e) {
            console.log('Apps page not visible, performing environment and login app ');
        }

        await HomePage.longTapOnLogo();
        await HomePage.selectEnvironment('staging');
        await HomePage.tapDone();

        await HomePage.clickAirportStaffLogin();
        await LoginPage.login(loginData.Login.Email, loginData.Login.Password
        );
        await LoginPage.waitForHomeToLoad();
    }
};



