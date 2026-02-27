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


    async swipeDown() {
        const { width, height } = await driver.getWindowRect();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.25 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 200 },
                { type: 'pointerMove', duration: 800, x: width / 2, y: height * 0.75 },
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

    async waitForLoaderToDisappear(timeout = 40000) {
        await browser.waitUntil(
            async () => {
                const source = await driver.getPageSource();
                return (
                    !source.includes('progress') &&
                    !source.includes('loading') &&
                    !source.includes('spinner')
                );
            },
            { timeout, interval: 800 }
        );

        await browser.waitUntil(
            async () => {
                const clickable = await $$('//*[@clickable="true"]');
                return clickable.length > 0;
            },
            { timeout, interval: 800 }
        );
    }

    async waituntilLoaderToDisappear(timeout = 40000) {
        const startTime = Date.now();
        const remainingTime = () => Math.max(1000, timeout - (Date.now() - startTime));

        console.log(`[Loader] Starting wait with ${timeout}ms timeout`);

        try {
            await browser.waitUntil(
                async () => {
                    try {
                        const source = await driver.getPageSource();
                        const lowerSource = source.toLowerCase();

                        // Enhanced text patterns
                        const loaderIndicators = [
                            'progress', 'loading', 'spinner', 'processing',
                            'please wait', 'pleasewait', 'waiting',
                            'buffering', 'synchronizing', 'updating'
                        ];

                        // Check for any loader text
                        const hasLoaderText = loaderIndicators.some(indicator =>
                            lowerSource.includes(indicator)
                        );

                        if (!hasLoaderText) {
                            // Also check for animated characters (dots, ellipsis)
                            const hasAnimatedChars = /(●|○|\.\.\.|…|⬤|◦)/.test(source);
                            return !hasAnimatedChars;
                        }

                        return false;
                    } catch (error) {
                        // If page source fails, assume loader might be gone
                        console.log('[Loader] Error getting page source:', error.message);
                        return true;
                    }
                },
                {
                    timeout: Math.min(15000, timeout), // Max 15s for text check
                    timeoutMsg: 'Loader text indicators still present',
                    interval: 800
                }
            );
            console.log('[Loader] Phase 1 passed: No loader text found');
        } catch (error) {
            console.log('[Loader] Phase 1 timeout/error:', error.message);
        }

        try {
            await browser.waitUntil(
                async () => {
                    try {
                        // Common custom loader selectors
                        const loaderSelectors = [
                            // Android custom overlays
                            'android.widget.FrameLayout[enabled="false"][visible="true"]',
                            'android.view.ViewGroup[enabled="false"][clickable="false"]',
                            '*[enabled="false"][clickable="false"][visible="true"]',

                            // Progress indicators
                            '*[resource-id*="progress"]',
                            '*[resource-id*="loader"]',
                            '*[resource-id*="spinner"]',
                            '*[resource-id*="wait"]',
                            '*[resource-id*="buffering"]',

                            // Accessibility indicators
                            '*[content-desc*="loading"]',
                            '*[content-desc*="progress"]',
                            '*[content-desc*="wait"]',

                            // iOS indicators
                            'XCUIElementTypeActivityIndicator',
                            'XCUIElementTypeProgressIndicator',

                            // Lottie/Animation views
                            '*[class*="Lottie"]',
                            '*[class*="Animation"]',
                            '*[class*="Loading"]',

                            // Dots patterns (4 moving dots)
                            '//*[contains(@class, "ImageView") and @width<50 and @height<50]',
                            '//*[starts-with(@resource-id, "dot_") or contains(@resource-id, "dot")]',
                            '//android.view.View[@width<30 and @height<30 and @clickable="false"]'
                        ];

                        let totalVisibleLoaders = 0;

                        for (const selector of loaderSelectors) {
                            try {
                                const elements = await $$(selector);
                                for (const element of elements) {
                                    try {
                                        if (await element.isDisplayed()) {
                                            totalVisibleLoaders++;
                                            console.log(`[Loader] Found visible loader: ${selector}`);
                                            break; // Found at least one visible for this selector
                                        }
                                    } catch (e) {
                                        // Element might be stale
                                        continue;
                                    }
                                }
                                if (totalVisibleLoaders > 0) break;
                            } catch (error) {
                                // Invalid selector, skip
                                continue;
                            }
                        }

                        if (totalVisibleLoaders === 0) {
                            const smallViews = await $$('android.view.View[@width<40 and @height<40]');
                            const smallImageViews = await $$('android.widget.ImageView[@width<40 and @height<40]');

                            const potentialDots = [...smallViews, ...smallImageViews];
                            let visibleDotCount = 0;

                            for (const view of potentialDots.slice(0, 10)) { // Check first 10
                                try {
                                    if (await view.isDisplayed()) {
                                        visibleDotCount++;
                                        if (visibleDotCount >= 3) {
                                            console.log('[Loader] Found dots pattern');
                                            return false;
                                        }
                                    }
                                } catch (e) {
                                    continue;
                                }
                            }
                        }

                        return totalVisibleLoaders === 0;
                    } catch (error) {
                        console.log('[Loader] Error in custom loader check:', error.message);
                        return true;
                    }
                },
                {
                    timeout: remainingTime(),
                    timeoutMsg: 'Custom loader elements still visible',
                    interval: 1000
                }
            );
            console.log('[Loader] Phase 2 passed: No custom loaders found');
        } catch (error) {
            console.log('[Loader] Phase 2 timeout:', error.message);
        }

        try {
            await browser.waitUntil(
                async () => {
                    try {
                        const clickableElements = await $$('//*[@clickable="true" and @enabled="true"]');
                        const visibleClickable = [];

                        for (const element of clickableElements.slice(0, 20)) { // Check first 20
                            try {
                                if (await element.isDisplayed()) {
                                    visibleClickable.push(element);
                                }
                            } catch (e) {
                                continue;
                            }
                        }

                        const hasClickable = visibleClickable.length > 0;
                        console.log(`[Loader] Found ${visibleClickable.length} visible clickable elements`);
                        return hasClickable;
                    } catch (error) {
                        console.log('[Loader] Error finding clickable elements:', error.message);
                        return false;
                    }
                },
                {
                    timeout: Math.min(10000, remainingTime()),
                    timeoutMsg: 'No clickable elements found after loader disappeared',
                    interval: 800
                }
            );
            console.log('[Loader] Phase 3 passed: Clickable elements found');
        } catch (error) {
            console.log('[Loader] Phase 3 timeout:', error.message);
            throw new Error(`Loader wait failed: ${error.message}`);
        }

        try {
            await browser.waitUntil(
                async () => {
                    await browser.pause(500);
                    const quickCheck = await $$('android.widget.FrameLayout[enabled="false"][visible="true"]');
                    let newLoaders = 0;

                    for (const loader of quickCheck) {
                        if (await loader.isDisplayed()) {
                            newLoaders++;
                        }
                    }

                    return newLoaders === 0;
                },
                {
                    timeout: Math.min(3000, remainingTime()),
                    timeoutMsg: 'Loader reappeared after disappearance',
                    interval: 500
                }
            );
        } catch (error) {
            console.log('[Loader] Phase 4 warning:', error.message);
        }

        console.log(`[Loader]  Successfully waited for loader (${Date.now() - startTime}ms)`);
        return true;
    }


    async clickOkButton() {
        const ok = await $('//android.widget.Button[@text="OK"]');
        await this.clickWhenVisible(ok);
    }

    async clickDirect(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.waitForEnabled({ timeout: 10000 });
        await element.click();
    }

    async scrollToText(text, maxSwipes = 8) {
        try {

            const element = await $(`android=new UiSelector().textContains("${text}")`);
            if (await element.isDisplayed()) return element;
        } catch (e) {

        }


        for (let i = 0; i < maxSwipes; i++) {
            try {
                const element = await $(`android=new UiSelector().textContains("${text}")`);
                if (await element.isDisplayed()) return element;
            } catch { }

            await this.swipeUp();
            await driver.pause(500);
        }

        throw new Error(`Element with text "${text}" not found after ${maxSwipes} swipes`);
    }

    async swipeHorizontal(direction = 'left') {
        const { width, height } = await driver.getWindowSize();

        const y = Math.floor(height * 0.5);
        const startX = direction === 'left' ? width * 0.85 : width * 0.15;
        const endX = direction === 'left' ? width * 0.15 : width * 0.85;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 500, x: endX, y },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        await driver.releaseActions();
    }


    async scroll_till_element(element, maxSwipes = 10) {
        let found = false;

        for (let i = 0; i < maxSwipes; i++) {
            try {
                if (await element.isExisting() && await element.isDisplayed()) {
                    await element.click();
                    found = true;
                    break;
                }
            } catch (e) {
                // element not in DOM yet 
            }
            await this.swipeUp();
            await driver.pause(800);
        }

        if (!found) {
            throw new Error('Element not found after scrolling');
        }
    }


    async swipe_till_element(element, maxSwipes = 20) {
        let isVisible = false;

        while (!isVisible && maxSwipes > 0) {
            if (await element.isExisting() && await element.isDisplayed()) {
                isVisible = true;
                break;
            }
            await this.swipeUp();
            await driver.pause(500);
            maxSwipes--;
        }

        if (!isVisible) {
            throw new Error('Element not visible after scrolling');
        }
    }

}

export default BasePage;
