import fs from 'fs';
import path from 'path';

export async function captureScreenshot(testName) {
    const dir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const fileName = `${testName.replace(/ /g, '_')}_${Date.now()}.png`;
    const filePath = path.join(dir, fileName);

    await browser.saveScreenshot(filePath);
}
