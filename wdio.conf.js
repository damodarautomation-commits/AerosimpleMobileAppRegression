// wdio.conf.js
const { exec } = require('child_process');

exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    // ==================
    // Test Files
    // ==================
    specs: ['./test/specs/**/*.js'],
    exclude: [],

    // ===================
    // Capabilities
    // ===================
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',

        // Automation engine
        'appium:automationName': 'UiAutomator2',

        // Device details (Real Device)
        'appium:deviceName': 'MyDevice',
        'appium:udid': '24141FDF60028R', // office mobile
        //'appium:udid': 'ZD2225JHNC', // My mobile
        'appium:platformVersion': '13',

        // App behavior
        'appium:noReset': false,
        'appium:fullReset': false,

        // Aerosimple Hybrid App
        'appium:appPackage': 'com.aerosimple.hybridapp',
        'appium:appActivity': 'com.aerosimple.hybridapp.MainActivity',

        // Stability settings
        'appium:newCommandTimeout': 600,
        'appium:autoGrantPermissions': true,
        'appium:disableWindowAnimation': true,
        'appium:ignoreHiddenApiPolicyError': true,

        // UiAutomator2 safety timeouts
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:uiautomator2ServerReadTimeout': 60000,
        'appium:adbExecTimeout': 60000,

        // Hybrid app safety
        'appium:ensureWebviewsHavePages': true
    }],

    // ===================
    // WDIO Settings
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 150000,
    connectionRetryTimeout: 150000,
    connectionRetryCount: 3,

    // ===================
    // Test Framework
    // ===================
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000,
        require: ['./test/fixtures/aerosimple.setup.js']
    },

    // ===================
    // Reporters
    // ===================
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true
        }]
    ],

    // ===================
    // Appium Service
    // ===================
    services: [
        ['appium', {
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true,
                logLevel: 'info'
            },
            logPath: './logs'
        }]
    ],

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    // ===================
    // Hooks
    // ===================
    before: async function (capabilities) {
        console.log('Session started on device:', capabilities['appium:deviceName']);
    },

    afterTest: async function (test, context, { error }) {
        if (error) {
            console.log(`Test failed: ${test.title}`);
            try {
                await browser.takeScreenshot();
            } catch (e) {
                console.log('Screenshot skipped – session closed or UiAutomator2 crashed');
            }
        }
    },

    // Run after all tests finish
    onComplete: function () {
        console.log('Test run finished! Generating HTML + PDF report...');

        exec('node AerosimpleMobileReport.js', (err, stdout, stderr) => {
            if (err) {
                console.error('PDF/HTML report generation failed', err);
            } else {
                console.log(stdout);
                console.log('PDF/HTML report generated successfully!');
            }
        });
    }
};
