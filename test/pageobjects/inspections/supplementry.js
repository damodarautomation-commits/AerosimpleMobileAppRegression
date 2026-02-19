import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';

class SupplementaryInspection extends BasePage {

    async openCreateNewInspection(action) {
        const inspectionButton = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${action}"]`);
        await inspectionButton.click();
        logger.info(`Opened inspection action: ${action}`);
    }

    async click_on_inspection(name) {
        const inspection = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${name}"]/../..`);
        await inspection.click();
        logger.info(`Selected inspection: ${name}`);
    }

    async click_on_shift(shift_name) {
        const shiftDropdown = await common.waitUntilDisplayed("//android.view.ViewGroup[contains(@content-desc,'')]");
        await shiftDropdown.click();

        const selectShift = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${shift_name}"]`);
        await selectShift.click();

        logger.info(`Shift selected: ${shift_name}`);
    }



    async choseChecklists() {
        const checklist = await common.waitUntilDisplayed('(//android.widget.TextView[@text="󰄱"])[2]/..');
        await checklist.click();
        logger.info('Clicked on Checklist 2');
        const expand = await common.waitUntilDisplayed('(//android.widget.TextView[@text=""])[2]')
        await expand.click();
        logger.info('Expanded Checklist');

        const subcheck = await common.waitUntilDisplayed('(//android.widget.TextView[@text="󰄲"])[3]');
        await subcheck.click();
        logger.info('Un check subchecklist')
    }


    //................................................................................

    async click_on_start_inspection() {
        const startBtn = await common.waitUntilDisplayed("//android.widget.Button[@resource-id='fab']");
        await startBtn.click();
        logger.info("Clicked Start Inspection");
    }

    async clickOnUnsatisfactory() {
        const fail = await common.waitUntilDisplayed('(//android.widget.Button[@content-desc="Fail"])[1]', 4000);
        await fail.click();
        logger.info("Clicked on unsatisfactory");
    }

    async clickonchecklistAction() {
        const action = await common.waitUntilDisplayed('(//android.widget.TextView[@text=""])[1]');
        await action.click();
    }

    async clickonNewRemark() {
        const remark = await common.waitUntilDisplayed('//android.widget.TextView[@text="New Remark"]/..');
        await remark.click();
    }

    async enterDescription() {
        const enter_comment = await common.waitUntilDisplayed('//android.widget.EditText[@text="Please enter Description."]');
        await enter_comment.setValue('This is a comment entered in the checklist via mobile.');
    }

    async addAttachment() {
        const addAttachmentButton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Add attachment"]/..');
        await addAttachmentButton.click();

        const galleryOption = await common.waitUntilDisplayed('~, Select From Gallery');
        await galleryOption.click();

        const latestPhoto = await common.waitUntilDisplayed('//android.view.View[contains(@content-desc,"Photo taken")]');
        await latestPhoto.click();

        const doneButton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Done"]/..');
        await doneButton.click();
    }

    async click_location_on_map(xOffset = 0.5, yOffset = 0.5) {
        const mapView = await common.waitUntilDisplayed('(//android.widget.TextView[@text="Location"]/..//android.view.ViewGroup)[10]', 10000);
        await mapView.click();

        const location = await mapView.getLocation();
        const size = await mapView.getSize();

        const x = Math.floor(location.x + size.width * xOffset);
        const y = Math.floor(location.y + size.height * yOffset);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 120 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.releaseActions();

        const doneButton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Done"]/..');
        await doneButton.click();
    }

    async click_on_addRemark() {
        await this.swipeUp();
        const addComment = await common.waitUntilDisplayed('//android.view.ViewGroup[@content-desc="Add remark"]/..');
        await addComment.click();
    }

    async click_on_complete_inspection() {
        const completeInspection = await common.waitUntilDisplayed('//android.widget.TextView[@resource-id="fab-text"]/..');
        await browser.hideKeyboard().catch(() => driver.back());
        await completeInspection.click();
    }

    async validateUnsatisfactoryWarning() {
        const msg = await common.waitUntilDisplayed('//android.view.View[@text=" Please add a remark or create a Work Order for all Unsatisfactory items"]');
        logger.info(`Validation message: ${await msg.getText()}`);
    }

    async clickOnOkButton() {
        const okBtn = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Ok"]');
        await okBtn.click();
    }

    async addinfo() {
        const info = await common.waitUntilDisplayed('//android.widget.TextView[@text="Additional Information"]');
        logger.info(`Validation message: ${await info.getText()}`);
    }

    async SupplementInspectionSubmission() {
        logger.info("Starting MultiColumn Inspection submission flow");

        await this.openCreateNewInspection('Create New Inspection');
        await this.waituntilLoaderToDisappear();
        await this.click_on_inspection('Supplementary Inspection');
        await this.click_on_shift('Day');

        await this.choseChecklists();
        await this.click_on_start_inspection();
        await this.waituntilLoaderToDisappear();
        await this.clickOnUnsatisfactory();
        await this.click_on_complete_inspection();
        await this.validateUnsatisfactoryWarning();
        await this.clickOnOkButton();

        await this.clickonchecklistAction();
        await this.clickonNewRemark();
        await this.enterDescription();
        await this.addAttachment();
        await browser.pause(5000);
        await this.click_on_addRemark()
        await browser.pause(5000);
        await this.click_on_complete_inspection();
        await this.waituntilLoaderToDisappear();
        await this.click_on_complete_inspection();
    }
}

export default new SupplementaryInspection();
