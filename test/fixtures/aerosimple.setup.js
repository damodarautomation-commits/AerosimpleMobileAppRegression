// test/fixtures/aerosimple.setup.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
const loginData = require('../testdata/login.json');

export const mochaHooks = {
    async beforeEach() {
        const userRole = global.userRole || process.env.USER_ROLE || 'systemAdmin';

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

        let email;

        if (userRole === 'maintenanceUser') {
            email = loginData.Login.maintenance_staff_email;
        } else if (userRole === 'operationUser') {
            email = loginData.Login.operation_staff_email;
        } else {
            email = loginData.Login.Email;
        }

        console.log('Logging in as:', userRole);

        await LoginPage.login(email, loginData.Login.Password);
        await LoginPage.waitForHomeToLoad();
    }
};